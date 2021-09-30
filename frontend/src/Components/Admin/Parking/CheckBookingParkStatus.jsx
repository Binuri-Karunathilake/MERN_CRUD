import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../../API/environment";
import User from "../../../assets/images/user.png";
import Logo from "../../../assets/images/logo.png";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Loader from "react-loader-spinner";

const CheckBookingParkStatus = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [order, SetOrder] = useState([]);
  const [baseData, setBaseData] = useState([]);
  const [deleted, setDeleted] = useState(0);
  const doc = new jsPDF("landscape");
  useEffect(() => {
    async function gedData() {
      try {
        const response = await axios.get(
          `${APIURL}/park_order/get_all_park_order_details`
        );
        if (response.status === 200) {
          SetOrder(response.data.AllOrderDetails);
          setBaseData(response.data.AllOrderDetails);
        }
      } catch (error) {
        toast(error.response.data.message, { type: toast.TYPE.ERROR });
      }
      setIsLoading(false);
    }
    gedData();
  }, [deleted]);

  const downloadReport = () => {
    doc.text("Parking Booking Status Report", 30, 10);

    let array = [];
    order.map((orders, index) => {
      let row = [];
      row.push(index + 1);
      row.push(orders.user_id);
      row.push(orders.user_name);
      row.push(orders._id);
      row.push(orders.park_id);
      row.push(orders.parking_category);
      row.push(orders.parking_main_slot);
      row.push(orders.parking_sub_slot);
      row.push(orders.parking_price);
      row.push(orders.no_of_hours);
      row.push(orders.total_price);
      array.push(row);
      return row;
    });

    doc.autoTable({
      head: [
        [
          "#",
          "User ID",
          "User Name",
          "Booking Id",
          "Parking ID",
          "Category",
          "Main Slot",
          "Sub Slot",
          "Price",
          "No of Hours",
          "Total Price",
        ],
      ],

      body: array,
    });

    doc.save("Parking_Booking.pdf");
    //window.location.reload();
  };

  const search = (inp) => {
    if (!inp.target.value) {
      SetOrder(baseData);
    } else {
      let searchList = baseData.filter(
        (data) =>
          data.park_id.toLowerCase().includes(inp.target.value.toLowerCase()) ||
          data.parking_main_slot
            .toLowerCase()
            .includes(inp.target.value.toLowerCase()) ||
          data.parking_category
            .toLowerCase()
            .includes(inp.target.value.toLowerCase())
      );
      SetOrder(searchList);
    }
  };

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
          {/* Main Content */}
          <div id="content">
            {/* Topbar */}
            <nav className="navbar navbar-expand topbar mb-4 static-top">
              <h1 className="h3 mb-2 text-gray-800">
                All Parking Booking List
              </h1>
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
              <p className="mb-4">
                All Parking Booking List available in here.
              </p>
              <div className="row"></div>
              <div className="row" style={{ marginBottom: 20 }}>
                <div className="col-6">
                  <div>
                    <button
                      onClick={downloadReport}
                      style={{ marginLeft: 70, fontSize: 20 }}
                    >
                      Download Report
                    </button>
                  </div>
                </div>
                <div className="col-6">
                  <div style={{ marginLeft: 190 }}>
                    <input
                      type="search"
                      placeholder="Search.."
                      name="searchQuery"
                      style={{ height: 40 }}
                      onChange={search}
                    />
                  </div>
                </div>
              </div>

              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Check Parking Booking{" "}
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
                          <th>User Id </th>
                          <th>User Name</th>
                          <th>Booking ID</th>
                          <th>Parking ID</th>
                          <th>Category</th>
                          <th>Main Slot</th>
                          <th>Sub Slot</th>
                          <th>Price</th>
                          <th>No of Hours</th>
                          <th>Total Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tfoot>
                        <tr>
                          <th>User Id </th>
                          <th>User Name</th>
                          <th>Booking ID</th>
                          <th>Parking ID</th>
                          <th>Category</th>
                          <th>Main Slot</th>
                          <th>Sub Slot</th>
                          <th>Price</th>
                          <th>No of Hours</th>
                          <th>Total Price</th>
                          <th>Actions</th>
                        </tr>
                      </tfoot>

                      {order.length > 0 &&
                        order.map((item, index) => (
                          <tbody key={index}>
                            <tr>
                              <td>{item.user_id}</td>
                              <td>{item.user_name}</td>
                              <td>{item._id}</td>
                              <td>{item.park_id}</td>
                              <td>{item.parking_category}</td>
                              <td>{item.parking_main_slot}</td>
                              <td>{item.parking_sub_slot}</td>
                              <td>{item.parking_price}</td>
                              <td>{item.no_of_hours}</td>
                              <td>{item.total_price}</td>

                              <td>
                                {item.isApprove === 2 && (
                                  <>
                                    <p className="p-1 mb-1  text-warning">
                                      Pending
                                    </p>
                                  </>
                                )}

                                {item.isApprove === 1 && (
                                  <>
                                    <p className="p-1 mb-1 text-success">
                                      Approved
                                    </p>
                                    <br />
                                  </>
                                )}

                                {item.isApprove === 0 && (
                                  <>
                                    <p className="p-1 mb-1 text-danger">
                                      Cancled
                                    </p>
                                    <br />
                                  </>
                                )}
                              </td>
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
};
export default CheckBookingParkStatus;
