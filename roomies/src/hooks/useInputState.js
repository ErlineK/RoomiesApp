import { useState } from "react";

// TODO: rewrite validation function and return an error field

/** Hook manages input state, state change and reset
 */
export default (initialVal, valueType) => {
  const [value, setValue] = useState(initialVal);
  const [errorMsg, setError] = useState("");
  // value change callback
  const handleChange = e => {
    console.log("e: " + e);
    setValue(e.target.value);
  };

  // value reset callback
  const reset = () => {
    setValue("");
  };

  /** form input validation callback
      input:String: EMAIL, PASS 
      output:Boolean
   */
  const validate = () => {
    setError(null);
    let valid = true;
    switch (valueType) {
      case "EMAIL":
        // check for email pattern
        const mailPtrn = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        // const mailPtrn = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        valid = mailPtrn.test(value);
        if (!valid) {
          setError("Invalid email");
        }
        console.log("email valid: " + valid);
        console.log("setting email error: " + errorMsg);
        break;

      case "PASS":
        //check for at least 6 digit, no spaces
        if (value.trim().length < 6) {
          valid = false;
          setError("Password must be at least 6 characters long");
        }
        // check for strong password: at least one capital letter, one small latter
        console.log("pass validation: " + valid);
        break;

      case "NAME":
        //min 2 chars, max 20
        if (value.trim().length < 2 || value.length > 20) {
          valid = false;
          setError("Invalid name");
        }
        break;

      default:
        valid = false;
        setError("Invalid input");
        break;
    }

    return valid;
  };

  return [value, handleChange, setValue, reset, validate, errorMsg];
};
