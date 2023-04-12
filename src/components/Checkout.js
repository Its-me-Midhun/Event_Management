// // import React from 'react';
// // import {
// //   CardElement,
// //   useStripe,
// //   useElements,
// //   CardNumberElement,
// //   CardCvcElement,
// //   CardExpiryElement,
// // } from '@stripe/react-stripe-js';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { stripePayment } from '../actions';
// // import styled from 'styled-components';
// // import { useNavigate } from 'react-router-dom';
// // import service from '../api/service';

// // const Checkout = () => {
// //   const navigate = useNavigate();
// //   window.onbeforeunload = (event) => {
// //     const e = event || window.event;
// //     // Cancel the event
// //     e.preventDefault();
// //     if (e) {
// //       e.returnValue = ''; // Legacy method for cross browser support
// //     }
// //     return ''; // Legacy method for cross browser support
// //   };

// //   const stripe = useStripe();
// //   const elements = useElements();
// //   const dispatch = useDispatch();
// //   const { bookingData } = useSelector((state) => state.Reducer);
// //   console.log('bookingData', bookingData);

// //   const handleSubmit = async (event) => {
// //     event.preventDefault();

// //     const cardNumberElement = elements?.getElement(CardNumberElement);

// //     const { error, paymentMethod } = await stripe.createPaymentMethod({
// //       type: 'card',
// //       card: cardNumberElement,
// //     });

// //     if (!error) {
// //       console.log('Stripe 23 | token generated!', paymentMethod);
// //       try {
// //         const { id } = paymentMethod;
// //         console.log('idPayment', id);
// //         // dispatch(stripePayment(id, bookingData, navigate));
// //         let { data } = await service.Bookings(bookingData, id);
// //         console.log('data', data);
// //         window.open(data.data.clientSecret);
// //         // const confirmPayment = await stripe?.confirmCardPayment(
// //         //   data.data.clientSecret
// //         // );

// //         // if (confirmPayment?.error) {
// //         //   alert(confirmPayment.error.message);
// //         // } else {
// //         //   alert(' Payment Success');
// //         navigate('/events/all');
// //         // }
// //       } catch (error) {
// //         console.log('CheckoutForm.js 28 | ', error);
// //       }
// //     } else {
// //       console.log('error', error.message);
// //     }
// //   };

// //   return (
// //     <>
// //       <div className="text-white bg-danger  p-2">
// //         Please do not close this window or click the Back button on your browser
// //       </div>
// //       <form
// //         onSubmit={handleSubmit}
// //         style={{ maxWidth: 400 }}
// //         className="payment_form"
// //       >
// //         <label className="ms-4">Card Number</label>
// //         <CardInputWrapper>
// //           <CardNumberElement
// //             options={{
// //               style: {
// //                 base: inputStyle,
// //               },
// //             }}
// //           />
// //         </CardInputWrapper>

// //         <label className="ms-4">Expire Date</label>
// //         <CardInputWrapper>
// //           <CardExpiryElement
// //             options={{
// //               style: {
// //                 base: inputStyle,
// //               },
// //             }}
// //           />
// //         </CardInputWrapper>

// //         <label className="ms-4">CVC</label>
// //         <CardInputWrapper>
// //           <CardCvcElement
// //             options={{
// //               style: {
// //                 base: inputStyle,
// //               },
// //             }}
// //           />
// //         </CardInputWrapper>

// //         {/* <CardElement /> */}
// //         <button className="btn btn-success">Pay</button>
// //       </form>
// //     </>
// //   );
// // };

// // const inputStyle = {
// //   iconColor: '#c4f0ff',
// //   // color: '#ff0',
// //   fontWeight: '500',
// //   fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
// //   fontSize: '16px',
// //   fontSmoothing: 'antialiased',
// //   ':-webkit-autofill': {
// //     color: '#fce883',
// //   },
// //   '::placeholder': {
// //     color: '#87BBFD',
// //   },
// // };

// // const CardInputWrapper = styled.div`
// //   border: 2px solid #654;
// //   border-radius: 8px;
// //   padding: 20px 4px;
// //   margin-bottom: 1.5rem;
// // `;

// // export default Checkout;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getToken, makePayment } from '../actions';
// import DropIn from 'braintree-web-drop-in-react';
// import { ColorRing, RotatingLines } from 'react-loader-spinner';

// const Checkout = () => {
//   let Instance;
//   const dispatch = useDispatch();
//   console.log('Instance', Instance);
//   const { TOKEN, bookingData, loader } = useSelector((state) => state.Reducer);
//   useEffect(() => {
//     dispatch(getToken());
//   }, []);

//   const buy = async () => {
//     try {
//       const { nonce } = await Instance.requestPaymentMethod();
//       dispatch(makePayment({ nonce, customer: bookingData }));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="m-auto w-50">
//       <h1 className="text-center mt-3 main_heading">Booking</h1>
//       {loader ? (
//         <ColorRing
//           visible={true}
//           height="110"
//           width="110"
//           ariaLabel="blocks-loading"
//           wrapperStyle={{}}
//           wrapperClass="blocks-wrapper"
//           colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
//         />
//       ) : (
//         <div>
//           {!TOKEN ? (
//             <div>
//               <RotatingLines
//                 strokeColor="grey"
//                 strokeWidth="5"
//                 animationDuration="0.75"
//                 width="96"
//                 visible={true}
//               />
//             </div>
//           ) : (
//             <div>
//               <DropIn
//                 options={{
//                   authorization: TOKEN,
//                 }}
//                 onInstance={(instance) => (Instance = instance)}
//               />
//               <button onClick={buy} className="btn btn-outline-danger">
//                 Payment
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Checkout;

import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { makePayment } from '../actions';

const Checkout = () => {
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    amount: '',
  });
  console.log('cardData', cardData);

  const { bookingData } = useSelector((state) => state.Reducer);
  console.log('bookingData', bookingData);

  const handleInputFocus = (e) => {
    setCardData({ ...cardData, focus: e.target.name });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value, amount: bookingData.amount });
    // setCardData({ ...cardData, });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(makePayment(cardData));
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

export default Checkout;
