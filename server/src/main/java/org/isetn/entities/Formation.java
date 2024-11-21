package org.isetn.entities;

import java.util.Collection;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Formation {
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private int duree;

    @OneToMany(mappedBy="formation", cascade = CascadeType.ALL)
    @JsonBackReference
    private Collection<Etudiant> etudiants;
}
