package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import jakarta.persistence.OneToOne;


/**
 * Entity representing a rating in the system.
 */
@Entity
@Data
public class Bewertung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private int punktzahl;  // Rating score
    private String kommentar;  // Optional comment
    
    @ManyToOne
    private RegistrierterNutzer bewerter;  // User who gave the rating
    
    @OneToOne(mappedBy = "bewertung")
    private Aktivitaet aktivitaet;
}