package de.stadtherne.stadtserver.model;

import jakarta.persistence.*;
import lombok.Data;

@Embeddable
@Data
public class AnschriftT {

    private String strasse;
    private int plz;
    private String ort;

    public AnschriftT() {
    }

    public AnschriftT(String strasse1, int plz1, String ort1) {
        strasse = strasse1;
        plz = plz1;
        ort = ort1;
    }
}