import HomeMiddleSection from "@/components/HomeMiddleSection"
import SidebarMenu from "@/components/SidebarMenu"
import ArrowDown from "@/icons/ArrowDown"
import PlusSymbol from "@/icons/PlusSymbol"

export default function Home() {
  return (
    <main className="w-full min-h-screen flex">
      <SidebarMenu />

      <HomeMiddleSection />
    </main>
  )
}
