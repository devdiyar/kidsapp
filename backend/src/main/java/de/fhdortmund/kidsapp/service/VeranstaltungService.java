// VeranstaltungService.java
package de.fhdortmund.kidsapp.service;

import de.fhdortmund.kidsapp.model.Veranstaltung;
import de.fhdortmund.kidsapp.repository.VeranstaltungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
            statusClass = Class.forName("de.fhdortmund.kidsapp.model." + statusType);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("Ungültiger Status: " + statusType);
        }
        return veranstaltungRepository.findByAktuellerstatusClass(statusClass);
    }

    public Veranstaltung saveVeranstaltung(Veranstaltung veranstaltung) {
        return veranstaltungRepository.save(veranstaltung);
    }

    public void deleteVeranstaltung(Long id) {
        veranstaltungRepository.deleteById(id);
    }
}
