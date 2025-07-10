package de.fhdortmund.kidsapp.model.Kompositum;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Entity
@Data
@EqualsAndHashCode(callSuper = true)
public class Text extends Fragentyp {
}