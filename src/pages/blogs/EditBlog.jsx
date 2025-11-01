import MainLayout from '../layout/MainLayout';
import { Button, Input, InputNumber, Form, Select } from 'antd';
import BlogEditor from '../../components/BlogEditor';
import { useEffect, useRef } from 'react';
import Uploader from '../../components/Uploader';
import { useDispatch, useSelector } from 'react-redux';
import { createAndUpdatePost, getPostById } from '../../features/actions/blog/blogActions';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCategories } from '../../features/actions/category/categoryActions';

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categories);
    const { id: uploadId } = useSelector(state => state.upload);
    const { selectedPost, loading } = useSelector(state => state.posts);
    const [form] = Form.useForm();
    console.log(selectedPost)
    useEffect(() => {
        dispatch(getAllCategories());
    }, [dispatch]);
    useEffect(() => {
        if (id) {
            dispatch(getPostById({ "@Id": Number(id) }));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (selectedPost) {
            form.setFieldsValue({
                CategoryId: selectedPost.CategoryId,
                Title: selectedPost.Title,
                Slug: selectedPost.Slug,
                Summary: selectedPost.Summary,
                Status: selectedPost.Status,
                MetaTitle: selectedPost.MetaTitle,
                KeyWords: selectedPost.KeyWords ? selectedPost.KeyWords.split(",") : [],
                MetaDescription: selectedPost.MetaDescription,
                // ThumbnailId: selectedPost.ThumbnailUrl || "mox",
                PublishedAt: selectedPost.PublishedAt
                    ? selectedPost.PublishedAt.replace("T", " ").slice(0, 16)
                    : null,
                TimeToRead: selectedPost.TimeToRead
            });
            if (editorRef.current) {
                editorRef.current.setContent(selectedPost.Body || "");
            }
        }
    }, [selectedPost, form]);

    const onFinish = async (values) => {
        try {
            const data = {
                Id: selectedPost.Id,
                AuthorId: selectedPost.AuthorId || 9,
                CategoryId: values.CategoryId,
                Title: values.Title?.trim(),
                Slug: values.Slug?.trim(),
                Summary: values.Summary?.trim(),
                Body: editorRef.current.getContent(),
                ThumbnailId: uploadId || selectedPost.ThumbnailId,
                Status: values.Status,
                MetaTitle: values.MetaTitle,
                KeyWords: values.KeyWords.join(","),
                MetaDescription: values.MetaDescription,
                PublishedAt: values.PublishedAt
                    ? new Date(values.PublishedAt).toISOString().slice(0, 19).replace("T", " ")
                    : null,
                TimeToRead: values.TimeToRead || 0
            };

            await dispatch(createAndUpdatePost(data)).unwrap();
            navigate("/blogs");
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    return (
        <MainLayout>
            <div className="bg-white p-3 rounded-2xl shadow-lg">
                <h1 className="font-medium text-xl">ویرایش پست</h1>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    className="mt-5"
                >
                    {/* بخش بالایی */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
                        <Form.Item
                            name="CategoryId"
                            label="دسته بندی"
                            rules={[{ required: true, message: "انتخاب دسته بندی ضروری است" }]}
                        >
                            <Select placeholder="انتخاب دسته بندی">
                                {categories.map(cat => (
                                    <Select.Option key={cat.Id} value={cat.Id}>
                                        {cat.Name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="Title"
                            label="عنوان"
                            rules={[{ required: true, message: "عنوان الزامی است" }]}
                        >
                            <Input placeholder="عنوان پست" />
                        </Form.Item>

                        <Form.Item
                            name="Slug"
                            label="نامک"
                            rules={[{ required: true, message: "نامک الزامی است" }]}
                        >
                            <Input dir="ltr" placeholder="نامک پست" />
                        </Form.Item>
                    </div>

                    {/* اطلاعات زمان، وضعیت، زمان مطالعه */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
                        <Form.Item
                            name="Status"
                            label="وضعیت"
                            rules={[{ required: true, message: "انتخاب وضعیت الزامی است" }]}
                        >
                            <Select placeholder="انتخاب وضعیت">
                                <Select.Option value="Draft">پیش‌نویس</Select.Option>
                                <Select.Option value="Published">منتشر شده</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="PublishedAt" label="تاریخ انتشار">
                            <Input type="datetime-local" />
                        </Form.Item>
                        <Form.Item name="TimeToRead" label="زمان مطالعه (دقیقه)">
                            <InputNumber min={0} className="w-full" />
                        </Form.Item>
                    </div>

                    {/* سئو */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
                        <Form.Item name="MetaTitle" label="عنوان سئو">
                            <Input placeholder="عنوان سئو" />
                        </Form.Item>

                        <Form.Item name="KeyWords" label="کلمات کلیدی">
                            <Select mode="tags" placeholder="کلمات کلیدی" />
                        </Form.Item>

                        <Form.Item name="MetaDescription" label="Meta Description">
                            <Input placeholder="توضیح متا" />
                        </Form.Item>
                    </div>

                    {/* آپلود و خلاصه */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">
                        <Form.Item name="ThumbnailId" label="تصویر اصلی پست">
                            <Uploader />
                        </Form.Item>
                        <Form.Item name="Summary" label="خلاصه">
                            <Input.TextArea rows={7} placeholder="خلاصه پست" />
                        </Form.Item>
                    </div>

                    {/* محتوای اصلی */}
                    <Form.Item name="Body" label="محتوا">
                        <BlogEditor editorRef={editorRef} />
                    </Form.Item>

                    {/* دکمه‌ها */}
                    <Form.Item className="mt-5">
                        <Button className="ml-3" type="primary" htmlType="submit">
                            ویرایش
                        </Button>
                        <Button
                            type="default"
                            htmlType="button"
                            onClick={() => navigate("/blogs")}
                            className="ml-3"
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
