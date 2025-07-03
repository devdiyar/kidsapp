package de.fhdortmund.kidsapp.service;

import de.fhdortmund.kidsapp.model.RegistrierterNutzer;
import de.fhdortmund.kidsapp.Repository.NutzerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class NutzerService {
    
    @Autowired
    private NutzerRepository nutzerRepository;
    
    public List<RegistrierterNutzer> getAllNutzer() {
        return nutzerRepository.findAll();
    }
    
    public RegistrierterNutzer getNutzerById(Long id) {
        return nutzerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Nutzer nicht gefunden"));
    }
    
    public RegistrierterNutzer saveNutzer(RegistrierterNutzer nutzer) {
        return nutzerRepository.save(nutzer);
    }
    
    public void deleteNutzer(Long id) {
        nutzerRepository.deleteById(id);
    }
}