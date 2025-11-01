import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Input, Popconfirm, Popover, Spin, Table, theme, message, Space } from 'antd';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import usePagination from '../../hooks/usePagination';
import MainLayout from '../layout/MainLayout';
import Icon from '../../components/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs } from '../../features/actions/blog/blogActions';
import BlogSEO from './BlogSEO';

const settings_items = [
    { label: "نمایش نوت ها", value: "showNotes" },
    { label: "نمایش امتیازات", value: "showRatings" },
    { label: "نمایش تاریخ ایجاد", value: "showCreation" },
    { label: "نمایش تاریخ آپدیت", value: "showLastUpadte" },
    { label: "نمایش تعداد بازدید", value: "showViewState" },
];

function Actions({ id, settings, setOpen, setBlogId }) {
    const { token } = theme.useToken();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const handleBlogSeo = id => {
        setBlogId(id);
        setOpen(true)
    }
    return (
        <Space size="middle">
            {contextHolder}
            {/* <Dropdown
                menu={{
                    items: [

                        { label: "افزودن عناوین سئو", key: "seo" },
                    ],
                }}
                trigger={["click"]}
            > */}
            <Button
                onClick={() => handleBlogSeo(id)}
                icon={<Icon name="plus" color={token.colorSuccess} />}
                size="middle"
                type="text"
            />
            {/* </Dropdown> */}
            {/* <Dropdown
                menu={{
                    items: [
                        {
                            label: (
                                <Link
                                    to={`edit/${id}`}
                                >
                                    ویرایش محتوا
                                </Link>
                            ),
                        },
                        { label: "ویرایش مشخصات", key: "details" },
                        { label: "ویرایش عناوین سئو", key: "seo" },
                    ],
                }}
                trigger={["click"]}
            >
            </Dropdown> */}
            <Button
                onClick={() => navigate(`edit/${id}`)}
                icon={<Icon name="pen" color={token.colorInfo} />}
                size="middle"
                type="text"
            />

            <Popconfirm
                title="حدف مقاله"
                description="از پاک این مقاله مطمئن هستید؟"
                okText="حذف"
                cancelText="لغو"
                okButtonProps={{
                    danger: true,
                }}
                onConfirm={() => {
                    messageApi.open({ type: "info", content: "مقاله حذف شد" });
                }}
                icon={<QuestionCircleOutlined style={{ color: token["red-6"] }} />}
            >
                <Button
                    icon={<Icon name="trash-2" color={token["red-6"]} />}
                    size="middle"
                    type="text"
                />
            </Popconfirm>
            {/* <Popover
                trigger={"click"}
                content={
                    <Space direction="vertical">
                        <Checkbox.Group
                            className="flex flex-col gap-5"
                            options={settings_items}
                            defaultValue={settings}
                        />
                    </Space>
                }
            >
                <Button
                    type="text"
                    size="middle"
                    icon={<Icon name="settings" />}
                />
            </Popover> */}
        </Space>
    );
}

const ListOfBlogs = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [blogId, setBlogId] = useState("");
    const { loading, blogs } = useSelector(state => state.blogs);


    useEffect(() => {
        dispatch(getAllBlogs())
    }, [dispatch]);


    const columns = [
        {
            title: "ردیف",
            dataIndex: "key",
            key: "key",
            render: (_, record, index) => <span>{index + 1}</span>,
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
            dataIndex: "settings",
            key: "settings",
            render: item => <span>{item.state}</span>,
        },
        {
            title: "گزینه ها",
            dataIndex: "action",
            key: "action",
            render: (id, record) => <Actions setBlogId={setBlogId} id={record.key} settings={record.settings} setOpen={setOpen} />,
        },
    ];

    const pagination = usePagination();
    const [search, setSearch] = useState("");
    // const { data, isLoading, total } = useBlogs({ pagination, title: search });
    let isLoading;
    let total;
    console.log(open)



    return (
        <MainLayout>
            <Space direction="vertical" size="large">
                <Space size="large">
                    <Link to="./new">
                        <Button type="primary" icon={<PlusOutlined />}>
                            مقاله جدید
                        </Button>
                    </Link>
                    <Input.Search
                        placeholder="جستجو"
                        allowClear
                        enterButton
                        onSearch={setSearch}
                    />
                </Space>

                <Spin spinning={loading} size="large" style={{ height: 600 }}>
                    <Table
                        bordered
                        dataSource={blogs}
                        columns={columns}
                        pagination={{
                            ...pagination,
                            total,
                            showSizeChanger: true,
                        }}
                    />
                </Spin>
            </Space>
            <BlogSEO setOpen={setOpen} open={open} blogId={blogId} />
        </MainLayout >
    );
};

export default ListOfBlogs;