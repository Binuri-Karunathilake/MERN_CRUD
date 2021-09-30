import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./Components/Common/Home";
import HomeLogin from "./Components/Common/HomeLogin";
import Login from "./Components/Common/Login";
import Register from "./Components/Common/Register";
import ActivationEmail from "./Components/Common/ActivationEmail";
import MyAccount from "./Components/Common/MyAccount";
import OrderList from "./Components/Common/OrderList";
import AllOrders from "./Components/Common/AllOrders";

import RestuarnatMenu from "./Components/Admin/Resturant/Restuarant";
import AddFoodMenu from "./Components/Admin/Resturant/AddFoodMenu";
import GetAllFoodsMenuList from "./Components/Admin/Resturant/GetAllFoodsMenuList";
import GetAllBreakfirstFoods from "./Components/Admin/Resturant/GetAllBreakfirstFoods";
import GetAllLunchFoods from "./Components/Admin/Resturant/GetAllLunchFoods";
import GetAllTeaTimeFoods from "./Components/Admin/Resturant/GetAllTeaTimeFoods";
import GetAllDinnerFoods from "./Components/Admin/Resturant/GetAllDinnerFoods";
import EditFoodItem from "./Components/Admin/Resturant/EditFoodItem";
import FoodMenu from "./Components/Common/FoodMenu";
import SingleProduct from "./Components/Common/SingleFood";
import BreakfirstFoodMenu from "./Components/Common/BreakfirstFoodMenu";
import LunchFoodMenu from "./Components/Common/LunchFoodMenu";
import TeaFoodMenu from "./Components/Common/TeaFoodMenu";
import DinnerFoodMenu from "./Components/Common/DinnerFoodMenu";
import GetAllOrderList from "./Components/Admin/Resturant/GetAllOrderList";
import ApprovedOrderList from "./Components/Common/ApprovedOrderList";
import CancledOrderList from "./Components/Common/CancledOrderList";
import GymMenuList from "./Components/Common/GymMenuList";
import BookingGym from "./Components/Common/BookingGym";

import EmployeeDash from "./Components/Admin/Employee/Employee";
import AddEmployee from "./Components/Admin/Employee/AddEmployee";
import GetAllEmployee from "./Components/Admin/Employee/GetAllEmployee";
import EditEmployee from "./Components/Admin/Employee/EditEmployee";
import AddSalary from "./Components/Admin/Employee/AddSalary";

import AddParkingList from "./Components/Admin/Parking/AddParkingList";
import ParkingDash from "./Components/Admin/Parking/Parking";
import GetAllParkingList from "./Components/Admin/Parking/GetAllParkingList";
import EditParking from "./Components/Admin/Parking/EditParking";

import StoresDash from "./Components/Admin/Stores/Stores";
import AddStoreItem from "./Components/Admin/Stores/AddStoreItem";
import GetAllStoresItem from "./Components/Admin/Stores/GetAllStoresItem";
import EditStoresItem from "./Components/Admin/Stores/EditStoresItem";

import LaundryDash from "./Components/Admin/Laundry/Laundry";
import AddLaundrySchedule from "./Components/Admin/Laundry/AddLaundrySchedule";
import GetAllLaundrySchedule from "./Components/Admin/Laundry/GetAllLaundrySchedule";
import EditLaundrySchedule from "./Components/Admin/Laundry/EditLaundrySchedule";

import RoomDash from "./Components/Admin/Room/Room";
import AddRoom from "./Components/Admin/Room/AddRoom";
import GetAllRoomDetails from "./Components/Admin/Room/GetAllRooms";
import GetSingleRooms from "./Components/Admin/Room/GetSingleRooms";
import GetDoubleRooms from "./Components/Admin/Room/GetDoubleRooms";
import GetDeluxRooms from "./Components/Admin/Room/GetDeluxRooms";
import GetLuxaryRooms from "./Components/Admin/Room/GetLuxaryRooms";
import EditRoom from "./Components/Admin/Room/EditRoom";

