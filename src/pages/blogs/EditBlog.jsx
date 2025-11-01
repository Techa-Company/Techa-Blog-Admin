// import { Link } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import { Button, Input, InputNumber, Form, Select, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import BlogEditor from '../../components/BlogEditor';
import { useEffect, useRef } from 'react';
import Uploader from '../../components/Uploader';
import { useDispatch, useSelector } from 'react-redux';
import { createBlog, getBlogForEdit, updateBlog } from '../../features/actions/blog/blogActions';
import { useNavigate, useParams } from 'react-router-dom';
// import { getCategoriesForSelect } from '../../features/actions/category/categoryActions';



const EditBlog = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef(null)
    const dispatch = useDispatch();
    const imageLocation = useSelector(state => state.upload.location);
    const categories = useSelector(state => state.categories.select);
    const blog = useSelector(state => state.blogs.blogs.find(blog => blog.key == id))
    const [form] = Form.useForm();
    console.log(blog)

    useEffect(() => {
        // editorRef.current.setContent(blog.content)
        form.setFieldsValue(blog)
        console.log("Second")
    }, [blog, form, id])

    const onFinish = async values => {
        try {
            const categoriesKeys = values.categoriesKeys;
            delete values.categoriesKeys;
            values.key = id.toString();
            values.mainImageName = blog.mainImageName;
            values.content = editorRef.current.getContent();
            console.log('Success:', values);
            const data = { blog: values };
            data.mainAuthorId = 1;
            data.categoriesKeys = categoriesKeys;
            console.log(data);
            await dispatch(updateBlog(data));
            navigate("/blogs")
        } catch (error) {
            console.log(error.message)
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // useEffect(() => {
    //     dispatch(getCategoriesForSelect())
    // }, [dispatch])

    return (
        <MainLayout>
            <div className='bg-white p-3 rounded-2xl shadow-lg'>
                <h1 className='font-medium text-xl'>ویرایش مقاله</h1>
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={blog}
                    className='mt-5'
                    layout="vertical"
                    autoComplete="off"

                >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5'>
                        <Form.Item
                            name="preTitle"
                            label="پیش عنوان"
                            rules={[
                                {
                                    required: true,
                                    message: "وارد کردن پیش عنوان ضروری است",
                                },
                            ]}
                        >
                            <Input placeholder="پیش عنوان مقاله" />
                        </Form.Item>
                        <Form.Item
                            name="title"
                            label="عنوان"
                            rules={[
                                {
                                    required: true,
                                    message: "وارد کردن عنوان ضروری است",
                                },
                            ]}
                        >
                            <Input placeholder="عنوان مقاله" />
                        </Form.Item>
                        <Form.Item
                            name="subTitle"
                            label="عنوان فرعی"
                            rules={[
                                {
                                    required: true,
                                    message: "وارد کردن عنوان فرعی ضروری است",
                                },
                            ]}
                        >
                            <Input placeholder="عنوان فرعی مقاله" />
                        </Form.Item>
                    </div>
                    <div className='grid grid-cols-3 gap-5'>
                        <Form.Item
                            name="categoriesKeys"
                            label="دسته بندی"
                            rules={[
                                {
                                    required: true,
                                    message: "انتخاب کردن دسته بندی ضروری است",
                                },
                            ]}
                        >
                            <Select
                                mode='multiple'>
                                {
                                    categories.map(category => {
                                        return <Select.Option key={categories.key} value={category.key}>{category.title}</Select.Option>

                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="timeToRead"
                            label="زمان مطالعه"
                            rules={[
                                {
                                    required: true,
                                    type: "number",
                                    message: "وارد کردن زمان مطالعه ضروری است",
                                },
                            ]}
                        >
                            <InputNumber
                                className='w-full'
                                addonAfter="دقیقه"
                                controls
                            />
                        </Form.Item>
                        <Form.Item
                            name="ageRanges"
                            label="گروه سنی"
                            rules={[
                                {
                                    required: true,
                                    message: "وارد کردن گروه سنی ضروری است",
                                },
                            ]}
                        >
                            <Select
                                mode='multiple'>
                                <Select.Option value="NewBorn">کوچولو</Select.Option>
                                <Select.Option value="Bit">بزرگ</Select.Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='grid grid-cols-1'>
                        {/* <Form.Item
                            name="mainImageName"
                            label="عکس مقاله"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: "آپلود تصویر ضروری است",
                        //     },
                        // ]}
                        >
                            <Uploader />
                        </Form.Item> */}
                        <Form.Item name="summary" label="خلاصه"
                            rules={[
                                {
                                    required: true,
                                    message: "وارد کردن خلاصه مقاله ضروری است",
                                },
                            ]}
                        >
                            <Input.TextArea rows={10} placeholder='خلاصه مقاله' />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item name="content" label="محتوای مقاله"
                        >
                            <BlogEditor editorRef={editorRef} />
                        </Form.Item>
                    </div>
                    <Form.Item >
                        <Button className="ml-3" type="primary" htmlType="submit">
                            ویرایش
                        </Button>
                        <Button type="default" htmlType="button"
                            onClick={() => navigate("/blogs")}
                        >
                            بازگشت
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </MainLayout>
    );
};

export default EditBlog;
// const schema = yup.object().shape({
//     preTitle: yup.string().required("وارد کردن پیش عنوان ضروری است"),
//     title: yup.string().required("وارد کردن عنوان ضروری است"),
//     subTitle: yup.string().required("وارد کردن عنوان فرعی ضروری است"),
//     content: yup.string().required("وارد کردن محتوا ضروری است"),
//     timeToRead: yup.number().required("وارد کردن عنوان ضروری است"),
//     mainImageName: yup.string().required("آپلود تصویر ضروری است"),
//     summary: yup.number().required("وارد کردن خلاصه ضروری است"),
//     ageRanges: yup.string().required("وارد کردن گروه سنی ضروری است"),
// }).required();



// const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
// });