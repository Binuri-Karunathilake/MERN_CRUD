import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import User from "../../../assets/images/user.png";
import { toast } from "react-toastify";
import { APIURL } from "../../API/environment";
import Logo from "../../../assets/images/logo.png";

const initialState = {
  park_id: "",
  parking_category: "",
  parking_main_slot: "",
  parking_sub_slot: "",
  parking_price: "",
  image: null,
};

class EditRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState,
      ParkingDetails: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  async componentDidMount() {
    await axios
      .get(
        `${APIURL}/parking/get-parking-details-by-id/${this.props.match.params.id}`
      )
      .then((response) => {
        this.setState({ ParkingDetails: response.data.ParkingDetails });
        console.log("ParkingDetails =>", this.state.ParkingDetails);

        this.setState({ park_id: this.state.ParkingDetails.park_id });
        this.setState({
          parking_category: this.state.ParkingDetails.parking_category,
        });
        this.setState({
          parking_main_slot: this.state.ParkingDetails.parking_main_slot,
        });
        this.setState({
          parking_sub_slot: this.state.ParkingDetails.parking_sub_slot,
        });
        this.setState({
          parking_price: this.state.ParkingDetails.parking_price,
        });
        this.setState({ image: this.state.ParkingDetails.room_url });
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
    formData.append("park_id", this.state.park_id);
    formData.append("parking_category", this.state.parking_category);
    formData.append("parking_main_slot", this.state.parking_main_slot);
    formData.append("parking_sub_slot", this.state.parking_sub_slot);
    formData.append("parking_price", this.state.parking_price);

    axios
      .put(
        `${APIURL}/parking/update-parking-details/${this.props.match.params.id}`,
        formData
      )
      .then((res) => {
        console.log("res", res);

        if (res.data.code === 200) {
          toast.success(res.data.message);
          this.props.history.push("/get-parking-list");
        } else {
          toast.error(res.data.message);
        }
      });
  }

  onDelete(event) {
    event.preventDefault();

    axios
      .delete(`${APIURL}/parking/delete-parking/${this.props.match.params.id}`)
      .then((res) => {
        console.log("res", res);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          this.props.history.push("/get-parking-list");
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
            <div id="content">
              <nav className="navbar navbar-expand topbar mb-4 static-top">
                <h1 className="h3 mb-2 text-gray-800">Edit Room Record </h1>
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
                                    Edit {this.state.ParkingDetails.park_id}'s
                                    Details
                                  </h1>
                                </div>
                                <form
                                  className="user"
                                  onSubmit={this.onSubmit}
                                  method="post"
                                >
                                  <div className="form-group">
                                    <label>Parking Slot ID</label>
                                    <input
                                      type="text"
                                      name="park_id"
                                      value={this.state.park_id}
                                      placeholder="PS-000"
                                      onChange={this.onChange}
                                      className="form-control form-control-user"
                                      readOnly
                                    />
                                  </div>

                                  <div className="form-group">
                                    <label>Parking Category</label>
                                    <select
                                      className="form-control "
                                      style={{ borderRadius: 25, height: 50 }}
                                      name="parking_category"
                                      value={this.state.parking_category}
                                      onChange={this.onChange}
                                    >
                                      <option>Select Parking Category</option>
                                      <option value="Car">Car</option>
                                      <option value="Van">Van</option>
                                      <option value="Bus">Bus</option>
                                      <option value="Other">Other</option>
                                    </select>
                                  </div>

                                  <div className="form-group">
                                    <label>Parking Main Slot</label>
                                    <select
                                      className="form-control "
                                      style={{ borderRadius: 25, height: 50 }}
                                      name="parking_main_slot"
                                      value={this.state.parking_main_slot}
                                      onChange={this.onChange}
                                    >
                                      <option>Select Main Slot</option>
                                      <option value="A">A</option>
                                      <option value="B">B</option>
                                      <option value="C">C</option>
                                      <option value="D">D</option>
                                      <option value="E">E</option>
                                      <option value="F">F</option>
                                    </select>
                                  </div>

                                  <div className="form-group">
                                    <label>Parking Sub Slot</label>
                                    <select
                                      className="form-control "
                                      style={{ borderRadius: 25, height: 50 }}
                                      name="parking_sub_slot"
                                      value={this.state.parking_sub_slot}
                                      onChange={this.onChange}
                                    >
                                      <option>Select Sub Slot</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                      <option value="9">9</option>
                                      <option value="10">10</option>
                                    </select>
                                  </div>

                                  <div className="form-group">
                                    <label>Parking Pricer Per Hour (Rs.)</label>
                                    <input
                                      type="text"
                                      name="parking_price"
                                      value={this.state.parking_price}
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

                                <Link to="/get-parking-list">
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
export default EditRoom;
