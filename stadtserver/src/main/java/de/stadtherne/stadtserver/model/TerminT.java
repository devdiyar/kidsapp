package de.stadtherne.stadtserver.model;

import java.sql.Time;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class TerminT {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private AnschriftT anschrift;
    private String tag;
    private Date datum;
    private Time uhrzeit;

    public TerminT() {}

    public TerminT(AnschriftT anschrift, String tag, Date datum, Time uhrzeit){
        this.anschrift = anschrift;
        this.tag = tag;
        this.datum = datum;
        this.uhrzeit = uhrzeit;
    }
}