package de.stadtherne.stadtserver.model;

import java.time.LocalDateTime;
import java.util.Date;

import lombok.Data;

@Data
public class TerminT {

    private Date datum;
    private LocalDateTime uhrzeit;
}
