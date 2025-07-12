package de.fhdortmund.kidsapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.fhdortmund.kidsapp.model.Fabrik.RegistrierterNutzer;

@Repository
public interface RegistrierterNutzerRepository extends JpaRepository<RegistrierterNutzer, Long> {

    Optional<RegistrierterNutzer> findByEmail(String email);

    Optional<RegistrierterNutzer> findByBenutzername(String benutzername);

    boolean existsByEmail(String email);

    boolean existsByBenutzername(String benutzername);
}
