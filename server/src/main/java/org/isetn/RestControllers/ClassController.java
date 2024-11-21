package org.isetn.RestControllers;

import java.util.ArrayList;
import java.util.List;

import org.isetn.entities.ClassMat;
import org.isetn.entities.Classe;
import org.isetn.entities.Matiere;
import org.isetn.repository.ClassMatRepository;
import org.isetn.repository.ClasseRepository;
import org.isetn.repository.MatiereRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
@RequestMapping("class")

public class ClassController {
	@Autowired
	private ClasseRepository classeRepository;
	@Autowired
	private MatiereRepository matiereRepository;
	@Autowired
	private ClassMatRepository classMatRepository;

	@PostMapping("/add")
	public Classe add(@RequestBody Classe classe) {
		System.out.println(classe.toString());
		return classeRepository.save(classe);
	}

	@GetMapping("/all")
	public List<Classe> getAll() {
		return classeRepository.findAll();
	}
	
	@DeleteMapping("/delete")
	public void delete(@Param("id") Long id)
	{
		Classe c =  classeRepository.findById(id).get();
		classeRepository.delete(c);
	}
	
	@PutMapping("/update")
	public Classe update(@RequestBody Classe classe) {
		return classeRepository.save(classe);
	}
	
	/*@PostMapping("/{classId}/addMatiere/{matiereId}")
	public Classe addMatiereToClasse(@PathVariable Long classId, @PathVariable Long matiereId) {
		Classe classe = classeRepository.findById(classId).orElse(null);
		Matiere matiere = matiereRepository.findById(matiereId).orElse(null);

		if (classe != null && matiere != null) {
			classe.getMatieres().add(matiere);
			return classeRepository.save(classe);
		}

		return null;
	}*/
	
	@GetMapping("/byMatiere")
	public List<Classe> getClassesByMatiere(@RequestParam Long matiereId) {
	    Matiere matiere = matiereRepository.findById(matiereId).orElse(null);
	    if (matiere != null) {
	        return matiere.getClasses();
	    }
	    return new ArrayList<>();
	}
	
	@PostMapping("/{classId}/addMatiere/{matiereId}")
	public Classe addMatiereToClasse(@PathVariable Long classId, @PathVariable Long matiereId, @RequestBody ClassMat classMatDetails) {
	    System.out.println("Received request to assign matiere to class:");
	    System.out.println("Class ID: " + classId);
	    System.out.println("Matiere ID: " + matiereId);
	    System.out.println("Coefficient: " + classMatDetails.getCoefMat());
	    System.out.println("Number of Hours: " + classMatDetails.getNbrHS());

	    Classe classe = classeRepository.findById(classId).orElse(null);
	    Matiere matiere = matiereRepository.findById(matiereId).orElse(null);

	    if (classe != null && matiere != null) {
	        ClassMat classMat = new ClassMat();
	        classMat.setClasse(classe);
	        classMat.setMatiere(matiere);
	        classMat.setCoefMat(classMatDetails.getCoefMat());
	        classMat.setNbrHS(classMatDetails.getNbrHS());
	        classMatRepository.save(classMat);
	        return classe;
	    }

	    return null;
	}

	
	@GetMapping("/{classId}/matieres")
	public List<Matiere> getMatieresByClass(@PathVariable Long classId) {
	    Classe classe = classeRepository.findById(classId).orElse(null);
	    if (classe != null) {
	        return classe.getMatieres();
	    }
	    return new ArrayList<>();
	}



}
