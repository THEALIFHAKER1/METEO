import Navigation from "@/components/Navigation"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div
      className={` flex-col  px-[1rem] antialiased selection:bg-black selection:text-white dark:bg-black dark:selection:bg-white dark:selection:text-black md:px-[2rem] `}
    >
      <Navigation />
      <main className="flex-grow">{children}</main>
    </div>
  )
}
