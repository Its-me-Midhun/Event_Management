import DataTable from 'react-data-table-component';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBooking,
  deleteVenue,
  getAllEvent,
  getAllVenue,
  getVenueById,
  Listbooks,
} from '../actions';
import { Link, useNavigate } from 'react-router-dom';
import Service from '../api/service';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const moment = require('moment');

let datasmap;
const ListEvents = () => {
  const istokenExist = localStorage.getItem('token');
  const navigate = useNavigate();
  const [PermissionsAllowed, setPermissionsAllowed] = useState([]);

  const { Allevents, PermissionsSocket } = useSelector((e) => e.Reducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvent());
  }, []);
  useEffect(() => {
    setPermissionsAllowed(PermissionsSocket);
  }, [PermissionsSocket]);
  console.log('PermissionsAllowed', PermissionsAllowed);
  let per = PermissionsAllowed?.filter(
    (obj) => Object.keys(obj)[0] === 'Event'
  );
  console.log('per', per);
  let values = per?.map((e) => e.Event);
  console.log('values', values);
  //   console.log('Allevents', Allevents);
  const datas = Allevents?.map((data, index) => {
    console.log('id', data.id);
    return (
      <Card style={{ width: '18rem' }} key={index}>
        <Card.Img
          variant="top"
          src={`http://localhost:4000/${data.photo}`}
          style={{ height: '50vh' }}
        />
        <Card.Body>
          <Card.Title>
            <h1>{data.title}</h1>
          </Card.Title>
          <Card.Title>
            <small>
              Start-date:{moment(data.startDate).format('DD-MM-YYYY')}
            </small>
          </Card.Title>{' '}
          <Card.Title>
            <small>end-date:{moment(data.endDate).format('DD-MM-YYYY')}</small>
          </Card.Title>{' '}
          <Card.Title>Price:{data.price}</Card.Title>
          <div>
            {values?.includes('Edit') ? (
              <>
                <Link to={`/events/${data.id}`}>
                  <Button
                    variant="warning"
                    style={{ margin: '0% 4% 0% 0%' }}
                    onClick={() => dispatch(getVenueById(data.id))}
                  >
                    Edit
                  </Button>
                </Link>
                <Link to={`/bookings/${data.id}`}>
                  <Button variant="warning" style={{ margin: '0% 4% 0% 0%' }}>
                    Book
                  </Button>
                </Link>
              </>
            ) : (
              <Link to={`/bookings/${data.id}`}>
                <Button variant="warning" style={{ margin: '0% 4% 0% 0%' }}>
                  Book
                </Button>
              </Link>
            )}
            {values?.includes('Delete') ? (
              <Button
                variant="danger"
                onClick={() => dispatch(deleteVenue(data.id))}
                style={{ margin: '0% 4% 0% 0%' }}
              >
                delete
              </Button>
            ) : null}
          </div>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div className="container">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          margin: '2% 0% 0% 0%',
        }}
      >
        {datas}
      </div>
    </div>
  );
};

export default ListEvents;
