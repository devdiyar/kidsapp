package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

/**
 * Entity representing the trending status.
 */
@Entity
@Data
public class Trending {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private int anzahlTeilnehmer; // Number of participants
    private double durchschnittlicheBewertung; // Average rating
}