// @vitest-environment node
import {afterEach,describe,expect,it} from "vitest";
import {mkdtempSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {openAcademyDatabase} from "@/modules/shared/infrastructure/sqlite-database";
import {SqliteReadinessRepository} from "./sqlite-readiness-repository";
import type {ReadinessAssessmentRecord} from "../domain/readiness";

const folders:string[]=[];
afterEach(()=>{for(const folder of folders.splice(0))rmSync(folder,{recursive:true,force:true})});

const record:ReadinessAssessmentRecord={
  id:"assessment-1",userId:"user-1",score:88,route:"amazon-foundations",
  title:"Continue to Amazon Foundations",summary:"Ready for the next route.",
  actions:["Learn the vocabulary.","Complete the exercises.","Build one sample."],
  input:{deviceReady:true,internetReady:true,backupReady:true,secureAccessReady:true,digitalSkills:4,communicationSkills:4,weeklyStudyHours:8,amazonInterest:"high",previousRole:"Team leader",transferableSkill:"Coaching"},
  createdAt:new Date("2026-07-13T12:00:00Z")
};

function createUser(database:ReturnType<typeof openAcademyDatabase>){
  database.prepare("INSERT INTO users VALUES(?,?,?,?,?,?,?)").run("user-1","learner@example.com","Learner","hash","STUDENT","2026-07-13T00:00:00.000Z","2026-07-13T00:00:00.000Z");
}

describe("SqliteReadinessRepository",()=>{
  it("persists a recommendation after the database is reopened",async()=>{
    const folder=mkdtempSync(join(tmpdir(),"pinoy-ppc-readiness-"));folders.push(folder);
    const path=join(folder,"academy.sqlite");
    const first=openAcademyDatabase(path);createUser(first);
    await new SqliteReadinessRepository(first).save(record);first.close();
    const second=openAcademyDatabase(path);
    const saved=await new SqliteReadinessRepository(second).getLatestForUser("user-1");
    expect(saved).toEqual(record);second.close();
  });
});
