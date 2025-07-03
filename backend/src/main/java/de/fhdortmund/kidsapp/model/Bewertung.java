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
    
    private int punktzahl;
    private String kommentar;
    
    @ManyToOne
    private RegistrierterNutzer bewerter;  
    
    @OneToOne(mappedBy = "bewertung", optional = true)
    private Veranstaltung veranstaltung;
}