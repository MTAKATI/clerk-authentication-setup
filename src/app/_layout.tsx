import "../global.css";
import {ClerkProvider} from "@clerk/clerk-expo";
import {Slot} from "expo-router";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import React from "react";

export default function Layout() {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
    
    //console.log('Clerk Publishable Key:', publishableKey ? 'Loaded' : 'Missing');
    
    return (
        <ClerkProvider 
            publishableKey={publishableKey}
            tokenCache={tokenCache}
        >
            <Slot />
        </ClerkProvider>
    )
}