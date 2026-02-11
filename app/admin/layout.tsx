"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [user, setUser] = useState<User | null>(null); // Unused
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === "/admin") {
          router.push("/admin/dashboard");
        }
      } else {
        if (pathname !== "/admin") {
          router.push("/admin");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If on login page, just render children without sidebar
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  // Protected Layout with Sidebar
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Nexus Admin</h2>
        </div>
        <nav className="mt-6">
          <Link
            href="/admin/dashboard"
            className={`block px-6 py-3 text-gray-700 hover:bg-gray-100 ${pathname === "/admin/dashboard" ? "bg-gray-100 font-semibold" : ""
              }`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/blog/new"
            className={`block px-6 py-3 text-gray-700 hover:bg-gray-100 ${pathname === "/admin/blog/new" ? "bg-gray-100 font-semibold" : ""
              }`}
          >
            Create New Post
          </Link>
          <Link
            href="/admin/newsletter"
            className={`block px-6 py-3 text-gray-700 hover:bg-gray-100 ${pathname?.startsWith("/admin/newsletter") ? "bg-gray-100 font-semibold" : ""
              }`}
          >
            📧 Newsletter
          </Link>
          <div className="px-6 py-3 mt-auto">
            <button
              onClick={() => signOut(auth)}
              className="w-full text-left text-red-600 hover:text-red-800 font-medium"
            >
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
