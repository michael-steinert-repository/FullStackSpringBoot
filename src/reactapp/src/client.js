import fetch from 'unfetch';

export const getAllStudents = () => fetch('http://localhost:8080/api/v1/students');