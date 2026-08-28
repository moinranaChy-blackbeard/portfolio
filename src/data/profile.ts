export interface Education {
  degree: string;
  institution: string;
  period: string;
  detail: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  summary: string;
  resumeUrl: string;
  education: Education;
}

export const profile: Profile = {
  name: "Mohammad Moin Uddin Chy",
  title: "Senior Software Engineer",
  tagline: "Full-Stack & ERP Specialist",
  location: "Dhaka, Bangladesh",
  email: "moinrana.chy@gmail.com",
  phone: "+880 1880606275",
  github: "https://github.com/moinchy",
  linkedin: "https://www.linkedin.com/in/moinrana",
  summary:
    "Software Engineer with 6+ years of experience designing, developing, and maintaining enterprise-grade web applications and ERP solutions. Proficient across the full stack — Angular frontend through .NET Core and Node.js backend, with strong expertise in MongoDB, GraphQL, and event-driven architecture via RabbitMQ. Consistently delivers scalable, maintainable solutions for international clients in distributed, cross-functional teams.",
  resumeUrl: "/resume.pdf",
  education: {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "American International University – Bangladesh (AIUB)",
    period: "2016 – 2019",
    detail: "CGPA: 3.56 / 4.00",
  },
};
