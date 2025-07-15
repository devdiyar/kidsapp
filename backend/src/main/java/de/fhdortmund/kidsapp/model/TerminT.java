package de.fhdortmund.kidsapp.model;

import java.sql.Date;
import java.time.LocalTime;

import jakarta.persistence.Embeddable;
import lombok.Data;


@Embeddable
@Data
public class TerminT {
    private Date datum;
    private LocalTime uhrzeitVon;
    private LocalTime uhrzeitBis;
}