'use strict';
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-menu');
function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  mobileNav.classList.toggle('open', open);
  mobileNav.setAttribute('aria-hidden', String(!open));
  mobileNav.querySelectorAll('a').forEach(a => { a.tabIndex = open ? 0 : -1; });
  document.body.style.overflow = open ? 'hidden' : '';
}
setMenu(false);
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
});
// This is the public Formspree endpoint. It is not a private API credential.
const form = document.getElementById('inquiry-form');
const status = document.getElementById('form-status');
const button = document.getElementById('submit-btn');
const endpoint = form.dataset.formEndpoint || form.action;
const configured = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(endpoint);

function showStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle('error', isError);
}

form.addEventListener('submit', async (event) => {
  if (!configured) return; // Standard HTML fallback when integration is absent.
  event.preventDefault();
  if (button.disabled) return; // Prevent duplicate submissions.
  showStatus('');
  if (!form.reportValidity()) return;

  // A hidden honeypot is an additional spam filter; Formspree also filters it server-side.
  if (form.elements._gotcha.value.trim()) {
    showStatus('Your inquiry has been received.');
    return;
  }

  const data = new FormData(form);
  const researchArea = data.get('research_area') || 'General research discussion';
  data.set('_subject', `Bioinformatics consulting inquiry — ${researchArea}`);
  button.disabled = true;
  button.textContent = 'Sending…';
  form.setAttribute('aria-busy', 'true');
  showStatus('Sending your inquiry…');

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    });

    let result = null;
    try { result = await response.json(); } catch (_) { /* Response may not be JSON. */ }

    if (response.ok) {
      form.reset();
      showStatus('Your inquiry was submitted successfully. Thank you — I will review it and respond by email.');
      return;
    }

    if (response.status === 429) {
      showStatus('Too many submissions have been made recently. Please wait and try again, or email directly.', true);
      return;
    }

    // Formspree may return a validation error list. Never use innerHTML with remote messages.
    const errors = Array.isArray(result?.errors) ? result.errors : [];
    const detail = errors
      .map(item => typeof item?.message === 'string' ? item.message : '')
      .filter(Boolean).join(' ');
    if (response.status === 400 || response.status === 422) {
      showStatus(detail || 'Please review the form fields and try again.', true);
    } else {
      showStatus('Formspree could not accept your message right now. Please try again or use the direct email link.', true);
    }
  } catch (_) {
    showStatus('The connection failed. Please try again or use the direct email link.', true);
  } finally {
    button.disabled = false;
    button.textContent = 'Send inquiry ↗';
    form.removeAttribute('aria-busy');
  }
});
