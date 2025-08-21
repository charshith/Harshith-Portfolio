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

export const WORK_CONTENTS = {
  ZYPROVA: [
    {
      title: "Zyprova",
      description: `
• Built a conversational AI platform for Finance, HR, and Equity (web + Slack), enabling execs to query data in plain English.
• Designed/owned microservices + GraphQL gateway; tuned Postgres schemas/caching to cut query latency by ~40% and stabilize analytics.
• Streamed HR/finance events with Kafka; added audit trails, recovery jobs, and ensured rock-solid data integrity at scale.
• Delivered “what-if” forecasting APIs for hiring, budgeting, and fundraising; directly used in board reviews and planning.
• Automated onboarding with CLI tools, CI/CD pipelines, and runtime observability; reduced QA/onboarding time >50% and mentored interns.`,
      content: (
        <RoleCard
          title="Founding Software Engineer"
          meta="Jan 2025 – Present • San Jose, CA"
          chips={[
            "GraphQL Gateway",
            "Microservices",
            "Postgres Perf",
            "Kafka Streams",
            "What-if APIs",
            "CLI + CI/CD",
          ]}
          icon="🚀"
          gradient={["#EB7431", "#F79E63", "#FFCF9F"]}
        />
      ),
    },
  ],

  GBSN: [
    {
      title: "GBSN Infotech",
      description: `
• Built REST APIs and Angular modules powering inventory & shipment dashboards.  
• Optimized PostgreSQL with indexing, pagination and query plans → ~40% lower latency on large datasets.  
• Implemented RBAC and reusable Angular Material components for consistent, secure UX.  
• Wrote unit tests (PyTest/Jasmine) + docs, improving onboarding and change safety.  
• Containerized with Docker and fronted by Nginx/uWSGI for reliable multi-env releases.`,
      content: (
        <RoleCard
          title="Full Stack Developer Intern"
          meta="Jun 2023 – Aug 2023 • Michigan"
          chips={[
            "REST APIs",
            "Angular + Flask",
            "PostgreSQL Tuning",
            "RBAC",
            "Docker + Nginx",
            "Testing + Docs",
          ]}
          icon="🛠️"
          gradient={["#FF7A45", "#FFB86C", "#FFD580"]}
        />
      ),
    },
  ],

  UNCC: [
    {
      title: "UNC Charlotte",
      description: `
• Built a crypto dashboard (React + Django REST) with live-pricing APIs and charts.  
• Added auth, middleware and reusable APIs that sped project setup for students.  
• Dockerized apps and deployed to AWS EC2 with prod configs and environment split.  
• Mentored 40+ students via labs/reviews/debugging; improved code quality and habits.
• Collaborated on AI/data projects, integrating APIs and visualizations into course research.  `,
      content: (
        <RoleCard
          title="Graduate Assistant"
          meta="Aug 2022 – May 2024 • Charlotte, NC"
          chips={[
            "React + Django",
            "Live Data APIs",
            "Data Viz",
            "AWS EC2 + Docker",
            "Mentorship",
          ]}
          icon="🎓"
          gradient={["#FF6F61", "#F59E9E", "#FFD0C4"]}
        />
      ),
    },
  ],

  LTIMINDTREE: [
    {
      title: "LTI Mindtree",
      description: `
• Delivered Flask microservices for analytics, anomaly detection and forecasting workflows.
• Exposed predictive model outputs as stable APIs; which enabled product teams to act on insights quickly.
• Tuned Snowflake/Postgres (caching, indexed views) to cut reporting latency by ~50%.
• Built Angular modules with JWT + RBAC for secure, role-based access.
• Automated build/deploy with Jenkins CI/CD; Dockerized services for consistent runtimes.`,
      content: (
        <RoleCard
          title="Full Stack Developer"
          meta="Jan 2021 – Jul 2022 • India"
          chips={[
            "Flask Services",
            "Snowflake + Postgres",
            "Predictive APIs",
            "Angular UI",
            "JWT + RBAC",
            "CI/CD + Docker",
          ]}
          icon="📈"
          gradient={["#FF7849", "#ECA72C", "#FFD25F"]}
        />
      ),
    },
  ],

  COFORGE: [
    {
      title: "Coforge",
      description: `
• Modernized recruiting with a portal (React + Django + PostgreSQL) used by recruiters.  
• Built secure APIs with RBAC, validations and emails (Django signals) for the pipeline.  
• Reduced drop-offs using toasts, error boundaries and stronger client validation.  
• Containerized backend + Postgres with Docker and deployed on Heroku for faster releases.  `,
      content: (
        <RoleCard
          title="Software Developer Intern"
          meta="Jun 2019 – Jun 2021 • India"
          chips={[
            "Recruiting Portal",
            "React + Django",
            "RBAC + Validation",
            "Email Automation",
            "Postgres",
            "Heroku + Docker",
          ]}
          icon="🧪"
          gradient={["#FF865E", "#FFAB91", "#FFF1E6"]}
        />
      ),
    },
  ],
};

export const GTAG = "G-5HCTL2TJ5W";
