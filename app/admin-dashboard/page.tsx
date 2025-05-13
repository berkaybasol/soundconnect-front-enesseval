"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Building2, Landmark, MapPin, Music, Shield, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

function AdminPage() {
   const { logout } = useAuth();
   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-white">Admin Dashboard</h1>
         </div>
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/admin-dashboard/neighborhoods">
               <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-xl font-medium text-white">Neighborhoods</CardTitle>
                     <MapPin className="h-5 w-5 text-orange-400" />
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-zinc-400">Manage neighborhood data and locations.</p>
                  </CardContent>
               </Card>
            </Link>
            <Link href="/admin-dashboard/cities">
               <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-xl font-medium text-white">Cities</CardTitle>
                     <Building2 className="h-5 w-5 text-purple-400" />
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-zinc-400">Manage city data and related transactions.</p>
                  </CardContent>
               </Card>
            </Link>
            <Link href="/admin-dashboard/districts">
               <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-xl font-medium text-white">Districts</CardTitle>
                     <Landmark className="h-5 w-5 text-orange-400" />
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-zinc-400">Manage district data and transactions.</p>
                  </CardContent>
               </Card>
            </Link>
            <Link href="/admin-dashboard/venues">
               <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-xl font-medium text-white">Venues</CardTitle>
                     <Music className="h-5 w-5 text-purple-400" />
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-zinc-400">Manage venue information and transactions.</p>
                  </CardContent>
               </Card>
            </Link>
            <Link href="/admin-dashboard/users">
               <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-xl font-medium text-white">Users</CardTitle>
                     <Users className="h-5 w-5 text-orange-400" />
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-zinc-400">Manage user accounts and permissions.</p>
                  </CardContent>
               </Card>
            </Link>
            <Link href="/admin-dashboard/permissions">
               <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-xl font-medium text-white">Permissions & Roles</CardTitle>
                     <Shield className="h-5 w-5 text-purple-400" />
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-zinc-400">Manage system permissions and user roles.</p>
                  </CardContent>
               </Card>
            </Link>
         </div>
         <div className="mt-8">
            <Card className="bg-zinc-900/50 border-zinc-800">
               <CardHeader>
                  <CardTitle className="text-xl font-medium text-white">System Overview</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                     <div className="flex flex-col space-y-1.5">
                        <span className="text-sm text-zinc-400">Total Cities</span>
                        <span className="text-3xl font-bold text-gradient-to-r from-orange-400 to-purple-500">24</span>
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <span className="text-sm text-zinc-400">Total Districts</span>
                        <span className="text-3xl font-bold text-gradient-to-r from-orange-400 to-purple-500">216</span>
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <span className="text-sm text-zinc-400">Total Venues</span>
                        <span className="text-3xl font-bold text-gradient-to-r from-orange-400 to-purple-500">129</span>
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <span className="text-sm text-zinc-400">Active Users</span>
                        <span className="text-3xl font-bold text-gradient-to-r from-orange-400 to-purple-500">5,235</span>
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <span className="text-sm text-zinc-400">User Roles</span>
                        <span className="text-3xl font-bold text-gradient-to-r from-orange-400 to-purple-500">8</span>
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <span className="text-sm text-zinc-400">System Permissions</span>
                        <span className="text-3xl font-bold text-gradient-to-r from-orange-400 to-purple-500">32</span>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
         <div className="mt-8">
            <Card className="bg-zinc-900/50 border-zinc-800">
               <CardHeader>
                  <CardTitle className="text-xl font-medium text-white">Recent Activity</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="space-y-4">
                     <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-orange-400/10 flex items-center justify-center mr-3">
                           <Users className="h-5 w-5 text-orange-400" />
                        </div>
                        <div>
                           <p className="text-sm text-white">New user registered</p>
                           <p className="text-xs text-zinc-500">2 minutes ago</p>
                        </div>
                     </div>
                     <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-purple-400/10 flex items-center justify-center mr-3">
                           <Building2 className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                           <p className="text-sm text-white">New city added: Istanbul</p>
                           <p className="text-xs text-zinc-500">15 minutes ago</p>
                        </div>
                     </div>
                     <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-orange-400/10 flex items-center justify-center mr-3">
                           <Music className="h-5 w-5 text-orange-400" />
                        </div>
                        <div>
                           <p className="text-sm text-white">New venue updated: Babylon</p>
                           <p className="text-xs text-zinc-500">32 minutes ago</p>
                        </div>
                     </div>
                     <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-purple-400/10 flex items-center justify-center mr-3">
                           <Shield className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                           <p className="text-sm text-white">Permission updated: Content Manager</p>
                           <p className="text-xs text-zinc-500">1 hour ago</p>
                        </div>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
}

export default AdminPage;
