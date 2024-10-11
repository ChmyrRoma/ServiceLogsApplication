import LocalStorageService from "../../services/localStorageService";
import { IServiceLog } from "../../types/serviceLog";

function apiRequest<T>(callback: () => T, delay = 300) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(callback());
    }, delay);
  });
}

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);
const SERVICE_LOGS_KEY = "serviceLogs";

const createServiceLog = (serviceLog: Omit<IServiceLog, 'id'>) =>
  apiRequest<IServiceLog>(() => {
    const storedLogs = LocalStorageService.getItem(SERVICE_LOGS_KEY);
    const serviceLogs: IServiceLog[] = storedLogs ? JSON.parse(storedLogs) : [];

    const newServiceLog = { ...serviceLog, id: generateId() };
    serviceLogs.push(newServiceLog);

    LocalStorageService.setItem(SERVICE_LOGS_KEY, JSON.stringify(serviceLogs));

    return newServiceLog;
  });

const getServiceLogs = () =>
  apiRequest<IServiceLog[]>(() => {
    const storedLogs = LocalStorageService.getItem(SERVICE_LOGS_KEY);
    return storedLogs ? JSON.parse(storedLogs) : [];
  });

const getServiceLogById = (id: string) =>
  apiRequest<IServiceLog | null>(() => {
    const storedLogs = LocalStorageService.getItem(SERVICE_LOGS_KEY);
    const serviceLogs: IServiceLog[] = storedLogs ? JSON.parse(storedLogs) : [];

    return serviceLogs.find((log) => log.id === id) || null;
  });

const editServiceLogById = (id: string, updatedLog: Omit<IServiceLog, 'id'>) =>
  apiRequest<IServiceLog | null>(() => {
    const storedLogs = LocalStorageService.getItem(SERVICE_LOGS_KEY);
    const serviceLogs: IServiceLog[] = storedLogs ? JSON.parse(storedLogs) : [];

    const logIndex = serviceLogs.findIndex((log) => log.id === id);
    if (logIndex === -1) return null;

    serviceLogs[logIndex] = { ...serviceLogs[logIndex], ...updatedLog };
    LocalStorageService.setItem(SERVICE_LOGS_KEY, JSON.stringify(serviceLogs));

    return serviceLogs[logIndex];
  });

const deleteServiceLogById = (id: string) =>
    apiRequest<boolean>(() => {
      const storedLogs = LocalStorageService.getItem(SERVICE_LOGS_KEY);
      const serviceLogs: IServiceLog[] = storedLogs ? JSON.parse(storedLogs) : [];

      const updatedLogs = serviceLogs.filter((log) => log.id !== id);

      if (updatedLogs.length === serviceLogs.length) {
        // No log was found with the given id
        return false;
      }

      LocalStorageService.setItem(SERVICE_LOGS_KEY, JSON.stringify(updatedLogs));
      return true;
    });


export const serviceLogsApi = { createServiceLog, getServiceLogs, getServiceLogById, editServiceLogById, deleteServiceLogById };
