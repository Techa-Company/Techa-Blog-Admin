import { createAsyncThunk } from "@reduxjs/toolkit";
import { SP_fetch } from "../../../services/api";

export const getAllCategories = createAsyncThunk(
    'docs/getAllCategories',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Categories', parameters)
            console.log(res.Data.Dataset)
            return res.Data.Dataset
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const getCategoryById = createAsyncThunk(
    "docs/getCategoryById",
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch("Form_Categories", parameters);
            return res.Data.Dataset?.[0] || null;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const createAndUpdateCategory = createAsyncThunk(
    'docs/createAndUpdateCategory',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_Categories', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteCategory = createAsyncThunk(
    'docs/deleteCategory',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Delete_Categories', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)