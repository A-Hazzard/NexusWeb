import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { sendCampaign } from "@/lib/email";

/**
 * POST /api/newsletter/send
 * Send a newsletter campaign to all active subscribers
 */
export async function POST(request: NextRequest) {
    try {
        // TODO: Add admin authentication check

        const body = await request.json();
        const { subject, htmlContent } = body;

        if (!subject || !htmlContent) {
            return NextResponse.json(
                { error: "Subject and content are required" },
                { status: 400 }
            );
        }

        // Get all active subscribers
        const q = query(
            collection(db, "subscribers"),
            where("status", "==", "active")
        );
        const querySnapshot = await getDocs(q);

        const subscribers = querySnapshot.docs.map((doc) => ({
            email: doc.data().email,
            name: doc.data().name,
        }));

        if (subscribers.length === 0) {
            return NextResponse.json(
                { error: "No active subscribers found" },
                { status: 400 }
            );
        }

        // Send campaign
        const results = await sendCampaign(subscribers, subject, htmlContent);

        return NextResponse.json({
            success: true,
            message: `Campaign sent successfully!`,
            results: {
                total: subscribers.length,
                sent: results.sent,
                failed: results.failed,
            },
        });
    } catch (error) {
        console.error("Error sending campaign:", error);
        return NextResponse.json(
            { error: "Failed to send campaign" },
            { status: 500 }
        );
    }
}
