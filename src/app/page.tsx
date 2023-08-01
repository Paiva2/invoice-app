import HomeMiddleSection from "@/components/HomeMiddleSection"
import SidebarMenu from "@/components/SidebarMenu"

export default function Home() {
  return (
    <main className="w-full min-h-screen flex">
      <SidebarMenu />

      <HomeMiddleSection />
    </main>
  )
}
