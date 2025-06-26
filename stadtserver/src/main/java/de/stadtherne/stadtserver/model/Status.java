package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;

@Entity
public abstract class Status {

    public void trendingSetzen(Aktivitaet a) {
        
    }

    public void umfrageVerfuegbarSetzen(Aktivitaet a) {
    }

    public void bewertungVerfuegbarSetzen(Aktivitaet a) {
        
    }

    public void abgeschlossenSetzen(Aktivitaet a) {
        
    }

    public void liveSetzen(Aktivitaet a) {
        
    }

    public void ausstehendSetzen(Aktivitaet a) {
        
    }

    public void stattfindendSetzen(Aktivitaet a) {
        
    }

    public void geloeschtSetzen(Aktivitaet a) {
        
    }

}
