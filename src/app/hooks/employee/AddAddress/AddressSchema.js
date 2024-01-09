import * as Yup from "yup";
import {
  ageRegex,
  onlyTextRegex,
  onlyNumberRegExp,
} from "../../../../validation/validationRegex";

// const AddressSchema = Yup.object().shape({
//   addresses: Yup.array().of(
//     Yup.object().shape({
//       country: Yup.string()
//         .when('_', {
//           is: (_, schema) => schema?.path.startsWith('addresses[0]'),
//           then: Yup.string()
//             .required('Country is required')
//             .matches(onlyTextRegex, ''),
//         })
//         .matches(onlyTextRegex, ''),
//       province: Yup.string()
//         .when('_', {
//           is: (_, schema) => schema?.path.startsWith('addresses[0]'),
//           then: Yup.string().required('Province is required'),
//         }),
//       district: Yup.string()
//         .when('_', {
//           is: (_, schema) => schema?.path.startsWith('addresses[0]'),
//           then: Yup.string().required('District is required'),
//         }),
//       wardNumber: Yup.string()
//         .when('_', {
//           is: (_, schema) => schema?.path.startsWith('addresses[0]'),
//           then: Yup.string()
//             .required('Ward number is required')
//             .matches(ageRegex, 'Enter a valid ward number'),
//         })
//         .matches(ageRegex, 'Enter a valid ward number'),
//       city: Yup.string()
//         .when('_', {
//           is: (_, schema) => schema?.path.startsWith('addresses[0]'),
//           then: Yup.string().required('City is required'),
//         }),
//       street: Yup.string()
//         .when('_', {
//           is: (_, schema) => schema?.path.startsWith('addresses[0]'),
//           then: Yup.string().required('Street is required'),
//         }),
//     })
//   ),
// });

const AddressSchema = Yup.object().shape({
  perTempAddSame: Yup.boolean(),
  addresses: Yup.array()
    .of(
      Yup.object().shape({
        addressType: Yup.string().required("Address type is required"),
        country: Yup.string().when("addressType", {
          is: "PERMANENT",
          then: Yup.string().required("Country is required"),
          otherwise: Yup.string().when("$perTempAddSame", {
            is: true,
            then: Yup.string().required("Country is required"),
          }),
        }),
        province: Yup.string().when("addressType", {
          is: "PERMANENT",
          then: Yup.string().required("Province is required"),
          otherwise: Yup.string().when("$perTempAddSame", {
            is: true,
            then: Yup.string().required("Province is required"),
          }),
        }),
        district: Yup.string().when("addressType", {
          is: "PERMANENT",
          then: Yup.string().required("District is required"),
          otherwise: Yup.string().when("$perTempAddSame", {
            is: true,
            then: Yup.string().required("District is required"),
          }),
        }),
        municipality: Yup.string().when("addressType", {
          is: "PERMANENT",
          then: Yup.string().required("Municipality is required"),
          otherwise: Yup.string().when("$perTempAddSame", {
            is: true,
            then: Yup.string().required("Municipality is required"),
          }),
        }),
        wardNumber: Yup.number().when("addressType", {
          is: "PERMANENT",
          then: Yup.number()
            .typeError("Ward number must be a number")
            .max(999, "Invalid ward number, exceed length 3")
            .required("Ward number is required"),
          otherwise: Yup.number().when("$perTempAddSame", {
            is: true,
            then: Yup.number()
              .typeError("Ward number must be a number")
              .max(999, "Invalid ward number, exceed length 3")
              .required("Ward number is required"),
          }),
        }),
        city: Yup.string().when("addressType", {
          is: "PERMANENT",
          then: Yup.string().required("City is required").max(25, "City name cannot be greater than 25 characters"),
          otherwise: Yup.string().when("$perTempAddSame", {
            is: true,
            then: Yup.string().required("City is required").max(25, "City name cannot be greater than 25 characters"),
          }),
        }),
        street: Yup.string().when("addressType", {
          is: "PERMANENT",
          then: Yup.string().required("Street is required").max(25, "Street name cannot be greater than 25 characters"),
          otherwise: Yup.string().when("$perTempAddSame", {
            is: true,
            then: Yup.string().required("Street is required").max(25, "Street name cannot be greater than 25 characters"),
          }),
        }),
      })
    )
    .test(
      "perTempAddSame",
      "perTempAddSame used in addresses",
      function (value) {
        const perTempAddSame = this.resolve(Yup.ref("perTempAddSame"));
        this.options.context.perTempAddSame = !!perTempAddSame;
        return true;
      }
    )
    .required(),
});

export { AddressSchema };

// const AddressSchema = Yup.object().shape({
//   perTempAddSame: Yup.boolean(),
//   addresses: Yup.array()
//     .of(
//       Yup.object().shape({
//         country: Yup.string().when(["addressType", "$perTempAddSame"], {
//           is: (addressType, perTempAddSame) => {
//             const both =
//               addressType === "TEMPORARY" || addressType === "PERMANENT";
//             return perTempAddSame ? both : addressType === "PERMANENT";
//           },
//           then: Yup.string().required("Country is required"),
//           otherwise: Yup.string(),
//         }),
//         province: Yup.string().when(["addressType", "$perTempAddSame"], {
//           is: (addressType, perTempAddSame) => {
//             const both =
//               addressType === "TEMPORARY" || addressType === "PERMANENT";
//             return perTempAddSame ? both : addressType === "PERMANENT";
//           },
//           then: Yup.string().required("Province is required"),
//         }),
//         district: Yup.string().when(["addressType", "$perTempAddSame"], {
//           is: (addressType, perTempAddSame) => {
//             const both =
//               addressType === "TEMPORARY" || addressType === "PERMANENT";
//             return perTempAddSame ? both : addressType === "PERMANENT";
//           },
//           then: Yup.string().required("District is required"),
//           otherwise: Yup.string(),
//         }),
//         wardNumber: Yup.number().when(["addressType", "$perTempAddSame"], {
//           is: (addressType, perTempAddSame) => {
//             const both =
//               addressType === "TEMPORARY" || addressType === "PERMANENT";
//             return perTempAddSame ? both : addressType === "PERMANENT";
//           },
//           then: Yup.number()
//             .typeError("Ward number must be a number")
//             .required("Ward number is required"),
//           otherwise: Yup.string(),
//         }),
//         city: Yup.string().when(["addressType", "$perTempAddSame"], {
//           is: (addressType, perTempAddSame) => {
//             const both =
//               addressType === "TEMPORARY" || addressType === "PERMANENT";
//             return perTempAddSame ? both : addressType === "PERMANENT";
//           },
//           then: Yup.string().required("City is required"),
//           otherwise: Yup.string(),
//         }),
//         street: Yup.string().when(["addressType", "$perTempAddSame"], {
//           is: (addressType, perTempAddSame) => {
//             const both =
//               addressType === "TEMPORARY" || addressType === "PERMANENT";
//             return perTempAddSame ? both : addressType === "PERMANENT";
//           },
//           then: Yup.string().required("Street is required"),
//           otherwise: Yup.string(),
//         }),
//       })
//     )
//     .test(
//       "perTempAddSame",
//       "perTempAddSame used in addresses",
//       function (value) {
//         const perTempAddSame = this.resolve(Yup.ref("perTempAddSame"));
//         this.options.context.perTempAddSame = !!perTempAddSame;
//         return true;
//       }
//     )
//     .required(),
// });
