package de.stadtherne.stadtserver.model.komposition;

import jakarta.persistence.Entity;

@Entity
public class SingleChoice extends Fragentyp {

    public SingleChoice(String titel, String beschreibung) {
        super(titel, beschreibung);
    }
}