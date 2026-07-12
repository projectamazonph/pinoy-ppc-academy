import { createHash, randomBytes, randomUUID } from "node:crypto"; import type { AuthRepository,PublicUser,UserRecord } from "../domain/auth"; import { toPublicUser } from "../domain/auth"; import { hashPassword,validatePassword,verifyPassword } from "../domain/password";
export class InvalidCredentialsError extends Error{constructor(){super("Email or password is incorrect");this.name="InvalidCredentialsError"}}
export class DuplicateEmailError extends Error{constructor(){super("An account with this email already exists");this.name="DuplicateEmailError"}}
export class ValidationError extends Error{constructor(message:string,readonly fieldErrors:Record<string,string[]>={}){super(message);this.name="ValidationError"}}
interface Deps{now?:()=>Date;createId?:()=>string;createToken?:()=>string;sessionTtlMs?:number}
export class AuthService{
 private now; private createId; private createToken; private ttl;
 constructor(private repo:AuthRepository,d:Deps={}){this.now=d.now??(()=>new Date());this.createId=d.createId??randomUUID;this.createToken=d.createToken??(()=>randomBytes(32).toString("base64url"));this.ttl=d.sessionTtlMs??1209600000}
 async signUp(input:{displayName:string;email:string;password:string}){const email=input.email.trim().toLowerCase(),displayName=input.displayName.trim().replace(/\s+/g," "),fields:Record<string,string[]>={}; if(displayName.length<2)fields.displayName=["Enter your full name"]; if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))fields.email=["Enter a valid email address"]; const pe=validatePassword(input.password);if(pe.length)fields.password=pe;if(Object.keys(fields).length)throw new ValidationError("Check the highlighted fields",fields);if(await this.repo.findUserByEmail(email))throw new DuplicateEmailError();const t=this.now();const u:UserRecord={id:this.createId(),email,displayName,passwordHash:await hashPassword(input.password),role:"STUDENT",createdAt:t,updatedAt:t};await this.repo.createUser(u);return this.session(u)}
 async signIn(input:{email:string;password:string}){const u=await this.repo.findUserByEmail(input.email.trim().toLowerCase());if(!u||!(await verifyPassword(input.password,u.passwordHash)))throw new InvalidCredentialsError();return this.session(u)}
 async authenticate(token:string|null|undefined):Promise<PublicUser|null>{if(!token)return null;const s=await this.repo.findSessionByTokenHash(hash(token));if(!s||s.revokedAt||s.expiresAt<=this.now())return null;const u=await this.repo.findUserById(s.userId);return u?toPublicUser(u):null}
 async signOut(token:string|null|undefined){if(token)await this.repo.revokeSession(hash(token),this.now())}
 private async session(u:UserRecord){const token=this.createToken(),t=this.now(),expiresAt=new Date(t.getTime()+this.ttl);await this.repo.createSession({id:this.createId(),userId:u.id,tokenHash:hash(token),expiresAt,revokedAt:null,createdAt:t});return{user:toPublicUser(u),sessionToken:token,expiresAt}}
}
const hash=(v:string)=>createHash("sha256").update(v).digest("hex");
