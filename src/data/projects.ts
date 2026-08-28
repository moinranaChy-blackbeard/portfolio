export interface Project {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  type: string;
}

export const projects: Project[] = [
  {
    slug: "delta",
    name: "DELTA",
    description:
      "Enterprise ERP platform for a major international security organisation — end-to-end development and ongoing maintenance.",
    tags: ["Angular", ".NET Core", "MongoDB", "GraphQL", "RabbitMQ"],
    type: "Enterprise ERP",
  },
  {
    slug: "syn",
    name: "SYN",
    description:
      "ERP feature development and maintenance for a Japanese logistics / CNF organisation.",
    tags: ["Angular", ".NET Core", "MongoDB", "GraphQL"],
    type: "Enterprise ERP",
  },
  {
    slug: "emerging-study",
    name: "Emerging Study",
    description:
      "Android app for an educational platform, integrating real-time content delivery and user management.",
    tags: ["Android", "Java", "Kotlin", "Firebase"],
    type: "Mobile App",
  },
  {
    slug: "mooktobazar",
    name: "Mooktobazar",
    description:
      "B2B e-commerce solution: product catalogue, order management, and buyer/seller workflows.",
    tags: ["Full-Stack", "E-commerce"],
    type: "Web Platform",
  },
];
