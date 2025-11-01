import { createAsyncThunk } from "@reduxjs/toolkit";
import { SP_fetch } from "../../../services/api";

export const getAllPosts = createAsyncThunk(
    'docs/getAllPosts',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Report_Posts', parameters)
            console.log(res.Data.Dataset)
            return res.Data.Dataset
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
)

export const getPostById = createAsyncThunk(
    "docs/getPostById",
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch("Form_Posts", parameters);
            return res.Data.Dataset?.[0] || null;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const createAndUpdatePost = createAsyncThunk(
    'docs/createAndUpdatePost',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Save_Posts', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)

export const deletePost = createAsyncThunk(
    'docs/deletePost',
    async (parameters, thunkAPI) => {
        try {
            const res = await SP_fetch('Delete_Posts', parameters)
            console.log(res)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)