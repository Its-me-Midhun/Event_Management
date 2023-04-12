import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Designation, signup } from '../actions';
import { MDBBtn } from 'mdb-react-ui-kit';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FIELD = styled(Field)`
  border: none;
  border-bottom: 1px solid white;
  background-color: transparent;
  color: white;
  outline: none;
  ::placeholder {
    color: grey;
  }
`;
const SignUp = () => {
  const dispatch = useDispatch();
  // if (window.performance.getEntriesByType) {
  //   if (
  //     window.performance.getEntriesByType('navigation')[0].type === 'reload'
  //   ) {
  //     alert('reloaded');
  //   }
  // }
  useEffect(() => {
    dispatch(Designation());
  }, []);
  let designationsMap;
  const navigate = useNavigate();
  const [ChooseDesignation, setChooseDesignation] = useState('');
  const handleSelect = (e) => {
    setChooseDesignation(e);
  };
  const { designations } = useSelector((state) => state.Reducer);
  if (designations?.data?.data?.length !== 0) {
    designationsMap = designations?.data?.data?.map((data, index) => {
      return (
        <Dropdown.Item key={index} eventKey={data.designation}>
          {data.designation}
        </Dropdown.Item>
      );
    });
  } else {
    navigate('/auth/login');
  }

  const fileInputRef = useRef(null);
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required(' Name Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),
    phoneNumber: Yup.string()
      .min(10, 'Too Short')
      .max(10, 'Too Long!')
      .required('Email Required'),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phoneNumber: '',
      }}
      validationSchema={DisplayingErrorMessagesSchema}
      onSubmit={async (values, { resetForm }) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('Designations', ChooseDesignation);
        formData.append('phoneNumber', values.phoneNumber);
        formData.append('photo', fileInputRef.current.files[0]);

        dispatch(signup(formData));
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <div
          className="row d-flex justify-content-center align-items-center h-100"
          style={{
            // backgroundColor: 'rgba(0, 0, 0, 0.2)',
            background: 'url(https://wallpapercave.com/dwp1x/wp2445767.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            // -webkit-background-size: cover;
          }}
        >
          <div className="col-12 col-md-9 col-lg-9 col-xl-6 ">
            <div
              className="card mt-3"
              style={{ background: 'rgba(0, 0, 0, 0.5)' }}
            >
              <div
                className="card-body p-5 opacity-100"
                style={{
                  opacity: '1',
                  borderRadius: '50px',
                }}
              >
                <Form>
                  <h2
                    className="text-uppercase text-center"
                    style={{ color: 'White' }}
                  >
                    Registration
                  </h2>
                  <div className="mb-3">
                    <div className="mb-3">
                      <label className="form-label" style={{ color: 'white' }}>
                        Name
                      </label>
                    </div>
                    <FIELD
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
                    <label className="form-label" style={{ color: 'white' }}>
                      Email address
                    </label>
                  </div>
                  <div className="mb-3">
                    <FIELD
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
                    <label className="form-label" style={{ color: 'white' }}>
                      phoneNumber
                    </label>
                  </div>
                  <div className="mb-3">
                    <FIELD
                      name="phoneNumber"
                      placeholder="phoneNumber"
                      type="text"
                      className="form-control"
                    />
                    <span style={{ color: 'red' }}>
                      {touched.phoneNumber && errors.phoneNumber && (
                        <div>{errors.phoneNumber}</div>
                      )}
                    </span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ color: 'white' }}>
                      Designation
                    </label>
                  </div>
                  <div className="mt-3 mb-3">
                    <DropdownButton
                      id="dropdown-basic-button"
                      title="Dropdown button"
                      name="Designations"
                      onSelect={handleSelect}
                    >
                      <Dropdown.Item eventKey="Select an Option">
                        Select an Option
                      </Dropdown.Item>
                      {designationsMap}
                    </DropdownButton>
                  </div>
                  <div>
                    <label htmlFor="fileInput" style={{ color: 'white' }}>
                      Image:
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      name="photo"
                      ref={fileInputRef}
                      className="form-control"
                      style={{ backgroundColor: 'transparent', color: 'white' }}
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
export default SignUp;
