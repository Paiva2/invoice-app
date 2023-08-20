import React from "react"

const PagesContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full h-full flex pt-10 lg:h-[80%] lg:pt-[1.3rem]">
      <div className="w-full h-full flex flex-col items-center text-pure-white gap-10 overflow-y-auto pb-[2rem]">
        {children}
      </div>
    </main>
  )
}

export default PagesContainer
