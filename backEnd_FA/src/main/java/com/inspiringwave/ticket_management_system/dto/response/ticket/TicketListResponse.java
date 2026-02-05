package com.inspiringwave.ticket_management_system.dto.response.ticket;

import com.inspiringwave.ticket_management_system.entity.enums.TicketLabel;
import com.inspiringwave.ticket_management_system.entity.enums.TicketStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TicketListResponse {

    private Long id;
    private String title;
    private TicketLabel label;
    private TicketStatus status;

    private Long createdById;
    private String createdByName;

    private Long assignedToId;
    private String assignedToName;

    private int attachmentCount;

    private Instant createdAt;
    private Instant updatedAt;
}
