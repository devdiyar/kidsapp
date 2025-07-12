package de.fhdortmund.kidsapp.model.Fabrik;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import de.fhdortmund.kidsapp.model.AnschriftT;
import de.fhdortmund.kidsapp.model.Interessen;
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
import org.springframework.beans.factory.annotation.Autowired;

@Entity
@Data
public class RegistrierterNutzer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String vorname;
    @Column(nullable = false)
    private String nachname;
    @Column(nullable = false)
    private LocalDate geburtsdatum;
    @Column(nullable = false, unique = true)
    private String email;
    @Column(nullable = false, unique = true)
    private String benutzername;
    @Column(nullable = false)
    private String passwort;

    @Column(nullable = true)
    private Interessen interessen;

    @ManyToMany
    @JoinTable(
            name = "registrierter_nutzer_veranstaltung",
            joinColumns = @JoinColumn(name = "registrierter_nutzer_id"),
            inverseJoinColumns = @JoinColumn(name = "veranstaltung_id")
    )
    private List<Veranstaltung> angemeldeteVeranstaltungen = new ArrayList<>();

}
