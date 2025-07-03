package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;

@Entity
public class UmfrageVerfuegbarStatus extends Status {
    @Override
    public void trendingSetzen(Veranstaltung a) {
        a.setStatus(new Trending());
    }
}