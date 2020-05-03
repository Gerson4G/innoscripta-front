import React, { Component } from 'react'
import { InputLabel, Input, FormHelperText, Button } from '@material-ui/core';
import NextWeekOutlinedIcon from '@material-ui/icons/NextWeekOutlined';

export default class Checkout extends Component {
  render() {
    return (
      <>
        Checkout Order
        <form>
            <div>
                <InputLabel required shrink htmlFor="name-input">Full Name</InputLabel>
                <Input id="name-input" aria-describedby="name-helper" />
            </div>
            <div>
                <InputLabel required shrink htmlFor="email-input">Email address</InputLabel>
                <Input id="email-input" aria-describedby="email-helper" />
                <FormHelperText id="email-helper">We'll never share your email.</FormHelperText>
                <InputLabel required shrink htmlFor="phone-input">Phone Number</InputLabel>
                <Input id="phone-input" aria-describedby="phone-helper" />
                <FormHelperText id="phone-helper">An alternative way to contact you.</FormHelperText>
            </div>
            <div>
                <InputLabel required shrink htmlFor="deliver-input">Deliver Address</InputLabel>
                <Input id="deliver-input" aria-describedby="deliver-helper" />
                <FormHelperText id="deliver-helper">Confirm this is the address to deliver</FormHelperText>
            </div>
            <Button
                variant="contained"
                color="default"
                endIcon={<NextWeekOutlinedIcon/>}
                type="submit"
              >
                Buy
              </Button>
        </form>
      </>
    )
  }
}
