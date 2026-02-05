package com.inspiringwave.ticket_management_system.dto.response.comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class CommentResponse {

    private Long id;

    private Long authorId;
    private String authorName;

    private String content;

    private Instant createdAt;

}
