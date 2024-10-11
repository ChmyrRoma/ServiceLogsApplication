import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { store } from "./store/store";

import { ServiceLogsPage } from "./components/pages/ServiceLogsPage";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";


function App() {

    return (
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                <Router>
                    <Routes>
                        <Route path="/" element={<ServiceLogsPage />} />
                    </Routes>
                    <ToastContainer />
                </Router>
                </DemoContainer>
            </LocalizationProvider>
        </Provider>
    )
}

export default App;
