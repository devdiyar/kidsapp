package de.stadtherne.stadtserver.service;

import de.stadtherne.stadtserver.model.Aktivitaet;
import de.stadtherne.stadtserver.Repository.AktivitaetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AktivitaetService {
    private final AktivitaetRepository aktivitaetRepository;

    public AktivitaetService(AktivitaetRepository aktivitaetRepository) {
        this.aktivitaetRepository = aktivitaetRepository;
    }

    public List<Aktivitaet> alleAktivitaeten() {
        return aktivitaetRepository.findAll();
    }

    public Optional<Aktivitaet> aktivitaetByID(Long id) {
        return aktivitaetRepository.findById(id);
    }

    public Aktivitaet speichern(Aktivitaet aktivitaet) {
        return aktivitaetRepository.save(aktivitaet);
    }

    public void loeschen(Long id) {
        aktivitaetRepository.deleteById(id);
    }
}