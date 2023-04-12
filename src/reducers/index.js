import { combineReducers } from 'redux';
const initialState = {
  users: [],
  venues: [],
  successMessage: null,
  errorMessage: null,
  designations: [],
  loader: null,
  allVenues: [],
  venueById: [],
  company: [],
  companyById: [],
  allCompany: [],
  permissions: [],
  Designation: [],
  designa: undefined,
  permissionDesignation: [],
  designationSelected: [],
  PermissionsSocket: [],
  Allvenues: [],
  Allevents: [],
  eventsById: [],
  bookingData: [],
  listBooking: [],
  TOKEN: [],
  SEARCH: [],
};
export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload,
      };
    case 'SET_VENUE':
      return {
        ...state,
        venues: action.payload,
      };
    case 'ALL_VENUES':
      return {
        ...state,
        Allvenues: action.payload,
      };
    case 'GET_EVENT':
      return {
        ...state,
        Allevents: action.payload,
      };
    case 'SET_BOOKING_DATA':
      return {
        ...state,
        bookingData: action.payload,
      };
    case 'EDIT_EVENT':
      return {
        ...state,
        eventsById: action.payload,
      };
    case 'SET_COMPANY':
      return {
        ...state,
        company: action.payload,
      };
    case 'GET_TOKEN':
      return {
        ...state,
        TOKEN: action.payload,
      };
    case 'BookingData':
      return {
        ...state,
        listBooking: action.payload,
      };
    case 'PERMISSION_DATA':
      return {
        ...state,
        permissionDesignation: action.payload,
      };
    case 'SET_VENUE_DATA':
      return {
        ...state,
        allVenues: action.payload,
      };
    case 'GET_DESIGNATION_OF_PERMISSIONS':
      return {
        ...state,
        designationSelected: action.payload,
      };
    case 'SET_COMPANY_DATA':
      return {
        ...state,
        allCompany: action.payload,
      };
    case 'VENUE_BY_ID':
      return {
        ...state,
        venueById: action.payload,
      };
    case 'COMPANY_BY_ID':
      return {
        ...state,
        companyById: action.payload,
      };
    case 'DESIGN':
      return {
        ...state,
        designa: action.payload,
      };
    case 'SEARCH':
      return {
        ...state,
        SEARCH: action.payload,
      };
    case 'ADMIN_DATA': {
      return {
        ...state,
        designations: action.payload,
      };
    }
    case 'PERMISSION_SOCKET_DATA': {
      return {
        ...state,
        PermissionsSocket: action.payload,
      };
    }
    case 'GET_PERMISSION': {
      return {
        ...state,
        permissions: action.payload,
      };
    }
    case 'GET_DESIGNATION': {
      return {
        ...state,
        Designation: action.payload,
      };
    }
    case 'SET_LOADER': {
      return {
        ...state,
        loader: action.payload,
      };
    }
    case 'SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: action.payload,
      };
    case 'ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      };
    case 'RESET_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: null,
      };
    case 'RESET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
};
export default combineReducers({
  Reducer,
});
