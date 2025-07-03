package de.stadtherne.stadtserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.stadtherne.stadtserver.model.Veranstaltung;

/**
 * Repository for handling Aktivitaet entities.
 */
@Repository
public interface AktivitaetRepository extends JpaRepository<Veranstaltung, Long> {
    // Methoden ergänzen
}