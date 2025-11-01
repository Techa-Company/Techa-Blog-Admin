import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllBlogs = createAsyncThunk("blogs/getAllBlogs", async () => {
    const query = "Blog/GetBlogsForAdmin?PageIndex=1&PageSize=10"
    const { data } = await axios.get(query);
    console.log(data?.blogs?.items)
    return data?.blogs?.items;
});

const getBlogForEdit = createAsyncThunk("blogs/getBlogForEdit", async id => {
    const query = `Blog/GetBlogForEdit?Key=${id}`
    const { data } = await axios.get(query);
    console.log(data.blog)
    return data?.blog
});

const createBlog = createAsyncThunk("blogs/createBlog", async formData => {
    const query = "Blog/PostBlog"
    await axios.post(query, formData);
});

const updateBlog = createAsyncThunk("blogs/updateBlog", async formData => {
    const query = "Blog/EditBlog"
    await axios.put(query, formData);
});

export { getAllBlogs, createBlog, getBlogForEdit, updateBlog };