import type {QuizDefinition} from "@/modules/assessment/domain/assessment";

export const AMAZON_FOUNDATIONS_SLUG = "amazon-foundations";

export interface FoundationSection {
  title: string;
  paragraphs: string[];
  checklist?: string[];
}

export interface FoundationModule {
  id: string;
  title: string;
  summary: string;
  evidence: string;
  outcomes: [string, string, string];
  sections: FoundationSection[];
  quickCheck: QuizDefinition;
}

export const AMAZON_FOUNDATIONS_MODULES: FoundationModule[] = [
  {
    id: "amazon-01-marketplace-basics",
    title: "Marketplace Basics",
    summary: "Understand the people, systems, and identifiers behind an Amazon product page.",
    evidence: "Marketplace object map",
    outcomes: [
      "Explain Seller Central and Vendor Central in plain English",
      "Differentiate an ASIN, SKU, parent, and child variation",
      "Trace who owns a product, offer, and advertising decision",
    ],
    sections: [
      {
        title: "Amazon is a marketplace, not one store",
        paragraphs: [
          "Amazon shoppers see one product detail page, but the page can combine catalog information, seller offers, fulfillment choices, and advertising. A virtual assistant must know which layer is causing the issue before changing anything.",
          "Seller Central is used by third-party sellers. Vendor Central is used by brands or distributors selling wholesale to Amazon. The ownership, reporting, and operational controls differ.",
        ],
      },
      {
        title: "The identifiers you will see every week",
        paragraphs: [
          "An ASIN is Amazon's catalog identifier for a product detail page. A SKU is the seller's internal identifier for a specific offer. One parent ASIN can organize several child variations such as size or color.",
          "Do not treat these labels as interchangeable. A report grouped by SKU can show several offers tied to a smaller number of product pages.",
        ],
        checklist: ["Locate the ASIN", "Locate the seller SKU", "Identify parent and child relationships", "Confirm the marketplace"],
      },
      {
        title: "Start diagnosis with the object that owns the problem",
        paragraphs: [
          "A missing variation is a catalog problem. A stranded SKU is an offer or inventory problem. A campaign targeting the wrong child is an advertising structure problem.",
          "Name the object and owner before proposing an action. This prevents an advertising operator from trying to fix a catalog problem with bids.",
        ],
      },
    ],
    quickCheck: {
      id: "amazon-01-check",
      lessonId: "amazon-01-marketplace-basics",
      version: 1,
      passPercent: 80,
      questions: [
        {
          id: "am01-q1",
          prompt: "Which identifier represents Amazon's catalog product page?",
          choices: [{id: "a", label: "ASIN"}, {id: "b", label: "Seller SKU"}, {id: "c", label: "Campaign ID"}],
          correctChoiceId: "a",
          explanation: "The ASIN identifies the catalog product page. A SKU identifies a seller's offer.",
        },
        {
          id: "am01-q2",
          prompt: "A child size is missing from a variation. What should you diagnose first?",
          choices: [{id: "a", label: "Raise the ad bid"}, {id: "b", label: "Catalog and variation structure"}, {id: "c", label: "Add a negative keyword"}],
          correctChoiceId: "b",
          explanation: "Variation membership is a catalog issue, not a bid issue.",
        },
      ],
    },
  },
  {
    id: "amazon-02-listing-anatomy",
    title: "Listing Anatomy",
    summary: "Evaluate whether a product page can turn qualified traffic into orders.",
    evidence: "Listing readiness checklist",
    outcomes: [
      "Identify the conversion role of each listing element",
      "Separate traffic problems from listing problems",
      "Document listing gaps before recommending more ad spend",
    ],
    sections: [
      {
        title: "The listing is the landing page",
        paragraphs: [
          "Sponsored ads can bring shoppers to a product detail page, but the listing must earn the order. The title establishes relevance, images reduce uncertainty, bullets explain benefits, and reviews reduce perceived risk.",
          "A+ Content can improve understanding, but it does not replace a clear main image, competitive offer, or accurate variation structure.",
        ],
      },
      {
        title: "Read conversion signals before touching bids",
        paragraphs: [
          "High impressions with weak click-through rate can point to relevance, image, price, or offer issues. Healthy clicks with weak conversion can point to listing clarity, reviews, delivery, price, or inventory problems.",
          "Advertising metrics reveal symptoms. They do not automatically prove advertising caused the symptom.",
        ],
        checklist: ["Main image is compliant and clear", "Title matches shopper intent", "Benefits answer common objections", "Variations are accurate", "Reviews and rating are considered"],
      },
      {
        title: "Document the gap and expected impact",
        paragraphs: [
          "A useful audit names the element, evidence, shopper impact, and recommended owner. For example: the second image does not show scale, which can increase uncertainty for mobile shoppers; the content owner should add a dimension image.",
          "Do not promise a conversion lift you cannot verify. State what should improve and how you will measure it.",
        ],
      },
    ],
    quickCheck: {
      id: "amazon-02-check",
      lessonId: "amazon-02-listing-anatomy",
      version: 1,
      passPercent: 80,
      questions: [
        {id: "am02-q1", prompt: "Clicks are healthy but orders are weak. What should you inspect before raising bids?", choices: [{id: "a", label: "Listing, offer, reviews, and delivery"}, {id: "b", label: "Only the campaign name"}, {id: "c", label: "Nothing; increase spend"}], correctChoiceId: "a", explanation: "Healthy clicks with weak orders often require a conversion and offer diagnosis."},
        {id: "am02-q2", prompt: "Which audit note is most useful?", choices: [{id: "a", label: "Images are bad"}, {id: "b", label: "Image two lacks dimensions; add a scale visual and measure conversion rate"}, {id: "c", label: "Make it better"}], correctChoiceId: "b", explanation: "A useful note includes evidence, action, owner, and measurement."},
      ],
    },
  },
  {
    id: "amazon-03-offer-readiness",
    title: "Offer Readiness",
    summary: "Check Buy Box, price, inventory, fulfillment, coupons, and suppression before scaling traffic.",
    evidence: "Offer readiness decision",
    outcomes: [
      "Recognize the operational conditions ads depend on",
      "Stop unsafe spend when the offer cannot convert",
      "Assign offer problems to the correct owner",
    ],
    sections: [
      {
        title: "Ads need an eligible offer",
        paragraphs: [
          "The product page can exist while the advertised offer is unavailable, suppressed, overpriced, out of stock, or losing the Featured Offer. Traffic sent into those conditions can waste budget or fail to serve at all.",
          "Fulfillment method and delivery promise affect conversion. A slower or unreliable promise can weaken results even when the listing content is strong.",
        ],
      },
      {
        title: "Run the readiness check before optimization",
        paragraphs: [
          "Confirm inventory, Featured Offer eligibility, price, coupon state, fulfillment, suppression warnings, and expected replenishment. Record the time checked because these conditions can change quickly.",
          "If inventory is critically low, protect stock and coordinate pacing. If the offer is suppressed, pause affected promotion and escalate the root cause.",
        ],
        checklist: ["Featured Offer eligible", "Price checked", "Inventory checked", "Delivery promise checked", "No suppression", "Coupon state confirmed"],
      },
      {
        title: "Classify before acting",
        paragraphs: [
          "A Buy Box loss is an offer problem. Low stock is an inventory problem. A coupon ending is a pricing or promotion context change. These can change advertising performance without any bid change.",
          "Do not change bids until listing, inventory, price, and campaign structure have been classified.",
        ],
      },
    ],
    quickCheck: {
      id: "amazon-03-check",
      lessonId: "amazon-03-offer-readiness",
      version: 1,
      passPercent: 80,
      questions: [
        {id: "am03-q1", prompt: "The advertised SKU lost the Featured Offer. What is the first category to investigate?", choices: [{id: "a", label: "Offer readiness"}, {id: "b", label: "Keyword bid"}, {id: "c", label: "Campaign naming"}], correctChoiceId: "a", explanation: "Featured Offer eligibility belongs to offer readiness."},
        {id: "am03-q2", prompt: "Inventory will run out in three days. What is the safer response?", choices: [{id: "a", label: "Double bids"}, {id: "b", label: "Coordinate pacing and replenishment"}, {id: "c", label: "Ignore inventory"}], correctChoiceId: "b", explanation: "Advertising must account for inventory and replenishment risk."},
      ],
    },
  },
  {
    id: "amazon-04-business-metrics",
    title: "Business Metrics",
    summary: "Connect sessions, conversion, margin, and break-even ACoS to advertising decisions.",
    evidence: "Break-even ACoS worksheet",
    outcomes: [
      "Calculate conversion rate and contribution margin",
      "Explain break-even ACoS in plain English",
      "Separate ad efficiency from total business health",
    ],
    sections: [
      {
        title: "Start with the business equation",
        paragraphs: [
          "Revenue equals units sold multiplied by selling price. Conversion rate equals orders divided by sessions. Contribution margin is the money left after product, marketplace, fulfillment, and other variable costs.",
          "Advertising cannot be judged safely without knowing how much contribution is available to pay for customer acquisition.",
        ],
      },
      {
        title: "Break-even ACoS sets the ceiling",
        paragraphs: [
          "Break-even Advertising Cost of Sale, or ACoS, is the contribution margin percentage before advertising. If a product keeps ₱300 from a ₱1,000 sale before ads, break-even ACoS is 30 percent.",
          "A target below break-even preserves profit. A temporary target above it needs a documented growth reason, time limit, and measurement plan.",
        ],
        checklist: ["Confirm selling price", "Subtract variable costs", "Calculate contribution margin", "Convert margin to a percentage", "Set a justified target"],
      },
      {
        title: "ACoS is not the whole business",
        paragraphs: [
          "ACoS compares ad spend with ad-attributed sales. Total Advertising Cost of Sale, or TACoS, compares ad spend with total sales. TACoS helps show whether advertising is supporting broader organic growth or becoming a larger burden on the business.",
          "You will study TACoS deeply in PPC Foundations. Here, remember that a good-looking ACoS can still exist beside weak total sales or poor margin.",
        ],
      },
    ],
    quickCheck: {
      id: "amazon-04-check",
      lessonId: "amazon-04-business-metrics",
      version: 1,
      passPercent: 80,
      questions: [
        {id: "am04-q1", prompt: "A ₱1,000 product keeps ₱300 before advertising. What is break-even ACoS?", choices: [{id: "a", label: "30%"}, {id: "b", label: "70%"}, {id: "c", label: "₱300%"}], correctChoiceId: "a", explanation: "₱300 divided by ₱1,000 equals a 30 percent break-even ACoS."},
        {id: "am04-q2", prompt: "Which metric compares ad spend with total sales?", choices: [{id: "a", label: "CTR"}, {id: "b", label: "TACoS"}, {id: "c", label: "CPC"}], correctChoiceId: "b", explanation: "TACoS divides ad spend by total sales."},
      ],
    },
  },
  {
    id: "amazon-05-advertising-interface",
    title: "Advertising Interface",
    summary: "Map portfolios, campaigns, ad groups, product ads, targets, search terms, and creatives.",
    evidence: "Advertising object relationship map",
    outcomes: [
      "Explain the advertising object hierarchy",
      "Differentiate a target from a shopper search term",
      "Identify where settings and performance belong",
    ],
    sections: [
      {
        title: "The hierarchy controls where decisions live",
        paragraphs: [
          "A portfolio groups campaigns for organization and budget context. A campaign holds budget, dates, strategy, and major targeting settings. Ad groups organize product ads and targets inside supported campaign types.",
          "A product ad is the advertised ASIN. A target is what the advertiser chooses, such as a keyword, product, category, or audience. A search term is what the shopper actually typed or the traffic Amazon matched.",
        ],
      },
      {
        title: "Targets and search terms are not the same",
        paragraphs: [
          "The keyword wireless earbuds can match several shopper queries. Performance at the target level summarizes those matches; search-term reporting shows the actual queries or product pages that received traffic.",
          "This distinction is essential for harvesting, negation, and diagnosis. Never negate a target or query without checking its conversion evidence and match relationship.",
        ],
        checklist: ["Portfolio", "Campaign", "Ad group", "Product ad", "Target", "Search term", "Creative"],
      },
      {
        title: "Structure is one diagnostic category",
        paragraphs: [
          "Mixed goals, mismatched products, conflicting targets, or unclear naming can make data difficult to interpret. These are structure problems, not automatically bid problems.",
          "The diagnostic framework asks whether the issue is advertising execution, listing, inventory or price, or structure before any bid change.",
        ],
      },
    ],
    quickCheck: {
      id: "amazon-05-check",
      lessonId: "amazon-05-advertising-interface",
      version: 1,
      passPercent: 80,
      questions: [
        {id: "am05-q1", prompt: "What is the shopper's actual query called?", choices: [{id: "a", label: "Search term"}, {id: "b", label: "Portfolio"}, {id: "c", label: "Product ad"}], correctChoiceId: "a", explanation: "The search term is the shopper's actual query or matched traffic expression."},
        {id: "am05-q2", prompt: "Where does a daily campaign budget normally live?", choices: [{id: "a", label: "Search term"}, {id: "b", label: "Campaign"}, {id: "c", label: "Review"}], correctChoiceId: "b", explanation: "Budget is a campaign-level setting."},
      ],
    },
  },
  {
    id: "amazon-06-reporting-basics",
    title: "Reporting Basics",
    summary: "Read date ranges, attribution, report grain, totals, rates, and normal reporting delays.",
    evidence: "Report interpretation note",
    outcomes: [
      "Select a report based on the question being asked",
      "Distinguish totals from rates and dimensions from metrics",
      "Explain attribution and data delay limits",
    ],
    sections: [
      {
        title: "Begin with the question and grain",
        paragraphs: [
          "A campaign report answers campaign-level questions. A search-term report answers query-level questions. Grain means what one row represents. Mixing grains creates false conclusions and duplicated totals.",
          "Dimensions describe the row, such as date, campaign, ASIN, or search term. Metrics measure it, such as impressions, clicks, spend, orders, and sales.",
        ],
      },
      {
        title: "Totals and rates behave differently",
        paragraphs: [
          "Spend and sales can be added across compatible rows. Rates such as click-through rate, conversion rate, and ACoS should usually be recalculated from their component totals rather than averaged row by row.",
          "Always confirm currency, marketplace, attribution window, date range, timezone, and whether the report includes the same campaign types.",
        ],
        checklist: ["State the question", "Confirm one-row grain", "Check date and timezone", "Check attribution window", "Recalculate rates from totals"],
      },
      {
        title: "Recent data can still change",
        paragraphs: [
          "Clicks can appear before attributed orders and sales. Returns and attribution updates can change recent results. Do not overreact to an incomplete same-day window.",
          "Record the extraction time and compare like-for-like periods. Explain known delays instead of presenting provisional data as final.",
        ],
      },
    ],
    quickCheck: {
      id: "amazon-06-check",
      lessonId: "amazon-06-reporting-basics",
      version: 1,
      passPercent: 80,
      questions: [
        {id: "am06-q1", prompt: "How should you combine ACoS across several rows?", choices: [{id: "a", label: "Average the percentages"}, {id: "b", label: "Divide total spend by total ad sales"}, {id: "c", label: "Add the percentages"}], correctChoiceId: "b", explanation: "Recalculate ACoS from compatible total spend and total ad sales."},
        {id: "am06-q2", prompt: "Why should you avoid judging incomplete same-day data?", choices: [{id: "a", label: "Attribution and reporting can lag"}, {id: "b", label: "Campaigns never report daily"}, {id: "c", label: "Rates cannot be calculated"}], correctChoiceId: "a", explanation: "Orders, sales, and adjustments can arrive after clicks."},
      ],
    },
  },
];

export function getAmazonFoundationsModule(id: string) {
  return AMAZON_FOUNDATIONS_MODULES.find((module) => module.id === id);
}
