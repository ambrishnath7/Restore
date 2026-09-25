import { useState } from "react"
import Paper from "@mui/material/Paper"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"

import Review from "./Review"

import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js"

import type { ConfirmationToken } from "@stripe/stripe-js"

import {
  useFetchAddressQuery,
  useUpdateUserAddressMutation
} from "../accounts/accountApi"

import type { Address } from "../../app/models/user"

import { useBaskets } from "../../lib/hooks/useBaskets"
import { currencyFormat } from "../../lib/utilities"

import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const steps = ['Address', 'Payment', 'Review']

export default function CheckoutStepper() {
  const [activeStep, setActiveStep] = useState(0)

  const [updateAddress] = useUpdateUserAddressMutation()

  const [saveAddressChecked, setSaveAddressChecked] = useState(false)

  const [addressComplete, setAddressComplete] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  const [confirmationToken, setConfirmationToken] =
    useState<ConfirmationToken | null>(null)

  const [submitting, setSubmitting] = useState(false)

  const elements = useElements()
  const stripe = useStripe()
  const navigate = useNavigate()

  const { basket, total, clearBasket } = useBaskets()

  const {
    data: { name, ...restAddress } = {} as Address,
    isLoading
  } = useFetchAddressQuery()

  const getStripeAddress = async () => {
    if (!elements) return null

    const addressElement = elements.getElement(AddressElement)

    if (!addressElement) return null

    const {
      value: { name, address }
    } = await addressElement.getValue()

    if (name && address) {
      return {
        ...address,
        name
      }
    }

    return null
  }

  const handleAddressChange = (event: { complete: boolean }) => {
    setAddressComplete(event.complete)
  }

  const handlePaymentChange = (event: { complete: boolean }) => {
    setPaymentComplete(event.complete)
  }

  const confirmPayment = async () => {
    setSubmitting(true)

    try {
      if (!confirmationToken || !basket || !stripe) {
        throw new Error('Unable to process payment')
      }

      if (!basket.clientSecret) {
        throw new Error('Unable to process payment')
      }

      const paymentResult = await stripe.confirmPayment({
        clientSecret: basket.clientSecret,
        redirect: 'if_required',
        confirmParams: {
          confirmation_token: confirmationToken.id
        }
      })

      if (paymentResult.paymentIntent) {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          navigate('/checkout/success')
          clearBasket()
        } else {
          throw new Error('Payment was not successful')
        }
      } else if (paymentResult.error) {
        throw new Error(paymentResult.error.message)
      } else {
        throw new Error('Something went wrong')
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }

      setActiveStep(step => step - 1)
    } finally {
      setSubmitting(false)
    }
  }

  const handleNext = async () => {
    if (activeStep === 0 && saveAddressChecked && elements) {
      const address = await getStripeAddress()

      if (address) {
        await updateAddress(address)
      }
    }

    if (activeStep === 1) {
      if (!elements || !stripe) return

      const result = await elements.submit()

      if (result.error) {
        toast.error(result.error.message)
        return
      }

      const stripeResult = await stripe.createConfirmationToken({
        elements
      })

      if (stripeResult.error) {
        toast.error(stripeResult.error.message)
        return
      }

      setConfirmationToken(stripeResult.confirmationToken)
    }

    if (activeStep === 2) {
      await confirmPayment()
      return
    }

    if (activeStep < 2) {
      setActiveStep(step => step + 1)
    }
  }

  const handleBack = () => {
    setActiveStep(step => step - 1)
  }

  if (isLoading) {
    return <Typography variant="h6">Loading checkout...</Typography>
  }

  return (
    <>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: activeStep === 0 ? 'block' : 'none' }}>
            <AddressElement
              options={{
                mode: 'shipping',
                defaultValues: {
                  name,
                  address: restAddress
                }
              }}
              onChange={handleAddressChange}
            />

            <FormControlLabel
              sx={{
                display: 'flex',
                justifyContent: 'flex-end'
              }}
              control={
                <Checkbox
                  checked={saveAddressChecked}
                  onChange={e =>
                    setSaveAddressChecked(e.target.checked)
                  }
                />
              }
              label="Save as default address"
            />
          </Box>

          <Box sx={{ display: activeStep === 1 ? 'block' : 'none' }}>
            <PaymentElement
              onChange={handlePaymentChange}
              options={{
                wallets: {
                  applePay: 'never',
                  googlePay: 'never'
                }
              }}
            />
          </Box>

          <Box sx={{ display: activeStep === 2 ? 'block' : 'none' }}>
            <Review confirmationToken={confirmationToken} />
          </Box>
        </Box>
      </Paper>

      <Box
        sx={{
          display: 'flex',
          pt: 2,
          justifyContent: 'space-between'
        }}
      >
        <Button
          onClick={handleBack}
          disabled={activeStep === 0 || submitting}
        >
          Back
        </Button>

        <LoadingButton
          onClick={handleNext}
          loading={submitting}
          disabled={
            (activeStep === 0 && !addressComplete) ||
            (activeStep === 1 && !paymentComplete)
          }
          variant="contained"
        >
          {activeStep === steps.length - 1
            ? `Pay ${currencyFormat(total)}`
            : 'Next'}
        </LoadingButton>
      </Box>
    </>
  )
}