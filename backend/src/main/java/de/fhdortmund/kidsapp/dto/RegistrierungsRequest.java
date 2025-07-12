package de.fhdortmund.kidsapp.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class RegistrierungsRequest {
    private String email;
    private String benutzername;
    private String passwort;
    private String vorname;
    private String nachname;
    private LocalDate geburtsdatum;
}
