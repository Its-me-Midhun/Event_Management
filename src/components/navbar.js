import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { MDBBtn } from 'mdb-react-ui-kit';
// import Link from 'react-router-dom';

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBIcon,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import service from '../api/service';
import { login, LogOut } from '../actions';
const LINK = styled(Link)`
  color: white;
  margin-right: 2%;
`;
//permission
const Navigationbar = () => {
  const [PermissionsAllowed, setPermissionsAllowed] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Role = localStorage.getItem('Role');
  const Token = localStorage.getItem('token');
  const PermissionAssigned = localStorage.getItem('permissions');
  const { PermissionsSocket } = useSelector((e) => e.Reducer);
  const [showNavSecond, setShowNavSecond] = useState(false);
  // let array = JSON.parse(PermissionAssigned)?.filter(
  //   (item) => item._id === 'Company'
  // );
  // let permissionAllowed = array[0]?.Permission_subMenu;
  useEffect(() => {
    setPermissionsAllowed(PermissionsSocket);
  }, [PermissionsSocket]);
  let per = PermissionsAllowed?.filter(
    (obj) => Object.keys(obj)[0] === 'Company'
  );
  let values = per?.map((e) => e.Company);
  console.log('values', values);

  // const per = PermissionsSocket.reduce((acc, obj) => {
  //   if (Object.keys(obj)[0] === 'Company') {
  //     acc.push(obj);
  //   }
  //   return acc;
  // }, []);
  return (
    <div>
      <MDBNavbar
        expand="lg"
        className="navbar navbar-expand-lg navbar-light bg-black "
      >
        <MDBContainer fluid>
          <MDBNavbarBrand href="/" style={{ color: 'crimson' }}>
            ExtraVance
          </MDBNavbarBrand>
          <MDBNavbarToggler
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowNavSecond(!showNavSecond)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showNavSecond}>
            <MDBNavbarNav style={{ color: 'white' }}>
              <LINK to="/">Home</LINK>
              {Role === 'Super Admin' ? (
                <>
                  <LINK to="/auth/signup">Admin&nbsp;Reg</LINK>
                  {!Token ? (
                    <LINK to="/auth/login">Login</LINK>
                  ) : (
                    <LINK onClick={() => dispatch(LogOut(navigate))}>
                      LogOut
                    </LINK>
                  )}
                  <LINK to="/venue/">Venue&nbsp;List</LINK>
                  <LINK to="/company">company&nbsp;Reg</LINK>
                  <LINK to="/events">Events&nbsp;Reg</LINK>

                  <LINK to="/company/list">Companies</LINK>
                  <LINK to="/venue/create">Venues&nbsp;Reg</LINK>
                  <LINK to="/permissions">permissions</LINK>
                  <LINK to="/bookings/Getbooking">Booking</LINK>
                  <LINK to="/events/all">Event&nbsp;List</LINK>
                </>
              ) : Role === 'Admin' ? (
                <>
                  {!Token ? (
                    <LINK to="/auth/login">Login</LINK>
                  ) : (
                    <LINK onClick={() => dispatch(LogOut(navigate))}>
                      LogOut
                    </LINK>
                  )}
                  <LINK to="/venue/">Venue&nbsp;List</LINK>
                  {values?.includes('Add') ? (
                    <>
                      <LINK to="/company">company&nbsp;Reg</LINK>
                    </>
                  ) : null}
                  <LINK to="/events">Events&nbsp;Reg</LINK>

                  {/* {permissionAllowed?.includes('List') ? ( */}
                  <>
                    <LINK to="/company/list">Companies</LINK>
                  </>
                  {/* ) : null} */}
                  <LINK to="/venue/create">Venues&nbsp;Reg</LINK>
                  <LINK to="/events/all">Event&nbsp;List</LINK>

                  <LINK to="/bookings/Getbooking">Booking</LINK>
                </>
              ) : (
                <>
                  {!Token ? (
                    <LINK to="/auth/login">Login</LINK>
                  ) : (
                    <LINK onClick={() => dispatch(LogOut(navigate))}>
                      LogOut
                    </LINK>
                  )}
                  <LINK to="/venue/">Venue&nbsp;List</LINK>
                  <LINK to="/events/all">Event&nbsp;List</LINK>
                  <LINK to="/bookings/Getbooking">Booking</LINK>
                  <LINK to="/form">form</LINK>

                  {/* <LINK to="/company">company Reg</LINK> */}
                </>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default Navigationbar;
