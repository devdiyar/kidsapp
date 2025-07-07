package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;


@Entity
@Data
public class Bewertung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private int steranzahl;
    private String kommentar;
    
    @ManyToOne
    private RegistrierterNutzer bewerter;  
    
    @ManyToOne
    private Veranstaltung veranstaltung;
}