package de.stadtherne.stadtserver.model;

import de.stadtherne.stadtserver.model.fabrik.Veranstaltung;
import jakarta.persistence.*;
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