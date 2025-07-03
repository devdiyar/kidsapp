package de.stadtherne.stadtserver.model.zustand;

import de.stadtherne.stadtserver.model.fabrik.Veranstaltung;
import jakarta.persistence.*;

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