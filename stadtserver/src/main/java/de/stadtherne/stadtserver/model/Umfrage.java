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

    @OneToMany(mappedBy = "umfrage", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Fragentyp> fragentypList = new ArrayList<>();


    public void add(Fragentyp fragentyp) {
        fragentypList.add(fragentyp);
    }

    public void remove(Fragentyp fragentyp) {
        fragentypList.remove(fragentyp);
    }

    public Fragentyp getFragentyp(int n) {
        if ((n >= 0) && (n < fragentypList.size())) {
            return fragentypList.get(n);
        }
        return null;
    }

    public List<Fragentyp> getFragentyp() {
        return fragentypList;
    }

    public Long getId() {
        return id;
    }
}