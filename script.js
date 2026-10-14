/**
 * Huzaifa Tamim - Personal Portfolio Website Script
 * Modular script with Marquee animation, Protected Admin Dashboard (Passkey: 1045),
 * 2D Global Reach Earth Animation, and Gemini AI Chat Assistant.
 */

const STORAGE_KEY = "huzaifa_portfolio_v5";
const ADMIN_PASSKEY = "1045";

// Helper to resolve images in images/ folder or root
function resolveImg(src) {
  if (!src) return "";
  if (/^(https?:\/\/|data:|\/)/i.test(src)) return src;
  if (src.startsWith("images/")) return src;
  return "images/" + src;
}

const DEFAULT_DATA = {
  name: "Huzaifa Tamim",
  logo: "images/logo.png",
  role: "Web Development | Digital Marketing Expert",
  headline: "I build fast, client-focused websites and run ad campaigns that turn clicks into customers.",
  bio: "Computer Science & Engineering graduate with hands-on experience in website development, SEO, paid advertising, and lead generation for global and regional clients.",
  photo: "images/photo.jpg",
  email: "mdhuzaifatamim10@gmail.com",
  li: "https://linkedin.com/in/huzaifa-tamim/",
  gh: "https://github.com/huzaifatamim",
  fb: "",
  loc: "Bangladesh",
  about: "I'm a Computer Science & Engineering graduate with a strong foundation in IT operations, website development and maintenance, and digital marketing. I've worked remotely with global and regional clients to design websites and landing pages and to run SEO, social media, and online advertising campaigns.\nI pair technical skills with a business mindset. Data management, reporting, and clear client communication help me deliver digital solutions that are practical and measurable.",
  edu: "B.Sc. in Computer Science & Engineering | Northern University of Business & Technology, Bangladesh",
  focus: "Website Development, SEO, Paid Advertising, Lead Generation, Social Media Marketing, Data & Reporting",
  goal: "To contribute to IT, web development, technology, or digital marketing roles by combining technical and digital business capabilities.",
  skills: [
    {
      group: "IT & Web Technologies",
      items: ["Website Development & Maintenance", "HTML5", "CSS3", "JavaScript", "PHP", "C", "C++", "Technical Troubleshooting", "IT Support"]
    },
    {
      group: "Digital Marketing",
      items: ["SEO", "Social Media Marketing", "Paid Advertising", "Lead Generation", "Digital Marketing Strategy", "Website Optimization", "Online Marketing"]
    },
    {
      group: "Data & Business Support",
      items: ["Data Management", "Data Analysis & Reporting", "Microsoft Office", "Project Coordination", "Client Communication"]
    },
    {
      group: "Professional Skills",
      items: ["Technical Problem Solving", "Team Collaboration", "Leadership", "Adaptability", "Project Planning", "Organization"]
    },
    {
      group: "Languages",
      items: ["Bengali (Native)", "English (Proficient)"]
    }
  ],
  exp: [
    {
      role: "Digital Marketing & Web Specialist",
      company: "Remote, Global & Regional Clients",
      period: "2023 - Present",
      points: [
        "Designed, developed, and optimized business websites and high-converting landing pages.",
        "Managed SEO, social media marketing, and targeted paid online advertising campaigns.",
        "Delivered customized digital solutions tailored to client objectives and conversion KPIs.",
        "Managed multiple client projects simultaneously while maintaining communication quality and tight deadlines."
      ]
    },
    {
      role: "Intern",
      company: "AppStick, Bangladesh",
      period: "2023",
      points: [
        "Supported day-to-day operations and activities in a fast-paced software development environment.",
        "Assisted senior engineers with website development and technical troubleshooting tasks.",
        "Applied core web development fundamentals and collaborative problem-solving to client deliverables."
      ]
    }
  ],
  projects: [
    {
      id: "p1",
      title: "IPVS Bangladesh Chapter",
      category: "Website Design & Development",
      desc: "Responsive official website for the Bangladesh chapter of the International Papillomavirus Society, featuring an interactive hero slider, HPV epidemiology statistics, educational programs, events, media galleries, and member registration.",
      tags: ["Web Design", "Responsive", "Healthcare", "HTML5/CSS3/JS"],
      link: "https://huzaifatamim.github.io/IPVSBD/",
      linkLabel: "View live project &rarr;",
      image: "images/ipvs-bd-thumb.png"
    },
    {
      id: "p2",
      title: "Meta Ads Campaign Pilot",
      category: "Performance Marketing Case Study",
      desc: "Comprehensive three-campaign Meta Ads pilot for an e-commerce catalog: $435 ad spend generated $1,530 revenue with a 3.52x overall ROAS and 15 purchases at $29 CPA. Warm audience retargeting achieved peak 4.85x ROAS.",
      tags: ["Meta Ads", "Advantage+", "Retargeting", "ROAS", "Case Study"],
      link: "meta-ads-case-study.pdf",
      linkLabel: "View Case Study (PDF) &rarr;",
      image: "images/meta-ads-thumb.png"
    }
  ],
  accent: "#3b82f6",
  accent2: "#22d3ee"
};

// Load saved data or default
let D = (function() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn("Could not read from localStorage", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
})();

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(D));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
}

// Helpers
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const E = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));

let animCounter = 0;
const rv = cls => `class="rv ${cls || ""}" style="--d:${(animCounter++ % 7) * 70}ms"`;

