import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isDarkMode:
        localStorage.getItem("isDarkMode") != undefined
            ? JSON.parse(localStorage.getItem("isDarkMode"))
            : false
}

export const themeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        changeMode: state => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem("isDarkMode", state.isDarkMode);
        }
    }
})

export const { changeMode } = themeSlice.actions;
export default themeSlice.reducer;