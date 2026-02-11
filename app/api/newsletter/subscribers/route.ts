import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, addDoc, deleteDoc, doc, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

/**
 * GET /api/newsletter/subscribers
 * Get all newsletter subscribers (admin only)
 */
export async function GET() {
    try {
        // TODO: Add admin authentication check
        // For now, we'll return all subscribers

        const q = query(
            collection(db, "subscribers"),
            orderBy("subscribedAt", "desc")
        );
        const querySnapshot = await getDocs(q);

        const subscribers = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            subscribedAt: doc.data().subscribedAt?.toDate?.()?.toISOString() || null,
            unsubscribedAt: doc.data().unsubscribedAt?.toDate?.()?.toISOString() || null,
        })) as Array<{
            id: string;
            email: string;
            name?: string;
            status: "active" | "unsubscribed";
            subscribedAt: string | null;
            unsubscribedAt?: string | null;
            unsubscribeReason?: string;
            source: string;
            tags?: string[];
        }>;

        return NextResponse.json({
            subscribers,
            total: subscribers.length,
            active: subscribers.filter((s) => s.status === "active").length,
            unsubscribed: subscribers.filter((s) => s.status === "unsubscribed").length,
        });
    } catch (error) {
        console.error("Error fetching subscribers:", error);
        return NextResponse.json(
            { error: "Failed to fetch subscribers" },
            { status: 500 }
        );
    }
}

/**
 * POST /api/newsletter/subscribers
 * Add a subscriber manually (admin only)
 */
export async function POST(request: NextRequest) {
    try {
        // TODO: Add admin authentication check

        const body = await request.json();
        const { email, name, tags = [] } = body;

        // Validate email
        if (!email || !email.includes("@")) {
            return NextResponse.json(
                { error: "Valid email is required" },
                { status: 400 }
            );
        }

        // Add subscriber
        const subscriberData = {
            email: email.toLowerCase(),
            name: name || null,
            status: "active",
            subscribedAt: serverTimestamp(),
            source: "manual",
            tags,
        };

        const docRef = await addDoc(collection(db, "subscribers"), subscriberData);

        return NextResponse.json({
            success: true,
            message: "Subscriber added successfully",
            id: docRef.id,
        });
    } catch (error) {
        console.error("Error adding subscriber:", error);
        return NextResponse.json(
            { error: "Failed to add subscriber" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/newsletter/subscribers
 * Delete a subscriber (admin only)
 */
export async function DELETE(request: NextRequest) {
    try {
        // TODO: Add admin authentication check

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { error: "Subscriber ID is required" },
                { status: 400 }
            );
        }

        await deleteDoc(doc(db, "subscribers", id));

        return NextResponse.json({
            success: true,
            message: "Subscriber deleted successfully",
        });
    } catch (error) {
        console.error("Error deleting subscriber:", error);
        return NextResponse.json(
            { error: "Failed to delete subscriber" },
            { status: 500 }
        );
    }
}
