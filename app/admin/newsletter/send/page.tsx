"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function SendCampaignPage() {
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{
        success: boolean;
        data?: {
            results: {
                total: number;
                sent: number;
                failed: number;
            };
        };
        error?: string;
    } | null>(null);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!confirm("Are you sure you want to send this campaign to all active subscribers?")) {
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await fetch("/api/newsletter/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    subject,
                    htmlContent: content,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setResult({ success: true, data });
                setSubject("");
                setContent("");
            } else {
                setResult({ success: false, error: data.error });
            }
        } catch {
            setResult({ success: false, error: "Failed to send campaign" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/admin/newsletter"
                        className="inline-flex items-center text-[#FF8A00] hover:text-[#FF4D00] mb-4 transition-colors"
                    >
                        ← Back to Newsletter Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Send Newsletter Campaign</h1>
                    <p className="text-gray-600">Create and send a newsletter to all active subscribers</p>
                </div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg p-8"
                >
                    <form onSubmit={handleSend} className="space-y-6">
                        {/* Subject */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Subject *
                            </label>
                            <input
                                type="text"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="e.g., This Month's Top Web Development Tips"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00]"
                            />
                            <p className="text-sm text-gray-500 mt-1">Keep it under 50 characters for best results</p>
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Content *
                            </label>
                            <RichTextEditor
                                value={content}
                                onChange={setContent}
                            />
                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                                <p><strong>Available variables:</strong></p>
                                <ul className="list-disc list-inside ml-4">
                                    <li><code className="bg-gray-100 px-2 py-1 rounded">{"{{name}}"}</code> - Subscriber&apos;s name (or &quot;there&quot;)</li>
                                    <li><code className="bg-gray-100 px-2 py-1 rounded">{"{{email}}"}</code> - Subscriber&apos;s email</li>
                                </ul>
                            </div>
                        </div>

                        {/* Template Example */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h3 className="font-semibold text-blue-900 mb-2">📝 Quick HTML Template</h3>
                            <pre className="text-xs bg-white p-3 rounded overflow-x-auto text-gray-800">
                                {`<div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
  <div style="background: linear-gradient(135deg, #FF8A00 0%, #FF4D00 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1>Your Newsletter Title</h1>
  </div>
  <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
    <p>Hi {{name}}!</p>
    <p>Your content here...</p>
    <a href="https://yoursite.com" style="display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #FF8A00 0%, #FF4D00 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0;">
      Click Here
    </a>
  </div>
</div>`}
                            </pre>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Sending..." : "Send to All Subscribers"}
                            </button>
                            <Link
                                href="/admin/newsletter"
                                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>

                    {/* Result */}
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-6 p-6 rounded-lg ${result.success
                                ? "bg-green-50 border border-green-200"
                                : "bg-red-50 border border-red-200"
                                }`}
                        >
                            {result.success ? (
                                <div>
                                    <h3 className="text-lg font-semibold text-green-900 mb-2">✅ Campaign Sent Successfully!</h3>
                                    <div className="text-green-800">
                                        <p><strong>Total Subscribers:</strong> {result.data?.results.total}</p>
                                        <p><strong>Successfully Sent:</strong> {result.data?.results.sent}</p>
                                        <p><strong>Failed:</strong> {result.data?.results.failed}</p>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-semibold text-red-900 mb-2">❌ Error</h3>
                                    <p className="text-red-800">{result.error}</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </motion.div>

                {/* Tips */}
                <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Campaign Tips</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span><strong>Test first:</strong> Send a test email to yourself before sending to all subscribers</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span><strong>Mobile-friendly:</strong> Use inline styles and keep width under 600px</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span><strong>Clear CTA:</strong> Include a clear call-to-action button</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span><strong>Personalize:</strong> Use {"{{name}}"} to make emails feel personal</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span><strong>Value first:</strong> Provide value before asking for anything</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
