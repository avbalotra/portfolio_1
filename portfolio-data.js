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
    eyebrow: "PROJECT 01 / IN DEVELOPMENT",
    title: "PITSTOP AI",
    headline: "Building Pitstop AI",
    status: "IN DEVELOPMENT",
    description: "Pitstop AI is an ongoing exploratory project investigating autonomous workflow orchestration, predictive execution pipelines, and machine learning system coordination.",
    overview: "Modern software workflows often involve complex, multi-stage task handoffs that introduce manual overhead and operational latency. Pitstop AI investigates how intelligent routing heuristics and modular execution pipelines can automate and coordinate computational workloads cleanly and reliably.",
    currentProgress: "Currently in development. The project is focused on concept design, architecture planning, and early core prototype experimentation.",
    highlights: [
      {
        title: "Intelligent Task Routing",
        desc: "Investigating autonomous pipeline coordination to streamline multi-stage execution flows."
      },
      {
        title: "Latency & Reliability",
        desc: "Focusing on execution-path optimization, predictable fallbacks, and robust error handling."
      },
      {
        title: "Modular Architecture",
        desc: "Designed with clean component separation, adaptable boundaries, and privacy-first system design."
      }
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
    {
      name: "Python",
      idx: "01",
      code: "SCI_COMPUTE",
      status: "ACTIVE [RUNTIME]",
      desc: "Algorithmic scripting, numerical computing & machine intelligence workflows."
    },
    {
      name: "C",
      idx: "02",
      code: "LOW_LEVEL_SYS",
      status: "ACTIVE [KERNEL]",
      desc: "Memory management, computational efficiency & foundational systems logic."
    },
    {
      name: "Networking",
      idx: "03",
      code: "COMM_PROTOCOL",
      status: "ACTIVE [NETWORK]",
      desc: "Distributed architectures, socket communication & packet routing protocols."
    },
    {
      name: "Prompting",
      idx: "04",
      code: "MODEL_INTERACTION",
      status: "ACTIVE [INFERENCE]",
      desc: "Context optimization, structured reasoning chains & generative model alignment."
    }
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
