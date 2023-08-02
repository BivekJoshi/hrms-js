import React from 'react';
import usePasswordValidation from './usePasswordValidation';

function ValidationItem(props) {
    return (
      <div className={props.validated ? "validated" : "not-validated"}>
        {props.validated ? (
          <h1 style={{ color: "green" }}>
            {/* <FiCheckCircle /> */}
            {props.message}
          </h1>
        ) : (
          <h1 style={{ color: "red" }}>
            {/* <CiCircleRemove /> */}
            {props.message}
          </h1>
        )}
      </div>
    );
  }
  const {
    lowerValidated,
    upperValidated,
    numberValidated,
    specialValidated,
    lengthValidated,
    handleChangeValidation,
  } = usePasswordValidation();
const ValidationView = () => {
  return (
    <div>
      <ValidationItem
            validated={lowerValidated}
            message="At least one lowercase letter"
          />
          <ValidationItem
            validated={upperValidated}
            message="At least one uppercase letter"
          />
          <ValidationItem
            validated={numberValidated}
            message="At least one number"
          />
          <ValidationItem
            validated={specialValidated}
            message="At least one special character"
          />
          <ValidationItem
            validated={lengthValidated}
            message=" At least 8 characters"
          />
    </div>
  );
}

export default ValidationView;
