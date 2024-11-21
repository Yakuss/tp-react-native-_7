package org.isetn.RestControllers;

import java.util.List;

import org.isetn.entities.Matiere;
import org.isetn.repository.MatiereRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("matiere")
public class MatiereController {
    @Autowired
    private MatiereRepository matiereRepository;

    @PostMapping("/add")
    public Matiere add(@RequestBody Matiere matiere) {
        return matiereRepository.save(matiere);
    }

    @GetMapping("/all")
    public List<Matiere> getAll() {
        return matiereRepository.findAll();
    }

    @DeleteMapping("/delete")
    public void delete(@Param("id") Long id) {
        Matiere m = matiereRepository.findById(id).orElse(null);
        if (m != null) {
            matiereRepository.delete(m);
        }
    }

    @PutMapping("/update")
    public Matiere update(@RequestBody Matiere matiere) {
        return matiereRepository.save(matiere);
    }
}
