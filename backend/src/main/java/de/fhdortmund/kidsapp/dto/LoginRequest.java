package de.fhdortmund.kidsapp.dto;

import lombok.Data;

@Data
public class LoginRequest {
    private String emailBenutzername;
    private String passwort;
}
