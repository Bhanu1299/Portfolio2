import { useState } from "react";
import { Send, Github, Linkedin, Mail, MapPin, Heart } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import Card3D from "./Card3D";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <section id="contact" className="relative py-24 px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[150px] theme-section-glow" />

        <div className="max-w-6xl mx-auto relative">
          {/* Section Header */}
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-indigo-400 tracking-widest uppercase">
                Contact
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 theme-text-primary">
                Let's Work{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Together
                </span>
              </h2>
              <p className="text-slate-400 mt-4 max-w-lg mx-auto theme-text-muted">
                I'm actively looking for new opportunities. Whether you have a question
                or just want to say hi, I'll get back to you!
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-8">
              <ScrollReveal direction="left" delay={0.1}>
                <Card3D className="group" intensity={8}>
                  <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/10 transition-all duration-500 theme-card">
                    <h3 className="text-xl font-bold text-white mb-6 theme-text-primary">Get In Touch</h3>
                    <div className="space-y-5">
                      <motion.a
                        href="mailto:alex.chen@email.com"
                        className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group/item theme-text-secondary"
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 group-hover/item:bg-indigo-500/20 transition-colors">
                          <Mail className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-0.5 theme-text-muted">Email</div>
                          <div className="text-sm">alex.chen@email.com</div>
                        </div>
                      </motion.a>

                      <motion.a
                        href="#"
                        className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group/item theme-text-secondary"
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20 group-hover/item:bg-violet-500/20 transition-colors">
                          <Linkedin className="w-5 h-5 text-violet-400" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-0.5 theme-text-muted">LinkedIn</div>
                          <div className="text-sm">linkedin.com/in/alexchen</div>
                        </div>
                      </motion.a>

                      <motion.a
                        href="#"
                        className="flex items-center gap-4 text-slate-300 hover:text-white transition-colors group/item theme-text-secondary"
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 group-hover/item:bg-cyan-500/20 transition-colors">
                          <Github className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-0.5 theme-text-muted">GitHub</div>
                          <div className="text-sm">github.com/alexchen</div>
                        </div>
                      </motion.a>

                      <motion.div
                        className="flex items-center gap-4 text-slate-300 theme-text-secondary"
                        whileHover={{ x: 5 }}
                      >
                        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <MapPin className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-xs text-slate-500 mb-0.5 theme-text-muted">Location</div>
                          <div className="text-sm">San Francisco, CA • Open to Remote</div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Card3D>
              </ScrollReveal>

              {/* Resume CTA */}
              <ScrollReveal direction="left" delay={0.2}>
                <Card3D className="group" intensity={10}>
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600/10 to-violet-600/10 border border-indigo-500/20 hover:border-indigo-500/30 transition-all duration-500 theme-resume-card">
                    <h4 className="text-white font-semibold mb-2 theme-text-primary">Looking for my resume?</h4>
                    <p className="text-slate-400 text-sm mb-4 theme-text-muted">
                      Download my latest resume to learn more about my experience and qualifications.
                    </p>
                    <motion.button
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Download Resume
                    </motion.button>
                  </div>
                </Card3D>
              </ScrollReveal>
            </div>

            {/* Contact Form */}
            <ScrollReveal direction="right" delay={0.15}>
              <Card3D className="group" intensity={6}>
                <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-indigo-500/10 transition-all duration-500 theme-card">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2 theme-text-secondary">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all theme-input"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2 theme-text-secondary">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all theme-input"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2 theme-text-secondary">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-none theme-input"
                        placeholder="Tell me about the opportunity or just say hello..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-300"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {submitted ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring" }}
                        >
                          Message Sent! ✓
                        </motion.span>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </Card3D>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer
        className="border-t border-white/[0.06] py-8 px-6 theme-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 theme-text-muted">
            © 2026 Alex Chen. Built with{" "}
            <Heart className="w-3 h-3 inline text-rose-400" /> and React.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "mailto:alex.chen@email.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                className="text-slate-500 hover:text-white transition-colors theme-text-muted"
                aria-label={label}
                whileHover={{ scale: 1.2, y: -2 }}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.footer>
    </>
  );
}