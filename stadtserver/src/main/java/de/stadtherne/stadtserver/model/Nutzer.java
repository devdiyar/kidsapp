package de.stadtherne.stadtserver.model;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "Rolle")
public abstract class Nutzer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected Long id;

    private String vorname;
    private String name;

    @Embedded
    private AnschriftT anschrift;

    public Nutzer() {
    }

    public Nutzer(String vn, String n, AnschriftT a) {
        vorname = vn;
        name = n;
        anschrift = a;
    }
}