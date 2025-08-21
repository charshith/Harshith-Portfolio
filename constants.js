// constants.js
// IMPORTANT: use a relative import unless your alias is configured
import RoleCard from "./components/Work/RoleCard";

// -----------------------------
// META DATA
// -----------------------------
export const METADATA = {
  author: "Harshith Charugulla",
  title: "Portfolio | Harshith Charugulla",
  description:
    "Harshith Charugulla — Full Stack Developer & Data Engineer. Experienced in AI-driven SaaS, GraphQL microservices, and real-time analytics. Skilled in React, Django, Flask, and AWS.",
  siteUrl: "https://your-portfolio-url.com/",
  twitterHandle: "@yourhandle",
  keywords: [
    "Harshith Charugulla",
    "Full Stack Developer",
    "Data Engineer",
    "React Developer",
    "GraphQL",
    "Portfolio",
  ].join(", "),
  image: "/preview.png",
  language: "English",
  themeColor: "#000000",
};

export const MENULINKS = [
  { name: "Home", ref: "home" },
  { name: "Skills", ref: "skills" },
  { name: "Projects", ref: "projects" },
  { name: "Work", ref: "work" },
  { name: "Contact", ref: "contact" },
];

// -----------------------------
// HERO TYPED STRINGS
// -----------------------------
export const TYPED_STRINGS = [
  "Full Stack Developer",
  "Data Engineer",
  "I build AI-driven SaaS",
  "GraphQL • React • AWS",
];

// -----------------------------
// SOCIAL LINKS
// -----------------------------
export const SOCIAL_LINKS = [
  { name: "mail", url: "mailto:mailharshithc@gmail.com" },
  { name: "linkedin", url: "https://www.linkedin.com/in/harshith-charugulla" },
  { name: "github", url: "https://github.com/charshith" },
  { name: "twitter", url: "https://x.com/yourhandle" },
];

// -----------------------------
// SKILLS
// -----------------------------
export const SKILLS = {
  languagesAndTools: [
    "javascript",
    "typescript",
    "python",
    "java",
    "sql",
    "html5",
    "css3",
    "git",
  ],
  librariesAndFrameworks: [
    "react",
    "angular",
    "tailwindcss",
    "bootstrap",
    "nodejs",
    "express",
    "django",
    "flask",
    "graphql",
    "swagger",
    "postman",
  ],
  databases: ["postgresql", "mysql", "mongodb", "sqlite", "snowflake"],
  other: [
    "docker",
    "aws",
    "gcp",
    "jenkins",
    "nginx",
    "linux",
    "heroku",
    "netlify",
    "kafka",
    "githubactions",
    "cicd",
    "jest",
    "cypress",
    "pytest",
  ],
};

// -----------------------------
// PROJECTS
// -----------------------------
export const PROJECTS = [
  {
    name: "Airbnb",
    image: "/projects/airbnb.webp",
    blurImage: "/projects/blur/airbnb-blur.webp",
    description: "Airbnb UI clone using NextJS + Tailwind CSS 🛏️",
    gradient: ["#F14658", "#DC2537"],
    url: "https://shubh73-airbnb.vercel.app/",
    tech: ["react", "nextjs", "tailwindcss", "mapbox"],
  },
  {
    name: "Medium",
    image: "/projects/medium.webp",
    blurImage: "/projects/blur/medium-blur.webp",
    description: "Medium UI clone using NextJS + Tailwind CSS ✍🏻",
    gradient: ["#FFA62E", "#EA4D2C"],
    url: "https://shubh73-medium.vercel.app/",
    tech: ["typescript", "react", "nextjs", "tailwindcss", "sanity.io"],
  },
  {
    name: "Inshorts",
    image: "/projects/inshorts.webp",
    blurImage: "/projects/blur/airbnb-blur.webp",
    description:
      "Conversational Voice Controlled React News Application using Alan AI 🎙",
    gradient: ["#000066", "#6699FF"],
    url: "https://shubh73-inshorts.netlify.app/",
    tech: ["react", "chakra-ui", "alan"],
  },
];

