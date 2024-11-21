package org.isetn.repository;

import org.isetn.entities.Matiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatiereRepository extends JpaRepository<Matiere, Long> {
    // Additional query methods (if needed) can be defined here
}
