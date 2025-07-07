
package de.stadtherne.stadtserver.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Entity
@Data
public class Beamter extends Nutzer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String vorname;
    private String name;
    
    @Embedded
    private AnschriftT anschrift;
    
    private String position;

    public Beamter() {
        this.veranstaltungen = new ArrayList<>();
    }

    public Beamter(String vn, String n, AnschriftT a, String pos) {
        this.vorname = vn;
        this.name = n;
        this.anschrift = a;
        this.position = pos;
        this.veranstaltungen = new ArrayList<>();
    }

    @OneToMany(mappedBy = "beamter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Veranstaltung> veranstaltungen = new ArrayList<>();

    public void addVeranstaltung(Veranstaltung veranstaltung) {
        veranstaltungen.add(veranstaltung);
        veranstaltung.setBeamter(this);
    }

    public void removeVeranstaltung(Veranstaltung veranstaltung) {
        veranstaltungen.remove(veranstaltung);
        veranstaltung.setBeamter(null);
    }
}