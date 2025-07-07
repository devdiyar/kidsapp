package de.fhdortmund.kidsapp.repository;

import de.fhdortmund.kidsapp.model.Veranstaltung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VeranstaltungRepository extends JpaRepository<Veranstaltung, Long> {
    List<Veranstaltung> findByTeilnehmerId(Long teilnehmerId);
    List<Veranstaltung> findByAktuellerstatusClass(Class<?> statusClass);
}
