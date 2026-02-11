
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCNqI-rMho0P44vTrYv1N1H8SF_-ScFmdg",
    authDomain: "nexus-webtt.firebaseapp.com",
    projectId: "nexus-webtt",
    storageBucket: "nexus-webtt.firebasestorage.app",
    messagingSenderId: "345719297180",
    appId: "1:345719297180:web:a90eba3c493c6ac33e8959",
    measurementId: "G-HNCKQCEY4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const newBlogPost = {
    title: 'Building Scalable Web Applications with Next.js',
    excerpt: 'Discover how Next.js revolutionizes web development with server-side rendering, static generation, and seamless API routes for modern applications.',
    author: 'Aaron Hazzard',
    date: '2026-02-11',
    readTime: '7 min',
    category: 'Web Development',
    image: 'https://picsum.photos/600/400?random=503',
    featured: true,
    slug: 'building-scalable-web-applications-nextjs',
    published: true,
    content: `
<h1>Building Scalable Web Applications with Next.js</h1>

<p>Next.js has become the go-to framework for building modern, scalable web applications. With its powerful features like server-side rendering, static site generation, and API routes, it offers everything you need to create high-performance applications.</p>

<h2>Why Choose Next.js?</h2>

<p>Next.js combines the best of both worlds: the simplicity of React with powerful server-side capabilities. Here's why it stands out:</p>

<ul>
  <li><strong>Server-Side Rendering (SSR)</strong>: Improve SEO and initial page load performance</li>
  <li><strong>Static Site Generation (SSG)</strong>: Pre-render pages at build time for lightning-fast delivery</li>
  <li><strong>API Routes</strong>: Build your backend and frontend in one cohesive application</li>
  <li><strong>Automatic Code Splitting</strong>: Only load the JavaScript needed for each page</li>
  <li><strong>Image Optimization</strong>: Built-in image optimization for better performance</li>
</ul>

<h2>Key Features for Caribbean Businesses</h2>

<h3>1. Performance Optimization</h3>

<p>In regions with varying internet speeds, performance is crucial. Next.js automatically optimizes your application for the best possible performance:</p>

<ul>
  <li>Automatic code splitting reduces bundle sizes</li>
  <li>Image optimization serves the right size for each device</li>
  <li>Prefetching ensures instant page transitions</li>
  <li>Built-in performance monitoring with Web Vitals</li>
</ul>

<h3>2. SEO Excellence</h3>

<p>Server-side rendering ensures search engines can properly index your content, crucial for local businesses competing in search results.</p>

<h3>3. Developer Experience</h3>

<p>Next.js provides an exceptional developer experience with:</p>

<ul>
  <li>Fast refresh for instant feedback during development</li>
  <li>TypeScript support out of the box</li>
  <li>File-based routing for intuitive project structure</li>
  <li>Built-in CSS and Sass support</li>
</ul>

<h2>Real-World Application</h2>

<p>At <strong>Nexus Web</strong>, we've built numerous applications using Next.js for Caribbean businesses. The framework's flexibility allows us to create everything from e-commerce platforms to content management systems, all optimized for the local market.</p>

<h3>Case Study: E-Commerce Platform</h3>

<p>We recently built an e-commerce platform for a Trinidad & Tobago retailer using Next.js. The results were impressive:</p>

<ul>
  <li><strong>50% faster</strong> page load times compared to their previous site</li>
  <li><strong>200% increase</strong> in mobile conversions</li>
  <li><strong>Top 3 rankings</strong> for target keywords within 3 months</li>
  <li><strong>99.9% uptime</strong> with serverless deployment</li>
</ul>

<h2>Getting Started</h2>

<p>Starting a Next.js project is straightforward. The framework handles the complex configuration, letting you focus on building features:</p>

<pre><code>npx create-next-app@latest my-app
cd my-app
npm run dev
</code></pre>

<h2>Best Practices</h2>

<h3>1. Use Static Generation When Possible</h3>
<p>For content that doesn't change frequently, static generation provides the best performance.</p>

<h3>2. Optimize Images</h3>
<p>Always use the Next.js Image component for automatic optimization and lazy loading.</p>

<h3>3. Implement Proper Caching</h3>
<p>Leverage Next.js caching strategies to reduce server load and improve response times.</p>

<h3>4. Monitor Performance</h3>
<p>Use built-in analytics and Web Vitals to track and improve your application's performance.</p>

<h2>Conclusion</h2>

<p>Next.js is an excellent choice for building modern web applications, especially for businesses in the Caribbean market. Its performance optimizations, SEO capabilities, and developer experience make it ideal for creating scalable, high-performance applications.</p>

<p>Ready to build your next application with Next.js? <strong>Contact Nexus Web</strong> for expert guidance and development services tailored to the Caribbean market.</p>

<hr>

<p><em>This article is part of our web development series. Stay tuned for more insights on building modern web applications.</em></p>
  `
};

async function seedBlogs() {
    console.log("Starting blog seed...");

    // STEP 1: Update all 2024 posts to 2026
    console.log("\n=== Updating 2024 posts to 2026 ===");
    try {
        const posts2024Query = query(
            collection(db, "posts"),
            where("date", ">=", "2024-01-01"),
            where("date", "<", "2025-01-01")
        );
        const snapshot2024 = await getDocs(posts2024Query);

        console.log(`Found ${snapshot2024.size} posts from 2024 to update`);

        for (const doc of snapshot2024.docs) {
            const oldDate = doc.data().date;
            const newDate = oldDate.replace("2024", "2026");

            await updateDoc(doc.ref, { date: newDate });
            console.log(`Updated post: ${doc.data().title} - ${oldDate} → ${newDate}`);
        }
    } catch (e) {
        console.error("Error updating 2024 posts:", e);
    }

    // STEP 2: Add new HTML blog post
    console.log("\n=== Adding new blog post ===");
    try {
        // Check if post already exists by slug
        const q = query(collection(db, "posts"), where("slug", "==", newBlogPost.slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            const docRef = await addDoc(collection(db, "posts"), newBlogPost);
            console.log(`Added blog: ${newBlogPost.title} (ID: ${docRef.id})`);
        } else {
            console.log(`Skipping: ${newBlogPost.title} (Slug already exists)`);
        }
    } catch (e) {
        console.error(`Error adding blog ${newBlogPost.title}: `, e);
    }

    console.log("\nSeed completed!");
    process.exit(0);
}

seedBlogs();
