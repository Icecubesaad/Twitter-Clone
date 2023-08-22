import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

export default function RootLayout({ children }) {
    return (
        <main className="w-full flex flex-row">
        <LeftSidebar/>
        {children}
        <RightSidebar/>
        </main>
    )
}