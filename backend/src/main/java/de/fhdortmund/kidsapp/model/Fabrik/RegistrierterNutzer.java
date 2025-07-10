package de.fhdortmund.kidsapp.model.Fabrik;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import de.fhdortmund.kidsapp.model.AnschriftT;
import de.fhdortmund.kidsapp.model.Interessen;
import de.fhdortmund.kidsapp.model.Nutzer;
import de.fhdortmund.kidsapp.model.Veranstaltung;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.Data;


@Entity
@Data
public class RegistrierterNutzer implements Nutzer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String vorname;
    @Column(nullable = false)
    private String nachname;
    @Column(nullable = false)
    private Date geburtsdatum;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false, unique = true)
    private String benutzername;
    @Column(nullable = false)
    private String passwort;

    @Column(nullable = true)
    private Interessen interessen;

    @Embedded
    @Column(nullable = false)
    private AnschriftT anschrift;



    @ManyToMany
    @JoinTable(
        name = "registrierter_nutzer_veranstaltung",
        joinColumns = @JoinColumn(name = "registrierter_nutzer_id"),
        inverseJoinColumns = @JoinColumn(name = "veranstaltung_id")
    )
    private List<Veranstaltung> angemeldeteVeranstaltungen = new ArrayList<>();


}