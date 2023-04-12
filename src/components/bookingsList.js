import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getbooking, blindsearch } from '../';
import DataTable from 'react-data-table-component';
import { DateRangePicker } from 'rsuite';
import { getbooking } from '../actions';
import '../components/table.css';
import AvatarIcon from '@rsuite/icons/legacy/Avatar';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const styles = {
  width: 300,
  marginBottom: 10,
};

const BookingList = () => {
  const dispatch = useDispatch();
  const [array, setarray] = useState([]);
  const [filter, setfilter] = useState([]);
  useEffect(() => {
    dispatch(getbooking());
  }, []);
  const { listBooking, Allevents } = useSelector((state) => state.Reducer);

  const columns = [
    {
      name: 'Title',
      selector: (row) => row?.event?.title,
    },
    {
      name: 'createdAt',
      selector: (row) => row?.createdAt,
    },
    {
      name: 'bookingDate',
      selector: (row) => row?.bookingDate,
    },
    {
      name: 'name',
      selector: (row) => row?.contactDetails?.name,
    },
    {
      name: 'email',
      selector: (row) => row?.contactDetails?.email,
    },
    {
      name: 'phone_number',
      selector: (row) => row?.contactDetails?.phone_number,
    },
    {
      name: 'Amount',
      selector: (row) => row?.amount,
    },
  ];
  useEffect(() => {
    dispatch(getbooking(filter));
  }, [filter]);
  const blindSearch = (e) => {
    if (e.target !== null) {
      if (e.target) {
        setfilter({ ...filter, search: e.target.value });
      }
    }
    if (e.target?.name !== undefined) {
      if (e.target.name === 'max') {
        setfilter({ ...filter, max: e.target.value });
      }
      if (e.target.name === 'min') {
        setfilter({ ...filter, min: e.target.value });
      }
      if (e.target.name === 'event') {
        array.push(e.target.value);
        // setarray([...array, e.target.value]);
        setfilter({ ...filter, event: array });
      }
    } else {
      setfilter({ ...filter, date: e });
    }
  };
  console.log(listBooking);
  return (
    <div>
      <div className="field">
        <p>Date Time Range</p>
        <DateRangePicker format="yyyy-MM-dd hh:mm aa" onChange={blindSearch} />
      </div>
      <div className="input-group w-50 m-3  ">
        <input
          name="min"
          type="number"
          className="form-control"
          placeholder="Minimum price"
          onChange={blindSearch}
        />
        <input
          name="max"
          type="number"
          className="form-control"
          placeholder="Maximum price"
          onChange={blindSearch}
        />
      </div>
      <select onChange={blindSearch} class="select" multiple name="event">
        <option>Events</option>
        {Allevents.map((item, index) => (
          <option value={item.id} key={index}>
            {item.title}
          </option>
        ))}
      </select>
      {/* <CMultiSelect options={allEvent} selectionType="tags" /> */}
      <input name="search" onChange={blindSearch}></input>
      <DataTable columns={columns} data={listBooking} />;
    </div>
  );
};

export default BookingList;
