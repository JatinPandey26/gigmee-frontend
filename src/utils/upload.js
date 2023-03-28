import axios from "axios";

export const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "gigmee");
  data.append("cloud_name", "dx8ncfjl3");

  try {
    const res = await axios.post(import.meta.env.VITE_UPLOAD_URL, data);
 
    const { url } = res.data;
    return url;
  } catch (error) {
    console.log(error);
  }
};
