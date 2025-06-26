package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Aktivitaet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String titel;
    //termin fehlt noch
    @ManyToOne
    private Status status;


    public void liveSetzen() { status.liveSetzen(this); }
    public void abgeschlossenSetzen() { status.abgeschlossenSetzen(this); }
    public void ausstehendSetzen() { status.ausstehendSetzen(this); }
    public void geloeschtSetzen() { status.geloeschtSetzen(this); }
    public void stattfindendSetzen() { status.stattfindendSetzen(this); }
    public void bewertungVerfuegbarSetzen() { status.bewertungVerfuegbarSetzen(this); }
    public void umfrageVerfuegbarSetzen() { status.umfrageVerfuegbarSetzen(this); }
    public void trendingSetzen() { status.trendingSetzen(this); }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Status getStatus() {
        return status;
    }
}
