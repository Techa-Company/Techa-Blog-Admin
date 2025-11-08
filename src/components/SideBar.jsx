import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Icon from "./Icon";
// import {
//     icons,
//     LucideLayoutDashboard,
//     LucideNewspaper,
//     LucideScrollText,
//     LucideUsers2,
//     LucideTv,
//     LucideImagePlus,
//     LucideGalleryThumbnails,
//     LucideSettings,
//     LucideSettings2,
//     LucideAlbum,
// } from "lucide-react";
// import clsx from "clsx";
// import Icon from "./icon";

/**
 * @type { import("antd").MenuProps['items'] }
 */
const items = [
    {
        label: "داشبورد",
        key: "/",
        icon: <Icon name="layout-dashboard" size={16} />,
    },
    { type: "divider" },
    {
        label: "مدیریت محتوا",
        type: "group",
        key: "content-management-group",
        children: [
            {
                label: "وبلاگ",
                icon: <Icon name="newspaper" size={16} />,
                key: "blogs",
                children: [
                    {
                        key: "/blogs",
                        label: "مقالات",
                        icon: <Icon name="scroll-text" />,
                    },
                    {
                        key: "/categories",
                        label: "دسته بندی ها",
                        icon: <Icon name="album" />,
                    },
                    {
                        key: "/tags",
                        label: "برچسب ها",
                        icon: <Icon name="tag" />,
                    },
                ],
            }
        ],
    },
    {
        type: "divider",
    },
    {
        label: "تنظیمات سایت",
        type: "group",
        key: "site-settings-group",
        icon: <Icon name="settings" />,
        children: [
            {
                label: "اسلایدر",
                icon: <Icon name="settings-2" />,
                key: "/sliders",
            },
        ],
    },
];
const SideBar = () => {
    const location = useLocation();

    /**
     * @type { import("antd").MenuProps['items'] }
     */

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="h-full">
            <Layout.Sider
                breakpoint="lg"
                width={280}
                className="h-full"
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                reverseArrow
                theme="light"
            >
                <div className="flex h-full flex-col gap-5">
                    <div
                        className={
                            `flex flex-row flex-wrap-reverse items-center justify-between pt-4 transition-all ${!collapsed && 'px-4'}`
                        }
                    >

                        <div className="flex flex-row items-center justify-between px-4">
                            <h4 className="text-xl font-bold text-primary">
                                تکا
                            </h4>
                        </div>

                    </div>
                    <Menu
                        className="grow border-none pr-2"
                        mode="inline"
                        theme="light"
                        selectedKeys={[location.pathname]}
                        items={items}
                        onSelect={({ key }) => navigate(key)}
                    />
                </div>
            </Layout.Sider>
        </div>
    );
}

export default SideBar;