package com.example.FullStackSpringBoot.student;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class StudentDataAccessService {

    public List<Student> selectAllStudents() {
        return List.of(
                new Student(UUID.randomUUID(), "Michael", "Steinert", Student.Gender.MALE, "michael-steinert@gmx.de"),
                new Student(UUID.randomUUID(), "Marie", "Schmidt", Student.Gender.FEMALE, "marie-schmidt@gmx.de")
        );
    }
}