// Render Main Portfolio
function render() {
  const root = document.documentElement;
  root.style.setProperty("--a", D.accent || "#3b82f6");
  root.style.setProperty("--b", D.accent2 || "#22d3ee");

  const ini = D.name.split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const logoSrc = resolveImg(D.logo) || "images/logo.png";
  const photoSrc = resolveImg(D.photo) || "images/photo.jpg";

  const soc = [
    { key: "li", label: "LinkedIn" },
    { key: "gh", label: "GitHub" },
    { key: "fb", label: "Facebook" }
  ].filter(s => D[s.key] && D[s.key].trim());

  // Setup Projects marquee data (duplicate list to fill marquee loop)
  const pr = D.projects || [];
  let a = pr.slice();
  while (a.length > 0 && a.length < 6) {
    a = a.concat(pr);
  }

  const renderCard = p => {
    const u = p.link ? p.link.trim() : "";
    const isPdf = /\.pdf$/i.test(u);
    const linkText = p.linkLabel || (isPdf ? "View Case Study (PDF) &rarr;" : "View live site &rarr;");
    const t = u ? "a" : "div";
    const imgUrl = resolveImg(p.image);
    return `
      <${t} class="pc"${u ? ` href="${E(u)}" target="_blank" rel="noopener"` : ""}>
        <div class="cv">
          ${imgUrl ? `<img src="${E(imgUrl)}" alt="${E(p.title)}" loading="lazy" onerror="this.parentElement.innerHTML='<span>${E(p.title.slice(0,2).toUpperCase())}</span>'">` : `<span>${E(p.title.slice(0,2).toUpperCase())}</span>`}
        </div>
        <div class="pb">
          <small>${E(p.category)}</small>
          <h3>${E(p.title)}</h3>
          <p>${E(p.desc)}</p>
          <div class="tg">
            ${(p.tags || []).map(tag => `<b>${E(tag)}</b>`).join("")}
          </div>
          ${u ? `<span class="lk">${linkText}</span>` : ""}
        </div>
      </${t}>
    `;
  };

  let appHtml = `
  <!-- Header -->
  <header id="hd">
    <div class="hn">
      <a class="lg" href="#home" title="${E(D.name)}">
        <img src="${E(logoSrc)}" alt="Logo" onerror="this.style.display='none'">
        <span>${E(D.name)}</span>
      </a>
      <nav id="navMenu">
        <a href="#home">Home</a>
        <a href="#projects">Projects</a>
        <div class="nav-drop">
          <a href="#skills">Skills <span class="arr">&#9660;</span></a>
          <div class="drop-menu">
            ${D.skills.map((sk, idx) => `
              <a href="#skills" onclick="openSkillGroup(${idx})">${E(sk.group)}</a>
            `).join("")}
          </div>
        </div>
        <a href="#exp">Experience</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
      <a class="btn p sm cb" href="#contact">Let's Connect</a>
      <button class="bg" id="bg" aria-label="Toggle Menu">&#9776;</button>
    </div>
  </header>

  <main>
    <!-- 1. HERO SECTION -->
    <section id="home" class="hero">
      <div class="w hg">
        <div>
          <p ${rv("bd")}><span class="dot"></span>Open to opportunities</p>
          <h1 ${rv("gt")}>${E(D.name)}</h1>
          <h2 ${rv("rl")}>${E(D.role)}</h2>
          <p ${rv("hl")}>${E(D.headline)}</p>
          <p ${rv("mu")}>${E(D.bio)}</p>
          <div ${rv("bt")}>
            <a class="btn p" href="#projects">Explore my projects</a>
            <a class="btn g" href="#contact">Contact me</a>
          </div>
          <div ${rv("so")}>
            ${soc.map(s => `<a href="${E(D[s.key])}" target="_blank" rel="noopener">${s.label}</a>`).join("")}
            <a href="mailto:${E(D.email)}">Email</a>
          </div>
        </div>
        <div ${rv("av")}>
          <div class="av-inner">
            <img src="${E(photoSrc)}" alt="${E(D.name)}" onerror="this.style.display='none';this.nextElementSibling.style.display='grid';">
            <div class="av-fallback" style="display:none">${E(ini)}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. PROJECTS SECTION (100% Smooth Infinite Marquee Loop) -->
    <section id="projects" class="sec">
      <div class="w">
        <div class="sec-hdr">
          <div>
            <h2 ${rv("st")}>Featured Projects</h2>
            <p ${rv("mu")}>Hover to pause scrolling, click any card to inspect live project or case study PDF.</p>
          </div>
        </div>
      </div>
      <div class="mq">
        <div class="tk" style="--t:${Math.max(a.length, 1) * 12}s">
          <div class="mq-group">
            ${a.map(renderCard).join("")}
          </div>
          <div class="mq-group" aria-hidden="true">
            ${a.map(renderCard).join("")}
          </div>
        </div>
      </div>
    </section>

    <!-- 3. SKILLS SECTION -->
    <section id="skills" class="sec alt">
      <div class="w nr">
        <h2 ${rv("st")}>Skills & Expertise</h2>
        <p ${rv("mu")}>Explore core capabilities across technical development, digital strategy, and business systems.</p>
        ${D.skills.map((sk, idx) => `
          <details ${rv()}${idx === 0 ? " open" : ""} id="skill-group-${idx}">
            <summary>${E(sk.group)} <em>${sk.items.length} skills</em></summary>
            <div class="ch">
              ${sk.items.map((item, j) => `<b style="--i:${j}">${E(item)}</b>`).join("")}
            </div>
          </details>
        `).join("")}
      </div>
    </section>

    <!-- 4. EXPERIENCE SECTION -->
    <section id="exp" class="sec">
      <div class="w nr">
        <h2 ${rv("st")}>Experience</h2>
        ${D.exp.map(e => `
          <div ${rv("tl")}>
            <h3>${E(e.role)}</h3>
            <p class="org">${E(e.company)}${e.period ? " &bull; " + E(e.period) : ""}</p>
            <ul>
              ${e.points.map(pt => `<li>${E(pt)}</li>`).join("")}
            </ul>
          </div>
        `).join("")}
      </div>
    </section>

    <!-- 5. ABOUT ME SECTION (with 2D Earth Global Reach Animation) -->
    <section id="about" class="sec alt">
      <div class="w">
        <h2 ${rv("st")}>About Me</h2>
        <div class="ag">
          <div>
            ${D.about.split("\n").filter(Boolean).map(para => `<p ${rv()}>${E(para.trim())}</p>`).join("")}
            
            <!-- 2D Earth Global Service Animation Widget -->
            <div class="earth-widget ${rv()}">
              <div class="earth-widget-header">
                <h4><span>🌍</span> Global Service Footprint</h4>
                <div class="earth-badge"><span class="dot"></span> Serving Worldwide</div>
              </div>
              <div class="earth-stage">
                <canvas id="earthCanvas"></canvas>
              </div>
              <div class="earth-stats">
                <div class="earth-stat-item">
                  <strong>100%</strong>
                  <span>Remote Capability</span>
                </div>
                <div class="earth-stat-item">
                  <strong>Worldwide</strong>
                  <span>Client Reach</span>
                </div>
                <div class="earth-stat-item">
                  <strong>24 / 7</strong>
                  <span>Agile Communication</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div ${rv("cd")}>
              <h3>Education</h3>
              ${(() => {
                const raw = (D.edu || "").replace(/\s*\(?\s*2024\s*\)?/gi, "").trim();
                const parts = raw.includes("|") ? raw.split("|") : raw.split(",");
                const degree = (parts[0] || "B.Sc. in Computer Science & Engineering").trim();
                const uni = (parts.slice(1).join(", ") || "Northern University of Business & Technology, Bangladesh").trim();
                return `
                  <p class="edu-degree">${E(degree)}</p>
                  <p class="edu-uni">${E(uni)}</p>
                `;
              })()}
            </div>
            <div ${rv("cd")}>
              <h3>Core Focus</h3>
              <div class="ch">
                ${D.focus.split(",").map(f => `<b>${E(f.trim())}</b>`).join("")}
              </div>
            </div>
            <div ${rv("cd")}>
              <h3>Career Goal</h3>
              <p>${E(D.goal)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. CONTACT SECTION -->
    <section id="contact" class="sec">
      <div class="w nr">
        <div ${rv("cc")}>
          <h2>Let's build something great together</h2>
          <p>Have a website to develop, an advertising campaign to scale, or a technical role to fill? Let's connect and discuss your vision.</p>
          <a class="btn p big" href="mailto:${E(D.email)}?subject=Project%20Inquiry%20-%20Huzaifa%20Tamim">Email me</a>
          <div class="ci">
            <span style="display:inline-flex;align-items:center;gap:6px;">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--b);">
                <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z"></path>
                <circle cx="12" cy="9" r="2.5"></circle>
              </svg>
              ${E(D.loc)}
            </span>
            <a href="mailto:${E(D.email)}">&#9993; ${E(D.email)}</a>
            ${soc.map(s => `<a href="${E(D[s.key])}" target="_blank" rel="noopener">${s.label}</a>`).join("")}
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="ft">
    <div class="w">
      &copy; 2026 ${E(D.name)}. All rights reserved.
    </div>
  </footer>

  <!-- Floating Admin Button -->
  <button class="ab" id="openAdminBtn" title="Manage Projects & Profile (Private)">
    <span>&#128274;</span> Admin Dashboard
  </button>

  <!-- Passkey Lock Modal -->
  <div class="admin-modal-backdrop" id="passkeyModal">
    <div class="admin-lock-box">
      <div class="admin-lock-icon">&#128274;</div>
      <h3 style="margin:0 0 6px;color:#fff;">Admin Verification</h3>
      <p style="margin:0 0 16px;color:var(--mu);font-size:13.5px;">Enter your private passkey to manage projects and settings.</p>
      <form id="passkeyForm" onsubmit="return false;">
        <input type="password" id="passkeyInput" class="form-control pin-input" maxlength="8" placeholder="••••" autocomplete="current-password" autofocus>
        <p id="passkeyError" style="color:#f87171;font-size:13px;margin:8px 0;display:none;">Incorrect passkey. Please try again.</p>
        <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;">
          <button type="button" class="btn g sm" id="closePasskeyBtn">Cancel</button>
          <button type="submit" class="btn p sm" id="submitPasskeyBtn">Unlock</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Admin Modal (Unlocked) -->
  <div class="admin-modal-backdrop" id="adminModal">
    <div class="admin-modal">
      <div class="admin-header">
        <h3><span>&#9881;</span> Portfolio Admin Dashboard</h3>
        <div style="display:flex;align-items:center;gap:12px;">
          <button class="btn g sm" id="lockAdminBtn" style="padding:6px 12px;font-size:12px;">&#128274; Lock</button>
          <button class="admin-close-btn" id="closeAdminBtn" aria-label="Close">&times;</button>
        </div>
      </div>
      <div class="admin-body">
        <div class="admin-nav-tabs">
          <button class="admin-tab active" data-tab="projectsTab">Projects Manager</button>
          <button class="admin-tab" data-tab="generalTab">General Info</button>
        </div>

        <!-- Projects Tab Pane -->
        <div class="admin-pane active" id="projectsTab">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px;">
            <p style="margin:0;color:var(--mu);font-size:14px;">Add, edit, or remove your portfolio projects and update thumbnails or case study PDFs.</p>
            <button class="btn p sm" id="addNewProjectBtn">+ Add New Project</button>
          </div>

          <!-- Project Form -->
          <div id="projectEditForm" style="display:none;background:var(--card);border:1px solid var(--ln);border-radius:14px;padding:20px;margin-bottom:20px;">
            <h4 id="formTitle" style="color:var(--b);margin-top:0;">Add / Edit Project</h4>
            <input type="hidden" id="editProjectId">
            <div class="form-group">
              <label>Project Title</label>
              <input type="text" id="projTitle" class="form-control" placeholder="e.g. Meta Ads Campaign Pilot">
            </div>
            <div class="form-group">
              <label>Category / Subtitle</label>
              <input type="text" id="projCategory" class="form-control" placeholder="e.g. Performance Marketing Case Study">
            </div>
            <div class="form-group">
              <label>Description</label>
              <textarea id="projDesc" class="form-control" placeholder="Detailed summary of results, features, or stack..."></textarea>
            </div>
            <div class="form-group">
              <label>Tags (comma separated)</label>
              <input type="text" id="projTags" class="form-control" placeholder="e.g. Meta Ads, Advantage+, ROAS">
            </div>
            <div class="form-group">
              <label>Live URL or PDF Path</label>
              <input type="text" id="projLink" class="form-control" placeholder="e.g. meta-ads-case-study.pdf or https://...">
            </div>
            <div class="form-group">
              <label>Button Label (optional)</label>
              <input type="text" id="projLinkLabel" class="form-control" placeholder="e.g. View Case Study (PDF) &rarr;">
            </div>
            <div class="form-group">
              <label>Thumbnail Image</label>
              <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
                <input type="text" id="projImgPath" class="form-control" style="flex:1;min-width:200px;" placeholder="Image filename (e.g. meta-ads-thumb.png) or URL">
                <label class="btn g sm" style="cursor:pointer;margin:0;">
                  Upload Photo
                  <input type="file" id="projImgUpload" accept="image/*" style="display:none;">
                </label>
              </div>
              <div style="margin-top:10px;">
                <img id="projImgPreview" style="max-height:100px;border-radius:8px;border:1px solid var(--ln);display:none;">
              </div>
            </div>
            <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:16px;">
              <button class="btn g sm" id="cancelProjFormBtn">Cancel</button>
              <button class="btn p sm" id="saveProjFormBtn">Save Project</button>
            </div>
          </div>

          <!-- Existing Projects List -->
          <div id="adminProjectsList"></div>
        </div>

        <!-- General Info Tab Pane -->
        <div class="admin-pane" id="generalTab">
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="genName" class="form-control">
          </div>
          <div class="form-group">
            <label>Professional Title</label>
            <input type="text" id="genRole" class="form-control">
          </div>
          <div class="form-group">
            <label>Location</label>
            <input type="text" id="genLoc" class="form-control" placeholder="Bangladesh">
          </div>
          <div class="form-group">
            <label>Hero Headline</label>
            <input type="text" id="genHeadline" class="form-control">
          </div>
          <div class="form-group">
            <label>Short Bio</label>
            <textarea id="genBio" class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="genEmail" class="form-control">
          </div>
          <div class="form-group">
            <label>Profile Photo File/URL</label>
            <input type="text" id="genPhoto" class="form-control">
          </div>
          <div class="form-group">
            <label>Logo File/URL</label>
            <input type="text" id="genLogo" class="form-control">
          </div>
          <div class="form-group">
            <label>About Me Description</label>
            <textarea id="genAbout" class="form-control" style="min-height:130px;"></textarea>
          </div>
        </div>
      </div>
      <div class="admin-footer">
        <span id="adminStatusMsg"></span>
        <button class="btn g sm" id="resetDefaultsBtn">Reset Defaults</button>
        <button class="btn p sm" id="saveAllAdminBtn">Apply Changes</button>
      </div>
    </div>
  </div>

  <!-- AI Gemini Chat Circular Launcher (Stacked on Right above Admin Dashboard) -->
  <button class="ai-chat-launcher" id="openChatBtn" title="Chat with Gemini AI Assistant" aria-label="Open Gemini AI Assistant">
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
      <path d="M12 2C12 7.52285 7.52285 12 2 12C7.52285 12 12 16.4772 12 22C12 16.4772 16.4772 12 22 12C16.4772 12 12 7.52285 12 2Z" fill="url(#geminiLogoGrad)" />
      <defs>
        <linearGradient id="geminiLogoGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stop-color="#3b82f6"/>
          <stop offset="0.5" stop-color="#8b5cf6"/>
          <stop offset="1" stop-color="#22d3ee"/>
        </linearGradient>
      </defs>
    </svg>
  </button>

  <div class="ai-chat-panel" id="aiChatPanel">
    <div class="ai-chat-header">
      <h4>
        <span>✨</span> Huzaifa's AI Assistant 
        <span class="ai-gemini-badge">Gemini</span>
      </h4>
      <div class="ai-chat-actions">
        <button class="ai-chat-btn-sm" id="toggleAiSettingsBtn" title="Gemini API Key Settings">&#9881;</button>
        <button class="ai-chat-btn-sm" id="closeChatBtn" aria-label="Close Chat">&times;</button>
      </div>
    </div>

    <!-- Gemini API Key Settings Panel -->
    <div class="ai-settings-panel" id="aiSettingsPanel">
      <label style="display:block;margin-bottom:4px;font-weight:600;color:var(--tx);">Google Gemini API Key (Optional)</label>
      <input type="password" id="geminiApiKeyInput" class="form-control" style="font-size:12px;padding:6px 10px;" placeholder="AIzaSy...">
      <p style="margin:4px 0 8px;color:var(--mu);font-size:11px;">
        Leave empty to use built-in smart assistant, or add your key from <a href="https://aistudio.google.com/" target="_blank" style="color:var(--b);">Google AI Studio</a> for dynamic Gemini generation.
      </p>
      <button class="btn p sm" id="saveApiKeyBtn" style="padding:4px 12px;font-size:12px;">Save API Key</button>
      <span id="apiKeyStatus" style="color:var(--b);margin-left:8px;font-size:11px;"></span>
    </div>

    <!-- Chat Messages Body -->
    <div class="ai-chat-body" id="aiChatBody">
      <div class="ai-msg ai-msg-bot">
        👋 Hi! I am Huzaifa's AI Assistant powered by Gemini. Ask me anything about his web development expertise, Meta Ads campaign case study, technical skills, or project collaborations!
      </div>
      <div class="ai-quick-prompts" id="aiQuickPrompts">
        <button class="ai-prompt-chip" onclick="askAiPrompt('Tell me about the Meta Ads campaign results and case study PDF')">📊 Meta Ads Case Study</button>
        <button class="ai-prompt-chip" onclick="askAiPrompt('What technical and web development skills does Huzaifa have?')">💻 Tech Stack</button>
        <button class="ai-prompt-chip" onclick="askAiPrompt('How can I contact or hire Huzaifa?')">📬 Contact & Hire</button>
        <button class="ai-prompt-chip" onclick="askAiPrompt('Tell me about the IPVS Bangladesh Chapter project')">🌐 IPVS Project</button>
      </div>
    </div>

    <!-- Chat Input Footer -->
    <div class="ai-chat-footer">
      <input type="text" id="aiChatInput" class="ai-chat-input" placeholder="Ask about Huzaifa..." autocomplete="off">
      <button class="ai-chat-send" id="aiSendBtn" aria-label="Send">&#10148;</button>
    </div>
  </div>
  `;

  $("#app").innerHTML = appHtml;

  // Setup components
  setupNavEvents();
  setupScrollObserver();
  initEarthAnimation();
  setupAdminEvents();
  setupAiChatEvents();
}

