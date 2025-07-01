package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public void trendingSetzen(Aktivitaet a) {}
    public void umfrageVerfuegbarSetzen(Aktivitaet a) {}
    public void bewertungVerfuegbarSetzen(Aktivitaet a) {}
    public void abgeschlossenSetzen(Aktivitaet a) {}
    public void liveSetzen(Aktivitaet a) {}
    public void ausstehendSetzen(Aktivitaet a) {}
    public void stattfindendSetzen(Aktivitaet a) {}
    public void geloeschtSetzen(Aktivitaet a) {}
}