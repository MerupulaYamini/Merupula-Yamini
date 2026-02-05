package com.inspiringwave.ticket_management_system.mapper;

import com.inspiringwave.ticket_management_system.dto.response.history.TicketStatusHistoryResponse;
import com.inspiringwave.ticket_management_system.entity.TicketStatusHistory;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface TicketStatusHistoryMapper {

    @Mapping(target = "updatedById", source = "updatedBy.id")
    @Mapping(target = "updatedByName", source = "updatedBy.username")
    TicketStatusHistoryResponse toResponse(TicketStatusHistory history);
}