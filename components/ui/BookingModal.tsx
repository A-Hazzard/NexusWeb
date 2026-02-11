"use client";

import React, { useEffect, useState } from "react";
import { PopupModal } from "react-calendly";
import { useBooking } from "@/lib/contexts/BookingContext";

export default function BookingModal() {
    const { isOpen, closeBooking } = useBooking();
    const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        // Wait for the component to mount to access the document
        setRootElement(document.getElementById("root") || document.body);
    }, []);

    if (!rootElement) return null;

    return (
        <PopupModal
            url="https://calendly.com/nexusweb/consultation" // Placeholder URL
            onModalClose={closeBooking}
            open={isOpen}
            rootElement={rootElement}
        />
    );
}
