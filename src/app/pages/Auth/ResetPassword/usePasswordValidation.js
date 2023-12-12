// usePasswordValidation.js
import { useState } from "react";

const usePasswordValidation = () => {
  const [lowerValidated, setLowerValidated] = useState(false);
  const [upperValidated, setUpperValidated] = useState(false);
  const [numberValidated, setNumberValidated] = useState(false);
  const [specialValidated, setSpecialValidated] = useState(false);
  const [lengthValidated, setLengthValidated] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangeValidation = (value) => {
    const lower = new RegExp("(?=.*[a-z])");
    const upper = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const special = new RegExp("(?=.*[!@#$%^&*])");
    const length = new RegExp("(?=.{8,})");

    setLowerValidated(lower.test(value));
    setUpperValidated(upper.test(value));
    setNumberValidated(number.test(value));
    setSpecialValidated(special.test(value));
    setLengthValidated(length.test(value));
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  const doPasswordsMatch = value => value === confirmPassword;

  return {
    lowerValidated,
    upperValidated,
    numberValidated,
    specialValidated,
    lengthValidated,
    doPasswordsMatch,
    handleChangeValidation,
    handleConfirmPasswordChange,
  };
};

export default usePasswordValidation;
