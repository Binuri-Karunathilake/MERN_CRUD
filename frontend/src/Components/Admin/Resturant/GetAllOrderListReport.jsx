import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../../API/environment";
import User from "../../../assets/images/user.png";
import Logo from "../../../assets/images/logo.png";
import { toast } from "react-toastify";

const initialState = {
  item_name: "",
  item_type: "",
  item_time: "",
  item_price_type_small: "",
  item_price_type_medium: "",
  item_price_type_large: "",
  totalPrice: 0,
  image: null,
};

class GetAllOrderListReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState,
      orderList: [],
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async componentDidMount() {
    await axios
      .get(`${APIURL}/order/get_all_order_details`)
      .then((response) => {
        this.setState({ orderList: response.data.AllOrderDetails });
        console.log("orderList =>", this.state.orderList);
      });
  }

  toggle() {
    {
      this.state.orderList.length > 0 &&
        this.state.orderList.map((item, index) => (
          <>
            {this.state.item_time === "Breakfirst" &&
              this.state.item_type === "Small" &&
              this.state.totalPrice ===
                this.state.totalPrice + item.total_price &&
              this.setState({ totalPrice: this.state.totalPrice })}
          </>
        ));
    }
  }

  onApprove(e, id) {
    let updateDetailsStatus = {
      isApprove: 1,
    };

    console.log(id);
    axios
      .put(`${APIURL}/order/give_approve/${id}`, updateDetailsStatus)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          this.props.history.push("/restuarant-dash");
        } else {
          toast.error(res.data.message);
        }
      });
  }

  onDelete(e, id) {
    let updateDetailsStatus = {
      isApprove: 0,
    };

    console.log(id);
    axios
      .put(`${APIURL}/order/give_approve/${id}`, updateDetailsStatus)
      .then((res) => {
        console.log(updateDetailsStatus);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          this.props.history.push("/restuarant-dash");
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
          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}

              <div className="container-fluid">
                <div className="row"></div>

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Check Orders{" "}
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
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>Order ID</th>
                            <th>Food Name</th>
                            <th>Foode Type</th>
                            <th>Quantity Type</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>Order ID</th>
                            <th>Food Name</th>
                            <th>Foode Type</th>
                            <th>Quantity Type</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Actions</th>
                          </tr>
                        </tfoot>

                        {this.state.orderList.length > 0 &&
                          this.state.orderList.map((item, index) => (
                            <tbody key={index}>
                              <tr>
                                {item.isApprove != 2 && (
                                  <>
                                    <td>{item.user_id}</td>
                                    <td>{item.user_name}</td>
                                    <td>{item._id}</td>
                                    <td>{item.food_name}</td>
                                    <td>{item.food_type}</td>
                                    <td>{item.qnty_type}</td>
                                    <td>{item.qnty}</td>
                                    <td>{item.total_price}</td>
                                    <td>
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
                                  </>
                                )}
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
  }
}
export default GetAllOrderListReport;
