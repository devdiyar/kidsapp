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

    public Umfrage saveUmfrageForVeranstaltung(Umfrage umfrage) {
        Long veranstaltungId = umfrage.getVeranstaltungId();
        if (veranstaltungId == null) {
            throw new IllegalArgumentException("Die Umfrage muss eine Veranstaltungs-ID haben.");
        }

        Veranstaltung veranstaltung = veranstaltungRepository.findById(veranstaltungId)
                .orElseThrow(() -> new RuntimeException("Veranstaltung mit ID " + veranstaltungId + " nicht gefunden."));

        veranstaltung.setUmfrage(umfrage);
        umfrage.setVeranstaltung(veranstaltung);

        veranstaltungRepository.save(veranstaltung);

        return veranstaltung.getUmfrage();
    }
}