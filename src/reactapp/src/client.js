import fetch from 'unfetch';

export const getAllStudents = () => fetch('http://localhost:8080/api/v1/students');

export const addNewStudent = (student) => fetch('http://localhost:8080/api/v1/students', {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(student)
    });