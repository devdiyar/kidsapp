package de.stadtherne.stadtserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.stadtherne.stadtserver.model.Umfrage;

/**
 * Repository for handling Umfrage entities.
 */
@Repository
public interface UmfrageRepository extends JpaRepository<Umfrage, Long> {
    // Methoden ergänzen
}