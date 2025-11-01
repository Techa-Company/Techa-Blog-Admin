import { createSlice } from "@reduxjs/toolkit";
import { getBlogSeo } from "../../actions/blog/seoActions";


const initialState = {
    loading: false,
    seo: {},
    error: null
}

const seoSlice = createSlice({
    name: "seo",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getBlogSeo.pending, state => {
                state.loading = true;
            })
            .addCase(getBlogSeo.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.seo = payload;
            })
            .addCase(getBlogSeo.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
})

export default seoSlice.reducer;