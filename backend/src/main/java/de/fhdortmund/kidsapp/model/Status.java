package de.fhdortmund.kidsapp.model;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public abstract class Status {
    @OneToOne
    protected Veranstaltung veranstaltung;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Status(Veranstaltung veranstaltung) {
        this.veranstaltung = veranstaltung;
    }

    public Status() {

    }

    public abstract void ausstehenSetzen();
    public abstract void liveSetzen();
    public abstract void stattfindendSetzen();
    public abstract void abgeschlossenSetzen();
    public abstract void geloeschtSetzen();
}