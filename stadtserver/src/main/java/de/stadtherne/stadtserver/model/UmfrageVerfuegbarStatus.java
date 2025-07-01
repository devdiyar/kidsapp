package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;

@Entity
public class UmfrageVerfuegbarStatus extends Status {
    @Override
    public void trendingSetzen(Aktivitaet a) {
        a.setStatus(new Trending());
    }
}