import jwt from "jsonwebtoken";
import JWT_SECRET_KEY from "../config/jwt.js";
import conn from "../db/index.js";

export const getPostsMain = async (req, res) => {
  // 모든 포스트 보내주기
  const query = `
        SELECT post.*, user.profile_image, user.name,
            GROUP_CONCAT(image.url) AS imageList
        FROM post
        JOIN image ON image.post_id = post.id
        JOIN user ON user.id = post.user_id
        GROUP BY post.id
        ORDER BY post.created_at DESC
        LIMIT 15;
    `;

  const [rows] = await conn.query(query);
  const postList = rows.map((post) => {
    const imageList = post.imageList.split(",");
    return { ...post, imageList };
  });

  res.send({ success: true, postList });
};

export const postPosts = async (req, res) => {
  // 포스트 생성
  // 1. 요청을 한 사람이 누구인지 토큰을 통해서 확인
  // 2. post생성해서 content담기
  // 3. fileList에 있는 이미지들과 생성된 post_id 저장

  const token = req.headers.authorization;

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (e) {
    console.log(e);
    return res.status(401).send({ success: false });
  }
  const { userId } = payload;
  const { fileList, content } = req.body;

  const query = `
    INSERT INTO post(user_id, content) 
    VALUES(${userId}, '${content}');
  `;
  const [newPost] = await conn.query(query);
  const postId = newPost.insertId;

  const promiseList = fileList.map((file) => {
    const query2 = `
      INSERT INTO image(post_id, url)
      VALUES(${postId}, '${file}');
    `;

    return conn.query(query2);
  });

  await Promise.all(promiseList);

  res.send({ success: true });
};