/* ============================================
   شخبطه — app.js  (نظام الكُتّاب المتكامل)
   ============================================ */

const ALL_ARTICLES = [
  { file: 'hyprctl-guide.html',          section: 'articles' },
  { file: 'hyprland-blazing-fast.html',  section: 'articles' },
  { file: 'gtk-theming-colloid.html',    section: 'articles' },
  { file: 'window-rules.html',           section: 'articles' },
  { file: 'hyprlock.html',              section: 'articles' },
  { file: 'hypridle-setup.html',        section: 'articles' },
  { file: 'mastering-blur.html',        section: 'articles' },
  { file: 'hyprland-animations.html',   section: 'articles' },
  { file: 'fix-screen-tearing.html',    section: 'articles' },
  { file: 'multi-monitor-setup.html',    section: 'articles' },
  { file: 'window-rules-explained.html', section: 'articles' },
  { file: 'animations-boring-fix.html',  section: 'articles' },
  { file: 'swww-vs-hyprpaper.html',      section: 'articles' },
  { file: 'submaps-guide.html',          section: 'articles' },
  { file: 'gestures-guide.html',         section: 'articles' },
  { file: 'introduction.html',           section: 'articles' },
  { file: 'waybar-dynamic-island.html', section: 'articles' },
  { file: 'lua-config.html',            section: 'articles' },
  { file: 'rounded-screen-corners.html', section: 'articles' },
  { file: 'matugen-base16.html',         section: 'articles' },
  { file: 'font-rendering.html',         section: 'articles' },
  { file: 'dynamic-wallpapers.html',     section: 'articles' },
  { file: 'keybinds-guide.html',         section: 'articles' },
  { file: 'clipboard-manager.html',      section: 'articles' },
  { file: 'screen-sharing.html',         section: 'articles' },
  { file: 'walker-launcher.html',        section: 'articles' },
  { file: 'nvidia-hyprland.html',        section: 'articles' },
  { file: 'usb-automount.html',          section: 'articles' },
  { file: 'waybar-custom-modules.html',  section: 'articles' },
  { file: 'hyprbars-titlebars.html',     section: 'articles' },
  { file: 'hyprland-wildly-fast.html',   section: 'articles' },
  { file: 'dotfiles-git.html',           section: 'articles' },
  { file: 'hyprland-laptop.html',        section: 'articles' },
  { file: 'polkit-agent.html',           section: 'articles' },
  { file: 'qt-theming.html',             section: 'articles' },
  { file: 'cursor-customization.html',   section: 'articles' },
  { file: 'environment-variables.html',  section: 'articles' },
  { file: 'sddm-theming.html',           section: 'articles' },
  { file: 'spicetify.html',             section: 'articles' },
  { file: 'pywal.html',                 section: 'articles' },
  { file: 'pywalfox.html',              section: 'articles' },
  { file: 'neovim-colors.html',         section: 'articles' },
  { file: 'swaync-setup.html',          section: 'articles' },
  { file: 'uwsm-setup.html',            section: 'articles' },
  { file: 'osds-setup.html',            section: 'articles' },
  { file: 'nerd-fonts-guide.html',      section: 'articles' },
  { file: 'aur-chaotic.html',           section: 'articles' },
  { file: 'terminal-beautiful.html',    section: 'articles' },
  { file: 'colors-choosing.html',       section: 'articles' },
  { file: 'gtk-themes-finding.html',    section: 'articles' },
  { file: 'hyprsunset-night.html',      section: 'articles' },
  { file: 'hyprscrolling.html',         section: 'articles' },
  { file: 'hyprpicker-guide.html',      section: 'articles' },
  { file: 'wallpaper-transitions.html', section: 'articles' },
  { file: 'hyprland-plugins-borders.html', section: 'articles' },
  { file: 'layout-dwindle.html',        section: 'articles' },
  { file: 'layout-master.html',         section: 'articles' },
  { file: 'file-manager-best.html',     section: 'articles' },
  { file: 'hyprland-magnifier.html',    section: 'articles' },
  { file: 'copilot-key.html',           section: 'articles' },
  { file: 'rofi-custom-menus.html',     section: 'articles' },
  { file: 'satty-screenshot.html',      section: 'articles' },
  { file: 'custom-color-scheme.html',   section: 'articles' },
  { file: 'alt-tab-snappy.html',        section: 'articles' },
  { file: 'live-wallpaper.html',        section: 'articles' },
  { file: 'font-switcher.html',         section: 'articles' },
  { file: 'terminal-images.html',       section: 'articles' },
  { file: 'fuzzel-launcher.html',       section: 'tools'    },
  { file: 'vscode-custom-theme.html',   section: 'tools'    },
  { file: 'ghostty.html',               section: 'tools'    },
  { file: 'github-vscode.html',         section: 'tools'    },
  { file: 'git-reconnect-github.html',  section: 'tools'    },
  { file: 'iso-burn-linux.html',        section: 'distros'  },
  { file: 'arch-linux-install.html',    section: 'distros'  },
];

