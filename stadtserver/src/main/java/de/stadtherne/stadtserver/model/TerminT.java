package de.stadtherne.stadtserver.model;

import java.sql.Time;
import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;

@Embeddable
@Data
public class TerminT {


    private AnschriftT anschrift;
    private String tag;
    private Date datum;
    private Time uhrzeit;

    public TerminT() {
    }

    public TerminT(AnschriftT anschrift, String tag, Date datum, Time uhrzeit) {
        this.anschrift = anschrift;
        this.tag = tag;
        this.datum = datum;
        this.uhrzeit = uhrzeit;
    }
}