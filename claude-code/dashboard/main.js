// ── Theme Toggle ──
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
  html.dataset.theme = next;
});

// ── Privacy Switch ──
const privacySwitch = document.getElementById('privacySwitch');
const privacyInput  = document.getElementById('privacy-input');
const privacyLabel  = document.getElementById('privacyLabel');
const privacyHint   = document.getElementById('privacyHint');
let isPrivate = false;

privacySwitch.addEventListener('click', () => {
  isPrivate = !isPrivate;
  privacySwitch.classList.toggle('on', isPrivate);
  privacyInput.value = isPrivate;
  privacyLabel.textContent = isPrivate ? 'Private' : 'Public';
  privacyHint.textContent  = isPrivate ? 'Only you can view this project' : 'Anyone can view this project';
});

// ── Char Counter ──
const descEl    = document.getElementById('projectDesc');
const charCount = document.getElementById('charCount');
descEl.addEventListener('input', () => {
  const n = descEl.value.length;
  charCount.textContent = `${n} / 300`;
  charCount.classList.toggle('warn', n > 240);
});

// ── Project store ──
const projects = [];
const dotColors = ['#6c63ff', '#3ecf8e', '#f0a500', '#f64f59', '#38bdf8', '#e879f9'];

function updateStats() {
  const now = new Date();
  const month = now.getMonth(), year = now.getFullYear();
  let pub = 0, priv = 0, mo = 0;
  projects.forEach(p => {
    if (p.isPrivate) priv++; else pub++;
    const d = new Date(p.date + 'T00:00:00');
    if (d.getMonth() === month && d.getFullYear() === year) mo++;
  });
  document.getElementById('totalProjects').textContent = projects.length;
  document.getElementById('publicCount').textContent   = pub;
  document.getElementById('privateCount').textContent  = priv;
  document.getElementById('monthCount').textContent    = mo;
  document.getElementById('projectCountLabel').textContent =
    projects.length === 1 ? '1 project' : `${projects.length} projects`;
}

function escHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderProjects() {
  const list  = document.getElementById('projectList');
  const empty = document.getElementById('emptyState');

  list.querySelectorAll('.project-item').forEach(el => el.remove());

  if (projects.length === 0) {
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';

  [...projects].reverse().slice(0, 8).forEach((p, i) => {
    const color = dotColors[i % dotColors.length];
    const item = document.createElement('div');
    item.className = 'project-item';
    const dateStr = p.date
      ? new Date(p.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '—';
    item.innerHTML = `
      <div class="project-dot" style="background:${color}"></div>
      <div class="project-info">
        <div class="project-name">${escHtml(p.name)}</div>
        <div class="project-date">${dateStr}</div>
      </div>
      <span class="project-badge ${p.isPrivate ? 'badge-private' : 'badge-public'}">
        ${p.isPrivate ? 'Private' : 'Public'}
      </span>`;
    list.appendChild(item);
  });
}

// ── Form submit ──
const form      = document.getElementById('projectForm');
const submitBtn = document.getElementById('submitBtn');
const nameEl    = document.getElementById('projectName');
const dateEl    = document.getElementById('projectDate');
const nameErr   = document.getElementById('nameError');
const dateErr   = document.getElementById('dateError');
const toast     = document.getElementById('toast');
const toastMsg  = document.getElementById('toastMsg');

function validate() {
  let ok = true;
  if (!nameEl.value.trim()) {
    nameEl.classList.add('invalid');
    nameErr.classList.add('visible');
    ok = false;
  } else {
    nameEl.classList.remove('invalid');
    nameErr.classList.remove('visible');
  }
  if (!dateEl.value) {
    dateEl.classList.add('invalid');
    dateErr.classList.add('visible');
    ok = false;
  } else {
    dateEl.classList.remove('invalid');
    dateErr.classList.remove('visible');
  }
  return ok;
}

nameEl.addEventListener('input', () => {
  if (nameEl.value.trim()) {
    nameEl.classList.remove('invalid');
    nameErr.classList.remove('visible');
  }
});
dateEl.addEventListener('change', () => {
  if (dateEl.value) {
    dateEl.classList.remove('invalid');
    dateErr.classList.remove('visible');
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validate()) return;

// Warn if project is public
if (!isPrivate) {
  const proceed = confirm('This project is public. Anything you post will be public. Proceed?');
  if (!proceed) return;
}

  submitBtn.classList.add('loading');
  submitBtn.innerHTML = '<div class="spinner"></div> Creating…';

  setTimeout(() => {
    const project = {
      name: nameEl.value.trim(),
      date: dateEl.value,
      description: descEl.value.trim(),
      isPrivate
    };
    projects.push(project);
    updateStats();
    renderProjects();

    // Reset form
    nameEl.value = '';
    dateEl.value = '';
    descEl.value = '';
    charCount.textContent = '0 / 300';
    charCount.classList.remove('warn');
    isPrivate = false;
    privacySwitch.classList.remove('on');
    privacyLabel.textContent = 'Public';
    privacyHint.textContent  = 'Anyone can view this project';

    submitBtn.classList.remove('loading');
    submitBtn.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Create Project`;

    // Toast
    toastMsg.textContent = `"${project.name}" has been saved.`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }, 900);
});

// ── Sidebar nav interactivity ──
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    item.classList.add('active');
  });
});

// Init
updateStats();
renderProjects();
