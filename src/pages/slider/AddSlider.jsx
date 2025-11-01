// import { Link } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import { Button, Input, Form, DatePicker, ColorPicker } from 'antd';
import Uploader from '../../components/Uploader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createSlider } from '../../features/actions/slider/sliderActions';



const AddSlider = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageLocation = useSelector(state => state.upload.location);
    const [color, setColor] = useState('#ffffff'); // Default color
    const [date, setDate] = useState('#ffffff'); // Default color

    const handleColorChange = (_, color) => {
        setColor(color);
    };

    const handleDateChange = (_, date) => {
        setDate(date);
    }
    const onFinish = async values => {
        try {
            values.imageFileName = imageLocation;
            values.backgroundColor = color;
            values.expiration = date;
            console.log('Success:', values);
            const data = { slider: values };
            console.log(data);
            await dispatch(createSlider(data));
            navigate("/sliders")
        } catch (error) {
            console.log(error.message)
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        console.log(errorInfo.values.expiration)
        console.log(color)
    };

    return (
        <MainLayout>
            <div className='bg-white p-3 rounded-2xl shadow-lg'>
                <h1 className='font-medium text-xl'>ساخت اسلایدر جدید</h1>
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className='mt-5'
                    layout="vertical"
                    autoComplete="off"

                >
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5'>
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
                            <Input placeholder="عنوان اسلایدر" />
                        </Form.Item>
                        <Form.Item
                            name="uri"
                            label="آدرس لینک"
                            rules={[
                                {
                                    required: true,
                                    message: "وارد کردن آدرس لینک ضروری است",
                                },
                            ]}
                        >
                            <Input placeholder="آدرس لینک اسلاید" />
                        </Form.Item>
                        <Form.Item
                            name="uriText"
                            label="متن لینک"
                            rules={[
                                {
                                    required: true,
                                    message: "وارد کردن متن لینک ضروری است",
                                },
                            ]}
                        >
                            <Input placeholder="متن لینک اسلایدر" />
                        </Form.Item>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                        <Form.Item
                            name="imageFileName"
                            label="عکس اسلایدر"
                        >
                            <Uploader />
                        </Form.Item>
                        <Form.Item name="expiration" label="تاریخ انقضا"
                            rules={[
                                {
                                    required: true,
                                    message: "وارد کردن تاریخ انقضا اسلایدر ضروری است",
                                },
                            ]}
                        >
                            <DatePicker className='w-full'
                                placeholder='تاریخ انقضا اسلایدر'
                                onChange={handleDateChange}

                            />
                        </Form.Item>
                        <Form.Item name="backgroundColor" label="رنگ پس زمینه"
                            rules={[
                                {
                                    required: true,
                                    message: "وارد کردن رنگ پس زمینه اسلایدر ضروری است",
                                },
                            ]}
                        >
                            <ColorPicker color={color}
                                defaultValue="#000"
                                onChange={handleColorChange}
                            />
                        </Form.Item>
                    </div>

                    <Form.Item >
                        <Button className="ml-3" type="primary" htmlType="submit">
                            ایجاد
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

export default AddSlider;
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