import GymDash from "./Components/Admin/Gym/Gym";
import AddGym from "./Components/Admin/Gym/AddGym";
import GetAllGymSchedule from "./Components/Admin/Gym/GetAllGymSchedule";
import EditSchedule from "./Components/Admin/Gym/EditSchedule";
import GetAllGymBooking from "./Components/Admin/Gym/GetAllGymBooking";
import GetAllEmployeeSalary from "./Components/Admin/Employee/GetAllEmployeeSalary";
import GetAllEmployeePayeedSalary from "./Components/Admin/Employee/GetAllEmployeePayeedSalary";
import AddLiquor from "./Components/Admin/Stores/AddLiquor";
import GetAllLiquorList from "./Components/Admin/Stores/GetAllLiquorList";
import LiqourList from "./Components/Common/LiqourList";
import SingleLiquor from "./Components/Common/SingleLiquor";
import LiquorOrderList from "./Components/Common/LiquorOrderList";
import GetLiquorOrderList from "./Components/Admin/Stores/GetLiquorOrderList";
import RoomOrderList from "./Components/Common/RoomOrderList";
import RoomList from "./Components/Common/RoomList";
import SingleRoom from "./Components/Common/SingleRoom";
import GetRoomsOrderList from "./Components/Admin/Room/GetRoomsOrderList";
import CheckOrderStatus from "./Components/Admin/Resturant/CheckOrderStatus";
import CheckBookStatus from "./Components/Admin/Gym/CheckBookStatus";
import CheckLiquorOrderStatus from "./Components/Admin/Stores/CheckLiquorOrderStatus";
import CheckRoomOrderStatus from "./Components/Admin/Room/CheckRoomOrderStatus";
import ParkingList from "./Components/Common/ParkingList";
import SinglePark from "./Components/Common/SinglePark";
import GetAllParkingBookings from "./Components/Admin/Parking/GetAllParkingBookings";
import CheckBookingParkStatus from "./Components/Admin/Parking/CheckBookingParkStatus";
import LaundryList from "./Components/Common/LaundryList"; 
import GetLaundryScheduleReports from "./Components/Admin/Laundry/GetLaundryScheduleReports";

