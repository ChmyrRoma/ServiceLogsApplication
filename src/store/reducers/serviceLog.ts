import { createSlice } from '@reduxjs/toolkit';

import { IServiceLog } from "../../types/serviceLog";

export interface IServiceLogsReducer {
    data: IServiceLog[];
    isLoading: boolean;
}

const initialState = {
    data: [],
    isLoading: true,
} as unknown as IServiceLogsReducer;


export const serviceLogsSlice = createSlice({
    name: 'serviceLogs',
    initialState,
    reducers: {
        setServiceLog: (state, action) => {
            state.data = [...state.data, action.payload];
        },
        setServiceLogs: (state, action) => {
            state.data = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const serviceLogsSliceActions = serviceLogsSlice.actions;
