"use client";

import {useMemo,useState} from "react";
import {calculateTacos,compareTacosScenarios,type TacosInput} from "@/modules/ppc-foundations/domain/tacos";

const defaults:{first:TacosInput;second:TacosInput}={
  first:{adSpend:10000,adSales:40000,totalSales:50000},
  second:{adSpend:10000,adSales:40000,totalSales:100000},
};

const pct=(value:number|null)=>value===null?"—":`${value}%`;
const amount=(value:number)=>new Intl.NumberFormat("en-PH",{maximumFractionDigits:0}).format(value);

export function TacosCalculator(){
  const[first,setFirst]=useState(defaults.first);
  const[second,setSecond]=useState(defaults.second);
  const comparison=useMemo(()=>{
    try{return{value:compareTacosScenarios(first,second),error:null}}catch(error){return{value:null,error:error instanceof Error?error.message:"Check the amounts."}}
  },[first,second]);
  const update=(scenario:"first"|"second",key:keyof TacosInput,value:string)=>{
    const number=Number(value);
    const setter=scenario==="first"?setFirst:setSecond;
    setter(current=>({...current,[key]:Number.isFinite(number)?number:0}));
  };
  const interpretation=comparison.value?.healthierScenario==="first"
    ?"Scenario A has the lower TACoS, so the same advertising economics sit inside a larger total-sales base."
    :comparison.value?.healthierScenario==="second"
      ?"Scenario B has the lower TACoS, so the same advertising economics sit inside a larger total-sales base."
      :"Both scenarios have the same TACoS. Compare the component totals and business context before deciding which is healthier.";

  return <div className="tacos-calculator">
    <div className="tacos-scenarios">
      {(["first","second"] as const).map((scenario,index)=>{
        const input=scenario==="first"?first:second;
        const result=comparison.value?.[scenario]??calculateTacos(defaults[scenario]);
        const label=`Scenario ${index===0?"A":"B"}`;
        return <section key={scenario}>
          <header><span className="mono">{label}</span><strong>{pct(result.tacos)}</strong><small>TACoS</small></header>
          <div className="tacos-inputs">
            <label>{label} ad spend<input aria-label={`${label} ad spend`} type="number" min={0} value={input.adSpend} onChange={event=>update(scenario,"adSpend",event.target.value)}/></label>
            <label>{label} ad sales<input aria-label={`${label} ad sales`} type="number" min={0} value={input.adSales} onChange={event=>update(scenario,"adSales",event.target.value)}/></label>
            <label>{label} total sales<input aria-label={`${label} total sales`} type="number" min={0} value={input.totalSales} onChange={event=>update(scenario,"totalSales",event.target.value)}/></label>
          </div>
          <dl>
            <div><dt>ACoS</dt><dd>{pct(result.acos)}</dd></div>
            <div><dt>Organic sales</dt><dd>{amount(result.organicSales)}</dd></div>
            <div><dt>Ad sales share</dt><dd>{pct(result.adSalesShare)}</dd></div>
          </dl>
        </section>;
      })}
    </div>
    {comparison.error?<p className="form-error" role="alert">{comparison.error}</p>:<section className="tacos-interpretation"><span className="mono">INTERPRETATION</span><h2>{comparison.value?.sameAcos?"Same ACoS. Different business dependence.":"Compare the economics and the total-sales context."}</h2><p>{interpretation}</p><ul><li>Check whether total sales grew or ad spend changed.</li><li>Check organic sales, price, inventory, listing changes, and seasonality.</li><li>Do not claim TACoS alone proves organic rank movement.</li></ul></section>}
  </div>;
}
