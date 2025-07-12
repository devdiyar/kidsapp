package de.fhdortmund.kidsapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    private String token;
    private String refreshToken;
    private String tokenType = "Bearer";
    
    public JwtResponse(String token, String tokenType) {
        this.token = token;
        this.tokenType = tokenType;
    }
}
