CREATE TABLE IF NOT EXISTS student (
    student_id UUID PRIMARY KEY NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    gender VARCHAR(6) NOT NULL CHECK (gender = 'MALE' OR gender = 'FEMALE'),
    email VARCHAR(50) NOT NULL UNIQUE
);