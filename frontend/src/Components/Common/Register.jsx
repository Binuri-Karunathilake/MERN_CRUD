import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { APIURL } from "../API/environment";
import Logo from "../../assets/images/logo.png";

const initialState = {
  customer_name: "",
  customer_address: "",
  customer_email: "",
  customer_mobile_number: "",
  customer_password: "",
  customer_confirm_password: "",
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(event) {
    localStorage.clear();
    event.preventDefault();
    let register = {
      customer_name: this.state.customer_name,
      customer_address: this.state.customer_address,
      customer_email: this.state.customer_email,
      customer_mobile_number: this.state.customer_mobile_number,
      customer_password: this.state.customer_password,
      customer_confirm_password: this.state.customer_confirm_password,
    };

    axios.post(`${APIURL}/customer/register-customer`, register).then((res) => {
      console.log("res", res);
      if (res.data.code === 200) {
        toast.success(res.data.message);
        window.setTimeout(function () {
          window.location.href = "/login";
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    });
  }

  render() {
    return (
      <div>
        <header id="home"></header>
        <div className="main-top py-1">
          <div className="container">
            <div className="nav-content">
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
                      <a href="/" className="active-page">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="about.html">About Us</a>
                    </li>
                    <li>
                      <label htmlFor="drop-3" className="toggle toogle-2">
                        Pages
                        <span className="fa fa-angle-down" aria-hidden="true" />
                      </label>
                      <a href="#pages">
                        Services
                        <span className="fa fa-angle-down" aria-hidden="true" />
                      </a>
                      <input type="checkbox" id="drop-3" />
                      <ul>
                        <li>
                          <a className="drop-text" href="#services">
                            Dish Menu
                          </a>
                        </li>
                        <li>
                          <a className="drop-text" href="about.html">
                            Rooms
                          </a>
                        </li>
                        <li>
                          <a className="drop-text" href="#blog">
                            Gym
                          </a>
                        </li>

                        <li>
                          <a className="drop-text" href="#blog">
                            Parking
                          </a>
                        </li>

                        <li>
                          <a className="drop-text" href="single.html">
                            Laundry
                          </a>
                        </li>
                        <li>
                          <a className="drop-text" href="/login">
                            Login
                          </a>
                        </li>
                        <li>
                          <a className="drop-text" href="/register">
                            Register
                          </a>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <a href="contact.html">Contact Us</a>
                    </li>
                    <li>
                      <a href="/login">Login</a>
                    </li>

                    <li>
                      <a href="/register">Register</a>
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
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Register
            </li>
          </ol>
        </div>

        <div className="login-contect py-5">
          <div className="container py-xl-5 py-3">
            <div className="login-body">
              <div className="login p-4 mx-auto">
                <h5 className="text-center mb-4">Register Now</h5>
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
                  <div className="form-group">
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
                  </div>
                  <button type="submit" className="btn submit mb-4">
                    Register
                  </button>
                  <p className="forgot-w3ls text-center mb-3">
                    <a href="/" className="text-da">
                      Forgot your password?
                    </a>
                  </p>
                  <p className="account-w3ls text-center text-da">
                    Already have an account?
                    <a href="/login">Login</a>
                  </p>
                </form>
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
export default Register;