const SECTIONS = {
  articles: { name: 'Hyprland',   color: '#7c6af7', basePath: 'articles/' },
  distros:  { name: 'التوزيعات', color: '#38d9c0', basePath: 'distros/'  },
  desktop:  { name: 'واجهات',    color: '#f472b6', basePath: 'desktop/'  },
  tools:    { name: 'أدوات',     color: '#fb923c', basePath: 'tools/'    },
};

const SECTION_ID = window.SECTION_ID || 'all';
const BACK_DEPTH = window.BACK_DEPTH || '';

/* ─── META PARSER ─── */
function parseArticleMeta(html, filename, section) {
  const match = html.match(/<!--\s*([\s\S]*?)-->/);
  if (!match) return null;
  const block = match[1];
  const get = key => { const m = block.match(new RegExp(`${key}:\\s*(.+)`)); return m ? m[1].trim() : ''; };
  return {
    title:         get('title')          || filename.replace('.html',''),
    description:   get('description')    || '',
    tag:           get('tag')            || 'عام',
    date:          get('date')           || '',
    icon:          get('icon')           || '📄',
    author:          get('author')           || '',
    authorGithub:    get('author-github')    || '',
    authorDiscord:   get('author-discord')   || '',
    authorInstagram: get('author-instagram') || '',
    authorBio:       get('author-bio')       || '',
    authorYoutube:   get('author-youtube')   || '',
    authorWebsite:   get('author-website')   || '',
    authorAvatar:    get('author-avatar')    || '',
    section, file: filename,
    path: BACK_DEPTH + SECTIONS[section].basePath + filename,
  };
}

async function fetchMeta(entry) {
  try {
    const resp = await fetch(BACK_DEPTH + SECTIONS[entry.section].basePath + entry.file);
    if (!resp.ok) return null;
    return parseArticleMeta(await resp.text(), entry.file, entry.section);
  } catch { return null; }
}

/* ─── AVATAR ─── */
function getAvatarUrl(meta) {
  if (meta.authorAvatar) return meta.authorAvatar;
  if (meta.authorGithub) {
    const user = meta.authorGithub.replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '');
    if (user) return `https://github.com/${user}.png?size=80`;
  }
  return '';
}

/* ─── AUTHOR CHIP (بطاقة) ─── */
function authorChipHtml(meta) {
  if (!meta.author) return '';
  const avatar = getAvatarUrl(meta);
  const link   = meta.authorGithub || meta.authorWebsite || '';
  const inner  = `${avatar ? `<img class="author-chip-avatar" src="${avatar}" alt="${meta.author}" loading="lazy">` : ''}<span class="author-chip-name">${meta.author}</span>`;
  return link
    ? `<a href="${link}" target="_blank" rel="noopener" class="author-chip" onclick="event.stopPropagation();">${inner}</a>`
    : `<span class="author-chip">${inner}</span>`;
}

/* ─── AUTHOR BLOCK (صفحة المقالة) ─── */
function buildAuthorBlock(meta) {
  if (!meta.author) return '';
  const avatar = getAvatarUrl(meta);
  const socials = [];
  if (meta.authorGithub)
    socials.push(`<a href="${meta.authorGithub}" target="_blank" rel="noopener" class="author-social github">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
      GitHub</a>`);
  if (meta.authorYoutube)
    socials.push(`<a href="${meta.authorYoutube}" target="_blank" rel="noopener" class="author-social youtube">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
      YouTube</a>`);
  if (meta.authorWebsite)
    socials.push(`<a href="${meta.authorWebsite}" target="_blank" rel="noopener" class="author-social website">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
      الموقع</a>`);

  return `<div class="author-block">
    <div class="author-block-inner">
      ${avatar
        ? `<img class="author-block-avatar" src="${avatar}" alt="${meta.author}" loading="lazy">`
        : `<div class="author-block-avatar-placeholder">${meta.author.charAt(0)}</div>`}
      <div class="author-block-info">
        <div class="author-block-label">كتبها</div>
        <div class="author-block-name">${meta.author}</div>
        ${socials.length ? `<div class="author-block-socials">${socials.join('')}</div>` : ''}
      </div>
    </div>
  </div>`;
}

