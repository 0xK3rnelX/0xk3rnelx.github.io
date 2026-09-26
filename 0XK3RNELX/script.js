/* ========================================================
   0XK3RNELX INTERACTIVE MATRIX & C2 TERMINAL LOGIC
   ======================================================== */

// Set dynamic year
const yearElem = document.getElementById('year');
if (yearElem) {
  yearElem.textContent = new Date().getFullYear();
}

// ================= MATRIX BACKGROUND CANVAS =================
const canvas = document.getElementById('matrix-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const letters = '0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZ0XK3RNELXDROFFRECONWIRE!<>[]#{}';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function drawMatrix() {
    ctx.fillStyle = 'rgba(7, 9, 14, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff66';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 40);
}

// ================= INTERACTIVE C2 TERMINAL =================
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const COMMANDS = {
  help: `AVAILABLE C2 DIRECTIVES:
  - <span class="t-highlight">whoami</span>     : Display active operator profile & clearance
  - <span class="t-highlight">skills</span>     : Inspect tactical skillsets & language proficiencies
  - <span class="t-highlight">projects</span>   : Interrogate DROFF & RECON-WIRE intelligence files
  - <span class="t-highlight">specs</span>      : Machine hardware & target architecture environments
  - <span class="t-highlight">contact</span>    : Output secure egress & transmission points
  - <span class="t-highlight">clear</span>      : Flush console buffer
  - <span class="t-highlight">cat flag</span>   : Capture the Flag root signature`,
  
  whoami: `[+] CODENAME    : 0XK3RNELX
[+] CREDENTIALS : CEH (Certified Ethical Hacker), Exploit Developer
[+] ROLE        : Offensive Cyber Security, Networking & Low-Level Dev
[+] CLEARANCE   : TOP SECRET // LVL-5 AIR-GAPPED OPERATOR`,

  skills: `ARSENAL BREAKDOWN:
  [#] Languages : Python (95%), Go (90%), JavaScript/TS (85%), React, HTML, CSS
  [#] Domain    : Offensive Cyber Security, CEH v12, Exploit Engineering
  [#] Protocols : Raw Sockets, DNS/HTTP2 Covert Tunnels, mTLS Listeners
  [#] Enclaves  : Linux Hardened Kernels & Windows Active Directory`,

  projects: `CLASSIFIED REPOSITORY CATALOG:
  1. [DROFF]      : Professional C2 Intelligence & Analytics Framework
                    (Encrypted node staging, resilient listeners, PRIVATE REPO)
  2. [RECON-WIRE] : Asynchronous High-Velocity Reconnaissance & EASM Framework
                    (Engineered in Go + Async Python, Mass asset discovery)`,

  specs: `OPERATING MACHINE ARCHITECTURE:
  - WINDOWS : AD Forest Exploitation, Win32 API Hooking, EDR evasion
  - LINUX   : Custom hardened kernels, raw socket manipulation, containers
  - NETWORK : Covert egress routing, multi-proxy mesh, zero packet loss concurrency`,

  contact: `SECURE EGRESS CHANNELS:
  - Email   : 0xk3rnelx@gmail.com
  - GitHub  : https://github.com/0xK3rnelX
  - Web     : https://0xk3rnelx.github.io`,

  clear: 'CLEAR',

  'cat flag': `🚩 [ROOT SIGNATURE CAPTURED]: CTF{0xK3RN3L_R00T_C2_K3RN3L_0V3RL0RD_2026}`
};

function printOutput(htmlContent) {
  if (!terminalOutput) return;
  const line = document.createElement('div');
  line.className = 't-line';
  line.innerHTML = htmlContent;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function executeCmd(rawVal) {
  const cmd = rawVal.trim().toLowerCase();
  printOutput(`<span class="t-prompt">0xk3rnelx@c2-node:~$</span> ${escapeHtml(rawVal)}`);

  if (cmd === 'clear') {
    terminalOutput.innerHTML = '';
  } else if (COMMANDS[cmd]) {
    printOutput(COMMANDS[cmd].replace(/\n/g, '<br/>'));
  } else if (cmd === '') {
    // empty enter
  } else {
    printOutput(`<span style="color: #ff3366;">[-] Command not found: "${escapeHtml(rawVal)}". Type '<span class="t-highlight">help</span>' for authorized instructions.</span>`);
  }

  if (terminalInput) {
    terminalInput.value = '';
  }
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

if (terminalInput) {
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCmd(terminalInput.value);
    }
  });
}

// Attach quick action buttons
document.querySelectorAll('.quick-cmd-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const cmd = btn.getAttribute('data-cmd');
    if (cmd) {
      executeCmd(cmd);
    }
  });
});

function escapeHtml(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
      '`': '&#x60;',
      '=': '&#x3D;'
    })[s];
  });
}
