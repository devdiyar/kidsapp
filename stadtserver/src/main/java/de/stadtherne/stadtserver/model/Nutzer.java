package de.stadtherne.stadtserver.model;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "Rolle")
public abstract class Nutzer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    protected String vorname;
    protected String name;

    @Embedded
    protected AnschriftT anschrift;

    public Nutzer() {
    }

    public Nutzer(String vn, String n, AnschriftT a) {
        vorname = vn;
        name = n;
        anschrift = a;
    }
}