package org.isetn.RestControllers;

import java.util.List;

import org.isetn.entities.Classe;
import org.isetn.entities.Etudiant;
import org.isetn.entities.Formation;
import org.isetn.repository.ClasseRepository;
import org.isetn.repository.EtudiantRepository;
import org.isetn.repository.FormationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("etudiant")
public class EtudiantController {
    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private ClasseRepository classeRepository;

    @Autowired
    private FormationRepository formationRepository;

    @PostMapping("/add")
    public Etudiant add(@RequestBody Etudiant etudiant) {
        // Fetch and set Classe
        if (etudiant.getClasse() != null && etudiant.getClasse().getCodClass() != null) {
            Classe classe = classeRepository.findById(etudiant.getClasse().getCodClass()).orElse(null);
            etudiant.setClasse(classe);
        }

        // Fetch and set Formation
        if (etudiant.getFormation() != null && etudiant.getFormation().getId() != null) {
            Formation formation = formationRepository.findById(etudiant.getFormation().getId()).orElse(null);
            etudiant.setFormation(formation);
        }

        return etudiantRepository.save(etudiant);
    }

    @GetMapping("/all")
    public List<Etudiant> getAll() {
        return etudiantRepository.findAll();
    }

    @GetMapping("/byClass")
    public List<Etudiant> getByClass(@RequestParam Long classId) {
        return etudiantRepository.findByClasseCodClass(classId);
    }

    @GetMapping("/byFormation")
    public List<Etudiant> getByFormation(@RequestParam Long formationId) {
        return etudiantRepository.findByFormationId(formationId);
    }

    @DeleteMapping("/delete")
    public void delete(@Param("id") Long id) {
        Etudiant c = etudiantRepository.findById(id).orElse(null);
        if (c != null) {
            etudiantRepository.delete(c);
        }
    }

    @PutMapping("/update")
    public Etudiant update(@RequestBody Etudiant etudiant) {
        // Fetch and set Classe
        if (etudiant.getClasse() != null && etudiant.getClasse().getCodClass() != null) {
            Classe classe = classeRepository.findById(etudiant.getClasse().getCodClass()).orElse(null);
            etudiant.setClasse(classe);
        }

        // Fetch and set Formation
        if (etudiant.getFormation() != null && etudiant.getFormation().getId() != null) {
            Formation formation = formationRepository.findById(etudiant.getFormation().getId()).orElse(null);
            etudiant.setFormation(formation);
        }

        return etudiantRepository.save(etudiant);
    }
}

