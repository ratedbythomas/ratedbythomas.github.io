(() => {
  const worlds50BestHistory = Object.freeze({
    "zest": Object.freeze({ "2025": 16, "2026": 7 }),
    "bar-cham": Object.freeze({ "2025": 53, "2026": 71 }),
    "danico": Object.freeze({ "2026": 26 })
  });
  const years = Object.values(worlds50BestHistory).flatMap(history => Object.keys(history).map(Number));
  const latestYear = Math.max(...years);
  const barId = document.body.dataset.barId;
  const history = worlds50BestHistory[barId];
  const visit = document.querySelector(".visit-date");
  if (!history || !visit) return;
  const match = visit.textContent.match(/Visited\s+(.+)\s+(\d{4})/);
  if (!match) return;
  const visitYear = Number(match[2]);
  const visitRank = history[visitYear];
  const latestRank = history[latestYear];
  let text = "";
  if (visitYear === latestYear && visitRank) {
    text = `#${visitRank} in The World’s 50 Best Bars ${visitYear}`;
  } else if (visitRank && latestRank) {
    text = `#${visitRank} when visited — #${latestRank} in The World’s 50 Best Bars ${latestYear}`;
  } else if (visitRank) {
    text = `#${visitRank} in The World’s 50 Best Bars ${visitYear}`;
  } else if (latestRank) {
    text = `#${latestRank} in The World’s 50 Best Bars ${latestYear}`;
  }
  if (!text) return;
  const meta = document.createElement("span");
  meta.className = "world-50-meta";
  meta.textContent = text;
  visit.insertAdjacentText("afterend", " — ");
  visit.nextSibling.after(meta);
})();
