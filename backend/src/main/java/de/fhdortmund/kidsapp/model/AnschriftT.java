package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Embeddable;
import lombok.Data;

/**
 * Embeddable type representing an address.
 */
@Embeddable
@Data
public class AnschriftT {
    private String strasse;
    private String ort;
}