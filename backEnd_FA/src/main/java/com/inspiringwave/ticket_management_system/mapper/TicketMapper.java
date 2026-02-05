package com.inspiringwave.ticket_management_system.mapper;

import com.inspiringwave.ticket_management_system.dto.response.ticket.TicketDetailsResponse;
import com.inspiringwave.ticket_management_system.dto.response.ticket.TicketListResponse;
import com.inspiringwave.ticket_management_system.entity.Ticket;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(
        config = MapStructConfig.class,
        uses = {
                CommentMapper.class,
                TicketStatusHistoryMapper.class
        }
)
public interface TicketMapper {

    // Ticket List (Table View)
    @Mapping(target = "createdById", source = "createdBy.id")
    @Mapping(target = "createdByName", source = "createdBy.username")
    @Mapping(target = "assignedToId", source = "assignedTo.id")
    @Mapping(target = "assignedToName", source = "assignedTo.username")
    @Mapping(target = "attachmentCount",
            expression = "java((ticket.getAttachmentMeta() != null ? ticket.getAttachmentMeta().size() : 0) + " +
                    "(ticket.getAttachmentUrls() != null ? ticket.getAttachmentUrls().size() : 0))"
    )

    TicketListResponse toListResponse(Ticket ticket);

    // Ticket Details (Details Page)
    @Mapping(target = "createdById", source = "createdBy.id")
    @Mapping(target = "createdByName", source = "createdBy.username")
    @Mapping(target = "assignedToId", source = "assignedTo.id")
    @Mapping(target = "assignedToName", source = "assignedTo.username")
    @Mapping(target = "attachmentMeta", source = "attachmentMeta")
    @Mapping(target = "attachmentUrls", source = "attachmentUrls")
    @Mapping(target = "comments", source = "comments")
    @Mapping(target = "statusHistory", source = "statusHistory")
    TicketDetailsResponse toDetailsResponse(Ticket ticket);
}
