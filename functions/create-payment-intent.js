// domain/.netlify/functions/create-payment-intent

const express = require("express");
const app = express();

require('dotenv').config()
// This is your test secret API key.
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);

app.use(express.static("public"));
app.use(express.json());
   
app.post("/create-payment-intent", async (req, res) => {
    const { shipping_fee, total_amount } = req.body;
  
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: "gbp",
    //   payment_method_types: ['card'],
      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

exports.handler = async function (event, context) {
    if (event.body) {
      const {  shipping_fee, total_amount } = JSON.parse(event.body)
  
  const calculateOrderAmount = () => {
          return shipping_fee + total_amount
      }
  
      try {
         const paymentIntent = await stripe.paymentIntents.create({
             amount:calculateOrderAmount(),
             currency:'GBP'
         }) 
         return{
             statusCode:200,
             body:JSON.stringify({clientSecret:paymentIntent.client_secret})
         }
      } catch (error) {
          return {
              statusCode:500,
              body:JSON.stringify({ msg: error.message }),
          }
      }
    }
    return{
        statusCode:200,
        body: 'Create Payment Intent',
    }
  };
  






        // Start

// require('dotenv').config()

// const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

// exports.handler = async function (event, context) {
//   if (event.body) {
//     const { cart, shipping_fee, total_amount } = JSON.parse(event.body)

// const calculateOrderAmount = () => {
//         return shipping_fee + total_amount
//     }

//     try {
//        const paymentIntent = await stripe.paymentIntents.create({
//            amount:calculateOrderAmount(),
//            currency:'GBP'
//        }) 
//        return{
//            statusCode:200,
//            body:JSON.stringify({clientSecret:paymentIntent.client_secret})
//        }
//     } catch (error) {
//         return {
//             statusCode:500,
//             body:JSON.stringify({ msg: error.message }),
//         }
//     }
//   }
//   return{
//       statusCode:200,
//       body: 'Create Payment Intent',
//   }
// };
