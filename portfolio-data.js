/**
 * ============================================================================
 * ATHARAV BALOTRA — PORTFOLIO CONTENT DATA SOURCE
 * ============================================================================
 * Maintainable content module for Atharav Balotra's portfolio.
 * To update personal info, About copy, projects, skills, experience,
 * or education, edit the values in this file. The site hydrates automatically.
 *
 * NOTE: Changes to this file take effect immediately upon page reload.
 * When deployed via Git / Vercel, committing this file updates the live site.
 * ============================================================================
 */

const PORTFOLIO_DATA = {
  meta: {
    name: "ATHARAV BALOTRA",
    title: "Atharav Balotra — First-Year CSE Student (AI/ML) & Creative Developer",
    tagline: "Exploring intelligent systems. Building software. Creating new digital experiences.",
    statusBadge: "FIRST-YEAR CSE (AI/ML) // ACTIVE RESEARCH",
    location: "MUMBAI, IN [19.076° N, 72.877° E]",
    audience: "Recruiters & Internship Evaluators"
  },

  navigation: [
    { id: "about", label: "About" },
    { id: "pitstop", label: "Pitstop AI" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "contact", label: "Contact" }
  ],

  about: {
    headline: "Engineering foundations at the intersection of machine intelligence and software architecture.",
    paragraphs: [
      "I am a first-year Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning. My work centers on understanding foundational computation, exploring predictive systems, and crafting responsive digital interfaces.",
      "Rather than treating software as isolated code snippets, I approach engineering through system design—analyzing how algorithmic pipelines, distributed data, and user interaction converge to solve real problems.",
      "Currently immersed in core data structures, algorithms, mathematical foundations of machine learning, and hands-on full-stack development, with an intense focus on building and learning through active exploration."
    ],
    principles: [
      {
        code: "01 // EXPLORATION",
        title: "Algorithmic Rigor",
        description: "Prioritizing strong computational logic, clean data structures, and efficient time-complexity over superficial shortcuts."
      },
      {
        code: "02 // ARCHITECTURE",
        title: "Modern Engineering",
        description: "Developing scalable, maintainable software with clean separation of concerns and robust typing."
      },
      {
        code: "03 // SYNTHESIS",
        title: "Applied AI",
        description: "Investigating how neural models, vector embeddings, and predictive heuristics can be translated into practical user tools."
      }
    ]
  },

  featuredProject: {
    id: "pitstop-ai",
    title: "Pitstop AI",
    status: "In Progress",
    statusDetail: "RESEARCH & PROTOTYPE PHASE",
    category: "Intelligent Systems Architecture",
    description: "An exploratory computational engine designed to investigate intelligent workflows, autonomous routing, and machine learning systems. Under active development.",
    disclaimer: "Architectural specifications, source code, and internal benchmarks remain private during research. Concept visualizations below represent schematic system flow.",
    highlights: [
      "Investigating predictive heuristics and multi-step computational pipeline coordination",
      "Focusing on latency-optimized execution paths and robust error-handling states",
      "Designed with privacy-first system boundaries and modular architecture"
    ],
    schematicNodes: [
      { step: "01", label: "Input Telemetry", desc: "Structured query ingestion & schema verification" },
      { step: "02", label: "Heuristic Routing", desc: "Intent classification & pipeline dispatch" },
      { step: "03", label: "Model Inference", desc: "Contextual reasoning & evaluation loops" },
      { step: "04", label: "Response Synthesis", desc: "Verified delivery & output formatting" }
    ]
  },

  secondaryProjects: [
    {
      title: "Algorithmic Foundations & Systems Lab",
      status: "Active Exploration",
      category: "Academic & Systems Research",
      description: "In-depth explorations in data structures, time complexity profiling, and procedural graphics algorithms."
    }
  ],

  experience: [
    {
      role: "Student Researcher & Founder",
      entity: "Pitstop AI (Independent Project)",
      period: "2024 — Present",
      type: "Independent Exploration",
      description: "Leading system concept design, architecture planning, and computational exploration for an intelligent workflow engine. Implementing core prototypes while studying pipeline optimization."
    },
    {
      role: "Undergraduate Computer Science Student",
      entity: "Academic Curriculum & Lab Studies",
      period: "2024 — Present",
      type: "Academic Foundation",
      description: "Engaged in comprehensive coursework covering programming paradigms, data structures, discrete mathematics, and applied artificial intelligence fundamentals."
    },
    {
      role: "Self-Directed Open Source & Systems Explorer",
      entity: "Independent Engineering Labs",
      period: "Ongoing",
      type: "Personal Projects & Learning",
      description: "Experimenting with creative coding, Three.js WebGL graphics, modern JavaScript patterns, and Linux systems administration."
    }
  ],

  skills: [
    { name: "Python", idx: "01" },
    { name: "C", idx: "02" },
    { name: "Networking", idx: "03" },
    { name: "Prompting", idx: "04" }
  ],

  education: {
    degree: "Bachelor of Technology (B.Tech)",
    major: "Computer Science and Engineering",
    specialization: "Artificial Intelligence & Machine Learning",
    status: "First-Year Undergraduate (2024 — Present)",
    focusAreas: [
      "Data Structures & Object-Oriented Design",
      "Discrete Mathematics & Computational Thinking",
      "Foundations of Machine Learning & Applied AI",
      "Software Engineering Practices & Version Control"
    ]
  },

  contact: {
    email: "atharavbalotra83@gmail.com",
    githubUrl: "https://github.com/avbalotra",
    githubUsername: "avbalotra",
    linkedinUrl: "https://www.linkedin.com/in/atharav-balotra-5058a7336",
    linkedinHandle: "Atharav Balotra",
    location: "Mumbai, Maharashtra, India",
    availability: "Available for Summer / Fall 2025 Internship Opportunities"
  }
};

// Export for module environments or assign to global window for browser runtime
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PORTFOLIO_DATA;
} else if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
