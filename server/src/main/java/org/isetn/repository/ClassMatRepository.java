package org.isetn.repository;

import org.isetn.entities.ClassMat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassMatRepository extends JpaRepository<ClassMat, Long> {
    // Additional query methods (if needed) can be defined here
}
