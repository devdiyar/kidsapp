package de.stadtherne.stadtserver.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.stadtherne.stadtserver.model.Beamter;

/**
 * Repository for handling Beamter entities.
 */
@Repository
public interface BeamterRepository extends JpaRepository<Beamter, Long> {

}
