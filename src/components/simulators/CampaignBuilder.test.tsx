import {fireEvent,render,screen} from "@testing-library/react";
import {describe,expect,it,vi} from "vitest";
import {CampaignBuilder} from "./CampaignBuilder";

vi.mock("@/app/actions/campaign-builder",()=>({submitCampaignBuildAction:vi.fn()}));

describe("CampaignBuilder",()=>{
  it("shows the seven-part structure preview and updates budget validation",()=>{
    render(<CampaignBuilder bestScore={0}/>);
    expect(screen.getByText(/Haraya Home \| B0LUNCH001 \| SP \| Research/i)).toBeInTheDocument();
    const budget=screen.getByLabelText(/Daily budget/i);
    fireEvent.change(budget,{target:{value:"60"}});
    expect(screen.getByText(/Account cap is \$50/i)).toBeInTheDocument();
  });
});
