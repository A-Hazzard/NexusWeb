import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
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

// Function to fetch related posts by category
async function getRelatedPosts(category: string, currentSlug: string) {
  try {
    const q = query(
      collection(db, "posts"),
      where("category", "==", category),
      where("published", "==", true),
      orderBy("date", "desc"),
      limit(3)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs
      .map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title || "",
          excerpt: data.excerpt || "",
          category: data.category || "",
          author: data.author || "",
          date: data.date || "",
          readTime: data.readTime || "",
          image: data.image || "",
          slug: data.slug || "",
        };
      })
      .filter((post) => post.slug !== currentSlug); // Exclude current post
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // Fetch related posts if we have a post
  const relatedPosts = post ? await getRelatedPosts(post.category, post.slug) : [];

  return <BlogPostContent post={post} relatedPosts={relatedPosts} />;
}