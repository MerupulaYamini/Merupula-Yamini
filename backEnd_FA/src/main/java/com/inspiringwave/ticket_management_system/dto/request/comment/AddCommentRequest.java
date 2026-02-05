package com.inspiringwave.ticket_management_system.dto.request.comment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class AddCommentRequest {

    @NotBlank(message = "Comment cannot be empty")
    @Size(max = 5000, message = "Comment cannot exceed 5000 characters")
    private String content;
}
