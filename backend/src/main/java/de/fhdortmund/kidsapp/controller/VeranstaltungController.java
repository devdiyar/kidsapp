package de.fhdortmund.kidsapp.controller;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @GetMapping("/teilnehmer/{teilnehmerId}")
    public List<Veranstaltung> getByTeilnehmer(@PathVariable Long teilnehmerId) {
        return veranstaltungService.getVeranstaltungenByTeilnehmer(teilnehmerId);
    }

    @GetMapping("/status/{statusType}")
    public List<Veranstaltung> getByStatus(@PathVariable String statusType) {
        return veranstaltungService.getVeranstaltungenByStatus(statusType);
    }

    @GetMapping("/kategorie/{kategorie}")
    public List<Veranstaltung> getByKategorie(@PathVariable String kategorie) {
        return veranstaltungService.getVeranstaltungenByKategorie(kategorie);
    }

    @GetMapping("/preis")
    public List<Veranstaltung> getByMaxPreis(@RequestParam double maxPreis) {
        return veranstaltungService.getVeranstaltungenByMaxPreis(maxPreis);
    }

    @GetMapping("/veranstalter/{veranstalter}")
    public List<Veranstaltung> getByVeranstalter(@PathVariable String veranstalter) {
        return veranstaltungService.getVeranstaltungenByVeranstalter(veranstalter);
    }

    @GetMapping("/suche")
    public List<Veranstaltung> suche(@RequestParam String suchbegriff) {
        return veranstaltungService.sucheVeranstaltungen(suchbegriff);
    }

    @GetMapping("/zeitraum")
    public List<Veranstaltung> getImZeitraum(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date end) {
        return veranstaltungService.getVeranstaltungenImZeitraum(start, end);
    }

    @PostMapping
    public ResponseEntity<Veranstaltung> create(@RequestBody Veranstaltung veranstaltung) {
        return ResponseEntity.ok(veranstaltungService.saveVeranstaltung(veranstaltung));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Veranstaltung> update(@PathVariable Long id, @RequestBody Veranstaltung veranstaltung) {
        try {
            return ResponseEntity.ok(veranstaltungService.updateVeranstaltung(id, veranstaltung));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            veranstaltungService.deleteVeranstaltung(id);
            return ResponseEntity.noContent().build();
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
}
