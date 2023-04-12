import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  createBooking,
  createCompany,
  createVenue,
  getCompanyById,
  getEventById,
  getToken,
  getVenueById,
  patchCompany,
  patchVenue,
  signup,
} from '../actions';
import DropIn from 'braintree-web-drop-in-react';
import { MDBBtn } from 'mdb-react-ui-kit';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Booking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookingDate, setBookingDate] = useState(new Date());

  const { companyById, eventsById, TOKEN } = useSelector((e) => e.Reducer);
  useEffect(() => {
    if (id) {
      dispatch(getEventById(id));
    }
  }, [id]);
  // useEffect(() => {
  //   dispatch(getToken());
  // }, []);
  // console.log('TOKEN', TOKEN);
  const [Price, setPrice] = useState('');
  console.log('Price', Price);
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(' Name Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    phone_number: Yup.string()
      .min(10, 'Too Short')
      .max(10, 'Too Long!')
      .required('Email Required'),
    paymentMethod: Yup.string().required('Required'),
  });

  // const buy = async () => {
  //   try {
  //     const { nonce } = await Instance.requestPaymentMethod();
  //     dispatch(makePayment({ nonce, customer: bookingData }));
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <Formik
      initialValues={{
        name: id && companyById ? companyById.name : '',
        email: id ? companyById.email : '',
        phone_number: id ? companyById.phone_number : '',
        paymentMethod: '',
      }}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={async (values, { resetForm }) => {
        values.bookingDate = bookingDate;
        values.eventId = id;
        values.name = values.name;
        values.phone_number = values.phone_number;
        values.email = values.email;
        values.amount =
          values.planId === eventsById.yearlyPlan
            ? eventsById.yearlyPrice
            : eventsById.monthlyPrice;

        console.log('valuesBooking', values);
        // if (id) {
        //   dispatch(patchCompany(id, formData));
        //   resetForm();
        // } else {
        dispatch(createBooking(values, id, navigate));
        // resetForm();
        // }
      }}
      enableReinitialize
    >
      {({ errors, touched }) => (
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-9 col-lg-9 col-xl-9 ">
            <div className="card mt-3">
              <div className="card-body p-5">
                <Form>
                  <h2 className="text-uppercase text-center">Booking</h2>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <Field
                      name="name"
                      placeholder="name"
                      type="text"
                      className="form-control"
                    />
                    <span style={{ color: 'red' }}>
                      {touched.name && errors.name && <div>{errors.name}</div>}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">email</label>
                    <Field
                      name="email"
                      placeholder="email"
                      type="text"
                      className="form-control"
                    />
                    <span style={{ color: 'red' }}>
                      {touched.email && errors.email && (
                        <div>{errors.email}</div>
                      )}
                    </span>
                  </div>

                  <div>
                    <label>Booking Date</label>
                    <DatePicker
                      selected={bookingDate}
                      onChange={(date) => setBookingDate(date)}
                      className="form-control"
                      minDate={new Date(eventsById?.startDate)}
                      maxDate={new Date(eventsById?.endDate)}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">phone_number</label>
                    <Field
                      name="phone_number"
                      placeholder="phone_number"
                      type="text"
                      className="form-control"
                    />
                    <span style={{ color: 'red' }}>
                      {touched.phone_number && errors.phone_number && (
                        <div>{errors.phone_number}</div>
                      )}
                    </span>
                  </div>
                  <div className="form-outline mb-4">
                    <label>
                      <Field
                        type="radio"
                        name="planId"
                        value={eventsById?.monthlyPlan}
                      />
                      Monthly
                    </label>
                    <label>
                      <Field
                        type="radio"
                        name="planId"
                        value={eventsById?.yearlyPlan}
                      />
                      Yearly
                    </label>
                  </div>
                  <div className="form-outline mb-4">
                    <label>Payment Method</label>
                    <Field
                      as="select"
                      name="paymentMethod"
                      className="form-select"
                    >
                      <option>Select Payment Method</option>
                      <option value="card">card</option>
                      <option value="Gpay">Gpay</option>
                      <option value="Credit Card">Credit Card</option>
                    </Field>
                    <span style={{ color: 'red' }}>
                      {touched.paymentMethod && errors.paymentMethod && (
                        <div>{errors.paymentMethod}</div>
                      )}
                    </span>
                  </div>
                  <MDBBtn
                    className="me-1"
                    color="danger"
                    type="submit"
                    style={{ margin: '2% 0% 0% 0%' }}
                  >
                    Submit
                  </MDBBtn>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};
export default Booking;
