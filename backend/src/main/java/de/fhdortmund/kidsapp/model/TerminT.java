package de.fhdortmund.kidsapp.model;

import java.sql.Date;

import jakarta.persistence.Embeddable;
import lombok.Data;


@Embeddable
@Data
public class TerminT {
    private Date datum;
    private Date uhrzeitVon;
    private Date uhrzeitBis;
}