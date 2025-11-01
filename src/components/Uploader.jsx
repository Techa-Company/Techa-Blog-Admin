import { InboxOutlined } from "@ant-design/icons";
import { Image, Upload, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../features/actions/upload/uploadActions";

const Uploader = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);

  const handleChange = (info) => {
    switch (info.file.status) {
      case "uploading":
        setLoading(true);
        break;
      case "done":
        setLoading(false);
        if (info.file.response) {
          const fileId = info.file.response.Id;
          console.log(fileId)
          // اگر فقط Id لازم داری:
          onChange(fileId);

          // اگر URL دانلود داری (مثلاً api/FileUpload/{id}):
          // onChange(`https://api.techa.me/api/FileUpload/${fileId}`);

          message.success("آپلود با موفقیت انجام شد");
        }
        break;
      case "error":
        setLoading(false);
        message.error("خطا در آپلود فایل");
        break;
      case "removed":
        setLoading(false);
        onChange(null);
        break;
      default:
        console.log(info.file.status);
    }
  };

  const handleUpload = async (file, onSuccess, onError) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await dispatch(uploadImage(formData)).unwrap();
      // فرض می‌کنیم اکشن uploadImage همون پاسخ API رو برمی‌گردونه
      onSuccess(result);
    } catch (error) {
      console.error(error);
      onError(error);
    }
  };

  return (
    <>
      <Upload.Dragger
        name="file"
        listType="picture"
        showUploadList={true}
        method="POST"
        style={{ display: value || loading ? "none" : "block" }}
        maxCount={1}
        customRequest={({ file, onSuccess, onError }) => handleUpload(file, onSuccess, onError)}
        onChange={handleChange}
        onPreview={() => setPreviewVisible(true)}
      >

        {!value && !loading && (
          <div>
            <p className="ant-upload-drag-icon py-1.5">
              <InboxOutlined />
            </p>
            <p>کلیک کنید یا فایل خود را بکشید و در اینجا رها کنید</p>
            <p className="ant-upload-hint">پشتیبانی از آپلود یک عکس.</p>
          </div>
        )}
      </Upload.Dragger>

      <Image
        style={{ display: "none" }}
        preview={{
          visible: previewVisible,
          src: value ? value : "",
          onVisibleChange: setPreviewVisible,
        }}
      />
    </>
  );
};

export default Uploader;
