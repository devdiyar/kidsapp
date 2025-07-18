package de.fhdortmund.kidsapp.model.Kompositum;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.Data;


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public abstract class Fragentyp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titel;
    private String beschreibung;

    @ManyToOne
    @JoinColumn(name = "umfrage_id")
    private Umfrage umfrage;
}