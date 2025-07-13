package de.fhdortmund.kidsapp.model;

import java.sql.Date;
import java.sql.Time;

import jakarta.persistence.Embeddable;
import lombok.Data;


@Embeddable
@Data
public class TerminT {
    private Date datum;
    private Time uhrzeitVon;
    private Time uhrzeitBis;
}