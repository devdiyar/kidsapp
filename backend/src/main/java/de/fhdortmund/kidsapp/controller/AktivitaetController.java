package de.fhdortmund.kidsapp.controller;

import de.fhdortmund.kidsapp.model.Aktivitaet;
import de.fhdortmund.kidsapp.service.AktivitaetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for activity-related endpoints.
 */
@RestController
@RequestMapping("/api/aktivitaeten")
public class AktivitaetController {
    
    @Autowired
    private AktivitaetService aktivitaetService;
    
    @GetMapping
    public List<Aktivitaet> getAllAktivitaeten() {
        return aktivitaetService.getAllAktivitaeten();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Aktivitaet> getAktivitaetById(@PathVariable Long id) {
        try {
            Aktivitaet aktivitaet = aktivitaetService.getAktivitaetById(id);
            return ResponseEntity.ok(aktivitaet);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/teilnehmer/{teilnehmerId}")
    public List<Aktivitaet> getAktivitaetenByTeilnehmer(@PathVariable Long teilnehmerId) {
        return aktivitaetService.getAktivitaetenByTeilnehmer(teilnehmerId);
    }
    
    @GetMapping("/status/{status}")
    public List<Aktivitaet> getAktivitaetenByStatus(@PathVariable String status) {
        return aktivitaetService.getAktivitaetenByStatus(status);
    }
    
    @PostMapping
    public Aktivitaet createAktivitaet(@RequestBody Aktivitaet aktivitaet) {
        return aktivitaetService.saveAktivitaet(aktivitaet);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Aktivitaet> updateAktivitaet(
            @PathVariable Long id, 
            @RequestBody Aktivitaet aktivitaet) {
        try {
            aktivitaetService.getAktivitaetById(id); // Check if exists
            aktivitaet.setId(id);
            return ResponseEntity.ok(aktivitaetService.saveAktivitaet(aktivitaet));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAktivitaet(@PathVariable Long id) {
        try {
            aktivitaetService.deleteAktivitaet(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}