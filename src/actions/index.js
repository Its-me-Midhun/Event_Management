import service from '../api/service';

export const signup = (data) => async (dispatch) => {
  await service.signup(data).then((e) => {
    if (e.data.success === true) {
      dispatch(setSuccessMessage('Registered sucessfully'));
      dispatch({
        type: 'SET_USERS',
        payload: data,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

export const createVenue = (data) => async (dispatch) => {
  await service.Venues(data).then((e) => {
    if (e.data.success === true) {
      dispatch(setSuccessMessage('Registered sucessfully'));
      dispatch({
        type: 'SET_VENUE',
        payload: data,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

export const createCompany = (data) => async (dispatch) => {
  await service.Company(data).then((e) => {
    if (e.data.success === true) {
      dispatch(setSuccessMessage('Registered sucessfully'));
      dispatch({
        type: 'SET_COMPANY',
        payload: data,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

export const getAllVenue = (data) => async (dispatch) => {
  await service.getVenuesData(data).then((e) => {
    if (e.data.success === true) {
      dispatch({
        type: 'SET_VENUE_DATA',
        payload: e.data.data,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

export const getAllCompany = () => async (dispatch) => {
  await service.getCompanyData().then((e) => {
    if (e.data.success === true) {
      dispatch({
        type: 'SET_COMPANY_DATA',
        payload: e.data.data,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

export const approveCompany = (id) => async (dispatch) => {
  await service.approveCompany(id).then((e) => {
    if (e.data.success) {
      dispatch(setSuccessMessage(`${e.data.msg}`));
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

export const deleteVenue = (id) => async (dispatch) => {
  await service.deleteVenueData(id).then((e) => {
    if (e.data.success === true) {
      dispatch(setSuccessMessage(`${e.data.msg}`));
      dispatch(getAllVenue());
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

export const deleteCompany = (id) => async (dispatch) => {
  await service.deleteCompanyData(id).then((e) => {
    if (e.data.success === true) {
      dispatch(setSuccessMessage(`${e.data.msg}`));
      dispatch(getAllVenue());
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

export const getVenueById = (id) => async (dispatch) => {
  await service.getDataById(id).then((e) => {
    if (e.data.success === true) {
      dispatch({
        type: 'VENUE_BY_ID',
        payload: e.data.data,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

export const getCompanyById = (id) => async (dispatch) => {
  await service.getCompanyById(id).then((e) => {
    if (e.data.success === true) {
      dispatch({
        type: 'COMPANY_BY_ID',
        payload: e.data.data,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

export const patchVenue = (id, data) => async (dispatch) => {
  await service.patchVenueData(id, data).then((e) => console.log('id', e));
};

export const patchCompany = (id, data) => async (dispatch) => {
  await service.patchCompanyData(id, data).then((e) => console.log('id', e));
};

export const login = (data, navigate) => async (dispatch) => {
  let des;
  await service.login(data).then((e) => {
    des = e.data.data;
    if (e.data.success === false) {
      dispatch(setErrorMessage(`${e.data.msg}`));
      localStorage.setItem('token', '');
      localStorage.setItem('role', '');
    } else {
      localStorage.setItem('token', e.data.data.accessToken);
      localStorage.setItem('Role', e.data.data.designation);
      dispatch(setSuccessMessage(e.data.msg));
      dispatch(setLoader(false));
      navigate('/auth/signup');
      // window.location.reload();
    }
  });
  dispatch({ type: 'PERMISSION_DATA', payload: des.data });

  localStorage.setItem('permissions', JSON.stringify(des.data));
};

export const Designation = () => async (dispatch) => {
  await service.getDesignation().then((e) => {
    dispatch({ type: 'ADMIN_DATA', payload: e });
  });
};

export const LogOut = (navigate) => async () => {
  localStorage.setItem('token', '');
  localStorage.setItem('Role', '');
  navigate('/auth/login');
  window.location.reload();
};
//  Common
// toaster for success messsage
export const setSuccessMessage = (data) => (dispatch) => {
  dispatch({
    type: 'SUCCESS_MESSAGE',
    payload: data,
  });
};

// toaster for error message
export const setErrorMessage = (data) => (dispatch) => {
  dispatch({
    type: 'ERROR_MESSAGE',
    payload: data,
  });
};

// reset  success message toaster
export const resetSuccessMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_SUCCESS_MESSAGE',
  });
};

// reset error message toaster
export const resetErrorMessage = () => (dispatch) => {
  dispatch({
    type: 'RESET_ERROR_MESSAGE',
  });
};

export const setLoader = (data) => (dispatch) => {
  dispatch({
    type: 'SET_LOADER',
    payload: data,
  });
};

export const getPermission = (id) => async (dispatch) => {
  await service.getData(id).then((e) => {
    dispatch({
      type: 'GET_PERMISSION',
      payload: e.data.data,
    });
    dispatch({
      type: 'GET_DESIGNATION_OF_PERMISSIONS',
      payload: e.data.datas,
    });
  });
};

export const updatePermission = (id, updateData) => async (dispatch) => {
  let { data } = await service.updateData(id, updateData);
  if (data.success) {
    dispatch(setSuccessMessage(data.message));
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const getPermissionsById = (id) => async (dispatch) => {
  await service.getPermissionById(id).then((e) => {
    if (e.data.success === true) {
      dispatch({
        type: 'PERMISSION_BY_ID',
        payload: e.data.data,
      });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

export const editById = (id) => async (dispatch) => {
  await service.getDesignationById(id).then((e) => {
    dispatch({
      type: 'DESIGN',
      payload: e.data,
    });
  });
};

export const Permissionsockets = (data) => async (dispatch) => {
  dispatch({
    type: 'PERMISSION_SOCKET_DATA',
    payload: data,
  });
};

export const setProfile = () => async (dispatch) => {
  let tocken = localStorage.getItem('accessTocken');
  let { data } = await service.setData();
  dispatch({
    type: 'PERMISSION_SOCKET_DATA',
    payload: data.data.permission,
    // payload: data.data.role,
  });
};

export const createEvent = (data) => async (dispatch) => {
  await service.Event(data).then((e) => {
    if (e.data.success === true) {
      dispatch(setSuccessMessage('Registered sucessfully'));
      // dispatch({
      //   type: 'SET_EVENT',
      //   payload: data,
      // });
    } else {
      dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};

export const getAllEvent = () => async (dispatch) => {
  // dispatch(loaderTrue());
  let { data } = await service.getEvents();
  dispatch({
    type: 'GET_EVENT',
    payload: data.data,
  });
  // dispatch(loaderFalse());
};

export const updateEvent = (id, updateData) => async (dispatch) => {
  let { data } = await service.editEventsData(updateData);
  // dispatch(loaderFalse());
  if (data.success) {
    dispatch(setSuccessMessage(data.message));
    // history.push('/event');
  } else {
    dispatch(setErrorMessage(data.message));
  }
};

export const getEventById = (id) => async (dispatch) => {
  let { data } = await service.getEventsData(id);
  console.log('dataEventsById', data);
  dispatch({
    type: 'EDIT_EVENT',
    payload: data.data,
  });
};

export const getAllVenuesFromEvents = () => async (dispatch) => {
  // dispatch(loaderTrue());
  await service.getAllVenues().then((e) => {
    dispatch({
      type: 'ALL_VENUES',
      payload: e.data.data,
    });
  });

  // dispatch(loaderFalse());
};

export const createBooking = (data, id, navigate) => async (dispatch) => {
  console.log('dataBookings', data);
  dispatch({
    type: 'SET_BOOKING_DATA',
    payload: data,
  });
  navigate('/payment_details');
};

export const stripePayment =
  (id, bookingData, navigate) => async (dispatch) => {
    console.log('bookingData@@', bookingData);
    let { data } = await service.Bookings(bookingData, id);
    console.log('data', data);

    if (data.success) {
      window.open(data.data);

      // navigate('/events/all');

      // dispatch(setSuccessMessage('Payment Successfull'));
      // window.open(data.data.next_action.use_stripe_sdk.stripe_js);
    } else {
      dispatch(setErrorMessage(data.msg));
    }
  };

export const getbooking = (filterData) => async (dispatch) => {
  let data;
  console.log('filterData', filterData);

  filterData
    ? (data = await service.getBookingsData(
        `/bookings/Getbooking?filterData=${JSON.stringify(filterData)}`
      ))
    : ((data = await service.getBookingsData(`/bookings/Getbooking`)),
      console.log('dataAction', data));
  console.log('data', data);
  dispatch({
    type: 'BookingData',
    payload: data.data.data,
  });
};

export const getToken = () => async (dispatch) => {
  let { data } = await service.BookingsBraintree();
  if (data.success) {
    dispatch({
      type: 'GET_TOKEN',
      payload: data.data,
    });
  } else {
    alert(data.message);
  }
};

export const makePayment = (paymentData) => async (dispatch) => {
  // dispatch(loader(true));
  console.log('first', paymentData);
  let { data } = await service.Payments(paymentData);
  console.log('data', data);

  if (data.success) {
    // window.open(data.data);
    dispatch(setSuccessMessage('Payment Successfull'));
    // dispatch(loader(false));
    // history.push('/success');
  } else {
    alert(data.msg);
  }
};

export const SearchData = (datas) => async (dispatch) => {
  let data = await service.getSearchData({ word: datas });
  dispatch({
    type: 'SEARCH',
    payload: data.data,
  });
  dispatch(loader(false));
};
