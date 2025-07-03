package de.stadtherne.stadtserver.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.List;

@Entity
public class Veranstaltung {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Umfrage umfrage;
    private Status status;
    private List<Bewertung> bewertungen;



    public Umfrage umfrageErstellen(){
        return umfrage;
    }
    public void umfrageVerfuegbarSetzen(){

    }

    public void trendingSetzen(){

    }
    public void bewertungVerfuegbarSetzen(){

    }
    public void abgeschlossenSetzen(){

    }
    public void liveSetzen(){

    }
    public void ausstehendSetzen(){

    }
    public void stattfindendSetzen(){

    }
    public void geloeschtSetzen(){

    }





}
