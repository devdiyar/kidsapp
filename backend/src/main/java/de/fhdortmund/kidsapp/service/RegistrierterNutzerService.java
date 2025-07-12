package de.fhdortmund.kidsapp.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import de.fhdortmund.kidsapp.dto.NutzerResponse;
import de.fhdortmund.kidsapp.dto.RegistrierungsRequest;
import de.fhdortmund.kidsapp.model.Fabrik.RegistrierterNutzer;
import de.fhdortmund.kidsapp.model.Veranstaltung;
import de.fhdortmund.kidsapp.repository.RegistrierterNutzerRepository;
import de.fhdortmund.kidsapp.repository.VeranstaltungRepository;

@Service
public class RegistrierterNutzerService {

    @Autowired
    private RegistrierterNutzerRepository registrierterNutzerRepository;

    @Autowired
    private VeranstaltungRepository veranstaltungRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<RegistrierterNutzer> getAllNutzer() {
        return registrierterNutzerRepository.findAll();
    }

    public RegistrierterNutzer getNutzerById(Long id) {
        return registrierterNutzerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nutzer nicht gefunden"));
    }

    public RegistrierterNutzer updateNutzer(Long id, RegistrierterNutzer nutzer) {
        RegistrierterNutzer existingNutzer = getNutzerById(id);

        if (!existingNutzer.getEmail().equals(nutzer.getEmail())
                && registrierterNutzerRepository.existsByEmail(nutzer.getEmail())) {
            throw new RuntimeException("Email bereits registriert");
        }
        if (!existingNutzer.getBenutzername().equals(nutzer.getBenutzername())
                && registrierterNutzerRepository.existsByBenutzername(nutzer.getBenutzername())) {
            throw new RuntimeException("Benutzername bereits vergeben");
        }

        nutzer.setId(id);
        if (nutzer.getPasswort() != null && !nutzer.getPasswort().equals(existingNutzer.getPasswort())) {
            nutzer.setPasswort(passwordEncoder.encode(nutzer.getPasswort()));
        } else {
            nutzer.setPasswort(existingNutzer.getPasswort());
        }

        return registrierterNutzerRepository.save(nutzer);
    }

    public void deleteNutzer(Long id) {
        registrierterNutzerRepository.deleteById(id);
    }

    public void anmeldenZuVeranstaltung(Long nutzerId, Long veranstaltungId) {
        RegistrierterNutzer nutzer = getNutzerById(nutzerId);
        Veranstaltung veranstaltung = veranstaltungRepository.findById(veranstaltungId)
                .orElseThrow(() -> new RuntimeException("Veranstaltung nicht gefunden"));

        if (!nutzer.getAngemeldeteVeranstaltungen().contains(veranstaltung)) {
            nutzer.getAngemeldeteVeranstaltungen().add(veranstaltung);
            registrierterNutzerRepository.save(nutzer);
        }
    }

    public void abmeldenVonVeranstaltung(Long nutzerId, Long veranstaltungId) {
        RegistrierterNutzer nutzer = getNutzerById(nutzerId);
        nutzer.getAngemeldeteVeranstaltungen().removeIf(v -> v.getId().equals(veranstaltungId));
        registrierterNutzerRepository.save(nutzer);
    }

    public List<Veranstaltung> getAngemeldeteVeranstaltungen(Long nutzerId) {
        RegistrierterNutzer nutzer = getNutzerById(nutzerId);
        return nutzer.getAngemeldeteVeranstaltungen();
    }

    public RegistrierterNutzer registrieren(RegistrierungsRequest request) {
        if (registrierterNutzerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email bereits registriert");
        }
        if (registrierterNutzerRepository.existsByBenutzername(request.getBenutzername())) {
            throw new RuntimeException("Benutzername bereits vergeben");
        }

        RegistrierterNutzer nutzer = new RegistrierterNutzer();
        nutzer.setEmail(request.getEmail());
        nutzer.setBenutzername(request.getBenutzername());
        nutzer.setPasswort(passwordEncoder.encode(request.getPasswort()));
        nutzer.setVorname(request.getVorname());
        nutzer.setNachname(request.getNachname());
        nutzer.setGeburtsdatum(request.getGeburtsdatum());

        return registrierterNutzerRepository.save(nutzer);
    }

    public RegistrierterNutzer registrieren(String email, String benutzername, String passwort,
            String vorname, String nachname, LocalDate geburtsdatum) {
        RegistrierungsRequest request = new RegistrierungsRequest();
        request.setEmail(email);
        request.setBenutzername(benutzername);
        request.setPasswort(passwort);
        request.setVorname(vorname);
        request.setNachname(nachname);
        request.setGeburtsdatum(geburtsdatum);

        return registrieren(request);
    }

    public RegistrierterNutzer authenticate(String usernameOrEmail, String password) {
        RegistrierterNutzer nutzer = registrierterNutzerRepository
                .findByEmail(usernameOrEmail)
                .orElseGet(() -> registrierterNutzerRepository
                .findByBenutzername(usernameOrEmail)
                .orElseThrow(() -> new BadCredentialsException("Benutzer nicht gefunden")));

        if (!passwordEncoder.matches(password, nutzer.getPasswort())) {
            throw new BadCredentialsException("Falsches Passwort");
        }

        return nutzer;
    }

    public RegistrierterNutzer findByEmail(String email) {
        return registrierterNutzerRepository
                .findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Benutzer mit Email " + email + " nicht gefunden"));
    }

    public NutzerResponse toNutzerResponse(RegistrierterNutzer nutzer) {
        NutzerResponse response = new NutzerResponse();
        response.setId(nutzer.getId());
        response.setEmail(nutzer.getEmail());
        response.setBenutzername(nutzer.getBenutzername());
        response.setVorname(nutzer.getVorname());
        response.setNachname(nutzer.getNachname());
        response.setGeburtsdatum(nutzer.getGeburtsdatum());
        return response;
    }
}
