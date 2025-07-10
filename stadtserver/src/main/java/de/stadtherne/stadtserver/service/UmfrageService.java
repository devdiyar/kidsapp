package de.stadtherne.stadtserver.service;

import de.stadtherne.stadtserver.model.Umfrage;
import de.stadtherne.stadtserver.Repository.UmfrageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UmfrageService {
    private final UmfrageRepository umfrageRepository;

    public UmfrageService(UmfrageRepository umfrageRepository) {
        this.umfrageRepository = umfrageRepository;
    }

    public List<Umfrage> alleUmfragen() {
        return umfrageRepository.findAll();
    }

    public Optional<Umfrage> umfrageById(Long id) {
        return umfrageRepository.findById(id);
    }

    public Umfrage speichern(Umfrage umfrage) {
        return umfrageRepository.save(umfrage);
    }

    public void löschen(Long id) {
        umfrageRepository.deleteById(id);
    }
}