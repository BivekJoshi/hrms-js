// import { Button } from "@mui/material";
// import React from "react";
// import useAuth from "../../auth/hooks/component/login/useAuth";

// const HocButton = ({
//   buttonName,
//   onClick,
//   sx,
//   bg,
//   variant,
//   permissions,
//   icon,
//   disabledIcon,
//   color,
// }) => {
//   const { isEmployee } = useAuth();
//   const isDisabled = !permissions;
//   const disabledBg = "";
//   const disabledColor = "";

//   return(
//     <Button
//       sx={{
//         ...sx,
//         backgroundColor: isDisabled ? disabledBg : bg,
//         color: isDisabled ? disabledColor : color,
//         cursor: isDisabled ? "not-allowed" : "pointer",
//       }}
//       variant={variant}
//       onClick={isDisabled ? null : onClick}
//     >
//       {isDisabled ? disabledIcon || icon || buttonName : icon || buttonName}
//     </Button>
//   )

//   // const { isEmployee } = useAuth();
//   // const isIcon = typeof buttonName === "string" && buttonName.trim() === "";
//   // return isEmployee ? (
//   //   ""
//   // ) : (
//   //   <Button
//   //     sx={{
//   //       ...sx,
//   //       backgroundColor: isDisabled ? disabledBg : bg,
//   //       color: isDisabled ? disabledColor : color,
//   //       cursor: isDisabled ? "not-allowed" : "pointer",
//   //       minWidth: isIcon ? "0px" : "auto",
//   //       padding: isIcon ? "0px" : "auto",
//   //     }}
//   //     variant={variant}
//   //     onClick={isDisabled ? null : onClick}
//   //   >
//   //     {isDisabled ? disabledIcon || icon || buttonName : icon || buttonName}
//   //   </Button>
//   // );
// };

// export default HocButton;



import { Button } from "@mui/material";
import React from "react";
import useAuth from "../../auth/hooks/component/login/useAuth";

const HocButton = ({
  buttonName,
  onClick,
  sx,
  bg,
  variant,
  permissions,
  icon,
  disabledIcon,
  color,
  hoverBg,
}) => {
  const { isEmployee } = useAuth();
  const isDisabled = !permissions;

  if (isEmployee && isDisabled) {
    return null;
  }

  const buttonSx = {
    ...sx,
        backgroundColor: isDisabled ? "" : bg,
        color: isDisabled ? "#fff" : color,
        cursor: isDisabled ? "not-allowed" : "pointer",
        '&:hover':{
          backgroundColor: isDisabled ? "" : hoverBg,
        }   
  };
  const handleClick = isDisabled ? null : onClick;
  const buttonText = isDisabled ? disabledIcon || icon || buttonName : icon || buttonName;

  return(
    <Button sx={buttonSx} variant={variant} onClick={handleClick}>
      {buttonText}
    </Button>
  )
};

export default HocButton;