import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Popconfirm, Spin, Table, theme, message, Space } from 'antd';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import usePagination from '../../hooks/usePagination';
import MainLayout from '../layout/MainLayout';
import Icon from '../../components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, getAllPosts } from '../../features/actions/blog/blogActions';
import BlogSEO from './BlogSEO';
import { toast } from 'react-toastify';

const { useToken } = theme;

function Actions({ id, setOpen, setBlogId }) {
    const { token } = useToken();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const handleBlogSeo = id => {
        setBlogId(id);
        setOpen(true);
    };
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            await dispatch(deletePost({ "Id": id })).unwrap();
            toast.success("پست با موفقیت حذف شد");
            dispatch(getAllPosts())
        } catch (error) {
            toast.error(`خطا در حذف پست: ${error?.message || "خطای ناشناخته"}`);
        }
    };

    return (
        <Space size="middle">
            {contextHolder}
            <Button
                onClick={() => handleBlogSeo(id)}
                icon={<Icon name="plus" color={token.colorSuccess} />}
                size="middle"
                type="text"
            />
            <Button
                onClick={() => navigate(`edit/${id}`)}
                icon={<Icon name="pen" color={token.colorInfo} />}
                size="middle"
                type="text"
            />
            <Popconfirm
                title="حذف پست"
                description="از پاک کردن این پست مطمئن هستید؟"
                okText="حذف"
                cancelText="لغو"
                okButtonProps={{ danger: true }}
                onConfirm={handleDelete}
                icon={<QuestionCircleOutlined style={{ color: token["red-6"] }} />}
            >
                <Button
                    icon={<Icon name="trash-2" color={token["red-6"]} />}
                    size="middle"
                    type="text"
                />
            </Popconfirm>
        </Space>
    );
}

const ListOfBlogs = () => {
    const [open, setOpen] = useState(false);
    const [blogId, setBlogId] = useState("");
    const [search, setSearch] = useState("");
    const pagination = usePagination();

    const dispatch = useDispatch();
    const { loading, posts } = useSelector(state => state.posts);

    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);

    // تبدیل وضعیت انگلیسی به فارسی
    const translateStatus = status => {
        switch (status) {
            case "Published":
                return "منتشر شده";
            case "Draft":
                return "پیش‌نویس";
            default:
                return status;
        }
    };

    // فیلتر بر اساس سرچ
    const filteredPosts = posts
        ?.filter(post =>
            post.Title.toLowerCase().includes(search.toLowerCase())
        )
        .map(post => ({
            key: post.Id,
            title: post.Title,
            timeToRead: Math.ceil(post.Body.split(" ").length / 200) || 1,
            Status: translateStatus(post.Status),
            ViewCount: post.ViewCount,
            PublishedAt: post.PublishedAt ? new Date(post.PublishedAt).toLocaleDateString("fa-IR") : "—",
            settings: { Status: post.Status },
        }));

    const columns = [
        {
            title: "ردیف",
            dataIndex: "key",
            key: "key",
            render: (_, __, index) => <span>{index + 1}</span>,
        },
        {
            title: "عنوان",
            dataIndex: "title",
            key: "title",
            render: (_, record) => (
                <Link to={`${record.key}`}>
                    {record.title}
                </Link>
            ),
        },
        {
            title: "زمان مطالعه",
            dataIndex: "timeToRead",
            key: "timeToRead",
            render: item => <span>{`${item} دقیقه`}</span>,
        },
        {
            title: "وضعیت",
            dataIndex: "Status",
            key: "Status",
            render: status => <span>{status}</span>,
        },
        {
            title: "تعداد بازدید",
            dataIndex: "ViewCount",
            key: "ViewCount",
            render: count => <span>{count}</span>,
        },
        {
            title: "تاریخ انتشار",
            dataIndex: "PublishedAt",
            key: "PublishedAt",
            render: date => <span>{date}</span>,
        },
        {
            title: "گزینه‌ها",
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <Actions
                    setBlogId={setBlogId}
                    id={record.key}
                    settings={record.settings}
                    setOpen={setOpen}
                />
            ),
        },
    ];

    return (
        <MainLayout>
            <Space direction="vertical" size="large">
                <Space size="large">
                    <Link to="./new">
                        <Button type="primary" icon={<PlusOutlined />}>
                            پست جدید
                        </Button>
                    </Link>
                    <Input.Search
                        placeholder="جستجو"
                        allowClear
                        enterButton
                        onSearch={value => setSearch(value)}
                    />
                </Space>

                <Spin spinning={loading} size="large" style={{ height: 600 }}>
                    <Table
                        bordered
                        dataSource={filteredPosts}
                        columns={columns}
                        pagination={{
                            ...pagination,
                            total: filteredPosts?.length || 0,
                            showSizeChanger: true,
                        }}
                    />
                </Spin>
            </Space>
            <BlogSEO setOpen={setOpen} open={open} blogId={blogId} />
        </MainLayout>
    );
};

export default ListOfBlogs;
