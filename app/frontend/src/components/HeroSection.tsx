import { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "ML Enthusiast",
  "Problem Solver",
];

const floatingShapes = [
  { size: 80, x: "10%", y: "20%", delay: 0, color: "bg-indigo-500/10", blur: "blur-xl" },
  { size: 50, x: "80%", y: "15%", delay: 1, color: "bg-violet-500/10", blur: "blur-lg" },
  { size: 60, x: "70%", y: "70%", delay: 2, color: "bg-cyan-500/10", blur: "blur-xl" },
  { size: 40, x: "20%", y: "75%", delay: 0.5, color: "bg-pink-500/10", blur: "blur-lg" },
  { size: 35, x: "50%", y: "10%", delay: 1.5, color: "bg-emerald-500/10", blur: "blur-md" },
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 300]);
  const contentY = useTransform(scrollY, [0, 800], [0, 150]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentRole.substring(0, text.length - 1)
              : currentRole.substring(0, text.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://mgx-backend-cdn.metadl.com/generate/images/992286/2026-02-27/fc614792-d6bc-4677-aa86-2d17d809edf0.png)`,
          y: bgY,
        }}
      />
      <div className="absolute inset-0 bg-[#0A0A0F]/70 theme-hero-overlay" />

      {/* 3D Floating Geometric Shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${shape.color} ${shape.blur} border border-white/[0.05] theme-shape-border`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}

      {/* 3D Rotating wireframe cube */}
      <motion.div
        className="absolute right-[15%] top-[25%] hidden lg:block"
        animate={{ rotateX: 360, rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ perspective: "600px", transformStyle: "preserve-3d" }}
      >
        <div className="w-24 h-24 border border-indigo-500/20 rounded-lg theme-wireframe" style={{ transformStyle: "preserve-3d" }} />
      </motion.div>

      {/* 3D Rotating ring */}
      <motion.div
        className="absolute left-[10%] bottom-[30%] hidden lg:block"
        animate={{ rotateY: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ perspective: "600px" }}
      >
        <div className="w-20 h-20 rounded-full border-2 border-violet-500/20 theme-wireframe" />
      </motion.div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse theme-orb-indigo" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-[128px] animate-pulse theme-orb-violet" />

      {/* Content with parallax */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        style={{ y: contentY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 theme-status-pill"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm text-slate-300 theme-text-secondary">CS Master's Graduate • Available for Hire</span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-7xl font-extrabold text-white mb-4 tracking-tight theme-text-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Alex Chen
            </span>
          </motion.h1>

          <div className="h-12 sm:h-14 flex items-center justify-center mb-8">
            <span className="text-xl sm:text-2xl text-slate-300 font-light theme-text-secondary">
              {text}
              <span className="inline-block w-[2px] h-6 bg-indigo-400 ml-1 animate-pulse" />
            </span>
          </div>

          <motion.p
            className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed theme-text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Passionate about building scalable systems and intelligent applications.
            Master's in Computer Science with expertise in full-stack development,
            cloud architecture, and machine learning.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.button
              onClick={() =>
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
            <motion.button
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-300 theme-btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "#contact", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-indigo-500/30 transition-all duration-300 theme-icon-btn"
                aria-label={label}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}