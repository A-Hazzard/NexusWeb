"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const unsubscribeReasons = [
    "I receive too many emails",
    "The content is not relevant to me",
    "I didn't sign up for this",
    "The emails are too promotional",
    "I'm no longer interested",
    "Other",
    "Prefer not to say",
];

function UnsubscribeContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const [selectedReason, setSelectedReason] = useState("");
    const [otherReason, setOtherReason] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleReasonSelect = (reason: string) => {
        setSelectedReason(reason);
        if (reason !== "Other") {
            setOtherReason("");
        }
        setShowConfirmation(true);
    };

    const handleBack = () => {
        setShowConfirmation(false);
        setSelectedReason("");
        setOtherReason("");
    };

    const handleUnsubscribe = async () => {
        if (!email) {
            setError("Email address is required");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const finalReason = selectedReason === "Other" ? otherReason : selectedReason;

            const response = await fetch("/api/newsletter/unsubscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    reason: finalReason || "Prefer not to say"
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
            } else {
                setError(data.error || "Failed to unsubscribe");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!email) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">❌</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h1>
                    <p className="text-gray-600 mb-6">
                        This unsubscribe link is invalid or expired.
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                        Go to Homepage
                    </Link>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
                >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">✓</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Successfully Unsubscribed</h1>
                    <p className="text-gray-600 mb-6">
                        You&apos;ve been removed from our newsletter list. We&apos;re sorry to see you go!
                    </p>
                    <p className="text-sm text-gray-500 mb-6">
                        Email: <strong>{email}</strong>
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                        Return to Homepage
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">📧</span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Unsubscribe from Newsletter</h1>
                    <p className="text-gray-600">
                        We&apos;re sorry to see you go! Help us improve by telling us why.
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Email: <strong>{email}</strong>
                    </p>
                </div>

                {!showConfirmation ? (
                    /* Reason Selection */
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Why are you unsubscribing?
                        </h2>

                        <div className="space-y-3">
                            {unsubscribeReasons.map((reason) => (
                                <motion.button
                                    key={reason}
                                    onClick={() => handleReasonSelect(reason)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full p-4 text-left border-2 border-gray-200 rounded-lg hover:border-[#FF8A00] hover:bg-orange-50 transition-all"
                                >
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-3"></div>
                                        <span className="text-gray-700 font-medium">{reason}</span>
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        <div className="pt-6 text-center">
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 font-medium"
                            >
                                ← Never mind, take me back
                            </Link>
                        </div>
                    </div>
                ) : (
                    /* Confirmation */
                    <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                You selected:
                            </h2>
                            <p className="text-gray-700 font-medium mb-4">&quot;{selectedReason}&quot;</p>

                            {selectedReason === "Other" && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Please tell us more (optional):
                                    </label>
                                    <textarea
                                        value={otherReason}
                                        onChange={(e) => setOtherReason(e.target.value)}
                                        placeholder="Your feedback helps us improve..."
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] resize-none"
                                    />
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-800 text-sm">{error}</p>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button
                                onClick={handleBack}
                                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                ← Back
                            </button>
                            <button
                                onClick={handleUnsubscribe}
                                disabled={loading}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Unsubscribing..." : "Confirm Unsubscribe"}
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export default function UnsubscribePage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        }>
            <UnsubscribeContent />
        </Suspense>
    );
}
