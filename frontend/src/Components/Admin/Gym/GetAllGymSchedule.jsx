import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../../API/environment";
import User from "../../../assets/images/user.png";
import Logo from "../../../assets/images/logo.png";

class GetAllGymSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleList: [],
    };
  }

  async componentDidMount() {
    await axios
      .get(`${APIURL}/gym-schedule/get-all-schedule-details`)
      .then((response) => {
        this.setState({ scheduleList: response.data.GymScheduleDetails });
        console.log("scheduleList =>", this.state.scheduleList);
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
              href="/gym-dash"
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
              <a className="nav-link" href="/gym-dash">
                <i className="fas fa-fw fa-tachometer-alt" />
                <span>Dashboard</span>
              </a>
            </li>
            <br />
            <div className="sidebar-heading">Gym Management</div>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/add-new-gym">
                  <button className="dropbtn">
                    <i className="fa fa-plus-circle" /> Gym Schedule
                  </button>
                </Link>
              </div>
            </li>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get-all-gym">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Schedule List
                  </button>
                </Link>
              </div>
            </li>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get_all_book_gym">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Booking List
                  </button>
                </Link>
              </div>
            </li>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get_all_book_gym_status">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Check Gym Booking Status
                  </button>
                </Link>
              </div>
            </li>
            <br />
          </ul>

          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <nav className="navbar navbar-expand topbar mb-4 static-top">
                <h1 className="h3 mb-2 text-gray-800">All Gym Schedule List</h1>
                <ul className="navbar-nav ml-auto">
                  {/* Nav Item - User Information */}
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
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>
              <div className="container-fluid">
                <p className="mb-4">
                  All Gym Schedule Details available in here.
                </p>
                {/* <Link to="/get-all-rooms-details">
                  <span style={{ margin: 15, fontSize: 20, color: "black" }}>
                    All Schedules
                  </span>
                </Link>

                <Link to="/get-single-rooms-details">
                  <span style={{ margin: 15, fontSize: 20 }}>
                    Monday Schedules
                  </span>
                </Link>

                <Link to="/get-double-rooms-details">
                  <span style={{ margin: 15, fontSize: 20 }}>
                    Tuesday Schedules
                  </span>
                </Link>

                <Link to="/get-delux-rooms-details">
                  <span style={{ margin: 15, fontSize: 20 }}>
                    Wednesday Schedules
                  </span>
                </Link>

                <Link to="/get-luxary-rooms-details">
                  <span style={{ margin: 15, fontSize: 20 }}>
                    Thursday Schedules
                  </span>
                </Link>

                <Link to="/get-luxary-rooms-details">
                  <span style={{ margin: 15, fontSize: 20 }}>
                    Friday Schedules
                  </span>
                </Link>

                <Link to="/get-luxary-rooms-details">
                  <span style={{ margin: 15, fontSize: 20 }}>
                    Saturday Schedules
                  </span>
                </Link>

                <Link to="/get-luxary-rooms-details">
                  <span style={{ margin: 15, fontSize: 20 }}>
                    Sunday Schedules
                  </span>
                </Link> */}

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Check Gym Schedule
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        id="dataTable"
                        width="100%"
                        cellSpacing={0}
                      >
                        <thead>
                          <tr>
                            <th>Photo</th>
                            <th>Gym Schedule ID</th>
                            <th>Gym Schedule Name</th>
                            <th>Gym Schedule Type</th>
                            <th>Gym Schedule Date</th>
                            <th>Gym Schedule time</th>
                            <th>Instructor Name</th>
                            <th>Gym Pricer Per Month (Rs.)</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>Photo</th>
                            <th>Gym Schedule ID</th>
                            <th>Gym Schedule Name</th>
                            <th>Gym Schedule Type</th>
                            <th>Gym Schedule Date</th>
                            <th>Gym Schedule time</th>
                            <th>Instructor Name</th>
                            <th>Gym Pricer Per Month (Rs.)</th>
                            <th>Actions</th>
                          </tr>
                        </tfoot>
                        {this.state.scheduleList.length > 0 &&
                          this.state.scheduleList.map((item, index) => (
                            <tbody key={index}>
                              <tr>
                                <td>
                                  <img
                                    src={item.gym_url}
                                    alt=""
                                    style={{ width: 150, height: 150 }}
                                  />
                                </td>
                                <td>{item.gym_schedule_id}</td>
                                <td>{item.schedule_name}</td>
                                <td>{item.schedule_type}</td>
                                <td>{item.schedule_date}</td>
                                <td>{item.schedule_time}</td>
                                <td>{item.instructor_name}</td>
                                <td>{item.gym_price}</td>
                                <td>
                                  <Link to={`/edit-gym-schedule/${item._id}`}>
                                    <button className="btnEdit">
                                      <i className="fas fa-edit" title="Edit" />
                                    </button>
                                  </Link>
                                </td>
                              </tr>
                            </tbody>
                          ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.container-fluid */}
            </div>
            {/* End of Main Content */}
            {/* Footer */}
            <footer className="footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto text-black ">
                  <span>Copyright © HOTEL ROYAL RAMESSES </span>
                </div>
              </div>
            </footer>
            {/* End of Footer */}
          </div>
          {/* End of Content Wrapper */}
        </div>
        {/* End of Page Wrapper */}
        {/* Scroll to Top Button*/}
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
export default GetAllGymSchedule;
