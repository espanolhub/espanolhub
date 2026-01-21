export function createRipple(e: React.PointerEvent | any) {
  try {
    const el = (e.currentTarget || e.target) as HTMLElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const circle = document.createElement('span');
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.background = 'rgba(59,130,246,0.12)';
    circle.style.transform = 'scale(0)';
    circle.style.animation = 'ripple 600ms linear';
    circle.style.pointerEvents = 'none';
    circle.className = 'ripple-element';

    el.style.position = el.style.position || 'relative';
    el.appendChild(circle);

    setTimeout(() => {
      try { el.removeChild(circle); } catch {}
    }, 650);
  } catch (err) {
    // ignore
  }
}

