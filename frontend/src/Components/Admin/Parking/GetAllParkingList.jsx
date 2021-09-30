import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../../API/environment";
import User from "../../../assets/images/user.png";
import Logo from "../../../assets/images/logo.png";

class GetAllParkingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parkingList: [],
    };
  }

  async componentDidMount() {
    await axios
      .get(`${APIURL}/parking/get-all-parking-details`)
      .then((response) => {
        this.setState({ parkingList: response.data.ParkingDetails });
        console.log("parkingList =>", this.state.parkingList);
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
              href="/parking-dash"
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
              <a className="nav-link" href="/parking-dash">
                <i className="fas fa-fw fa-tachometer-alt" />
                <span>Dashboard</span>
              </a>
            </li>
            <br />
            <div className="sidebar-heading">Parking Management</div>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/add-parking-list">
                  <button className="dropbtn">
                    <i className="fa fa-plus-circle" /> New Parking
                  </button>
                </Link>
              </div>
            </li>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get-parking-list">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Parking List
                  </button>
                </Link>
              </div>
            </li>
            <br />

            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get_all_parking_slot">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Parking Book List
                  </button>
                </Link>
              </div>
            </li>
            <br />

            <li className="nav-item">
              <div className="dropdown">
                <Link to="/check_all_parking_slot">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Check Parking Book Status
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
                <h1 className="h3 mb-2 text-gray-800">All Parking List</h1>
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
                <p className="mb-4">All Parking Details available in here.</p>
                <Link to="/get-all-rooms-details">
                  <span style={{ margin: 15, fontSize: 20, color: "black" }}>
                    All Parking List
                  </span>
                </Link>

                <Link to="/get-single-rooms-details">
                  <span style={{ margin: 15, fontSize: 20 }}>
                    Car Parking List
                  </span>
                </Link>

                <Link to="/get-double-rooms-details">
                  <span style={{ margin: 15, fontSize: 20 }}>
                    Van Parking List
                  </span>
                </Link>

                <Link to="/get-delux-rooms-details">
                  <span style={{ margin: 15, fontSize: 20 }}>
                    Bus Parking List
                  </span>
                </Link>

                <Link to="/get-luxary-rooms-details">
                  <span style={{ margin: 15, fontSize: 20 }}>
                    Other Parking List
                  </span>
                </Link>

                <br />
                <br />
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Check Parking Details
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
                            <th>Parking ID</th>
                            <th>Parking Category</th>
                            <th>Parking Main Slot</th>
                            <th>Parking Sub Slot</th>
                            <th>Parking Price (Rs.)</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>Photo</th>
                            <th>Parking ID</th>
                            <th>Parking Category</th>
                            <th>Parking Main Slot</th>
                            <th>Parking Sub Slot</th>
                            <th>Parking Price (Rs.)</th>
                            <th>Actions</th>
                          </tr>
                        </tfoot>
                        {this.state.parkingList.length > 0 &&
                          this.state.parkingList.map((item, index) => (
                            <tbody key={index}>
                              <tr>
                                <td>
                                  <img
                                    src={item.parking_url}
                                    alt=""
                                    style={{ width: 150, height: 150 }}
                                  />
                                </td>
                                <td>{item.park_id}</td>
                                <td>{item.parking_category}</td>
                                <td>{item.parking_main_slot}</td>
                                <td>{item.parking_sub_slot}</td>
                                <td>{item.parking_price}</td>
                                <td>
                                  <Link to={`/edit-parking-list/${item._id}`}>
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
export default GetAllParkingList;
