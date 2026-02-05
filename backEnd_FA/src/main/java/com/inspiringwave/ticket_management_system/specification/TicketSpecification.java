package com.inspiringwave.ticket_management_system.specification;

import com.inspiringwave.ticket_management_system.entity.Ticket;
import com.inspiringwave.ticket_management_system.entity.enums.TicketLabel;
import com.inspiringwave.ticket_management_system.entity.enums.TicketStatus;
import org.springframework.data.jpa.domain.Specification;

public class TicketSpecification {

    private TicketSpecification() {
        // utility class
    }

    public static Specification<Ticket> withSearch(String search) {
        return (root, query, cb) -> {
            if (search == null || search.isBlank()) {
                return cb.conjunction();
            }

            String like = "%" + search.toLowerCase() + "%";

            return cb.or(
                    cb.like(cb.lower(root.get("title")), like),
                    cb.like(cb.lower(root.get("description")), like)
            );
        };
    }

    public static Specification<Ticket> withStatus(String status) {
        return (root, query, cb) -> {
            if (status == null || status.isBlank()) {
                return cb.conjunction();
            }

            return cb.equal(
                    root.get("status"),
                    TicketStatus.valueOf(status)
            );
        };
    }

    public static Specification<Ticket> withLabel(String label) {
        return (root, query, cb) -> {
            if (label == null || label.isBlank()) {
                return cb.conjunction();
            }

            return cb.equal(
                    root.get("label"),
                    TicketLabel.valueOf(label)
            );
        };
    }

    public static Specification<Ticket> withAssignedTo(Long assignedToId) {
        return (root, query, cb) -> {
            if (assignedToId == null) {
                return cb.conjunction();
            }

            return cb.equal(
                    root.get("assignedTo").get("id"),
                    assignedToId
            );
        };
    }

    public static Specification<Ticket> build(String search,
                                              String status,
                                              String label,
                                              Long assignedToId) {
        return Specification
                .where(withSearch(search))
                .and(withStatus(status))
                .and(withLabel(label))
                .and(withAssignedTo(assignedToId));
    }

}
