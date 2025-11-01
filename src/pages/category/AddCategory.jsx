import { Button, Form, Input } from "antd";
import MainLayout from "../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAndUpdateCategory } from "../../features/actions/category/categoryActions";
import { toast } from "react-toastify";
import { capitalizeKeysToJson } from "../../helpers";

const AddCategory = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(stata => stata.categories);

  const onFinish = async (values) => {

    const data = {
      "@Name": values.Name?.trim() || '',
      "@Slug": values.Slug?.trim() || '',
      "@Description": values.Description?.trim() || '',
    };
    try {
      await dispatch(createAndUpdateCategory(data)).unwrap();
      toast.success('دسته بندی با موفقیت ایجاد شد');
      navigate('/categories');
    } catch (error) {
      toast.error(`خطا در ایجاد دسته بندی: ${error?.message || 'خطای ناشناخته'}`);
      console.error("Error creating doc:", error);
    }
  }


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("اطلاعات وارد شده صحیح نیستند");
  };


  return (
    <MainLayout>
      <div className='bg-white p-3 rounded-2xl shadow-lg'>
        <h1 className='font-medium text-xl'>ساخت دسته بندی جدید</h1>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className='mt-5'
          layout="vertical"
          autoComplete="off"

        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5'>
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
              <Input dir="ltr" placeholder="sports" />
            </Form.Item>
            <Form.Item
              name="Description"
              label="توضیحات"
              rules={[{ required: true, message: "وارد کردن توضیحات ضروری است" }]}
            >
              <Input placeholder="مثال : دسته بندی مقالات ورزشی" />
            </Form.Item>
          </div>
          <Form.Item className="mt-5" >
            <Button className="ml-3" type="primary" htmlType="submit" loading={loading}>
              ایجاد
            </Button>
            <Button type="default" htmlType="button"
              onClick={() => navigate("/categories")}
            >
              بازگشت
            </Button>
          </Form.Item>
        </Form>
      </div >
    </MainLayout >
  );
};

export default AddCategory;