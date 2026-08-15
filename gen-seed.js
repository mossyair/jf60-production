// Generates seed.sql from the structured schedule.
const fs = require("fs");

const segments = [
  { id:"d1-welcome", day:1, time:"09:00", end:"12:00", title:"Welcome & morning tours", venue:"Emek HaTzvaim · Botanical Garden · Ein Yael",
    desc:"Participants split across three nature/culture sites of Jerusalem for guided morning tours.",
    status:"open", meal:false, people:[],
    loose:["Decide: JF guides vs. our own guides for tours","Confirm Emek HaTzvaim / Botanical Garden / Ein Yael tour logistics"] },
  { id:"d1-lunch", day:1, time:"12:30", end:"14:00", title:"Lunch at Ein Yael", venue:"Ein Yael",
    desc:"Group lunch on site.", status:"open", meal:true, people:[], loose:[] },
  { id:"d1-plenary", day:1, time:"14:00", end:"16:00", title:"Afternoon plenary — Jerusalem's rich past", venue:"Theatre (Karon Hall)",
    desc:"Opening remarks by Erik Grabelsky. 75-min panel on successful Jerusalem institutions — their work and journey from the start (with images).",
    status:"progress", meal:false,
    people:[["Erik Grabelsky (opening)",1],["Meirav Maor",0],["Maya HaLevi",0],["Sharon (Jerusalem Theatre)",0],["Sigalit (Zoo)",0]],
    loose:["Confirm panel moderator (TBC)","Collect panelist images / journey materials"] },
  { id:"d1-hotel1", day:1, time:"16:30", end:"18:30", title:"Hotel settle-in time", venue:"Hotels",
    desc:"Free / organizing time at hotels.", status:"confirmed", meal:false, people:[], loose:[] },
  { id:"d1-opening", day:1, time:"19:00", end:"21:00", title:"Opening event + show + chef dinner + keynote", venue:"Jerusalem Theatre",
    desc:"Opening ceremony with performance, chef's dinner, and central speaker (Daniel Hagari).",
    status:"progress", meal:true, people:[["Daniel Hagari (keynote)",0]],
    loose:["Lock performance / show act","Confirm chef dinner menu & catering"] },
  { id:"d1-night", day:1, time:"21:30", end:"23:00", title:"Night gathering at Mishkenot Sha'ananim", venue:"Mishkenot Sha'ananim",
    desc:"Whisky and music — relaxed networking under the open sky.", status:"progress", meal:false, people:[],
    loose:["Confirm whisky & music setup"] },

  { id:"d2-run", day:2, time:"07:30", end:"08:30", title:"Running tour / yoga (optional)", venue:"TBC",
    desc:"Optional morning activity.", status:"open", meal:false, people:[], loose:["Decide running route / yoga provider & venue"] },
  { id:"d2-leadership", day:2, time:"09:30", end:"12:30", title:"Morning — Shai Doron Leadership Program", venue:"Mishkenot Sha'ananim",
    desc:"Greetings by Mayor Moshe Lion. Keynote: Shapira / Goldberg-Polin family. Donors rotate across three stations meeting three leaders each for intimate dialogue + Q&A.",
    status:"progress", meal:false,
    people:[["Mayor Moshe Lion (greeting)",0],["Shapira / Goldberg-Polin family (keynote)",0],["Keren Applebaum-Reef",0],["Daoud Alian",0],["Yaffa Buso",0],["Yehuda Cohen",0],["Fadi Dukaidek",0],["Neta Meisels",0],["Meredith Rothbart",0],["Daniela Zalcer",0],["Uri Tzadok",0],["Mohammed Zahar",0],["Mishy Harman",0]],
    loose:["Confirm moderator (TBC)","Design 3-station rotation logistics"] },
  { id:"d2-lunch", day:2, time:"13:00", end:"14:30", title:"Lunch at Gan Yael", venue:"Gan Yael",
    desc:"Group lunch.", status:"open", meal:true, people:[], loose:[] },
  { id:"d2-beithanina", day:2, time:"15:30", end:"17:00", title:"Site tour — Beit Hanina community center + Arabic lesson", venue:"Beit Hanina Sports Complex",
    desc:"Guided tour of new sports complex, then panel on social/civic/economic challenges facing East Jerusalem communities. Ends with an Arabic lesson by Gilad Sweet with an East Jerusalem partner.",
    status:"progress", meal:false,
    people:[["Yerushalmit speakers",0],["Mira (Foundation)",0],["Wasim Elhaj (Beit Hanina complex CEO)",0],["Suleiman Maswadeh (journalist, moderator)",0],["Gilad Sweet (Arabic lesson)",0]],
    loose:["Coordinate Gilad Sweet Arabic lesson + EJ partner"] },
  { id:"d2-hotel", day:2, time:"17:30", end:"19:30", title:"Hotel settle-in time", venue:"Hotels",
    desc:"Free / organizing time.", status:"confirmed", meal:false, people:[], loose:[] },
  { id:"d2-dinner", day:2, time:"20:00", end:"22:00", title:"Rooftop dinner at Artists' Studios — Shipudei Ezra", venue:"Shipudei Ezra (Artists' Studios rooftop)",
    desc:"Rooftop dinner + tour of artist studios, meeting a cluster of artists and 4-5 art/design stalls for donors to purchase pieces.",
    status:"progress", meal:true, people:[],
    loose:["Confirm Shipudei Ezra rooftop catering","Curate 4-5 art/design stalls + artists","Set up purchase / payment flow for donors"] },
  { id:"d2-night", day:2, time:"22:00", end:"00:00", title:"Night at Mishkenot / alt. Distillery music option", venue:"Mishkenot Sha'ananim / HaMazkeka",
    desc:"Whisky and music networking, or alternative culture/music experience at the Distillery as part of the Zikuk Festival happening the same date.",
    status:"open", meal:false, people:[], loose:["Decide Mishkenot vs. Distillery/Zikuk Festival option"] },

  { id:"d3-run", day:3, time:"07:30", end:"08:30", title:"Running tour / yoga (optional)", venue:"TBC",
    desc:"Optional morning activity.", status:"open", meal:false, people:[], loose:["Decide running route / yoga provider & venue"] },
  { id:"d3-morning", day:3, time:"09:30", end:"13:00", title:"Morning: Map of Jerusalem's activity future — at the Mifal", venue:"The Mifal",
    desc:"Opening words by Erik Grabelsky. 'Field of Action / Activities Market' — donors meet tables & stands of Jerusalem organizations, learn their impact, build future partnerships.",
    status:"progress", meal:false, people:[["Erik Grabelsky (opening)",1]],
    loose:["Curate participating Jerusalem organizations","Design 'Field of Action' table layout"] },
  { id:"d3-lunch", day:3, time:"13:00", end:"14:30", title:"Lunch at the Mifal (street food stalls)", venue:"The Mifal",
    desc:"Street food stalls lunch.", status:"open", meal:true, people:[], loose:["Book street food vendors"] },
  { id:"d3-thinktank", day:3, time:"15:00", end:"17:30", title:"Think tank at Science Museum: 'Manifest Future Jerusalem'", venue:"Science Museum",
    desc:"Interactive collaborative process bringing Jerusalem leaders and donors together to generate ideas, share strategies and shape the city's next chapter.",
    status:"progress", meal:false, people:[],
    loose:["Design interactive think-tank format & facilitation","Review attached detail doc (Google Drive)"] },
  { id:"d3-hotel", day:3, time:"18:00", end:"19:00", title:"Hotel settle-in time", venue:"Hotels",
    desc:"Free / organizing time.", status:"confirmed", meal:false, people:[], loose:[] },
  { id:"d3-gala", day:3, time:"20:00", end:"00:00", title:"Closing gala dinner at Tower of David", venue:"Tower of David",
    desc:"Closing remarks by Erik Grabelsky. Greeting by President (Bougie Herzog). Concert by Jerusalem East & West Orchestra conducted by Maestro Tom Cohen or Tahrir. Festive farewell whisky at the theatre.",
    status:"progress", meal:true,
    people:[["Erik Grabelsky (closing)",1],["President Isaac (Bougie) Herzog (greeting)",0],["Maestro Tom Cohen / Tahrir (conductor)",0],["Jerusalem East & West Orchestra",0]],
    loose:["Confirm President Herzog attendance & protocol","Confirm orchestra + conductor (Tom Cohen or Tahrir)","Lock gala catering at Tower of David"] }
];

function esc(s){ return String(s).replace(/'/g, "''"); }
let sql = "-- Auto-generated seed data\nDELETE FROM checklist WHERE seeded=1;\nDELETE FROM people;\nDELETE FROM segments;\n\n";
segments.forEach((s, i) => {
  sql += `INSERT INTO segments (id,day,time,end_time,title,venue,descr,status,is_meal,sort_order) VALUES ('${esc(s.id)}',${s.day},'${esc(s.time)}','${esc(s.end)}','${esc(s.title)}','${esc(s.venue)}','${esc(s.desc)}','${s.status}',${s.meal?1:0},${i});\n`;
  s.people.forEach(p => {
    sql += `INSERT INTO people (segment_id,name,confirmed) VALUES ('${esc(s.id)}','${esc(p[0])}',${p[1]});\n`;
  });
  s.loose.forEach((t, j) => {
    sql += `INSERT INTO checklist (segment_id,text,done,seeded,sort_order) VALUES ('${esc(s.id)}','${esc(t)}',0,1,${j});\n`;
  });
});
fs.writeFileSync(__dirname + "/seed.sql", sql);
console.log("seed.sql written:", sql.split("\n").length, "lines");
