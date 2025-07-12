package de.fhdortmund.kidsapp.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import de.fhdortmund.kidsapp.dto.JwtResponse;
import de.fhdortmund.kidsapp.dto.LoginRequest;
import de.fhdortmund.kidsapp.dto.NutzerResponse;
import de.fhdortmund.kidsapp.dto.RegistrierungsRequest;
import de.fhdortmund.kidsapp.dto.TokenRefreshRequest;
import de.fhdortmund.kidsapp.dto.TokenRefreshResponse;
import de.fhdortmund.kidsapp.model.Fabrik.RegistrierterNutzer;
import de.fhdortmund.kidsapp.model.Veranstaltung;
import de.fhdortmund.kidsapp.service.JwtService;
import de.fhdortmund.kidsapp.service.RegistrierterNutzerService;
import io.jsonwebtoken.ExpiredJwtException;

@RestController
@RequestMapping(value = "/api/registrierteNutzer", produces = MediaType.APPLICATION_JSON_VALUE)
@CrossOrigin(origins = "*")
public class RegistrierterNutzerController {

    @Autowired
    private RegistrierterNutzerService nutzerService;

    @Autowired
    private JwtService jwtService;

    @GetMapping
    public ResponseEntity<List<NutzerResponse>> getAllNutzer() {
        List<NutzerResponse> nutzerResponses = nutzerService.getAllNutzer().stream()
                .map(nutzer -> nutzerService.toNutzerResponse(nutzer))
                .collect(Collectors.toList());
        return ResponseEntity.ok(nutzerResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getNutzerById(@PathVariable Long id) {
        try {
            RegistrierterNutzer nutzer = nutzerService.getNutzerById(id);
            return ResponseEntity.ok(nutzerService.toNutzerResponse(nutzer));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/auth/registrieren")
    public ResponseEntity<?> registrieren(@RequestBody RegistrierungsRequest request) {
        try {
            RegistrierterNutzer nutzer = nutzerService.registrieren(request);
            // Direkt einen Token nach der Registrierung erstellen
            String jwt = jwtService.generateToken(nutzer);
            String refreshToken = jwtService.generateRefreshToken(nutzer.getEmail());

            JwtResponse jwtResponse = new JwtResponse(jwt, refreshToken, "Bearer");

            // Response-Objekt mit Token und Nutzerdaten
            return ResponseEntity.status(HttpStatus.CREATED).body(jwtResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/auth/anmelden")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            RegistrierterNutzer nutzer = nutzerService.authenticate(
                    loginRequest.getEmailBenutzername(),
                    loginRequest.getPasswort()
            );

            String jwt = jwtService.generateToken(nutzer);
            String refreshToken = jwtService.generateRefreshToken(nutzer.getEmail());

            return ResponseEntity.ok(new JwtResponse(jwt, refreshToken, "Bearer"));

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Ungültige Anmeldedaten: " + e.getMessage());
        }
    }

    @PostMapping("/auth/refreshtoken")
    public ResponseEntity<?> refreshToken(@RequestBody TokenRefreshRequest request) {
        String requestRefreshToken = request.getToken();

        try {
            // Verwende normale Token Validierung für Refresh Token
            if (jwtService.validateToken(requestRefreshToken)) {
                // Extrahiere User Email vom Token
                String email = jwtService.extractUsername(requestRefreshToken);
                
                // Hole den User und generiere neuen Access Token
                RegistrierterNutzer nutzer = nutzerService.findByEmail(email);
                String accessToken = jwtService.generateToken(nutzer);
                // Optional: Neuen Refresh Token generieren (Token Rotation)
                String newRefreshToken = jwtService.generateRefreshToken(email);

                return ResponseEntity.ok(new TokenRefreshResponse(
                        accessToken,
                        newRefreshToken, // Verwende neuen Refresh Token
                        "Bearer"));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("Refresh token ist ungültig");
            }
        } catch (ExpiredJwtException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Refresh token ist abgelaufen. Bitte erneut anmelden.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Fehler beim Verarbeiten des Refresh Tokens: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateNutzer(@PathVariable Long id, @RequestBody RegistrierterNutzer nutzer) {
        try {
            RegistrierterNutzer updatedNutzer = nutzerService.updateNutzer(id, nutzer);
            return ResponseEntity.ok(nutzerService.toNutzerResponse(updatedNutzer));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNutzer(@PathVariable Long id) {
        try {
            nutzerService.deleteNutzer(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{nutzerId}/veranstaltungen/{veranstaltungId}/anmelden")
    public ResponseEntity<Void> anmeldenZuVeranstaltung(
            @PathVariable Long nutzerId,
            @PathVariable Long veranstaltungId) {
        try {
            nutzerService.anmeldenZuVeranstaltung(nutzerId, veranstaltungId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{nutzerId}/veranstaltungen/{veranstaltungId}/abmelden")
    public ResponseEntity<Void> abmeldenVonVeranstaltung(
            @PathVariable Long nutzerId,
            @PathVariable Long veranstaltungId) {
        try {
            nutzerService.abmeldenVonVeranstaltung(nutzerId, veranstaltungId);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{nutzerId}/veranstaltungen")
    public ResponseEntity<List<Veranstaltung>> getAngemeldeteVeranstaltungen(@PathVariable Long nutzerId) {
        try {
            return ResponseEntity.ok(nutzerService.getAngemeldeteVeranstaltungen(nutzerId));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
