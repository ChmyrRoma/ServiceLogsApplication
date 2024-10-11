import { useState, useEffect } from "react";
import { useFormik } from "formik";
import classNames from "classnames";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import CloseIcon from "@mui/icons-material/Close";
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import AutorenewIcon from '@mui/icons-material/Autorenew';

import { validationCreateDraft } from "../../../validation/validationCreateDraft";
import { IServiceLog, EServiceType } from "../../../types/serviceLog";
import { Hooks } from "../../hooks";
import { createServiceLogSlice, getServiceLogByIdSlice } from "../../../store/slices/serviceLogs";
import { useAppDispatch } from "../../../store/hooks";
import { serviceLogsApi } from "../../../store/rest/serviceLogs";

import styles from "./createServiceLog.module.scss";
import LoaderBox from "../../common/LoaderBox/LoaderBox";


interface IProps {
    id: string | null;
    type: "create" | "edit";
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

const today = dayjs();
const tomorrow = today.add(1, 'day');

const defaultValues: Omit<IServiceLog, 'id'> = {
    providerId: '',
    serviceOrder: '',
    truckId: '',
    trailer: '',
    odometer: 0,
    engineHours: 0,
    startDate: today.format('YYYY-MM-DD'),
    endDate: tomorrow.format('YYYY-MM-DD'),
    type: EServiceType.PLANNED,
    serviceDescription: '',
}

const CreateServiceLog = ({ id, type, isOpen, onClose, onSubmit }: IProps) => {
    const dispatch = useAppDispatch();

    const [activeField, setActiveField] = useState<"truck" | "trailer">("truck");
    const [isSavedStatus, setIsSavedStatus] = useState(true);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCreating, setIsCreating] = useState(false);


    const handleClose = () => {
        formik.resetForm();
        onClose();
    }

    const formik = useFormik<Omit<IServiceLog, 'id'>>({
        initialValues: defaultValues,
        validationSchema: validationCreateDraft(activeField),
        async onSubmit(values: Omit<IServiceLog, 'id'>) {
            if (type === 'edit') {
                handleClose();
                return;
            };

            setIsSubmitting(true);
            setIsCreating(true);
            const response = await dispatch(createServiceLogSlice(values));
            if (response) {
                toast.success('Draft created!');
                onSubmit();
            } else {
                toast.error('Something wrong!');
            }
            setIsSubmitting(false);
            setIsCreating(false);
            handleClose();
        },
    });

    const debounceValues = Hooks.useDebounce<Omit<IServiceLog, 'id'>>(formik.values, 500);

    // Functionality for edit service log
    useEffect(() => {
        if (!isOpen || type === 'create' || !id) return;

        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        (async () => {
            setIsSavedStatus(false);
            await serviceLogsApi.editServiceLogById(id, debounceValues as Omit<IServiceLog, 'id'>);

            onSubmit();
            setIsSavedStatus(true);
        })()
    }, [debounceValues]);

    useEffect(() => {
        if (id && type === "edit") {
            (async () => {
                try {
                    const serviceLogResponse = await dispatch(getServiceLogByIdSlice(id));
                    const serviceLog = serviceLogResponse.payload as IServiceLog;

                    if (serviceLog) {
                        formik.setValues({
                            providerId: serviceLog.providerId || "",
                            serviceOrder: serviceLog.serviceOrder || "",
                            truckId: serviceLog.truckId || "",
                            trailer: serviceLog.trailer || "",
                            odometer: serviceLog.odometer || 0,
                            engineHours: serviceLog.engineHours || 0,
                            startDate: serviceLog.startDate || today.format("YYYY-MM-DD"),
                            endDate: serviceLog.endDate || tomorrow.format("YYYY-MM-DD"),
                            type: serviceLog.type || EServiceType.PLANNED,
                            serviceDescription: serviceLog.serviceDescription || "",
                        });
                    }
                } catch (error) {
                    console.error("Failed to fetch service log:", error);
                }
            })();
        }
    }, [id, type, dispatch]);


    const handleFieldChange = (field: "truck" | "trailer") => {
        setActiveField(field);

        if (field === "truck") {
            formik.setFieldTouched("trailer", false);
            formik.setFieldError("trailer", undefined);
        } else {
            formik.setFieldTouched("truckId", false);
            formik.setFieldError("truckId", undefined);
        }
    };

