package com.inspiringwave.ticket_management_system.mapper;

import com.inspiringwave.ticket_management_system.dto.response.comment.CommentResponse;
import com.inspiringwave.ticket_management_system.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface CommentMapper {

    @Mapping(target = "authorId", source = "author.id")
    @Mapping(target = "authorName", source = "author.username")
    CommentResponse toResponse(Comment comment);
}