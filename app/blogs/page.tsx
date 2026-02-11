import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import PublicBlogList from "@/components/blog/PublicBlogList";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

async function getPublishedPosts() {
  try {
    const q = query(
      collection(db, "posts"),
      where("published", "==", true),
      orderBy("date", "desc")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => {
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
    }) as BlogPost[];
  } catch (error) {
    console.error("Error fetching published posts:", error);
    return [];
  }
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return <PublicBlogList posts={posts} />;
}
