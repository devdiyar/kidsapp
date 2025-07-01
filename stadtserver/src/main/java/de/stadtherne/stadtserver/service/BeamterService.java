package de.stadtherne.stadtserver.service;

import de.stadtherne.stadtserver.model.Aktivitaet;
import de.stadtherne.stadtserver.repository.BeamterRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BeamterService {
    private final BeamterRepository beamterRepository;

    public AktivitaetService(BeamterRepository beamterRepository) {
        this.beamterRepository = beamterRepository;
    }

    public List<Aktivitaet> alleBeamten() {
        return beamterRepository.findAll();
    }

    public Optional<Aktivitaet> BeamterByID(Long id) {
        return beamterRepository.findById(id);
    }

    public Aktivitaet speichern(Aktivitaet aktivitaet) {
        return beamterRepository.save(aktivitaet);
    }

    public void loeschen(Long id) {
        beamterRepository.deleteById(id);
    }
}