package de.stadtherne.stadtserver.model;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class MultiChoice extends Fragentyp {

    private List<String> antwortoptionen = new ArrayList<>();
}
