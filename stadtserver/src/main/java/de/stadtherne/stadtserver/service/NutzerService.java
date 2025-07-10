package de.stadtherne.stadtserver.service;

import de.stadtherne.stadtserver.model.Nutzer;
import de.stadtherne.stadtserver.repository.NutzerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NutzerService {
    private final NutzerRepository nutzerRepository;

    public NutzerService(NutzerRepository nutzerRepository) {
        this.nutzerRepository = nutzerRepository;
    }

    public List<Nutzer> findeNutzer() {
        return nutzerRepository.findAll();
    }

    public Optional<Nutzer> nutzerByID(Long id) {
        return nutzerRepository.findById(id);
    }

    public Nutzer speichern(Nutzer nutzer) {
        return nutzerRepository.save(nutzer);
    }

    public void löschen(Long id) {
        nutzerRepository.deleteById(id);
    }
}