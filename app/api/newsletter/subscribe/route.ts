import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs, addDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * POST /api/newsletter/subscribe
 * Subscribe a user to the newsletter
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, name, source = "footer" } = body;

        // Validate email
        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Valid email is required" },
                { status: 400 }
            );
        }

        // Check if email already exists
        const q = query(
            collection(db, "subscribers"),
            where("email", "==", email.toLowerCase())
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const existingDoc = querySnapshot.docs[0];
            const existingData = existingDoc.data();

            // If previously unsubscribed, reactivate them
            if (existingData.status === "unsubscribed") {
                await updateDoc(existingDoc.ref, {
                    status: "active",
                    subscribedAt: serverTimestamp(), // Update to current time
                    unsubscribedAt: null,
                    unsubscribeReason: null,
                });

                // Send welcome back email
                try {
                    const { sendWelcomeEmail } = await import("@/lib/email");
                    await sendWelcomeEmail(email, existingData.name || name);
                } catch (emailError) {
                    console.error("Error sending welcome back email:", emailError);
                }

                return NextResponse.json({
                    success: true,
                    message: "Welcome back! You've been resubscribed to our newsletter.",
                    reactivated: true,
                });
            }

            return NextResponse.json(
                { error: "Email already subscribed" },
                { status: 400 }
            );
        }

        // Add new subscriber
        const subscriberData = {
            email: email.toLowerCase(),
            name: name || null,
            status: "active",
            subscribedAt: serverTimestamp(),
            source,
            tags: [],
        };

        const docRef = await addDoc(collection(db, "subscribers"), subscriberData);

        // Send welcome email and admin notification
        try {
            const { sendWelcomeEmail, sendAdminNotification } = await import("@/lib/email");

            // Send welcome email to subscriber
            await sendWelcomeEmail(email, name);

            // Send notification to admin
            await sendAdminNotification(email, name);
        } catch (emailError) {
            console.error("Error sending emails:", emailError);
            // Don't fail the subscription if email fails
        }

        return NextResponse.json({
            success: true,
            message: "Successfully subscribed to newsletter!",
            id: docRef.id,
        });
    } catch (error) {
        console.error("Newsletter subscription error:", error);
        return NextResponse.json(
            { error: "Failed to subscribe. Please try again." },
            { status: 500 }
        );
    }
}
