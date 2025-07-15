package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Embeddable;
import lombok.Data;


@Embeddable
@Data
public class AnschriftT {
    private String strasse;
    private int hausnummer;
    private int plz;
    private String ort;
}