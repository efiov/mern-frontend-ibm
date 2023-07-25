import { UserRole } from "@prisma/client";
import type { User } from "next-auth";

type UserId = string;

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: UserRole;
  }
}
