import instance from ".";

export const getPostsMain = async () => {
  try {
    const result = await instance({
      method: "GET",
      url: "/posts/main",
    });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};

export const postPosts = async (data) => {
  try {
    const result = await instance({
      method: "POST",
      url: "/posts",
      data,
    });
    return result.data;
  } catch (error) {
    return error.response.data;
  }
};