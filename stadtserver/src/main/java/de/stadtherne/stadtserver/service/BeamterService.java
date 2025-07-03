package de.stadtherne.stadtserver.service;

import de.stadtherne.stadtserver.model.Veranstaltung;
import de.stadtherne.stadtserver.model.Beamter;
import de.stadtherne.stadtserver.repository.BeamterRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BeamterService {
    private final BeamterRepository beamterRepository;

    public BeamterService(BeamterRepository beamterRepository) {
        this.beamterRepository = beamterRepository;
    }

    public List<Beamter> alleBeamten() {
        return beamterRepository.findAll();
    }

    public Optional<Beamter> BeamterByID(Long id) {
        return beamterRepository.findById(id);
    }

    public Veranstaltung speichern(Veranstaltung veranstaltung) {
        return beamterRepository.save(veranstaltung);
    }

    public void loeschen(Long id) {
        beamterRepository.deleteById(id);
    }
}