    useEffect(() => {
        if (activeField === 'trailer') formik.values.truckId = '';
        if (activeField === 'truck') formik.values.trailer = '';
    }, [activeField])

    useEffect(() => {
        if (formik.values.startDate) {
            const start = dayjs(formik.values.startDate);
            const newEndDate = start.add(1, 'day');
            formik.setFieldValue("endDate", newEndDate.format('YYYY-MM-DD'));
        }
    }, [formik.values.startDate]);

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box className={styles.createDraft}>
                <LoaderBox isLoading={isCreating}>
                    <Box className={styles.createDraft__mainContainer}>
                        <Box className={styles.createDraft__saveButton}>
                            <div
                                className={classNames(styles.createDraft__saveButton_content,
                                    { [styles.createDraft__saveButton_saved]: isSavedStatus },
                                    { [styles.createDraft__saveButton_saving]: !isSavedStatus }
                                )}
                            >
                                {isSavedStatus ? (
                                    <>
                                        <CloudDoneIcon />
                                        DRAFT SAVED
                                    </>
                                ) : (
                                    <>
                                        <AutorenewIcon />
                                        Saving...
                                    </>
                                )}
                            </div>
                        </Box>

                        <form onSubmit={formik.handleSubmit} className={styles.createDraft__form}>
                            <Box>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                                    <Typography variant="h6" m={0} p={0} className={styles.createDraft__title}>Provider Details</Typography>
                                    <IconButton onClick={handleClose}><CloseIcon /></IconButton>
                                </Box>

