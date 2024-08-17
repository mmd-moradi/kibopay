import SideBarItem from "@/components/sidebar-item"
import { ArrowsRightLeftIcon, ArrowUpRightIcon } from "@heroicons/react/20/solid"
import { ClockIcon } from "@heroicons/react/20/solid"
import { HomeIcon } from "@heroicons/react/20/solid"


const Layout = ({children}: {children: React.ReactNode}) => {
  const routes = [
      {title: "Home", href: "/dashboard", icon: <HomeIcon className="w-6 h-6" />},
      {title: "Transfer", href: "/transfer", icon: <ArrowsRightLeftIcon className="w-6 h-6" />},
      {title: "Transactions", href: "/transactions", icon: <ClockIcon className="w-6 h-6" />},
      {title: "P2P Transfer", href: "/p2p", icon: <ArrowUpRightIcon className="w-6 h-6" />},
    ]
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:[280px_1fr]">
      <div className="hidden border-r border-slate-300 bg-muted/10 md:block">
        <div className="flex h-full max-h-screen flex-col">
          <div className="flex-1 mt-24">
            <nav className="grid items-start">
              {routes.map((route, index) => (
                <SideBarItem title={route.title} href={route.href} icon={route.icon} key={index} />
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="mt-24 px-4 pt-4">
        {children}
      </div>
    </div>
  )
}

export default Layout





