package de.stadtherne.stadtserver.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import de.stadtherne.stadtserver.model.komposition.Fragentyp;

@Entity
public class Umfrage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Fragenty> fragentyList = new ArrayList<>();


    public void add(Fragenty fragentyp) {
        fragentyList.add(fragentyp);
    }

    public void remove(Fragenty fragentyp) {
        fragentyList.remove(fragentyp);
    }

    public Fragentyp getFragentyp(int n) {
        if ((n >= 0) && (n < fragentyList.size())) {
            return fragentyList.get(n);
        }
        return null;
    }

    public List<Fragentyp> getFragentyp() {
        return fragentyList;
    }

    public Long getId() {
        return id;
    }
}