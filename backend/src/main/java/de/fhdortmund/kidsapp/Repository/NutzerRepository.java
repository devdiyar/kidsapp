package de.fhdortmund.kidsapp.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.fhdortmund.kidsapp.model.RegistrierterNutzer;


@Repository
public interface NutzerRepository extends JpaRepository<RegistrierterNutzer, Long> {
}