package com.inspiringwave.ticket_management_system.service.impl;

import com.inspiringwave.ticket_management_system.dto.request.ticket.CreateTicketRequest;
import com.inspiringwave.ticket_management_system.dto.request.ticket.UpdateTicketRequest;
import com.inspiringwave.ticket_management_system.dto.request.ticket.UpdateTicketStatusRequest;
import com.inspiringwave.ticket_management_system.entity.Ticket;
import com.inspiringwave.ticket_management_system.entity.TicketStatusHistory;
import com.inspiringwave.ticket_management_system.entity.User;
import com.inspiringwave.ticket_management_system.entity.enums.Role;
import com.inspiringwave.ticket_management_system.entity.enums.TicketStatus;
import com.inspiringwave.ticket_management_system.exception.BadRequestException;
import com.inspiringwave.ticket_management_system.exception.ResourceNotFoundException;
import com.inspiringwave.ticket_management_system.exception.UnauthorizedException;
import com.inspiringwave.ticket_management_system.mapper.TicketMapper;
import com.inspiringwave.ticket_management_system.dto.response.common.ApiResponse;
import com.inspiringwave.ticket_management_system.dto.response.ticket.TicketDetailsResponse;
import com.inspiringwave.ticket_management_system.dto.response.ticket.TicketListResponse;
import com.inspiringwave.ticket_management_system.repository.TicketRepository;
import com.inspiringwave.ticket_management_system.repository.TicketStatusHistoryRepository;
import com.inspiringwave.ticket_management_system.repository.UserRepository;
import com.inspiringwave.ticket_management_system.service.TicketService;
import com.inspiringwave.ticket_management_system.specification.TicketSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketStatusHistoryRepository statusHistoryRepository;
    private final TicketMapper ticketMapper;

    // Helpers
    private User getCurrentUser() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) {
            throw new UnauthorizedException("Unauthorized");
        }
        // In your security, email is username
        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new UnauthorizedException("User not found"));
    }

    private boolean isAdmin(User user) {

        return user.getRole() == Role.ADMIN;
    }

    private void ensureAdmin(User user) {
        if (!isAdmin(user)) {
            throw new UnauthorizedException("Only admin can perform this action");
        }
    }

    private void ensureAdminOrAssigned(User user, Ticket ticket) {
        if (!isAdmin(user)
                && (ticket.getAssignedTo() == null || !ticket.getAssignedTo().getId().equals(user.getId()))) {
            throw new UnauthorizedException("You are not allowed to update this ticket");
        }
    }

    private Ticket getTicketOrThrow(Long ticketId) {
        return ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found:" + ticketId));
    }

    // Service Methods
    @Override
    public Page<TicketListResponse> getAllTickets(String search,
            String status,
            String label,
            Long assignedToId,
            Pageable pageable) {
        // Admin + Employee both can view all -> just require auth
        getCurrentUser();

        Specification<Ticket> spec = TicketSpecification.build(search, status, label, assignedToId);

        return ticketRepository.findAll(spec, pageable)
                .map(ticketMapper::toListResponse);

    }

    // Ticket Details
    @Override
    public TicketDetailsResponse getTicketById(Long ticketId) {

        // Admin + Employee both can view any ticket
        getCurrentUser();
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found: " + ticketId));
        return ticketMapper.toDetailsResponse(ticket);
    }

    // Create(Admin only)
    @Transactional
    @Override
    public TicketDetailsResponse createTicket(CreateTicketRequest request) {

        User admin = getCurrentUser();
        ensureAdmin(admin);

        User assigned = userRepository.findById(request.getAssignedToUserId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Assigned employee not found: " + request.getAssignedToUserId()));

        // attachments(bytes+meta)
        List<byte[]> attachmentData = new ArrayList<>();
        List<String> attachmentMeta = new ArrayList<>();

        if (request.getAttachments() != null && !request.getAttachments().isEmpty()) {
            for (MultipartFile file : request.getAttachments()) {
                if (file == null || file.isEmpty())
                    continue;

                try {
                    attachmentData.add(file.getBytes());
                } catch (IOException e) {
                    throw new BadRequestException("Unable to read attachment: " + file.getOriginalFilename());
                }

                // meta format: filename|contentType
                String meta = (file.getOriginalFilename() == null ? "file" : file.getOriginalFilename())
                        + "|" + (file.getContentType() == null ? "application/octet-stream" : file.getContentType());
                attachmentMeta.add(meta);
            }
        }

        List<String> attachmentUrls = (request.getAttachmentUrls() == null)
                ? new ArrayList<>()
                : request.getAttachmentUrls();

        Ticket ticket = Ticket.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .label(request.getLabel())
                .status(TicketStatus.TODO)
                .createdBy(admin)
                .assignedTo(assigned)
                .attachmentData(attachmentData)
                .attachmentMeta(attachmentMeta)
                .attachmentUrls(attachmentUrls)
                .build();

        Ticket saved = ticketRepository.save(ticket);

        // Initial status history entry
        statusHistoryRepository.save(
                TicketStatusHistory.builder()
                        .ticket(saved)
                        .fromStatus(TicketStatus.TODO)
                        .toStatus(TicketStatus.TODO)
                        .updatedBy(admin)
                        .build());
        // reload so statusHistory appears in response immediately
        Ticket fresh = getTicketOrThrow(saved.getId());
        return ticketMapper.toDetailsResponse(saved);
    }

    @Override
    @Transactional
    public TicketDetailsResponse updateTicket(Long ticketId, UpdateTicketRequest request) {

        User admin = getCurrentUser();
        ensureAdmin(admin);

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found: " + ticketId));

        if (request.getTitle() != null)
            ticket.setTitle(request.getTitle());
        if (request.getDescription() != null)
            ticket.setDescription(request.getDescription());
        if (request.getLabel() != null)
            ticket.setLabel(request.getLabel());

        // only admin can assign/reassign - already ensured by ensureAdmin(admin)
        if (request.getAssignedToUserId() != null) {
            User newAssigned = userRepository.findById(request.getAssignedToUserId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Assigned employee not found: " + request.getAssignedToUserId()));
            ticket.setAssignedTo(newAssigned);
        }

        Ticket saved = ticketRepository.save(ticket);

        // reload to keep response consistent
        Ticket fresh = getTicketOrThrow(saved.getId());
        return ticketMapper.toDetailsResponse(fresh);
    }

    // Delete
    @Override
    @Transactional
    public ApiResponse deleteTicket(Long ticketId) {

        User admin = getCurrentUser();
        ensureAdmin(getCurrentUser());

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found: " + ticketId));

        ticketRepository.delete(ticket);

        return ApiResponse.builder()
                .success(true)
                .message("Ticket deleted successfully")
                .build();
    }

    // Status
    @Override
    @Transactional
    public TicketDetailsResponse updateTicketStatus(Long ticketId, UpdateTicketStatusRequest request) {

        User current = getCurrentUser();

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found: " + ticketId));

        ensureAdminOrAssigned(current, ticket);

        TicketStatus from = ticket.getStatus();
        TicketStatus to = request.getStatus();

        if (to == null) {
            throw new BadRequestException("Status is required");
        }
        // once DEPLOYED_DONE, ticket is FINAL (cannot change again)
        if (from == TicketStatus.DEPLOYED_DONE) {
            throw new BadRequestException("Once ticket is Deployed/Done, status cannot be changed");
        }

        // Only admin can set READY_TO_DEPLOY or DEPLOYED_DONE
        if ((to == TicketStatus.READY_TO_DEPLOY || to == TicketStatus.DEPLOYED_DONE) && !isAdmin(current)) {
            throw new UnauthorizedException("Only admin can move ticket to Ready To Deploy or Deployed/Done");
        }

        // (tiny validation) if same status, just return, do nothing
        if (from == to) {
            return ticketMapper.toDetailsResponse(ticket);
        }

        ticket.setStatus(to);
        Ticket saved = ticketRepository.save(ticket);

        TicketStatusHistory history = TicketStatusHistory.builder()
                .ticket(saved)
                .fromStatus(from)
                .toStatus(to)
                .updatedBy(current)
                .build();
        statusHistoryRepository.save(history);
        // reload so statusHistory appears immediately
        Ticket fresh = getTicketOrThrow(saved.getId());
        return ticketMapper.toDetailsResponse(saved);
    }

}
