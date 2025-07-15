package de.fhdortmund.kidsapp.model.Kompositum;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class SingleChoice extends Fragentyp {
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> antwortoptionen = new ArrayList<>();
}