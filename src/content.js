const MIRROR = "https://freedium-mirror.cfd";
const ID = "freedium-redirect-btn";
const SKIP = /^\/(tag|topics|search|signin|signup|about|me|plans|gift|m\/)/;

function isArticle() {
  const p = location.pathname;
  return (
    p &&
    p !== "/" &&
    !SKIP.test(p) &&
    !/^\/@[^/]+\/?$/.test(p) &&
    p.split("/").filter(Boolean).length >= 2
  );
}

function sync() {
  const el = document.getElementById(ID);
  if (!isArticle()) return el?.remove();
  if (el) return;

  const btn = document.createElement("button");
  btn.id = ID;
  btn.textContent = "Read on Freedium";
  btn.onclick = () =>
    location.assign(MIRROR + location.pathname + location.search);
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: "2147483647",
    padding: "10px 16px",
    border: "none",
    borderRadius: "999px",
    background: "#1a8917",
    color: "#fff",
    font: "600 14px system-ui,sans-serif",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(0,0,0,.2)",
  });
  document.body.appendChild(btn);
}

["pushState", "replaceState"].forEach((fn) => {
  const orig = history[fn].bind(history);
  history[fn] = (...args) => {
    orig(...args);
    sync();
  };
});
addEventListener("popstate", sync);
sync();
