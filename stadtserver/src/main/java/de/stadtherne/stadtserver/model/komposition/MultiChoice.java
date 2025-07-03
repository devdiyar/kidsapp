package de.stadtherne.stadtserver.model.komposition;

import jakarta.persistence.Entity;

@Entity
public class MultiChoice extends Fragentyp {

    public MultiChoice(String titel, String beschreibung) {
        super(titel, beschreibung);
    }
}