import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import BlogPostContent from "./BlogPostContent";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Function to fetch post by slug from Firestore
async function getPostBySlug(slug: string) {
  try {
    const q = query(
      collection(db, "posts"),
      where("slug", "==", slug),
      where("published", "==", true)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || "",
      content: data.content || "",
      excerpt: data.excerpt || "",
      category: data.category || "",
      author: data.author || "",
      date: data.date || "",
      readTime: data.readTime || "",
      image: data.image || "",
      slug: data.slug || "",
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // If no post found in DB, fallback to hardcoded data (for migration period)?
  // OR just return null and let BlogPostContent handle the 404 state. 
  // Given we are overhauling, let's stick to the DB.

  return <BlogPostContent post={post} />;
}