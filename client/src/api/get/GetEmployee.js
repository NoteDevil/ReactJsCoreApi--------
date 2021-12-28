import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

import { Button, ButtonToolbar, Alert } from 'react-bootstrap'
import { AddEmpModal } from '../post/PostEmpModal'
import { EditEmpModal } from '../put/PutEmpModal'

export class Employee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emps: [],
      error: null,
      isLoad: false,
      addModalShow: false,
      editModalShow: false,
    }
  }

  refreshList() {
    fetch(process.env.REACT_APP_API + 'employee')
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({ emps: data })
        },
        (error) => {
          this.setState({ isLoad: true, error })
        },
      )
  }

  componentDidMount() {
    this.refreshList()
  }

  componentDidUpdate() {
    this.refreshList()
  }

  deleteEmp(empid) {
    if (window.confirm('Ты уверен?')) {
      fetch(process.env.REACT_APP_API + 'employee/' + empid, {
        method: 'DELETE',
        header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
    }
  }
  render() {
    const {
      emps,
      isLoad,
      error,
      empid,
      empname,
      depmt,
      photofilename,
      dateofjoining,
    } = this.state
    let addModalClose = () => this.setState({ addModalShow: false })
    let editModalClose = () => this.setState({ editModalShow: false })

    if (error && isLoad) {
      return (
        <Alert variant="danger" style={{ margin: '20px' }}>
          <Alert.Heading>💀 Сервер не отвечает 💀</Alert.Heading>
          <p>Свяжитесь администратором сервера и попросите полечить сервер, а что-то ему очень плохо 🤒</p>
        </Alert>
      )
    } else {
      return (
        <div>
          <Table className="mt-4" striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Department</th>
                <th>Date</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {emps.map((emp) => (
                <tr key={emp.employee_id}>
                  <td>{emp.employee_id}</td>
                  <td>{emp.employee_name}</td>
                  <td>{emp.department}</td>
                  <td>
                    {
                      new Date(emp.date_of_joining)
                        .toLocaleString()
                        .split(',')[0]
                    }
                  </td>
                  <td>
                    <ButtonToolbar>
                      <Button
                        className="mr-2"
                        variant="info"
                        onClick={() =>
                          this.setState({
                            editModalShow: true,
                            empid: emp.employee_id,
                            empname: emp.employee_name,
                            depmt: emp.department,
                            photofilename: emp.photo_file_name,
                            dateofjoining: emp.date_of_joining.split('T')[0],
                          })
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-pencil-square"
                          viewBox="0 0 16 16"
                        >
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                          <path
                            fill-rule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />
                        </svg>
                      </Button>

                      <Button
                        className="mr-2"
                        variant="danger"
                        onClick={() => this.deleteEmp(emp.employee_id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fill-rule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </Button>

                      <EditEmpModal
                        show={this.state.editModalShow}
                        onHide={editModalClose}
                        empid={empid}
                        empname={empname}
                        depmt={depmt}
                        photofilename={photofilename}
                        dateofjoining={dateofjoining}
                      />
                    </ButtonToolbar>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <ButtonToolbar>
            <Button
              variant="primary"
              onClick={() => this.setState({ addModalShow: true })}
            >
              Add Employee
            </Button>

            <AddEmpModal
              show={this.state.addModalShow}
              onHide={addModalClose}
            />
          </ButtonToolbar>
        </div>
      )
    }
  }
}
