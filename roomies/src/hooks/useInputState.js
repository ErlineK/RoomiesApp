import { useState } from "react";

/** Hook manages input state, state change and reset
 */
export default initialVal => {
  const [value, setValue] = useState(initialVal);
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
  const validate = valueType => {
    let valid = true;
    switch (valueType) {
      case "EMAIL":
        // check for email pattern
        // const mailPtrn = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const mailPtrn = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
        valid = mailPtrn.test(value);
        break;

      case "PASS":
        //check for at least 6 digit, no spaces
        if (value.length < 6) {
          valid = false;
        }
        // check for strong password: at least one capital letter, one small latter
        console.log("pass validation: " + valid);
        break;

      default:
        valid = false;
        break;
    }

    return valid;
  };

  return [value, handleChange, setValue, reset, validate];
};
