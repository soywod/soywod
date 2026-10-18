export const ANIM = "anim";

export function observeAnimations() {
  if (!document.documentElement.classList.contains("js")) return;
  var observer = new IntersectionObserver(
    function (entries) {
      entries
        .filter(function (entry) {
          return entry.isIntersecting;
        })
        .map(function (entry) {
          var box = entry.boundingClientRect;
          return { el: entry.target as HTMLElement, line: Math.round(box.top / 48), left: box.left };
        })
        .sort(function (a, b) {
          return a.line - b.line || a.left - b.left;
        })
        .forEach(function (item, index) {
          var delay = Math.min(index, 8) * 110 + Math.random() * 90;
          item.el.style.setProperty("--delay", Math.round(delay) + "ms");
          item.el.classList.add("anim--in");
          observer.unobserve(item.el);
        });
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  document.querySelectorAll(".anim").forEach(function (el) {
    observer.observe(el);
  });
}
