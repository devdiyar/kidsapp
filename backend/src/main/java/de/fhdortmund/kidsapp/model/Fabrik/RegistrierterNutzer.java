package de.fhdortmund.kidsapp.model.Fabrik;

import java.util.ArrayList;
import java.util.List;

import de.fhdortmund.kidsapp.model.AnschriftT;
import de.fhdortmund.kidsapp.model.Nutzer;
import de.fhdortmund.kidsapp.model.Veranstaltung;
import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
public class RegistrierterNutzer implements Nutzer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String vorname;
    private String nachname;
    
    @Embedded
    private AnschriftT anschrift;



    @ManyToMany
    @JoinTable(
        name = "registrierter_nutzer_veranstaltung",
        joinColumns = @JoinColumn(name = "registrierter_nutzer_id"),
        inverseJoinColumns = @JoinColumn(name = "veranstaltung_id")
    )
    private List<Veranstaltung> angemeldeteVeranstaltungen = new ArrayList<>();


}