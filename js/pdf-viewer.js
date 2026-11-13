// Affichage direct du PDF en images haute définition, sans lecteur navigateur.
// Aucune barre d'outils, aucun bouton télécharger.
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("pdf-viewer");
  if (!container) return;

  container.addEventListener("contextmenu", (e) => e.preventDefault());
  container.addEventListener("dragstart", (e) => e.preventDefault());

  if (!window.pdfjsLib) {
    container.innerHTML = '<p class="pdf-error">Librairie PDF non chargée (hors-ligne ?).</p>';
    return;
  }

  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  const url = container.dataset.pdf;
  const showBadge = url.indexOf('portfolio') !== -1;
  const badge = showBadge ? document.createElement('div') : null;
  let listEl = null, totalPages = 0, shown = 0;
  const syncBadge = () => {
    if (!badge || !totalPages || !listEl) return;
    if (totalPages > 1) {
      const mid = window.innerHeight * 0.4;
      let current = 1;
      Array.from(listEl.children).forEach((cv, i) => {
        if (cv.getBoundingClientRect().top <= mid) current = i + 1;
      });
      if (current !== shown) {
        shown = current;
        badge.textContent = "Page " + shown + " / " + totalPages;
      }
      return;
    }
    const r = listEl.getBoundingClientRect();
    const mid = window.innerHeight * 0.4;
    let pct = Math.round(((mid - r.top) / r.height) * 100);
    pct = Math.max(0, Math.min(100, pct));
    const label = pct + " %";
    if (label !== shown) {
      shown = label;
      badge.textContent = label;
    }
  };
  if (badge) {
    badge.className = "pdf-page-badge";
    badge.textContent = "Chargement…";
    document.body.appendChild(badge);
    window.addEventListener("scroll", syncBadge, { passive: true });
    window.addEventListener("resize", syncBadge);
  }

  try {
    const pdf = await pdfjsLib.getDocument(url).promise;
    const loader = container.querySelector(".pdf-loader, .pdf-error");
    const countEl = container.querySelector(".pdf-count");
    const list = document.createElement("div");
    list.className = "pdf-pages";
    container.appendChild(list);
    listEl = list;
    totalPages = pdf.numPages;

    for (let n = 1; n <= pdf.numPages; n++) {
      if (countEl) countEl.textContent = "Page " + n + " / " + pdf.numPages + "…";
      const page = await pdf.getPage(n);
      // Échelle 3 = ~216 DPI : net sur écran retina, sans flou
      const viewport = page.getViewport({ scale: 3 });
      const canvas = document.createElement("canvas");
      canvas.oncontextmenu = (e) => e.preventDefault();
      const ctx = canvas.getContext("2d", { alpha: false });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: ctx, viewport }).promise;
      list.appendChild(canvas);
      syncBadge();
    }
    syncBadge();
    if (loader) {
      if (countEl) {
        loader.innerHTML = "<p><strong>Chargement terminé.</strong></p><p class=\"pdf-sub\">J'espère que le café est bon, sinon pas grave, le portfolio vous plaira (j'espère, beaucoup, vraiment beaucoup)</p>";
      } else {
        loader.remove();
      }
    }
  } catch (err) {
    container.innerHTML =
      '<p class="pdf-error">Dépose ton fichier ici : <strong>' + url + "</strong></p>";
  }
});

document.addEventListener("contextmenu", (e) => {
  if (document.getElementById("pdf-viewer")) e.preventDefault();
});
