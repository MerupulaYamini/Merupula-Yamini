package com.inspiringwave.ticket_management_system.entity;

import com.inspiringwave.ticket_management_system.entity.enums.TicketLabel;
import com.inspiringwave.ticket_management_system.entity.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tickets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    Ticket title
    @Column(nullable = false, length = 150)
    private String title;

//    Ticket description
    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

//    Ticket label
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketLabel label;

//    Ticket status
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketStatus status;

//    Ticket status history tracking
    @OneToMany(
            mappedBy = "ticket",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<TicketStatusHistory> statusHistory = new ArrayList<>();


    //     Who created the ticket (Admin)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_id", nullable = false)
    private User createdBy;

//    Assigned employee
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to_id", nullable = false)
    private User assignedTo;

//    To comment on the ticket
    @OneToMany(
            mappedBy = "ticket",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Comment> comments = new ArrayList<>();

    //    Attachment Data: image / video / pdf / etc (stored as bytes)
    @ElementCollection
    @CollectionTable(
            name = "ticket_attachment_data",
            joinColumns = @JoinColumn(name = "ticket_id")
    )
    @Column(name = "file_data", columnDefinition = "LONGBLOB")
    private List<byte[]> attachmentData = new ArrayList<>();

    // Attachment URLs (optional)
    @ElementCollection
    @CollectionTable(
            name = "ticket_attachment_urls",
            joinColumns = @JoinColumn(name = "ticket_id")
    )
    @Column(name = "url", length = 2000)
    private List<String> attachmentUrls = new ArrayList<>();

//    Attachment Meta: filename / contentType
    @ElementCollection
    @CollectionTable(
            name = "ticket_attachment_meta",
            joinColumns = @JoinColumn(name = "ticket_id")
    )
    @Column(name = "file_meta")
    private List<String> attachmentMeta = new ArrayList<>();


    private Instant createdAt;
    private Instant updatedAt;

    @PrePersist
    void onCreate() {
        this.createdAt = Instant.now();
        this.updatedAt = this.createdAt;
    }

    @PreUpdate
    void onUpdate() {
        this.updatedAt = Instant.now();
    }
}
