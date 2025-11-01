import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadImage = createAsyncThunk("blogs/uploadImage", async (file) => {
    const query = "https://api.techa.me/api/FileUpload"
    const { data } = await axios.post(query, file, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    console.log(data)
    return data.Id;
});
