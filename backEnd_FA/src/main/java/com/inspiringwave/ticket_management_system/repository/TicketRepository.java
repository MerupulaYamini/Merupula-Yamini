package com.inspiringwave.ticket_management_system.repository;

import com.inspiringwave.ticket_management_system.entity.Ticket;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long>, JpaSpecificationExecutor<Ticket> {

    // Filtering / searching / sorting will be done using Specifications
    Page<Ticket> findAll(Specification<Ticket> spec, Pageable pageable);

}