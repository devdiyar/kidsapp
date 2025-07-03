package de.fhdortmund.kidsapp.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.fhdortmund.kidsapp.model.Veranstaltung;


@Repository
public interface VeranstaltungRepository extends JpaRepository<Veranstaltung, Long> {
    List<Veranstaltung> findByTeilnehmerId(Long teilnehmerId);
    List<Veranstaltung> findByAktuellerstatusClass(Class<?> statusClass);
}