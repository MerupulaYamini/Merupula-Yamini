package com.inspiringwave.ticket_management_system.controller;

import com.inspiringwave.ticket_management_system.dto.request.ticket.CreateTicketRequest;
import com.inspiringwave.ticket_management_system.dto.request.ticket.UpdateTicketRequest;
import com.inspiringwave.ticket_management_system.dto.request.ticket.UpdateTicketStatusRequest;
import com.inspiringwave.ticket_management_system.dto.response.common.ApiResponse;
import com.inspiringwave.ticket_management_system.dto.response.ticket.TicketDetailsResponse;
import com.inspiringwave.ticket_management_system.dto.response.ticket.TicketListResponse;
import com.inspiringwave.ticket_management_system.service.TicketService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketService ticketService;

    // Admin + Employee: list tickets with backend filter/search/sort
    @GetMapping
    public ResponseEntity<Page<TicketListResponse>> getAllTickets(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String label,
            @RequestParam(required = false) Long assignedToId,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        return ResponseEntity.ok(
                ticketService.getAllTickets(search, status, label, assignedToId, pageable)
        );
    }

    // Admin + Employee: ticket details
    @GetMapping("/{ticketId}")
    public ResponseEntity<TicketDetailsResponse> getTicketById(@PathVariable Long ticketId) {
        return ResponseEntity.ok(ticketService.getTicketById(ticketId));
    }

    // Admin: create ticket (multipart for attachments)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<TicketDetailsResponse> createTicket(@Valid @ModelAttribute CreateTicketRequest request) {
        return ResponseEntity.ok(ticketService.createTicket(request));
    }

    // Admin: update ticket fields (title/desc/label/assignedTo)
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{ticketId}")
    public ResponseEntity<TicketDetailsResponse> updateTicket(
            @PathVariable Long ticketId,
            @RequestBody UpdateTicketRequest request
    ) {
        return ResponseEntity.ok(ticketService.updateTicket(ticketId, request));
    }

    // Admin: delete ticket
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{ticketId}")
    public ResponseEntity<ApiResponse> deleteTicket(@PathVariable Long ticketId) {
        return ResponseEntity.ok(ticketService.deleteTicket(ticketId));
    }

    // Admin OR assigned employee: update status
    @PatchMapping("/{ticketId}/status")
    public ResponseEntity<TicketDetailsResponse> updateTicketStatus(
            @PathVariable Long ticketId,
            @Valid @RequestBody UpdateTicketStatusRequest request
    ) {
        return ResponseEntity.ok(ticketService.updateTicketStatus(ticketId, request));
    }
}
