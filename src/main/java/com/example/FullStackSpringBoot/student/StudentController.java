package com.example.FullStackSpringBoot.student;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/students")
public class StudentController {
    @GetMapping
    public List<Student> getAllStudents() {
        return List.of(
                new Student(UUID.randomUUID(), "Michael", "Steinert", Student.Gender.MALE, "michael-steinert@gmx.de"),
                new Student(UUID.randomUUID(), "Marie", "Schmidt", Student.Gender.FEMALE, "marie-schmidt@gmx.de")
        );
    }
}
