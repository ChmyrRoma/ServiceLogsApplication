import { createAsyncThunk } from "@reduxjs/toolkit";
import { serviceLogsApi } from "../rest/serviceLogs";
import { EServiceType, IServiceLog } from "../../types/serviceLog";
import { serviceLogsSliceActions } from "../reducers/serviceLog";
import { TSearchTypeFields } from "../../components/business/ServiceLogs/ServiceLogs";
import dayjs from "dayjs";

interface IParams {
  searchType?: TSearchTypeFields;
  q?: string;
  type?: EServiceType;
  startDate?: Date;
  endDate?: Date;
}

function compareDates(startDate: string, endDate: string, paramStartDate?: Date, paramEndDate?: Date) {
  const startDateVal = dayjs(startDate);
  const endDateVal = dayjs(endDate);

  if (paramStartDate && paramEndDate) {
    return ((startDateVal.isAfter(paramStartDate) || startDateVal.isSame(paramStartDate)) && (!endDateVal.isBefore(paramStartDate) && !endDateVal.isSame(paramStartDate))) && (endDateVal.isAfter(paramEndDate) || endDateVal.isSame(paramEndDate));
  } else if (paramStartDate) {
    return (startDateVal.isAfter(paramStartDate) || startDateVal.isSame(paramStartDate)) && (!endDateVal.isBefore(paramStartDate) && !endDateVal.isSame(paramStartDate));
  } else if (paramEndDate) {
    return (endDateVal.isAfter(paramEndDate) || endDateVal.isSame(paramEndDate));
  }
  return true;
  
}


export const getServiceLogsSlice = createAsyncThunk(
  'getServiceLogsSlice',
  async (params: IParams, thunkAPI) => {
    try {
      thunkAPI.dispatch(serviceLogsSliceActions.setIsLoading(true));

      const response = await serviceLogsApi.getServiceLogs();

      if (response) {
          const filteredLogs = response.filter((log: IServiceLog) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          // Filter by providerId if q is provided
          const isProviderMatch = (params?.q && params.searchType) ? log[params.searchType].toLowerCase().includes(params.q.toLowerCase()) : true;

          // Filter by type if type is provided
          const isTypeMatch = params?.type ? log.type === params.type : true;

          const isValidByDates = compareDates(log.startDate, log.endDate, params.startDate, params.endDate);

          return isProviderMatch && isTypeMatch && isValidByDates;
        });

        // Dispatch the filtered logs to the store
        thunkAPI.dispatch(serviceLogsSliceActions.setServiceLogs(filteredLogs));

        return filteredLogs;
      }

      return [];
    } catch (error) {
      console.log('Error fetching service logs:', error);
      // Optionally, throw error for more detailed error handling
      // throw error;
    } finally {
      thunkAPI.dispatch(serviceLogsSliceActions.setIsLoading(false));
    }
  }
);



export const getServiceLogByIdSlice = createAsyncThunk('getServiceLogByIdSlice', async (id: string) => {
  try {
    const response = await serviceLogsApi.getServiceLogById(id);
    return response;
  } catch (error) {
    console.log('error:', error);
  }
});

export const createServiceLogSlice = createAsyncThunk('createServiceLogSlice', async (value: Omit<IServiceLog, 'id'>) => {
  try {
    const response = await serviceLogsApi.createServiceLog(value);

    // For real request i will use it but here i simulating BE locally
    // if (response) thunkAPI.dispatch(serviceLogsSliceActions.setServiceLog(response));
    return response;
  } catch (error) {
    console.log('error:', error);
  }
});
