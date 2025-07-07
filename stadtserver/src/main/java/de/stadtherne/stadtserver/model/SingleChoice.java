package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;

@Entity
public class SingleChoice extends Fragentyp {
    //für JPA
    protected SingleChoice(){super("","");}
    public SingleChoice(String titel, String beschreibung) {
        super(titel, beschreibung);
    }
}