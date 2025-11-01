import { PlusOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Layout,
  Popconfirm,
  Space,
  Spin,
  Table,
  theme,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Icon from "../../components/Icon";
import usePagination from "../../hooks/usePagination";
import MainLayout from "../layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { getAllSliders } from "../../features/actions/slider/sliderActions";

/**
 * @type {import('antd').TableColumnType}
 */
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
      <Link
        to={{
          pathname: "/blogs/categories",
          search: new URLSearchParams({ parent: record.key }).toString(),
        }}
      >
        {record.title}
      </Link>
    ),
  },
  {
    title: "عملیات",
    dataIndex: "actions",
    key: "actions",
    render: (_, record) => <Actions id={record.key} />,
  },
];

function Actions({ id }) {
  const { token } = theme.useToken();
  const navigate = useNavigate();

  return (
    <Space size="middle">
      <Button
        onClick={() => navigate(`edit/${id}`)}
        icon={<Icon name="pen" color={token["blue-6"]} />}
        size="middle"
        type="text"
      />
      <Popconfirm
        title="حدف دسته بندی"
        description="از پاک این دسته بندی مطمئن هستید؟"
        okText="حذف"
        cancelText="لغو"
        okButtonProps={{
          danger: true,
        }}
        onConfirm={() => {
          // messageApi.open({ type: "info", content: "دسته بندی حذف شد" });
        }}
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

const Sliders = ({ type }) => {
  const pagination = usePagination();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { loading, sliders } = useSelector(state => state.sliders)

  useEffect(() => {
    dispatch(getAllSliders());
  }, [])


  return (
    <MainLayout className="min-h-full">
      {/* <
        title={type === "Blog" ? "دسته بندی بلاگ ها" : "دسته بندی ایونت ها"}
      > */}
      <Space direction="vertical" size="large">
        <Space size="large">
          <Link to="new">
            <Button type="primary" icon={<PlusOutlined />}>
              اسلایدر جدید
            </Button>
          </Link>
          <Input.Search
            placeholder="جستجو"
            allowClear
            enterButton
            onSearch={setSearch}
          />
        </Space>
        <Spin size="large" spinning={loading}>
          <Table columns={columns} dataSource={sliders} />
        </Spin>
      </Space>
      {/* </> */}
    </MainLayout>
  );
}

export default Sliders;