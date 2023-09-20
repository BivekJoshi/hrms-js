import * as Yup from 'yup';

const FamilySchema = Yup.object().shape({
    family: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required("Name is required"),
                relation: Yup.string().required("Invalid email"),
                mobileNumber: Yup.string().required("Required"),
            })
        )
        .min(1, "Need at least a family")
});

export { FamilySchema };
