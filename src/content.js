const MIRROR = "https://freedium.cfd";

const SKIP = /^\/(tag|topics|search|signin|signup|about|me|plans|gift|m\/)/;

if (isMediumArticle()) {
  window.location.replace(MIRROR + location.pathname + location.search);
}

function isMediumArticle() {
  const path = location.pathname;
  if (!path || path === "/" || SKIP.test(path)) return false;
  if (/^\/@[^/]+\/?$/.test(path)) return false;
  return path.split("/").filter(Boolean).length >= 2;
}
