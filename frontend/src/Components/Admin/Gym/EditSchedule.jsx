import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import User from "../../../assets/images/user.png";
import { toast } from "react-toastify";
import { APIURL } from "../../API/environment";
import Logo from "../../../assets/images/logo.png";

const initialState = {
  gym_schedule_id: "",
  schedule_name: "",
  schedule_type: "",
  schedule_date: "",
  schedule_time: "",
  instructor_name: "",
  gym_price: "",
  image: null,
};

class EditSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState,
      scheduleList: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  async componentDidMount() {
    await axios
      .get(
        `${APIURL}/gym-schedule/get-schedule-details-by-id/${this.props.match.params.id}`
      )
      .then((response) => {
        this.setState({ scheduleList: response.data.GymScheduleDetails });
        console.log("scheduleList =>", this.state.scheduleList);

        this.setState({
          gym_schedule_id: this.state.scheduleList.gym_schedule_id,
        });
        this.setState({ schedule_name: this.state.scheduleList.schedule_name });
        this.setState({ schedule_type: this.state.scheduleList.schedule_type });
        this.setState({ schedule_date: this.state.scheduleList.schedule_date });
        this.setState({ schedule_time: this.state.scheduleList.schedule_time });
        this.setState({
          instructor_name: this.state.scheduleList.instructor_name,
        });
        this.setState({ gym_price: this.state.scheduleList.gym_price });
        this.setState({ image: this.state.scheduleList.gym_url });
      });
  }

  onFileChange = (event) => {
    this.setState({ image: event.target.files[0] });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("image", this.state.image);
    formData.append("gym_schedule_id", this.state.gym_schedule_id);
    formData.append("schedule_name", this.state.schedule_name);
    formData.append("schedule_type", this.state.schedule_type);
    formData.append("schedule_date", this.state.schedule_date);
    formData.append("schedule_time", this.state.schedule_time);
    formData.append("instructor_name", this.state.instructor_name);
    formData.append("gym_price", this.state.gym_price);

    axios
      .put(
        `${APIURL}/gym-schedule/update-schedule-details/${this.props.match.params.id}`,
        formData
      )
      .then((res) => {
        console.log("res", res);

        if (res.data.code === 200) {
          toast.success(res.data.message);
          this.props.history.push("/get-all-gym");
        } else {
          toast.error(res.data.message);
        }
      });
  }

  onDelete(event) {
    event.preventDefault();

    axios
      .delete(
        `${APIURL}/gym-schedule/delete-gym-schedule/${this.props.match.params.id}`
      )
      .then((res) => {
        console.log("res", res);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          this.props.history.push("/get-all-gym");
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
            <div id="content">
              <nav className="navbar navbar-expand topbar mb-4 static-top">
                <h1 className="h3 mb-2 text-gray-800">
                  Edit Gym Schedule Details{" "}
                </h1>
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
                                  'url("../../../assets/images/room1.jpg")',
                              }}
                            />
                            <div className="col-lg-6">
                              <div className="p-5">
                                <div className="text-center">
                                  <h1 className="h4 text-gray-900 mb-4">
                                    Edit {this.state.scheduleList.schedule_name}
                                    's Details
                                  </h1>
                                </div>
                                <form
                                  className="user"
                                  onSubmit={this.onSubmit}
                                  method="post"
                                >
                                  <div className="form-group">
                                    <label>Gym Schedule ID</label>
                                    <input
                                      type="text"
                                      name="gym_schedule_id"
                                      value={this.state.gym_schedule_id}
                                      placeholder="GS-000"
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                      readOnly
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Gym Schedule Name</label>
                                    <input
                                      type="text"
                                      name="schedule_name"
                                      value={this.state.schedule_name}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Gym Schedule Type</label>
                                    <select
                                      className="form-control "
                                      style={{ borderRadius: 25, height: 50 }}
                                      name="schedule_type"
                                      value={this.state.schedule_type}
                                      onChange={this.onChange}
                                    >
                                      <option>Select Schedule Type</option>
                                      <option value="Endurance workouts">
                                        Endurance workouts
                                      </option>
                                      <option value="Strength workouts">
                                        Strength workouts
                                      </option>
                                      <option value="Balance workouts">
                                        Balance workouts
                                      </option>
                                      <option value="Flexibility workouts">
                                        Flexibility workouts
                                      </option>
                                    </select>
                                  </div>

                                  <div className="form-group">
                                    <label>Gym Schedule Date</label>
                                    <select
                                      className="form-control "
                                      style={{ borderRadius: 25, height: 50 }}
                                      name="schedule_date"
                                      value={this.state.schedule_date}
                                      onChange={this.onChange}
                                    >
                                      <option>Select Schedule Date</option>
                                      <option value="Monday">Monday</option>
                                      <option value="Tuesday">Tuesday</option>
                                      <option value="Wednesday">
                                        Wednesday
                                      </option>
                                      <option value="Thursday">Thursday</option>
                                      <option value="Friday">Friday</option>
                                      <option value="Saturday">Saturday</option>
                                      <option value="Sunday">Sunday</option>
                                    </select>
                                  </div>

                                  <div className="form-group">
                                    <label>Gym Schedule time</label>
                                    <input
                                      type="time"
                                      name="schedule_time"
                                      value={this.state.schedule_time}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Instructor Name</label>
                                    <input
                                      type="text"
                                      name="instructor_name"
                                      value={this.state.instructor_name}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Gym Pricer Per Month</label>
                                    <input
                                      type="text"
                                      name="gym_price"
                                      value={this.state.gym_price}
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Images</label>
                                    <input
                                      type="file"
                                      name="image"
                                      accept="image/*"
                                      onChange={this.onFileChange}
                                      className=" images-upload"
                                    />
                                  </div>

                                  <button
                                    type="submit"
                                    style={{ fontSize: 15 }}
                                    className="btn btn-primary btn-user btn-block"
                                  >
                                    Update Records
                                  </button>
                                </form>

                                <button
                                  type="submit"
                                  className="btn btn-danger btn-user btn-block"
                                  style={{
                                    borderRadius: 25,
                                    height: 40,
                                    marginTop: 10,
                                  }}
                                  onClick={this.onDelete}
                                >
                                  Delete Records
                                </button>

                                <Link to="/get-all-gym">
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
export default EditSchedule;
