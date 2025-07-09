package de.fhdortmund.kidsapp.service;

import de.fhdortmund.kidsapp.model.Aktivitaet;
import de.fhdortmund.kidsapp.Repository.AktivitaetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Service class for handling activity-related business logic.
 */
@Service
public class AktivitaetService {
    
    @Autowired
    private AktivitaetRepository aktivitaetRepository;
    
    public List<Aktivitaet> getAllAktivitaeten() {
        return aktivitaetRepository.findAll();
    }
    
    public Aktivitaet getAktivitaetById(Long id) {
        return aktivitaetRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Aktivität nicht gefunden"));
    }
    
    public List<Aktivitaet> getAktivitaetenByTeilnehmer(Long teilnehmerId) {
        return aktivitaetRepository.findByTeilnehmerId(teilnehmerId);
    }
    
    public List<Aktivitaet> getAktivitaetenByStatus(String status) {
        return aktivitaetRepository.findByStatus(status);
    }
    
    public Aktivitaet saveAktivitaet(Aktivitaet aktivitaet) {
        return aktivitaetRepository.save(aktivitaet);
    }
    
    public void deleteAktivitaet(Long id) {
        aktivitaetRepository.deleteById(id);
    }
}