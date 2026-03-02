import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import Card3D from "./Card3D";
import { motion } from "framer-motion";

const projects = [
  {
    title: "CloudScale Analytics",
    description:
      "A real-time analytics dashboard built with React, Node.js, and WebSockets. Features live data streaming, interactive charts, and role-based access control.",
    tags: ["React", "Node.js", "WebSocket", "PostgreSQL", "Docker"],
    image:
      "https://mgx-backend-cdn.metadl.com/generate/images/992286/2026-02-27/4ebe455c-75b7-4f03-b040-76637a740565.png",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "NeuralText Summarizer",
    description:
      "An NLP-powered text summarization tool using transformer models. Supports extractive and abstractive summarization with a clean web interface.",
    tags: ["Python", "PyTorch", "FastAPI", "React", "Hugging Face"],
    image:
      "https://mgx-backend-cdn.metadl.com/generate/images/992286/2026-02-27/810518a1-e48c-4a6b-84c7-c6ad20a8b49d.png",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "MicroDeploy Platform",
    description:
      "A microservices deployment platform with automated CI/CD pipelines, container orchestration, and infrastructure-as-code using Terraform and Kubernetes.",
    tags: ["Go", "Kubernetes", "Terraform", "AWS", "gRPC"],
    image:
      "https://mgx-backend-cdn.metadl.com/generate/images/992286/2026-02-27/d86bb0e4-2c6b-4353-88a1-834ca08dd410.png",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "TaskFlow",
    description:
      "A collaborative project management tool with real-time updates, Kanban boards, and team analytics. Built as a full-stack SaaS application.",
    tags: ["Next.js", "TypeScript", "Prisma", "Redis", "Tailwind"],
    image: "",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    title: "SecureVault API",
    description:
      "A RESTful API for encrypted file storage with JWT authentication, rate limiting, and comprehensive API documentation using OpenAPI.",
    tags: ["Java", "Spring Boot", "AWS S3", "JWT", "Swagger"],
    image: "",
    github: "#",
    live: "#",
    featured: false,
  },
  {
    title: "DataPipe ETL",
    description:
      "An ETL pipeline framework for processing large-scale datasets with Apache Spark, supporting batch and stream processing workflows.",
    tags: ["Python", "Apache Spark", "Airflow", "SQL", "Docker"],
    image: "",
    github: "#",
    live: "#",
    featured: false,
  },
];

export default function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[150px] theme-section-glow" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-indigo-400 tracking-widest uppercase">
              Portfolio
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 theme-text-primary">
              Featured{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-lg mx-auto theme-text-muted">
              A selection of projects showcasing my skills in full-stack development,
              machine learning, and cloud infrastructure.
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Projects - Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {featured.map((project, i) => (
            <ScrollReveal
              key={project.title}
              delay={i * 0.15}
              direction={i === 0 ? "up" : i === 1 ? "left" : "right"}
            >
              <Card3D
                className={`group h-full ${i === 0 ? "lg:col-span-2" : ""}`}
                intensity={8}
              >
                <div
                  className={`relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/20 transition-all duration-500 h-full theme-card ${
                    i === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  {/* Image */}
                  {project.image && (
                    <div className={`overflow-hidden ${i === 0 ? "h-64 sm:h-80" : "h-52"}`}>
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.7 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/40 to-transparent theme-img-overlay" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors theme-text-primary">
                        {project.title}
                      </h3>
                      <div className="flex gap-2">
                        <motion.a
                          href={project.github}
                          className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                          aria-label="GitHub"
                          whileHover={{ scale: 1.15, rotate: 5 }}
                        >
                          <Github className="w-4 h-4" />
                        </motion.a>
                        <motion.a
                          href={project.live}
                          className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                          aria-label="Live Demo"
                          whileHover={{ scale: 1.15, rotate: -5 }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 theme-text-muted">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <motion.span
                          key={tag}
                          className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 theme-badge"
                          whileHover={{ scale: 1.1 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card3D>
            </ScrollReveal>
          ))}
        </div>

        {/* Other Projects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {other.map((project, i) => (
            <ScrollReveal key={project.title} delay={i * 0.12} direction="up">
              <Card3D className="group h-full" intensity={12}>
                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full theme-card">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors theme-text-primary">
                      {project.title}
                    </h3>
                    <motion.div
                      whileHover={{ x: 3, y: -3 }}
                    >
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    </motion.div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 theme-text-muted">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-[10px] font-medium rounded-full bg-white/[0.05] text-slate-400 theme-badge-tag"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card3D>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}