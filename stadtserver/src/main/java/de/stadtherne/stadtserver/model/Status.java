package de.stadtherne.stadtserver.model;

import lombok.Data;

@Data
public abstract class Status {

    private Long id;

    protected Veranstaltung veranstaltung;

    public Status(Veranstaltung veranstaltung) {
        this.veranstaltung = veranstaltung;
    }

    public Status() {
    }

    public abstract void stattfindendSetzen();

    public abstract void ausstehendSetzen();

    public abstract void liveSetzen();

    public abstract void abgeschlossenSetzen();

    public abstract void geloeschtSetzen();
}
