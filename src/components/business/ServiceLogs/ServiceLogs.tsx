import { useCallback, useEffect, useState } from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from '@mui/material/Grid2';
import dayjs from "dayjs";

import CreateServiceLog from "../CreateServiceLog/CreateServiceLog";
import ServiceLogsTable from "./ServiceLogsTable/ServiceLogsTable";

import { EServiceType } from "../../../types/serviceLog";

import styles from "./serviceLogs.module.scss";
import { Hooks } from "../../hooks";
import { getServiceLogsSlice } from "../../../store/slices/serviceLogs";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import LoaderBox from "../../common/LoaderBox/LoaderBox";

export type TSearchTypeFields = 'providerId' | 'serviceOrder' | 'truckId' | 'trailer' | 'odometer' | 'engineHours';

const searchTypeOptions = {
    providerId: 'Provider Id',
    serviceOrder: 'Service Order',
    truckId: 'Truck Id',
    trailer: 'Trailer',
    odometer: 'Odometer',
    engineHours: 'Engine Hours',
}

const ServiceLogs = () => {
    const [editableServiceLogId, setEditableServiceLogId] = useState<string | null>(null);
    const [createServiceLogType, setCreateServiceLogType] = useState<'create' | 'edit' | null>(null);

    const [search, setSearch] = useState<string>('');
    const [type, setType] = useState<EServiceType | null>(null);
    const [searchType, setSearchType] = useState<TSearchTypeFields | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const { isLoading } = useAppSelector((state) => state.serviceLogs);


    const debouncedSearch = Hooks.useDebounce<string>(search, 500);

    const dispatch = useAppDispatch();

    const [isTriggeredTableUpdate, setIsTriggeredTableUpdate] = useState<number>(1);

    const handleTriggerTableUpdate = () => setIsTriggeredTableUpdate(prev => prev + 1);

    const handleGetServiceLogs = useCallback(() => {
        dispatch(getServiceLogsSlice({ searchType: searchType || undefined, q: debouncedSearch, type: type || undefined, startDate: startDate || undefined, endDate: endDate || undefined }));
    }, [debouncedSearch, type, startDate, endDate, isTriggeredTableUpdate, searchType]);

    useEffect(() => {
        if (!isTriggeredTableUpdate) return;
        handleGetServiceLogs();
    }, [handleGetServiceLogs]);

    const handleOnEdit = (id: string) => {
        setEditableServiceLogId(id);
        setCreateServiceLogType('edit');
    }

    const handleClose = () => setCreateServiceLogType(null);

    return (
        <LoaderBox isLoading={isLoading}>

        
        <Box className={styles.main} m={3}>
            <Button sx={{ width: 300 }} variant="outlined" color="success" onClick={() => setCreateServiceLogType('create')} className={styles.main__button}>Create Service Log</Button>

            <Grid container spacing={2} my={3}>
                <Grid size={2}>
                    <FormControl size="small" fullWidth>
                        <InputLabel size="small" id="searchField">Search field</InputLabel>
                        <Select
                            size="small"
                            name="searchField"
                            label="Search field"
                            value={searchType || ''}
                            onChange={(e) => setSearchType(e.target.value as TSearchTypeFields)}
                            required
                        >
                            {Object.keys(searchTypeOptions).map((field) => (
                                <MenuItem key={field} value={field}>{searchTypeOptions[field as TSearchTypeFields]}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={3}>
                    <TextField fullWidth size="small" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                </Grid>

                <Grid size={3}>
                    <FormControl size="small" fullWidth>
                        <InputLabel size="small" id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            size="small"
                            name="type"
                            label="Type"
                            value={type || ''}
                            onChange={(e) => setType(e.target.value as EServiceType)}
                            required
                        >
                            <MenuItem value={EServiceType.PLANNED}>{EServiceType.PLANNED.charAt(0).toUpperCase() + EServiceType.PLANNED.slice(1)}</MenuItem>
                            <MenuItem value={EServiceType.UNPLANNED}>{EServiceType.UNPLANNED.charAt(0).toUpperCase() + EServiceType.UNPLANNED.slice(1)}</MenuItem>
                            <MenuItem value={EServiceType.EMERGENCY}>{EServiceType.EMERGENCY.charAt(0).toUpperCase() + EServiceType.EMERGENCY.slice(1)}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid size={2}>
                    <DatePicker
                        label="Start Date"
                        value={startDate ? dayjs(startDate) : null}
                        slotProps={{ textField: { size: 'small' } }}
                        onChange={(newValue) => {
                            const a = newValue ? dayjs(newValue).toDate() : null;
                            setStartDate(a);
                        }}
                    />
                </Grid>
                <Grid  size={2}>
                    <DatePicker
                        label="End Date"
                        slotProps={{ textField: { size: 'small' } }}
                        value={endDate ? dayjs(endDate) : null}
                        onChange={(newValue) => {
                            const a = newValue ? dayjs(newValue).toDate() : null;
                            setEndDate(a);
                        }}
                    />
                </Grid>
            </Grid>

            <CreateServiceLog
                type={createServiceLogType || 'create'}
                isOpen={!!createServiceLogType}
                onClose={handleClose}
                id={editableServiceLogId}
                onSubmit={handleTriggerTableUpdate}
            />
            <ServiceLogsTable onEdit={handleOnEdit} onDelete={handleTriggerTableUpdate} />
         </Box>
         </LoaderBox>
    )
}

export default ServiceLogs;
