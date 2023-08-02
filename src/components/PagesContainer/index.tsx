import React from "react"

const PagesContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full min-h-screen flex py-20">
      <div className="w-full h-screen flex flex-col items-center text-pure-white">
        {children}
      </div>
    </main>
  )
}

export default PagesContainer
