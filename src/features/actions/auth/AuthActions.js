import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { deleteCookie, getCookie, setCookie } from "../../../helpers";

export const login = createAsyncThunk("auth/login",
    async (userData, { rejectWithValue }) => {
        try {
            console.log(userData);
            const { data } = await axios.post("Account/Login", userData);
            // store user's token in cookie
            setCookie("jwt", data.token, 1);
            axios.defaults.headers.common["authorization"] = "Bearer " + getCookie("jwt");
            console.log(data)
            return data;
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const logout = createAsyncThunk("auth/logout",
    async () => {
        try {
            await axios.post("/Auth/Logout");
            deleteCookie("jwt");
        } catch (error) {
            // return custom error message from API if any
            if (error.response && error.response.data.message) {
                return error.response.data.message
            } else {
                return error.message
            }
        }
    }
)