import { createAsyncThunk } from "@reduxjs/toolkit";
import { SP_fetch } from "../../../services/api";

export const getAllTags = createAsyncThunk(
    'docs/getAllTags',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Tags', parameters)
            console.log(res.Data.Dataset)
            return res.Data.Dataset
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const getTagById = createAsyncThunk(
    "docs/getTagById",
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch("Form_Tags", parameters);
            return res.Data.Dataset?.[0] || null;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const createAndUpdateTag = createAsyncThunk(
    'docs/createAndUpdateTag',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_Tags', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deleteTag = createAsyncThunk(
    'docs/deleteTag',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Delete_Tags', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)