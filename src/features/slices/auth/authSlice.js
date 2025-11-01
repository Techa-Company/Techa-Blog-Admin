import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { login, logout } from "../../actions/auth/AuthActions";

const initialState = {
    loading: "idle",
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(login.pending, (state) => {
                state.loading = "loading";
                state.error = null;
            })
            .addCase(login.fulfilled, (state) => {
                state.loading = "succeeded";
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.loading = "failed";
                state.error = payload
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = "idle";
                state.error = null;
                toast.success("با موفقیت از سامانه خارج شدید.");
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.loading = "failed";
                state.error = payload
                toast.error('عملیات با خطا مواجه شد.')
            })
    }
})

export default authSlice.reducer