"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdmin } from "@/context/AdminContext";
import { useAuth } from "@/context/AuthContext";
import { Building2, Landmark, MapPin, Music, Shield, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const adminCards = [
   {
      title: "Şehirler",
      href: "/admin-dashboard/cities",
      description: "Şehir verilerini ve ilgili işlemleri yönetin.",
      icon: Building2,
      color: "text-[#9141E4]",
   },
   {
      title: "İlçeler",
      href: "/admin-dashboard/districts",
      description: "İlçe verilerini ve işlemlerini yönetin.",
      icon: Landmark,
      color: "text-[#FB7C3E]",
   },
   {
      title: "Mahalleler",
      href: "/admin-dashboard/neighborhoods",
      description: "Mahalle verilerini ve konumlarını yönetin.",
      icon: MapPin,
      color: "text-[#9141E4]",
   },
   {
      title: "Mekanlar",
      href: "/admin-dashboard/venues",
      description: "Mekan bilgilerini ve işlemleri yönetin.",
      icon: Music,
      color: "text-[#FB7C3E]",
   },
   {
      title: "Kullanıcılar",
      href: "/admin-dashboard/users",
      description: "Kullanıcı hesaplarını ve izinlerini yönetin.",
      icon: Users,
      color: "text-[#9141E4]",
   },
   {
      title: "İzinler",
      href: "/admin-dashboard/permissions",
      description: "Sistem izinlerini ve kullanıcı rollerini yönetin.",
      icon: Shield,
      color: "text-[#FB7C3E]",
   },
];

function AdminPage() {
   const { systemOverview } = useAdmin();
   const { roles } = useAuth();

   return (
      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-white">Yönetici Paneli</h1>
         </div>
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {adminCards.map((card, idx) => (
               <Link key={idx} href={card.href}>
                  <Card className="bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 transition-all transform hover:scale-[1.03] hover:shadow-xl min-h-[150px]">
                     <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-xl font-medium text-white">{card.title}</CardTitle>
                        <card.icon className={`h-5 w-5 ${card.color}`} />
                     </CardHeader>
                     <CardContent>
                        <p className="text-sm text-zinc-400">{card.description}</p>
                     </CardContent>
                  </Card>
               </Link>
            ))}
         </div>
         <div className="mt-8">
            <Card className="bg-zinc-900/50 border-zinc-800">
               <CardHeader>
                  <CardTitle className="text-xl font-medium text-white">Sistem Genel Bakışı</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="grid gap-6 md:grid-cols-3">
                     <div className="flex flex-col space-y-1.5">
                        <span className="text-sm text-zinc-400">Aktif Kullanıcılar</span>
                        <span className="text-3xl font-bold text-[#FB7C3E]">{systemOverview.usersLenght === 0 ? "0" : systemOverview.usersLenght}</span>
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <span className="text-sm text-zinc-400">Toplam Şehirler</span>
                        <span className="text-3xl font-bold text-[#9141E4]">{systemOverview.citiesLenght === 0 ? "0" : systemOverview.citiesLenght}</span>
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <span className="text-sm text-zinc-400">Toplam İlçeler</span>
                        <span className="text-3xl font-bold text-[#FB7C3E]">{systemOverview.districtsLenght === 0 ? "0" : systemOverview.districtsLenght}</span>
                     </div>
                     <div className="flex flex-col space-y-1.5">
                        <span className="text-sm text-zinc-400">Toplam Mekanlar</span>
                        <span className="text-3xl font-bold text-[#9141E4]">{systemOverview.venuesLenght === 0 ? "0" : systemOverview.venuesLenght}</span>
                     </div>
                     {roles.includes("ROLE_OWNER") && (
                        <>
                           <div className="flex flex-col space-y-1.5">
                              <span className="text-sm text-zinc-400">Roller</span>
                              <span className="text-3xl font-bold text-[#FB7C3E]">{systemOverview.rolesLenght === 0 ? "0" : systemOverview.rolesLenght}</span>
                           </div>
                           <div className="flex flex-col space-y-1.5">
                              <span className="text-sm text-zinc-400">İzinler</span>
                              <span className="text-3xl font-bold text-[#9141E4]">{systemOverview.permissionsLenght === 0 ? "0" : systemOverview.permissionsLenght}</span>
                           </div>
                        </>
                     )}
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
