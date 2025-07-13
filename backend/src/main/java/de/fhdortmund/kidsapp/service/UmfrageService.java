package de.fhdortmund.kidsapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.fhdortmund.kidsapp.model.Kompositum.Umfrage;
import de.fhdortmund.kidsapp.model.Veranstaltung;
import de.fhdortmund.kidsapp.repository.UmfrageRepository;
import de.fhdortmund.kidsapp.repository.VeranstaltungRepository;

@Service
public class UmfrageService {

    @Autowired
    private UmfrageRepository umfrageRepository;

    @Autowired
    private VeranstaltungRepository veranstaltungRepository;

    /**
     * Speichert eine neue Umfrage und verknüpft sie mit einer Veranstaltung.
     * Die ID in der Umfrage wird als Veranstaltungs-ID interpretiert.
     * @param umfrage Die zu speichernde Umfrage.
     * @return Die gespeicherte Umfrage.
     */
    public Umfrage saveUmfrageForVeranstaltung(Umfrage umfrage) {
        Long veranstaltungId = umfrage.getId();
        if (veranstaltungId == null) {
            throw new IllegalArgumentException("Die Umfrage muss eine Veranstaltungs-ID haben.");
        }

        Veranstaltung veranstaltung = veranstaltungRepository.findById(veranstaltungId)
                .orElseThrow(() -> new RuntimeException("Veranstaltung mit ID " + veranstaltungId + " nicht gefunden."));

        umfrage.setId(null);
        
        // Bidirektionale Beziehung setzen
        veranstaltung.setUmfrage(umfrage);
        umfrage.setVeranstaltung(veranstaltung);

        // Da die Beziehung von Veranstaltung aus mit CascadeType.ALL definiert ist,
        // wird das Speichern der Veranstaltung auch die Umfrage speichern.
        veranstaltungRepository.save(veranstaltung);

        return veranstaltung.getUmfrage();
    }
}