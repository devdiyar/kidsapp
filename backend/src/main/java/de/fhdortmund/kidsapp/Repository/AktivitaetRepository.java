package de.fhdortmund.kidsapp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.fhdortmund.kidsapp.model.Aktivitaet;

/**
 * Repository for handling Aktivitaet entities.
 */
@Repository
public interface AktivitaetRepository extends JpaRepository<Aktivitaet, Long> {
    List<Aktivitaet> findByTeilnehmerId(Long teilnehmerId);
    List<Aktivitaet> findByStatus(String status);
}