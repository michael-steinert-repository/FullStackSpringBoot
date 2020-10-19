package com.example.FullStackSpringBoot.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
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
        String sql = "INSERT INTO student (student_id, first_name, last_name, gender, email) VALUES (?, ?, ?, ?::gender, ?)";
        return jdbcTemplate.update(sql, studentId, student.getFirstName(), student.getLastName(), student.getGender().name().toUpperCase(), student.getEmail());
    }

    @SuppressWarnings("ConstantConditions")
    public boolean isEmailTaken(String email) {
        String sql = "SELECT EXISTS (SELECT 1 FROM student WHERE email = ?)";
        return jdbcTemplate.queryForObject(sql, new Object[] {email}, (resultSet, i) -> resultSet.getBoolean(1));
    }

    public List<StudentCourse> selectAllStudentCourses(UUID studentId) {
        String sql = "SELECT student.student_id, course.course_id, course.name, course.description, course.department, course.teacher_name, " +
                "student_course.start_date, student_course.end_date, student_course.grade FROM student " +
                "JOIN student_course USING (student_id) JOIN course USING (course_id) WHERE student.student_id = ?";
        return jdbcTemplate.query(sql, new Object[] {studentId}, mapStudentCourseFromDb());
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
    private RowMapper<StudentCourse> mapStudentCourseFromDb() {
        return (resultSet, i) -> {
            UUID studentId = UUID.fromString(resultSet.getString("student_id"));
            UUID courseId = UUID.fromString(resultSet.getString("course_id"));
            String name = resultSet.getString("name");
            String description = resultSet.getString("description");
            String department = resultSet.getString("department");
            String teacherName = resultSet.getString("teacher_name");
            LocalDate startDate = resultSet.getDate("start_date").toLocalDate();
            LocalDate endDate = resultSet.getDate("end_date").toLocalDate();
            Integer grade = Optional.ofNullable(resultSet.getString("grade")).map(Integer::parseInt).orElse(null);
            return new StudentCourse(studentId, courseId, name, description, department, teacherName, startDate, endDate, grade);
        };
    }
}
