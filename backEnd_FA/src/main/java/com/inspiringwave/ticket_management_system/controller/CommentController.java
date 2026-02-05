package com.inspiringwave.ticket_management_system.controller;


import com.inspiringwave.ticket_management_system.dto.request.comment.AddCommentRequest;
import com.inspiringwave.ticket_management_system.dto.response.ticket.TicketDetailsResponse;
import com.inspiringwave.ticket_management_system.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tickets/{ticketId}/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;


    @PostMapping
    public ResponseEntity<TicketDetailsResponse> addComment(@PathVariable Long ticketId,
                                                            @Valid @RequestBody AddCommentRequest request){
        return ResponseEntity.ok(commentService.addComment(ticketId, request));
    }
}
