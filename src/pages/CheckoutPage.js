import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";

// extra imports
// import { StripeCheckout } from "../components";
import StripeCheckoutUk from "../components/StripeCheckoutUk";
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useCartContext();
  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {cart.lenght < 1 ? (
          <div className="empty">
            <h2>your cart is empty</h2>
            <Link to="/products" className="btn">
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckoutUk />
        )}
     
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
display:flex;
align-items: center;
justify-content: center;
.empty {
  text-align: center;
}
`
export default CheckoutPage;
