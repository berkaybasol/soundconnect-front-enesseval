"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";
import { BarChart3, Building2, ChevronsLeft, ChevronsRight, Home, Landmark, MapPin, Music, Settings, Shield, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
   const [collapsed, setCollapsed] = useState(false);
   return (
      <AuthGuard allowedRoles={["ROLE_ADMIN", "ROLE_OWNER"]}>
         <SidebarProvider defaultOpen={!collapsed}>
            <div className="flex min-h-screen w-full bg-gradient-to-br from-black via-gray-950 to-black">
               <Sidebar className="border-r border-zinc-800 transition-all duration-300" style={{ width: collapsed ? "64px" : "240px" }}>
                  <SidebarHeader className="border-b border-zinc-800 flex items-center justify-between p-4">
                     <Link href="/admin-dashboard" className={`flex items-center ${collapsed ? "justify-center" : "justify-start"} gap-2`}>
                        {!collapsed ? <Image src={"/logo-nobg.png"} alt="logo" width={100} height={45} /> : <Image src={"/logo-nobg.png"} alt="logo" width={50} height={20} />}
                     </Link>
                     <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white" onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
                     </Button>
                  </SidebarHeader>
                  <SidebarContent className="p-2">
                     <nav className="grid gap-1">
                        <Link href="/admin-dashboard">
                           <Button variant="ghost" className={`w-full justify-${collapsed ? "center" : "start"} text-zinc-400 hover:text-white hover:bg-zinc-800`}>
                              <Home className="h-5 w-5 min-w-5" />
                              {!collapsed && <span className="ml-2">Dashboard</span>}
                           </Button>
                        </Link>
                        <Link href="/admin-dashboard/neighborhoods">
                           <Button variant="ghost" className={`w-full justify-${collapsed ? "center" : "start"} text-zinc-400 hover:text-white hover:bg-zinc-800`}>
                              <MapPin className="h-5 w-5 min-w-5" />
                              {!collapsed && <span className="ml-2">Neighborhoods</span>}
                           </Button>
                        </Link>
                        <Link href="/admin-dashboard/cities">
                           <Button variant="ghost" className={`w-full justify-${collapsed ? "center" : "start"} text-zinc-400 hover:text-white hover:bg-zinc-800`}>
                              <Building2 className="h-5 w-5 min-w-5" />
                              {!collapsed && <span className="ml-2">Cities</span>}
                           </Button>
                        </Link>
                        <Link href="/admin-dashboard/districts">
                           <Button variant="ghost" className={`w-full justify-${collapsed ? "center" : "start"} text-zinc-400 hover:text-white hover:bg-zinc-800`}>
                              <Landmark className="h-5 w-5 min-w-5" />
                              {!collapsed && <span className="ml-2">Districts</span>}
                           </Button>
                        </Link>
                        <Link href="/admin-dashboard/venues">
                           <Button variant="ghost" className={`w-full justify-${collapsed ? "center" : "start"} text-zinc-400 hover:text-white hover:bg-zinc-800`}>
                              <Music className="h-5 w-5 min-w-5" />
                              {!collapsed && <span className="ml-2">Venues</span>}
                           </Button>
                        </Link>
                        <Link href="/admin-dashboard/users">
                           <Button variant="ghost" className={`w-full justify-${collapsed ? "center" : "start"} text-zinc-400 hover:text-white hover:bg-zinc-800`}>
                              <Users className="h-5 w-5 min-w-5" />
                              {!collapsed && <span className="ml-2">Users</span>}
                           </Button>
                        </Link>
                        <Link href="/admin-dashboard/permissions">
                           <Button variant="ghost" className={`w-full justify-${collapsed ? "center" : "start"} text-zinc-400 hover:text-white hover:bg-zinc-800`}>
                              <Shield className="h-5 w-5 min-w-5" />
                              {!collapsed && <span className="ml-2">Permissions</span>}
                           </Button>
                        </Link>
                        <Link href="/admin-dashboard/roles">
                           <Button variant="ghost" className={`w-full justify-${collapsed ? "center" : "start"} text-zinc-400 hover:text-white hover:bg-zinc-800`}>
                              <Settings className="h-5 w-5 min-w-5" />
                              {!collapsed && <span className="ml-2">Roles</span>}
                           </Button>
                        </Link>
                        <Link href="/admin-dashboard/analytics">
                           <Button variant="ghost" className={`w-full justify-${collapsed ? "center" : "start"} text-zinc-400 hover:text-white hover:bg-zinc-800`}>
                              <BarChart3 className="h-5 w-5 min-w-5" />
                              {!collapsed && <span className="ml-2">Analytics</span>}
                           </Button>
                        </Link>
                     </nav>
                  </SidebarContent>
               </Sidebar>
               <main className="flex-1 overflow-auto p-6 transition-all duration-300">{children}</main>
            </div>
         </SidebarProvider>
      </AuthGuard>
   );
}
