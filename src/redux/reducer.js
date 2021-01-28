import { createSlice } from "@reduxjs/toolkit";
import ChargeReducer from "../pages/charge/redux/reducer"

const commonReducer = {
    chargeState: ChargeReducer    
};

export default commonReducer;