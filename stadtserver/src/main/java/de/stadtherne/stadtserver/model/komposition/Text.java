package de.stadtherne.stadtserver.model.komposition;

import jakarta.persistence.Entity;

@Entity
public class Text extends Fragentyp {

    public Text(String titel, String beschreibung) {
        super(titel, beschreibung);
    }
}