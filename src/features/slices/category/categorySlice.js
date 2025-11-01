import { createSlice } from "@reduxjs/toolkit";
import {
    getAllCategories,
    createAndUpdateCategory,
    deleteCategory,
    getCategoryById,
} from "../../actions/category/categoryActions";

const initialState = {
    loading: false,
    categories: [],
    selectedCategory: null, // برای نگهداری یک دسته‌بندی خاص
    error: null,
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        // می‌توانیم ریسِت selectedCategory را هم تعریف کنیم
        clearSelectedCategory: (state) => {
            state.selectedCategory = null;
        },
    },
    extraReducers: (builder) => {
        // ================== GET ALL ==================
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.categories = payload;
            })
            .addCase(getAllCategories.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // ================== GET BY ID ==================
        builder
            .addCase(getCategoryById.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.selectedCategory = null;
            })
            .addCase(getCategoryById.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.selectedCategory = payload;
            })
            .addCase(getCategoryById.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
                state.selectedCategory = null;
            });
        // ================== CREATE / UPDATE ==================
        builder
            .addCase(createAndUpdateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createAndUpdateCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                // اگر payload شامل Id باشد، رکورد را آپدیت یا اضافه می‌کنیم
                if (payload?.Id) {
                    const index = state.categories.findIndex(
                        (c) => c.Id === payload.Id
                    );
                    if (index >= 0) {
                        state.categories[index] = payload;
                    } else {
                        state.categories.push(payload);
                    }
                }
            })
            .addCase(createAndUpdateCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });

        // ================== DELETE ==================
        builder
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, { payload }) => {
                state.loading = false;
                if (payload?.Id) {
                    state.categories = state.categories.filter(
                        (c) => c.Id != payload.Id
                    );
                }
            })
            .addCase(deleteCategory.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    },
});

export const { clearSelectedCategory } = categorySlice.actions;

export default categorySlice.reducer;
