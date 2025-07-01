package de.fhdortmund.kidsapp.model;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Entity representing a text-based question type.
 */
@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Text extends Fragentyp {
}