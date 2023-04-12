import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { createVenue, getVenueById, patchVenue, signup } from '../actions';
import { MDBBtn } from 'mdb-react-ui-kit';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate, useParams } from 'react-router-dom';
import Geocode from 'react-geocode';
import GoogleApiWrapper from '../components/Maps';

const Venue = () => {
  const [latitude, setlatitude] = useState('');
  const [latti, setlat] = useState('');
  const [long, setlong] = useState('');
  const [city, setCityFromMap] = useState('');
  console.log('city', city);

  const [longitude, setlongitude] = useState('');
  const [selectedPlace, setselectedPlace] = useState({});

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const { venueById } = useSelector((e) => e.Reducer);
  useEffect(() => {
    if (id) {
      dispatch(getVenueById(id));
    }
  }, []);
  const positionSelected = (props) => {
    setselectedPlace(props.selectedPlace);
    console.log('props', selectedPlace);
  };
  Geocode.setApiKey('AIzaSyD1n-Lml-bCOkTnNZs3uZNqq5IEyo7VQRY');
  // Geocode.setLanguage('en');
  Geocode.setLocationType('ROOFTOP');
  // const DisplayingErrorMessagesSchema = Yup.object().shape({
  //   venueName: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(50, 'Too Long!')
  //     .required(' Name Required'),
  //   address: Yup.string().required('address Required'),
  //   city: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(50, 'Too Long!')
  //     .required(' Name Required'),
  //   state: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(50, 'Too Long!')
  //     .required(' Name Required'),
  //   country: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(50, 'Too Long!')
  //     .required(' Name Required'),
  //   contact_name: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(50, 'Too Long!')
  //     .required(' contact_name Required'),
  //   contact_email: Yup.string()
  //     .email('Invalid email')
  //     .required('Email Required'),
  //   pin: Yup.string().required('Pincode required'),
  //   contact_phone_number: Yup.string()
  //     .min(10, 'Too Short')
  //     .max(10, 'Too Long!')
  //     .required('Email Required'),
  // });
  const position = async () => {
    await navigator.geolocation.getCurrentPosition(
      (position) => {
        setlatitude(position.coords.latitude);
        setlongitude(position.coords.longitude);
      },
      (err) => console.log(err)
    );
    console.log('position.coords.latitude', latitude);
  };
  useEffect(() => {
    position();
  }, []);

  return (
    <Formik
      initialValues={{
        venueName: id && venueById ? venueById.venueName : '',
        address: id ? venueById.address : '',
        state: id ? venueById.state : selectedPlace.state,
        city: id ? venueById.city : selectedPlace.city,
        country: id ? venueById.country : selectedPlace.country,
        contact_name: id ? venueById.contact_name : '',
        contact_email: id ? venueById.contact_email : '',
        pin: id ? venueById.pin : selectedPlace.pincode,
        contact_phone_number: id ? venueById.contact_phone_number : '',
      }}
      // validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={async (values, { resetForm }) => {
        console.log('values', values);
        const formData = new FormData();

        await Geocode.fromAddress(selectedPlace.city).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            console.log(lat, lng);
            setlat(lat);
            setlong(lng);
          },
          (error) => {
            alert(error);
            console.error(error);
          }
        );
        formData.append('city', selectedPlace.city);
        formData.append('country', selectedPlace.country);
        formData.append('contact_name', values.contact_name);
        formData.append('venueName', values.venueName);
        formData.append('state', selectedPlace.state);
        formData.append('contact_email', values.contact_email);
        formData.append('pin', selectedPlace.pincode);
        formData.append('contact_phone_number', values.contact_phone_number);
        formData.append('latitude', latti);
        formData.append('longitude', long);
        formData.append('photo', fileInputRef.current.files[0]);
        console.log('values', values);
        if (id) {
          dispatch(patchVenue(id, formData));
          resetForm();
        } else {
          dispatch(createVenue(formData));
          // resetForm();
        }
      }}
      // enableReinitialize
    >
      {({ errors, touched }) => (
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-9 col-xl-9 ">
            <div className="card mt-3">
              <div className="card-body p-5">
                <Form>
                  <h2 className="text-uppercase text-center">
                    Venue Registration
                  </h2>
                  <div className="mb-3">
                    <label className="form-label">venueName</label>
                    <Field
                      name="venueName"
                      placeholder="venueName"
                      type="text"
                      className="form-control"
                    />
                    <span style={{ color: 'red' }}>
                      {touched.venueName && errors.venueName && (
                        <div>{errors.venueName}</div>
                      )}
                    </span>
                  </div>
                  {/* <div className="mb-3">
                    <label className="form-label">Address</label>
                    <Field
                      name="address"
                      placeholder="address"
                      type="text"
                      className="form-control"
                    />
                    <span style={{ color: 'red' }}>
                      {touched.address && errors.address && (
                        <div>{errors.address}</div>
                      )}
                    </span>
                  </div> */}
                  <div className="mb-3">
                    <label className="form-label">state</label>
                    <Field
                      name="state"
                      placeholder="state"
                      type="text"
                      className="form-control"
                      value={selectedPlace.state}
                    />
                    <span style={{ color: 'red' }}>
                      {touched.state && errors.state && (
                        <div>{errors.state}</div>
                      )}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">city</label>
                    <Field
                      name="city"
                      placeholder="city"
                      type="text"
                      className="form-control"
                      value={selectedPlace.city}
                    />
                    <span style={{ color: 'red' }}>
                      {touched.city && errors.city && <div>{errors.city}</div>}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">country</label>
                    <Field
                      name="country"
                      placeholder="country"
                      type="text"
                      className="form-control"
                      value={selectedPlace.country}
                    />
                    <span style={{ color: 'red' }}>
                      {touched.country && errors.country && (
                        <div>{errors.country}</div>
                      )}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">contact_name</label>
                    <Field
                      name="contact_name"
                      placeholder="contact_name"
                      type="text"
                      className="form-control"
                    />
                    <span style={{ color: 'red' }}>
                      {touched.contact_name && errors.contact_name && (
                        <div>{errors.contact_name}</div>
                      )}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">contact_email</label>
                    <Field
                      name="contact_email"
                      placeholder="contact_email"
                      type="text"
                      className="form-control"
                    />
                    <span style={{ color: 'red' }}>
                      {touched.contact_email && errors.contact_email && (
                        <div>{errors.contact_email}</div>
                      )}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">pincode</label>
                    <Field
                      name="pin"
                      placeholder="pincode"
                      type="text"
                      className="form-control"
                      value={selectedPlace.pincode}
                    />
                    <span style={{ color: 'red' }}>
                      {touched.pin && errors.pin && <div>{errors.pin}</div>}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">contact_phone_number</label>
                    <Field
                      name="contact_phone_number"
                      placeholder="contact_phone_number"
                      type="text"
                      className="form-control"
                    />
                    <span style={{ color: 'red' }}>
                      {touched.contact_phone_number &&
                        errors.contact_phone_number && (
                          <div>{errors.contact_phone_number}</div>
                        )}
                    </span>
                  </div>
                  <div>
                    <label htmlFor="fileInput">Image:</label>
                    <input
                      id="fileInput"
                      type="file"
                      name="image"
                      ref={fileInputRef}
                    />
                  </div>

                  <MDBBtn
                    className="me-1"
                    color="danger"
                    type="submit"
                    style={{ margin: '2% 0% 5% 0%' }}
                  >
                    Submit
                  </MDBBtn>
                  <div>
                    <GoogleApiWrapper
                      latitude={latitude}
                      longitude={longitude}
                      values={positionSelected}
                    />
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
export default Venue;
