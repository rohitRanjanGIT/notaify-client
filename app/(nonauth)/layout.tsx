import Footer from "@/lib/components/hf/footer";
import { ClerkProvider } from "@clerk/nextjs";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            {children}
            <Footer />
        </ClerkProvider>
    );
}
