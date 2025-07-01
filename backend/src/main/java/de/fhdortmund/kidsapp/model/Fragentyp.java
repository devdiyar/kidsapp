package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.Data;

/**
 * Abstract base class for different types of questions.
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public abstract class Fragentyp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String titel;
    private String beschreibung;
}