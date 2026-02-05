package com.inspiringwave.ticket_management_system.mapper;

import com.inspiringwave.ticket_management_system.dto.response.auth.RegisterResponse;
import com.inspiringwave.ticket_management_system.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface AuthMapper {

    // message is not part of User entity, we will set it manually in service
    @Mapping(target = "message", ignore = true)
    RegisterResponse toRegisterResponse(User user);
}
