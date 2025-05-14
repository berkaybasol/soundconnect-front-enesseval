import { axiosInstance } from "@/lib/axiosInstance";
import { City } from "@/types/City";
import { District } from "@/types/District";
import { SystemOverview } from "@/types/SystemOverview";
import { User } from "@/types/User";
import { Venue } from "@/types/Venue";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { Role } from "@/types/Role";
import { Permission } from "@/types/User";

const AdminContext = createContext<{
   users: User[];
   cities: City[];
   districts: District[];
   venues: Venue[];
   roles: Role[];
   permissions: Permission[];
   systemOverview: SystemOverview;
}>({
   users: [],
   cities: [],
   districts: [],
   venues: [],
   roles: [],
   permissions: [],
   systemOverview: {
      usersLength: 0,
      citiesLength: 0,
      districtsLenght: 0,
      venuesLenght: 0,
      rolesLength: 0,
      permissionsLength: 0,
   },
});

export const AdminProvider = ({ children }: { children: ReactNode }) => {
   const { roles: userRoles } = useAuth();

   const [users, setUsers] = useState<User[]>([]);
   const [cities, setCities] = useState<City[]>([]);
   const [districts, setDistricts] = useState<District[]>([]);
   const [venues, setVenues] = useState<Venue[]>([]);
   const [roles, setRoles] = useState<Role[]>([]);
   const [permissions, setPermissions] = useState<Permission[]>([]);
   const [systemOverview, setSystemOverview] = useState<SystemOverview>({
      usersLength: 0,
      citiesLength: 0,
      districtsLenght: 0,
      venuesLenght: 0,
      rolesLength: 0,
      permissionsLength: 0,
   });

   useEffect(() => {
      // Kullanıcı verilerini çekme
      const fetchUsers = async () => {
         const response = await axiosInstance.get("/users/get-all-users");

         if (response.data.success) {
            setUsers(response.data);
            setSystemOverview((prev) => ({
               ...prev,
               usersLength: response.data.data.length,
            }));
         }
      };

      // Şehir verilerini çekme
      const fetchCities = async () => {
         const response = await axiosInstance.get("/cities/get-all-cities");

         if (response.data.success) {
            setCities(response.data.data);
            setSystemOverview((prev) => ({
               ...prev,
               citiesLength: response.data.data.length,
            }));
         }
      };

      const fetchDistrict = async () => {
         const response = await axiosInstance.get("/districts/get-all-districts");

         if (response.data.success) {
            setDistricts(response.data.data);
            setSystemOverview((prev) => ({
               ...prev,
               districtLenght: response.data.data.lenght,
            }));
         }
      };

      const fetchVenue = async () => {
         const response = await axiosInstance.get("/venues/get-all");

         if (response.data.success) {
            setVenues(response.data.data);
            setSystemOverview((prev) => ({
               ...prev,
               venueLenght: response.data.data.lenght,
            }));
         }
      };

      const fetchRoles = async () => {
         const response = await axiosInstance.get("/roles/get-all-roles");

         if (response.data.success) {
            setRoles(response.data.data);
            setSystemOverview((prev) => ({
               ...prev,
               rolesLenght: response.data.data.length,
            }));
         }
      };

      const fetchPermissions = async () => {
         const response = await axiosInstance.get("/permissions/get-all-permissions");

         if (response.data.success) {
            setPermissions(response.data.data);
            setSystemOverview((prev) => ({
               ...prev,
               permissionsLenght: response.data.data.length,
            }));
         }
      };

      fetchUsers();
      fetchCities();
      fetchDistrict();
      fetchVenue();
      if (userRoles.includes("ROLE_OWNER")) {
         fetchRoles();
         fetchPermissions();
      }
   }, []);

   return <AdminContext.Provider value={{ users, cities, districts, venues, roles, permissions, systemOverview }}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
   const context = useContext(AdminContext);
   if (!context) throw new Error("useAdmin must be used within an AdminProvider");

   return context;
};
