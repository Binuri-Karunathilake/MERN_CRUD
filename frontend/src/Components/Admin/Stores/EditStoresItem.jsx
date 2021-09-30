import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import User from "../../../assets/images/user.png";
import { toast } from "react-toastify";
import { APIURL } from "../../API/environment";
import Logo from "../../../assets/images/logo.png";

const initialState = {
  item_id: "",
  item_name: "",
  item_type: "",
  item_add_date: "",
  item_qnty: "",
  item_price: "",
  total_item_price: "",
};

class EditStoresItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState,
      storesDetails: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onCalculate = this.onCalculate.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCalculate(event) {
    this.setState({
      total_item_price: this.state.item_qnty * this.state.item_price,
    });
  }

  async componentDidMount() {
    await axios
      .get(`${APIURL}/stores/get-stores-details/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({ storesDetails: res.data.StoresScheduleDetails });
        console.log("storesDetails", this.state.storesDetails);

        this.setState({
          item_id: this.state.storesDetails.item_id,
        });
        this.setState({
          item_name: this.state.storesDetails.item_name,
        });
        this.setState({
          item_type: this.state.storesDetails.item_type,
        });
        this.setState({
          item_add_date: this.state.storesDetails.item_add_date,
        });
        this.setState({
          item_qnty: this.state.storesDetails.item_qnty,
        });
        this.setState({
          item_price: this.state.storesDetails.item_price,
        });
        this.setState({
          total_item_price: this.state.storesDetails.total_item_price,
        });
      });
  }

  onSubmit(event) {
    event.preventDefault();

    let StoresDetails = {
      item_id: this.state.item_id,
      item_name: this.state.item_name,
      item_type: this.state.item_type,
      item_add_date: this.state.item_add_date,
      item_qnty: this.state.item_qnty,
      item_price: this.state.item_price,
      total_item_price: this.state.total_item_price,
    };

    axios
      .put(
        `${APIURL}/stores/update-schedule-details/${this.props.match.params.id}`,
        StoresDetails
      )
      .then((res) => {
        console.log("res", res);

        if (res.data.code === 200) {
          toast.success(res.data.message);
          this.props.history.push("/get-all-stores-item");
        } else {
          toast.error(res.data.message);
        }
      });
  }

  onDelete(event) {
    event.preventDefault();

    axios
      .delete(`${APIURL}/stores/delete-schedule/${this.props.match.params.id}`)
      .then((res) => {
        console.log("res", res);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          this.props.history.push("/get-all-stores-item");
        } else {
          toast.error(res.data.message);
        }
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
            <div id="content">
              <nav className="navbar navbar-expand topbar mb-4 static-top">
                <h1 className="h3 mb-2 text-gray-800">Edit Stores Record</h1>
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
                                  'url("../../../assets/images/stores1.jpg")',
                              }}
                            />
                            <div className="col-lg-6">
                              <div className="p-5">
                                <div className="text-center">
                                  <h1
                                    className="h4 text-gray-900 mb-4"
                                    style={{ fontStyle: "italic" }}
                                  >
                                    Edit {this.state.storesDetails.item_name}'s
                                    Details
                                  </h1>
                                </div>
                                <form
                                  className="user"
                                  onSubmit={this.onSubmit}
                                  method="post"
                                >
                                  <div className="form-group">
                                    <label>Item Id</label>
                                    <input
                                      type="text"
                                      name="item_id"
                                      value={this.state.item_id}
                                      placeholder="SI-000"
                                      onChange={this.onChange}
                                      readOnly
                                      className="form-control form-control-user"
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label>Item Name</label>
                                    <input
                                      type="text"
                                      name="item_name"
                                      value={this.state.item_name}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Category</label>
                                    <select
                                      className="form-control "
                                      style={{ borderRadius: 25, height: 50 }}
                                      name="item_type"
                                      value={this.state.item_type}
                                      onChange={this.onChange}
                                    >
                                      <option>Select Category</option>
                                      <option value="Fruits">Fruits</option>
                                      <option value="Vegetable">
                                        Vegetable
                                      </option>
                                      <option value="Spices">Spices</option>
                                    </select>
                                  </div>

                                  <div className="form-group">
                                    <label>Added Date & Time</label>
                                    <input
                                      type="date"
                                      name="item_add_date"
                                      value={this.state.item_add_date}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Quantity</label>
                                    <input
                                      type="text"
                                      name="item_qnty"
                                      value={this.state.item_qnty}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Item Price (Rs.)</label>
                                    <input
                                      type="text"
                                      name="item_price"
                                      value={this.state.item_price}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <button
                                    type="button"
                                    className="btn btn-primary btn-user btn-block"
                                    onClick={this.onCalculate}
                                  >
                                    Calculate Total
                                  </button>
                                  <br />

                                  <div className="form-group">
                                    <label>Total Price (Rs.)</label>
                                    <input
                                      type="text"
                                      name="total_item_price"
                                      value={this.state.total_item_price}
                                      onChange={this.onChange}
                                      readOnly
                                      className="form-control form-control-user"
                                    />
                                  </div>
                                  <br />
                                  <button
                                    type="submit"
                                    className="btn btn-primary btn-user btn-block"
                                    style={{ fontSize: 15 }}
                                  >
                                    Update Records
                                  </button>
                                </form>

                                <br />
                                <button
                                  type="submit"
                                  className="btn btn-danger btn-user btn-block"
                                  style={{
                                    borderRadius: 25,
                                    height: 40,
                                    marginTop: -15,
                                  }}
                                  onClick={this.onDelete}
                                >
                                  Delete Records
                                </button>

                                <Link to="/get-all-stores-item">
                                  <button
                                    type="submit"
                                    className="btn btn-success btn-user btn-block"
                                    style={{
                                      borderRadius: 25,
                                      height: 40,
                                      marginTop: 10,
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
export default EditStoresItem;
