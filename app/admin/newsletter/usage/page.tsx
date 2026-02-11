"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NewsletterUsageGuide() {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/admin/newsletter"
                        className="inline-flex items-center text-[#FF8A00] hover:text-[#FF4D00] mb-4 transition-colors"
                    >
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Newsletter System Usage Guide</h1>
                    <p className="text-xl text-gray-600">
                        Learn how to effectively use the newsletter system to engage with your subscribers
                    </p>
                </div>

                {/* Table of Contents */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-2xl p-8 mb-12 text-white"
                >
                    <h2 className="text-2xl font-bold mb-4">📋 Table of Contents</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="#what-is-newsletter" className="hover:underline">
                                1. What is a Newsletter System?
                            </a>
                        </li>
                        <li>
                            <a href="#how-it-works" className="hover:underline">
                                2. How It Works
                            </a>
                        </li>
                        <li>
                            <a href="#managing-subscribers" className="hover:underline">
                                3. Managing Subscribers
                            </a>
                        </li>
                        <li>
                            <a href="#practical-scenarios" className="hover:underline">
                                4. Practical Scenarios
                            </a>
                        </li>
                        <li>
                            <a href="#best-practices" className="hover:underline">
                                5. Best Practices
                            </a>
                        </li>
                        <li>
                            <a href="#system-features" className="hover:underline">
                                6. System Features
                            </a>
                        </li>
                    </ul>
                </motion.div>

                {/* Content Sections */}
                <div className="space-y-12">
                    {/* Section 1 */}
                    <section id="what-is-newsletter" className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">📧 What is a Newsletter System?</h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed mb-4">
                                A newsletter system is a powerful tool that allows you to communicate directly with people who are
                                interested in your business. Think of it as a direct line to your audience&apos;s inbox.
                            </p>
                            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Key Benefits:</h3>
                            <ul className="space-y-2 text-gray-700">
                                <li>
                                    <strong>Direct Communication:</strong> Reach your audience without relying on social media algorithms
                                </li>
                                <li>
                                    <strong>Build Relationships:</strong> Regular updates keep your business top-of-mind
                                </li>
                                <li>
                                    <strong>Drive Traffic:</strong> Share blog posts, promotions, and updates to bring people to your
                                    website
                                </li>
                                <li>
                                    <strong>Increase Sales:</strong> Promote products, services, and special offers directly
                                </li>
                                <li>
                                    <strong>Own Your Audience:</strong> Unlike social media, you control your subscriber list
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section id="how-it-works" className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">⚙️ How It Works</h2>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FF8A00] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">People Subscribe</h3>
                                    <p className="text-gray-700">
                                        Visitors enter their email address in the subscription form on your website (usually in the footer
                                        or blog pages). They&apos;re automatically added to your subscriber list.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FF8A00] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">You Manage Subscribers</h3>
                                    <p className="text-gray-700">
                                        View all subscribers in your admin dashboard. You can see who subscribed, when they subscribed, and
                                        their status (active or unsubscribed).
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FF8A00] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Campaigns</h3>
                                    <p className="text-gray-700">
                                        Write your newsletter content, add images, and format it beautifully. You can save drafts and
                                        preview before sending.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FF8A00] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                                    4
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Send or Schedule</h3>
                                    <p className="text-gray-700">
                                        Send your newsletter immediately or schedule it for a specific date and time. The system
                                        automatically sends to all active subscribers.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-[#FF8A00] text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                                    5
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Results</h3>
                                    <p className="text-gray-700">
                                        Monitor how many people opened your email and clicked on links. Use this data to improve future
                                        campaigns.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section id="managing-subscribers" className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">👥 Managing Subscribers</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Viewing Subscribers</h3>
                                <p className="text-gray-700 mb-4">
                                    Navigate to <code className="bg-gray-100 px-2 py-1 rounded">/admin/newsletter</code> to see your
                                    complete subscriber list. You&apos;ll see:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                                    <li>Email address</li>
                                    <li>Name (if provided)</li>
                                    <li>Subscription status (active/unsubscribed)</li>
                                    <li>Date they subscribed</li>
                                    <li>Source (where they signed up from)</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Search & Filter</h3>
                                <p className="text-gray-700">
                                    Use the search bar to find specific subscribers by email or name. Filter by status to see only active
                                    or unsubscribed users.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Export to CSV</h3>
                                <p className="text-gray-700">
                                    Click the &quot;Export CSV&quot; button to download your subscriber list as a spreadsheet. This is useful for:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-2">
                                    <li>Backup purposes</li>
                                    <li>Importing to other email marketing tools</li>
                                    <li>Analyzing subscriber growth trends</li>
                                    <li>Sharing with your team</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Deleting Subscribers</h3>
                                <p className="text-gray-700">
                                    Click &quot;Delete&quot; next to any subscriber to remove them permanently. Use this for:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-2">
                                    <li>Invalid or bounced email addresses</li>
                                    <li>Duplicate entries</li>
                                    <li>Spam or fake subscriptions</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section id="practical-scenarios" className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">💡 Practical Scenarios</h2>

                        <div className="space-y-8">
                            {/* Scenario 1 */}
                            <div className="border-l-4 border-[#FF8A00] pl-6">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                    Scenario 1: Monthly Blog Roundup
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                                    <p className="text-gray-700 mb-4">
                                        <strong>Goal:</strong> Keep subscribers engaged with your latest content
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        <strong>What to do:</strong>
                                    </p>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                                        <li>At the end of each month, review your published blog posts</li>
                                        <li>Create a new campaign with subject: &quot;This Month&apos;s Top Articles from Nexus Web&quot;</li>
                                        <li>
                                            Write a brief intro: &quot;Here&apos;s what we covered this month to help your business grow online...&quot;
                                        </li>
                                        <li>Add 3-5 blog post summaries with links to read more</li>
                                        <li>Include a call-to-action: &quot;Need help with your website? Contact us today!&quot;</li>
                                        <li>Schedule to send on the 1st of next month at 9 AM</li>
                                    </ol>
                                    <p className="text-gray-700 mt-4">
                                        <strong>Expected Result:</strong> Increased blog traffic, better engagement, and potential new
                                        clients
                                    </p>
                                </div>
                            </div>

                            {/* Scenario 2 */}
                            <div className="border-l-4 border-blue-500 pl-6">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                    Scenario 2: New Service Launch
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                                    <p className="text-gray-700 mb-4">
                                        <strong>Goal:</strong> Announce a new service to your audience
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        <strong>What to do:</strong>
                                    </p>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Create campaign: &quot;Introducing Our New E-Commerce Development Service&quot;</li>
                                        <li>Explain the problem: &quot;Many Trinidad &amp; Tobago businesses struggle to sell online...&quot;</li>
                                        <li>Present your solution: &quot;We now offer complete e-commerce solutions...&quot;</li>
                                        <li>List key features and benefits</li>
                                        <li>Add a special offer: &quot;First 5 clients get 20% off!&quot;</li>
                                        <li>Include clear call-to-action button: &quot;Schedule Free Consultation&quot;</li>
                                        <li>Send immediately to build momentum</li>
                                    </ol>
                                    <p className="text-gray-700 mt-4">
                                        <strong>Expected Result:</strong> New service inquiries and early adopter clients
                                    </p>
                                </div>
                            </div>

                            {/* Scenario 3 */}
                            <div className="border-l-4 border-green-500 pl-6">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Scenario 3: Seasonal Promotion</h3>
                                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                                    <p className="text-gray-700 mb-4">
                                        <strong>Goal:</strong> Drive sales during Carnival season
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        <strong>What to do:</strong>
                                    </p>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Create campaign: &quot;Carnival Special: Get Your Business Online Before The Rush!&quot;</li>
                                        <li>Highlight urgency: &quot;Carnival is coming - is your website ready?&quot;</li>
                                        <li>Offer time-limited discount: &quot;15% off all web design packages until February 28th&quot;</li>
                                        <li>Show social proof: &quot;Join 50+ Trinidad businesses we&apos;ve helped this year&quot;</li>
                                        <li>Add countdown timer or deadline reminder</li>
                                        <li>Send 2 weeks before Carnival, with reminder 3 days before deadline</li>
                                    </ol>
                                    <p className="text-gray-700 mt-4">
                                        <strong>Expected Result:</strong> Increased conversions due to urgency and seasonal relevance
                                    </p>
                                </div>
                            </div>

                            {/* Scenario 4 */}
                            <div className="border-l-4 border-purple-500 pl-6">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                                    Scenario 4: Re-engagement Campaign
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-6 mb-4">
                                    <p className="text-gray-700 mb-4">
                                        <strong>Goal:</strong> Win back inactive subscribers
                                    </p>
                                    <p className="text-gray-700 mb-4">
                                        <strong>What to do:</strong>
                                    </p>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                                        <li>Identify subscribers who haven&apos;t opened emails in 3+ months</li>
                                        <li>Create campaign: &quot;We Miss You! Here&apos;s What You&apos;ve Been Missing&quot;</li>
                                        <li>Summarize best content from past 3 months</li>
                                        <li>Ask for feedback: &quot;What content would you like to see?&quot;</li>
                                        <li>Offer incentive: &quot;Reply to this email for a free website audit&quot;</li>
                                        <li>Include easy unsubscribe option (respect their choice)</li>
                                    </ol>
                                    <p className="text-gray-700 mt-4">
                                        <strong>Expected Result:</strong> Re-engaged subscribers or clean list of truly interested people
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 5 */}
                    <section id="best-practices" className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">✨ Best Practices</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center gap-2">
                                    <span>✅</span> DO
                                </h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>• Send consistently (weekly, bi-weekly, or monthly)</li>
                                    <li>• Personalize with subscriber&apos;s name when possible</li>
                                    <li>• Write compelling subject lines (under 50 characters)</li>
                                    <li>• Include clear call-to-action buttons</li>
                                    <li>• Test emails before sending to full list</li>
                                    <li>• Make unsubscribe easy and visible</li>
                                    <li>• Provide value in every email</li>
                                    <li>• Optimize for mobile devices</li>
                                </ul>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center gap-2">
                                    <span>❌</span> DON&apos;T
                                </h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li>• Send too frequently (daily emails annoy people)</li>
                                    <li>• Use ALL CAPS or excessive exclamation marks!!!</li>
                                    <li>• Send without a clear purpose or value</li>
                                    <li>• Buy email lists (illegal and ineffective)</li>
                                    <li>• Hide the unsubscribe link</li>
                                    <li>• Use misleading subject lines</li>
                                    <li>• Send at random times (be consistent)</li>
                                    <li>• Forget to proofread before sending</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h3 className="text-lg font-semibold text-blue-900 mb-3">📊 Optimal Sending Times</h3>
                            <p className="text-gray-700 mb-4">Based on Trinidad & Tobago audience behavior:</p>
                            <ul className="space-y-2 text-gray-700">
                                <li>
                                    <strong>Best Days:</strong> Tuesday, Wednesday, Thursday
                                </li>
                                <li>
                                    <strong>Best Times:</strong> 9-11 AM or 2-4 PM (when people check email at work)
                                </li>
                                <li>
                                    <strong>Avoid:</strong> Weekends, public holidays, late evenings
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Section 6 */}
                    <section id="system-features" className="bg-white rounded-2xl p-8 shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">🚀 System Features</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Current Features</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>Subscriber management dashboard</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>Subscribe form for website</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>Automatic duplicate prevention</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>Unsubscribe functionality</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>Search and filter subscribers</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>Export to CSV</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-600 mt-1">✓</span>
                                        <span>Subscriber statistics</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="border border-gray-200 rounded-lg p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Coming Soon</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-600 mt-1">⏳</span>
                                        <span>Campaign creation interface</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-600 mt-1">⏳</span>
                                        <span>Rich text email editor</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-600 mt-1">⏳</span>
                                        <span>Email scheduling</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-600 mt-1">⏳</span>
                                        <span>Open and click tracking</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-600 mt-1">⏳</span>
                                        <span>Subscriber segmentation with tags</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-600 mt-1">⏳</span>
                                        <span>Automated welcome emails</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-orange-600 mt-1">⏳</span>
                                        <span>Email templates library</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Quick Start */}
                    <section className="bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] rounded-2xl p-8 text-white">
                        <h2 className="text-3xl font-bold mb-6">🎯 Quick Start Checklist</h2>
                        <div className="space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 rounded" />
                                <span>Add subscribe form to website footer</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 rounded" />
                                <span>Test the subscription process yourself</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 rounded" />
                                <span>Plan your first newsletter content</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 rounded" />
                                <span>Set a consistent sending schedule</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5 rounded" />
                                <span>Review subscriber list weekly</span>
                            </label>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="mt-12 text-center">
                    <Link
                        href="/admin/newsletter"
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8A00] to-[#FF4D00] text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                    >
                        Go to Newsletter Dashboard →
                    </Link>
                </div>
            </div>
        </div>
    );
}
