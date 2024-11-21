package org.isetn.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ClassMat")
public class ClassMat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "codClass")
    private Classe classe;

    @ManyToOne
    @JoinColumn(name = "codMat")
    private Matiere matiere;

    private Float coefMat;
    private Float nbrHS;
}
