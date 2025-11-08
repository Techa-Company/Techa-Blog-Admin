import { Button, Form, Input, message } from "antd";
import MainLayout from "../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getCategoryById, createAndUpdateCategory } from "../../features/actions/category/categoryActions";
import { createAndUpdateTag, getTagById } from "../../features/actions/tag/tagActions";
import { generateSlug } from "../../helpers";

const EditTag = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedTag, loading } = useSelector(state => state.tags);
  const [form] = Form.useForm();

  // دریافت اطلاعات دسته‌بندی با SP
  useEffect(() => {
    if (id) {
      dispatch(getTagById({ "@Id": Number(id) }));
    }
  }, [id, dispatch]);

  // پر کردن فرم پس از دریافت داده‌ها
  useEffect(() => {
    if (selectedTag) {
      form.setFieldsValue({
        Name: selectedTag.Name,
        Slug: selectedTag.Slug,
      });
    }
  }, [selectedTag, form]);

  const onValuesChange = (changedValues, allValues) => {
    console.log("hi")
    // اگر عنوان تغییر کرد و اسلاگ خالی است، اسلاگ بساز
    if (changedValues.Name) {
      const slug = generateSlug(changedValues.Name);
      form.setFieldsValue({ Slug: slug });
      console.log(slug)
    }
  };

  const onFinish = async (values) => {
    const data = {
      "@Id": Number(id),
      "@Name": values.Name?.trim() || '',
      "@Slug": values.Slug,
    };
    try {
      await dispatch(createAndUpdateTag(data)).unwrap();
      toast.success('برچسب با موفقیت ویرایش شد');
      navigate('/tags');
    } catch (error) {
      toast.error(`خطا در ویرایش برچسب: ${error?.message || 'خطای ناشناخته'}`);
      console.error("Error updating category:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error("اطلاعات وارد شده صحیح نیستند");
  };

  return (
    <MainLayout>
      <div className='bg-white p-3 rounded-2xl shadow-lg'>
        <h1 className='font-medium text-xl'>ویرایش برچسب</h1>
        <Form
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className='mt-5'
          layout="vertical"
          autoComplete="off"
          onValuesChange={onValuesChange}


        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5'>
            <Form.Item
              name="Name"
              label="عنوان"
              rules={[{ required: true, message: "وارد کردن عنوان ضروری است" }]}
            >
              <Input placeholder="مثال : ورزشی" />
            </Form.Item>
            <Form.Item
              name="Slug"
              label="نامک"
              rules={[{ required: true, message: "وارد کردن نامک ضروری است" }]}
            >
              <Input dir="ltr" placeholder="sports" readOnly />
            </Form.Item>
          </div>
          <Form.Item className="mt-5">
            <Button className="ml-3" type="primary" htmlType="submit" loading={loading}>
              ویرایش
            </Button>
            <Button type="default" htmlType="button" onClick={() => navigate("/tags")}>
              بازگشت
            </Button>
          </Form.Item>
        </Form>
      </div>
    </MainLayout>
  );
};

export default EditTag;
