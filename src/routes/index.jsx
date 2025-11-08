import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AddBlog from "../pages/blogs/AddBlog";
import ListOfBlogs from "../pages/blogs/ListOfBlogs";
import BlogDetails from "../pages/blogs/BlogDetails";
import EditBlog from "../pages/blogs/EditBlog";
import Categories from "../pages/category/Categories";
import AddCategory from "../pages/category/AddCategory";
import EditCategory from "../pages/category/EditCategory";
import Sliders from "../pages/slider/Sliders";
import AddSlider from "../pages/slider/AddSlider";
import EditSlider from "../pages/slider/EditSlider";
import Login from "../pages/auth/Login";
// import ProtectedRoute from "../components/ProtectedRoute";
import NotFound from "../pages/errors/NotFound";
import Tags from "../pages/tag/Tags";
import AddTag from "../pages/tag/AddTag";
import EditTag from "../pages/tag/EditTag";
// import Login from "../pages/auth/Login";
// import SendCode from "../pages/auth/SendCode";
// import Home from "../pages/home/Home";
// import ProtectedRoute from "../components/auth/ProtectedRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element:
            // <ProtectedRoute>
            <Dashboard />
        // </ProtectedRoute>,
    },
    {
        path: "/dashboard",
        element:
            // <ProtectedRoute>
            <Dashboard />
        // </ProtectedRoute>,
    },
    {
        path: "/categories",
        element:
            // <ProtectedRoute>
            <Categories />
        // </ProtectedRoute>
    },
    {
        path: "/categories/new",
        element:
            // <ProtectedRoute>
            <AddCategory />
        // </ProtectedRoute>
    },
    {
        path: "/categories/edit/:id",
        element:
            // <ProtectedRoute>
            <EditCategory />
        // </ProtectedRoute>
    },
    {
        path: "/blogs",
        element:
            // <ProtectedRoute>
            <ListOfBlogs />
        // </ProtectedRoute>
    },
    {
        path: "/blogs/:id",
        element:
            // <ProtectedRoute>
            <BlogDetails />
        // </ProtectedRoute>
    },
    {
        path: "/blogs/new",
        element:
            // <ProtectedRoute>
            <AddBlog />
        // </ProtectedRoute>
    },
    {
        path: "/blogs/edit/:id",
        element:
            // <ProtectedRoute>
            <EditBlog />
        // </ProtectedRoute>
    },
    {
        path: "/tags",
        element:
            // <ProtectedRoute>
            <Tags />
        // </ProtectedRoute>
    },
    {
        path: "/tags/new",
        element:
            // <ProtectedRoute>
            <AddTag />
        // </ProtectedRoute>
    },
    {
        path: "/tags/edit/:id",
        element:
            // <ProtectedRoute>
            <EditTag />
        // </ProtectedRoute>
    },
    {
        path: "/sliders",
        element:
            // <ProtectedRoute>
            <Sliders />
        // </ProtectedRoute>
    },
    {
        path: "/sliders/new",
        element:
            // <ProtectedRoute>
            <AddSlider />
        // </ProtectedRoute>
    },
    {
        path: "/sliders/edit/:id",
        element:
            // <ProtectedRoute>
            <EditSlider />
        // </ProtectedRoute>
    },
    {
        path: "/login",
        element: < Login />,
    },
    {
        path: "*",
        element: < NotFound />,
    },
]);