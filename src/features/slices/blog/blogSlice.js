import { createSlice } from "@reduxjs/toolkit";
import { getAllBlogs, getBlogForEdit } from "../../actions/blog/blogActions";


const initialState = {
    loading: false,
    blogs: [],
    selectedBlog: null,
    error: null
}

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addCase(getAllBlogs.pending, state => {
                state.loading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.blogs = payload;
            })
            .addCase(getAllBlogs.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            })
            // Handle fetching a blog by ID
            .addCase(getBlogForEdit.pending, (state) => {
                state.loading = true;
            })
            .addCase(getBlogForEdit.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedBlog = action.payload;
            })
            .addCase(getBlogForEdit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
})

export default blogSlice.reducer;