// Menu burger mobile (100% statique, compatible GitHub Pages)
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Mode sombre / clair (mémorisé)
  const themeBtn = document.querySelector(".theme-toggle");
  if (themeBtn) {
    const syncLabel = () => {
      const dark = document.documentElement.dataset.theme === "dark";
      themeBtn.setAttribute(
        "aria-label",
        dark ? "Passer en mode clair" : "Passer en mode sombre"
      );
    };
    syncLabel();
    themeBtn.addEventListener("click", () => {
      const dark = document.documentElement.dataset.theme === "dark";
      if (dark) {
        delete document.documentElement.dataset.theme;
        try { localStorage.setItem("theme", "light"); } catch (e) {}
      } else {
        document.documentElement.dataset.theme = "dark";
        try { localStorage.setItem("theme", "dark"); } catch (e) {}
      }
      syncLabel();
    });
  }
});
