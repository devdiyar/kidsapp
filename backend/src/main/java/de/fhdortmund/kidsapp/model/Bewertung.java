package de.fhdortmund.kidsapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
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
    @JoinColumn(name = "veranstaltung_id")
    @JsonBackReference
    private Veranstaltung veranstaltung;
}