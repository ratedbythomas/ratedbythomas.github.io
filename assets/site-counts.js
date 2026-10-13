(() => {
  const setCount = (name, value) => {
    const node = document.querySelector(`[data-site-count="${name}"]`);
    if (node) node.textContent = String(value);
  };
  const getDocument = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Could not load ${url}`);
    return new DOMParser().parseFromString(await response.text(), "text/html");
  };
  const unique = (items) => [...new Set(items)];
  const updateCounts = async () => {
    const locationUrls = unique([...document.querySelectorAll("#locations .location-link[href]")].map(link => link.href));
    const locationPages = await Promise.all(locationUrls.map(getDocument));
    const barUrls = unique(locationPages.flatMap((page, index) =>
      [...page.querySelectorAll(".grid .card a[href]")].map(link => new URL(link.getAttribute("href"), locationUrls[index]).href)
    ));
    const barPages = await Promise.all(barUrls.map(getDocument));
    const drinkCount = barPages.reduce((total, page) => total + page.querySelectorAll(".review-row").length, 0);
    setCount("locations", locationUrls.length);
    setCount("bars", barUrls.length);
    setCount("drinks", drinkCount);
  };
  updateCounts().catch(() => {
    document.querySelectorAll("[data-site-count]").forEach(node => { node.textContent = "—"; });
  });
})();
