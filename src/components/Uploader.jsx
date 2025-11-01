import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../features/actions/upload/uploadActions";

/*const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
*/

const Uploader = ({ value, onChange }) => {

  const dispatch = useDispatch();
  const imageLocation = useSelector(state => state.upload.location);
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);


  const handleChange = (info) => {
    console.log(info)
    switch (info.file.status) {
      case "uploading":
        setLoading(true);
        break;
      case "done":
        setLoading(false);
        onChange(info.file.response.location);
        break;
      case "removed":
        setLoading(false);
        onChange(null);
        break;
      default:
        console.log(info.file.status);
    }
  };

  const handleUpload = async (file, onSuccess) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      await dispatch(uploadImage(formData));
      onSuccess();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Upload.Dragger
        name="file"
        listType="picture"
        showUploadList={true}
        // method="POST"
        //defaultFileList={[new File()]}
        style={{ display: value || loading ? "none" : "block" }}
        maxCount={1}
        /*defaultFileList={
          value
            ? [
                {
                  name: value?.split && value.split("/").reverse()[0],
                  status: "done",
                  url: value,
                },
              ]
            : []
        }*/
        customRequest={({ file, onSuccess }) => handleUpload(file, onSuccess)}
        // action="https://blog-api.barazman.dev/File/UploadFile"
        onChange={handleChange}
        //beforeUpload={beforeUpload}
        onPreview={() => setPreviewVisible(true)}
      >

        {!value && !loading && (
          <div>
            <p className="ant-upload-drag-icon py-1.5">
              <InboxOutlined />
            </p>
            <p className="">کلیک کنید یا فایل خود را بکشید و در اینجا رها کنید</p>
            <p className="ant-upload-hint">پشتیبانی از آپلود یک عکس.</p>
          </div>
        )}
      </Upload.Dragger>
      <Image
        style={{ display: "none" }}
        preview={{
          visible: previewVisible,
          src: value,
          onVisibleChange: setPreviewVisible,
        }}
      />
    </>
  );
};

export default Uploader;
