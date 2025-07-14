package de.stadtherne.stadtserver.bean;

import lombok.Data;

import java.util.List;

@Data
public class UmfrageBean {

    private long veranstaltungId;
    private String fragenTyp;
    private String titel;
    private String beschreibung;
    private List<String> antwort;

}
