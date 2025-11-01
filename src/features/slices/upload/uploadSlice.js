// features/imageUploadSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { uploadImage } from '../../actions/upload/uploadActions';

const initialState = {
    loading: false,
    location: "",
    error: null
}

const uploadSlice = createSlice({
    name: 'upload',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(uploadImage.pending, state => {
                state.loading = true;
            })
            .addCase(uploadImage.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.location = payload
            })
            .addCase(uploadImage.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload
            })
});

export default uploadSlice.reducer;
