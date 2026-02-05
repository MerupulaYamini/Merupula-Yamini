package com.inspiringwave.ticket_management_system.mapper;

import com.inspiringwave.ticket_management_system.dto.response.user.UserDetailsResponse;
import com.inspiringwave.ticket_management_system.dto.response.user.UserResponse;
import com.inspiringwave.ticket_management_system.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapStructConfig.class)
public interface UserMapper {

    UserResponse toUserResponse(User user);

    // EXPLICIT mapping for roles
    @Mapping(target = "roles", expression = "java(java.util.Set.of(user.getRole()))")
    UserDetailsResponse toUserDetailsResponse(User user);
}
