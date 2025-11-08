import { createSlice } from "@reduxjs/toolkit";
import { createAndUpdateTag, deleteTag, getAllTags, getTagById } from "../../actions/tag/tagActions";


const initialState = {
    loading: false,
    tags: [],
    selectedTag: null, // برای نگهداری یک دسته‌بندی خاص
    error: null,
};

const tagSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {
        // می‌توانیم ریسِت selectedTag را هم تعریف کنیم
        clearSelectedTag: (state) => {
            state.selectedTag = null;
        },
    },
    extraReducers: (builder) => {
        // ================== GET ALL ==================
        builder
            .addCase(getAllTags.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllTags.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.tags = payload;
            })
            .addCase(getAllTags.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // ================== GET BY ID ==================
        builder
            .addCase(getTagById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedTag = null;
            })
            .addCase(getTagById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.selectedTag = payload;
            })
            .addCase(getTagById.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.selectedTag = null;
            });
        // ================== CREATE / UPDATE ==================
        builder
            .addCase(createAndUpdateTag.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAndUpdateTag.fulfilled, (state, { payload }) => {
                state.loading = false;
                // اگر payload شامل Id باشد، رکورد را آپدیت یا اضافه می‌کنیم
                if (payload?.Id) {
                    const index = state.tags.findIndex(
                        (c) => c.Id === payload.Id
                    );
                    if (index >= 0) {
                        state.tags[index] = payload;
                    } else {
                        state.tags.push(payload);
                    }
                }
            })
            .addCase(createAndUpdateTag.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // ================== DELETE ==================
        builder
            .addCase(deleteTag.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTag.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (payload?.Id) {
                    state.tags = state.tags.filter(
                        (c) => c.Id != payload.Id
                    );
                }
            })
            .addCase(deleteTag.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export const { clearSelectedTag } = tagSlice.actions;

export default tagSlice.reducer;
