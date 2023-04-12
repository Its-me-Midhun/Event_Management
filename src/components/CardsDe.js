import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { makePayment } from '../actions';

const PaymentForm = () => {
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    amount: '',
  });
  const { bookingData } = useSelector((state) => state.Reducer);
  console.log('bookingData', bookingData);

  const handleInputFocus = (e) => {
    setCardData({ ...cardData, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCardData({ ...cardData, [name]: value });
  };
  console.log('cardData', cardData);

  const onSubmit = () => {
    dispatch(makePayment());
  };
  return (
    <div id="PaymentForm">
      <Cards
        cvc={cardData.cvc}
        expiry={cardData.expiry}
        focused={cardData.focus}
        name={cardData.name}
        number={cardData.number}
      />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="name"
          placeholder="Card Holder Name"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="expiry"
          placeholder="Card expiry"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <input
          type="text"
          name="cvc"
          placeholder="Card cvc"
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <Button variant="danger" type="submit">
          Pay
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
