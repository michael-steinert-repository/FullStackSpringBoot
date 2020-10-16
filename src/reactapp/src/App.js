import React, {Component} from 'react';
import Container from "./Container";
import Footer from "./Footer";
import './App.css';
import { getAllStudents } from './client';
import AddStudentForm from './forms/AddStudentForm';
import {Table, Avatar, Spin, Modal} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

class App extends Component {

  state = {
    students: [],
    isFetching: false,
    isAddStudentModalVisible: false
  }

  componentDidMount() {
    this.fetchStudents();
  }

  openAddStudentModalVisible = () => this.setState({isAddStudentModalVisible: true});

  closeAddStudentModalVisible = () => this.setState({isAddStudentModalVisible: false});

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
    const {students, isFetching, isAddStudentModalVisible} = this.state;
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
               <Modal title='Add new Student' visible={isAddStudentModalVisible} onOk={this.closeAddStudentModalVisible} onCancel={this.closeAddStudentModalVisible} width={1000}>
                   <AddStudentForm onSuccess={() => {
                       this.closeAddStudentModalVisible();
                       this.fetchStudents();
                   }}/>
               </Modal>
               <Footer numberOfStudents={students.length} handleAddStudentClickEvent={this.openAddStudentModalVisible}/>
           </Container>
       );
    }

    return <h1>No Students found</h1>
  }
}

export default App;
