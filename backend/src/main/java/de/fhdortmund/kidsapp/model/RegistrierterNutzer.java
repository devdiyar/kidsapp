package de.fhdortmund.kidsapp.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

/**
 * Entity representing a registered user in the system.
 * Contains personal information and associated activities.
 */
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
    
    @OneToMany(
        mappedBy = "teilnehmer",
        cascade = CascadeType.ALL,
        fetch = FetchType.LAZY,
        orphanRemoval = true
    )
    private List<Aktivitaet> aktivitaeten = new ArrayList<>();
}