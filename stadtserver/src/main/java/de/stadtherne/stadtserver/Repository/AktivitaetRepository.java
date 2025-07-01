package de.stadtherne.stadtserver.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.stadtherne.stadtserver.model.Aktivitaet;

/**
 * Repository for handling Aktivitaet entities.
 */
@Repository
public interface AktivitaetRepository extends JpaRepository<Aktivitaet, Long> {

}