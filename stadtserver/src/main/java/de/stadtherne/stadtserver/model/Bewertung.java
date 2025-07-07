package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class Bewertung {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int punktzahl;
    private String kommentar;

    @ManyToOne
    private RegistrierterNutzer nutzer;

    @OneToOne(mappedBy = "bewertung")
    private Veranstaltung veranstaltung;
}