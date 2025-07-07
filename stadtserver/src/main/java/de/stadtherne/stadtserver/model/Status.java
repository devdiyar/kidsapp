package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public abstract class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    protected Veranstaltung veranstaltung;

    public Status() {
    }

    public Status(Veranstaltung v) {
        veranstaltung = v;
    }

    public abstract void abgeschlossenSetzen();

    public abstract void liveSetzen();

    public abstract void ausstehendSetzen();

    public abstract void stattfindendSetzen();

    public abstract void geloeschtSetzen();

}