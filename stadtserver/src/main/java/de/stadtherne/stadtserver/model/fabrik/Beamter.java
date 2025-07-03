package de.stadtherne.stadtserver.model.fabrik;

import de.stadtherne.stadtserver.model.AnschriftT;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

import de.stadtherne.stadtserver.model.Nutzer;

@Entity
public class Beamter extends Nutzer {

    private String position;

    public Beamter(String vn, String n, AnschriftT a, String pos) {
        super(vn, n, a);
        position = pos;
    }

    @OneToMany(mappedBy = "beamter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Veranstaltung> veranstaltungen = new ArrayList<>();

    public List<Veranstaltung> getVeranstaltungen() {
        return veranstaltungen;
    }

    public void addVeranstaltung(Veranstaltung veranstaltung) {
        veranstaltungen.add(veranstaltung);
        veranstaltung.setBeamter(this);
    }

    public void removeVeranstaltung(Veranstaltung veranstaltung) {
        veranstaltungen.remove(veranstaltung);
        veranstaltung.setBeamter(null);
    }
}