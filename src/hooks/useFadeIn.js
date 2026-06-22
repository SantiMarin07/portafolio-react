import { useEffect, useRef } from "react";

// Aplica la clase "visible" cuando el elemento entra en pantalla.
// Úsalo en cualquier sección que deba aparecer con fade-in al hacer scroll.
export default function useFadeIn() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target
              .querySelectorAll(".barra-fill")
              .forEach((barra) => {
                setTimeout(() => {
                  barra.style.width = barra.dataset.w + "%";
                }, 200);
              });
          }
        });
      },
      { threshold: 0.15 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return ref;
}
