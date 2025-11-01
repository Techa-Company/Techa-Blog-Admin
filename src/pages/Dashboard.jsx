import { Card, Col, Row, Table, Spin } from 'antd';
import MainLayout from './layout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../features/actions/blog/blogActions';
import { getAllCategories } from '../features/actions/category/categoryActions';

const blogCol = [
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
];

const categoryCol = [
    {
        title: "ردیف",
        key: "index",
        render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
        title: "عنوان",
        dataIndex: "Name",
        key: "Name",
        render: (_, record) => (
            <Link
                to={{
                    pathname: "/blogs/categories",
                    search: new URLSearchParams({ parent: record.Id }).toString(),
                }}
            >
                {record.Name}
            </Link>
        ),
    },
    {
        title: "نامک",
        dataIndex: "Slug",
        key: "Slug",
        render: (_, record) => <span >{record.Slug || "-"}</span>,
    },
    {
        title: "توضیحات",
        dataIndex: "Description",
        key: "Description",
        render: (_, record) => <span>{record.Description || "-"}</span>,
    },
];


const Dashboard = () => {

    // const pagination = usePagination();

    const dispatch = useDispatch();
    const { loading: blogLoading, blogs } = useSelector(state => state.blogs)
    const { loading: categoryLoading, categories } = useSelector(state => state.categories)

    useEffect(() => {
        dispatch(getAllBlogs());
        dispatch(getAllCategories());
    }, [dispatch])

    console.log(blogs, blogLoading);
    console.log(categories, categoryLoading)
    return (
        <MainLayout>
            <div className='overflow-x-hidden'>
                <Row gutter={24} >
                    <Col xs={24} md={12} xl={8} xxl={6}>
                        <Card className='bg-primaryLight mb-5'>
                            <h1 className='font-medium text-xl text-primary'>مقالات</h1>
                            <div className='flex justify-between items-center mt-5'>
                                <p className='text-slate-400'>تعداد مقالات</p>
                                <p className='bg-primary text-white py-1 px-3 rounded-full'>{blogs.length}</p>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} md={12} xl={8} xxl={6}>
                        <Card className='bg-successLight mb-5'>
                            <h1 className='font-medium text-xl text-success'>دسته بندی ها</h1>
                            <div className='flex justify-between items-center mt-5'>
                                <p className='text-slate-400'>تعداد دسته بندی ها</p>
                                <p className='bg-success text-white py-1 px-3 rounded-full'>{categories.length}</p>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} md={12} xl={8} xxl={6}>
                        <Card className='bg-warningLight mb-5'>
                            <h1 className='font-medium text-xl text-warning'>نظرات</h1>
                            <div className='flex justify-between items-center mt-5'>
                                <p className='text-slate-400'>تعداد نظرات</p>
                                <p className='bg-warning text-white py-1 px-3 rounded-full'>28</p>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={24} md={12} xl={8} xxl={6}>
                        <Card className='bg-dangerLight mb-5'>
                            <h1 className='font-medium text-xl text-danger'>اسلایدرها</h1>
                            <div className='flex justify-between items-center mt-5'>
                                <p className='text-slate-400'>تعداد اسلایدر ها</p>
                                <p className='bg-danger text-white py-1 px-3 rounded-full'>3</p>
                            </div>
                        </Card>
                    </Col>
                </Row>
                <Row gutter={30} className='mt-5'>
                    <Col xs={24} xxl={12} >
                        <h3 className='font-bold mb-5 text-xl'>آخرین دسته بندی ها</h3>
                        {/* <Table columns={cat} dataSource={categories} scroll={{
                        x: 600,
                    }} /> */}
                        <Spin spinning={categoryLoading} size="large" style={{ height: 600 }}>
                            <Table
                                bordered
                                dataSource={categories.slice(-5).reverse()}
                                columns={categoryCol}
                            // pagination={{
                            //     ...pagination,
                            //     total,
                            //     showSizeChanger: true,
                            // }}
                            />
                        </Spin>
                    </Col>
                    <Col xs={24} xxl={12} >
                        <h3 className='font-bold mb-5 text-xl'>آخرین مقالات</h3>
                        <Spin spinning={blogLoading} size="large" style={{ height: 600 }}>
                            <Table
                                bordered
                                dataSource={blogs.slice(-5).reverse()}
                                columns={blogCol}
                            // pagination={{
                            //     ...pagination,
                            //     total,
                            //     showSizeChanger: true,
                            // }}
                            />
                        </Spin>
                    </Col>
                </Row>
            </div>
        </MainLayout>
    );
};

export default Dashboard;