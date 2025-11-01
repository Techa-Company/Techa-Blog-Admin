import { createSlice } from "@reduxjs/toolkit";
import { getAllSliders, getSliderForEdit } from "../../actions/slider/sliderActions";


const initialState = {
    loading: false,
    sliders: [],
    selectedSlide: {},
    error: null
}

const sliderSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAllSliders.pending, state => {
                state.loading = true;
            })
            .addCase(getAllSliders.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.sliders = payload;
            })
            .addCase(getAllSliders.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            .addCase(getSliderForEdit.pending, state => {
                state.loading = true;
            })
            .addCase(getSliderForEdit.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.selectedSlide = payload;
            })
            .addCase(getSliderForEdit.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
})

export default sliderSlice.reducer;