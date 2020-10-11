package com.example.FullStackSpringBoot.student;

import java.util.UUID;

public class Student {
    private final UUID studentId;
    private final String firstName;
    private final String lastName;
    private final Gender gender;
    private final String email;

    enum Gender {
        MALE, FEMALE
    }

    public Student(UUID studentId, String firstName, String lastName, Gender gender, String email) {
        this.studentId = studentId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.email = email;
    }

    public UUID getStudentId() {
        return studentId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Gender getGender() {
        return gender;
    }

    public String getEmail() {
        return email;
    }
}
