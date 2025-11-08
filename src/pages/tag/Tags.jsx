import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Input, Layout, Popconfirm, Space, Spin, Table, theme } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../../components/Icon";
import usePagination from "../../hooks/usePagination";
import MainLayout from "../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteTag, getAllTags } from "../../features/actions/tag/tagActions";

/**
 * @type {import('antd').TableColumnType}
 */
const columns = [
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
    title: "عملیات",
    key: "actions",
    render: (_, record) => <Actions id={record.Id} {...record} />,
  },
];

function Actions({ id }) {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(deleteTag({ "Id": id })).unwrap();
      dispatch(getAllTags())
      toast.success("برچسب با موفقیت حذف شد");
    } catch (error) {
      toast.error(`خطا در حذف برچسب: ${error?.message || "خطای ناشناخته"}`);
    }
  };

  return (
    <Space size="middle">
      <Button
        onClick={() => navigate(`edit/${id}`)}
        icon={<Icon name="pen" color={token["blue-6"]} />}
        size="middle"
        type="text"
      />
      <Popconfirm
        title="حذف برچسب"
        description="آیا از حذف این برچسب مطمئن هستید؟"
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

const Tags = ({ type }) => {
  const pagination = usePagination();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const dispatch = useDispatch();
  const { loading, tags } = useSelector(state => state.tags);

  useEffect(() => {
    dispatch(getAllTags());
  }, [dispatch]);

  // Debounce برای سرچ
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300); // تاخیر 300ms

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // فیلتر کردن دسته‌بندی‌ها بر اساس debouncedSearch
  const filteredTags = tags.filter(cat => {
    const keyword = debouncedSearch.trim().toLowerCase();
    return (
      cat.Name?.toLowerCase().includes(keyword) ||
      cat.Slug?.toLowerCase().includes(keyword)
    );
  });

  return (
    <MainLayout className="min-h-full">
      <Space direction="vertical" size="large">
        <Space size="large">
          <Link to="new">
            <Button type="primary" icon={<PlusOutlined />}>
              برچسب جدید
            </Button>
          </Link>
          <Input.Search
            placeholder="جستجو"
            allowClear
            enterButton
            value={search}
            onSearch={value => setSearch(value)}
            onChange={e => setSearch(e.target.value)}
          />
        </Space>
        <Spin size="large" spinning={loading}>
          <Table
            columns={columns}
            dataSource={filteredTags}
            rowKey="Id"
          />
        </Spin>
      </Space>
    </MainLayout>
  );
}

export default Tags;
