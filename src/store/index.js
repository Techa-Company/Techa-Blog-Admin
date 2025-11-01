import { configureStore } from "@reduxjs/toolkit"
import { themeSlice } from "../features/slices/theme/themeSlice"
import postReducer from "../features/slices/blog/blogSlice"
import uploadReducer from "../features/slices/upload/uploadSlice"
import categoryReducer from "../features/slices/category/categorySlice";
import seoReducer from "../features/slices/blog/seoSlice"
import sliderReducer from "../features/slices/slider/sliderSlice"

export const store = configureStore({
    reducer: {
        darkMode: themeSlice.reducer,
        posts: postReducer,
        upload: uploadReducer,
        seo: seoReducer,
        categories: categoryReducer,
        sliders: sliderReducer,
    }
})