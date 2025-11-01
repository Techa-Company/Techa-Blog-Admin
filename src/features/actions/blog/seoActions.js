import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getBlogSeo = createAsyncThunk("blogs/getBlogSeo", async blogId => {
    const query = `Blog/GetBlogSeo?Key=${blogId}`
    const { data } = await axios.get(query);
    console.log(data?.seo)
    return data?.seo;
});

const createBlogSeo = createAsyncThunk("blogs/createBlog", async formData => {
    const query = "Blog/SetBlogSeo"
    await axios.post(query, formData);
});

export { getBlogSeo, createBlogSeo };