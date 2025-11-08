import { Button, Form, Input } from "antd";
import MainLayout from "../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { capitalizeKeysToJson, generateSlug } from "../../helpers";
import { createAndUpdateTag } from "../../features/actions/tag/tagActions";

const AddTag = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(stata => stata.tags);
  const [form] = Form.useForm();

  const onFinish = async (values) => {

    const data = {
      "@Name": values.Name?.trim() || '',
      "@Slug": values.Slug,
    };
    try {
      await dispatch(createAndUpdateTag(data)).unwrap();
      toast.success('برچسب با موفقیت ایجاد شد');
      navigate('/tags');
    } catch (error) {
      toast.error(`خطا در ایجاد برچسب: ${error?.message || 'خطای ناشناخته'}`);
      console.error("Error creating doc:", error);
    }
  }

  const onValuesChange = (changedValues, allValues) => {
    console.log("hi")
    // اگر عنوان تغییر کرد و اسلاگ خالی است، اسلاگ بساز
    if (changedValues.Name) {
      const slug = generateSlug(changedValues.Name);
      form.setFieldsValue({ Slug: slug });
      console.log(slug)
    }
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("اطلاعات وارد شده صحیح نیستند");
  };


  return (
    <MainLayout>
      <div className='bg-white p-3 rounded-2xl shadow-lg'>
        <h1 className='font-medium text-xl'>ساخت برچسب جدید</h1>
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
          <Form.Item className="mt-5" >
            <Button className="ml-3" type="primary" htmlType="submit" loading={loading}>
              ایجاد
            </Button>
            <Button type="default" htmlType="button"
              onClick={() => navigate("/tags")}
            >
              بازگشت
            </Button>
          </Form.Item>
        </Form>
      </div >
    </MainLayout >
  );
};

export default AddTag;