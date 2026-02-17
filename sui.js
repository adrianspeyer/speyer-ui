/*!
 * Speyer UI System (SUI) — Interactive Toolkit
 * Version: 2.4.1
 * https://github.com/adrianspeyer/speyer-ui
 *
 * Lightweight, dependency-free behaviors for SUI components.
 * CSS handles appearance; this adds interactivity.
 *
 * Usage:
 *   <script src="sui.js"></script>
 *   — Auto-initializes via data-sui-* attributes
 *   — Or call SUI.modal.open('#id'), SUI.toast.success('msg'), etc.
 *
 * Made in Canada with love ðŸ‡¨ðŸ‡¦
 * License: MIT
 */

const SUI = (() => {
  'use strict';

  /* ====================================================================
     Helpers
     ==================================================================== */

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function uid() {
    return 'sui-' + Math.random().toString(36).slice(2, 9);
  }

  /* ====================================================================
     Theme
     ==================================================================== */

  const theme = {
    KEY: 'sui-theme',

    current() {
      return localStorage.getItem(this.KEY) || 'auto';
    },

    set(mode) {
      const root = document.documentElement;
      if (mode === 'dark') root.setAttribute('data-theme', 'dark');
      else if (mode === 'light') root.setAttribute('data-theme', 'light');
      else root.removeAttribute('data-theme');
      localStorage.setItem(this.KEY, mode);
    },

    toggle() {
      // Detect what the user actually sees and flip it
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
        (!document.documentElement.hasAttribute('data-theme') &&
         window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.set(isDark ? 'light' : 'dark');
      return this.current();
    },

    init() {
      this.set(this.current());
    }
  };

  /* ====================================================================
     Tabs
     ==================================================================== */

  const tabs = {
    init(navEl) {
      const tabBtns = $$('.sui-tab', navEl);
      if (!tabBtns.length) return;

      // Determine scope: if inside a [data-sui-tabs] wrapper, scope panels to that wrapper
      const scope = navEl.closest('[data-sui-tabs]') || document;

      // Enforce ARIA roles — tablist on nav, tab on buttons
      if (!navEl.hasAttribute('role')) navEl.setAttribute('role', 'tablist');
      tabBtns.forEach(t => {
        if (!t.hasAttribute('role')) t.setAttribute('role', 'tab');
        // Ensure accessible name exists (fallback to data-tab)
        if (!t.hasAttribute('aria-label') && !t.textContent.trim()) {
          t.setAttribute('aria-label', t.getAttribute('data-tab'));
        }
      });
      // Enforce tabpanel role on associated sections within scope
      $$('[data-view]', scope).forEach(v => {
        if (!v.hasAttribute('role')) v.setAttribute('role', 'tabpanel');
      });

      const setView = (key) => {
        $$('[data-view]', scope).forEach(v =>
          v.classList.toggle('is-active', v.getAttribute('data-view') === key)
        );
        tabBtns.forEach(t => {
          const isActive = t.getAttribute('data-tab') === key;
          t.setAttribute('aria-selected', isActive ? 'true' : 'false');
          t.setAttribute('tabindex', isActive ? '0' : '-1');
        });
        // Only scroll to top for unscoped (global) tabs
        if (scope === document) window.scrollTo({ top: 0, behavior: 'instant' });
      };

      tabBtns.forEach(t => t.addEventListener('click', () => setView(t.getAttribute('data-tab'))));

      // Keyboard nav
      navEl.addEventListener('keydown', e => {
        const arr = tabBtns;
        const idx = arr.indexOf(document.activeElement);
        if (idx < 0) return;
        if (e.key === 'ArrowRight') { e.preventDefault(); const next = arr[(idx + 1) % arr.length]; next.focus(); next.click(); }
        if (e.key === 'ArrowLeft')  { e.preventDefault(); const prev = arr[(idx - 1 + arr.length) % arr.length]; prev.focus(); prev.click(); }
      });

      // Set initial view
      const active = tabBtns.find(t => t.getAttribute('aria-selected') === 'true') || tabBtns[0];
      setView(active.getAttribute('data-tab'));
    }
  };

  /* ====================================================================
     Accordion
     ==================================================================== */

  const accordion = {
    init(container) {
      $$('.sui-accordion-trigger', container).forEach(trigger => {
        const panel = trigger.nextElementSibling;
        if (!panel) return;

        // Set initial state
        if (trigger.getAttribute('aria-expanded') !== 'true') {
          panel.hidden = true;
          trigger.setAttribute('aria-expanded', 'false');
        }

        trigger.addEventListener('click', () => {
          const expanded = trigger.getAttribute('aria-expanded') === 'true';
          trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          panel.hidden = expanded;
        });

        trigger.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger.click(); }
        });
      });
    }
  };

  /* ====================================================================
     Dropdown
     ==================================================================== */

  const dropdown = {
    _active: null,

    init(el) {
      const trigger = el.querySelector('[data-sui-dropdown-trigger]') || el.querySelector('.sui-btn');
      const menu = el.querySelector('.sui-dropdown-menu');
      if (!trigger || !menu) return;

      // Enforce ARIA roles
      trigger.setAttribute('aria-haspopup', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      if (!menu.hasAttribute('role')) menu.setAttribute('role', 'menu');
      $$('.sui-dropdown-item', menu).forEach(item => {
        if (!item.hasAttribute('role')) item.setAttribute('role', 'menuitem');
      });

      trigger.addEventListener('click', e => {
        e.stopPropagation();
        this.toggle(el);
      });

      // Arrow key navigation within menu
      menu.addEventListener('keydown', e => {
        const items = $$('.sui-dropdown-item', menu);
        const idx = items.indexOf(document.activeElement);
        if (e.key === 'ArrowDown') { e.preventDefault(); items[(idx + 1) % items.length]?.focus(); }
        if (e.key === 'ArrowUp')   { e.preventDefault(); items[(idx - 1 + items.length) % items.length]?.focus(); }
        if (e.key === 'Escape')    { this.close(el); trigger.focus(); }
      });
    },

    open(el) {
      if (typeof el === 'string') el = $(el);
      if (this._active && this._active !== el) this.close(this._active);
      el.classList.add('is-open');
      this._active = el;
      const trigger = el.querySelector('[data-sui-dropdown-trigger]') || el.querySelector('.sui-btn');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
      // Focus first item
      const first = el.querySelector('.sui-dropdown-item');
      if (first) setTimeout(() => first.focus(), 50);
    },

    close(el) {
      if (typeof el === 'string') el = $(el);
      if (!el) return;
      el.classList.remove('is-open');
      const trigger = el.querySelector('[data-sui-dropdown-trigger]') || el.querySelector('.sui-btn');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (this._active === el) this._active = null;
    },

    toggle(el) {
      if (typeof el === 'string') el = $(el);
      el.classList.contains('is-open') ? this.close(el) : this.open(el);
    }
  };

  // Close dropdown on outside click
  document.addEventListener('click', () => {
    if (dropdown._active) dropdown.close(dropdown._active);
  });

  /* ====================================================================
     Modal
     ==================================================================== */

  const modal = {
    _stack: [],
    _previousFocus: null,

    open(selector) {
      const el = typeof selector === 'string' ? $(selector) : selector;
      if (!el) return;

      this._previousFocus = document.activeElement;

      // Native <dialog> path — browser handles focus trap, scroll lock, Escape
      if (el.tagName === 'DIALOG') {
        el.showModal();
        // Close on backdrop click
        el.addEventListener('click', el._suiBackdrop = (e) => {
          if (e.target === el) this.close(el);
        });
        this._stack.push(el);
        return;
      }

      // Legacy overlay path (deprecated — will be removed in v3.0)
      el.classList.add('is-open');
      el.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      // Focus trap
      const focusable = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', el);
      if (focusable.length) focusable[0].focus();

      const trapFocus = (e) => {
        if (e.key === 'Tab') {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
          } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
          }
        }
        if (e.key === 'Escape') this.close(el);
      };

      el._suiTrap = trapFocus;
      el.addEventListener('keydown', trapFocus);
      this._stack.push(el);
    },

    close(selector) {
      const el = typeof selector === 'string' ? $(selector) : selector;
      if (!el) return;

      // Native <dialog> path
      if (el.tagName === 'DIALOG') {
        el.close();
        if (el._suiBackdrop) {
          el.removeEventListener('click', el._suiBackdrop);
          delete el._suiBackdrop;
        }
        this._stack = this._stack.filter(m => m !== el);
        if (this._previousFocus) this._previousFocus.focus();
        return;
      }

      // Legacy overlay path
      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');

      if (el._suiTrap) {
        el.removeEventListener('keydown', el._suiTrap);
        delete el._suiTrap;
      }

      this._stack = this._stack.filter(m => m !== el);
      if (this._stack.length === 0) document.body.style.overflow = '';
      if (this._previousFocus) this._previousFocus.focus();
    }
  };

  /* ====================================================================
     Toast
     ==================================================================== */

  const toast = {
    _container: null,

    _ensureContainer() {
      if (!this._container) {
        this._container = document.createElement('div');
        this._container.className = 'sui-toast-container';
        this._container.setAttribute('aria-live', 'polite');
        this._container.setAttribute('aria-label', 'Notifications');
        document.body.appendChild(this._container);
      }
      return this._container;
    },

    /**
     * Show a toast notification
     * @param {Object} opts
     * @param {string} opts.title - Toast title
     * @param {string} [opts.message] - Optional description
     * @param {string} [opts.type] - success|warning|error|info
     * @param {number} [opts.duration] - Auto-dismiss ms (default 4000, 0 = manual)
     */
    show({ title, message = '', type = 'info', duration = 4000 }) {
      const container = this._ensureContainer();

      const icons = {
        success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
        warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        error:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        info:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
      };

      const el = document.createElement('div');
      el.className = `sui-toast sui-toast-${type}`;
      el.setAttribute('role', 'alert');
      el.innerHTML = `
        <span class="sui-toast-icon">${icons[type] || icons.info}</span>
        <div class="sui-toast-content">
          <div class="sui-toast-title">${title}</div>
          ${message ? `<div class="sui-toast-message">${message}</div>` : ''}
        </div>
        <button class="sui-toast-close" aria-label="Dismiss">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      `;

      el.querySelector('.sui-toast-close').addEventListener('click', () => this._dismiss(el));
      container.appendChild(el);

      // Pause auto-dismiss on hover
      let timer;
      const startTimer = () => {
        if (duration > 0) timer = setTimeout(() => this._dismiss(el), duration);
      };
      el.addEventListener('mouseenter', () => clearTimeout(timer));
      el.addEventListener('mouseleave', startTimer);
      startTimer();

      return el;
    },

    _dismiss(el) {
      el.classList.add('is-exiting');
      el.addEventListener('animationend', () => el.remove(), { once: true });
    },

    // Convenience methods
    success(title, message) { return this.show({ title, message, type: 'success' }); },
    warning(title, message) { return this.show({ title, message, type: 'warning' }); },
    error(title, message)   { return this.show({ title, message, type: 'error' }); },
    info(title, message)    { return this.show({ title, message, type: 'info' }); }
  };

  /* ====================================================================
     Tooltip (smart positioning)
     ==================================================================== */

  const tooltip = {
    init(el) {
      const content = el.querySelector('.sui-tooltip-content');
      if (!content) return;

      const reposition = () => {
        const rect = el.getBoundingClientRect();
        const tip = content.getBoundingClientRect();

        // Reset classes
        el.classList.remove('sui-tooltip-bottom');

        // If tooltip would overflow top, flip to bottom
        if (rect.top - tip.height - 12 < 0) {
          el.classList.add('sui-tooltip-bottom');
        }

        // If tooltip overflows right, shift left
        const halfTip = tip.width / 2;
        const centerX = rect.left + rect.width / 2;
        if (centerX + halfTip > window.innerWidth - 8) {
          content.style.left = 'auto';
          content.style.right = '0';
          content.style.transform = 'none';
        } else if (centerX - halfTip < 8) {
          content.style.left = '0';
          content.style.right = 'auto';
          content.style.transform = 'none';
        } else {
          content.style.left = '50%';
          content.style.right = 'auto';
          content.style.transform = 'translateX(-50%)';
        }
      };

      el.addEventListener('mouseenter', reposition);
      el.addEventListener('focusin', reposition);

      // Escape key dismisses tooltip when focused
      el.addEventListener('keydown', e => {
        if (e.key === 'Escape') el.blur();
      });
    }
  };

  /* ====================================================================
     Avatar (deterministic color from initials)
     ==================================================================== */

  const avatar = {
    // SUI-safe palette — all meet 3:1 contrast on white text
    COLORS: [
      '#2563EB', // blue    (5.17:1 on white)
      '#15803D', // green   (5.02:1)
      '#B45309', // amber   (5.02:1)
      '#B91C1C', // red     (6.47:1)
      '#0E7490', // cyan    (5.36:1)
      '#7C3AED', // violet  (5.70:1)
      '#DB2777', // pink    (4.60:1)
      '#0F766E', // teal    (5.47:1)
      '#C2410C', // orange  (5.18:1)
      '#4F46E5'  // indigo  (6.29:1)
    ],

    colorFor(text) {
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
      }
      return this.COLORS[Math.abs(hash) % this.COLORS.length];
    },

    init(el) {
      const initials = el.textContent.trim();
      if (initials && !el.style.background) {
        el.style.background = this.colorFor(initials);
      }
    }
  };

  /* ====================================================================
     Clipboard
     ==================================================================== */

  const copy = {
    async text(str) {
      try {
        await navigator.clipboard.writeText(str);
        return true;
      } catch {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = str;
        ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px';
        document.body.appendChild(ta);
        ta.select();
        let ok = false;
        try { ok = document.execCommand('copy'); } catch {}
        document.body.removeChild(ta);
        return ok;
      }
    },

    async fromElement(selector) {
      const el = typeof selector === 'string' ? $(selector) : selector;
      if (!el) return false;
      return this.text(el.innerText || el.textContent);
    }
  };

  /* ====================================================================
     Bottom Sheet
     ==================================================================== */

  const sheet = {
    _active: null,
    _previousFocus: null,

    open(selector) {
      const el = typeof selector === 'string' ? $(selector) : selector;
      if (!el) return;

      this._previousFocus = document.activeElement;
      el.classList.add('is-open');
      el.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      this._active = el;

      // Focus first focusable element in panel
      const panel = el.querySelector('.sui-sheet-panel');
      if (panel) {
        const focusable = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', panel);
        if (focusable.length) setTimeout(() => focusable[0].focus(), 50);
      }

      // Keyboard handler: Escape + focus trap
      el._suiKeyHandler = (e) => {
        if (e.key === 'Escape') { this.close(el); return; }
        if (e.key === 'Tab' && panel) {
          const focusable = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', panel);
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
          } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
          }
        }
      };
      el.addEventListener('keydown', el._suiKeyHandler);
    },

    close(selector) {
      const el = typeof selector === 'string' ? $(selector) : selector;
      if (!el) return;

      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (el._suiKeyHandler) {
        el.removeEventListener('keydown', el._suiKeyHandler);
        delete el._suiKeyHandler;
      }

      if (this._active === el) this._active = null;
      if (this._previousFocus) this._previousFocus.focus();
    },

    toggle(selector) {
      const el = typeof selector === 'string' ? $(selector) : selector;
      if (!el) return;
      el.classList.contains('is-open') ? this.close(el) : this.open(el);
    }
  };

  /* ====================================================================
     Segmented Control
     ==================================================================== */

  const segmented = {
    init(container) {
      const segments = $$('.sui-segment', container);
      if (!segments.length) return;

      // Enforce ARIA roles
      if (!container.hasAttribute('role')) container.setAttribute('role', 'radiogroup');
      segments.forEach(seg => {
        if (!seg.hasAttribute('role')) seg.setAttribute('role', 'radio');
        if (!seg.hasAttribute('tabindex')) {
          seg.setAttribute('tabindex', seg.getAttribute('aria-checked') === 'true' ? '0' : '-1');
        }
      });

      const select = (target) => {
        segments.forEach(s => {
          s.setAttribute('aria-checked', 'false');
          s.setAttribute('tabindex', '-1');
        });
        target.setAttribute('aria-checked', 'true');
        target.setAttribute('tabindex', '0');
        target.focus();
      };

      segments.forEach(seg => seg.addEventListener('click', () => select(seg)));

      // Arrow key navigation
      container.addEventListener('keydown', e => {
        const idx = segments.indexOf(document.activeElement);
        if (idx < 0) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          select(segments[(idx + 1) % segments.length]);
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          select(segments[(idx - 1 + segments.length) % segments.length]);
        }
      });
    }
  };

  /* ====================================================================
     Sidenav — Responsive section navigation
     ==================================================================== */

  const sidenav = {
    _active: null,
    _previousFocus: null,
    _mediaQuery: window.matchMedia('(min-width: 769px)'),

    open(selector) {
      const el = typeof selector === 'string' ? $(selector) : selector;
      if (!el) return;

      // Desktop: sidenav is always visible, no overlay
      if (this._mediaQuery.matches) return;

      this._previousFocus = document.activeElement;
      el.classList.add('is-open');
      el.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      this._active = el;

      // Focus first link in panel
      const panel = el.querySelector('.sui-sidenav-panel');
      if (panel) {
        const focusable = $$('a[href], button, [tabindex]:not([tabindex="-1"])', panel);
        if (focusable.length) setTimeout(() => focusable[0].focus(), 50);
      }

      // Keyboard: Escape + focus trap
      el._suiKeyHandler = (e) => {
        if (e.key === 'Escape') { this.close(el); return; }
        if (e.key === 'Tab' && panel) {
          const focusable = $$('a[href], button, [tabindex]:not([tabindex="-1"])', panel);
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
          } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
          }
        }
      };
      el.addEventListener('keydown', el._suiKeyHandler);
    },

    close(selector) {
      const el = typeof selector === 'string' ? $(selector) : selector;
      if (!el) return;

      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      if (el._suiKeyHandler) {
        el.removeEventListener('keydown', el._suiKeyHandler);
        delete el._suiKeyHandler;
      }

      if (this._active === el) this._active = null;
      if (this._previousFocus) this._previousFocus.focus();
    },

    toggle(selector) {
      const el = typeof selector === 'string' ? $(selector) : selector;
      if (!el) return;
      el.classList.contains('is-open') ? this.close(el) : this.open(el);
    },

    /** Collapse all sidenav groups within a container */
    collapseAll(navSelector) {
      const ctx = typeof navSelector === 'string' ? $(navSelector) : navSelector || document;
      if (!ctx) return;
      $$('.sui-sidenav-group-toggle', ctx).forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        const id = btn.getAttribute('aria-controls');
        if (id) { const target = document.getElementById(id); if (target) target.hidden = true; }
      });
    },

    /** Expand all sidenav groups within a container */
    expandAll(navSelector) {
      const ctx = typeof navSelector === 'string' ? $(navSelector) : navSelector || document;
      if (!ctx) return;
      $$('.sui-sidenav-group-toggle', ctx).forEach(btn => {
        btn.setAttribute('aria-expanded', 'true');
        const id = btn.getAttribute('aria-controls');
        if (id) { const target = document.getElementById(id); if (target) target.hidden = false; }
      });
    }
  };

  /* ====================================================================
     Panel — Side panel / slide-over
     Desktop: focus moves, no trap (both regions interactive).
     Mobile: focus trap (panel is full-screen blocking overlay).
     ==================================================================== */

  const panel = {
    _active: null,
    _previousFocus: null,
    _mediaQuery: window.matchMedia('(min-width: 769px)'),

    open(selector) {
      const el = typeof selector === 'string' ? $(selector) : selector;
      if (!el) return;

      this._previousFocus = document.activeElement;
      el.classList.add('is-open');
      el.setAttribute('aria-hidden', 'false');
      this._active = el;

      // Update trigger aria-expanded
      $$(`[data-sui-panel="${selector}"]`).forEach(t => t.setAttribute('aria-expanded', 'true'));

      // Mobile: lock body scroll (full-screen blocking)
      if (!this._mediaQuery.matches) document.body.style.overflow = 'hidden';

      // Focus first focusable element inside panel
      const focusable = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', el);
      if (focusable.length) setTimeout(() => focusable[0].focus(), 50);

      // Document-level Escape handler — works even when focus is in main content
      el._suiDocKeyHandler = (e) => {
        if (e.key === 'Escape') this.close(el);
      };
      document.addEventListener('keydown', el._suiDocKeyHandler);

      // Focus trap only on mobile (panel element listener)
      el._suiKeyHandler = (e) => {
        if (e.key === 'Tab' && !this._mediaQuery.matches) {
          const focusable = $$('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])', el);
          if (!focusable.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey) {
            if (document.activeElement === first) { e.preventDefault(); last.focus(); }
          } else {
            if (document.activeElement === last) { e.preventDefault(); first.focus(); }
          }
        }
      };
      el.addEventListener('keydown', el._suiKeyHandler);

      // Breakpoint change while open: toggle trap + body scroll
      el._suiMqHandler = (mq) => {
        if (mq.matches) {
          document.body.style.overflow = '';
        } else {
          document.body.style.overflow = 'hidden';
        }
      };
      this._mediaQuery.addEventListener('change', el._suiMqHandler);
    },

    close(selector) {
      const el = typeof selector === 'string' ? $(selector) : selector;
      if (!el) return;

      el.classList.remove('is-open');
      el.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';

      // Update trigger aria-expanded
      const id = el.id ? `#${el.id}` : null;
      if (id) $$(`[data-sui-panel="${id}"]`).forEach(t => t.setAttribute('aria-expanded', 'false'));

      if (el._suiDocKeyHandler) {
        document.removeEventListener('keydown', el._suiDocKeyHandler);
        delete el._suiDocKeyHandler;
      }
      if (el._suiKeyHandler) {
        el.removeEventListener('keydown', el._suiKeyHandler);
        delete el._suiKeyHandler;
      }
      if (el._suiMqHandler) {
        this._mediaQuery.removeEventListener('change', el._suiMqHandler);
        delete el._suiMqHandler;
      }

      if (this._active === el) this._active = null;
      if (this._previousFocus) this._previousFocus.focus();
    },

    toggle(selector) {
      const el = typeof selector === 'string' ? $(selector) : selector;
      if (!el) return;
      el.classList.contains('is-open') ? this.close(el) : this.open(el);
    }
  };

  /* ====================================================================
     Auto-init: scan for data-sui-* attributes
     ==================================================================== */

  function init() {
    // Theme
    theme.init();

    // Tabs
    $$('.sui-nav[aria-label]').forEach(nav => tabs.init(nav));

    // Theme toggle buttons
    $$('[data-sui-theme]').forEach(btn => {
      btn.addEventListener('click', () => {
        theme.toggle();
      });
    });

    // Accordions
    $$('.sui-accordion').forEach(el => accordion.init(el));

    // Dropdowns
    $$('.sui-dropdown').forEach(el => dropdown.init(el));

    // Modals — open triggers (works with both <dialog> and legacy overlay)
    $$('[data-sui-modal]').forEach(btn => {
      btn.addEventListener('click', () => modal.open(btn.getAttribute('data-sui-modal')));
    });

    // Modal close buttons (works with both patterns)
    $$('.sui-modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const dialog = btn.closest('dialog.sui-dialog');
        if (dialog) { modal.close(dialog); return; }
        const overlay = btn.closest('.sui-modal-overlay');
        if (overlay) modal.close(overlay);
      });
    });

    // Legacy modal overlay click-to-close
    $$('.sui-modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) modal.close(overlay);
      });
    });

    // Tooltips
    $$('.sui-tooltip').forEach(el => tooltip.init(el));

    // Avatars — apply deterministic colors
    $$('.sui-avatar').forEach(el => avatar.init(el));

    // Copy buttons
    $$('[data-sui-copy]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const target = btn.getAttribute('data-sui-copy');
        const ok = await copy.fromElement(target);
        if (ok) {
          // Change only the text node — leave icon elements untouched
          const textNode = [...btn.childNodes].find(n => n.nodeType === Node.TEXT_NODE && /copy/i.test(n.textContent));
          if (textNode) {
            const original = textNode.textContent;
            textNode.textContent = original.replace(/Copy/i, 'Copied!');
            setTimeout(() => { textNode.textContent = original; }, 1600);
          }
        }
      });
    });

    // Navigation toggle (mobile hamburger)
    $$('[data-sui-nav-toggle]').forEach(btn => {
      const navSelector = btn.getAttribute('data-sui-nav-toggle');
      const nav = $(navSelector);
      if (!nav) return;

      // ARIA safety net
      if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');
      if (!btn.hasAttribute('aria-label')) btn.setAttribute('aria-label', 'Menu');
      if (nav.id && !btn.hasAttribute('aria-controls')) {
        btn.setAttribute('aria-controls', nav.id);
      }
      if (!nav.closest('nav') && nav.getAttribute('role') !== 'navigation') {
        nav.setAttribute('role', 'navigation');
      }
      if (!nav.hasAttribute('aria-label') && !nav.closest('nav[aria-label]')) {
        nav.setAttribute('aria-label', 'Primary navigation');
      }

      btn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(isOpen));
      });

      // Escape key closes open nav
      nav.addEventListener('keydown', e => {
        if (e.key === 'Escape' && nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          btn.setAttribute('aria-expanded', 'false');
          btn.focus();
        }
      });
    });

    // Navigation containers: ensure landmark role
    $$('.sui-nav').forEach(nav => {
      if (!nav.closest('nav') && nav.getAttribute('role') !== 'navigation') {
        nav.setAttribute('role', 'navigation');
      }
    });

    // Badge overlay: ARIA safety net
    $$('.sui-badge-overlay').forEach(overlay => {
      const count = overlay.querySelector('.sui-badge-count');
      const trigger = overlay.querySelector('button, a, [role="button"]');
      if (count && !count.hasAttribute('aria-hidden')) {
        count.setAttribute('aria-hidden', 'true');
      }
      if (count && trigger && !trigger.hasAttribute('aria-label')) {
        console.warn(
          'SUI: .sui-badge-overlay trigger is missing aria-label.',
          'Add aria-label describing the count (e.g., "Notifications, 3 unread").',
          trigger
        );
      }
    });

    // Radio buttons: label association check
    $$('.sui-radio').forEach(radio => {
      const label = radio.closest('label') || (radio.id && $(`label[for="${radio.id}"]`));
      if (!label) {
        console.warn(
          'SUI: .sui-radio is not associated with a <label>.',
          'Wrap in <label class="sui-radio-label"> or use for/id.',
          radio
        );
      }
    });

    // Bottom sheet triggers
    $$('[data-sui-sheet]').forEach(btn => {
      btn.addEventListener('click', () => sheet.open(btn.getAttribute('data-sui-sheet')));
    });

    // Bottom sheet close buttons
    $$('.sui-sheet-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const s = btn.closest('.sui-sheet');
        if (s) sheet.close(s);
      });
    });

    // Bottom sheet backdrop click-to-close
    $$('.sui-sheet').forEach(el => {
      el.addEventListener('click', e => {
        if (e.target === el) sheet.close(el);
      });
      // Set initial ARIA
      if (!el.hasAttribute('aria-hidden')) el.setAttribute('aria-hidden', 'true');
    });

    // Segmented controls
    $$('.sui-segmented').forEach(el => segmented.init(el));

    // Sidenav triggers
    $$('[data-sui-sidenav]').forEach(btn => {
      btn.addEventListener('click', () => sidenav.open(btn.getAttribute('data-sui-sidenav')));
    });

    // Sidenav close buttons
    $$('.sui-sidenav-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const nav = btn.closest('.sui-sidenav');
        if (nav) sidenav.close(nav);
      });
    });

    // Sidenav: set aria-hidden based on viewport
    $$('.sui-sidenav').forEach(el => {
      el.addEventListener('click', e => {
        if (e.target === el) sidenav.close(el);
      });
      // Desktop: always visible, remove aria-hidden
      const updateAria = () => {
        if (sidenav._mediaQuery.matches) {
          el.setAttribute('aria-hidden', 'false');
        } else if (!el.classList.contains('is-open')) {
          el.setAttribute('aria-hidden', 'true');
        }
      };
      updateAria();
      sidenav._mediaQuery.addEventListener('change', updateAria);
    });

    // Sidenav links: close on mobile after click, smooth scroll
    $$('.sui-sidenav-link').forEach(link => {
      link.addEventListener('click', () => {
        const nav = link.closest('.sui-sidenav');
        if (nav && !sidenav._mediaQuery.matches) {
          sidenav.close(nav);
        }
      });
    });

    // Sidenav group toggles — expand/collapse
    $$('.sui-sidenav-group-toggle').forEach(btn => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        const id = btn.getAttribute('aria-controls');
        if (id) { const target = document.getElementById(id); if (target) target.hidden = expanded; }
      });
    });

    // Panel triggers
    $$('[data-sui-panel]').forEach(btn => {
      btn.addEventListener('click', () => panel.toggle(btn.getAttribute('data-sui-panel')));
    });

    // Panel close buttons
    $$('.sui-panel-close').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = btn.closest('.sui-panel');
        if (p) panel.close(p);
      });
    });

    // Panel backdrop click-to-close + initial ARIA
    $$('.sui-panel').forEach(el => {
      el.addEventListener('click', e => {
        // Close on backdrop click (not if no-backdrop modifier)
        if (e.target === el && !el.classList.contains('sui-panel-no-backdrop')) panel.close(el);
      });
      if (!el.hasAttribute('aria-hidden')) el.setAttribute('aria-hidden', 'true');
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* ====================================================================
     Public API
     ==================================================================== */

  return {
    theme,
    tabs,
    accordion,
    dropdown,
    modal,
    toast,
    tooltip,
    avatar,
    copy,
    sheet,
    segmented,
    sidenav,
    panel,
    init
  };
})();
