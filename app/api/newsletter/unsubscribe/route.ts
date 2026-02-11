import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * POST /api/newsletter/unsubscribe
 * Unsubscribe a user from the newsletter
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, reason } = body;

        // Validate email
        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Valid email is required" },
                { status: 400 }
            );
        }

        // Find subscriber
        const q = query(
            collection(db, "subscribers"),
            where("email", "==", email.toLowerCase())
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return NextResponse.json(
                { error: "Email not found in subscriber list" },
                { status: 404 }
            );
        }

        const subscriberDoc = querySnapshot.docs[0];
        const subscriberData = subscriberDoc.data();

        // Update status to unsubscribed with reason
        await updateDoc(subscriberDoc.ref, {
            status: "unsubscribed",
            unsubscribedAt: serverTimestamp(),
            unsubscribeReason: reason || "Prefer not to say",
        });

        // Send confirmation email to subscriber and notification to admin
        try {
            const { sendUnsubscribeConfirmation, sendUnsubscribeNotification } = await import("@/lib/email");

            // Send confirmation to subscriber
            await sendUnsubscribeConfirmation(email, subscriberData.name, reason);

            // Send notification to admin
            await sendUnsubscribeNotification(email, subscriberData.name, reason);
        } catch (emailError) {
            console.error("Error sending unsubscribe emails:", emailError);
            // Don't fail the unsubscribe if email fails
        }

        return NextResponse.json({
            success: true,
            message: "Successfully unsubscribed from newsletter",
        });
    } catch (error) {
        console.error("Newsletter unsubscribe error:", error);
        return NextResponse.json(
            { error: "Failed to unsubscribe. Please try again." },
            { status: 500 }
        );
    }
}
