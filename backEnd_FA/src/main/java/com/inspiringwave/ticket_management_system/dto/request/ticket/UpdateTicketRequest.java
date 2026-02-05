package com.inspiringwave.ticket_management_system.dto.request.ticket;

import com.inspiringwave.ticket_management_system.entity.enums.TicketLabel;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class UpdateTicketRequest {

    @Size(max = 150, message = "Title cannot exceed 150 characters")
    private String title;

    private String description;

    private TicketLabel label;

    // Admin can reassign ticket
    private Long assignedToUserId;
}