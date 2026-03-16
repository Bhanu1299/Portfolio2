import { Code2, Cloud, Brain, Database, Terminal, Globe } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import Card3D from "./Card3D";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills, stats as rawStats, personalInfo } from "../data/portfolio";

const statIcons = [Code2, Cloud, Brain, Database, Terminal, Globe];
const stats = rawStats.map((s, i) => ({ ...s, icon: statIcons[i] }));

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="text-2xl font-bold text-white theme-text-primary"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {value}
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px] theme-section-glow" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-indigo-400 tracking-widest uppercase">
              About Me
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 theme-text-primary">
              Turning Ideas Into{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Reality
              </span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Bio */}
        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto mb-16">
            <Card3D className="group" intensity={8}>
              <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm hover:border-indigo-500/20 transition-all duration-500 theme-card">
                <p className="text-slate-300 leading-relaxed text-lg theme-text-secondary">
                  I recently completed my{" "}
                  <span className="text-white font-semibold theme-text-primary">Master's in Computer Science</span>,
                  where I specialized in distributed systems and machine learning. I'm passionate
                  about building products that solve real-world problems — from scalable web
                  applications to intelligent data pipelines. I thrive in fast-paced environments
                  and love collaborating with cross-functional teams to ship impactful software.
                </p>
                <p className="text-slate-300 leading-relaxed text-lg mt-4 theme-text-secondary">
                  Currently seeking{" "}
                  <span className="text-indigo-400 font-semibold">
                    Software Engineer / Full-Stack / ML Engineer
                  </span>{" "}
                  roles where I can contribute to innovative products and grow alongside a talented team.
                </p>
              </div>
            </Card3D>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <ScrollReveal key={label} delay={i * 0.08} direction={i % 2 === 0 ? "up" : "down"}>
              <Card3D className="group h-full" intensity={12}>
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center hover:bg-white/[0.06] hover:border-indigo-500/20 transition-all duration-300 h-full theme-card">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-5 h-5 text-indigo-400 mx-auto mb-2" />
                  </motion.div>
                  <AnimatedCounter value={value} />
                  <div className="text-xs text-slate-500 mt-1 theme-text-muted">{label}</div>
                </div>
              </Card3D>
            </ScrollReveal>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group, i) => (
            <ScrollReveal
              key={group.category}
              delay={i * 0.1}
              direction={i < 3 ? "left" : "right"}
            >
              <Card3D className="group h-full" intensity={10}>
                <div className="p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full theme-card">
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${group.color}`}
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                    <h3 className="text-sm font-semibold text-white tracking-wide uppercase theme-text-primary">
                      {group.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, j) => (
                      <motion.span
                        key={item}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/[0.05] text-slate-300 border border-white/[0.06] hover:bg-white/[0.1] hover:text-white transition-colors cursor-default theme-badge-tag"
                        whileHover={{ scale: 1.1, y: -2 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.05 }}
                      >
                        {item}
                      </motion.span>
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