import axios from "axios";

export const imageUpload = async (imageData) => {
  const imageFormData = new FormData();
  imageFormData.append('image', imageData);

  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_KEY}`,
    imageFormData
  );
console.log(data?.data?.display_url);

  return data?.data?.display_url;
};
