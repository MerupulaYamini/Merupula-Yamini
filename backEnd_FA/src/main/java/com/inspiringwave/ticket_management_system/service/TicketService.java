package com.inspiringwave.ticket_management_system.service;

import com.inspiringwave.ticket_management_system.dto.request.ticket.CreateTicketRequest;
import com.inspiringwave.ticket_management_system.dto.request.ticket.UpdateTicketRequest;
import com.inspiringwave.ticket_management_system.dto.request.ticket.UpdateTicketStatusRequest;
import com.inspiringwave.ticket_management_system.dto.response.common.ApiResponse;
import com.inspiringwave.ticket_management_system.dto.response.ticket.TicketDetailsResponse;
import com.inspiringwave.ticket_management_system.dto.response.ticket.TicketListResponse;
import com.inspiringwave.ticket_management_system.dto.request.comment.AddCommentRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TicketService {

    // Admin + Employee: list with backend filter/search/sort via Pageable + specs
    Page<TicketListResponse> getAllTickets(String search,
            String status,
            String label,
            Long assignedToId,
            Pageable pageable);

    // Admin + Employee: view details of any ticket
    TicketDetailsResponse getTicketById(Long ticketId);

    // Admin: create ticket
    TicketDetailsResponse createTicket(CreateTicketRequest request);

    // Admin: update ticket (including assign/reassign)
    TicketDetailsResponse updateTicket(Long ticketId, UpdateTicketRequest request);

    // Admin: delete ticket
    ApiResponse deleteTicket(Long ticketId);

    // Admin OR assigned employee: update status + track history
    TicketDetailsResponse updateTicketStatus(Long ticketId, UpdateTicketStatusRequest request);
}
