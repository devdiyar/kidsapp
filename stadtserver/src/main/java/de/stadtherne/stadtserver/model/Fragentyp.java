package de.stadtherne.stadtserver.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Fragentyp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    protected String titel;
    protected String beschreibung;

    protected Fragentyp() {
        //für JPA
    }

    public Fragentyp(String titel, String beschreibung) {
        this.titel = titel;
        this.beschreibung = beschreibung;
    }

    public String getTitel() {
        return titel;
    }

    public String getBeschreibung() {
        return beschreibung;
    }
}