package de.stadtherne.stadtserver.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import de.stadtherne.stadtserver.Repository.BeamterRepository;
import de.stadtherne.stadtserver.model.Beamter;

@Service
public class BeamterService {
    private final BeamterRepository beamterRepository;

    public BeamterService(BeamterRepository beamterRepository) {
        this.beamterRepository = beamterRepository;
    }

    public List<Beamter> alleBeamten() {
        return beamterRepository.findAll();
    }

    public Optional<Beamter> beamterById(Long id) {
        return beamterRepository.findById(id);
    }

    public Beamter speichern(Beamter beamter) {
        return beamterRepository.save(beamter);
    }

    public void löschen(Long id) {
        beamterRepository.deleteById(id);
    }
}