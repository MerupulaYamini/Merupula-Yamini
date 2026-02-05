package com.inspiringwave.ticket_management_system.dto.request.ticket;

import com.inspiringwave.ticket_management_system.entity.enums.TicketLabel;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateTicketRequest {

    @NotBlank(message = "Title is required")
    @Size(max=150,message ="Title can't exceed 150 characters")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Ticket label is required")
    private TicketLabel label;

    @NotNull(message = "Assigned user is required")
    private Long assignedToUserId;

    // Optional attachments (image / video / pdf / etc)
    private List<MultipartFile> attachments;

    // Optional URL attachments
    private List<String> attachmentUrls;

}
