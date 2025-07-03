package de.stadtherne.stadtserver.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Umfrage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Fragenty> fragentyList = new ArrayList<>();

    public Umfrage() {}

    public void add(Fragenty fragenty) {
        fragentyList.add(fragenty);
    }

    public void remove(Fragenty fragenty) {
        fragentyList.remove(fragenty);
    }

    public Fragenty getFragenty(int n) {
        if ((n >= 0) && (n < fragentyList.size())) {
            return fragentyList.get(n);
        }
        return null;
    }

    public List<Fragenty> getFragenty() {
        return fragentyList;
    }

    public Long getId() {
        return id;
    }
}