/* ─── SVG ICONS ─── */
const ICONS = {
  github:    `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
  youtube:   `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  discord:   `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z"/></svg>`,
  instagram: `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
  website:   `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>`,
};

/* ─── AUTHOR HERO (header المقالة) ─── */
function buildAuthorHero(meta) {
  const avatar  = getAvatarUrl(meta);
  const avatarHtml = avatar
    ? `<img class="author-hero-avatar" src="${avatar}" alt="${meta.author}" loading="lazy">`
    : `<div class="author-hero-avatar-placeholder">${meta.author.charAt(0)}</div>`;

  const iconLinks = [
    meta.authorGithub   && `<a href="${meta.authorGithub}"   target="_blank" rel="noopener" class="author-hero-icon github"   title="GitHub">${ICONS.github}</a>`,    meta.authorYoutube  && `<a href="${meta.authorYoutube}"  target="_blank" rel="noopener" class="author-hero-icon youtube"  title="YouTube">${ICONS.youtube}</a>`,
    meta.authorDiscord  && `<a href="${meta.authorDiscord}"  target="_blank" rel="noopener" class="author-hero-icon discord"  title="Discord">${ICONS.discord}</a>`,
    meta.authorInstagram&& `<a href="${meta.authorInstagram}"target="_blank" rel="noopener" class="author-hero-icon instagram"title="Instagram">${ICONS.instagram}</a>`,
    meta.authorWebsite  && `<a href="${meta.authorWebsite}"  target="_blank" rel="noopener" class="author-hero-icon website"  title="الموقع">${ICONS.website}</a>`,
  ].filter(Boolean).join('');

  return `<div class="author-hero">
    <div class="author-hero-avatar-wrap">${avatarHtml}</div>
    <div class="author-hero-info">
      <div class="author-hero-label">الناشر</div>
      <div class="author-hero-name">${meta.author}</div>
      ${meta.authorBio ? `<div class="author-hero-bio">${meta.authorBio}</div>` : ''}
      ${iconLinks ? `<div class="author-hero-icons">${iconLinks}</div>` : ''}
    </div>
  </div>`;
}

/* ─── INJECT AUTHOR INTO ARTICLE PAGE ─── */
function injectAuthorIntoPage() {
  const header = document.querySelector('.article-page-header-inner');
  if (!header) return;

  // اقرأ author-github من الـ comment
  const inlineComment = document.documentElement.innerHTML.match(/<!--[\s\S]*?-->/);
  let githubUser = '';

  if (inlineComment) {
    const block = inlineComment[0];
    const get = key => { const m = block.match(new RegExp(`${key}:\\s*(.+)`)); return m ? m[1].trim() : ''; };
    githubUser = get('author-github').replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '');
  }

  // زر تعديل المقالة على GitHub
  function addEditButton() {
    const path = location.pathname; // e.g. /shakhbatah/articles/fix-screen-tearing.html
    const repoBase = 'https://github.com/im-sheen/shakhbatah/edit/main';
    // استخرج المسار النسبي من /shakhbatah/ فصاعداً
    const match = path.match(/\/shakhbatah\/(.*)/);
    const filePath = match ? match[1] : path;
    const editUrl = `${repoBase}/${filePath}`;

    const btn = document.createElement('a');
    btn.href = editUrl;
    btn.target = '_blank';
    btn.rel = 'noopener';
    btn.className = 'edit-btn';
    btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> عدّل هذه المقالة`;
    header.appendChild(btn);
  }

  addEditButton();
  // لا نضيف اسم الكاتب أو صورته داخل صفحة المقالة — تظهر فقط في البطاقة
}

/* ─── READING PROGRESS ─── */
function initReadingProgress() {
  const bar = document.getElementById('readingProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%';
  }, { passive: true });
}

/* ─── LOAD HOME ─── */
async function loadHome() {
  const grid      = document.getElementById('articlesGrid');
  const loadingEl = document.getElementById('loadingState');
  const emptyEl   = document.getElementById('emptyState');
  const totalEl   = document.getElementById('totalCount');
  const results   = await Promise.all(ALL_ARTICLES.map(fetchMeta));
  const articles  = results.filter(Boolean).sort((a,b) => (b.date||'').localeCompare(a.date||''));
  loadingEl.style.display = 'none';
  if (totalEl) totalEl.textContent = articles.length;
  const badgeEl = document.getElementById('badge-count');
  if (badgeEl) badgeEl.textContent = articles.length;
  if (!articles.length) { emptyEl.style.display = 'block'; return; }
  window._allArticles = articles;
  bindSectionFilter(articles);
  bindSearch(articles);
  renderCards(articles, grid, emptyEl);
}

