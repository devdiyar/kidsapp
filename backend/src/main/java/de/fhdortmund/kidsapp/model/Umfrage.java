package de.fhdortmund.kidsapp.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.EqualsAndHashCode;


@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Umfrage extends Fragentyp{

    /**
     *Alle Operationen werden auf die Fragentypen angewendet,
     *und sie werden gelöscht(orphanRemoval = true),
     *wenn sie nicht mehr referenziert werden.
     */
    @OneToMany(mappedBy = "umfrage",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Fragentyp> fragentypen = new ArrayList<>();

    @OneToOne(mappedBy = "umfrage")
    private Veranstaltung veranstaltung;


    public Umfrage() {
        this.fragentypen = new ArrayList<>();
    }

    public Umfrage( ArrayList<Fragentyp> fragentypen) {
        this.fragentypen = fragentypen != null ? fragentypen : new ArrayList<>();
    }

    public void add(Fragentyp frage) {
        fragentypen.add(frage);
    }
    public void remove(Fragentyp frage) {
        fragentypen.remove(frage);
    }
    public Fragentyp getFragentyp(int n) {
        return fragentypen.get(n);
    }

}