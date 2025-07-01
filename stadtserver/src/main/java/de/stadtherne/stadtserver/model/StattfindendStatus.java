package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;

@Entity
public class StattfindendStatus extends Status {
    @Override
    public void abgeschlossenSetzen(Aktivitaet a) {
        a.setStatus(new Abgeschlossen());
    }
}