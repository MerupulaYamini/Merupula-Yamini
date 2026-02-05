package com.inspiringwave.ticket_management_system.dto.request.ticket;

import com.inspiringwave.ticket_management_system.entity.enums.TicketStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateTicketStatusRequest {

    @NotNull(message = "Status is required")
    private TicketStatus status;
}