// -----------------------------
// WORK CONTENTS (Right card is RoleCard)
// Cohesive, warm orange-anchored gradients per experience.
// -----------------------------
export const WORK_CONTENTS = {
  ZYPROVA: [
    {
      title: "Zyprova",
      description: `
• Founding team engineer at an AI SaaS startup—conversational, real-time planning across Finance, HR, Equity, and fundraising.
• Designed GraphQL APIs & AI-ready endpoints (Slack + web) for exec Q&A with instant insights.
• Delivered backend for scenario modeling & hiring plan tools (what-if, forecasts, workforce planning).
• Unified finance/HR/equity into a single source of truth via optimized mapping APIs.
• Built a CLI for bulk imports/cleanups—cut onboarding & QA time by 50%+.
• Hardened data accuracy for board dashboards; drove root-cause fixes and validation.
• Partnered with design on usable executive dashboards; mentored interns and documented systems.`,
      content: (
        <RoleCard
          title="Founding Software Engineer"
          meta="Jan 2025 – Present • San Jose, CA"
          chips={[
            "AI SaaS",
            "GraphQL",
            "Scenario Planning",
            "Data Unification",
            "Kafka/Streaming",
            "CLI Automation",
          ]}
          icon="🧭"
          gradient={["#EB7431", "#F79E63", "#FFCF9F"]} // orange → peach → cream
        />
      ),
    },
  ],

  GBSN: [
    {
      title: "GBSN Infotech",
      description: `
• Built inventory/shipment modules with Angular + Flask for real-time tracking and visibility.
• Designed secure REST APIs (SQLAlchemy) with strong validation and data integrity.
• Implemented RBAC, dynamic routing, reusable Angular Material components.
• Raised coverage with PyTest/Jasmine + docs; improved onboarding velocity.
• Deployed via Docker + Nginx + uWSGI; standardized multi-env releases.
• Optimized Postgres with indexes/filters → ~40% faster endpoints.`,
      content: (
        <RoleCard
          title="Full Stack Developer Intern"
          meta="Jun 2023 – Aug 2023 • Michigan"
          chips={[
            "REST APIs",
            "Angular + Flask",
            "Postgres Tuning",
            "Docker + Nginx",
            "Testing/Docs",
          ]}
          icon="🛠️"
          gradient={["#FF7A45", "#FFB86C", "#FFD580"]} // bright orange → amber → gold
        />
      ),
    },
  ],

  UNCC: [
    {
      title: "UNC Charlotte",
      description: `
• Built crypto analytics dashboard (React + Django REST + PostgreSQL).
• Integrated real-time price APIs; visualized with Chart.js.
• Implemented secure auth flows, middleware, reusable backend utilities.
• Containerized services with Docker; deployed on AWS EC2.
• Mentored 25+ students in Python/React/full-stack; improved delivery quality.`,
      content: (
        <RoleCard
          title="Graduate Assistant"
          meta="Aug 2022 – May 2024 • Charlotte, NC"
          chips={[
            "Django + React",
            "Crypto APIs",
            "Charts/Visualization",
            "AWS + Docker",
            "Mentorship",
          ]}
          icon="🎓"
          gradient={["#FF6F61", "#F59E9E", "#FFD0C4"]} // orange-coral family
        />
      ),
    },
  ],

  LTIMINDTREE: [
    {
      title: "LTI Mindtree",
      description: `
• Developed Flask microservices powering analytics workflows and KPI dashboards.
• Built APIs for anomaly detection, what-if scenarios and trend insights.
• Optimized Snowflake/Postgres with caching + indexed views (≈50% faster).
• Implemented JWT auth + RBAC; containerized and wired CI/CD with Jenkins.
• Built Angular components (charts, filters, drill-downs) for interactive insights.`,
      content: (
        <RoleCard
          title="Full Stack Developer"
          meta="Jan 2021 – Jul 2022 • India"
          chips={[
            "Flask Microservices",
            "Anomaly Detection",
            "Snowflake + Postgres",
            "CI/CD",
            "Angular UI",
          ]}
          icon="🧩"
          gradient={["#FF7849", "#ECA72C", "#FFD25F"]} // orange → goldenrod → yellow
        />
      ),
    },
  ],

  COFORGE: [
    {
      title: "Coforge",
      description: `
• Built a recruitment portal (React + Django + Postgres) to modernize hiring workflows.
• Designed scalable, secure APIs for candidate/recruiter/interview pipelines.
• Implemented RBAC, advanced validation, automated emails (Django signals).
• Improved UX with error boundaries, strong validation and real-time toasts.
• Containerized backend + Postgres with Docker; deployed to Heroku.`,
      content: (
        <RoleCard
          title="Software Developer Intern"
          meta="Jun 2019 – Jun 2021 • India"
          chips={[
            "Recruitment Platform",
            "Django + React",
            "RBAC",
            "Email Automation",
            "Heroku + Docker",
          ]}
          icon="🧪"
          gradient={["#FF865E", "#FFAB91", "#FFF1E6"]} // soft orange → coral → cream
        />
      ),
    },
  ],
};

export const GTAG = "G-5HCTL2TJ5W";
