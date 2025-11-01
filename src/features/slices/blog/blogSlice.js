import { createSlice } from "@reduxjs/toolkit";
import {
    getAllPosts,
    getPostById,
    createAndUpdatePost,
    deletePost,
} from "../../actions/blog/blogActions";

const initialState = {
    loading: false,
    posts: [],
    selectedPost: null,
    error: null,
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // ================== GET ALL POSTS ==================
        builder
            .addCase(getAllPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPosts.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.posts = payload;
            })
            .addCase(getAllPosts.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // ================== GET POST BY ID ==================
        builder
            .addCase(getPostById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPostById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.selectedPost = payload;
            })
            .addCase(getPostById.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // ================== CREATE / UPDATE POST ==================
        builder
            .addCase(createAndUpdatePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAndUpdatePost.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (payload?.Id) {
                    const index = state.posts.findIndex((p) => p.Id === payload.Id);
                    if (index >= 0) {
                        // ویرایش
                        state.posts[index] = payload;
                    } else {
                        // ایجاد جدید
                        state.posts.push(payload);
                    }
                }
            })
            .addCase(createAndUpdatePost.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // ================== DELETE POST ==================
        builder
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (payload?.Id) {
                    state.posts = state.posts.filter((p) => p.Id !== payload.Id);
                }
            })
            .addCase(deletePost.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export default postSlice.reducer;
