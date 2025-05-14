export interface Permission {
   id: string;
   createdAt: string;
   updatedAt: string;
   name: string;
}

export interface Role {
   id: string;
   createdAt: string;
   updatedAt: string;
   name: string;
   permissions: Permission[];
   users: string[];
}

export interface UserDetail {
   id: string;
   createdAt: string;
   updatedAt: string;
   username: string;
   password: string;
   email: string;
   phone: string;
   description: string;
   gender: string;
   city: string;
   status: string;
   roles: Role[];
   permissions: Permission[];
   instruments: string[];
   profilePicture: string;
}

export interface Instrument {
   id: string;
   createdAt: string;
   updatedAt: string;
   name: string;
   user: UserDetail;
}

export interface User {
   id: string;
   username: string;
   gender: string;
   city: string;
   instruments: Instrument[];
   followers: number;
   following: number;
   roles: string[];
}
