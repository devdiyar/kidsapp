package de.fhdortmund.kidsapp.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.fhdortmund.kidsapp.model.Veranstaltung;

@Repository
public interface VeranstaltungRepository extends JpaRepository<Veranstaltung, Long> {

    List<Veranstaltung> findByTeilnehmerId(Long teilnehmerId);

    List<Veranstaltung> findByAktuellerstatusClass(Class<?> statusClass);

    List<Veranstaltung> findByPreisLessThanEqual(double preis);

    List<Veranstaltung> findByVeranstalter(String veranstalter);

    List<Veranstaltung> findByTitelContainingIgnoreCase(String suchbegriff);

    List<Veranstaltung> findByTerminDatumBetween(Date start, Date end);
}
