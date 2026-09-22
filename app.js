(() => {
  "use strict";
  const KEY = "igentrade-eigyobi-draft-v1";
  const $ = (id) => document.getElementById(id);
  const pad = (n) => String(n).padStart(2, "0");
  const isoDate = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const displayDate = (value) => value ? value.replaceAll("-", "/") : "—";
  const today = () => new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" });
  const HOLIDAYS = {
    "2025": ["2025-01-01","2025-01-13","2025-02-11","2025-02-23","2025-02-24","2025-03-20","2025-04-29","2025-05-03","2025-05-04","2025-05-05","2025-05-06","2025-07-21","2025-08-11","2025-09-15","2025-09-23","2025-10-13","2025-11-03","2025-11-23","2025-11-24"],
    "2026": ["2026-01-01","2026-01-12","2026-02-11","2026-02-23","2026-03-20","2026-04-29","2026-05-03","2026-05-04","2026-05-05","2026-07-20","2026-08-11","2026-09-21","2026-09-22","2026-09-23","2026-10-12","2026-11-03","2026-11-23"],
    "2027": ["2027-01-01","2027-01-11","2027-02-11","2027-02-23","2027-03-21","2027-03-22","2027-04-29","2027-05-03","2027-05-04","2027-05-05","2027-07-19","2027-08-11","2027-09-20","2027-09-23","2027-10-11","2027-11-03","2027-11-23"]
  };
  function parse(value) { const [y, m, d] = value.split("-").map(Number); return new Date(y, m - 1, d); }
  function isBusiness(date) { const weekend = date.getDay() === 0 || date.getDay() === 6; const holiday = (HOLIDAYS[String(date.getFullYear())] || []).includes(isoDate(date)); return (!$("excludeWeekends").checked || !weekend) && (!$("excludeHolidays").checked || !holiday); }
  function countDays(start, end) { let count = 0; const d = new Date(start); while (d <= end) { if (isBusiness(d)) count += 1; d.setDate(d.getDate() + 1); } return count; }
  function addDays(start, amount) { const d = new Date(start); let left = Math.max(0, Math.floor(Number(amount) || 0)); while (left > 0) { d.setDate(d.getDate() + 1); if (isBusiness(d)) left -= 1; } return d; }
  function updateMode() { const count = $("calcMode").value === "count"; $("daysLabel").hidden = count; $("endLabel").hidden = !count; calculate(); }
  function calculate() {
    const startValue = $("startDate").value; const mode = $("calcMode").value; $("today").textContent = today();
    const condition = [$("excludeWeekends").checked ? "土日除外" : "土日含む", $("excludeHolidays").checked ? "祝日除外" : "祝日含む"].join("・"); $("condition").textContent = condition;
    if (!startValue) { $("resultStart").textContent = "—"; $("resultEnd").textContent = "—"; $("resultCount").textContent = "—"; $("resultNote").textContent = "開始日を入力してください。"; return; }
    const start = parse(startValue); $("resultStart").textContent = displayDate(startValue);
    if (mode === "add") { const end = addDays(start, $("businessDays").value); const endValue = isoDate(end); $("resultEnd").textContent = displayDate(endValue); $("resultCount").textContent = `${Math.max(0, Math.floor(Number($("businessDays").value) || 0))}日`; $("resultNote").textContent = `開始日の翌日から数え、${condition}で計算しました。`; }
    else { if (!$("endDate").value) { $("resultEnd").textContent = "—"; $("resultCount").textContent = "—"; $("resultNote").textContent = "終了日を入力してください。"; return; } const end = parse($("endDate").value); if (end < start) { $("resultEnd").textContent = displayDate($("endDate").value); $("resultCount").textContent = "—"; $("resultNote").textContent = "終了日は開始日以降にしてください。"; return; } $("resultEnd").textContent = displayDate($("endDate").value); $("resultCount").textContent = `${countDays(start, end)}日`; $("resultNote").textContent = `開始日・終了日を含め、${condition}で数えました。`; }
  }
  function data() { return { mode: $("calcMode").value, start: $("startDate").value, days: $("businessDays").value, end: $("endDate").value, weekends: $("excludeWeekends").checked, holidays: $("excludeHolidays").checked }; }
  function load(d) { $("calcMode").value = d.mode || "add"; $("startDate").value = d.start || ""; $("businessDays").value = d.days ?? 5; $("endDate").value = d.end || ""; $("excludeWeekends").checked = d.weekends !== false; $("excludeHolidays").checked = d.holidays !== false; updateMode(); }
  ["startDate", "businessDays", "endDate", "excludeWeekends", "excludeHolidays"].forEach((id) => $(id).addEventListener("input", calculate)); $("calcMode").addEventListener("change", updateMode);
  $("showBrand").addEventListener("change", () => $("brandFoot").classList.toggle("is-hidden", !$("showBrand").checked)); $("printBtn").addEventListener("click", () => window.print());
  $("saveLocal").addEventListener("click", () => { localStorage.setItem(KEY, JSON.stringify(data())); alert("下書きをこのブラウザに保存しました。"); }); $("loadLocal").addEventListener("click", () => { const raw = localStorage.getItem(KEY); if (!raw) return alert("保存された下書きがありません。"); try { load(JSON.parse(raw)); } catch (_) { alert("下書きを読み込めませんでした。"); } });
  const now = new Date(); $("startDate").value = isoDate(now); const end = new Date(now); end.setDate(end.getDate() + 7); $("endDate").value = isoDate(end); updateMode();
})();
