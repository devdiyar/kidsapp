package de.stadtherne.stadtserver.model;

import lombok.Data;

@Data
public class Bewertung {

    private Long id;

    private int steranzahl;
    private String kommentar;

    private RegistrierterNutzer bewerter;

    private Veranstaltung veranstaltung;
}
