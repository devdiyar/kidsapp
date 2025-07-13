package de.stadtherne.stadtserver.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class Umfrage extends Fragentyp {

    private List<Fragentyp> fragentypen = new ArrayList<>();

    private Veranstaltung veranstaltung;

    public Umfrage() {
        this.fragentypen = new ArrayList<>();
    }

    public Umfrage(ArrayList<Fragentyp> fragentypen) {
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
