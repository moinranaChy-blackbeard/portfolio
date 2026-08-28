export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  { category: "Frontend", items: ["Angular", "JavaScript", "TypeScript", "HTML5", "CSS3", "jQuery"] },
  { category: "Backend", items: ["C#", ".NET Core", "Node.js", "Laravel"] },
  { category: "Databases", items: ["MongoDB", "SQL Server", "SQL"] },
  { category: "APIs & Messaging", items: ["GraphQL", "REST APIs", "RabbitMQ"] },
  { category: "Mobile", items: ["Android (Java/Kotlin)"] },
  { category: "Tools & Practices", items: ["Git", "ERP Development", "Agile / Scrum"] },
];
