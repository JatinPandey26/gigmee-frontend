import React, { useEffect, useState } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from 'react-router-dom'
import newRequest from '../../utils/newRequest';
import CheckoutForm from '../../Components/CheckoutForm/CheckoutForm';

const stripePromise = loadStripe("pk_test_51MoVRRSAH1lgRIVIMX7jw3ix2pCnQbMt6Vz88WFMrTPBlG8ldHUny3YFjhxSTzluQzWS2h4IBFzpxz07rE4HqyTx007BIDINFf")

const Pay = () => {
    const [clientSecret, setClientSecret] = useState("");
    const { id } = useParams()
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await newRequest.post('/orders/create-payment-intent/' + id);

                setClientSecret(res.data.clientSecret)
            } catch (error) {
                console.log(error);
            }

          
        }
        makeRequest()
    }, [])

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


    return (
        <div className='pay'>

            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}

export default Pay