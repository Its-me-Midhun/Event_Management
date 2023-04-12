import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  createEvent,
  createVenue,
  getAllVenuesFromEvents,
  getVenueById,
  patchVenue,
  signup,
} from '../actions';
import { MDBBtn } from 'mdb-react-ui-kit';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

const Events = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const { venueById, Allvenues } = useSelector((e) => e.Reducer);
  useEffect(() => {
    if (id) {
      dispatch(getVenueById(id));
    }
  }, []);

  useEffect(() => {
    dispatch(getAllVenuesFromEvents());
  }, []);
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(' Name Required'),
    // price: Yup.number().required('Required'),
    venueId: Yup.string().required(),
    monthlyPrice: Yup.number().required('Required'),
    yearlyPrice: Yup.number().required('Required'),
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('05:00');

  function onChangeStart(value) {
    setStartTime(value && value.format('HH:mm'));
  }
  function onChangeEnd(value) {
    setEndTime(value && value.format('HH:mm'));
  }
  return (
    <Formik
      initialValues={{
        title: '',
        venueId: '',
        // price: '',
        monthlyPrice: '',
        yearlyPrice: '',
      }}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('title', values.title);
        // formData.append('price', values.price);
        formData.append('startDate', startDate);
        formData.append('endDate', endDate);
        formData.append('startTime', startTime);
        formData.append('endTime', endTime);
        formData.append('venueId', values.venueId);
        formData.append('monthlyPrice', values.monthlyPrice);
        formData.append('yearlyPrice', values.yearlyPrice);
        formData.append('photo', fileInputRef.current.files[0]);
        console.log('values', values);
        // if (id) {
        //   dispatch(patchVenue(id, formData));
        //   resetForm();
        // } else {
        dispatch(createEvent(formData));
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
                  <h2 className="text-uppercase text-center">
                    Event Registration
                  </h2>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <Field
                      name="title"
                      placeholder="title"
                      type="text"
                      className="form-control"
                    />
                    <span style={{ color: 'red' }}>
                      {touched.title && errors.title && (
                        <div>{errors.title}</div>
                      )}
                    </span>
                  </div>
                  <div className="mb-3">
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
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label>Start Date</label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        className="form-control"
                        minDate={new Date()}
                      />
                    </div>
                    <div className="col-6">
                      <label>End Date</label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        className="form-control"
                        minDate={startDate}
                      />
                    </div>
                  </div>
                  {/* time */}
                  <div className="row mb-3">
                    <div className="col-6">
                      <label>Start Time</label>
                      <TimePicker
                        style={{ width: 100 }}
                        showSecond={false}
                        defaultValue={moment()}
                        onChange={onChangeStart}
                        use12Hours
                        className="form-control w-100 border-0"
                      />
                    </div>
                    <div className="col-6">
                      <label>End Time</label>
                      <TimePicker
                        style={{ width: 100 }}
                        showSecond={false}
                        defaultValue={moment()}
                        className="form-control w-100 border-0"
                        onChange={onChangeEnd}
                        use12Hours
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label>Company</label>
                      <Field
                        as="select"
                        name="companyId"
                        className="form-select"
                      >
                        <option>Select Company</option>
                        {Allvenues?.map((item, index) => (
                          <option value={item.id} key={index}>
                            {item.venueName}
                          </option>
                        ))}
                      </Field>
                      <span style={{ color: 'red' }}>
                        {touched.companyId && errors.companyId && (
                          <div>{errors.companyId}</div>
                        )}
                      </span>
                    </div>
                    <div className="col-6">
                      <label>Location</label>
                      <Field as="select" name="venueId" className="form-select">
                        <option>Select Venue</option>
                        {Allvenues?.map((item, index) => (
                          <option value={item.id} key={index}>
                            {item.venueName}
                          </option>
                        ))}
                      </Field>
                      <span style={{ color: 'red' }}>
                        {touched.venueId && errors.venueId && (
                          <div>{errors.venueId}</div>
                        )}
                      </span>
                    </div>
                  </div>
                  {/* <div>
                    <label>Price</label>
                    <Field name="price" type="text" className="form-control " />
                    <span style={{ color: 'red' }}>
                      {touched.price && errors.price && (
                        <div>{errors.price}</div>
                      )}
                    </span>
                  </div> */}
                  <div>
                    <label>monthlyPrice</label>
                    <Field
                      name="monthlyPrice"
                      type="text"
                      className="form-control "
                    />
                    <span style={{ color: 'red' }}>
                      {touched.monthlyPrice && errors.monthlyPrice && (
                        <div>{errors.monthlyPrice}</div>
                      )}
                    </span>
                  </div>{' '}
                  <div>
                    <label>yearlyPrice</label>
                    <Field
                      name="yearlyPrice"
                      type="text"
                      className="form-control "
                    />
                    <span style={{ color: 'red' }}>
                      {touched.yearlyPrice && errors.yearlyPrice && (
                        <div>{errors.yearlyPrice}</div>
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
export default Events;
