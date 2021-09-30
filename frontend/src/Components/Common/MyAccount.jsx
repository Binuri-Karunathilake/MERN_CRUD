import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { APIURL } from "../API/environment";
import Logo from "../../assets/images/logo.png";
import User from "../../assets/images/user.png";

const initialState = {
  customer_name: "",
  customer_address: "",
  customer_email: "",
  customer_mobile_number: "",
  customer_password: "",
  customer_confirm_password: "",
  cid: "",
};

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = { initialState, customer: [] };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.setState({ cid: localStorage.getItem("CID") });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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

        this.setState({ customer_name: this.state.customer.customer_name });
        this.setState({
          customer_address: this.state.customer.customer_address,
        });
        this.setState({ customer_email: this.state.customer.customer_email });
        this.setState({
          customer_mobile_number: this.state.customer.customer_mobile_number,
        });
      });
  }

  onSubmit(event) {
    event.preventDefault();
    let register = {
      customer_name: this.state.customer_name,
      customer_address: this.state.customer_address,
      customer_email: this.state.customer_email,
      customer_mobile_number: this.state.customer_mobile_number,
    };
    let id = localStorage.getItem("CID");
    axios
      .put(`${APIURL}/customer/customer-details/${id}`, register)
      .then((res) => {
        console.log("res", res);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          window.setTimeout(function () {
            window.location.href = "/customer-home";
          }, 2000);
        } else {
          toast.error(res.data.message);
        }
      });
  }

  onDelete(e, id) {
    axios.delete(`${APIURL}/customer/customer-details/${id}`).then((res) => {
      console.log("res", res);
      if (res.data.code === 200) {
        toast.success(res.data.message);
        window.setTimeout(function () {
          window.location.href = "/";
        }, 1500);
      } else {
        toast.error(res.data.message);
      }
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
                />
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
                  data-target="#accountModal"
                >
                  {" "}
                  <i className="fas fa-user-alt fa-sm fa-fw mr-2 text-gray-400" />
                  My Account
                </a>
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
                      <a href="/food-menu">Rooms</a>
                    </li>

                    <li>
                      <a href="/food-menu">Gym</a>
                    </li>

                    <li>
                      <a href="/food-menu">Laundry</a>
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
              My Account
            </li>
          </ol>
        </div>

        <div className="row">
          <div className="col-6 p-5">
            <button type="submit" className="btn submitP mb-4">
              Password Change
            </button>
            <button
              type="submit"
              className="btn submitD mb-4"
              onClick={(e) => {
                if (window.confirm("Do you want to delete this account?")) {
                  this.onDelete(e, localStorage.getItem("CID"));
                }
              }}
            >
              Delete Acoount
            </button>
          </div>
          <div className="col-6">
            <div className="login-contect py-5">
              <div className="container py-xl-5 py-3">
                <div className="login-body">
                  <div className="login p-4 mx-auto">
                    <h5 className="text-center mb-4">Update Profile Now</h5>
                    <form onSubmit={this.onSubmit} method="post">
                      <div className="form-group">
                        <label>Your Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="customer_name"
                          value={this.state.customer_name}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>
                      <div className="form-group">
                        <label>Your Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="customer_address"
                          value={this.state.customer_address}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>
                      <div className="form-group">
                        <label>Your Email</label>
                        <input
                          type="text"
                          className="form-control"
                          name="customer_email"
                          value={this.state.customer_email}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>
                      <div className="form-group">
                        <label>Your Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          name="customer_mobile_number"
                          value={this.state.customer_mobile_number}
                          onChange={this.onChange}
                          placeholder
                        />
                      </div>
                      {/* <div className="form-group">
                    <label className="mb-2">Password</label>
                    <input
                      type="text"
                      className="form-control"
                      name="customer_password"
                      value={this.state.customer_password}
                      onChange={this.onChange}
                      placeholder
                    />
                  </div>
                  <div className="form-group">
                    <label className="mb-2">Confirm Password</label>
                    <input
                      type="text"
                      className="form-control"
                      name="customer_confirm_password"
                      value={this.state.customer_confirm_password}
                      onChange={this.onChange}
                      placeholder
                    />
                  </div> */}
                      <button type="submit" className="btn submitU mb-4">
                        Update Details
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="py-5">
          <div className="container py-xl-4">
            <div className="row footer-top">
              <div className="col-lg-4 footer-grid_section_1its footer-text">
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
        <a href="home" className="move-top text-center">
          <span className="fa fa-level-up" aria-hidden="true" />
        </a>
      </div>
    );
  }
}
export default MyAccount;
