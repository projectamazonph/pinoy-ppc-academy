import {describe,expect,it} from "vitest";
import {PPC_FOUNDATIONS_MODULES} from "./content";
describe("PPC Foundations content",()=>{
  it("includes seven ordered modules with a dedicated TACoS lesson",()=>{
    expect(PPC_FOUNDATIONS_MODULES).toHaveLength(7);
    expect(PPC_FOUNDATIONS_MODULES[1]?.title).toBe("TACoS and Business Health");
    expect(PPC_FOUNDATIONS_MODULES.map(item=>item.title)).toContain("Campaign Types: SP, SB, and SD");
    for(const lesson of PPC_FOUNDATIONS_MODULES){
      expect(lesson.outcomes).toHaveLength(3);
      expect(lesson.quickCheck.questions).toHaveLength(2);
    }
  });
  it("preserves safe operating rules",()=>{
    const text=JSON.stringify(PPC_FOUNDATIONS_MODULES);
    expect(text).toMatch(/down only/i);
    expect(text).toMatch(/negative exact/i);
    expect(text).toMatch(/negative phrase/i);
    expect(text).toMatch(/hold/i);
    expect(text).toMatch(/inventory/i);
  });
});
