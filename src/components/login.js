import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { login, setLoader, signup } from '../actions';
import { MDBBtn } from 'mdb-react-ui-kit';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';
import Loaders from './Loader';
// import { SunspotLoader } from 'react-awesome-loaders';

const Login = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { loader } = useSelector((state) => state.Reducer);
  const navigate = useNavigate();
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email Required'),
    password: Yup.string().max(50, 'Too Long!').required('password Required'),
  });
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={async (values, { resetForm }) => {
        dispatch(setLoader(true));
        setTimeout(() => {
          dispatch(login(values, navigate));
        }, 2000);
        resetForm();
      }}
    >
      {({ errors, touched }) =>
        loader ? (
          <Loaders />
        ) : (
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-9 col-xl-9 ">
              <div className="card mt-3">
                <div className="card-body p-5">
                  <Form>
                    <h2 className="text-uppercase text-center">Login</h2>
                    <div className="mb-3">
                      <label className="form-label">Email address</label>
                    </div>
                    <div className="mb-3">
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
                    <div className="mb-3">
                      <label className="form-label">password</label>
                    </div>
                    <div className="mb-3">
                      <Field
                        name="password"
                        placeholder="password"
                        type="password"
                        className="form-control"
                      />
                      <span style={{ color: 'red' }}>
                        {touched.password && errors.password && (
                          <div>{errors.password}</div>
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
        )
      }
    </Formik>
  );
};
export default Login;
