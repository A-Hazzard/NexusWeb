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
        <>
            <PopupModal
                url={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/"}
                onModalClose={closeBooking}
                open={isOpen}
                rootElement={rootElement}
            />
            <style dangerouslySetInnerHTML={{
                __html: `
                .calendly-popup {
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    padding: 20px !important;
                }
                .calendly-popup-content {
                    height: 90vh !important;
                    max-height: 95vh !important;
                    width: 100% !important;
                    max-width: 1060px !important;
                    border-radius: 24px !important;
                    margin: 0 !important;
                }
                @media (max-width: 1060px) {
                    .calendly-popup-content {
                        width: 95vw !important;
                    }
                }
                @media (max-width: 768px) {
                    .calendly-popup {
                        padding: 10px !important;
                    }
                    .calendly-popup-content {
                        height: 85vh !important;
                        max-height: 90vh !important;
                        width: 100% !important;
                        max-width: 480px !important;
                        border-radius: 16px !important;
                    }
                }
            `}} />
        </>
    );
}
