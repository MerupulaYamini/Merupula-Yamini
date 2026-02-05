package com.inspiringwave.ticket_management_system.dto.response.history;

import com.inspiringwave.ticket_management_system.entity.enums.TicketStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TicketStatusHistoryResponse {

    private Long id;

    private TicketStatus fromStatus;
    private TicketStatus toStatus;

    private Long updatedById;
    private String updatedByName;

    private Instant updatedAt;
}
