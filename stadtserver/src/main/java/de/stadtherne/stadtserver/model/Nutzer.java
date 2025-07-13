package de.stadtherne.stadtserver.model;

import lombok.Data;

@Data
public abstract class Nutzer {

    protected Long id;

    protected String vorname;
    protected String name;

    protected AnschriftT anschrift;

    public Nutzer() {
    }

    public Nutzer(String vn, String n, AnschriftT a) {
        vorname = vn;
        name = n;
        anschrift = a;
    }
}
