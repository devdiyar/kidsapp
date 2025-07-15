package de.fhdortmund.kidsapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import de.fhdortmund.kidsapp.model.Fabrik.Bewertung;
import de.fhdortmund.kidsapp.model.Fabrik.RegistrierterNutzer;
import de.fhdortmund.kidsapp.model.Veranstaltung;
import de.fhdortmund.kidsapp.service.VeranstaltungService;

@RestController
@RequestMapping("/api/veranstaltungen")
@CrossOrigin(origins = "*")
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

    @PostMapping("/{id}/bewertungen")
    public ResponseEntity<Bewertung> addBewertung(
            @PathVariable Long id,
            @RequestParam int sternanzahl,
            @RequestParam String kommentar,
            @RequestBody RegistrierterNutzer bewerter) {
        try {
            Bewertung bewertung = veranstaltungService.addBewertung(id, sternanzahl, kommentar, bewerter);
            return ResponseEntity.ok(bewertung);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/users/{userId}/favoriten")
    public ResponseEntity<List<Veranstaltung>> getUserFavoriten(@PathVariable Long userId) {
        try {
            List<Veranstaltung> allEvents = veranstaltungService.getAllVeranstaltungen();
            List<Veranstaltung> favorites = allEvents.stream()
                    .limit(3)
                    .toList();
            return ResponseEntity.ok(favorites);
        } catch (Exception e) {
            return ResponseEntity.ok(List.of());
        }
    }

    @GetMapping("/users/{userId}/angemeldete")
    public ResponseEntity<List<Veranstaltung>> getUserAngemeldeteVeranstaltungen(@PathVariable Long userId) {
        try {
            List<Veranstaltung> allEvents = veranstaltungService.getAllVeranstaltungen();
            List<Veranstaltung> registered = allEvents.stream()
                    .skip(2)
                    .limit(4)
                    .toList();
            return ResponseEntity.ok(registered);
        } catch (Exception e) {
            return ResponseEntity.ok(List.of());
        }
    }

    @GetMapping("/users/{userId}/besuchte")
    public ResponseEntity<List<Veranstaltung>> getUserBesuchteVeranstaltungen(@PathVariable Long userId) {
        try {
            List<Veranstaltung> allEvents = veranstaltungService.getAllVeranstaltungen();
            List<Veranstaltung> visited = allEvents.stream()
                    .skip(5)
                    .limit(2)
                    .toList();
            return ResponseEntity.ok(visited);
        } catch (Exception e) {
            return ResponseEntity.ok(List.of());
        }
    }

    @PostMapping("/users/{userId}/favoriten/{veranstaltungId}")
    public ResponseEntity<Void> addToFavorites(@PathVariable Long userId, @PathVariable Long veranstaltungId) {
        try {
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/users/{userId}/favoriten/{veranstaltungId}")
    public ResponseEntity<Void> removeFromFavorites(@PathVariable Long userId, @PathVariable Long veranstaltungId) {
        try {
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/users/{userId}/anmeldungen/{veranstaltungId}")
    public ResponseEntity<Void> anmeldenZuVeranstaltung(@PathVariable Long userId, @PathVariable Long veranstaltungId) {
        try {
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/users/{userId}/anmeldungen/{veranstaltungId}")
    public ResponseEntity<Void> abmeldenVonVeranstaltung(@PathVariable Long userId, @PathVariable Long veranstaltungId) {
        try {
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/users/{userId}/besuchte/{veranstaltungId}")
    public ResponseEntity<Void> markierenAlsBesucht(@PathVariable Long userId, @PathVariable Long veranstaltungId) {
        try {
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
