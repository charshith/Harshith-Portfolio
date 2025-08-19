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
  {
    name: "Home",
    ref: "home",
  },
  {
    name: "Skills",
    ref: "skills",
  },
  {
    name: "Projects",
    ref: "projects",
  },
  {
    name: "Work",
    ref: "work",
  },
  {
    name: "Contact",
    ref: "contact",
  },
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
    "nodejs",
    "vite",
    "figma",
  ],
  librariesAndFrameworks: [
    "react",
    "nextjs",
    "tailwindcss",
    "graphql",
    "django",
    "flask",
    "nest",
    "angular",
  ],
  databases: ["postgresql", "snowflake", "mysql", "mongodb"],
  other: ["git", "docker", "aws", "kafka", "ci/cd"],
};

export const PROJECTS = [
  // {
  //   name: "React Native Directory",
  //   image: "/projects/react-native-directory.webp",
  //   blurImage: "/projects/blur/react-native-directory.webp",
  //   description:
  //     "Quickly search and filter React Native libraries from Raycast 🔌",
  //   gradient: ["#F14658", "#DC2537"],
  //   url: "https://www.raycast.com/shubh_porwal/react-native-directory",
  //   tech: ["typescript", "react", "raycast"],
  // },
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
  {
    name: "Tesla",
    image: "/projects/tesla.webp",
    blurImage: "/projects/blur/tesla-blur.webp",
    description: "A Tesla React Native App 🏎️",
    gradient: ["#142D46", "#2E4964"],
    url: "https://github.com/shubh73/tesla",
    tech: ["react"],
  },
];

export const WORK_CONTENTS = {
  ZYPROVA: [
    {
      title: "Zyprova",
      description:
        "Founding Software Engineer | Jan 2025 – Present | San Jose, CA\n• Built AI-driven SaaS unifying finance, HR, and equity.\n• Designed microservices & low-latency GraphQL APIs.\n• Optimized Postgres schemas, cutting query times by 40%.\n• Built Kafka pipelines for HR/finance data streaming.\n• Delivered forecasting & simulation APIs for execs.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Founding Software Engineer
        </div>
      ),
    },
  ],
  GBSN: [
    {
      title: "GBSN Infotech",
      description:
        "Full Stack Developer Intern | Jun 2023 – Aug 2023 | Michigan\n• Built reusable REST APIs & service modules for inventory/shipment dashboards.\n• Tuned PostgreSQL queries with indexing/caching → 40% faster responses.\n• Containerized & deployed with Docker + Nginx, standardizing staging workflows.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Full Stack Developer Intern
        </div>
      ),
    },
  ],
  UNCC: [
    {
      title: "UNC Charlotte",
      description:
        "Graduate Assistant | Aug 2022 – May 2024 | Charlotte, NC\n• Built Django backends & React dashboards for ops/research.\n• Developed real-time crypto/data APIs and reusable auth.\n• Created React visualizations for data-driven insights.\n• Mentored 40+ students on projects & dev workflows.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Graduate Assistant
        </div>
      ),
    },
  ],
  LTIMINDTREE: [
    {
      title: "LTI Mindtree",
      description:
        "Full Stack Developer | Jan 2021 – Jul 2022 | India\n• Developed Flask microservices for supply chain analytics.\n• Implemented anomaly detection & demand forecasting.\n• Optimized Snowflake/Postgres queries (−50% reporting latency).\n• Automated ETL & reporting pipelines.\n• Built Angular UI with JWT/RBAC security.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Full Stack Developer
        </div>
      ),
    },
  ],
  COFORGE: [
    {
      title: "Coforge",
      description:
        "Software Developer Intern | Jun 2019 – Jun 2021 | India\n• Built recruiter management platform using Django APIs & PostgreSQL.\n• Designed secure role-based dashboards with React for HR teams.\n• Automated email workflows & validations, reducing hiring errors by 40%.\n• Maintained deployments via Heroku with Docker support.",
      content: (
        <div className="h-full w-full flex items-center justify-center text-white px-4">
          Software Developer Intern
        </div>
      ),
    },
  ],
};

export const GTAG = "G-5HCTL2TJ5W";
