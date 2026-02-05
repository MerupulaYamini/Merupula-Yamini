package com.inspiringwave.ticket_management_system.dto.response.ticket;

import com.inspiringwave.ticket_management_system.dto.response.comment.CommentResponse;
import com.inspiringwave.ticket_management_system.dto.response.history.TicketStatusHistoryResponse;
import com.inspiringwave.ticket_management_system.entity.enums.TicketLabel;
import com.inspiringwave.ticket_management_system.entity.enums.TicketStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TicketDetailsResponse {

    private Long id;
    private String title;
    private String description;
    private TicketLabel label;
    private TicketStatus status;

    private Long createdById;
    private String createdByName;

    private Long assignedToId;
    private String assignedToName;

    // attachment metadata only (no bytes)
    private List<String>attachmentMeta;

    private List<String> attachmentUrls;

    private List<CommentResponse> comments;

    private List<TicketStatusHistoryResponse> statusHistory;

    private Instant createdAt;
    private Instant updatedAt;
}
