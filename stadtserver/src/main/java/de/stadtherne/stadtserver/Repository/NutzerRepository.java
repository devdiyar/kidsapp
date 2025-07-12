package de.stadtherne.stadtserver.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.stadtherne.stadtserver.model.Nutzer;

/**
 * Repository for handling RegistrierterNutzer entities.
 */
@Repository
public interface NutzerRepository extends JpaRepository<Nutzer, Long> {
    // Methoden ergänzen

}