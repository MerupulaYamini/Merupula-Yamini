package com.inspiringwave.ticket_management_system.service;

import com.inspiringwave.ticket_management_system.dto.request.comment.AddCommentRequest;
import com.inspiringwave.ticket_management_system.dto.response.ticket.TicketDetailsResponse;

public interface CommentService {

    // Admin OR assigned employee: add comment
    TicketDetailsResponse addComment(Long ticketId, AddCommentRequest request);
}
