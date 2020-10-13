import React, {Component} from 'react';
import Container from "./Container";
import './App.css';
import { getAllStudents } from './client';
import {
    Table,
    Avatar,
    Spin
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

class App extends Component {

  state = {
    students: [],
    isFetching: false
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents = () => {
    this.setState({
        isFetching: true
    });
    getAllStudents()
        .then( res => res.json()
            .then(students => {
              console.log(students)
              this.setState({
                students: students,
                isFetching: false
              });
        }));
  }

  render() {
    const {students, isFetching} = this.state;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    if(isFetching) {
        return (
            <Container>
                <Spin indicator={antIcon} />
            </Container>
        );
    }

    if(students && students.length) {
      /*
        return students.map((student, index) => {
        return (
            <div key={index}>
              <h2>{student.studentId}</h2>
              <p>{student.firstName}</p>
              <p>{student.lastName}</p>
              <p>{student.gender}</p>
              <p>{student.email}</p>
            </div>
        );
      });
      */
       const columns = [
           {
               title: '',
               key: 'avatar',
               render: (text, student) => (
                   <Avatar size='large'>
                       {`${student.firstName.charAt(0).toUpperCase()}${student.lastName.charAt(0).toUpperCase()}`}
                   </Avatar>
               )
           },
           {
               title: 'Id from Student',
               dataIndex: 'studentId',
               key: 'studentId'
           },
           {
               title: 'Firstname',
               dataIndex: 'firstName',
               key: 'firstName'
           },
           {
               title: 'Lastname',
               dataIndex: 'lastName',
               key: 'lastName'
           },
           {
               title: 'Gender',
               dataIndex: 'gender',
               key: 'gender'
           },
           {
               title: 'Email',
               dataIndex: 'email',
               key: 'email'
           }
       ];
       return (
           <Container>
               <Table dataSource={students} columns={columns} pagination={false} rowKey='studentId'/>
           </Container>
       );
    }

    return <h1>No Students found</h1>
  }
}

export default App;
