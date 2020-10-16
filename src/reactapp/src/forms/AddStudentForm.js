import React from "react";
import {Formik} from "formik";
import {Input, Button, Tag} from 'antd';
import {addNewStudent} from "../client";

const inputFieldMargin = {marginBottom: '10px'};
const tagStyle = {backgroundColor: '#f50', color: '#fff', ...inputFieldMargin};

const AddStudentForm = (props) => (
    <Formik
        initialValues={{ firstName: '', lastName: '', gender: '', email: '' }}
        validate={values => {
            const errors = {};
            if(!values.firstName) {
                errors.firstName = 'Firstname required';
            }
            if(!values.lastName) {
                errors.lastName = 'Lastname required';
            }
            if(!values.gender) {
                errors.gender = 'Gender required';
            } else if(!['MALE', 'male', 'FEMALE', 'female'].includes(values.gender)) {
                errors.gender = 'Gender invalid';
            }
            if (!values.email) {
                errors.email = 'Email required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Email invalid';
            }
            return errors;
        }}
        onSubmit={(student, { setSubmitting }) => {
            addNewStudent(student).then(() => {
                props.onSuccess();
                setSubmitting(false);
            });
        }}>
        {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              submitForm,
              isValid
          }) => (
            <form onSubmit={handleSubmit}>
                <Input
                    style={inputFieldMargin}
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder='Firstname'
                />
                {errors.firstName && touched.firstName && <Tag style={tagStyle}>{errors.firstName}</Tag>}
                <Input
                    style={inputFieldMargin}
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeholder='Lastname'
                />
                {errors.lastName && touched.lastName && <Tag style={tagStyle}>{errors.lastName}</Tag>}
                <Input
                    style={inputFieldMargin}
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                    placeholder='Gender'
                />
                {errors.gender && touched.gender && <Tag style={tagStyle}>{errors.gender}</Tag>}
                <Input
                    style={inputFieldMargin}
                    name="email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder='Email'
                />
                {errors.email && touched.email && <Tag style={tagStyle}>{errors.email}</Tag>}
                <Button onClick={() => submitForm()} type="submit" disabled={isSubmitting | (touched && !isValid)}>
                    Create Student
                </Button>
            </form>
        )}
    </Formik>
);


export default AddStudentForm;