function App() {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/all_orders" exact component={AllOrders} />
          <Route path="/customer-home" exact component={HomeLogin} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route
            path="/customer/activate/:activation_token"
            component={ActivationEmail}
            exact
          />
          <Route path="/my-account" exact component={MyAccount} />
          <Route path="/order_list" exact component={OrderList} />
          <Route
            path="/approve_order_list"
            exact
            component={ApprovedOrderList}
          />
          <Route path="/cancle_order_list" exact component={CancledOrderList} />
          <Route path="/gym_list" exact component={GymMenuList} />
          <Route path="/book_gym_schedule/:id" exact component={BookingGym} />
          {/* Restuarant  Route */}
          <Route path="/restuarant-dash" exact component={RestuarnatMenu} />
          <Route path="/add-food-menu" exact component={AddFoodMenu} />
          <Route
            path="/get-all-food-menu"
            exact
            component={GetAllFoodsMenuList}
          />
          <Route
            path="/get-all-breakfirst-food-menu"
            exact
            component={GetAllBreakfirstFoods}
          />
          <Route path="/get_all_order_list" exact component={GetAllOrderList} />
      
          <Route
            path="/get-all-lunch-food-menu"
            exact
            component={GetAllLunchFoods}
          />
          <Route
            path="/get-all-teatime-food-menu"
            exact
            component={GetAllTeaTimeFoods}
          />
          <Route
            path="/get-all-dinner-food-menu"
            exact
            component={GetAllDinnerFoods}
          />
          <Route
            path="/get-food-dtails-by-id/:id"
            exact
            component={EditFoodItem}
          />
          <Route path="/food-menu" exact component={FoodMenu} />
          <Route path="/single-food-item/:id" exact component={SingleProduct} />
          <Route path="/cart-food-item/:id" exact component={SingleProduct} />
          <Route
            path="/breakfirst-food-menu"
            exact
            component={BreakfirstFoodMenu}
          />
          <Route path="/lunch-food-menu" exact component={LunchFoodMenu} />
          <Route path="/tea-food-menu" exact component={TeaFoodMenu} />
          <Route path="/dinner-food-menu" exact component={DinnerFoodMenu} />
          {/* Employee Routes */}
          <Route path="/employee-dash" exact component={EmployeeDash} />
          <Route path="/add-new-employee" exact component={AddEmployee} />
          <Route path="/get-all-employee" exact component={GetAllEmployee} />
          <Route
            path="/get-emploee-dtails-by-id/:id"
            exact
            component={EditEmployee}
          />
          <Route path="/add_emploee_salary/:id" exact component={AddSalary} />
          {/* Parking Routes */}
          <Route path="/parking-dash" exact component={ParkingDash} />
          <Route path="/add-parking-list" exact component={AddParkingList} />
          <Route path="/get-parking-list" exact component={GetAllParkingList} />
          <Route path="/edit-parking-list/:id" exact component={EditParking} />
          {/* Stores Routes */}
          <Route path="/stores-dash" exact component={StoresDash} />
          <Route path="/add-stores-item" exact component={AddStoreItem} />
          <Route
            path="/get-all-stores-item"
            exact
            component={GetAllStoresItem}
          />
          <Route
            path="/edit-stores-item/:id"
            exact
            component={EditStoresItem}
          />
          {/* Laundry Routes */}
          <Route path="/laundry-dash" exact component={LaundryDash} />
          <Route
            path="/add-laundry-schedule"
            exact
            component={AddLaundrySchedule}
          />
          <Route
            path="/get-all-laundry-schedule"
            exact
            component={GetAllLaundrySchedule}
          />
          <Route
            path="/edit-laundry-schedule/:id"
            exact
            component={EditLaundrySchedule}
          />
          {/* Room Routes */}
          <Route path="/room-dash" exact component={RoomDash} />
          <Route path="/add-new-room" exact component={AddRoom} />
          <Route
            path="/get-all-rooms-details"
            exact
            component={GetAllRoomDetails}
          />
          <Route
            path="/get-single-rooms-details"
            exact
            component={GetSingleRooms}
          />
          <Route
            path="/get-double-rooms-details"
            exact
            component={GetDoubleRooms}
          />
          <Route
            path="/get-delux-rooms-details"
            exact
            component={GetDeluxRooms}
          />
          <Route
            path="/get-luxary-rooms-details"
            exact
            component={GetLuxaryRooms}
          />
          <Route path="/edit-rooms-details/:id" exact component={EditRoom} />
          {/* Gym Routes */}
          <Route path="/gym-dash" exact component={GymDash} />
          <Route path="/add-new-gym" exact component={AddGym} />
          <Route path="/get-all-gym" exact component={GetAllGymSchedule} />
          <Route path="/get_all_book_gym" exact component={GetAllGymBooking} />
          <Route path="/get_all_book_gym_status" exact component={CheckBookStatus} />
          <Route path="/edit-gym-schedule/:id" exact component={EditSchedule} />

          <Route
            path="/get_all_salary"
            exact
            component={GetAllEmployeeSalary}
          />
          <Route
            path="/get_all_salary_pay"
            exact
            component={GetAllEmployeePayeedSalary}
          />

          <Route path="/add_liquor" exact component={AddLiquor} />
          <Route path="/get_liquor" exact component={GetAllLiquorList} />
          <Route path="/get_liquor_customer" exact component={LiqourList} />
          <Route path="/check_liquor_order_status" exact component={CheckLiquorOrderStatus} />
          <Route
            path="/get_liquor_customer/:id"
            exact
            component={SingleLiquor}
          />
          <Route path="/get_liquor_orders" exact component={LiquorOrderList} />
          <Route
            path="/get_all_liquor_orders"
            exact
            component={GetLiquorOrderList}
          />
          <Route path="/room_list_customer" exact component={RoomList} />
          <Route path="/get_all_room_orders" exact component={RoomOrderList} />
          <Route path="/get_room_details/:id" exact component={SingleRoom} />
          <Route path="/get_parking_slot" exact component={ParkingList} />
          <Route path="/get_parking_slot/:id" exact component={SinglePark} />
          <Route path="/get_all_parking_slot" exact component={GetAllParkingBookings} />
          <Route path="/check_all_parking_slot" exact component={CheckBookingParkStatus} />
          <Route path="/get_laundry_list" exact component={LaundryList} />
          <Route path="/get_laundry_report" exact component={GetLaundryScheduleReports} />


          <Route path="/check_all_order_status" exact component={CheckOrderStatus} />
          <Route path="/check_all_room_order_status" exact component={CheckRoomOrderStatus} />
          <Route
            path="/get_room_order_details"
            exact
            component={GetRoomsOrderList}
          />
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
