package de.stadtherne.stadtserver.model;

import lombok.Data;

@Data
public abstract class Fragentyp {

    private Long id;

    private String titel;
    private String beschreibung;

    private Umfrage umfrage;
}
