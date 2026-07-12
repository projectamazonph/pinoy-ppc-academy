import {fireEvent,render,screen} from "@testing-library/react";
import {describe,expect,it} from "vitest";
import {TacosCalculator} from "./TacosCalculator";

describe("TacosCalculator",()=>{
  it("compares identical ACoS with different TACoS",()=>{
    render(<TacosCalculator/>);
    expect(screen.getAllByText("25%")).toHaveLength(2);
    expect(screen.getByText("20%",{selector:"strong"})).toBeInTheDocument();
    expect(screen.getByText("10%",{selector:"strong"})).toBeInTheDocument();
    expect(screen.getByText(/Scenario B has the lower TACoS/i)).toBeInTheDocument();
  });
  it("recalculates when total sales change",()=>{
    render(<TacosCalculator/>);
    fireEvent.change(screen.getByLabelText("Scenario A total sales"),{target:{value:"100000"}});
    expect(screen.getAllByText("10%",{selector:"strong"})).toHaveLength(2);
    expect(screen.getByText(/Both scenarios have the same TACoS/i)).toBeInTheDocument();
  });
});
