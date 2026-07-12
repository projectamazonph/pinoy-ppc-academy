import type { AcademyDatabase } from "@/modules/shared/infrastructure/sqlite-database";
import type { AuthRepository, SessionRecord, UserRecord, UserRole } from "../domain/auth";
interface UserRow { id:string; email:string; display_name:string; password_hash:string; role:UserRole; created_at:string; updated_at:string }
interface SessionRow { id:string; user_id:string; token_hash:string; expires_at:string; revoked_at:string|null; created_at:string }
const user=(r:UserRow):UserRecord=>({id:r.id,email:r.email,displayName:r.display_name,passwordHash:r.password_hash,role:r.role,createdAt:new Date(r.created_at),updatedAt:new Date(r.updated_at)});
export class SqliteAuthRepository implements AuthRepository {
  constructor(private d:AcademyDatabase) {}
  async findUserByEmail(email:string){const r=this.d.prepare("SELECT id,email,display_name,password_hash,role,created_at,updated_at FROM users WHERE email=?").get(email) as unknown as UserRow|undefined;return r?user(r):null}
  async findUserById(id:string){const r=this.d.prepare("SELECT id,email,display_name,password_hash,role,created_at,updated_at FROM users WHERE id=?").get(id) as unknown as UserRow|undefined;return r?user(r):null}
  async createUser(u:UserRecord){try{this.d.prepare("INSERT INTO users VALUES(?,?,?,?,?,?,?)").run(u.id,u.email,u.displayName,u.passwordHash,u.role,u.createdAt.toISOString(),u.updatedAt.toISOString())}catch(error){if(String(error).includes("UNIQUE"))throw new Error("already exists");throw error}}
  async createSession(s:SessionRecord){this.d.prepare("INSERT INTO sessions VALUES(?,?,?,?,?,?)").run(s.id,s.userId,s.tokenHash,s.expiresAt.toISOString(),s.revokedAt?.toISOString()??null,s.createdAt.toISOString())}
  async findSessionByTokenHash(hash:string){const r=this.d.prepare("SELECT id,user_id,token_hash,expires_at,revoked_at,created_at FROM sessions WHERE token_hash=?").get(hash) as unknown as SessionRow|undefined;return r?{id:r.id,userId:r.user_id,tokenHash:r.token_hash,expiresAt:new Date(r.expires_at),revokedAt:r.revoked_at?new Date(r.revoked_at):null,createdAt:new Date(r.created_at)}:null}
  async revokeSession(hash:string,time:Date){this.d.prepare("UPDATE sessions SET revoked_at=? WHERE token_hash=?").run(time.toISOString(),hash)}
}
