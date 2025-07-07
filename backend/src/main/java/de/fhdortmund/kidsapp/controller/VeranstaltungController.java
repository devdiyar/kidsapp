package de.fhdortmund.kidsapp.controller;

import de.fhdortmund.kidsapp.model.Veranstaltung;
import de.fhdortmund.kidsapp.service.VeranstaltungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/veranstaltungen")
public class VeranstaltungController {
    @Autowired
    private VeranstaltungService veranstaltungService;

    @GetMapping
    public List<Veranstaltung> getAll() {
        return veranstaltungService.getAllVeranstaltungen();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veranstaltung> getById(@PathVariable Long id) {
        try {
            Veranstaltung veranstaltung = veranstaltungService.getVeranstaltungById(id);
            return ResponseEntity.ok(veranstaltung);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Veranstaltung create(@RequestBody Veranstaltung veranstaltung) {
        return veranstaltungService.saveVeranstaltung(veranstaltung);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veranstaltung> update(@PathVariable Long id, @RequestBody Veranstaltung veranstaltung) {
        try {
            veranstaltungService.getVeranstaltungById(id);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
        veranstaltung.setId(id);
        return ResponseEntity.ok(veranstaltungService.saveVeranstaltung(veranstaltung));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            veranstaltungService.getVeranstaltungById(id);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
        veranstaltungService.deleteVeranstaltung(id);
        return ResponseEntity.noContent().build();
    }
}