/* ─── LOAD SECTION ─── */
async function loadSection(sectionId) {
  const grid      = document.getElementById('articlesGrid');
  const loadingEl = document.getElementById('loadingState');
  const emptyEl   = document.getElementById('emptyState');
  const entries   = ALL_ARTICLES.filter(a => a.section === sectionId);
  const results   = await Promise.all(entries.map(fetchMeta));
  const articles  = results.filter(Boolean).sort((a,b) => (b.date||'').localeCompare(a.date||''));
  loadingEl.style.display = 'none';
  if (!articles.length) { emptyEl.style.display = 'block'; return; }
  window._allArticles = articles;
  bindTagFilter(articles);
  bindSearch(articles);
  renderCards(articles, grid, emptyEl);
}

function bindSectionFilter(articles) {
  const tagsEl = document.getElementById('filterTags');
  if (!tagsEl) return;
  tagsEl.querySelectorAll('.tag').forEach(btn => {
    btn.addEventListener('click', () => {
      tagsEl.querySelectorAll('.tag').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sec = btn.dataset.section;
      const q   = document.getElementById('searchInput')?.value.toLowerCase() || '';
      renderCards(articles.filter(a =>
        (sec === 'all' || a.section === sec) &&
        (!q || matchQuery(a, q))
      ), document.getElementById('articlesGrid'), document.getElementById('emptyState'));
    });
  });
}

function bindTagFilter(articles) {
  const tagsEl = document.getElementById('filterTags');
  if (!tagsEl) return;
  const tags = ['all', ...new Set(articles.map(a => a.tag))];
  tagsEl.innerHTML = '';
  tags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'tag' + (tag === 'all' ? ' active' : '');
    btn.dataset.tag = tag;
    btn.textContent = tag === 'all' ? 'الكل' : tag;
    btn.addEventListener('click', () => {
      tagsEl.querySelectorAll('.tag').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const q = document.getElementById('searchInput')?.value.toLowerCase() || '';
      renderCards(articles.filter(a =>
        (tag === 'all' || a.tag === tag) && (!q || matchQuery(a, q))
      ), document.getElementById('articlesGrid'), document.getElementById('emptyState'));
    });
  });
}

function matchQuery(a, q) {
  return a.title.toLowerCase().includes(q) ||
         a.description.toLowerCase().includes(q) ||
         (a.author||'').toLowerCase().includes(q) ||
         (a.tag||'').toLowerCase().includes(q);
}

function bindSearch(articles) {
  const input = document.getElementById('searchInput');
  if (!input) return;
  input.addEventListener('input', () => {
    const q   = input.value.toLowerCase();
    const sec = document.querySelector('[data-section].active')?.dataset.section || 'all';
    const tag = document.querySelector('[data-tag].active')?.dataset.tag || 'all';
    renderCards(articles.filter(a =>
      (sec === 'all' || a.section === sec) &&
      (tag === 'all' || a.tag === tag) &&
      (!q || matchQuery(a, q))
    ), document.getElementById('articlesGrid'), document.getElementById('emptyState'));
  });
}

/* ─── RENDER CARDS ─── */
function renderCards(articles, grid, emptyEl) {
  grid.querySelectorAll('.article-card').forEach(c => c.remove());
  if (!articles.length) { if(emptyEl) emptyEl.style.display = 'block'; return; }
  if(emptyEl) emptyEl.style.display = 'none';
  articles.forEach((a, i) => {
    const card = document.createElement('a');
    card.className = 'article-card';
    card.href = a.path;
    card.style.animationDelay = `${i * 0.05}s`;
    const dateStr = a.date
      ? new Date(a.date).toLocaleDateString('ar-IQ', { year:'numeric', month:'long', day:'numeric' })
      : '';
    card.innerHTML = `
      <div class="card-top">
        <span class="card-tag">${a.tag}</span>
        <span class="card-section-badge">${SECTIONS[a.section].name}</span>
      </div>
      <h3 class="card-title">${a.title}</h3>
      ${a.description ? `<p class="card-desc">${a.description}</p>` : ''}
      <div class="card-footer">
        <div class="card-footer-left">
          ${authorChipHtml(a)}
          ${dateStr ? `<span class="card-date">${dateStr}</span>` : ''}
        </div>
        <span class="card-arrow">←</span>
      </div>`;
    grid.appendChild(card);
  });
}