// Navigation & Smooth Scroll
function setupNavEvents() {
  const bg = $("#bg");
  const hd = $("#hd");
  if (bg && hd) {
    bg.onclick = () => hd.classList.toggle("o");
    $$("nav a").forEach(a => a.onclick = () => hd.classList.remove("o"));
  }
}

// Scroll Reveal (Fix initial load flicker & reveal elements immediately if above fold)
function setupScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  $$(".rv").forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("in");
    } else {
      observer.observe(el);
    }
  });
}

// Open Skill Accordion from Dropdown
window.openSkillGroup = function(idx) {
  const hd = $("#hd");
  if (hd) hd.classList.remove("o");
  const details = document.getElementById("skill-group-" + idx);
  if (details) {
    details.open = true;
    setTimeout(() => {
      details.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  }
};

// ----------------------------------------------------
// 2D Earth Global Service Reach Animation (Smooth 60fps & Leak-Free)
// ----------------------------------------------------
function initEarthAnimation() {
  const canvas = document.getElementById("earthCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let animationFrameId;
  let isVisible = true;
  let angle = 0;

  function resize() {
    if (!canvas || !canvas.parentElement) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = window.devicePixelRatio || 1;
    const width = Math.min(rect.width, 600);
    const height = Math.min(rect.height, 280);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  window.addEventListener("resize", resize);
  resize();

  const locations = [
    { name: "Bangladesh (HQ)", lat: 23.8, lon: 90.4, hq: true },
    { name: "United States", lat: 37.7, lon: -122.4 },
    { name: "United Kingdom", lat: 51.5, lon: -0.1 },
    { name: "Germany", lat: 52.5, lon: 13.4 },
    { name: "United Arab Emirates", lat: 25.2, lon: 55.3 },
    { name: "Singapore", lat: 1.35, lon: 103.8 },
    { name: "Australia", lat: -33.8, lon: 151.2 }
  ];

  const earthObserver = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
    if (isVisible) {
      if (!animationFrameId) animate();
    } else {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
  }, { threshold: 0.1 });
  earthObserver.observe(canvas);

  function draw() {
    const width = parseFloat(canvas.style.width) || 300;
    const height = parseFloat(canvas.style.height) || 280;
    const cx = width / 2;
    const cy = height / 2;
    const R = Math.min(width, height) * 0.38;

    ctx.clearRect(0, 0, width, height);

    // Outer Glow
    const glow = ctx.createRadialGradient(cx, cy, R * 0.8, cx, cy, R * 1.35);
    glow.addColorStop(0, "rgba(34, 211, 238, 0.2)");
    glow.addColorStop(0.6, "rgba(59, 130, 246, 0.08)");
    glow.addColorStop(1, "rgba(7, 13, 31, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
    ctx.fill();

    // Globe Sphere
    const oceanGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
    oceanGrad.addColorStop(0, "#0e2354");
    oceanGrad.addColorStop(0.7, "#091433");
    oceanGrad.addColorStop(1, "#050c20");

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fillStyle = oceanGrad;
    ctx.fill();
    ctx.lineWidth = 1.8;
    ctx.strokeStyle = "rgba(34, 211, 238, 0.6)";
    ctx.stroke();
    ctx.clip();

    // Latitudes
    ctx.lineWidth = 0.8;
    ctx.strokeStyle = "rgba(59, 130, 246, 0.25)";
    for (let lat = -60; lat <= 60; lat += 30) {
      const y = cy - (lat / 90) * (R * 0.9);
      const rAtLat = Math.sqrt(Math.max(0, R * R - (y - cy) * (y - cy)));
      ctx.beginPath();
      ctx.ellipse(cx, y, rAtLat, rAtLat * 0.25, 0, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Longitudes
    for (let lon = 0; lon < 360; lon += 45) {
      const curLon = (lon + angle) % 360;
      const rad = (curLon * Math.PI) / 180;
      const xOffset = Math.sin(rad);
      const isFront = Math.cos(rad) > 0;

      if (isFront) {
        ctx.beginPath();
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = "rgba(34, 211, 238, 0.3)";
        ctx.ellipse(cx, cy, Math.abs(xOffset) * R, R, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Continent Particle Grid
    const rows = 18;
    const cols = 36;
    for (let r = 0; r < rows; r++) {
      const lat = -75 + (r / (rows - 1)) * 150;
      const latRad = (lat * Math.PI) / 180;
      const y = cy - Math.sin(latRad) * R * 0.92;
      const rLat = Math.cos(latRad) * R;

      for (let c = 0; c < cols; c++) {
        const lon = (c / cols) * 360 + angle;
        const lonRad = (lon * Math.PI) / 180;
        const cosLon = Math.cos(lonRad);

        if (cosLon > 0) {
          const x = cx + Math.sin(lonRad) * rLat;
          const isLand = (Math.sin(latRad * 3.5) * Math.cos(lonRad * 2.5) > -0.15) ||
                         (Math.sin(latRad * 2.2 + 0.4) * Math.cos(lonRad * 3.1) > 0.05);

          if (isLand) {
            ctx.fillStyle = `rgba(34, 211, 238, ${0.25 * cosLon + 0.15})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.4 * cosLon + 0.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    // Nodes & Arcs
    const screenNodes = [];
    locations.forEach(loc => {
      const lonRad = ((loc.lon + angle) * Math.PI) / 180;
      const latRad = (loc.lat * Math.PI) / 180;
      const cosLon = Math.cos(lonRad);

      if (cosLon > 0.05) {
        const rLat = Math.cos(latRad) * R;
        const x = cx + Math.sin(lonRad) * rLat;
        const y = cy - Math.sin(latRad) * R * 0.92;
        screenNodes.push({ ...loc, x, y, alpha: cosLon });
      }
    });

    const hqNode = screenNodes.find(n => n.hq);
    if (hqNode) {
      screenNodes.forEach(node => {
        if (!node.hq) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(34, 211, 238, ${0.45 * Math.min(hqNode.alpha, node.alpha)})`;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([4, 4]);
          
          const midX = (hqNode.x + node.x) / 2;
          const midY = Math.min(hqNode.y, node.y) - 22;
          ctx.quadraticCurveTo(midX, midY, node.x, node.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });
    }

    const pulse = (Date.now() % 1600) / 1600;
    screenNodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 4 + pulse * 7, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - pulse) * node.alpha * 0.8})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.hq ? 4 : 2.8, 0, Math.PI * 2);
      ctx.fillStyle = node.hq ? "#22d3ee" : "#3b82f6";
      ctx.shadowColor = "#22d3ee";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    ctx.restore();

    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(34, 211, 238, 0.4)";
    ctx.stroke();
  }

  function animate() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }
    angle = (angle + 0.35) % 360;
    draw();
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

// ----------------------------------------------------
// Admin Dashboard Logic (Protected with Passkey: 1045)
// ----------------------------------------------------
function setupAdminEvents() {
  const openBtn = $("#openAdminBtn");
  const passkeyModal = $("#passkeyModal");
  const adminModal = $("#adminModal");
  const passkeyInput = $("#passkeyInput");
  const passkeyError = $("#passkeyError");
  const submitPasskeyBtn = $("#submitPasskeyBtn");
  const closePasskeyBtn = $("#closePasskeyBtn");
  const closeAdminBtn = $("#closeAdminBtn");
  const lockAdminBtn = $("#lockAdminBtn");

  if (!openBtn) return;

  const openAdminView = () => {
    populateAdminFields();
    renderAdminProjectsList();
    adminModal.classList.add("open");
  };

  const handleOpenClick = () => {
    if (sessionStorage.getItem("admin_authenticated") === "true") {
      openAdminView();
    } else {
      if (passkeyInput) passkeyInput.value = "";
      if (passkeyError) passkeyError.style.display = "none";
      passkeyModal.classList.add("open");
      setTimeout(() => passkeyInput && passkeyInput.focus(), 150);
    }
  };

  openBtn.onclick = handleOpenClick;

  if (closePasskeyBtn) {
    closePasskeyBtn.onclick = () => passkeyModal.classList.remove("open");
  }

  // Passkey Submission
  const verifyPasskey = () => {
    const val = (passkeyInput.value || "").trim();
    if (val === ADMIN_PASSKEY) {
      sessionStorage.setItem("admin_authenticated", "true");
      passkeyModal.classList.remove("open");
      openAdminView();
    } else {
      if (passkeyError) passkeyError.style.display = "block";
      passkeyInput.select();
    }
  };

  if (submitPasskeyBtn) submitPasskeyBtn.onclick = verifyPasskey;
  if ($("#passkeyForm")) $("#passkeyForm").onsubmit = verifyPasskey;

  if (lockAdminBtn) {
    lockAdminBtn.onclick = () => {
      sessionStorage.removeItem("admin_authenticated");
      adminModal.classList.remove("open");
    };
  }

  if (closeAdminBtn) {
    closeAdminBtn.onclick = () => {
      adminModal.classList.remove("open");
      hideProjectForm();
    };
  }

  passkeyModal.onclick = e => {
    if (e.target === passkeyModal) passkeyModal.classList.remove("open");
  };

  adminModal.onclick = e => {
    if (e.target === adminModal) {
      adminModal.classList.remove("open");
      hideProjectForm();
    }
  };

  // Keyboard shortcut Alt+A
  window.addEventListener("keydown", e => {
    if (e.altKey && e.key.toLowerCase() === "a") {
      if (adminModal.classList.contains("open")) {
        adminModal.classList.remove("open");
      } else {
        handleOpenClick();
      }
    }
  });

  // Admin tab switching
  $$(".admin-tab").forEach(tab => {
    tab.onclick = () => {
      $$(".admin-tab").forEach(t => t.classList.remove("active"));
      $$(".admin-pane").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      const targetPane = document.getElementById(tab.dataset.tab);
      if (targetPane) targetPane.classList.add("active");
    };
  });

  // Add Project
  const addNewProjBtn = $("#addNewProjectBtn");
  if (addNewProjBtn) {
    addNewProjBtn.onclick = () => showProjectForm();
  }

  // Cancel Project Form
  const cancelProjBtn = $("#cancelProjFormBtn");
  if (cancelProjBtn) {
    cancelProjBtn.onclick = () => hideProjectForm();
  }

  // Project Image Upload
  const imgUpload = $("#projImgUpload");
  if (imgUpload) {
    imgUpload.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      $("#projImgPath").value = file.name;
      const reader = new FileReader();
      reader.onload = ev => {
        $("#projImgPath").value = ev.target.result;
        const prev = $("#projImgPreview");
        prev.src = ev.target.result;
        prev.style.display = "block";
      };
      reader.readAsDataURL(file);
    };
  }

  const imgPathInput = $("#projImgPath");
  if (imgPathInput) {
    imgPathInput.oninput = () => {
      const val = imgPathInput.value.trim();
      const prev = $("#projImgPreview");
      if (val) {
        prev.src = val;
        prev.style.display = "block";
      } else {
        prev.style.display = "none";
      }
    };
  }

  // Save Project Form
  const saveProjBtn = $("#saveProjFormBtn");
  if (saveProjBtn) {
    saveProjBtn.onclick = () => {
      const id = $("#editProjectId").value;
      const title = $("#projTitle").value.trim();
      const category = $("#projCategory").value.trim();
      const desc = $("#projDesc").value.trim();
      const tags = $("#projTags").value.split(",").map(t => t.trim()).filter(Boolean);
      const link = $("#projLink").value.trim();
      const linkLabel = $("#projLinkLabel").value.trim();
      const image = $("#projImgPath").value.trim();

      if (!title) {
        alert("Please enter a project title.");
        return;
      }

      if (id) {
        const idx = D.projects.findIndex(p => p.id === id);
        if (idx > -1) {
          D.projects[idx] = { id, title, category, desc, tags, link, linkLabel, image };
        }
      } else {
        const newId = "p_" + Date.now();
        D.projects.unshift({ id: newId, title, category, desc, tags, link, linkLabel, image });
      }

      saveData();
      hideProjectForm();
      renderAdminProjectsList();
      render();
      flashStatus("Project saved successfully!");
    };
  }

  // Reset to Defaults
  const resetBtn = $("#resetDefaultsBtn");
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm("Reset all portfolio data to default settings?")) {
        localStorage.removeItem(STORAGE_KEY);
        D = JSON.parse(JSON.stringify(DEFAULT_DATA));
        populateAdminFields();
        renderAdminProjectsList();
        render();
        flashStatus("Reset to default settings.");
      }
    };
  }

  // Apply General Settings
  const saveAllBtn = $("#saveAllAdminBtn");
  if (saveAllBtn) {
    saveAllBtn.onclick = () => {
      D.name = $("#genName").value.trim() || D.name;
      D.role = $("#genRole").value.trim() || D.role;
      D.loc = $("#genLoc").value.trim() || D.loc;
      D.headline = $("#genHeadline").value.trim() || D.headline;
      D.bio = $("#genBio").value.trim() || D.bio;
      D.email = $("#genEmail").value.trim() || D.email;
      D.photo = $("#genPhoto").value.trim() || D.photo;
      D.logo = $("#genLogo").value.trim() || D.logo;
      D.about = $("#genAbout").value.trim() || D.about;

      saveData();
      render();
      flashStatus("All changes applied & saved!");
      setTimeout(() => adminModal.classList.remove("open"), 800);
    };
  }
}

function flashStatus(msg) {
  const el = $("#adminStatusMsg");
  if (el) {
    el.textContent = msg;
    setTimeout(() => { el.textContent = ""; }, 3000);
  }
}

function showProjectForm(project = null) {
  const form = $("#projectEditForm");
  if (!form) return;
  form.style.display = "block";

  if (project) {
    $("#formTitle").textContent = "Edit Project";
    $("#editProjectId").value = project.id;
    $("#projTitle").value = project.title || "";
    $("#projCategory").value = project.category || "";
    $("#projDesc").value = project.desc || "";
    $("#projTags").value = (project.tags || []).join(", ");
    $("#projLink").value = project.link || "";
    $("#projLinkLabel").value = project.linkLabel || "";
    $("#projImgPath").value = project.image || "";
    const prev = $("#projImgPreview");
    if (project.image) {
      prev.src = project.image;
      prev.style.display = "block";
    } else {
      prev.style.display = "none";
    }
  } else {
    $("#formTitle").textContent = "Add New Project";
    $("#editProjectId").value = "";
    $("#projTitle").value = "";
    $("#projCategory").value = "";
    $("#projDesc").value = "";
    $("#projTags").value = "";
    $("#projLink").value = "";
    $("#projLinkLabel").value = "";
    $("#projImgPath").value = "";
    $("#projImgPreview").style.display = "none";
  }

  form.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function hideProjectForm() {
  const form = $("#projectEditForm");
  if (form) form.style.display = "none";
}

function renderAdminProjectsList() {
  const list = $("#adminProjectsList");
  if (!list) return;

  if (!D.projects || D.projects.length === 0) {
    list.innerHTML = `<p style="color:var(--mu);text-align:center;padding:20px;">No projects added yet. Click "+ Add New Project" above.</p>`;
    return;
  }

  list.innerHTML = D.projects.map((p) => `
    <div class="admin-project-card">
      <img class="admin-thumb-preview" src="${E(resolveImg(p.image || ''))}" alt="${E(p.title)}" onerror="this.src='';this.alt='No Image'">
      <div class="admin-project-info">
        <h4>${E(p.title)}</h4>
        <p>${E(p.category)} &bull; ${(p.tags || []).slice(0, 3).join(", ")}</p>
      </div>
      <div class="admin-actions">
        <button class="btn-icon" onclick="editProjectById('${p.id}')"><span>&#9998;</span> Edit</button>
        <button class="btn-icon btn-danger" onclick="deleteProjectById('${p.id}')"><span>&times;</span> Remove</button>
      </div>
    </div>
  `).join("");
}

window.editProjectById = function(id) {
  const proj = D.projects.find(p => p.id === id);
  if (proj) showProjectForm(proj);
};

window.deleteProjectById = function(id) {
  const proj = D.projects.find(p => p.id === id);
  if (!proj) return;
  if (confirm(`Are you sure you want to remove "${proj.title}"?`)) {
    D.projects = D.projects.filter(p => p.id !== id);
    saveData();
    renderAdminProjectsList();
    render();
    flashStatus("Project removed.");
  }
};

function populateAdminFields() {
  if ($("#genName")) $("#genName").value = D.name || "";
  if ($("#genRole")) $("#genRole").value = D.role || "";
  if ($("#genLoc")) $("#genLoc").value = D.loc || "";
  if ($("#genHeadline")) $("#genHeadline").value = D.headline || "";
  if ($("#genBio")) $("#genBio").value = D.bio || "";
  if ($("#genEmail")) $("#genEmail").value = D.email || "";
  if ($("#genPhoto")) $("#genPhoto").value = D.photo || "";
  if ($("#genLogo")) $("#genLogo").value = D.logo || "";
  if ($("#genAbout")) $("#genAbout").value = D.about || "";
}

// ----------------------------------------------------
// AI Gemini Assistant Chat Logic
// ----------------------------------------------------
function setupAiChatEvents() {
  const openChatBtn = $("#openChatBtn");
  const closeChatBtn = $("#closeChatBtn");
  const chatPanel = $("#aiChatPanel");
  const chatBody = $("#aiChatBody");
  const chatInput = $("#aiChatInput");
  const sendBtn = $("#aiSendBtn");
  const toggleSettingsBtn = $("#toggleAiSettingsBtn");
  const settingsPanel = $("#aiSettingsPanel");
  const apiKeyInput = $("#geminiApiKeyInput");
  const saveApiKeyBtn = $("#saveApiKeyBtn");
  const apiKeyStatus = $("#apiKeyStatus");

  if (!openChatBtn || !chatPanel) return;

  // Load saved API Key if any
  const savedKey = localStorage.getItem("gemini_api_key") || "";
  if (apiKeyInput) apiKeyInput.value = savedKey;

  openChatBtn.onclick = () => {
    chatPanel.classList.toggle("open");
    if (chatPanel.classList.contains("open") && chatInput) {
      chatInput.focus();
    }
  };

  if (closeChatBtn) {
    closeChatBtn.onclick = () => chatPanel.classList.remove("open");
  }

  if (toggleSettingsBtn) {
    toggleSettingsBtn.onclick = () => settingsPanel.classList.toggle("open");
  }

  if (saveApiKeyBtn && apiKeyInput) {
    saveApiKeyBtn.onclick = () => {
      const key = apiKeyInput.value.trim();
      localStorage.setItem("gemini_api_key", key);
      apiKeyStatus.textContent = key ? "Key Saved!" : "Key Cleared.";
      setTimeout(() => { apiKeyStatus.textContent = ""; }, 2500);
      settingsPanel.classList.remove("open");
    };
  }

  // Prompt trigger
  window.askAiPrompt = function(question) {
    if (chatInput) {
      chatInput.value = question;
      handleSendMessage();
    }
  };

  const appendMsg = (text, sender = "bot") => {
    const msgDiv = document.createElement("div");
    msgDiv.className = `ai-msg ai-msg-${sender}`;
    msgDiv.innerHTML = text.replace(/\n/g, "<br>");
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    return msgDiv;
  };

  const handleSendMessage = async () => {
    const text = (chatInput.value || "").trim();
    if (!text) return;

    appendMsg(text, "user");
    chatInput.value = "";

    // Show typing dots
    const typingDiv = document.createElement("div");
    typingDiv.className = "ai-msg ai-msg-bot";
    typingDiv.innerHTML = `<div class="ai-typing-dots"><span></span><span></span><span></span></div>`;
    chatBody.appendChild(typingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    const apiKey = localStorage.getItem("gemini_api_key") || "";

    if (apiKey) {
      // Call Google Gemini API
      try {
        const systemPrompt = `You are the professional AI Assistant for Huzaifa Tamim's portfolio website, powered by Gemini.
Context about Huzaifa:
- Name: Huzaifa Tamim
- Location: Bangladesh (Serves clients worldwide remotely)
- Role: Web Developer & Digital Marketer
- Education: B.Sc. in Computer Science & Engineering from Northern University of Business & Technology, Bangladesh (2024)
- Email: mdhuzaifatamim10@gmail.com
- Key Web Skills: HTML5, CSS3, JavaScript, PHP, C, C++, Technical Troubleshooting, IT Support
- Key Marketing Skills: SEO, Social Media Marketing, Meta Ads, Paid Advertising, Lead Generation, ROAS Optimization
- Featured Project 1: IPVS Bangladesh Chapter (Official responsive healthcare organization website with stats, slider, portal)
- Featured Project 2: Meta Ads Campaign Pilot ($435 spend generated $1,530 revenue, 3.52x ROAS, 15 purchases at $29 CPA, peak 4.85x retargeting ROAS). A dedicated Case Study PDF is available on the site.
Respond concisely, politely, and helpfully as Huzaifa's portfolio assistant.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${systemPrompt}\n\nUser Question: ${text}` }]
              }
            ],
            generationConfig: {
              maxOutputTokens: 250,
              temperature: 0.6
            }
          })
        });

        const data = await response.json();
        typingDiv.remove();

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
          const reply = data.candidates[0].content.parts[0].text;
          appendMsg(reply, "bot");
        } else if (data.error) {
          appendMsg(`⚠️ Gemini API error: ${data.error.message || "Invalid API key"}. Using built-in assistant below:`, "bot");
          appendMsg(getSmartResponse(text), "bot");
        } else {
          appendMsg(getSmartResponse(text), "bot");
        }
      } catch (err) {
        typingDiv.remove();
        appendMsg(getSmartResponse(text), "bot");
      }
    } else {
      // Fast built-in context responder
      setTimeout(() => {
        typingDiv.remove();
        appendMsg(getSmartResponse(text), "bot");
      }, 600);
    }
  };

  if (sendBtn) sendBtn.onclick = handleSendMessage;
  if (chatInput) {
    chatInput.onkeydown = e => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSendMessage();
      }
    };
  }
}

