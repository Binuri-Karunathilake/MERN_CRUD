import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import User from "../../assets/images/user.png";
import { APIURL } from "../API/environment";
import axios from "axios";

class ParkingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: [],
      parkingList: [],
    };
  }

  async componentDidMount() {
    await axios
      .get(`${APIURL}/customer/customer-details`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.setState({ customer: response.data.CustomerDetails });
        console.log("customer =>", this.state.customer);
      });

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
        <header id="home">
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
                  style={{
                    width: 80,
                    height: 80,
                    marginLeft: 1300,
                    marginBottom: -70,
                  }}
                />{" "}
              </a>
              <p
                style={{
                  color: "black",
                  marginLeft: 1400,
                  fontStyle: "italic",
                }}
              >
                {this.state.customer.customer_name}
              </p>
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
        </header>

        <div className="main-top py-1">
          <div className="container">
            <div className="nav-content" style={{ marginTop: -135 }}>
              <h1>
                <a id="logo" className="logo" href="/">
                  <img src={Logo} alt="" style={{ marginLeft: -100 }} />
                  HOTEL ROYAL RAMESSES
                </a>
              </h1>

              <div className="nav_web-dealingsls">
                <nav>
                  <label htmlFor="drop" className="toggle">
                    Menu
                  </label>
                  <input type="checkbox" id="drop" />
                  <ul className="menu">
                    <li>
                      <a
                        href="/customer-home"
                        className="active-page"
                        style={{ color: "blue" }}
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="/food-menu">Food Menu</a>
                    </li>

                    <li>
                      <a href="/room_list_customer">Rooms</a>
                    </li>

                    <li>
                      <a href="/gym_list">Gym</a>
                    </li>

                    <li>
                      <a href="/get_liquor_customer">Liquor</a>
                    </li>
                    <li>
                      <a href="/all_orders">Orders</a>
                    </li>

                    <li>
                      <Link
                        to="https://w3layouts.com/"
                        target="_blank"
                        className="dwn-button ml-lg-5"
                      ></Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div className="main-banner-2"></div>

        <div className="breadcrumb-agile bg-light py-2">
          <ol className="breadcrumb bg-light m-0">
            <li className="breadcrumb-item">
              <a href="/customer-home">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              All Parking Schedules
            </li>
          </ol>
        </div>

        <section className="portfolio py-5">
          <div className="container py-xl-5 py-lg-3">
            <div
              className="title-section text-center mb-md-5 mb-4"
              style={{ marginTop: -50 }}
            >
              <h3 className="w3ls-title mb-3">
                Our <span> Parking Schedules</span>
              </h3>
            </div>

            <div className="row mt-4  ">
              {this.state.parkingList.length > 0 &&
                this.state.parkingList.map((item, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="gallery-demo">
                      <img
                        src={item.parking_url}
                        alt=" "
                        style={{ width: 345, height : 250 }}
                      />
                      <h4 className="p-mask">{item.park_id}</h4>

                      <h4 className="p-mask">
                        <span>{item.parking_category}</span>
                      </h4>
                      <h4 className="p-mask">
                        Day :<span>{item.parking_main_slot}</span>
                      </h4>
                      <h4 className="p-mask">
                        Time :<span>{item.parking_sub_slot}</span>
                      </h4>
                      <h4 className="p-mask">
                        Type :<span>{item.parking_price}</span>
                      </h4>

                      <Link
                        to={`/get_parking_slot/${item._id}`}
                        className="button-w3ls mt-3"
                        style={{
                          marginLeft: "25%",
                          width: "50%",
                          textAlign: "center",
                          marginBottom: 10,
                        }}
                      >
                        Book Now
                        <span
                          className="fa fa-caret-right ml-1"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
            <div className="row mt-md-5"></div>
          </div>
        </section>

        <footer className="py-5">
          <div className="container py-xl-4">
            <div className="row footer-top">
              <div className="col-lg-4 footer-grid_section_1its footer-text">
                {/* logo */}
                <h2>
                  <a className="logo text-wh" href="index.html">
                    <img src={Logo} alt="" className="img-fluid" />
                    <br />
                    <span></span> Royal Ramesses
                  </a>
                </h2>
              </div>
              <div className="col-lg-4 footer-grid_section_1its my-lg-0 my-sm-4 my-4">
                <div className="footer-title">
                  <h3>Contact Us</h3>
                </div>
                <div className="footer-text mt-4">
                  <p>Address : Negombo-Colombo Main Rd, Seeduwa</p>
                  <p className="my-2">Phone : +94- 70 700 0005</p>
                  <p>
                    Email :{" "}
                    <a href="mailto:info@example.com">
                      ramesseshotel@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-lg-4 footer-grid_section_1its">
                <div className="footer-title">
                  <h3>Request Info</h3>
                </div>
                <div className="info-form-right mt-4 p-0">
                  <form action="/" method="post">
                    <div className="row">
                      <div className="col-lg-6 form-group mb-2 pr-lg-1">
                        <input
                          type="text"
                          className="form-control"
                          name="Name"
                          placeholder="Name"
                          required
                        />
                      </div>
                      <div className="col-lg-6 form-group mb-2 pl-lg-1">
                        <input
                          type="text"
                          className="form-control"
                          name="Phone"
                          placeholder="Phone"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group mb-2">
                      <input
                        type="email"
                        className="form-control"
                        name="Email"
                        placeholder="Email"
                        required
                      />
                    </div>
                    <div className="form-group mb-2">
                      <textarea
                        name="Comment"
                        className="form-control"
                        placeholder="Comment"
                        required
                        defaultValue={""}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn submit-contact ml-auto"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <div className="cpy-right text-center py-3">
          <p>© 2021 HOTEL ROYAL RAMESSES-SEEDUWA-. All rights reserved</p>
        </div>
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

export default ParkingList;
