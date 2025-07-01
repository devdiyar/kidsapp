package de.fhdortmund.kidsapp.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

/**
 * Entity representing a survey in the system.
 */
@Entity
@Data
public class Umfrage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Fragentyp> fragen = new ArrayList<>();
    
    @OneToOne(mappedBy = "umfrage")
    private Aktivitaet aktivitaet;


    public Umfrage() {
        this.fragen = new ArrayList<>();
    }

    public Umfrage( ArrayList<Fragentyp> fragen) {
        this.fragen = fragen != null ? fragen : new ArrayList<>();
    }

    public void add(Fragentyp frage) {
        fragen.add(frage);
    }

    public void remove(Fragentyp frage) {
        fragen.remove(frage);
    }

    public Fragentyp getFrage(int n) {
        return fragen.get(n);
    }

}