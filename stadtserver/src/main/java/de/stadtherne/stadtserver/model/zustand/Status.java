package de.stadtherne.stadtserver.model.Zustand;

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

    public void trendingSetzen(Veranstaltung a) {}
    public void umfrageVerfuegbarSetzen(Veranstaltung a) {}
    public void bewertungVerfuegbarSetzen(Veranstaltung a) {}
    public void abgeschlossenSetzen(Veranstaltung a) {}
    public void liveSetzen(Veranstaltung a) {}
    public void ausstehendSetzen(Veranstaltung a) {}
    public void stattfindendSetzen(Veranstaltung a) {}
    public void geloeschtSetzen(Veranstaltung a) {}
}