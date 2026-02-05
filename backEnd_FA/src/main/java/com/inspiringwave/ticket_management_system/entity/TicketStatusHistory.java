package com.inspiringwave.ticket_management_system.entity;

import com.inspiringwave.ticket_management_system.entity.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "ticket_status_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    Parent ticket
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

//    Old status
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketStatus fromStatus;

//    New status
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketStatus toStatus;

//    Who updated the status
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by_id", nullable = false)
    private User updatedBy;

    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        this.updatedAt = Instant.now();
    }
}
