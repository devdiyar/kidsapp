package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Geloescht extends Status {

    public Geloescht(Veranstaltung veranstaltung) {
        super(veranstaltung);
    }

    public Geloescht() {

    }

    @Override
    public void ausstehenSetzen() {
        throw new IllegalStateException("...");
    }

    @Override
    public void liveSetzen() {
        throw new IllegalStateException("...");
    }

    @Override
    public void stattfindendSetzen() {
        throw new IllegalStateException("...");
    }

    @Override
    public void abgeschlossenSetzen() {
        throw new IllegalStateException("...");
    }

    @Override
    public void geloeschtSetzen() {
    }
}
