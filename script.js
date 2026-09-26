/* ========================================================
   0XK3RNELX INTERACTIVE MATRIX & C2 TERMINAL LOGIC
   ======================================================== */

// Set dynamic year
document.getElementById('year').textContent = new Date().getFullYear();

// ================= MATRIX BACKGROUND CANVAS =================
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const letters = '0101010101ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテト0XK3RNELXDROFFRECONWIRE';
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

// ================= INTERACTIVE C2 TERMINAL =================
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const COMMANDS = {
  help: `Available commands:
  - <span class="t-highlight">whoami</span>     : Display operator bio & credentials
  - <span class="t-highlight">skills</span>     : View specialized offensive security arsenal
  - <span class="t-highlight">projects</span>   : Inspect DROFF & RECON-WIRE classified dossiers
  - <span class="t-highlight">contact</span>    : Egress transmission channels
  - <span class="t-highlight">clear</span>      : Clear screen buffer
  - <span class="t-highlight">cat flag</span>   : Reveal root flag`,
  
  whoami: `CODENAME    : 0XK3RNELX
ROLE        : Exploit Developer, CEH, Offensive Security Engineer
DOMAIN      : Red Team Tooling, C2 Infrastructure, High-velocity EASM
PLATFORMS   : Windows Internals & Linux Kernel Enclaves`,

  skills: `ARSENAL BREAKDOWN:
  [#] Languages : Python, Go, JavaScript, React, HTML5, CSS3
  [#] Domain    : Offensive Cyber Security, CEH, Exploitation
  [#] Protocols : Raw Sockets, DNS/HTTP2 Covert Tunnels, mTLS, Traffic Obfuscation
  [#] Targets   : Linux Servers/Containers, Windows AD Environments`,

  projects: `PROJECT REGISTRY:
  1. [DROFF]      : Professional C2 Intelligence Framework
                    (Encrypted node staging, resilient listeners, PRIVATE REPO)
  2. [RECON-WIRE] : Asynchronous High-Velocity Reconnaissance & EASM Framework
                    (Engineered in Go + Async Python, Mass asset discovery)`,

  contact: `SECURE COMMS CHANNELS:
  - Email   : 0xk3rnelx@gmail.com
  - GitHub  : https://github.com/0xK3rnelX
  - Web     : https://0xk3rnelx.github.io`,

  clear: 'CLEAR',

  'cat flag': `CTF{0xK3RN3L_R00T_C2_K3RN3L_0V3RL0RD_2026}`
};

function printOutput(htmlContent) {
  const line = document.createElement('div');
  line.className = 't-line';
  line.innerHTML = htmlContent;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const rawVal = terminalInput.value.trim();
    const cmd = rawVal.toLowerCase();

    // Print command line
    printOutput(`<span class="t-prompt">0xk3rnelx@c2-node:~$</span> ${escapeHtml(rawVal)}`);

    if (cmd === 'clear') {
      terminalOutput.innerHTML = '';
    } else if (COMMANDS[cmd]) {
      printOutput(COMMANDS[cmd].replace(/\n/g, '<br/>'));
    } else if (cmd === '') {
      // Empty enter
    } else {
      printOutput(`<span style="color: #ff3366;">[-] Command not found: ${escapeHtml(rawVal)}. Type '<span class="t-highlight">help</span>' for authorized instructions.</span>`);
    }

    terminalInput.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
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
