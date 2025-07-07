package de.stadtherne.stadtserver.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

/**
 * Embeddable type representing an address.
 */
@Embeddable
@Data
public class AnschriftT {
    private String strasse;
    private int plz;
    private String ort;
}