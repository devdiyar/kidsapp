package de.fhdortmund.kidsapp.dto;

import java.time.LocalDate;

import lombok.Data;

@Data
public class NutzerResponse {
    private Long id;
    private String email;
    private String benutzername;
    private String vorname;
    private String nachname;
    private LocalDate geburtsdatum;
}
