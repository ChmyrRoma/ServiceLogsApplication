import { EServiceType, IServiceLog } from "../types/serviceLog";

export const serviceLogsMockData: IServiceLog[] = [
  {
    providerId: "P001",
    serviceOrder: "SO001",
    truckId: "T001",
    trailer: "TR001",
    odometer: 120000,
    engineHours: 5000,
    startDate: "2024-01-15",
    endDate: "2024-01-16",
    type: EServiceType.PLANNED,
    serviceDescription: "Routine maintenance"
  },
  {
    providerId: "P002",
    serviceOrder: "SO002",
    truckId: "T002",
    trailer: "TR002",
    odometer: 150000,
    engineHours: 6000,
    startDate: "2024-01-18",
    endDate: "2024-01-19",
    type: EServiceType.UNPLANNED,
    serviceDescription: "Engine check"
  },
  {
    providerId: "P003",
    serviceOrder: "SO003",
    truckId: "T003",
    trailer: "TR003",
    odometer: 180000,
    engineHours: 7000,
    startDate: "2024-02-05",
    endDate: "2024-02-06",
    type: EServiceType.EMERGENCY,
    serviceDescription: "Brake failure repair"
  },
  {
    providerId: "P004",
    serviceOrder: "SO004",
    truckId: "T004",
    trailer: "TR004",
    odometer: 210000,
    engineHours: 8000,
    startDate: "2024-03-12",
    endDate: "2024-03-13",
    type: EServiceType.PLANNED,
    serviceDescription: "Oil change"
  },
  {
    providerId: "P005",
    serviceOrder: "SO005",
    truckId: "T005",
    trailer: "TR005",
    odometer: 240000,
    engineHours: 9000,
    startDate: "2024-04-10",
    endDate: "2024-04-11",
    type: EServiceType.UNPLANNED,
    serviceDescription: "Tire replacement"
  },
  {
    providerId: "P006",
    serviceOrder: "SO006",
    truckId: "T006",
    trailer: "TR006",
    odometer: 270000,
    engineHours: 10000,
    startDate: "2024-05-15",
    endDate: "2024-05-16",
    type: EServiceType.EMERGENCY,
    serviceDescription: "Transmission failure repair"
  },
  {
    providerId: "P007",
    serviceOrder: "SO007",
    truckId: "T007",
    trailer: "TR007",
    odometer: 300000,
    engineHours: 11000,
    startDate: "2024-06-20",
    endDate: "2024-06-21",
    type: EServiceType.PLANNED,
    serviceDescription: "Air filter replacement"
  },
  {
    providerId: "P008",
    serviceOrder: "SO008",
    truckId: "T008",
    trailer: "TR008",
    odometer: 330000,
    engineHours: 12000,
    startDate: "2024-07-10",
    endDate: "2024-07-11",
    type: EServiceType.UNPLANNED,
    serviceDescription: "Suspension check"
  },
  {
    providerId: "P009",
    serviceOrder: "SO009",
    truckId: "T009",
    trailer: "TR009",
    odometer: 360000,
    engineHours: 13000,
    startDate: "2024-08-01",
    endDate: "2024-08-02",
    type: EServiceType.EMERGENCY,
    serviceDescription: "Cooling system failure repair"
  },
  {
    providerId: "P010",
    serviceOrder: "SO010",
    truckId: "T010",
    trailer: "TR010",
    odometer: 390000,
    engineHours: 14000,
    startDate: "2024-09-07",
    endDate: "2024-09-08",
    type: EServiceType.PLANNED,
    serviceDescription: "General inspection"
  },
  {
    providerId: "P011",
    serviceOrder: "SO011",
    truckId: "T011",
    trailer: "TR011",
    odometer: 420000,
    engineHours: 15000,
    startDate: "2024-10-12",
    endDate: "2024-10-13",
    type: EServiceType.UNPLANNED,
    serviceDescription: "Fuel system check"
  },
  {
    providerId: "P012",
    serviceOrder: "SO012",
    truckId: "T012",
    trailer: "TR012",
    odometer: 450000,
    engineHours: 16000,
    startDate: "2024-11-10",
    endDate: "2024-11-11",
    type: EServiceType.EMERGENCY,
    serviceDescription: "Electrical failure repair"
  },
  {
    providerId: "P013",
    serviceOrder: "SO013",
    truckId: "T013",
    trailer: "TR013",
    odometer: 480000,
    engineHours: 17000,
    startDate: "2024-12-15",
    endDate: "2024-12-16",
    type: EServiceType.PLANNED,
    serviceDescription: "Battery replacement"
  },
  {
    providerId: "P014",
    serviceOrder: "SO014",
    truckId: "T014",
    trailer: "TR014",
    odometer: 510000,
    engineHours: 18000,
    startDate: "2024-12-30",
    endDate: "2025-01-01",
    type: EServiceType.UNPLANNED,
    serviceDescription: "Radiator check"
  },
  {
    providerId: "P015",
    serviceOrder: "SO015",
    truckId: "T015",
    trailer: "TR015",
    odometer: 540000,
    engineHours: 19000,
    startDate: "2025-01-15",
    endDate: "2025-01-16",
    type: EServiceType.EMERGENCY,
    serviceDescription: "Exhaust system repair"
  },
  {
    providerId: "P016",
    serviceOrder: "SO016",
    truckId: "T016",
    trailer: "TR016",
    odometer: 570000,
    engineHours: 20000,
    startDate: "2025-02-20",
    endDate: "2025-02-21",
    type: EServiceType.PLANNED,
    serviceDescription: "Transmission fluid change"
  },
  {
    providerId: "P017",
    serviceOrder: "SO017",
    truckId: "T017",
    trailer: "TR017",
    odometer: 600000,
    engineHours: 21000,
    startDate: "2025-03-15",
    endDate: "2025-03-16",
    type: EServiceType.UNPLANNED,
    serviceDescription: "Brake pad replacement"
  },
  {
    providerId: "P018",
    serviceOrder: "SO018",
    truckId: "T018",
    trailer: "TR018",
    odometer: 630000,
    engineHours: 22000,
    startDate: "2025-04-10",
    endDate: "2025-04-11",
    type: EServiceType.EMERGENCY,
    serviceDescription: "Hydraulic system repair"
  },
  {
    providerId: "P019",
    serviceOrder: "SO019",
    truckId: "T019",
    trailer: "TR019",
    odometer: 660000,
    engineHours: 23000,
    startDate: "2025-05-05",
    endDate: "2025-05-06",
    type: EServiceType.PLANNED,
    serviceDescription: "Spark plug replacement"
  },
  {
    providerId: "P020",
    serviceOrder: "SO020",
    truckId: "T020",
    trailer: "TR020",
    odometer: 690000,
    engineHours: 24000,
    startDate: "2025-06-10",
    endDate: "2025-06-11",
    type: EServiceType.UNPLANNED,
    serviceDescription: "Drive belt replacement"
  }
];
