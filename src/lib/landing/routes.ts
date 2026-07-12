export type Audience = "starting" | "shifting" | "experienced";

export type LearnerRoute = {
  slug: string;
  title: string;
  description: string;
  firstMission: string;
  evidence: string;
};

const ROUTES: Record<Audience, LearnerRoute> = {
  starting: {
    slug: "va-career-starter",
    title: "VA Career Starter",
    description: "Learn how remote VA work operates, what clients expect, and where Amazon PPC fits before you touch campaign data.",
    firstMission: "Turn a client request into a clear task, deadline, and proof of completion.",
    evidence: "Client-ready work brief and first scored practice mission.",
  },
  shifting: {
    slug: "career-shift-bridge",
    title: "Career Shift Bridge",
    description: "Translate your existing experience into VA-ready strengths, then close gaps in tools, communication, and Amazon operations.",
    firstMission: "Turn one previous responsibility into a portfolio-ready VA proof item.",
    evidence: "Transferable-skills map and Amazon readiness score.",
  },
  experienced: {
    slug: "amazon-foundations",
    title: "Amazon Foundations",
    description: "Skip basic remote-work orientation and build the catalog, listing, retail, and advertising context PPC depends on.",
    firstMission: "Diagnose whether a performance issue belongs to the listing, offer, or advertising layer.",
    evidence: "Listing-readiness audit and Amazon workflow map.",
  },
};

export function getLearnerRoute(audience: Audience): LearnerRoute {
  return ROUTES[audience];
}
