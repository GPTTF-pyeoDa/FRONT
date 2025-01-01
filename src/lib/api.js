// tag
export const fetchTags = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`);
    if (!response.ok) {
      throw new Error("Failed to fetch tags");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching tags:", error.message);
    return [];
  }
};

export const fetchTodaysTag = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tags/today`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch today topic");
    }
    const data = response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todaays tags:", error.message);
    return;
  }
};

// post
export const createPost = async (postData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Failed to create post");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating post:", error.message);
    return null;
  }
};

export const fetchMyPosts = async (memID) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${memID}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
};

export const fetchPostById = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/post/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching post:", error.message);
    return null;
  }
};

export const deletePostById = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting post:", error.message);
    return null;
  }
};

export const updatePostById = async (id, updateData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating post:", error.message);
    return null;
  }
};

/**
 * 특정 글감에 대한 글 목록 가져오기
 * @param {string} tagId - 글감 ID
 * @returns {Promise<Post[]>} - 글 목록
 */
export const fetchPostsByTag = async (tagId) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/tag/${tagId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch posts by tag");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts by tag:", error.message);
    throw error;
  }
};

// AI
/**
 * 사용자가 작성한 글에 대해 AI 피드백 요청
 * @param {string} id - 글의 ID
 * @param {string} content - 사용자가 작성한 글 내용
 * @returns {Promise<Feedback>} - AI 피드백 내용
 */
export const requestFeedback = async (id, content) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}/feedback`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate feedback");
    }
    return await response.json(); // AI 피드백 텍스트 반환
  } catch (error) {
    console.error("Error generating feedback:", error.message);
    throw error; // 에러를 상위로 전달
  }
};
