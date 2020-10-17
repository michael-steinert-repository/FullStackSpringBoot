package com.example.FullStackSpringBoot.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public class StudentDataAccessService {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Student> selectAllStudents() {
        String sql = "SELECT student_id, first_name, last_name, gender, email FROM student";
        return jdbcTemplate.query(sql, mapStudentFromDb());
    }

    public int insertStudent(UUID studentId, Student student) {
        String sql = "INSERT INTO student (student_id, first_name, last_name, gender, email) VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, studentId, student.getFirstName(), student.getLastName(), student.getGender().name().toUpperCase(), student.getEmail());
    }

    @SuppressWarnings("ConstantConditions")
    public boolean isEmailTaken(String email) {
        String sql = "SELECT EXISTS (SELECT 1 FROM student WHERE email = ?)";
        return jdbcTemplate.queryForObject(sql, new Object[] {email}, (resultSet, i) -> resultSet.getBoolean(1));
    }

    private RowMapper<Student> mapStudentFromDb() {
        return (resultSet, i) -> {
            String studentIdStr = resultSet.getString("student_id");
            UUID studentId = UUID.fromString(studentIdStr);
            String firstName = resultSet.getString("first_name");
            String lastName = resultSet.getString("last_name");
            String genderStr = resultSet.getString("gender").toUpperCase();
            Student.Gender gender = Student.Gender.valueOf(genderStr);
            String email = resultSet.getString("email");
            return new Student(studentId, firstName, lastName, gender, email);
        };
    }
}
