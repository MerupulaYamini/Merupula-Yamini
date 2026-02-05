package com.inspiringwave.ticket_management_system.service.impl;

import com.inspiringwave.ticket_management_system.dto.request.comment.AddCommentRequest;
import com.inspiringwave.ticket_management_system.dto.response.ticket.TicketDetailsResponse;
import com.inspiringwave.ticket_management_system.entity.Comment;
import com.inspiringwave.ticket_management_system.entity.Ticket;
import com.inspiringwave.ticket_management_system.entity.User;
import com.inspiringwave.ticket_management_system.entity.enums.Role;
import com.inspiringwave.ticket_management_system.exception.ResourceNotFoundException;
import com.inspiringwave.ticket_management_system.exception.UnauthorizedException;
import com.inspiringwave.ticket_management_system.mapper.TicketMapper;
import com.inspiringwave.ticket_management_system.repository.CommentRepository;
import com.inspiringwave.ticket_management_system.repository.TicketRepository;
import com.inspiringwave.ticket_management_system.repository.UserRepository;
import com.inspiringwave.ticket_management_system.service.CommentService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final TicketRepository ticketRepository;
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final TicketMapper ticketMapper;

    // Helpers
    private User getCurrentUser() {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName() == null) {
            throw new UnauthorizedException("Unauthorized");
        }

        return userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new UnauthorizedException("User not found"));
    }

    private boolean isAdmin(User user) {
        return user.getRole() == Role.ADMIN;
    }

    private void ensureAdminOrAssigned(User user, Ticket ticket) {
        if (!isAdmin(user) && !ticket.getAssignedTo().getId().equals(user.getId())) {
            throw new UnauthorizedException("You are not allowed to comment on this ticket");
        }
    }

    // Service method
    @Override
    @Transactional
    public TicketDetailsResponse addComment(Long ticketId, AddCommentRequest request) {

        User current = getCurrentUser();

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found: " + ticketId));

        ensureAdminOrAssigned(current, ticket);

        Comment saved = commentRepository.save(
                Comment.builder()
                        .ticket(ticket)
                        .author(current)
                        .content(request.getContent())
                        .build());

        // reload so comments appear immediately
        Ticket fresh = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found: " + ticketId));

        return ticketMapper.toDetailsResponse(ticket);
    }
}