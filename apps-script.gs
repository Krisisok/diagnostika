/**
 * Friisberg organizacijos diagnostika – atsakymų surinkimas į Google Sheets.
 * Įdiegimas: script.google.com → Naujas projektas → įklijuokite šį kodą →
 * Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone → Deploy.
 * Gautą „Web app URL“ įrašykite į index.html (const ENDPOINT).
 */
const SHEET_ID = '1rtQ_5sWZ9DgHvV8CRXulxY_lm3LAFxl5H6VTpAuSbh0'; // Friisberg diagnostika – atsakymai
const HEADER = ['laikas','respondento_id','organizacija','vaidmuo','dydis','valdyba','sritys','klausimu_sk','bendras_balas_proc','kodas'];

function sheet_() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sh = ss.getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(HEADER);
  return sh;
}
function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
// Klausimynas atsiunčia vieno vadovo rezultatą
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (!d.code || !/^FBA1-/.test(d.code)) return json_({ok:false, error:'bad code'});
    const lock = LockService.getScriptLock(); lock.waitLock(10000);
    sheet_().appendRow([new Date(), d.rid || '', d.org || '', d.role || '', d.size || '', d.board ? 1 : 0,
      (d.topics || []).join('|'), d.n || 0, d.pct || 0, d.code]);
    lock.releaseLock();
    return json_({ok:true});
  } catch (err) { return json_({ok:false, error:String(err)}); }
}
// Konsultanto vaizdas pasiima visus atsakymus (pasirinktinai – vienos organizacijos)
function doGet(e) {
  try {
    const org = (e && e.parameter && e.parameter.org) || '';
    const rows = sheet_().getDataRange().getValues(); rows.shift();
    const out = rows.filter(r => r[9] && (!org || String(r[2]) === org))
      .map(r => ({t: r[0] instanceof Date ? r[0].toISOString() : String(r[0]), rid: String(r[1]), org: String(r[2]), role: String(r[3]), code: String(r[9])}));
    return json_({ok:true, rows: out});
  } catch (err) { return json_({ok:false, error:String(err)}); }
}
