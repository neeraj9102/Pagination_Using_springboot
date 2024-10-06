package com.my.hibernate.hibernate_demo.repository;







import com.my.hibernate.hibernate_demo.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
}
