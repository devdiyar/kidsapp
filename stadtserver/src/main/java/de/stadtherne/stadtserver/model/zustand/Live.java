package de.stadtherne.stadtserver.model.Zustand;

import jakarta.persistence.Entity;
import de.stadtherne.stadtserver.model.Veranstaltung;
import de.stadtherne.stadtserver.model.Abgeschlossen;

@Entity
public class Live extends Status {
    @Override
    public void abgeschlossenSetzen(Veranstaltung a) {
        a.setStatus(new Abgeschlossen());
    }
}