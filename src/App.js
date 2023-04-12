import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Navigationbar from './components/navbar';
import SignUp from './components/Signup';
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  Permissionsockets,
  resetErrorMessage,
  resetSuccessMessage,
  setLoader,
  setProfile,
} from './actions';
import Venue from './components/Venue';
import ListVenue from './components/listVenues';
import Company from './components/Company';
import ListCompany from './components/listCompany';
import { PrivateRoute } from './components/PrivateRouting';
import Permissions from './components/Permissions';
import { io } from 'socket.io-client';
import EventAdding from './components/event';
import Events from './components/event';
import Booking from './components/bookings';
import ListEvents from './components/listEvents';
import PaymentDetails from './components/PaymentDetails';
import FORM from './components/form';
import DataTable from './components/bookingsList';
import BookListing from './components/bookingsList';
import Maps from './components/Maps';
import GoogleApiWrapper from './components/Maps';
import Checkout from './components/Checkout';
import Search from './components/search';
import CreditCardForm from './components/CardsDe';
import PaymentForm from './components/CardsDe';

// toaster
const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
};
const socket = io.connect('http://localhost:4000');

const App = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { successMessage, errorMessage, loader, designations } = useSelector(
    (state) => state.Reducer
  );
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, toastConfig);
      dispatch(resetSuccessMessage());
    } else if (errorMessage) {
      toast.error(errorMessage, toastConfig);
      dispatch(resetErrorMessage());
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    socket.on('GetPermissions', (data) => {
      console.log('bapu', data);
      dispatch(Permissionsockets(data));
    });
  }, [socket]);

  useEffect(() => {
    dispatch(setProfile());
  }, []);

  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Navigationbar />
        <Routes>
          <Route exact path="/auth/signup" element={<SignUp />}></Route>
          <Route exact path="/auth/login" element={<Login />}></Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route
            exact
            path="/venue/create/:id"
            element={
              <PrivateRoute>
                <Venue />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/permissions"
            element={
              <PrivateRoute>
                <Permissions socket={socket} />
              </PrivateRoute>
            }
          ></Route>

          <Route
            exact
            path="/venue/create"
            element={
              <PrivateRoute>
                <Venue />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/events/all"
            element={
              <PrivateRoute>
                <ListEvents />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/events"
            element={
              <PrivateRoute>
                <Events />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/events/:id"
            element={
              <PrivateRoute>
                <Events />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/bookings/Getbooking"
            element={
              <PrivateRoute>
                <BookListing />
              </PrivateRoute>
            }
          ></Route>

          <Route exact path="/venue" element={<ListVenue />}></Route>
          <Route
            exact
            path="/company/:id"
            element={
              <PrivateRoute>
                <Company />
              </PrivateRoute>
            }
          ></Route>
          <Route exact path="/company" element={<Company />}></Route>
          <Route
            path="/company/list/:id"
            element={
              <PrivateRoute>
                <Company />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/company/list"
            element={
              <PrivateRoute>
                <ListCompany />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/bookings/:id"
            element={
              <PrivateRoute>
                <Booking />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/company/approve/:id"
            element={
              <PrivateRoute>
                <ListCompany />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/payment_details"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/company/approve/:reject"
            element={
              <PrivateRoute>
                <ListCompany />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/form"
            element={
              <PrivateRoute>
                <FORM />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <Search />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/CardD"
            element={
              <PrivateRoute>
                <PaymentForm />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
