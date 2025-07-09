package de.fhdortmund.kidsapp.controller;

import de.fhdortmund.kidsapp.model.RegistrierterNutzer;
import de.fhdortmund.kidsapp.service.NutzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for user-related endpoints.
 */
@RestController
@RequestMapping("/api/nutzer")
public class NutzerController {
    
    @Autowired
    private NutzerService nutzerService;
    
    @GetMapping
    public List<RegistrierterNutzer> getAllNutzer() {
        return nutzerService.getAllNutzer();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<RegistrierterNutzer> getNutzerById(@PathVariable Long id) {
        try {
            RegistrierterNutzer nutzer = nutzerService.getNutzerById(id);
            return ResponseEntity.ok(nutzer);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public RegistrierterNutzer createNutzer(@RequestBody RegistrierterNutzer nutzer) {
        return nutzerService.saveNutzer(nutzer);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<RegistrierterNutzer> updateNutzer(
            @PathVariable Long id, 
            @RequestBody RegistrierterNutzer nutzer) {
        try {
            nutzerService.getNutzerById(id); // Check if exists
            nutzer.setId(id);
            return ResponseEntity.ok(nutzerService.saveNutzer(nutzer));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNutzer(@PathVariable Long id) {
        try {
            nutzerService.deleteNutzer(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}