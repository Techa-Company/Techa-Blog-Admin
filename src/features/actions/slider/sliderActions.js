import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllSliders = createAsyncThunk("sliders/getAllSliders", async () => {
    const query = "Slider/GetAll?PageIndex=1&PageSize=10";
    const { data } = await axios.get(query);
    console.log(data?.sliders?.items)
    return data?.sliders?.items;
});

const getSliderForEdit = createAsyncThunk("sliders/getSliderForEdit", async id => {
    const query = `Slider/GetForEdit?Key=${id}`
    const { data } = await axios.get(query);
    console.log(data.slider)
    return data?.slider
});

const createSlider = createAsyncThunk("sliders/createSlider", async formData => {
    const query = "Slider/Add"
    await axios.post(query, formData);
});

const updateSlider = createAsyncThunk("sliders/updateSlider", async formData => {
    const query = "Slider/Edit"
    await axios.put(query, formData);
});



export { getAllSliders, getSliderForEdit, createSlider, updateSlider };