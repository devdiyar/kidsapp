package de.fhdortmund.kidsapp.model.Fabrik;

import com.fasterxml.jackson.annotation.JsonBackReference;

import de.fhdortmund.kidsapp.model.Veranstaltung;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Bewertung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int steranzahl;
    private String kommentar;

    @ManyToOne
    private RegistrierterNutzer bewerter;

    @ManyToOne
    @JoinColumn(name = "veranstaltung_id")
    @JsonBackReference
    private Veranstaltung veranstaltung;
}
