package de.fhdortmund.kidsapp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.fhdortmund.kidsapp.model.Umfrage;

/**
 * Repository for handling Umfrage entities.
 */
@Repository
public interface UmfrageRepository extends JpaRepository<Umfrage, Long> {
    List<Umfrage> findByErstellerId(Long erstellerId);
}