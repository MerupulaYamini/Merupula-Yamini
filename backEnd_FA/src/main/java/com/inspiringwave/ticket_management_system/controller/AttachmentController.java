package com.inspiringwave.ticket_management_system.controller;

import com.inspiringwave.ticket_management_system.entity.Ticket;
import com.inspiringwave.ticket_management_system.entity.User;
import com.inspiringwave.ticket_management_system.entity.enums.Role;
import com.inspiringwave.ticket_management_system.exception.BadRequestException;
import com.inspiringwave.ticket_management_system.exception.ResourceNotFoundException;
import com.inspiringwave.ticket_management_system.exception.UnauthorizedException;
import com.inspiringwave.ticket_management_system.repository.TicketRepository;
import com.inspiringwave.ticket_management_system.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class AttachmentController {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    @GetMapping("/{ticketId}/attachments/{index}")
    public ResponseEntity<byte[]> downloadAttachment(
            @PathVariable Long ticketId,
            @PathVariable int index) {
        User current = getCurrentUser();

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found: " + ticketId));

        // Only admin OR assigned employee can download attachments
        ensureAdminOrAssigned(current, ticket);

        if (ticket.getAttachmentData() == null || ticket.getAttachmentMeta() == null) {
            throw new ResourceNotFoundException("No attachments found for this ticket");
        }

        if (index < 0 || index >= ticket.getAttachmentData().size() || index >= ticket.getAttachmentMeta().size()) {
            throw new BadRequestException("Invalid attachment index: " + index);
        }

        byte[] fileBytes = ticket.getAttachmentData().get(index);

        // meta format: filename|contentType
        String meta = ticket.getAttachmentMeta().get(index);
        String filename = "file";
        String contentType = "application/octet-stream";

        if (meta != null && meta.contains("|")) {
            String[] parts = meta.split("\\|", 2);
            if (parts.length > 0 && parts[0] != null && !parts[0].isBlank())
                filename = parts[0];
            if (parts.length > 1 && parts[1] != null && !parts[1].isBlank())
                contentType = parts[1];
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                .contentType(MediaType.parseMediaType(contentType))
                .body(fileBytes);
    }

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
            throw new UnauthorizedException("You are not allowed to access this ticket attachment");
        }
    }
}
