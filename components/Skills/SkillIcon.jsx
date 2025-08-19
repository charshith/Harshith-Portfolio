/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

const EXTERNAL_SKILL_SVGS = {
  // Languages & Tools
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  sql: "https://www.svgrepo.com/download/303229/microsoft-sql-server-logo.svg",

  // Libraries & Frameworks
  graphql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  flask: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  nest: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
  nestjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg", // alias
  angular: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",

  // Databases
  postgres: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", // alias
  psql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", // alias
  snowflake: "https://cdn.worldvectorlogo.com/logos/snowflake.svg",

  // DevOps & Tools
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  kafka: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
  cicd: "https://www.svgrepo.com/download/354413/cicd.svg",
  "ci-cd": "https://www.svgrepo.com/download/354413/cicd.svg", // alias
};

export default function SkillIcon({ name }) {
  const key = String(name || "").toLowerCase().trim();
  const src = EXTERNAL_SKILL_SVGS[key];

  if (src) {
    return <img src={src} alt={key} width={50} height={50} loading="lazy" style={{ width: 50, height: 50 }} />;
  }

  // fallback to local /public/skills/<name>.svg
  return <Image src={`/skills/${key}.svg`} alt={key} width={50} height={50} />;
}