// Built-in intelligent context-aware responder for Huzaifa
function getSmartResponse(q) {
  const query = q.toLowerCase();

  if (query.includes("meta") || query.includes("ad") || query.includes("case study") || query.includes("pdf") || query.includes("roas")) {
    return `📈 <b>Meta Ads Campaign Pilot Case Study:</b><br>
&bull; <b>Ad Spend:</b> $435<br>
&bull; <b>Revenue Generated:</b> $1,530<br>
&bull; <b>Overall ROAS:</b> 3.52x (Warm retargeting achieved peak 4.85x ROAS)<br>
&bull; <b>Purchases:</b> 15 purchases at $29 CPA<br><br>
📄 You can review or download the full <b>Case Study PDF</b> directly from the Projects section above!`;
  }

  if (query.includes("skill") || query.includes("tech") || query.includes("stack") || query.includes("language") || query.includes("developer")) {
    return `💻 <b>Huzaifa's Core Skills:</b><br>
&bull; <b>Web Technologies:</b> HTML5, CSS3, JavaScript, PHP, C, C++, IT Support, Troubleshooting<br>
&bull; <b>Digital Marketing:</b> SEO, Meta Ads / Facebook & Instagram Ads, Social Media Marketing, Lead Gen, Campaign Optimization<br>
&bull; <b>Data & Systems:</b> Data Management, Reporting, Client Communications`;
  }

  if (query.includes("ipvs") || query.includes("bangladesh chapter")) {
    return `🌐 <b>IPVS Bangladesh Chapter Project:</b><br>
Huzaifa designed and developed the official responsive web portal for the Bangladesh Chapter of the International Papillomavirus Society, featuring HPV statistical trackers, a dynamic hero slider, member registration, and event galleries.`;
  }

  if (query.includes("contact") || query.includes("hire") || query.includes("email") || query.includes("location") || query.includes("where")) {
    return `📬 <b>Get in Touch with Huzaifa:</b><br>
&bull; <b>Email:</b> <a href="mailto:mdhuzaifatamim10@gmail.com" style="color:var(--b);">mdhuzaifatamim10@gmail.com</a><br>
&bull; <b>Location:</b> Bangladesh (Serving clients globally 100% remotely)<br>
&bull; <b>LinkedIn:</b> <a href="https://linkedin.com/in/huzaifa-tamim/" target="_blank" style="color:var(--b);">linkedin.com/in/huzaifa-tamim/</a><br>
&bull; <b>GitHub:</b> <a href="https://github.com/huzaifatamim" target="_blank" style="color:var(--b);">github.com/huzaifatamim</a>`;
  }

  if (query.includes("education") || query.includes("degree") || query.includes("graduate") || query.includes("university")) {
    return `🎓 <b>Education:</b><br>
Huzaifa holds a <b>B.Sc. in Computer Science & Engineering</b> from Northern University of Business & Technology, Bangladesh (Class of 2024).`;
  }

  return `Thanks for asking! Huzaifa Tamim is a Web Developer & Digital Marketing Specialist based in Bangladesh, delivering custom websites and high-ROI ad campaigns for global clients. You can reach out directly via email at <a href="mailto:mdhuzaifatamim10@gmail.com" style="color:var(--b);">mdhuzaifatamim10@gmail.com</a>. (Tip: You can also plug in your Google Gemini API key in the chat settings ⚙ for expanded generative answers!)`;
}

// Initial render
document.addEventListener("DOMContentLoaded", () => {
  render();
});
