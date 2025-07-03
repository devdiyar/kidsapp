package de.fhdortmund.kidsapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.fhdortmund.kidsapp.Repository.UmfrageRepository;
import de.fhdortmund.kidsapp.model.Umfrage;


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
    
//    public List<Umfrage> getUmfragenByErsteller(Long erstellerId) {
//    }
    
    public Umfrage saveUmfrage(Umfrage umfrage) {
        return umfrageRepository.save(umfrage);
    }
    
    public void deleteUmfrage(Long id) {
        umfrageRepository.deleteById(id);
    }
}