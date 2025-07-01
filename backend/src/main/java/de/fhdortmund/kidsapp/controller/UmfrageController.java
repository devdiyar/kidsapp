package de.fhdortmund.kidsapp.controller;

import de.fhdortmund.kidsapp.model.Umfrage;
import de.fhdortmund.kidsapp.service.UmfrageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for survey-related endpoints.
 */
@RestController
@RequestMapping("/api/umfragen")
public class UmfrageController {
    
    @Autowired
    private UmfrageService umfrageService;
    
    @GetMapping
    public List<Umfrage> getAllUmfragen() {
        return umfrageService.getAllUmfragen();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Umfrage> getUmfrageById(@PathVariable Long id) {
        try {
            Umfrage umfrage = umfrageService.getUmfrageById(id);
            return ResponseEntity.ok(umfrage);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/ersteller/{erstellerId}")
    public List<Umfrage> getUmfragenByErsteller(@PathVariable Long erstellerId) {
        return umfrageService.getUmfragenByErsteller(erstellerId);
    }
    
    @PostMapping
    public Umfrage createUmfrage(@RequestBody Umfrage umfrage) {
        return umfrageService.saveUmfrage(umfrage);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Umfrage> updateUmfrage(
            @PathVariable Long id, 
            @RequestBody Umfrage umfrage) {
        try {
            umfrageService.getUmfrageById(id); // Check if exists
            umfrage.setId(id);
            return ResponseEntity.ok(umfrageService.saveUmfrage(umfrage));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUmfrage(@PathVariable Long id) {
        try {
            umfrageService.deleteUmfrage(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}