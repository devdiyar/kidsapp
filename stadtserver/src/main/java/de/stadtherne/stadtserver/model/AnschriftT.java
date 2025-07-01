package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class AnschriftT {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String strasse;
    private int plz;
    private String ort;

    public AnschriftT() {}

    public AnschriftT(String strasse1, int plz1, String ort1){
        strasse = strasse1;
        plz = plz1;
        ort = ort1;
    }
}