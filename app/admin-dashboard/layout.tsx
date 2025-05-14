"use client";

import { AuthGuard } from "@/components/AuthGuard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { BarChart3, Building2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Home, Landmark, LogOut, MapPin, Menu, Music, Settings, Shield, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

// Navigation items
const navItems = [
   { name: "Dashboard", href: "/admin-dashboard", icon: Home },
   { name: "Neighborhoods", href: "/admin-dashboard/neighborhoods", icon: MapPin },
   { name: "Cities", href: "/admin-dashboard/cities", icon: Building2 },
   { name: "Districts", href: "/admin-dashboard/districts", icon: Landmark },
   { name: "Venues", href: "/admin-dashboard/venues", icon: Music },
   { name: "Users", href: "/admin-dashboard/users", icon: Users },
   { name: "Permissions", href: "/admin-dashboard/permissions", icon: Shield },
   { name: "Roles", href: "/admin-dashboard/roles", icon: Settings },
   { name: "Analytics", href: "/admin-dashboard/analytics", icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
   const [collapsed, setCollapsed] = useState(false);
   const [mobileOpen, setMobileOpen] = useState(false);
   const pathname = usePathname();
   const { logout: contextLogout } = useAuth();

   useEffect(() => {
      const checkIfMobile = () => {
         // Use 768px as the breakpoint (md)
         setCollapsed(window.innerWidth < 768 || collapsed);
      };

      // Set initial state
      checkIfMobile();

      // Add event listener for window resize
      window.addEventListener("resize", checkIfMobile);

      // Cleanup
      return () => window.removeEventListener("resize", checkIfMobile);
   }, [collapsed]);

   useEffect(() => {
      setMobileOpen(false);
   }, [pathname]);

   return (
      <AuthGuard>
         <div className="flex min-h-screen bg-background">
            {/* Mobile overlay */}
            {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)} />}

            {/* Sidebar */}
            <aside
               className={cn("fixed top-0 left-0 z-50 h-full bg-sidebar border-r border-gray-800 transition-all duration-300 flex flex-col", {
                  "w-16": collapsed && !mobileOpen,
                  "w-64": !collapsed || mobileOpen,
                  "translate-x-0": mobileOpen,
                  "-translate-x-full md:translate-x-0": !mobileOpen,
               })}
            >
               {/* Logo/Header */}
               <div className="h-16 border-b border-gray-800 flex items-center justify-between px-4">
                  <Link href="/admin-dashboard" className="flex items-center">
                     {collapsed && !mobileOpen ? (
                        <Image src="/just-logo.png" alt="Sound Connect Logo" width={32} height={32} className="min-w-8" />
                     ) : (
                        <Image src="/logo-nobg.png" alt="Sound Connect Logo" width={180} height={40} />
                     )}
                  </Link>
                  <Button variant="ghost" size="icon" className="text-white hover:text-sidebar-foreground block md:hidden" onClick={() => setMobileOpen(false)} aria-label="Close sidebar">
                     <X size={18} />
                  </Button>
               </div>

               {/* Navigation */}
               <nav className="flex-1 overflow-y-auto p-3 space-y-1">
                  {navItems.map((item) => {
                     const isActive = pathname === item.href;
                     const Icon = item.icon;

                     return (
                        <Link className="cursor-pointer group block" key={item.href} href={item.href}>
                           <Button
                              variant="ghost"
                              className={cn(
                                 "w-full justify-start text-white transition-all duration-300 bg-[length:0%_100%] bg-left bg-no-repeat group-hover:bg-[length:100%_100%] bg-gradient-to-r from-[#FB7C3E] to-[#9141E4]",
                                 "hover:text-white/90 cursor-pointer",
                                 isActive && "bg-gradient-to-r from-[#FB7C3E] to-[#9141E4] bg-[length:100%_100%] text-white font-medium",
                                 collapsed && !mobileOpen && "px-0 justify-center"
                              )}
                           >
                              <Icon className="h-5 w-5 min-w-5" />
                              {(!collapsed || mobileOpen) && <span className="ml-2">{item.name}</span>}
                           </Button>
                        </Link>
                     );
                  })}
               </nav>

               {/* Logout Button */}
               <div className="p-3 mt-auto border-t border-gray-800 group">
                  <Button
                     onClick={contextLogout}
                     variant="ghost"
                     className={cn(
                        "w-full justify-start text-white transition-all duration-300 bg-[length:0%_100%] bg-left bg-no-repeat group-hover:bg-[length:100%_100%] bg-gradient-to-r from-[#FB7C3E] to-[#9141E4] cursor-pointer",
                        "hover:text-white/90",
                        collapsed && !mobileOpen && "px-0 justify-center"
                     )}
                  >
                     <LogOut className="h-5 w-5 min-w-5" />
                     {(!collapsed || mobileOpen) && <span className="ml-2">Logout</span>}
                  </Button>
               </div>
            </aside>

            {/* Toggle Sidebar Button */}
            <button
               onClick={() => setCollapsed(!collapsed)}
               className={cn(
                  "fixed top-[72px] z-50 hidden md:flex items-center justify-center h-6 w-6 rounded-full bg-sidebar-accent text-white shadow-md hover:bg-sidebar-accent/90 hover:scale-125 transition-all duration-300 cursor-pointer",
                  {
                     "left-[52px]": collapsed,
                     "left-[244px]": !collapsed,
                  }
               )}
               aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
               {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar border-b border-sidebar-border z-30 flex items-center px-4">
               <Button variant="default" size="icon" className="bg-white text-black mr-3" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                  <Menu size={24} />
               </Button>
               <Image src="/logo-nobg.png" alt="Sound Connect Logo" width={140} height={32} />
            </div>

            {/* Main Content */}
            <main
               className={cn("flex-1 transition-all duration-300 pt-16 md:pt-0", {
                  "md:pl-16": collapsed && !mobileOpen,
                  "md:pl-64": (!collapsed && !mobileOpen) || mobileOpen,
               })}
            >
               <div className="p-6">{children}</div>
            </main>
         </div>
      </AuthGuard>
   );
}
