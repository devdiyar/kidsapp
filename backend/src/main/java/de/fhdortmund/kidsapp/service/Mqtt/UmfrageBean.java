package de.fhdortmund.kidsapp.service.Mqtt;


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
