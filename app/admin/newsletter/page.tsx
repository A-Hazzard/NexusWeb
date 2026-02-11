"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Subscriber = {
    id: string;
    email: string;
    name?: string;
    status: "active" | "unsubscribed";
    subscribedAt: string;
    unsubscribedAt?: string;
    unsubscribeReason?: string;
    source: string;
    tags?: string[];
};

type SubscriberStats = {
    subscribers: Subscriber[];
    total: number;
    active: number;
    unsubscribed: number;
};

export default function NewsletterDashboard() {
    const [data, setData] = useState<SubscriberStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState<"all" | "active" | "unsubscribed">("all");

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const response = await fetch("/api/newsletter/subscribers");
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching subscribers:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this subscriber?")) return;

        try {
            const response = await fetch(`/api/newsletter/subscribers?id=${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                fetchSubscribers();
            }
        } catch (error) {
            console.error("Error deleting subscriber:", error);
        }
    };

    const exportToCSV = () => {
        if (!data) return;

        const csv = [
            ["Email", "Name", "Status", "Subscribed At", "Source"],
            ...data.subscribers.map((sub) => [
                sub.email,
                sub.name || "",
                sub.status,
                new Date(sub.subscribedAt).toLocaleDateString(),
                sub.source,
            ]),
        ]
            .map((row) => row.join(","))
            .join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `subscribers-${new Date().toISOString().split("T")[0]}.csv`;
        a.click();
    };

    const filteredSubscribers = data?.subscribers.filter((sub) => {
        const matchesSearch =
            sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            sub.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterStatus === "all" || sub.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8A00] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading subscribers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-4xl font-bold text-gray-900">Newsletter Subscribers</h1>
                        <div className="flex gap-3">
                            <Link
                                href="/admin/newsletter/send"
                                className="px-4 py-2 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white rounded-lg hover:shadow-lg transition-all"
                            >
                                ✉️ Send Campaign
                            </Link>
                            <Link
                                href="/admin/newsletter/usage"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                📖 Usage Guide
                            </Link>
                        </div>
                    </div>
                    <p className="text-gray-600">Manage your newsletter subscribers and view analytics</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl p-6 shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Subscribers</p>
                                <p className="text-3xl font-bold text-gray-900 mt-2">{data?.total || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📧</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl p-6 shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Active</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{data?.active || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">✅</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl p-6 shadow-lg"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Unsubscribed</p>
                                <p className="text-3xl font-bold text-red-600 mt-2">{data?.unsubscribed || 0}</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">❌</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Controls */}
                <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="flex-1 w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search by email or name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "unsubscribed")}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="unsubscribed">Unsubscribed</option>
                            </select>
                            <button
                                onClick={exportToCSV}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                📥 Export CSV
                            </button>
                        </div>
                    </div>
                </div>

                {/* Subscribers Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Subscribed
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Source
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredSubscribers && filteredSubscribers.length > 0 ? (
                                    filteredSubscribers.map((subscriber) => (
                                        <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900">{subscriber.email}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{subscriber.name || "-"}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${subscriber.status === "active"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-red-100 text-red-800"
                                                        }`}
                                                >
                                                    {subscriber.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(subscriber.subscribedAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{subscriber.source}</td>
                                            <td className="px-6 py-4">
                                                {subscriber.status === "unsubscribed" && subscriber.unsubscribeReason ? (
                                                    <span className="text-xs text-gray-600 italic">
                                                        {subscriber.unsubscribeReason}
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() => handleDelete(subscriber.id)}
                                                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            No subscribers found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
