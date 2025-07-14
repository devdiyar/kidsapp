// VeranstaltungService.java
package de.fhdortmund.kidsapp.service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.fhdortmund.kidsapp.model.Fabrik.Bewertung;
import de.fhdortmund.kidsapp.model.Fabrik.RegistrierterNutzer;
import de.fhdortmund.kidsapp.model.Veranstaltung;
import de.fhdortmund.kidsapp.model.Zustaende.Erstellt;
import de.fhdortmund.kidsapp.repository.VeranstaltungRepository;

@Service
public class VeranstaltungService {

    @Autowired
    private VeranstaltungRepository veranstaltungRepository;

    public List<Veranstaltung> getAllVeranstaltungen() {
        return veranstaltungRepository.findAll();
    }

    public Veranstaltung getVeranstaltungById(Long id) {
        return veranstaltungRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Veranstaltung nicht gefunden"));
    }

    public List<Veranstaltung> getVeranstaltungenByTeilnehmer(Long teilnehmerId) {
        return veranstaltungRepository.findByTeilnehmerId(teilnehmerId);
    }

    public List<Veranstaltung> getVeranstaltungenByStatus(String statusType) {
        Class<?> statusClass;
        try {
            statusClass = Class.forName("de.fhdortmund.kidsapp.model.Zustaende." + statusType);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Ungültiger Status: " + statusType);
        }
        return veranstaltungRepository.findByAktuellerstatusClass(statusClass);
    }

    public List<Veranstaltung> sucheVeranstaltungen(String suchbegriff) {
        return veranstaltungRepository.findByTitelContainingIgnoreCase(suchbegriff);
    }

    public List<Veranstaltung> getVeranstaltungenImZeitraum(Date start, Date end) {
        return veranstaltungRepository.findByTerminDatumBetween(start, end);
    }

    public Bewertung addBewertung(Long veranstaltungId, int sternanzahl, String kommentar, RegistrierterNutzer bewerter) {
        Veranstaltung veranstaltung = getVeranstaltungById(veranstaltungId);
        Bewertung bewertung = veranstaltung.bewertungErstellen(sternanzahl, kommentar, bewerter);
        veranstaltungRepository.save(veranstaltung);
        return bewertung;
    }

    public Veranstaltung saveVeranstaltung(Veranstaltung veranstaltung) {
        if (veranstaltung.getAktuellerstatus() == null) {
            veranstaltung.setAktuellerstatus(new Erstellt(veranstaltung));
        }
        return veranstaltungRepository.save(veranstaltung);
    }
}
