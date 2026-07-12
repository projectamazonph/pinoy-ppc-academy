export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN";
export interface UserRecord { id:string; email:string; displayName:string; passwordHash:string; role:UserRole; createdAt:Date; updatedAt:Date }
export interface SessionRecord { id:string; userId:string; tokenHash:string; expiresAt:Date; revokedAt:Date|null; createdAt:Date }
export interface PublicUser { id:string; email:string; displayName:string; role:UserRole }
export interface AuthRepository {
  findUserByEmail(email:string):Promise<UserRecord|null>; findUserById(id:string):Promise<UserRecord|null>; createUser(user:UserRecord):Promise<void>;
  createSession(session:SessionRecord):Promise<void>; findSessionByTokenHash(tokenHash:string):Promise<SessionRecord|null>; revokeSession(tokenHash:string, revokedAt:Date):Promise<void>;
}
export const toPublicUser=(u:UserRecord):PublicUser=>({id:u.id,email:u.email,displayName:u.displayName,role:u.role});
