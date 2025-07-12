package de.stadtherne.stadtserver.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Umfrage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Fragentyp> fragen = new ArrayList<>();

    public void add(Fragentyp frage) { fragen.add(frage); }
    public void remove(Fragentyp frage) { fragen.remove(frage); }
    public Fragentyp getFragentypt(int n) { return fragen.get(n); }
    public List<Fragentyp> getFragentypen() { return fragen; }
}