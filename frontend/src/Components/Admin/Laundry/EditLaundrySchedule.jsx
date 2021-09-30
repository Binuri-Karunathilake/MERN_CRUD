import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import User from "../../../assets/images/user.png";
import { toast } from "react-toastify";
import { APIURL } from "../../API/environment";
import Logo from "../../../assets/images/logo.png";

const initialState = {
  laundry_schedule_id: "",
  schedule_name: "",
  schedule_type: "",
  schedule_weight: "",
  deliver_date: "",
  schedule_price: "",
  total_schedule_price: "",
};

class EditLaundrySchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState,
      laundryDetails: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onCalculate = this.onCalculate.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async componentDidMount() {
    await axios
      .get(
        `${APIURL}/laundry/get-schedule-details/${this.props.match.params.id}`
      )
      .then((res) => {
        this.setState({ laundryDetails: res.data.LaundryScheduleDetails });
        console.log("laundryDetails", this.state.laundryDetails);

        this.setState({
          laundry_schedule_id: this.state.laundryDetails.laundry_schedule_id,
        });
        this.setState({
          schedule_name: this.state.laundryDetails.schedule_name,
        });
        this.setState({
          schedule_type: this.state.laundryDetails.schedule_type,
        });
        this.setState({
          schedule_weight: this.state.laundryDetails.schedule_weight,
        });
        this.setState({
          schedule_price: this.state.laundryDetails.schedule_price,
        });
        this.setState({
          total_schedule_price: this.state.laundryDetails.total_schedule_price,
        });
        this.setState({
          deliver_date: this.state.laundryDetails.deliver_date,
        });
      });
  }

  onCalculate(event) {
    this.setState({
      total_schedule_price:
        this.state.schedule_price * this.state.schedule_weight,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    let LaundryDetails = {
      laundry_schedule_id: this.state.laundry_schedule_id,
      schedule_name: this.state.schedule_name,
      schedule_type: this.state.schedule_type,
      schedule_weight: this.state.schedule_weight,
      deliver_date: this.state.deliver_date,
      schedule_price: this.state.schedule_price,
      total_schedule_price: this.state.total_schedule_price,
    };

    axios
      .put(
        `${APIURL}/laundry/update-schedule-details/${this.props.match.params.id}`,
        LaundryDetails
      )
      .then((res) => {
        console.log("res", res);

        if (res.data.code === 200) {
          toast.success(res.data.message);
          this.props.history.push("/get-all-laundry-schedule");
        } else {
          toast.error(res.data.message);
        }
      });
  }

  onDelete(event) {
    event.preventDefault();

    axios
      .delete(`${APIURL}/laundry/delete-schedule/${this.props.match.params.id}`)
      .then((res) => {
        console.log("res", res);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          this.props.history.push("/get-all-laundry-schedule");
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
              href="/laundry-dash"
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
              <a className="nav-link" href="/laundry-dash">
                <i className="fas fa-fw fa-tachometer-alt" />
                <span>Dashboard</span>
              </a>
            </li>
            <br />
            <div className="sidebar-heading">Laundry Management</div>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/add-laundry-schedule">
                  <button className="dropbtn">
                    <i className="fa fa-plus-circle" /> New Schedule
                  </button>
                </Link>
              </div>
            </li>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get-all-laundry-schedule">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Schedule List
                  </button>
                </Link>
              </div>
            </li>
            <br />

            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get_laundry_report">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Laundry Report
                  </button>
                </Link>
              </div>
            </li>
            <br />
          </ul>

          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <nav className="navbar navbar-expand topbar mb-4 static-top">
                <h1 className="h3 mb-2 text-gray-800">Edit Laundry Record</h1>
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
                                  'url("../../../assets/images/laundry1.jpg")',
                              }}
                            />
                            <div className="col-lg-6">
                              <div className="p-5">
                                <div className="text-center">
                                  <h1
                                    className="h4 text-gray-900 mb-4"
                                    style={{ fontStyle: "italic" }}
                                  >
                                    Edit{" "}
                                    {this.state.laundryDetails.schedule_name}'s
                                    Details
                                  </h1>
                                </div>
                                <form
                                  className="user"
                                  onSubmit={this.onSubmit}
                                  method="post"
                                >
                                  <div className="form-group">
                                    <label>Schedule ID</label>
                                    <input
                                      type="text"
                                      name="laundry_schedule_id"
                                      value={this.state.laundry_schedule_id}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                      placeholder="LS-000"
                                      readOnly
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Schedule Name</label>
                                    <input
                                      type="text"
                                      name="schedule_name"
                                      value={this.state.schedule_name}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Schedule Type</label>
                                    <select
                                      className="form-control "
                                      style={{ borderRadius: 25, height: 50 }}
                                      name="schedule_type"
                                      value={this.state.schedule_type}
                                      onChange={this.onChange}
                                    >
                                      <option>Select Schedule Type</option>
                                      <option value="Wash">Wash</option>
                                      <option value="Dry">Dry</option>
                                      <option value="Wash & Dry">
                                        Wash & Dry
                                      </option>
                                    </select>
                                  </div>

                                  <div className="form-group">
                                    <label>Weight of cloths</label>
                                    <input
                                      type="text"
                                      name="schedule_weight"
                                      value={this.state.schedule_weight}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Price of weight (1kg)</label>
                                    <input
                                      type="text"
                                      name="schedule_price"
                                      value={this.state.schedule_price}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Total Price of Cloths (Rs)</label>
                                    <input
                                      type="text"
                                      name="total_schedule_price"
                                      value={this.state.total_schedule_price}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                      readOnly
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
                                    <label>Oder Return After (Days)</label>
                                    <select
                                      className="form-control "
                                      style={{ borderRadius: 25, height: 50 }}
                                      name="deliver_date"
                                      value={this.state.deliver_date}
                                      onChange={this.onChange}
                                    >
                                      <option>Select How Many Days</option>
                                      <option value="After 2 Days">
                                        After 2 Days
                                      </option>
                                      <option value="After 3 Days">
                                        After 3 Days
                                      </option>
                                      <option value="After 5 Days">
                                        After 5 Days
                                      </option>
                                      <option value="After 7 Days">
                                        After 7 Days
                                      </option>
                                    </select>
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

                                <Link to="/get-all-laundry-schedule">
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
export default EditLaundrySchedule;
