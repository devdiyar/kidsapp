package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import lombok.Data;

/**
 * Abstrakte Basisklasse für alle Status-Typen.
 * Implementiert das Zustandsmuster (State Pattern).
 */
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public abstract class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Gemeinsame Methoden für alle Status
    public abstract void umfrageVerfuegbarSetzen();
    public abstract void bewertungVerfuegbarSetzen();
    public abstract void ausstehenSetzen();
    public abstract void liveSetzen();
    public abstract void stattfindendSetzen();
    public abstract void abgeschlossenSetzen();
    public abstract void geloeschtSetzen();
}