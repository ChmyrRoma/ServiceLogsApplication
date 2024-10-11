import * as Yup from "yup";

export const validationCreateDraft = (activeField: string) =>
    Yup.object({
        providerId: Yup.string().required('Provider id is required').max(6, 'Max 6 symbol'),
        serviceOrder: Yup.string().required('Service order is required').max(6, 'Max 6 symbol'),
        truckId: (activeField === 'truck') ? Yup.string().required('Truck id is required') : Yup.string(),
        trailer: (activeField === 'trailer') ? Yup.string().required('Trailer is required') : Yup.string(),
        odometer: Yup.number().required('Odometer is required'),
        engineHours: Yup.number().required('Engine hours is required'),
        startDate: Yup.string().nullable(),
        endDate: Yup.string().nullable(),
        type: Yup.string().required('Type is required'),
        serviceDescription: Yup.string()
            .required('Service description is required')
            .max(400, "Maximum 400 characters"),
    });
