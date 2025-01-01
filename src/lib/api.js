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
