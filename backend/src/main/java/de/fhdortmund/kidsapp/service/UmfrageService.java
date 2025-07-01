package de.fhdortmund.kidsapp.service;

import de.fhdortmund.kidsapp.model.Umfrage;
import de.fhdortmund.kidsapp.Repository.UmfrageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Service class for handling survey-related business logic.
 */
@Service
public class UmfrageService {
    
    @Autowired
    private UmfrageRepository umfrageRepository;
    
    public List<Umfrage> getAllUmfragen() {
        return umfrageRepository.findAll();
    }
    
    public Umfrage getUmfrageById(Long id) {
        return umfrageRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Umfrage nicht gefunden"));
    }
    
    public List<Umfrage> getUmfragenByErsteller(Long erstellerId) {
        return umfrageRepository.findByErstellerId(erstellerId);
    }
    
    public Umfrage saveUmfrage(Umfrage umfrage) {
        return umfrageRepository.save(umfrage);
    }
    
    public void deleteUmfrage(Long id) {
        umfrageRepository.deleteById(id);
    }
}