import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  createCompany,
  createVenue,
  getCompanyById,
  getVenueById,
  patchCompany,
  patchVenue,
  signup,
} from '../actions';
import { MDBBtn } from 'mdb-react-ui-kit';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate, useParams } from 'react-router-dom';

const Company = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const { id } = useParams();
  const { companyById } = useSelector((e) => e.Reducer);
  useEffect(() => {
    if (id) {
      dispatch(getCompanyById(id));
    }
  }, []);
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(' Name Required'),
    address: Yup.string().required('address Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    contact_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(' contact_name Required'),
    contact_designation: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(' contact_name Required'),
    contact_phone_number: Yup.string()
      .min(10, 'Too Short')
      .max(10, 'Too Long!')
      .required('Email Required'),
  });

  return (
    <Formik
      initialValues={{
        name: id && companyById ? companyById.name : '',
        address: id ? companyById.address : '',
        email: id ? companyById.email : '',
        contact_name: id ? companyById.contact_name : '',
        contact_designation: id ? companyById.contact_designation : '',
        contact_phone_number: id ? companyById.contact_phone_number : '',
      }}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('address', values.address);
        formData.append('email', values.email);
        formData.append('contact_name', values.contact_name);
        formData.append('contact_designation', values.contact_designation);
        formData.append('contact_phone_number', values.contact_phone_number);
        formData.append('image', fileInputRef.current.files[0]);
        if (id) {
          dispatch(patchCompany(id, formData));
          resetForm();
        } else {
          dispatch(createCompany(formData));
          // resetForm();
        }
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
                    Company Registration
                  </h2>
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
                    <label className="form-label">contact_designation</label>
                    <Field
                      name="contact_designation"
                      placeholder="contact_designation"
                      type="text"
                      className="form-control"
                    />
                    <span style={{ color: 'red' }}>
                      {touched.contact_designation &&
                        errors.contact_designation && (
                          <div>{errors.contact_designation}</div>
                        )}
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
export default Company;