                                <Box className={styles.createDraft__container}>
                                    <Box className={styles.createDraft__container_providerDetails}>
                                        <TextField
                                            name="providerId"
                                            type="text"
                                            label="Enter Provider"
                                            onChange={(e) => {
                                                const upperCaseValue = e.target.value.toUpperCase();
                                                if (upperCaseValue.length <= 6) {
                                                    formik.setFieldValue("providerId", upperCaseValue);
                                                }
                                            }}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.providerId}
                                            required
                                            fullWidth
                                        />
                                        <p className={styles.createDraft__error}>{(formik?.touched?.providerId && formik?.errors?.providerId) || ''}</p>
                                    </Box>
                                    <Box className={styles.createDraft__container_providerDetails}>
                                        <TextField
                                            name="serviceOrder"
                                            type="text"
                                            label="Enter Service order"
                                            onChange={(e) => {
                                                const upperCaseValue = e.target.value.toUpperCase();
                                                if (upperCaseValue.length <= 6) {
                                                    formik.setFieldValue("serviceOrder", upperCaseValue);
                                                }
                                            }}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.serviceOrder}
                                            required
                                            fullWidth
                                        />
                                        <p className={styles.createDraft__error}>{(formik?.touched?.serviceOrder && formik?.errors?.serviceOrder) || ''}</p>
                                    </Box>
                                </Box>
                            </Box>
                            <Box className={styles.createDraft__container_switch}>
                                <Box
                                    className={classNames(styles.createDraft__container_type, {
                                        [styles.createDraft__container_typeActive]: activeField === "truck",
                                        [styles.createDraft__container_typeInactive]: activeField !== "truck",
                                    })}
                                    onClick={() => handleFieldChange("truck")}
                                >
                                    Truck
                                </Box>
                                <Box
                                    className={classNames(styles.createDraft__container_type, {
                                        [styles.createDraft__container_typeActive]: activeField === "trailer",
                                        [styles.createDraft__container_typeInactive]: activeField !== "trailer",
                                    })}
                                    onClick={() => handleFieldChange("trailer")}
                                >
                                    Trailer
                                </Box>
                            </Box>
                            <Box my={3} className={styles.createDraft__container}>
                                <Box>
                                    <TextField
                                        name={activeField === 'truck' ? 'truckId' : 'trailer'}
                                        type="text"
                                        label={activeField === 'truck' ? 'Truck' : 'Trailer'}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={activeField === 'truck' ? formik.values.truckId : formik.values.trailer}
                                        required
                                    />
                                    <p className={styles.createDraft__error}>
                                        {activeField === 'truck' ? ((formik?.touched?.truckId && formik?.errors?.truckId) || '') : ((formik?.touched?.trailer && formik?.errors?.trailer) || '')}
                                    </p>
                                </Box>
                                <Box>
                                    <TextField
                                        name="odometer"
                                        type="text"
                                        label="Odometer"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            formik.setFieldValue("odometer", value === "" ? 0 : Number(value));
                                        }}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter miles"
                                        value={formik.values.odometer === 0 ? "" : formik.values.odometer}
                                        onKeyDown={(e) => {
                                            const isNumberKey = /[0-9]/.test(e.key);
                                            const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
                                            if (!isNumberKey && !allowedKeys.includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        required
                                    />
                                    <p className={styles.createDraft__error}>{(formik?.touched?.odometer && formik?.errors?.odometer) || ''}</p>
                                </Box>
                                <Box>
                                    <TextField
                                        name="engineHours"
                                        type="text"
                                        label="Engine Hours"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            formik.setFieldValue("engineHours", value === "" ? 0 : Number(value));
                                        }}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter hours"
                                        value={formik.values.engineHours === 0 ? "" : formik.values.engineHours}
                                        onKeyDown={(e) => {
                                            const isNumberKey = /[0-9]/.test(e.key);
                                            const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight"];
                                            if (!isNumberKey && !allowedKeys.includes(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        required
                                    />
                                    <p className={styles.createDraft__error}>{(formik?.touched?.engineHours && formik?.errors?.engineHours) || ''}</p>
                                </Box>
                            </Box>
                            <Box my={3} className={styles.createDraft__container}>
                                <DatePicker
                                    label="Start Date"
                                    value={formik.values.startDate ? dayjs(formik.values.startDate) : null}
                                    onChange={(newValue) => {
                                        formik.setFieldValue("startDate", newValue ? newValue.format('YYYY-MM-DD') : null);
                                    }}
                                    minDate={today}
                                    className={styles.createDraft__container_date}
                                />
                                <p className={styles.createDraft__error}>{(formik?.touched?.startDate && formik?.errors?.startDate) || ''}</p>
                                <DatePicker
                                    label="End Date"
                                    value={formik.values.endDate ? dayjs(formik.values.endDate) : null}
                                    onChange={(newValue) => {
                                        formik.setFieldValue("endDate", newValue ? newValue.format('YYYY-MM-DD') : null);
                                    }}
                                    minDate={formik.values.startDate ? dayjs(formik.values.startDate).add(1, 'day') : today}
                                    className={styles.createDraft__container_date}
                                />
                                <p className={styles.createDraft__error}>{(formik?.touched?.endDate && formik?.errors?.endDate) || ''}</p>
                            </Box>
                            <Box my={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        name="type"
                                        label="Type"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        required
                                        value={formik.values.type}
                                    >
                                        <MenuItem value={EServiceType.PLANNED}>{EServiceType.PLANNED.charAt(0).toUpperCase() + EServiceType.PLANNED.slice(1)}</MenuItem>
                                        <MenuItem value={EServiceType.UNPLANNED}>{EServiceType.UNPLANNED.charAt(0).toUpperCase() + EServiceType.UNPLANNED.slice(1)}</MenuItem>
                                        <MenuItem value={EServiceType.EMERGENCY}>{EServiceType.EMERGENCY.charAt(0).toUpperCase() + EServiceType.EMERGENCY.slice(1)}</MenuItem>
                                    </Select>
                                </FormControl>
                                <p className={styles.createDraft__error}>{(formik?.touched?.type && formik?.errors?.type) || ''}</p>
                            </Box>
                            <Box className={styles.createDraft__textarea}>
                                <TextField
                                    name="serviceDescription"
                                    type="text"
                                    label="Service Description"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.serviceDescription}
                                    multiline
                                    rows={3}
                                    fullWidth
                                />
                                <div className={styles.createDraft__textarea_count}>{`${formik.values.serviceDescription?.length} / 400`}</div>
                                <p className={styles.createDraft__error}>{(formik?.touched?.serviceDescription && formik?.errors?.serviceDescription) || ''}</p>
                            </Box>
                            <Box>
                                <Button type="submit" disabled={isSubmitting || (formik.touched && !formik.isValid)} variant="contained" color={type === "create" ? "success" : "primary"}>
                                    {type === "create" && (isSubmitting ? <AutorenewIcon /> : 'Create Drag')}
                                    {type === "edit" && "Finish"}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </LoaderBox>
            </Box>
        </Modal>
    )
}

export default CreateServiceLog;
