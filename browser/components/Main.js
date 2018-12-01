import React, { Component } from 'react';
import axios from 'axios';

import StudentList from './StudentList.js';
import SingleStudent from './SingleStudent.js';
import NewStudentForm from './NewStudentForm.js';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      selectedStudent: {},
      showAddForm: false,
    };

    this.selectStudent = this.selectStudent.bind(this);
    this.toggleAddForm = this.toggleAddForm.bind(this);
    this.addStudent = this.addStudent.bind(this);
  }

  componentDidMount() {
    this.getStudents();
  }

  async getStudents() {
    console.log('fetching');
    try {
      const { data } = await axios.get('/student');
      this.setState({ students: data });
    } catch (err) {
      console.error(err);
    }
  }

  selectStudent(student) {
    return this.setState({
      selectedStudent: student,
    });
  }

  toggleAddForm = () => {
    this.setState(prevState => {
      return { showAddForm: !prevState.showAddForm };
    });
  };

  async addStudent(newStudent) {
    try {
      event.preventDefault();
      await axios.post('/student', newStudent);
      this.getStudents();
      this.toggleAddForm();
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <h1>Students</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tests</th>
            </tr>
          </thead>
          <StudentList
            students={this.state.students}
            selectStudent={this.selectStudent}
          />
        </table>
        {this.state.selectedStudent.id ? (
          <SingleStudent student={this.state.selectedStudent} />
        ) : null}
        {this.state.showAddForm ? (
          <NewStudentForm addStudent={this.addStudent} />
        ) : (
          <button type="button" onClick={() => this.toggleAddForm()}>
            Add New Student
          </button>
        )}
      </div>
    );
  }
}
