export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: "Software Engineer",
    company: "SELISE Bangladesh Ltd.",
    period: "Apr 2022 – Present",
    bullets: [
      "Full-stack development of enterprise ERP solutions for international clients using Angular, .NET Core, MongoDB, GraphQL, and RabbitMQ.",
      "Design and implement business modules, reporting pipelines, and workflow enhancements.",
      "Drive system optimisations, code reviews, and cross-team collaboration in an Agile environment.",
    ],
  },
  {
    role: "Android Developer",
    company: "Emerging IT Bangladesh Ltd.",
    period: "Aug 2021 – Feb 2022",
    bullets: [
      "Developed and maintained Android applications for an educational platform.",
      "Integrated Firebase, Retrofit, and Material Design components; improved stability and UX.",
    ],
  },
  {
    role: "Programmer",
    company: "Infocrat Solutions Ltd.",
    period: "Mar 2020 – Jul 2021",
    bullets: [
      "Built full-stack business applications and microservice back-ends using .NET Core, Entity Framework, and SQL Server.",
      "Developed ERP features and business workflows; generated reports using PDF and Excel technologies.",
    ],
  },
];
