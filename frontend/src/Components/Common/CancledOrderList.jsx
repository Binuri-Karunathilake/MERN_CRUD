import React, { Component } from "react";
import Logo from "../../assets/images/logo.png";
import User from "../../assets/images/user.png";
import { APIURL } from "../API/environment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  food_type: "",
  food_name: "",
  qnty_type: "",
  QntySmallPrice: "",
  QntyMPrice: "",
  QntyLPrice: "",
  qnty: "",
  user_name: "",
  user_id: "",
  total_price: "",
};

class CancledOrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      customer: [],
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

        this.setState({ user_id: this.state.customer._id });
        this.setState({ user_name: this.state.customer.customer_name });
      });

    let id = this.state.user_id;
    await axios
      .get(`${APIURL}/order/get_all_cancle_order_details/${this.state.user_id}`)
      .then((response) => {
        this.setState({ orderList: response.data.AllOrderDetails });
        console.log("orderList =>", this.state.orderList);
        console.log("user_id =>", this.state.user_id);
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
                    width: 50,
                    height: 50,
                    marginLeft: 1350,
                    marginBottom: -70,
                  }}
                />{" "}
              </a>
              <p
                style={{
                  color: "black",
                  marginLeft: 1395,
                  fontStyle: "italic",
                  fontSize: 13,
                  marginTop: -10,
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

            <li className="breadcrumb-item">
              <a href="/order_list">Order</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Check Yorur Orders
            </li>
          </ol>
        </div>{" "}
        <div className="row">
          <div className="col-4">
            <Link to="/order_list">
              <button
                type="submit"
                className="btn btn-primary submit"
                style={{
                  width: 300,
                  color: "white",
                  marginTop: 60,
                  marginLeft: 10,
                  background: "blue",
                }}
              >
                All Orders
              </button>
            </Link>
            <Link to="/approve_order_list">
              <button
                type="submit"
                className="btn btn-primary submit"
                style={{
                  width: 300,
                  color: "white",
                  marginTop: 10,
                  marginLeft: 10,
                  background: "blue",
                }}
              >
                Approved Order
              </button>
            </Link>
            <Link to="/cancle_order_list">
              <button
                type="submit"
                className="btn btn-primary submit"
                style={{
                  width: 300,
                  color: "white",
                  marginTop: 10,
                  marginLeft: 10,
                  background: "blue",
                }}
              >
                Canceled Order
              </button>
            </Link>
          </div>
          <div className="col-8">
            <h3
              className="w3ls-title"
              style={{ marginTop: 30, marginLeft: -170 }}
            >
              <span> Check Your Cancled Orders Now</span>
            </h3>

            <div
              className="bg-surface-secondary"
              style={{
                marginTop: 30,
                marginLeft: -170,
                marginRight: 10,
              }}
            >
              <div className="table-responsive">
                <table className="table table-hover table-nowrap">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" style={{ fontSize: 15, color: "black" }}>
                        Food Item
                      </th>
                      <th scope="col" style={{ fontSize: 15, color: "black" }}>
                        Order ID
                      </th>
                      <th scope="col" style={{ fontSize: 15, color: "black" }}>
                        Food Name
                      </th>
                      <th scope="col" style={{ fontSize: 15, color: "black" }}>
                        Food Type
                      </th>
                      <th scope="col" style={{ fontSize: 15, color: "black" }}>
                        Quantity
                      </th>
                      <th scope="col" style={{ fontSize: 15, color: "black" }}>
                        Total Price
                      </th>
                      <th scope="col" style={{ fontSize: 15, color: "black" }}>
                        Status
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.orderList.length > 0 &&
                      this.state.orderList.map((item, index) => (
                        <tr>
                          <td style={{ fontSize: 12, color: "black" }}>
                            <img
                              style={{ width: 50, height: 50 }}
                              alt="..."
                              src={item.item_url}
                              className="avatar avatar-sm rounded-circle me-2"
                            />
                          </td>
                          <td
                            data-label="Email"
                            style={{ fontSize: 15, color: "black" }}
                          >
                            <span>{item._id}</span>
                          </td>
                          <td
                            data-label="Phone"
                            style={{ fontSize: 12, color: "black" }}
                          >
                            <p className="text-current">{item.food_name}</p>
                          </td>
                          <td
                            data-label="Lead Score"
                            style={{ fontSize: 12, color: "black" }}
                          >
                            <p className="text-current">{item.food_type}</p>
                          </td>
                          <td
                            data-label="Lead Score"
                            style={{ fontSize: 12, color: "black" }}
                          >
                            <p className="text-current">{item.qnty}</p>
                          </td>

                          <td
                            data-label="Lead Score"
                            style={{ fontSize: 12, color: "black" }}
                          >
                            <p className="text-current">{item.total_price}</p>
                          </td>

                          <td data-label="Company" style={{ fontSize: 12 }}>
                            {item.isApprove === 1 && (
                              <span
                                className="badge bg-soft-success text-success"
                                style={{ fontSize: 14, textAlign: "center" }}
                              >
                                Approved
                              </span>
                            )}

                            {item.isApprove === 0 && (
                              <span
                                className="badge bg-soft-danger text-danger"
                                style={{ fontSize: 14, textAlign: "center" }}
                              >
                                Cancled
                              </span>
                            )}
                            {item.isApprove === 2 && (
                              <span
                                className="badge bg-soft-warning text-warning"
                                style={{ fontSize: 14, textAlign: "center" }}
                              >
                                Pending
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <br />
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

export default CancledOrderList;
