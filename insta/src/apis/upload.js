import instance from ".";

export const uploadImage = async (file) => {
  try {
    const data = new FormData();
    data.append("file", file);

    const result = await instance({
      method: "POST",
      url: "/upload/image",
      data,
    });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};