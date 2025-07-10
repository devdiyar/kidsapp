package de.fhdortmund.kidsapp.controller;

import de.fhdortmund.kidsapp.model.Fabrik.RegistrierterNutzer;
import de.fhdortmund.kidsapp.service.NutzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for user-related endpoints.
 */
@RestController
@RequestMapping("/api/nutzer")
public class NutzerController {
    
    @Autowired
    private NutzerService nutzerService;
    
    @GetMapping("/{id}")
    public ResponseEntity<RegistrierterNutzer> getNutzerById(@PathVariable Long id) {
            RegistrierterNutzer nutzer = nutzerService.getNutzerById(id);
            return ResponseEntity.ok(nutzer);
    }
    
    @PostMapping
    public RegistrierterNutzer createNutzer(@RequestBody RegistrierterNutzer nutzer) {
        return nutzerService.saveNutzer(nutzer);
    }
}