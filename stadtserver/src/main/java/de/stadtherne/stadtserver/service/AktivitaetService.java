package de.stadtherne.stadtserver.service;

import de.stadtherne.stadtserver.model.Veranstaltung;
import de.stadtherne.stadtserver.repository.AktivitaetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AktivitaetService {
    private final AktivitaetRepository aktivitaetRepository;

    public AktivitaetService(AktivitaetRepository aktivitaetRepository) {
        this.aktivitaetRepository = aktivitaetRepository;
    }

    public List<Veranstaltung> alleAktivitaeten() {
        return aktivitaetRepository.findAll();
    }

    public Optional<Veranstaltung> aktivitaetByID(Long id) {
        return aktivitaetRepository.findById(id);
    }

    public Veranstaltung speichern(Veranstaltung veranstaltung) {
        return aktivitaetRepository.save(veranstaltung);
    }

    public void loeschen(Long id) {
        aktivitaetRepository.deleteById(id);
    }
}