import Navigation from "@/components/Navigation"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <Navigation />
      <main className="flex-grow">{children}</main>
    </div>
  )
}
