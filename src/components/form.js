import '../components/testForm.css';
import React from 'react';
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { stripePayment } from '../actions';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const FORM = () => {
  const navigate = useNavigate();
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ''; // Legacy method for cross browser support
    }
    return ''; // Legacy method for cross browser support
  };

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { bookingData } = useSelector((state) => state.Reducer);
  console.log('bookingData', bookingData);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cardNumberElement = elements?.getElement(CardNumberElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
    });

    if (!error) {
      console.log('Stripe 23 | token generated!', paymentMethod);
      try {
        const { id } = paymentMethod;
        console.log('idPayment', id);
        dispatch(stripePayment(id, bookingData, navigate));
      } catch (error) {
        console.log('CheckoutForm.js 28 | ', error);
      }
    } else {
      console.log('error', error.message);
    }
  };

  function Item(props) {
    return (
      <div className="item-container">
        <div className="item-image">
          <img src={props.img} />
          <div className="item-details">
            <h3 className="item-name">{props.name}</h3>
            <h2 className="item-price">{props.price}</h2>
          </div>
        </div>
      </div>
    );
  }

  function Checkout() {
    return (
      <div className="checkout">
        <div className="checkout-container">
          <h3 className="heading-3">Credit card checkout</h3>
          <Input label="Cardholder's Name" type="text" name="name" />
          <Input
            label="Card Number"
            type="number"
            name="card_number"
            imgSrc="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png"
          />
          <div className="row">
            <div className="col">
              <Input label="Expiration Date" type="month" name="exp_date" />
            </div>
            <div className="col">
              <Input label="CVV" type="number" name="cvv" />
            </div>
          </div>
          <Button text="Place order" />
        </div>
      </div>
    );
  }

  function Input(props) {
    return (
      <div className="input">
        <label>{props.label}</label>
        <div className="input-field">
          <input type={props.type} name={props.name} />
          {props.imgSrc && <img src={props.imgSrc} />}
        </div>
      </div>
    );
  }

  function Button(props) {
    return (
      <button className="checkout-btn" type="button">
        {props.text}
      </button>
    );
  }
  return (
    <div className="app-container">
      <div className="row">
        <div className="col">
          <Item
            name="Instax Mini 90 Neo Classic"
            price="$144.99"
            img="http://ecx.images-amazon.com/images/I/61%2BABMMN5zL._SL1500_.jpg"
          />
        </div>
        <div className="col no-gutters">
          <Checkout />
        </div>
      </div>
    </div>
  );
};
export default FORM;
