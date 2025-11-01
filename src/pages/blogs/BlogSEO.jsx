import { } from "@ant-design/icons";
import { Button, Form, Input, Divider, Select, Modal, notification } from "antd";
import { useDispatch } from "react-redux";
import { createBlogSeo } from "../../features/actions/blog/seoActions";

export default function BlogSEO({ open, setOpen, blogId }) {

  const dispatch = useDispatch();
  const handleCancel = () => {
    setOpen(false);
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    if (type === "success") {
      return api[type]({
        message: 'سئو مقاله با موفقیت ایجاد شد.',
      });
    }
    else {
      return api[type]({
        message: 'عملیات با شکست مواجه شد.',
      });
    }
  };
  const onFinish = async values => {
    console.log('Received values:', values);
    values.refreshTime = 2;
    values.key = blogId;
    values.structuredJsonData = " ";
    values.customMetaTags = " "
    values.keyWords = values.keyWords.toString();
    const data = { seo: values };
    try {
      await dispatch(createBlogSeo(data))
      openNotificationWithIcon("success")
    } catch (error) {
      openNotificationWithIcon("error")
    }
    setOpen(false);
  };


  return (
    <>
      {contextHolder}
      <Modal
        title="افزودن عناوین سئو"
        open={open}
        footer={null}
        onCancel={handleCancel}
        destroyOnClose={true} // Optional: to clear fields on close
      >
        <Form
          layout="vertical"
          className="w-full"
          onFinish={onFinish}
        >


          <Divider />
          <div className="grid grid-cols-2 gap-5">
            <Form.Item name="headTitle" label="عنوان" rules={[
              {
                required: true,
                message: "وارد کردن عناوین ضروری است",
              },
            ]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="keyWords"
              label="کلمات کلیدی"
              rules={[
                {
                  required: true,
                  message: "وارد کردن کلمات کلیدی ضروری است",
                },
              ]}
            >
              <Select mode="tags" />
            </Form.Item>
          </div>
          <div>
            <Form.Item name="descriptions" label="خلاصه"
              rules={[
                {
                  required: true,
                  message: "وارد کردن خلاصه مقاله ضروری است",
                },
              ]}
            >
              <Input.TextArea rows={7} placeholder='خلاصه مقاله' />
            </Form.Item>
          </div>
          <div className="flex justify-end">
            <Form.Item >
              <Button type="primary" htmlType="submit">
                افزودن
              </Button>
            </Form.Item>
            <Form.Item >
              <Button style={{ marginRight: '14px' }} onClick={handleCancel}>
                بازگشت
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal >
    </>
  );
}
