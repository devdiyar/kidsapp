package de.fhdortmund.kidsapp.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.fhdortmund.kidsapp.model.Fabrik.Bewertung;

@Repository
public interface BewertungRepository extends JpaRepository<Bewertung, Long> {
    
}