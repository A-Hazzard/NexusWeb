"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { use } from "react";

// Correct type for Next.js App Router dynamic params
type Props = {
    params: Promise<{ id: string }>;
};

export default function EditBlogPost({ params }: Props) {
    // Unwrap params using React.use()
    const { id } = use(params);

    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [category, setCategory] = useState("");
    const [author, setAuthor] = useState("");
    const [readTime, setReadTime] = useState("");
    const [currentImageUrl, setCurrentImageUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [published, setPublished] = useState(false);
    const [featured, setFeatured] = useState(false);
    const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/blog/categories');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (id) {
            fetchPost(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchPost = async (postId: string) => {
        try {
            const docRef = doc(db, "posts", postId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setTitle(data.title || "");
                setSlug(data.slug || "");
                setContent(data.content || "");
                setExcerpt(data.excerpt || "");
                setCategory(data.category || "");
                setAuthor(data.author || "");
                setReadTime(data.readTime || "");
                setCurrentImageUrl(data.image || "");
                setPublished(data.published || false);
                setFeatured(data.featured || false);
            } else {
                alert("Post not found!");
                router.push("/admin/dashboard");
            }
        } catch (error) {
            console.error("Error fetching post:", error);
            alert("Error fetching post details.");
        } finally {
            setLoading(false);
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        // Don't auto-update slug on edit unless user explicitly wants to? 
        // Usually bad for SEO to change URL. Let's keep slug independent.
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        setSubmitting(true);

        try {
            let imageUrl = currentImageUrl;

            if (imageFile) {
                const storageRef = ref(storage, `blog/${Date.now()}-${imageFile.name}`);
                const snapshot = await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(snapshot.ref);
            }

            const postData = {
                title,
                slug,
                content,
                excerpt,
                category,
                author,
                readTime,
                image: imageUrl,
                published,
                featured,
                updatedAt: serverTimestamp(),
            };

            await updateDoc(doc(db, "posts", id), postData);
            router.push("/admin/dashboard");
        } catch (error) {
            setSubmitting(false);
            console.error("Error updating post:", error);
            alert("Failed to update post.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto pb-20">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Edit Post</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">

                {/* Title & Slug */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => setSlug(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
                            required
                        />
                    </div>
                </div>

                {/* Category & Read Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex justify-between">
                            Category
                            <a href="/admin/blog/categories" target="_blank" className="text-xs text-blue-600 hover:text-blue-800">Manage</a>
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Read Time</label>
                        <input
                            type="text"
                            value={readTime}
                            onChange={(e) => setReadTime(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Featured Image</label>
                    <div className="flex items-center space-x-4">
                        {currentImageUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={currentImageUrl} alt="Current" className="w-20 h-20 object-cover rounded" />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                    <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        rows={3}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Content Editor */}
                <div className="space-y-2 pb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <RichTextEditor value={content} onChange={setContent} />
                </div>

                {/* Toggles */}
                <div className="flex items-center space-x-6 pt-12">
                    <div className="flex items-center">
                        <input
                            id="published"
                            type="checkbox"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                            Published
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="featured"
                            type="checkbox"
                            checked={featured}
                            onChange={(e) => setFeatured(e.target.checked)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                            Featured Post
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
                    >
                        {submitting ? "Updating..." : "Update Post"}
                    </button>
                </div>

            </form>
        </div>
    );
}
