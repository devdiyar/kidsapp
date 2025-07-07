
package de.stadtherne.stadtserver.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@DiscriminatorValue("BEAMTER")
public class Beamter extends Nutzer {
    private String position;

    public Beamter(String vn, String n, AnschriftT a, String pos) {
        super(vn, n, a);
        this.position = pos;
        this.veranstaltungen = new ArrayList<>();
    }
    @OneToMany(mappedBy = "beamter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Veranstaltung> veranstaltungen = new ArrayList<>();

    public void addVeranstaltung(Veranstaltung veranstaltung) {
        if (veranstaltung != null) {
            veranstaltungen.add(veranstaltung);
            veranstaltung.setBeamter(this);
        }
    }

    public void removeVeranstaltung(Veranstaltung veranstaltung) {
        if (veranstaltung != null) {
            veranstaltungen.remove(veranstaltung);
            veranstaltung.setBeamter(null);
        }
    }
}