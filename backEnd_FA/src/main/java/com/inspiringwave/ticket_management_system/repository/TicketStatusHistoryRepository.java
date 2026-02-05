package com.inspiringwave.ticket_management_system.repository;

import com.inspiringwave.ticket_management_system.entity.TicketStatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketStatusHistoryRepository extends JpaRepository<TicketStatusHistory, Long> {

    List<TicketStatusHistory> findByTicketIdOrderByUpdatedAtAsc(Long ticketId);
}