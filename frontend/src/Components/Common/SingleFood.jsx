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
  item_url: "",
};

class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState,
      singleItem: [],
      customer: [],
    };
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

        this.setState({ user_id: this.state.customer._id });
        this.setState({ user_name: this.state.customer.customer_name });
      });

    await axios
      .get(
        `${APIURL}/menulist/get-menu-item-by-id/${this.props.match.params.id}`
      )
      .then((response) => {
        this.setState({ singleItem: response.data.MenuItems });
        console.log("singleItem =>", this.state.singleItem);

        this.setState({
          food_type: this.state.singleItem.item_type,
        });

        this.setState({
          food_name: this.state.singleItem.item_name,
        });

        this.setState({
          QntySmallPrice: this.state.singleItem.item_price_type_small,
        });

        this.setState({
          QntyMPrice: this.state.singleItem.item_price_type_medium,
        });

        this.setState({
          QntyLPrice: this.state.singleItem.item_price_type_large,
        });
        this.setState({
          item_url: this.state.singleItem.item_url,
        });
      });
  }

  toggle() {
    if (this.state.qnty_type === "Small") {
      this.setState({
        total_price: this.state.qnty * this.state.QntySmallPrice,
      });
    }
    if (this.state.qnty_type === "Medium") {
      this.setState({
        total_price: this.state.qnty * this.state.QntyMPrice,
      });
    }
    if (this.state.qnty_type === "Large") {
      this.setState({
        total_price: this.state.qnty * this.state.QntyLPrice,
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();

    let OrderDetails = {
      food_name: this.state.food_name,
      food_type: this.state.food_type,
      qnty_type: this.state.qnty_type,
      qnty: this.state.qnty,
      total_price: this.state.total_price,
      item_url: this.state.item_url,
      user_id: this.state.user_id,
      user_name: this.state.user_name,
    };

    console.log("OrderDetails", OrderDetails);
    axios.post(`${APIURL}/order/order_place`, OrderDetails).then((res) => {
      console.log("res", res);

      if (res.data.code === 200) {
        toast.success(res.data.message);
        this.props.history.push("/food-menu");
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
              <a href="/food-menu">Food Menu</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {this.state.singleItem.item_name}
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Oder Now
            </li>
          </ol>
        </div>{" "}
        <div className="row">
          <div className="col-6">
            <div className="single-page py-50">
              <div className="container py-xl-5 py-lg-3">
                <div className="title-section text-left mb-md-5 mb-4">
                  <p className="w3ls-title-sub"></p>
                  <h3 className="w3ls-title">
                    {this.state.singleItem.item_name} -
                    <span> {this.state.singleItem.item_type}</span>
                  </h3>
                </div>
                <div className="inner-sec">
                  <div className="row">
                    <div className="col-lg-8 left-blog-info text-left">
                      <div className="blog-grid-top">
                        <div className="b-grid-top">
                          <div className="blog_info_left_grid">
                            <a href="single.html">
                              <img
                                src={this.state.singleItem.item_url}
                                className="img-fluid"
                                alt=""
                              />
                            </a>
                          </div>
                        </div>

                        <h3 className="single-text text-da font-weight-light mt-3">
                          {this.state.singleItem.item_name}
                        </h3>
                        <h3 className="single-text text-da font-weight-light mt-3">
                          Small Price (Rs.) -{" "}
                          {this.state.singleItem.item_price_type_small}
                        </h3>
                        <h3 className="single-text text-da font-weight-light mt-3">
                          Medium Price (Rs.) -{" "}
                          {this.state.singleItem.item_price_type_medium}
                        </h3>
                        <h3 className="single-text text-da font-weight-light mt-3">
                          Large Price (Rs.) -{" "}
                          {this.state.singleItem.item_price_type_large}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <h3 className="w3ls-title" style={{ marginTop: 70 }}>
              <span> Place Your Order Now</span>
            </h3>
            <form onSubmit={this.onSubmit} method="post">
              <div className="form-group" style={{ marginTop: 20, width: 500 }}>
                <label htmlFor="exampleInputEmail1" style={{ fontSize: 20 }}>
                  Food Type
                </label>
                <input
                  style={{ fontSize: 20, color: "black" }}
                  type="text"
                  name="food_type"
                  value={this.state.food_type}
                  onChange={this.onChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  readOnly
                />
              </div>
              <div className="form-group" style={{ marginTop: 5, width: 500 }}>
                <label htmlFor="exampleInputEmail1" style={{ fontSize: 20 }}>
                  Food Name
                </label>
                <input
                  style={{ fontSize: 20, color: "black" }}
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  name="food_name"
                  value={this.state.food_name}
                  onChange={this.onChange}
                  readOnly
                />
              </div>
              <div className="form-group" style={{ marginTop: 5, width: 500 }}>
                <label htmlFor="exampleInputEmail1" style={{ fontSize: 20 }}>
                  Quantity Type
                </label>
                <select
                  style={{ fontSize: 20, color: "black" }}
                  type="email"
                  name="qnty_type"
                  value={this.state.qnty_type}
                  onChange={this.onChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  required
                >
                  <option>Select Type</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
              </div>

              <div className="form-group" style={{ marginTop: 5, width: 500 }}>
                <label htmlFor="exampleInputEmail1" style={{ fontSize: 20 }}>
                  Price
                </label>
                {this.state.qnty_type === "Small" && (
                  <input
                    style={{ fontSize: 20, color: "black" }}
                    type="text"
                    name="QntyPrice"
                    value={this.state.QntySmallPrice}
                    onChange={this.onChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    readOnly
                  />
                )}

                {this.state.qnty_type === "Medium" && (
                  <input
                    style={{ fontSize: 20, color: "black" }}
                    type="text"
                    name="QntyPrice"
                    value={this.state.QntyMPrice}
                    onChange={this.onChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    readOnly
                  />
                )}

                {this.state.qnty_type === "Large" && (
                  <input
                    style={{ fontSize: 20, color: "black" }}
                    type="text"
                    name="QntyPrice"
                    value={this.state.QntyLPrice}
                    onChange={this.onChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    readOnly
                  />
                )}
              </div>

              <div className="form-group" style={{ marginTop: 5, width: 500 }}>
                <label htmlFor="exampleInputEmail1" style={{ fontSize: 20 }}>
                  Quantity
                </label>
                <input
                  style={{ fontSize: 20, color: "black" }}
                  type="number"
                  name="qnty"
                  value={this.state.qnty}
                  onChange={this.onChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  required
                />
              </div>

              <div className="row">
                <div className="col-6">
                  <div
                    className="form-group"
                    style={{ marginTop: 5, width: 275 }}
                  >
                    <label
                      htmlFor="exampleInputEmail1"
                      style={{ fontSize: 20 }}
                    >
                      Total Price
                    </label>
                    <input
                      style={{ fontSize: 20, color: "black" }}
                      type="text"
                      name="total_price"
                      value={this.state.total_price}
                      className="form-control"
                      id="exampleInputEmail1"
                      readOnly
                      required
                    />
                  </div>
                </div>
                <div className="col-6">
                  <span
                    type="submit"
                    className="btn btn-primary submit"
                    onClick={this.toggle}
                    style={{
                      width: 200,
                      marginLeft: -90,
                      marginTop: 45,
                      color: "white",
                    }}
                  >
                    Calculate Total
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary submit"
                style={{ width: 500, color: "white" }}
              >
                Order Now
              </button>
            </form>
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

export default SingleProduct;
