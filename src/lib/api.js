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
