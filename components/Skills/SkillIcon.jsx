/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

/** CDN icons (kept same as before; add/remove as needed) */
const EXTERNAL_SKILL_SVGS = {
  javascript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  typescript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  sql: "https://www.svgrepo.com/download/303229/microsoft-sql-server-logo.svg",
  html5:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  css3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",

  react:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  angular:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  tailwindcss:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  bootstrap:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-plain.svg",

  nodejs:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  express:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  django:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  flask:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  graphql:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  swagger:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg",
  postman:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",

  postgresql:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  postgres:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  mysql:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  mongodb:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  sqlite:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  snowflake: "https://cdn.worldvectorlogo.com/logos/snowflake.svg",

  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  gcp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  docker:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  jenkins:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  nginx:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  linux:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  heroku:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg",
  netlify:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
  kafka:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
  githubactions:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
  "github-actions":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-original.svg",
  cicd: "https://www.svgrepo.com/download/354413/cicd.svg",
  "ci-cd": "https://www.svgrepo.com/download/354413/cicd.svg",

  jest: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  cypress:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg",
  cypressio:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg",
  pytest:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytest/pytest-original.svg",
};

/** Logos that are black/dark and need invert on dark */
const DARK_ICONS = new Set(["express", "jwt"]);

function humanize(name = "") {
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function SkillIcon({ name }) {
  const key = String(name || "")
    .toLowerCase()
    .trim();
  const src = EXTERNAL_SKILL_SVGS[key];

  const label = (name || key || "")
    .toString()
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()); // e.g., "nodejs" -> "Nodejs"

  const commonImgProps = {
    width: 50,
    height: 50,
    loading: "lazy",
  };
  return (
    <div className="skill">
      <div className="tile" aria-label={label} role="img">
        {/* glow */}
        <div className="glow" aria-hidden="true" />
        {/* icon */}
        {src ? (
          <img
            src={src}
            alt={label} // ✅ add alt
            {...commonImgProps}
            style={{ filter: DARK_ICONS.has(key) ? "invert(1)" : "none" }}
          />
        ) : (
          <Image
            src={`/skills/${key}.svg`}
            alt={label} // ✅ add alt
            {...commonImgProps} // contains width/height
            style={{ filter: DARK_ICONS.has(key) ? "invert(1)" : "none" }}
          />
        )}
      </div>

      {/* tooltip */}
      <div className="tip">{label}</div>

      <style jsx>{`
        .skill {
          position: relative;
          display: inline-block;
        }
        .tile {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 180ms ease, box-shadow 180ms ease,
            border-color 180ms ease, background 180ms ease;
          backdrop-filter: blur(2px);
          position: relative;
          overflow: hidden;
        }
        .glow {
          position: absolute;
          inset: 0;
          border-radius: 16px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 180ms ease;
          background: radial-gradient(
            60% 60% at 50% 40%,
            rgba(235, 116, 49, 0.16),
            transparent 70%
          );
        }
        .tile:hover {
          transform: translateY(-3px);
          border-color: #eb7431;
          background: rgba(235, 116, 49, 0.08); /* subtle orange tint */
          box-shadow: 0 6px 28px rgba(235, 116, 49, 0.35);
        }

        .tile:hover .glow {
          opacity: 1;
          background: radial-gradient(
            60% 60% at 50% 40%,
            rgba(235, 116, 49, 0.35),
            transparent 70%
          );
        }
        .tip {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          top: 64px;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          line-height: 1;
          color: rgba(255, 255, 255, 0.92);
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(2px);
          white-space: nowrap;
          opacity: 0;
          transition: opacity 160ms ease, transform 160ms ease;
          pointer-events: none;
        }
        .skill:hover .tip,
        .skill:focus-within .tip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      `}</style>
    </div>
  );
}
