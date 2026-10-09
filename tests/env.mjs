// Test-only keys for the local Worker. They never exist anywhere but in this local test run.
export const PORT = Number(process.env.TEST_PORT || 8799);
export const BASE = `http://127.0.0.1:${PORT}`;
export const KEYS = {
  chief: "test-chief-key-000000000001",
  admin: "test-admin-key-000000000001",
  edit: "test-edit-key-0000000000001",
  view: "test-view-key-0000000000001",
  driverShared: "test-driver-shared-00000001",
  avShared: "test-av-shared-000000000001"
};
// individual field credentials (hash stored in the local D1 by run.mjs)
export const CREDS = {
  leaderA: { token: "leaderAtokenAAAAAAAAAAAAAAAA", role: "leader", person: 1, hotels: "mishkenot" },
  leaderB: { token: "leaderBtokenBBBBBBBBBBBBBBBB", role: "leader", person: 4, hotels: "king-david" },
  crewDinner: { token: "crewDinnerTokenCCCCCCCCCCCC", role: "crew", person: 2, segments: "s1-dinner" },
  crewAll: { token: "crewAllTokenDDDDDDDDDDDDDDDD", role: "crew", person: 3, all: true },
  driverR1: { token: "driverR1TokenEEEEEEEEEEEEEEE", role: "driver", label: "Bus 1", runs: "r1" },
  avIndividual: { token: "avIndividualTokenFFFFFFFFFFF", role: "av", label: "AV" },
  orphanLeader: { token: "orphanLeaderTokenGGGGGGGGGGG", role: "leader", person: 99, hotels: "mishkenot" }
};

export async function call(path, { key, method, body, headers = {} } = {}) {
  const h = { ...headers };
  if (key) h["x-token"] = key;
  if (body !== undefined) h["content-type"] = "application/json";
  const r = await fetch(BASE + path, { method: method || (body !== undefined ? "POST" : "GET"), headers: h, body: body !== undefined ? (typeof body === "string" ? body : JSON.stringify(body)) : undefined, redirect: "manual" });
  let data = null;
  const text = await r.text();
  try { data = JSON.parse(text); } catch { data = text; }
  return { status: r.status, data, headers: r.headers };
}
