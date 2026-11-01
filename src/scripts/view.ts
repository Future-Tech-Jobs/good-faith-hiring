// The homepage's only JavaScript: the view toggle and copy-link buttons.
// The page reads fully without it. The chosen view lives in the URL hash
// (#hiring, #applying), not in storage, so links can open a view directly.

type View = 'both' | 'emp' | 'cand';
const HASH: Record<View, string> = { both: '', emp: '#hiring', cand: '#applying' };
const LABEL: Record<View, string> = {
  both: 'Showing commitments for employers and candidates',
  emp: 'Showing commitments for employers',
  cand: 'Showing commitments for candidates',
};

const section = document.getElementById('standard');
const status = document.getElementById('view-status');
const group = section?.querySelector<HTMLElement>('.view');

if (section && group) {
  const buttons = Array.from(group.querySelectorAll<HTMLButtonElement>('button[data-view]'));

  const set = (view: View, announce: boolean) => {
    section.dataset.view = view;
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.view === view)));
    if (announce && status) status.textContent = LABEL[view];
  };

  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      const view = b.dataset.view as View;
      set(view, true);
      history.replaceState(null, '', location.pathname + (HASH[view] || '#standard'));
    }),
  );

  const fromHash = () => {
    if (location.hash === '#hiring') return 'emp';
    if (location.hash === '#applying') return 'cand';
    return null;
  };

  const initial = fromHash();
  if (initial) {
    set(initial, false);
    section.scrollIntoView();
  }
  window.addEventListener('hashchange', () => {
    const v = fromHash();
    if (v) {
      set(v, true);
      section.scrollIntoView();
    }
  });

  group.hidden = false;
}

document.querySelectorAll<HTMLButtonElement>('.copy-link').forEach((btn) => {
  if (!navigator.clipboard) return;
  btn.hidden = false;
  const label = btn.firstChild;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.url ?? '');
      if (label) label.textContent = 'Copied';
      if (status) status.textContent = 'Link copied';
      setTimeout(() => { if (label) label.textContent = 'Copy link'; }, 2000);
    } catch {
      if (status) status.textContent = 'Could not copy the link';
    }
  });
});
