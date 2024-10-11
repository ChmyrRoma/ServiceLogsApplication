export interface IServiceLog {
    id: string;
    providerId: string;
    serviceOrder: string;
    truckId: string;
    trailer: string;
    odometer: number;
    engineHours: number;
    startDate: string
    endDate: string;
    type: EServiceType;
    serviceDescription: string;
}

export enum EServiceType {
    PLANNED = 'planned',
    UNPLANNED = 'unplanned',
    EMERGENCY = 'emergency',
}
