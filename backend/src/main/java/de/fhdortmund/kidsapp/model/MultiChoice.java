package de.fhdortmund.kidsapp.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Entity representing a multiple-choice question type.
 */
@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class MultiChoice extends Fragentyp {
    @ElementCollection
    private List<String> antwortoptionen = new ArrayList<>();
}