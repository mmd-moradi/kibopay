"use client";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from 'react'

type Props = {
  href: string;
  title: string;
  icon: React.ReactNode;
}
const SideBarItem = ({href, icon, title}: Props) => {
  const pathname = usePathname()
  const isActive = pathname === href;
  return (
    <Link 
      href={href}
      className={cn("flex items-center text-sm gap-2 py-4 text-muted-foreground cursor-pointer pl-8 hover:bg-muted hover:text-primary transition-all ease-in-out duration-100", isActive && "text-primary font-medium")}
    >
      {icon}
      <span>{title}</span>
    </Link>
  )
}

export default SideBarItem