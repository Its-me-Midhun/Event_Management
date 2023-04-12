import DataTable from 'react-data-table-component';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteVenue, getAllVenue, getVenueById, Listbooks } from '../actions';
import { Link, useNavigate } from 'react-router-dom';
import Service from '../api/service';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

let datasmap;
const ListVenue = () => {
  const istokenExist = localStorage.getItem('token');
  const navigate = useNavigate();
  const { allVenues } = useSelector((e) => e.Reducer);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVenue());
  }, []);
  console.log('allVenues', allVenues);
  const datas = allVenues.map((data, index) => {
    return (
      <Card style={{ width: '18rem' }} key={index}>
        <Card.Img
          variant="top"
          src={`http://localhost:4000/${data.photo}`}
          style={{ height: '50vh' }}
        />
        <Card.Body>
          <Card.Title>{data.name}</Card.Title>
          <div>
            <Link to={`/venue/create/${data._id}`}>
              <Button
                variant="warning"
                style={{ margin: '0% 4% 0% 0%' }}
                onClick={() => dispatch(getVenueById(data._id))}
              >
                Edit
              </Button>
            </Link>
            <Button
              variant="danger"
              onClick={() => dispatch(deleteVenue(data._id))}
              style={{ margin: '0% 4% 0% 0%' }}
            >
              delete
            </Button>
            <Link
              to={`/maps/${JSON.stringify({
                lat: data.latitude,
                lng: data.longitude,
              })}`}
            >
              <Button variant="danger" style={{ margin: '0% 4% 0% 0%' }}>
                Map
              </Button>
            </Link>
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

export default ListVenue;
