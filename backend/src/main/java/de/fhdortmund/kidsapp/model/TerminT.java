package de.fhdortmund.kidsapp.model;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.Embeddable;
import lombok.Data;

/**
 * Embeddable type representing a date and time.
 */
@Embeddable
@Data
public class TerminT {
    private Date datum;
    private LocalDateTime uhrzeit;
}