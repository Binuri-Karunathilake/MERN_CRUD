import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import User from "../../../assets/images/user.png";
import { toast } from "react-toastify";
import { APIURL } from "../../API/environment";
import Logo from "../../../assets/images/logo.png";

const initialState = {
  employee_id: "",
  employee_name: "",
  employee_department: "",
  employee_post: "",
  employee_basicSalary: 0,
  employee_epf: 0,
  employee_etf: 0,
  employee_allowances: 0,
  employee_start_date: "",
  employee_end_date: "",
  employee_salary: 0,
  employee_ot: 0,
  employee_workingDays: 0,
};

class AddSalary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState,
      employeeDetails: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle_epf = this.toggle_epf.bind(this);
    this.toggle_etf = this.toggle_etf.bind(this);
    this.toggle_sal = this.toggle_sal.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async componentDidMount() {
    await axios
      .get(
        `${APIURL}/employee/get-employee-details/${this.props.match.params.id}`
      )
      .then((res) => {
        this.setState({ employeeDetails: res.data.EmployeeDetails });
        console.log("employeeDetails", this.state.employeeDetails);

        this.setState({ employee_id: this.state.employeeDetails.employee_id });
        this.setState({
          employee_name: this.state.employeeDetails.employee_name,
        });
        this.setState({
          employee_basicSalary: this.state.employeeDetails.employee_basicSalary,
        });
        this.setState({
          employee_department: this.state.employeeDetails.employee_department,
        });
        this.setState({
          employee_post: this.state.employeeDetails.employee_post,
        });
      });
  }

  onSubmit(event) {
    event.preventDefault();

    let EmployeeDetails = {
      employee_id: this.state.employee_id,
      employee_name: this.state.employee_name,
      employee_department: this.state.emd,
      employee_post: this.state.employee_post,
      employee_basicSalary: this.state.employee_basicSalary,
      employee_epf: this.state.employee_epf,
      employee_etf: this.state.employee_etf,
      employee_totSal: this.state.employee_salary,
      employee_ot: this.state.employee_ot,
      employee_working_days: this.state.employee_workingDays,
      employee_start_date: this.state.employee_start_date,
      employee_end_date: this.state.employee_end_date,
    };

    axios.post(`${APIURL}/emp_sal/add_emp_sal`, EmployeeDetails).then((res) => {
      console.log("res", res);

      if (res.data.code === 200) {
        toast.success(res.data.message);
        this.props.history.push("/get-all-employee");
      } else {
        toast.error(res.data.message);
      }
    });
  }

  toggle_epf() {
    this.setState({
      employee_epf: (this.state.employee_basicSalary * 12) / 100,
    });
  }

  toggle_etf() {
    this.setState({
      employee_etf: (this.state.employee_basicSalary * 3) / 100,
    });
  }

  toggle_sal() {
    let ot = parseFloat((this.state.employee_basicSalary / 22 / 8) * 1.5);
    console.log("ot", ot);
    let salary = parseFloat(
      this.state.employee_basicSalary + (ot * this.state.employee_ot) - this.state.employee_epf
    );

    let totSal = parseFloat(salary).toFixed(2);
    console.log("salary", salary);

    this.setState({
      employee_salary: totSal,
    });
  }
  render() {
    return (
      <div>
        <header id="home"></header>
        <div id="wrapper">
          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            <br />
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="/employee-dash"
            >
              <div
                className="sidebar-brand-icon rotate-n-0"
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 140,
                  marginBottom: 100,
                }}
              >
                <img src={Logo} alt="" />
              </div>
              <div className="sidebar-brand-text mx-3"></div>
            </a>
            <br />
            <br />
            <br />
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
              <a className="nav-link" href="/employee-dash">
                <i className="fas fa-fw fa-tachometer-alt" />
                <span>Dashboard</span>
              </a>
            </li>
            <br />
            <div className="sidebar-heading">Employee Management</div>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/add-new-employee">
                  <button className="dropbtn">
                  <div style={{textAlign:"left"}}>
                    <i className="fa fa-plus-circle" /> New Employee
                    </div>
                  </button>
                </Link>
              </div>
            </li>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get-all-employee">
                  <button className="dropbtn">
                  <div style={{textAlign:"left"}}>
                    <i className="fa fa-bars" /> Employee List
                    </div>
                  </button>
                </Link>
              </div>
            </li>

            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get_all_salary">
                  <button className="dropbtn">
                  <div style={{textAlign:"left"}}>
                    <i className="fa fa-bars" /> Salary List
                    </div>
                  </button>
                </Link>
              </div>
            </li>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get_all_salary_pay">
                  <button className="dropbtn">
                  <div style={{textAlign:"left"}}>
                    <i className="fa fa-bars" /> Paid List
                    </div>
                  </button>
                </Link>
              </div>
            </li>
            <br />
          </ul>

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand topbar mb-4 static-top">
                <h1 className="h3 mb-2 text-gray-800">
                  Employee Salary Record Add
                </h1>
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown no-arrow">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        className="img-profile rounded-circle"
                        src={User}
                        alt=""
                      />
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      <div className="dropdown-divider" />
                      <a
                        className="dropdown-item"
                        href="/"
                        data-toggle="modal"
                        data-target="#logoutModal"
                      >
                        {" "}
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>
              <div
                className="container-fluid"
                style={{
                  backgroundImage: 'url("../../../assets/images/hotel1.jpg")',
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                }}
              >
                <div className="d-sm-flex align-items-center justify-content-between mb-4"></div>
                <div className="container">
                  <div className="row justify-content-center">
                    <div className="col-xl-10 col-lg-12 col-md-9">
                      <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                          <div className="row">
                            <div
                              className="col-lg-6 d-none d-lg-block"
                              style={{
                                backgroundImage:
                                  'url("../../../assets/images/emp1.jpg")',
                              }}
                            />
                            <div className="col-lg-6">
                              <div className="p-5">
                                <div className="text-center">
                                  <h1
                                    className="h4 text-gray-900 mb-4"
                                    style={{ fontStyle: "italic" }}
                                  >
                                    Add{" "}
                                    {this.state.employeeDetails.employee_name}'s
                                    Salary
                                  </h1>
                                </div>
                                <form
                                  className="user"
                                  onSubmit={this.onSubmit}
                                  method="post"
                                >
                                  <div className="form-group">
                                    <label>Employee ID</label>
                                    <input
                                      type="text"
                                      name="employee_id"
                                      value={this.state.employee_id}
                                      onChange={this.onChange}
                                      placeholder="EMP-000"
                                      className="form-control form-control-user"
                                      readOnly
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Employee Name</label>
                                    <input
                                      type="text"
                                      name="employee_name"
                                      value={this.state.employee_name}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                      readOnly
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Assign Department</label>
                                    <input
                                      type="text"
                                      name="employee_department"
                                      value={this.state.employee_department}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                      readOnly
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Assign Post</label>
                                    <input
                                      type="text"
                                      name="employee_post"
                                      value={this.state.employee_post}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                      readOnly
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Basic Salary</label>
                                    <input
                                      type="text"
                                      name="employee_basicSalary"
                                      value={this.state.employee_basicSalary}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                      readOnly
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Salary Start Date</label>
                                    <input
                                      type="date"
                                      name="employee_start_date"
                                      value={this.state.employee_start_date}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Salary End Date</label>
                                    <input
                                      type="date"
                                      name="employee_end_date"
                                      value={this.state.employee_end_date}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Working Days</label>
                                    <input
                                      type="number"
                                      name="employee_workingDays"
                                      value={this.state.employee_workingDays}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Over Time Hours</label>
                                    <input
                                      type="text"
                                      name="employee_ot"
                                      value={this.state.employee_ot}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <div className="row">
                                    <div className="col-6">
                                      <div className="form-group">
                                        <label>EPF</label>
                                        <input
                                          type="text"
                                          name="employee_epf"
                                          value={this.state.employee_epf}
                                          onChange={this.onChange}
                                          className="form-control form-control-user"
                                          readOnly
                                        />
                                      </div>
                                    </div>

                                    <div className="col-6">
                                      <div className="form-group">
                                        <span
                                          type="submit"
                                          className="btn btn-primary submit"
                                          onClick={this.toggle_epf}
                                          style={{
                                            width: 150,
                                            height: 40,
                                            color: "white",
                                            marginTop: 35,
                                          }}
                                        >
                                          Calculate EPF
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col-6">
                                      <div className="form-group">
                                        <label>ETF</label>
                                        <input
                                          type="text"
                                          name="employee_etf"
                                          value={this.state.employee_etf}
                                          onChange={this.onChange}
                                          className="form-control form-control-user"
                                          readOnly
                                        />
                                      </div>
                                    </div>

                                    <div className="col-6">
                                      <div className="form-group">
                                        <span
                                          type="submit"
                                          className="btn btn-primary submit"
                                          onClick={this.toggle_etf}
                                          style={{
                                            width: 150,
                                            height: 40,
                                            color: "white",
                                            marginTop: 35,
                                          }}
                                        >
                                          Calculate ETF
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-6">
                                      <div className="form-group">
                                        <label>Total Salary</label>
                                        <input
                                          type="text"
                                          name="employee_salary"
                                          value={this.state.employee_salary}
                                          onChange={this.onChange}
                                          className="form-control form-control-user"
                                          readOnly
                                        />
                                      </div>
                                    </div>

                                    <div className="col-6">
                                      <div className="form-group">
                                        <span
                                          type="submit"
                                          className="btn btn-primary submit"
                                          onClick={this.toggle_sal}
                                          style={{
                                            width: 150,
                                            height: 40,
                                            color: "white",
                                            marginTop: 35,
                                          }}
                                        >
                                          Calculate Salary
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <br />
                                  <button
                                    type="submit"
                                    className="btn btn-primary btn-user btn-block"
                                    style={{ fontSize: 15, height: 40 }}
                                  >
                                    Add Salary
                                  </button>
                                </form>

                                <Link to="/get-all-employee">
                                  <button
                                    type="submit"
                                    className="btn btn-success btn-user btn-block"
                                    style={{
                                      borderRadius: 25,
                                      height: 40,
                                      marginTop: 5,
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </Link>
                                <hr />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto text-black ">
                  <span>Copyright © HOTEL ROYAL RAMESSES </span>
                </div>
              </div>
            </footer>
          </div>
        </div>
        <a className="scroll-to-top rounded" href="#home">
          <i className="fas fa-angle-up" />
        </a>
        <a href="#home" className="move-top text-center">
          <span className="fa fa-level-up" aria-hidden="true" />
        </a>
        <div
          className="modal fade"
          id="logoutModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a className="btn btn-primary" href="/">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddSalary;
