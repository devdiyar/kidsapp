package de.fhdortmund.kidsapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import de.fhdortmund.kidsapp.model.Kompositum.Umfrage;


@Repository
public interface UmfrageRepository extends JpaRepository<Umfrage, Long> {
}