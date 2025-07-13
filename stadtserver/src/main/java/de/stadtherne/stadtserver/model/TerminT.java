package de.stadtherne.stadtserver.model;

import java.util.Date;

import lombok.Data;

@Data
public class TerminT {

    private Date datum;
    private Date uhrzeitVon;
    private Date uhrzeitBis;
}
