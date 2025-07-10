package de.fhdortmund.kidsapp.model.Fabrik;

import com.fasterxml.jackson.annotation.JsonBackReference;
import de.fhdortmund.kidsapp.model.Veranstaltung;
import jakarta.persistence.*;
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