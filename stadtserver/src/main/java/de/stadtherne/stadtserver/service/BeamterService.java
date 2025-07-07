package de.stadtherne.stadtserver.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import de.stadtherne.stadtserver.model.Beamter;
import de.stadtherne.stadtserver.repository.BeamterRepository;

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

    public Beamter speichern(Beamter beamter) {
        return beamterRepository.save(beamter);
    }

    public void loeschen(Long id) {
        beamterRepository.deleteById(id);
    }
}