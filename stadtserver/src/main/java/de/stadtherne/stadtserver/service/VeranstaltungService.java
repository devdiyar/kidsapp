package de.stadtherne.stadtserver.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import de.stadtherne.stadtserver.model.Veranstaltung;
import de.stadtherne.stadtserver.repository.VeranstaltungRepository;

@Service
public class VeranstaltungService {
    private final VeranstaltungRepository veranstaltungRepository;

    public VeranstaltungService(VeranstaltungRepository veranstaltungRepository) {
        this.veranstaltungRepository = veranstaltungRepository;
    }

    public List<Veranstaltung> alleVeranstaltungen() {
        return veranstaltungRepository.findAll();
    }

    public Optional<Veranstaltung> veranstaltungByID(Long id) {
        return veranstaltungRepository.findById(id);
    }

    public Veranstaltung speichern(Veranstaltung veranstaltung) {
        return veranstaltungRepository.save(veranstaltung);
    }

    public void loeschen(Long id) {
        veranstaltungRepository.deleteById(id);
    }
}