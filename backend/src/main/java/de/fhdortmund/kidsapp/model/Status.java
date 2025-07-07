package de.fhdortmund.kidsapp.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public abstract class Status {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne(mappedBy = "aktuellerstatus")
    @JsonBackReference
    protected Veranstaltung veranstaltung;


    public Status(Veranstaltung veranstaltung) {
        this.veranstaltung = veranstaltung;
    }

    public Status() {}

    public abstract void stattfindendSetzen();
    public abstract void ausstehendSetzen();
    public abstract void liveSetzen();
    public abstract void abgeschlossenSetzen();
    public abstract void geloeschtSetzen();

}