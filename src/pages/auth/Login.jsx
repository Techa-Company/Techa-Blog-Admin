import { Form, Input, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../features/actions/auth/AuthActions';
import { toast } from 'react-toastify';

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async values => {
        console.log('Received values:', values);
        try {
            await dispatch(login(values))
            toast.success("به وبلاگ خوش آمدید.");
            navigate("/")
        } catch (error) {
            toast.error('عملیات با خطا مواجه شد.')
            console.log(error)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('background.jpg')" }}>
            <img src="https://pagedone.io/asset/uploads/1702362010.png" alt="gradient background image" className="w-full h-full object-cover fixed"></img>
            <div className="w-full max-w-md p-8 space-y-4 rounded-2xl shadow-2xl bg-white relative">
                <img src="https://pagedone.io/asset/uploads/1702362108.png" alt="pagedone logo" className="mx-auto mb-5 object-cover" />
                <h2 className="text-center text-3xl font-bold">ورود</h2>
                <Form
                    name="login"
                    onFinish={onFinish}
                    className="space-y-5"
                >
                    <Form.Item
                        name="phoneNumber"
                        rules={[{ required: true, message: 'لطفا شماره موبایل را وارد نمایید!' }]}
                    >
                        <Input placeholder="شماره موبایل" className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'لطفا رمز عبور را وارد نمایید!' }]}
                    >
                        <Input.Password placeholder="رمز عبور" autoComplete="password" className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </Form.Item>
                    {/* <Form.Item>
                        <a href="#" className="text-sm text-blue-500 hover:underline">Forgot password?</a>
                    </Form.Item> */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold">
                            ورود
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
