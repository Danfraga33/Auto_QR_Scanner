import { Form } from "@remix-run/react";
import React from "react";

const NewBusinessProfileForm = () => {
  return (
    <Form>
      <label htmlFor="businessName">Business Name</label>
      <input type="text" />
    </Form>
  );
};

export default NewBusinessProfileForm;
