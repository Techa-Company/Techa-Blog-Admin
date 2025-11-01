import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadImage = createAsyncThunk("blogs/uploadImage", async (file) => {
    const query = "File/UploadFile"
    const { data } = await axios.post(query, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    console.log(data.location)
    return data.location;
});
