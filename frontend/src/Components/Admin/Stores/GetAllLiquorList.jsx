import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../../API/environment";
import User from "../../../assets/images/user.png";
import Logo from "../../../assets/images/logo.png";

class GetAllLiquorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liquorList: [],
    };
  }

  async componentDidMount() {
    await axios.get(`${APIURL}/liquor/get_all_liqour`).then((response) => {
      this.setState({ liquorList: response.data.LiquorItems });
      console.log("liquorList =>", this.state.liquorList);
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
              href="/stores-dash"
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
              <a className="nav-link" href="/stores-dash">
                <i className="fas fa-fw fa-tachometer-alt" />
                <span>Dashboard</span>
              </a>
            </li>
            <br />
            <div className="sidebar-heading">Stores Management</div>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/add-stores-item">
                  <button className="dropbtn">
                    <i className="fa fa-plus-circle" /> New Item
                  </button>
                </Link>
              </div>
            </li>
            <br />

            <li className="nav-item">
              <div className="dropdown">
                <Link to="/add_liquor">
                  <button className="dropbtn">
                    <i className="fa fa-plus-circle" /> Add Liquor{" "}
                  </button>
                </Link>
              </div>
            </li>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get-all-stores-item">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Item List
                  </button>
                </Link>
              </div>
            </li>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get_liquor">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Liquor List
                  </button>
                </Link>
              </div>
            </li>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get_all_liquor_orders">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Liquor Orders
                  </button>
                </Link>
              </div>
            </li>
            <br />

            <li className="nav-item">
              <div className="dropdown">
                <Link to="/check_liquor_order_status">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Liquor Orders Status
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
                <h1 className="h3 mb-2 text-gray-800">All Liquor Items List</h1>
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
                <p className="mb-4">All Liqour Items available in here.</p>

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Check Liquor Item
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
                            <th>Liquor ID</th>
                            <th>Liquor Name</th>
                            <th>Liquor Type</th>
                            <th>Liquor Quantity</th>
                            <th>Liquor Price (Rs.)</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>Photo</th>
                            <th>Liquor ID</th>
                            <th>Liquor Name</th>
                            <th>Liquor Type</th>
                            <th>Liquor Quantity</th>
                            <th>Liquor Price (Rs.)</th>
                          </tr>
                        </tfoot>
                        {this.state.liquorList.length > 0 &&
                          this.state.liquorList.map((item, index) => (
                            <tbody key={index}>
                              <tr>
                                <td>
                                  <img
                                    src={item.liquor_url}
                                    alt=""
                                    style={{ width: 150, height: 150 }}
                                  />
                                </td>
                                <td>{item.liquor_id}</td>
                                <td>{item.liquor_name}</td>
                                <td>{item.liquor_type}</td>
                                <td>{item.liquor_qnty}</td>
                                <td>{item.liquor_price}</td>
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
export default GetAllLiquorList;
