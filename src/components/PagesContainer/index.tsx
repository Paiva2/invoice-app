import React from "react"

const PagesContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-screen flex py-16">
      <div className="w-full h-full flex flex-col items-center text-pure-white gap-10">
        {children}
      </div>
    </main>
  )
}

export default PagesContainer