/* ─── COPY BUTTONS ─── */
function initCopyButtons() {
  document.querySelectorAll('.article-content pre').forEach(pre => {
    if (pre.querySelector('.copy-btn')) return;
    const btn = document.createElement('button');
    btn.className = 'copy-btn'; btn.textContent = 'نسخ';
    pre.style.position = 'relative';
    pre.appendChild(btn);
    btn.addEventListener('click', () => {
      const code = pre.querySelector('code')?.textContent || pre.textContent.replace('نسخ','');
      navigator.clipboard.writeText(code.trim()).then(() => {
        btn.textContent = 'تم ✓'; btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'نسخ'; btn.classList.remove('copied'); }, 2000);
      });
    });
  });
}

/* ─── MOBILE NAV ─── */
function initMobileNav() {
  const toggle = document.getElementById('menuToggle');
  const nav    = document.getElementById('mobileNav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !nav.contains(e.target)) nav.classList.remove('open');
  });
}

/* ─── SCROLL ANIMATIONS ─── */
function initScrollAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.feature-item, .about-text, .section-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(el);
  });
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initCopyButtons();
  initScrollAnimations();
  initReadingProgress();
  injectAuthorIntoPage();
  if (document.getElementById('articlesGrid')) {
    SECTION_ID === 'all' ? loadHome() : loadSection(SECTION_ID);
  }
});

/* ─── GLOBAL SEARCH ─── */
async function initGlobalSearch() {
  const btn      = document.getElementById('navSearchBtn');
  const overlay  = document.getElementById('searchOverlay');
  const closeBtn = document.getElementById('searchClose');
  const input    = document.getElementById('globalSearchInput');
  const results  = document.getElementById('globalSearchResults');
  if (!btn || !overlay) return;

  let allArticles = null;
  async function getArticles() {
    if (allArticles) return allArticles;
    const depth   = window.BACK_DEPTH || '';
    const entries = await Promise.all(ALL_ARTICLES.map(fetchMeta));
    allArticles   = entries.filter(Boolean).map(a => ({
      ...a, path: depth + SECTIONS[a.section].basePath + a.file
    }));
    return allArticles;
  }

  const openSearch = () => { overlay.classList.add('open'); setTimeout(() => input.focus(), 50); };
  const closeSearch = () => {
    overlay.classList.remove('open');
    input.value = '';
    results.innerHTML = '<p class="search-hint">اكتب للبحث في جميع المقالات...</p>';
  };

  btn.addEventListener('click', openSearch);
  closeBtn.addEventListener('click', closeSearch);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeSearch(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  input.addEventListener('input', async () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { results.innerHTML = '<p class="search-hint">اكتب للبحث في جميع المقالات...</p>'; return; }
    const articles = await getArticles();
    const found = articles.filter(a => matchQuery(a, q));
    if (!found.length) {
      results.innerHTML = `<p class="search-no-results">لا توجد نتائج لـ «${input.value}»</p>`;
      return;
    }
    results.innerHTML = found.map(a => {
      const avatar = getAvatarUrl(a);
      const authorHtml = a.author
        ? `<div class="search-result-author">${avatar ? `<img src="${avatar}" alt="${a.author}" class="search-result-avatar" loading="lazy">` : ''}<span>${a.author}</span></div>`
        : '';
      return `<a class="search-result-item" href="${a.path}">
        <div class="search-result-title">${a.title}</div>
        ${a.description ? `<div class="search-result-desc">${a.description}</div>` : ''}
        <div class="search-result-meta">
          <span class="search-result-tag">${a.tag}</span>
          <span style="font-size:0.72rem;color:var(--text-muted);">${SECTIONS[a.section].name}</span>
          ${authorHtml}
        </div>
      </a>`;
    }).join('');
  });
}

document.addEventListener('DOMContentLoaded', () => { initGlobalSearch(); });

/* ─── PAGE TITLE ─── */
(function () {
  const path = window.location.pathname;
  if (path.endsWith('index.html') && !path.includes('/articles/') && !path.includes('/tools/') && !path.includes('/distros/') && !path.includes('/desktop/')) {
    document.title = 'شخبطه | الرئيسية'; return;
  }
  const map = {
    '/articles/index.html': 'شخبطه | Hyprland',
    '/tools/index.html':    'شخبطه | أدوات',
    '/distros/index.html':  'شخبطه | التوزيعات',
    '/desktop/index.html':  'شخبطه | واجهات',
  };
  for (const [k, v] of Object.entries(map)) { if (path.endsWith(k)) { document.title = v; return; } }
  const h1 = document.querySelector('.article-page-title');
  if (h1) { const t = h1.textContent.trim().replace(/^\S+\s/, ''); if (t) document.title = 'شخبطه | ' + t; }
})();
