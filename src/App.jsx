import { useState } from "react";

// ─── COLORS ───────────────────────────────────────────────────────────────────
const C = {
  soil: "#1C0F07", earth: "#3D1F0D", bark: "#6B3A1F",
  amber: "#C97D2A", gold: "#E8A030", leaf: "#2E6B35",
  lime: "#4FA854", cream: "#F5EDD8", muted: "#7A6040",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const FARMERS = [
  { id:1, name:"Miss Joy Williams",  community:"Papine",          types:["Produce","Dairy"],    rating:4.8, reviews:32, verified:true,  photo:"👩🏾‍🌾", earnings:42000 },
  { id:2, name:"Farmer Errol Brown", community:"August Town",     types:["Produce","Root Veg"], rating:4.6, reviews:18, verified:true,  photo:"👨🏿‍🌾", earnings:28500 },
  { id:3, name:"Linval's Farm",      community:"Bull Bay",        types:["Produce","Dairy"],    rating:5.0, reviews:47, verified:true,  photo:"🧑🏾‍🌾", earnings:67000 },
  { id:4, name:"Mama Yvette",        community:"Stony Hill",      types:["Bakery","Produce"],   rating:4.9, reviews:24, verified:true,  photo:"👩🏽‍🌾", earnings:31000 },
  { id:5, name:"Winston's Butchery", community:"Constant Spring", types:["Meat"],               rating:4.7, reviews:15, verified:false, photo:"👨🏾‍🌾", earnings:0 },
];

const PRODUCTS = [
  { id:1,  fId:1, name:"Callaloo Bundle",     cat:"Produce",  price:350,  unit:"bunch", qty:14, e:"🥬", st:"Available", hId:1, desc:"Fresh-picked callaloo from the garden. Washed and ready.",           dates:"Jun 21–22" },
  { id:2,  fId:1, name:"Scotch Bonnet",       cat:"Produce",  price:800,  unit:"lb",    qty:6,  e:"🌶️", st:"Available", hId:1, desc:"Extra hot scotch bonnets, sun-ripened in Papine.",                  dates:"Jun 21–22" },
  { id:3,  fId:1, name:"Fresh Cow's Milk",    cat:"Dairy",    price:600,  unit:"quart", qty:8,  e:"🥛", st:"Available", hId:1, desc:"Raw fresh cow's milk, same-day collection.",                        dates:"Jun 21" },
  { id:4,  fId:2, name:"Yellow Yam",          cat:"Root Veg", price:450,  unit:"lb",    qty:20, e:"🍠", st:"Available", hId:1, desc:"Proper Jamaican yellow yam, August Town hillside grown.",            dates:"Jun 21–23" },
  { id:5,  fId:2, name:"Ripe Plantain",       cat:"Produce",  price:250,  unit:"bunch", qty:10, e:"🍌", st:"Available", hId:2, desc:"Sweet, black-spotted. Perfect for frying.",                         dates:"Jun 22" },
  { id:6,  fId:2, name:"Sweet Potato",        cat:"Root Veg", price:380,  unit:"lb",    qty:3,  e:"🥔", st:"Low Stock",  hId:1, desc:"Grown without chemicals.",                                          dates:"Jun 21" },
  { id:7,  fId:3, name:"Free-Range Eggs",     cat:"Dairy",    price:750,  unit:"dozen", qty:18, e:"🥚", st:"Available", hId:1, desc:"Deep orange yolks. Free-range hens.",                                dates:"Jun 21–22" },
  { id:8,  fId:3, name:"Cho Cho",             cat:"Produce",  price:200,  unit:"each",  qty:30, e:"🥦", st:"Available", hId:2, desc:"Fresh chayote squash, great for soups and stews.",                  dates:"Jun 22–23" },
  { id:9,  fId:3, name:"Fresh Thyme",         cat:"Produce",  price:150,  unit:"bunch", qty:0,  e:"🌿", st:"Sold Out",  hId:1, desc:"Dried on the vine — freshest thyme you'll find.",                   dates:"—" },
  { id:10, fId:4, name:"Hardo Bread",         cat:"Bakery",   price:500,  unit:"loaf",  qty:12, e:"🍞", st:"Available", hId:1, desc:"Traditional Jamaican hard dough bread, baked Friday morning.",       dates:"Jun 21" },
  { id:11, fId:4, name:"Coconut Drops",       cat:"Bakery",   price:200,  unit:"each",  qty:24, e:"🥥", st:"Available", hId:2, desc:"Mama Yvette's famous coconut drops. Ginger and brown sugar.",        dates:"Jun 22" },
  { id:12, fId:4, name:"Sorrel Juice",        cat:"Produce",  price:400,  unit:"quart", qty:9,  e:"🍹", st:"Available", hId:1, desc:"Homemade sorrel with ginger and cloves. Not too sweet.",             dates:"Jun 21–22" },
  { id:13, fId:5, name:"Goat Meat",           cat:"Meat",     price:1800, unit:"lb",    qty:7,  e:"🐐", st:"Available", hId:2, desc:"Fresh-cut goat from Constant Spring. Perfect for curry.",            dates:"Jun 22" },
  { id:14, fId:5, name:"Country Chicken",     cat:"Meat",     price:2200, unit:"each",  qty:5,  e:"🐔", st:"Available", hId:2, desc:"Free-range country chicken, cleaned and ready.",                     dates:"Jun 22" },
];

const HUBS = [
  { id:1, name:"Papine Community Centre", addr:"6 Papine Rd, St. Andrew",   date:"Fri, Jun 21", time:"8am–12pm",  slots:["Morning","Afternoon"], max:60, curr:48, st:"Open", coord:"Deacon Phillip" },
  { id:2, name:"Bull Bay Church Hall",    addr:"23 Bull Bay Main Rd",        date:"Sat, Jun 22", time:"9am–1pm",   slots:["Morning","Afternoon"], max:40, curr:22, st:"Open", coord:"Sister Marva" },
  { id:3, name:"Half Way Tree Plaza",     addr:"Half Way Tree Square, KSA",  date:"Sun, Jun 23", time:"10am–2pm",  slots:["Morning","Afternoon","Evening"], max:80, curr:80, st:"Full", coord:"Mr. Clive" },
];

const INIT_ORDERS = [
  { id:"FTY-0031", fId:1, pId:1,  qty:2, total:700,  hId:1, slot:"Morning",   status:"Confirmed", date:"Jun 18" },
  { id:"FTY-0032", fId:3, pId:7,  qty:1, total:750,  hId:1, slot:"Morning",   status:"Confirmed", date:"Jun 18" },
  { id:"FTY-0021", fId:2, pId:4,  qty:3, total:1350, hId:2, slot:"Afternoon", status:"Collected", date:"Jun 14" },
];

const RATINGS = [
  { fId:1, by:"Keisha M.",  score:5, note:"The callaloo was so fresh! Miss Joy always comes through." },
  { fId:1, by:"Andre T.",   score:5, note:"Milk was rich and creamy. Best in St. Andrew." },
  { fId:3, by:"Patrice W.", score:5, note:"Linval's eggs have the deepest orange yolks." },
];

const CATS = ["All", "Produce", "Root Veg", "Meat", "Dairy", "Bakery"];

// ─── UTILS ────────────────────────────────────────────────────────────────────
const jmd = n => "$" + n.toLocaleString() + " JMD";
const gF  = id => FARMERS.find(f => f.id === id);
const gH  = id => HUBS.find(h => h.id === id);
const gP  = id => PRODUCTS.find(p => p.id === id);

// ─── ATOMS ───────────────────────────────────────────────────────────────────
function Stars({ n }) {
  return <span style={{ color: C.gold, fontSize: 13 }}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

function Badge({ children, color = "green" }) {
  const m = {
    green: { bg:"rgba(79,168,84,0.18)",   b:C.lime,              t:"#7DBF72" },
    amber: { bg:"rgba(201,125,42,0.18)",  b:C.amber,             t:C.gold },
    red:   { bg:"rgba(200,60,60,0.15)",   b:"#e07070",           t:"#f08080" },
    grey:  { bg:"rgba(255,255,255,0.07)", b:"rgba(255,255,255,0.15)", t:"rgba(245,237,216,0.55)" },
  };
  const s = m[color] || m.green;
  return (
    <span style={{ display:"inline-block", padding:"2px 9px", borderRadius:20, fontSize:11,
      fontWeight:700, background:s.bg, border:"1px solid "+s.b, color:s.t }}>
      {children}
    </span>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding:"5px 13px", borderRadius:20, fontSize:12, fontWeight:700,
      border:"1.5px solid "+(active ? C.lime : "rgba(255,255,255,0.12)"),
      background: active ? C.leaf : "rgba(255,255,255,0.06)",
      color: active ? "#fff" : "rgba(245,237,216,0.65)",
      whiteSpace:"nowrap", cursor:"pointer", transition:"all .15s",
    }}>
      {label}
    </button>
  );
}

function Btn({ children, onClick, v="green", full, disabled, sm }) {
  const m = {
    green:   { bg:C.leaf,    c:"#fff" },
    amber:   { bg:C.amber,   c:"#fff" },
    outline: { bg:"transparent", c:C.cream, b:"1.5px solid rgba(255,255,255,0.18)" },
    wa:      { bg:"#25D366", c:"#fff" },
  };
  const s = m[v] || m.green;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: sm ? "7px 13px" : "12px 18px",
      borderRadius:11, fontSize: sm ? 12 : 14, fontWeight:800,
      background: disabled ? "rgba(255,255,255,0.07)" : s.bg,
      color: disabled ? "rgba(255,255,255,0.25)" : s.c,
      border: s.b || "none",
      width: full ? "100%" : "auto",
      cursor: disabled ? "not-allowed" : "pointer",
      transition:"all .15s",
    }}>
      {children}
    </button>
  );
}

function Card({ children, style: s = {}, onClick }) {
  return (
    <div onClick={onClick} style={{
      background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)",
      borderRadius:14, padding:16, cursor: onClick ? "pointer" : "default", ...s,
    }}>
      {children}
    </div>
  );
}

function Shell({ children }) {
  return (
    <div style={{
      maxWidth:430, margin:"0 auto", minHeight:"100vh",
      background:C.soil, display:"flex", flexDirection:"column",
    }}>
      {children}
    </div>
  );
}

function TopBar({ title, onBack, right }) {
  return (
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"13px 16px 10px", background:C.soil,
      borderBottom:"1px solid rgba(255,255,255,0.07)",
      flexShrink:0, position:"sticky", top:0, zIndex:40,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        {onBack && (
          <button onClick={onBack} style={{
            background:"rgba(255,255,255,0.08)", border:"none", borderRadius:8,
            width:32, height:32, fontSize:15, color:C.cream, cursor:"pointer",
          }}>←</button>
        )}
        <span style={{ fontSize:17, fontWeight:800, color:C.cream }}>{title}</span>
      </div>
      {right}
    </div>
  );
}

function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{
      display:"flex", background:"rgba(0,0,0,0.4)",
      borderTop:"1px solid rgba(255,255,255,0.07)",
      padding:"6px 4px 8px", flexShrink:0,
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          flex:1, display:"flex", flexDirection:"column", alignItems:"center",
          gap:2, background:"none", border:"none", padding:"3px 0", cursor:"pointer",
        }}>
          <span style={{ fontSize:18 }}>{t.icon}</span>
          <span style={{
            fontSize:10, fontWeight:700,
            color: active === t.id ? C.lime : "rgba(245,237,216,0.35)",
            transition:"color .15s",
          }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── ROLE SELECT ──────────────────────────────────────────────────────────────
function RoleSelect({ onSelect }) {
  const roles = [
    { id:"buyer",  e:"🧑🏾‍🍳", l:"I'm a Buyer",  s:"Browse & order fresh food",          bg:C.leaf },
    { id:"farmer", e:"👩🏾‍🌾", l:"I'm a Farmer", s:"List products & manage orders",      bg:C.bark },
    { id:"admin",  e:"🛠️",   l:"Admin Panel",   s:"Manage hubs & farmers",              bg:C.earth },
  ];
  return (
    <Shell>
      <div style={{
        flex:1, display:"flex", flexDirection:"column", justifyContent:"center",
        padding:"32px 22px",
        background:`radial-gradient(ellipse at 20% 30%, rgba(46,107,53,0.22) 0%, transparent 55%), ${C.soil}`,
      }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ fontSize:60, marginBottom:12 }}>🌿</div>
          <h1 style={{ fontSize:44, fontWeight:900, color:C.cream, lineHeight:1, letterSpacing:-1, margin:0 }}>
            Farm to<br /><span style={{ color:C.gold }}>Yaad</span>
          </h1>
          <p style={{ color:"rgba(245,237,216,0.5)", fontSize:13, marginTop:12, lineHeight:1.65 }}>
            Fresh food, direct from Jamaican farmers<br />to your community — no middlemen.
          </p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:11 }}>
          {roles.map(r => (
            <div key={r.id} onClick={() => onSelect(r.id)} style={{
              background:"rgba(255,255,255,0.05)", border:"1.5px solid rgba(255,255,255,0.09)",
              borderRadius:14, padding:"15px 16px", display:"flex", alignItems:"center",
              gap:13, cursor:"pointer", transition:"transform .15s",
            }}>
              <div style={{
                width:48, height:48, borderRadius:12, background:r.bg+"55",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:24, flexShrink:0,
              }}>{r.e}</div>
              <div>
                <div style={{ fontSize:15, fontWeight:800, color:C.cream }}>{r.l}</div>
                <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginTop:2 }}>{r.s}</div>
              </div>
              <span style={{ marginLeft:"auto", color:"rgba(255,255,255,0.25)", fontSize:18 }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  );
}

// ─── BUYER APP ────────────────────────────────────────────────────────────────
function BuyerApp({ onExit }) {
  const [tab,  setTab]  = useState("home");
  const [view, setView] = useState("list");
  const [selP, setSelP] = useState(null);
  const [qty,  setQty]  = useState(1);
  const [cart, setCart] = useState([]);
  const [orders,  setOrders]  = useState(INIT_ORDERS);
  const [prods,   setProds]   = useState(PRODUCTS);
  const [cat,     setCat]     = useState("All");
  const [selHub,  setSelHub]  = useState(null);
  const [slot,    setSlot]    = useState(null);
  const [confirmed, setConfirmed] = useState(null);

  const visible   = prods.filter(p => p.st !== "Sold Out" && (cat === "All" || p.cat === cat));
  const cartQty   = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (p, q) => {
    setCart(c => {
      const ex = c.find(i => i.id === p.id);
      return ex ? c.map(i => i.id === p.id ? { ...i, qty: i.qty + q } : i) : [...c, { ...p, qty: q }];
    });
    setView("list");
    setTab("home");
  };

  const placeOrder = () => {
    const newO = cart.map(item => ({
      id:   "FTY-" + Math.floor(1000 + Math.random() * 8999),
      fId:  item.fId, pId: item.id, qty: item.qty,
      total: item.price * item.qty, hId: selHub, slot,
      status:"Confirmed", date:"Jun 19",
    }));
    setOrders(o => [...newO, ...o]);
    setProds(ps => ps.map(p => {
      const ci = cart.find(c => c.id === p.id);
      return ci ? { ...p, qty: Math.max(0, p.qty - ci.qty), st: p.qty - ci.qty <= 0 ? "Sold Out" : p.st } : p;
    }));
    setConfirmed({ orders: newO, hId: selHub, slot, total: cartTotal });
    setCart([]); setSelHub(null); setSlot(null);
    setView("confirmed");
  };

  const BTABS = [
    { id:"home",   icon:"🏠", label:"Home" },
    { id:"yaad",   icon:"📍", label:"Yaad Stops" },
    { id:"orders", icon:"📦", label:"Orders" },
    { id:"me",     icon:"👤", label:"Me" },
  ];

  // ── Product Detail ──
  if (view === "detail" && selP) {
    const f = gF(selP.fId); const h = gH(selP.hId);
    return (
      <Shell>
        <TopBar title={selP.name} onBack={() => setView("list")}
          right={<span style={{ fontSize:11, color:"rgba(245,237,216,0.4)" }}>{selP.dates}</span>} />
        <div style={{ flex:1, overflowY:"auto", padding:"18px 16px 100px" }}>
          <div style={{
            background:"rgba(46,107,53,0.14)", borderRadius:18,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:80, padding:"24px 0", marginBottom:18,
          }}>{selP.e}</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
            <h2 style={{ fontSize:22, fontWeight:800, color:C.cream, lineHeight:1.2, maxWidth:"55%", margin:0 }}>{selP.name}</h2>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:20, fontWeight:800, color:C.gold }}>{jmd(selP.price)}</div>
              <div style={{ fontSize:11, color:"rgba(245,237,216,0.4)" }}>per {selP.unit}</div>
            </div>
          </div>
          <p style={{ fontSize:13, color:"rgba(245,237,216,0.6)", lineHeight:1.7, marginBottom:12 }}>{selP.desc}</p>
          <div style={{ display:"flex", gap:7, marginBottom:16, flexWrap:"wrap" }}>
            <Badge color={selP.st === "Available" ? "green" : "amber"}>{selP.st}</Badge>
            <Badge color="grey">{selP.qty} left</Badge>
            <Badge color="grey">{selP.cat}</Badge>
          </div>
          <Card style={{ marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:11 }}>
              <div style={{
                width:44, height:44, borderRadius:11, background:"rgba(46,107,53,0.2)",
                fontSize:24, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
              }}>{f.photo}</div>
              <div>
                <div style={{ fontWeight:800, fontSize:14, color:C.cream }}>{f.name}</div>
                <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginTop:2 }}>
                  <Stars n={Math.round(f.rating)} /> {f.rating} · {f.reviews} reviews
                </div>
                {f.verified && <div style={{ fontSize:11, color:C.lime, marginTop:2 }}>✓ Verified Farmer</div>}
              </div>
            </div>
          </Card>
          <Card style={{ marginBottom:18 }}>
            <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginBottom:5 }}>📍 Pickup at</div>
            <div style={{ fontWeight:700, color:C.cream, fontSize:14 }}>{h?.name}</div>
            <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginTop:3 }}>{h?.date} · {h?.time}</div>
          </Card>
          <div style={{
            display:"flex", alignItems:"center", justifyContent:"space-between",
            background:"rgba(255,255,255,0.05)", borderRadius:12, padding:"11px 15px",
          }}>
            <span style={{ fontSize:14, color:"rgba(245,237,216,0.6)" }}>Quantity</span>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{
                width:32, height:32, borderRadius:8, background:C.earth,
                border:"none", color:C.cream, fontSize:18, cursor:"pointer",
              }}>−</button>
              <span style={{ fontSize:20, fontWeight:900, color:C.cream, minWidth:22, textAlign:"center" }}>{qty}</span>
              <button onClick={() => setQty(q => Math.min(selP.qty, q + 1))} style={{
                width:32, height:32, borderRadius:8, background:C.leaf,
                border:"none", color:"#fff", fontSize:18, cursor:"pointer",
              }}>+</button>
            </div>
          </div>
        </div>
        <div style={{ padding:"11px 16px 20px", background:C.soil, borderTop:"1px solid rgba(255,255,255,0.07)", flexShrink:0 }}>
          <Btn full onClick={() => addToCart(selP, qty)}>Add to Order — {jmd(selP.price * qty)}</Btn>
        </div>
      </Shell>
    );
  }

  // ── Checkout ──
  if (view === "checkout") {
    return (
      <Shell>
        <TopBar title="Your Order" onBack={() => setView("list")} />
        <div style={{ flex:1, overflowY:"auto", padding:"16px 16px 100px" }}>
          <div style={{ marginBottom:20 }}>
            {cart.map(item => (
              <div key={item.id} style={{
                display:"flex", alignItems:"center", gap:11,
                padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.06)",
              }}>
                <span style={{ fontSize:24 }}>{item.e}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:C.cream, fontSize:13 }}>{item.name}</div>
                  <div style={{ fontSize:11, color:"rgba(245,237,216,0.5)" }}>× {item.qty} {item.unit}</div>
                </div>
                <span style={{ fontSize:13, fontWeight:700, color:C.gold }}>{jmd(item.price * item.qty)}</span>
              </div>
            ))}
            <div style={{ display:"flex", justifyContent:"space-between", paddingTop:11, fontWeight:900 }}>
              <span style={{ color:C.cream }}>Total</span>
              <span style={{ color:C.gold, fontSize:17 }}>{jmd(cartTotal)}</span>
            </div>
          </div>

          <div style={{ fontSize:11, fontWeight:800, color:C.gold, letterSpacing:1, marginBottom:10 }}>SELECT YAAD STOP</div>
          {HUBS.filter(h => h.st !== "Full").map(h => (
            <div key={h.id} onClick={() => setSelHub(h.id)} style={{
              border:"1.5px solid " + (selHub === h.id ? C.lime : "rgba(255,255,255,0.08)"),
              background: selHub === h.id ? "rgba(46,107,53,0.14)" : "rgba(255,255,255,0.04)",
              borderRadius:12, padding:"12px 14px", marginBottom:9, cursor:"pointer",
            }}>
              <div style={{ fontWeight:800, color:C.cream, fontSize:13 }}>{h.name}</div>
              <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginTop:3 }}>{h.date} · {h.time}</div>
              <div style={{ fontSize:11, color:C.lime, marginTop:3 }}>{h.max - h.curr} slots left</div>
            </div>
          ))}

          {selHub && (
            <div style={{ marginTop:14 }}>
              <div style={{ fontSize:11, fontWeight:800, color:C.gold, letterSpacing:1, marginBottom:10 }}>PICKUP SLOT</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {gH(selHub)?.slots.map(s => (
                  <Chip key={s} label={s} active={slot === s} onClick={() => setSlot(s)} />
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ padding:"11px 16px 20px", background:C.soil, borderTop:"1px solid rgba(255,255,255,0.07)", flexShrink:0 }}>
          <Btn full disabled={!selHub || !slot} onClick={placeOrder}>Confirm Order ✓</Btn>
        </div>
      </Shell>
    );
  }

  // ── Confirmation ──
  if (view === "confirmed" && confirmed) {
    const h = gH(confirmed.hId);
    return (
      <Shell>
        <div style={{ flex:1, overflowY:"auto", padding:"36px 20px" }}>
          <div style={{ textAlign:"center", marginBottom:28 }}>
            <div style={{ fontSize:64, marginBottom:10 }}>✅</div>
            <h2 style={{ fontSize:28, fontWeight:900, color:C.cream, margin:0 }}>Order Confirmed!</h2>
            <div style={{ color:C.gold, fontSize:16, marginTop:8 }}>
              {confirmed.orders.map(o => o.id).join(" · ")}
            </div>
          </div>
          <Card style={{ marginBottom:14 }}>
            {confirmed.orders.map(o => {
              const p = gP(o.pId);
              return (
                <div key={o.id} style={{
                  display:"flex", justifyContent:"space-between",
                  padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,0.05)", fontSize:13,
                }}>
                  <span style={{ color:C.cream }}>{p?.e} {p?.name} × {o.qty}</span>
                  <span style={{ color:C.gold }}>{jmd(o.total)}</span>
                </div>
              );
            })}
            <div style={{ display:"flex", justifyContent:"space-between", paddingTop:9, fontWeight:900 }}>
              <span style={{ color:C.cream }}>Total</span>
              <span style={{ color:C.gold, fontSize:15 }}>{jmd(confirmed.total)}</span>
            </div>
          </Card>
          <Card style={{ marginBottom:22 }}>
            <div style={{ fontWeight:800, color:C.cream, marginBottom:5 }}>📍 {h?.name}</div>
            <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)" }}>{h?.date} · {confirmed.slot} slot · {h?.time}</div>
          </Card>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            <Btn full v="wa">📲 Share via WhatsApp</Btn>
            <Btn full v="outline" onClick={() => { setView("list"); setTab("orders"); }}>View My Orders</Btn>
          </div>
        </div>
      </Shell>
    );
  }

  // ── Main Tabs ──
  return (
    <Shell>
      <div style={{ flex:1, overflowY:"auto" }}>

        {/* HOME */}
        {tab === "home" && (
          <div>
            <div style={{
              padding:"16px 16px 12px",
              background:`linear-gradient(160deg, rgba(46,107,53,0.22), transparent)`,
              borderBottom:"1px solid rgba(255,255,255,0.07)",
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <div>
                  <div style={{ fontSize:20, fontWeight:900, color:C.cream }}>🌿 Farm to Yaad</div>
                  <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginTop:2 }}>Good morning · St. Andrew</div>
                </div>
                {cartQty > 0 && (
                  <button onClick={() => setView("checkout")} style={{
                    background:C.amber, border:"none", borderRadius:11,
                    padding:"8px 13px", cursor:"pointer", display:"flex", alignItems:"center", gap:6,
                  }}>
                    <span style={{ fontSize:15 }}>🛒</span>
                    <span style={{ fontSize:13, fontWeight:900, color:"#fff" }}>{cartQty}</span>
                  </button>
                )}
              </div>
              <div style={{
                background:"rgba(255,255,255,0.07)", borderRadius:11,
                padding:"9px 13px", fontSize:13, color:"rgba(245,237,216,0.35)", marginBottom:11,
              }}>🔍 Search products...</div>
              <div style={{ display:"flex", gap:7, overflowX:"auto", paddingBottom:2 }}>
                {CATS.map(c => <Chip key={c} label={c} active={cat === c} onClick={() => setCat(c)} />)}
              </div>
            </div>

            <div style={{ padding:"13px 16px 16px" }}>
              <div style={{ fontSize:11, fontWeight:800, color:C.gold, marginBottom:11, letterSpacing:0.8 }}>
                AVAILABLE THIS WEEK · {visible.length} ITEMS
              </div>
              {visible.map((p) => {
                const f = gF(p.fId);
                return (
                  <div key={p.id}
                    onClick={() => { setSelP(p); setQty(1); setView("detail"); }}
                    style={{
                      display:"flex", alignItems:"center", gap:12,
                      background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
                      borderRadius:13, padding:"12px 13px", marginBottom:9, cursor:"pointer",
                    }}>
                    <div style={{
                      width:48, height:48, borderRadius:11,
                      background:"rgba(46,107,53,0.17)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontSize:26, flexShrink:0,
                    }}>{p.e}</div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontWeight:800, color:C.cream, fontSize:14, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</div>
                      <div style={{ fontSize:11, color:"rgba(245,237,216,0.5)", marginTop:2 }}>
                        {f.photo} {f.name} · <Stars n={Math.round(f.rating)} /> {f.rating}
                      </div>
                      <div style={{ display:"flex", gap:6, marginTop:5 }}>
                        <Badge color={p.st === "Available" ? "green" : "amber"}>{p.st}</Badge>
                        <Badge color="grey">{p.qty} left</Badge>
                      </div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <div style={{ fontSize:14, fontWeight:800, color:C.gold }}>{jmd(p.price)}</div>
                      <div style={{ fontSize:10, color:"rgba(245,237,216,0.35)", marginTop:2 }}>/{p.unit}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* YAAD STOPS */}
        {tab === "yaad" && (
          <div>
            <TopBar title="📍 Yaad Stops" />
            <div style={{ padding:"13px 16px 16px" }}>
              {HUBS.map(h => (
                <Card key={h.id} style={{ marginBottom:12, opacity: h.st === "Full" ? 0.6 : 1 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:7 }}>
                    <h3 style={{ fontSize:16, fontWeight:800, color:C.cream, flex:1, paddingRight:8, margin:0 }}>{h.name}</h3>
                    <Badge color={h.st === "Open" ? "green" : "red"}>{h.st}</Badge>
                  </div>
                  <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginBottom:2 }}>📅 {h.date}</div>
                  <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginBottom:2 }}>🕐 {h.time}</div>
                  <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginBottom:11 }}>📍 {h.addr}</div>
                  <div style={{
                    background:"rgba(255,255,255,0.05)", borderRadius:8, padding:"7px 11px",
                    display:"flex", justifyContent:"space-between", fontSize:12,
                  }}>
                    <span style={{ color:"rgba(245,237,216,0.5)" }}>Bookings</span>
                    <span style={{ color:C.cream, fontWeight:700 }}>{h.curr}/{h.max}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* MY ORDERS */}
        {tab === "orders" && (
          <div>
            <TopBar title="📦 My Orders" />
            <div style={{ padding:"13px 16px 16px" }}>
              {orders.length === 0
                ? <div style={{ textAlign:"center", padding:"50px 20px", color:"rgba(245,237,216,0.3)" }}>
                    <div style={{ fontSize:44, marginBottom:10 }}>📭</div>
                    <div style={{ fontSize:15, fontWeight:700 }}>No orders yet</div>
                  </div>
                : orders.map(o => {
                    const p = gP(o.pId); const f = gF(o.fId); const h = gH(o.hId);
                    return (
                      <Card key={o.id} style={{ marginBottom:10, borderLeft:`3px solid ${o.status === "Confirmed" ? C.lime : C.bark}` }}>
                        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                          <span style={{ fontSize:12, color:C.gold, fontWeight:700 }}>{o.id}</span>
                          <Badge color={o.status === "Confirmed" ? "green" : "grey"}>{o.status}</Badge>
                        </div>
                        <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:6 }}>
                          <span style={{ fontSize:22 }}>{p?.e}</span>
                          <div style={{ flex:1 }}>
                            <div style={{ fontWeight:700, color:C.cream, fontSize:13 }}>{p?.name}</div>
                            <div style={{ fontSize:11, color:"rgba(245,237,216,0.5)" }}>× {o.qty} · {f?.name}</div>
                          </div>
                          <span style={{ fontSize:13, fontWeight:700, color:C.gold }}>{jmd(o.total)}</span>
                        </div>
                        <div style={{ fontSize:11, color:"rgba(245,237,216,0.4)" }}>📍 {h?.name} · {o.slot} · {o.date}</div>
                      </Card>
                    );
                  })
              }
            </div>
          </div>
        )}

        {/* ME */}
        {tab === "me" && (
          <div>
            <TopBar title="👤 Profile" />
            <div style={{ padding:"20px 16px" }}>
              <div style={{ textAlign:"center", marginBottom:22 }}>
                <div style={{
                  width:72, height:72, borderRadius:"50%", background:"rgba(46,107,53,0.2)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:40, margin:"0 auto 10px",
                }}>🧑🏾‍🍳</div>
                <div style={{ fontSize:20, fontWeight:800, color:C.cream }}>Keisha Morgan</div>
                <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginTop:3 }}>St. Andrew · Buyer since June 2025</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:9, marginBottom:20 }}>
                {[
                  { l:"Orders", v:orders.length },
                  { l:"Spent",  v:"$" + Math.round(orders.reduce((s, o) => s + o.total, 0) / 1000) + "K" },
                  { l:"Hubs",   v:3 },
                ].map(s => (
                  <Card key={s.l} style={{ textAlign:"center", padding:12 }}>
                    <div style={{ fontSize:20, fontWeight:800, color:C.gold }}>{s.v}</div>
                    <div style={{ fontSize:11, color:"rgba(245,237,216,0.5)", marginTop:3 }}>{s.l}</div>
                  </Card>
                ))}
              </div>
              <Btn full v="outline" onClick={onExit}>← Switch Role</Btn>
            </div>
          </div>
        )}
      </div>
      <Tabs tabs={BTABS} active={tab} onChange={setTab} />
    </Shell>
  );
}

// ─── FARMER APP ───────────────────────────────────────────────────────────────
function FarmerApp({ onExit }) {
  const me = FARMERS[0];
  const [tab,    setTab]    = useState("listings");
  const [prods,  setProds]  = useState(PRODUCTS.filter(p => p.fId === 1));
  const [screen, setScreen] = useState(null);
  const [form,   setForm]   = useState({ name:"", cat:"Produce", price:"", unit:"bunch", qty:"", hId:"1", desc:"" });
  const orders = INIT_ORDERS.filter(o => o.fId === 1);

  const FTABS = [
    { id:"listings", icon:"📋", label:"Listings" },
    { id:"orders",   icon:"📦", label:"Orders" },
    { id:"hub",      icon:"📍", label:"My Hub" },
    { id:"profile",  icon:"👤", label:"Profile" },
  ];

  const iS = {
    background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.1)",
    borderRadius:11, padding:"10px 12px", fontSize:14, color:C.cream, width:"100%", display:"block",
  };
  const lS = { fontSize:11, fontWeight:800, color:C.amber, letterSpacing:0.5, marginBottom:5, display:"block" };

  if (screen === "add") {
    const submit = () => {
      if (!form.name || !form.price || !form.qty) return;
      setProds(ps => [{
        id: Date.now(), fId:1, name:form.name, cat:form.cat,
        price:+form.price, unit:form.unit, qty:+form.qty,
        e:"🥬", st:"Available", hId:+form.hId, desc:form.desc, dates:"This week",
      }, ...ps]);
      setForm({ name:"", cat:"Produce", price:"", unit:"bunch", qty:"", hId:"1", desc:"" });
      setScreen(null);
    };
    return (
      <Shell>
        <TopBar title="Add Product" onBack={() => setScreen(null)} />
        <div style={{ flex:1, overflowY:"auto", padding:"14px 16px 110px" }}>

          <div style={{ marginBottom:13 }}>
            <span style={lS}>PRODUCT NAME</span>
            <input style={iS} placeholder="e.g. Fresh Callaloo" value={form.name}
              onChange={e => setForm(f => ({ ...f, name:e.target.value }))} />
          </div>

          <div style={{ marginBottom:13 }}>
            <span style={lS}>CATEGORY</span>
            <select style={{ ...iS, appearance:"none" }} value={form.cat}
              onChange={e => setForm(f => ({ ...f, cat:e.target.value }))}>
              {["Produce","Root Veg","Meat","Dairy","Bakery","Seafood"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:11, marginBottom:13 }}>
            <div>
              <span style={lS}>PRICE (JMD)</span>
              <input style={iS} placeholder="350" type="number" value={form.price}
                onChange={e => setForm(f => ({ ...f, price:e.target.value }))} />
            </div>
            <div>
              <span style={lS}>UNIT</span>
              <select style={{ ...iS, appearance:"none" }} value={form.unit}
                onChange={e => setForm(f => ({ ...f, unit:e.target.value }))}>
                {["bunch","lb","kg","each","dozen","quart"].map(u => <option key={u}>{u}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom:13 }}>
            <span style={lS}>QUANTITY AVAILABLE</span>
            <input style={iS} placeholder="10" type="number" value={form.qty}
              onChange={e => setForm(f => ({ ...f, qty:e.target.value }))} />
          </div>

          <div style={{ marginBottom:13 }}>
            <span style={lS}>YAAD STOP</span>
            <select style={{ ...iS, appearance:"none" }} value={form.hId}
              onChange={e => setForm(f => ({ ...f, hId:e.target.value }))}>
              {HUBS.filter(h => h.st !== "Full").map(h => (
                <option key={h.id} value={h.id}>{h.name} — {h.date}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom:13 }}>
            <span style={lS}>DESCRIPTION (OPTIONAL)</span>
            <textarea style={{ ...iS, minHeight:68, resize:"none" }} placeholder="Notes about the product..."
              value={form.desc} onChange={e => setForm(f => ({ ...f, desc:e.target.value }))} />
          </div>
        </div>
        <div style={{ padding:"11px 16px 20px", background:C.soil, borderTop:"1px solid rgba(255,255,255,0.07)", flexShrink:0 }}>
          <Btn full v="amber" onClick={submit} disabled={!form.name || !form.price || !form.qty}>
            List Product ✓
          </Btn>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div style={{ flex:1, overflowY:"auto" }}>

        {/* LISTINGS */}
        {tab === "listings" && (
          <div>
            <div style={{
              padding:"14px 16px 12px",
              background:`linear-gradient(160deg, rgba(107,58,31,0.3), transparent)`,
              borderBottom:"1px solid rgba(255,255,255,0.07)",
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ fontSize:18, fontWeight:900, color:C.cream }}>{me.photo} {me.name}</div>
                  <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginTop:2 }}>
                    <Stars n={Math.round(me.rating)} /> {me.rating} · {me.verified ? "✓ Verified" : ""} · {prods.length} listings
                  </div>
                </div>
                <Btn sm v="amber" onClick={() => setScreen("add")}>+ Add</Btn>
              </div>
            </div>
            <div style={{ padding:"13px 16px" }}>
              {prods.map(p => (
                <div key={p.id} style={{
                  background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)",
                  borderRadius:13, padding:"12px 13px", marginBottom:9,
                }}>
                  <div style={{ display:"flex", alignItems:"center", gap:11 }}>
                    <span style={{ fontSize:26 }}>{p.e}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:800, color:C.cream, fontSize:14 }}>{p.name}</div>
                      <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginTop:2 }}>
                        {jmd(p.price)}/{p.unit} · {p.qty} left
                      </div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6 }}>
                      <Badge color={p.st === "Available" ? "green" : p.st === "Low Stock" ? "amber" : "red"}>{p.st}</Badge>
                      <button
                        onClick={() => setProds(ps => ps.map(x => x.id !== p.id ? x : { ...x, st: x.st === "Sold Out" ? "Available" : "Sold Out" }))}
                        style={{
                          background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)",
                          borderRadius:6, padding:"3px 8px", fontSize:11,
                          color:"rgba(245,237,216,0.55)", cursor:"pointer",
                        }}>
                        {p.st === "Sold Out" ? "Restock" : "Sold Out"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab === "orders" && (
          <div>
            <TopBar title="📦 Incoming Orders" />
            <div style={{ padding:"13px 16px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, marginBottom:16 }}>
                <Card style={{ textAlign:"center", padding:13 }}>
                  <div style={{ fontSize:26, fontWeight:900, color:C.gold }}>
                    {orders.filter(o => o.status === "Confirmed").length}
                  </div>
                  <div style={{ fontSize:11, color:"rgba(245,237,216,0.5)", marginTop:3 }}>New Orders</div>
                </Card>
                <Card style={{ textAlign:"center", padding:13 }}>
                  <div style={{ fontSize:18, fontWeight:900, color:C.lime }}>
                    {jmd(orders.reduce((s, o) => s + o.total, 0))}
                  </div>
                  <div style={{ fontSize:11, color:"rgba(245,237,216,0.5)", marginTop:3 }}>This Week</div>
                </Card>
              </div>
              {orders.map(o => {
                const p = gP(o.pId); const h = gH(o.hId);
                return (
                  <Card key={o.id} style={{ marginBottom:10, borderLeft:`3px solid ${C.amber}` }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                      <span style={{ fontSize:12, fontWeight:700, color:C.gold }}>{o.id}</span>
                      <Badge color={o.status === "Confirmed" ? "green" : "grey"}>{o.status}</Badge>
                    </div>
                    <div style={{ fontWeight:700, color:C.cream, fontSize:13 }}>{p?.e} {p?.name} × {o.qty}</div>
                    <div style={{ fontSize:11, color:"rgba(245,237,216,0.5)", marginTop:4 }}>📍 {h?.name} · {o.slot}</div>
                    <div style={{ fontSize:13, fontWeight:800, color:C.gold, marginTop:5 }}>{jmd(o.total)}</div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* MY HUB */}
        {tab === "hub" && (
          <div>
            <TopBar title="📍 My Yaad Stop" />
            <div style={{ padding:"13px 16px" }}>
              <Card style={{ marginBottom:14, borderTop:`3px solid ${C.lime}` }}>
                <div style={{ fontSize:17, fontWeight:800, color:C.cream, marginBottom:8 }}>{HUBS[0].name}</div>
                <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginBottom:3 }}>📅 {HUBS[0].date}</div>
                <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginBottom:3 }}>🕐 {HUBS[0].time}</div>
                <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginBottom:12 }}>📍 {HUBS[0].addr}</div>
                <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:9, padding:"10px 12px", marginBottom:12 }}>
                  <div style={{ fontSize:11, color:"rgba(245,237,216,0.5)", marginBottom:3 }}>Orders at this hub</div>
                  <div style={{ fontSize:22, fontWeight:900, color:C.gold }}>{orders.filter(o => o.hId === 1).length}</div>
                </div>
                <Btn full v="wa">📲 Contact Coordinator</Btn>
              </Card>
              <div style={{ fontSize:11, fontWeight:800, color:C.gold, letterSpacing:0.8, marginBottom:10 }}>YOUR PRODUCTS HERE</div>
              {prods.filter(p => p.hId === 1).map(p => (
                <div key={p.id} style={{
                  display:"flex", alignItems:"center", gap:10,
                  padding:"9px 0", borderBottom:"1px solid rgba(255,255,255,0.06)",
                }}>
                  <span style={{ fontSize:20 }}>{p.e}</span>
                  <span style={{ flex:1, color:C.cream, fontWeight:700, fontSize:13 }}>{p.name}</span>
                  <Badge color={p.st === "Available" ? "green" : p.st === "Low Stock" ? "amber" : "red"}>{p.st}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE */}
        {tab === "profile" && (
          <div>
            <TopBar title="👤 Profile" />
            <div style={{ padding:"18px 16px" }}>
              <div style={{ textAlign:"center", marginBottom:20 }}>
                <div style={{
                  width:72, height:72, borderRadius:"50%", background:"rgba(107,58,31,0.3)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:42, margin:"0 auto 10px",
                }}>{me.photo}</div>
                <div style={{ fontSize:20, fontWeight:800, color:C.cream }}>{me.name}</div>
                <div style={{ display:"flex", justifyContent:"center", gap:7, marginTop:7, flexWrap:"wrap" }}>
                  {me.verified && <Badge color="green">✓ Verified</Badge>}
                  <Badge color="grey">St. Andrew</Badge>
                </div>
                <div style={{ marginTop:8 }}>
                  <Stars n={Math.round(me.rating)} />
                  <span style={{ fontSize:12, color:"rgba(245,237,216,0.6)", marginLeft:6 }}>
                    {me.rating} · {me.reviews} reviews
                  </span>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:9, marginBottom:18 }}>
                {[
                  { l:"Listings", v:prods.length },
                  { l:"Orders",   v:orders.length },
                  { l:"Earned",   v:"$" + Math.round(me.earnings / 1000) + "K" },
                ].map(s => (
                  <Card key={s.l} style={{ textAlign:"center", padding:12 }}>
                    <div style={{ fontSize:20, fontWeight:800, color:C.gold }}>{s.v}</div>
                    <div style={{ fontSize:11, color:"rgba(245,237,216,0.5)", marginTop:3 }}>{s.l}</div>
                  </Card>
                ))}
              </div>
              {RATINGS.filter(r => r.fId === 1).map((r, i) => (
                <Card key={i} style={{ marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontWeight:700, color:C.cream, fontSize:13 }}>{r.by}</span>
                    <Stars n={r.score} />
                  </div>
                  <p style={{ fontSize:12, color:"rgba(245,237,216,0.6)", fontStyle:"italic" }}>"{r.note}"</p>
                </Card>
              ))}
              <div style={{ marginTop:14 }}>
                <Btn full v="outline" onClick={onExit}>← Switch Role</Btn>
              </div>
            </div>
          </div>
        )}
      </div>
      <Tabs tabs={FTABS} active={tab} onChange={setTab} />
    </Shell>
  );
}

// ─── ADMIN APP ────────────────────────────────────────────────────────────────
function AdminApp({ onExit }) {
  const [tab,    setTab]    = useState("dash");
  const [hubs,   setHubs]   = useState(HUBS);
  const [screen, setScreen] = useState(null);
  const [form,   setForm]   = useState({
    name:"", addr:"", parish:"St. Andrew",
    date:"", timeStart:"", timeEnd:"",
    max:"50", coord:"", phone:"",
  });

  const ATABS = [
    { id:"dash",    icon:"📊", label:"Dashboard" },
    { id:"hubs",    icon:"📍", label:"Hubs" },
    { id:"orders",  icon:"📦", label:"Orders" },
    { id:"farmers", icon:"👥", label:"Farmers" },
  ];

  const iS = {
    background:"rgba(255,255,255,0.06)", border:"1.5px solid rgba(255,255,255,0.1)",
    borderRadius:11, padding:"10px 12px", fontSize:14, color:C.cream, width:"100%", display:"block",
  };
  const lS = { fontSize:11, fontWeight:800, color:C.amber, letterSpacing:0.5, marginBottom:5, display:"block" };

  if (screen === "new-hub") {
    const submit = () => {
      if (!form.name || !form.date) return;
      setHubs(h => [...h, {
        id: Date.now(), name:form.name, addr:form.addr, parish:form.parish,
        date:form.date, time:`${form.timeStart}–${form.timeEnd}`,
        slots:["Morning","Afternoon"], max:+form.max, curr:0,
        st:"Open", coord:form.coord,
      }]);
      setForm({ name:"", addr:"", parish:"St. Andrew", date:"", timeStart:"", timeEnd:"", max:"50", coord:"", phone:"" });
      setScreen(null);
      setTab("hubs");
    };
    return (
      <Shell>
        <TopBar title="Create Yaad Stop" onBack={() => setScreen(null)} />
        <div style={{ flex:1, overflowY:"auto", padding:"14px 16px 110px" }}>
          {[
            ["HUB NAME",    "name",      "e.g. Papine Community Centre"],
            ["ADDRESS",     "addr",      "Street address"],
            ["EVENT DATE",  "date",      "e.g. Friday, July 5"],
            ["START TIME",  "timeStart", "8:00 AM"],
            ["END TIME",    "timeEnd",   "12:00 PM"],
            ["MAX ORDERS",  "max",       "50"],
            ["COORDINATOR", "coord",     "e.g. Deacon Phillip"],
            ["PHONE",       "phone",     "876-555-XXXX"],
          ].map(([label, key, ph]) => (
            <div key={key} style={{ marginBottom:13 }}>
              <span style={lS}>{label}</span>
              <input style={iS} placeholder={ph} value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]:e.target.value }))} />
            </div>
          ))}
          <div style={{ marginBottom:13 }}>
            <span style={lS}>PARISH</span>
            <select style={{ ...iS, appearance:"none" }} value={form.parish}
              onChange={e => setForm(f => ({ ...f, parish:e.target.value }))}>
              {["St. Andrew","Kingston","St. Thomas","Portland","St. Mary","St. Ann",
                "Trelawny","St. James","Hanover","Westmoreland","St. Elizabeth",
                "Manchester","Clarendon","St. Catherine"].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>
        <div style={{ padding:"11px 16px 20px", background:C.soil, borderTop:"1px solid rgba(255,255,255,0.07)", flexShrink:0 }}>
          <Btn full v="amber" onClick={submit} disabled={!form.name || !form.date}>Create Yaad Stop ✓</Btn>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div style={{ flex:1, overflowY:"auto" }}>

        {/* DASHBOARD */}
        {tab === "dash" && (
          <div>
            <div style={{
              padding:"14px 16px 12px",
              background:`linear-gradient(160deg, rgba(61,31,13,0.6), transparent)`,
              borderBottom:"1px solid rgba(255,255,255,0.07)",
            }}>
              <div style={{ fontSize:20, fontWeight:900, color:C.cream }}>🛠️ Admin Panel</div>
              <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginTop:2 }}>St. Andrew Parish · Week of Jun 21</div>
            </div>
            <div style={{ padding:"13px 16px" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:9, marginBottom:16 }}>
                {[
                  { l:"Active Hubs",    v:hubs.filter(h => h.st === "Open").length,      i:"📍" },
                  { l:"Total Orders",   v:hubs.reduce((s, h) => s + h.curr, 0),           i:"📦" },
                  { l:"Farmers",        v:FARMERS.length,                                  i:"👩🏾‍🌾" },
                  { l:"Pending Verify", v:FARMERS.filter(f => !f.verified).length,        i:"⏳" },
                ].map(s => (
                  <Card key={s.l} style={{ textAlign:"center", padding:13 }}>
                    <div style={{ fontSize:22 }}>{s.i}</div>
                    <div style={{ fontSize:26, fontWeight:900, color:C.gold, marginTop:3 }}>{s.v}</div>
                    <div style={{ fontSize:11, color:"rgba(245,237,216,0.5)", marginTop:3 }}>{s.l}</div>
                  </Card>
                ))}
              </div>
              <div style={{ fontSize:11, fontWeight:800, color:C.gold, letterSpacing:0.8, marginBottom:10 }}>UPCOMING YAAD STOPS</div>
              {hubs.map(h => (
                <Card key={h.id} style={{ marginBottom:10, borderLeft:`3px solid ${h.st === "Open" ? C.lime : h.st === "Full" ? "#e07070" : C.amber}` }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
                    <span style={{ fontWeight:800, color:C.cream, fontSize:13, flex:1, paddingRight:8 }}>{h.name}</span>
                    <Badge color={h.st === "Open" ? "green" : h.st === "Full" ? "red" : "amber"}>{h.st}</Badge>
                  </div>
                  <div style={{ fontSize:11, color:"rgba(245,237,216,0.5)" }}>{h.date} · {h.curr}/{h.max} orders</div>
                </Card>
              ))}
              <div style={{ marginTop:13 }}>
                <Btn full v="amber" onClick={() => setScreen("new-hub")}>+ Create New Yaad Stop</Btn>
              </div>
            </div>
          </div>
        )}

        {/* HUBS */}
        {tab === "hubs" && (
          <div>
            <TopBar title="📍 Yaad Stops" right={<Btn sm v="amber" onClick={() => setScreen("new-hub")}>+ New</Btn>} />
            <div style={{ padding:"13px 16px" }}>
              {hubs.map(h => (
                <Card key={h.id} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:7 }}>
                    <h3 style={{ fontSize:15, fontWeight:800, color:C.cream, flex:1, paddingRight:8, margin:0 }}>{h.name}</h3>
                    <Badge color={h.st === "Open" ? "green" : h.st === "Full" ? "red" : "amber"}>{h.st}</Badge>
                  </div>
                  <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginBottom:2 }}>📅 {h.date} · {h.time}</div>
                  <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)", marginBottom:10 }}>📍 {h.addr}</div>
                  <div style={{ display:"flex", gap:7, alignItems:"center", marginBottom:7 }}>
                    <div style={{ flex:1, background:"rgba(255,255,255,0.05)", borderRadius:3, height:4, overflow:"hidden" }}>
                      <div style={{ height:"100%", background:C.lime, width:Math.round(h.curr / h.max * 100) + "%", borderRadius:3 }} />
                    </div>
                    <span style={{ fontSize:11, color:"rgba(245,237,216,0.5)", flexShrink:0 }}>{h.curr}/{h.max}</span>
                  </div>
                  <div style={{ fontSize:11, color:"rgba(245,237,216,0.3)" }}>Coordinator: {h.coord}</div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab === "orders" && (
          <div>
            <TopBar title="📦 All Orders" />
            <div style={{ padding:"13px 16px" }}>
              {[...INIT_ORDERS, ...INIT_ORDERS.map(o => ({
                ...o, id:"FTY-" + Math.floor(5000 + Math.random() * 4000), status:"Collected",
              }))].map((o, i) => {
                const p = gP(o.pId); const f = gF(o.fId); const h = gH(o.hId);
                return (
                  <Card key={o.id + i} style={{ marginBottom:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                      <span style={{ fontSize:12, fontWeight:700, color:C.gold }}>{o.id}</span>
                      <Badge color={o.status === "Confirmed" ? "green" : "grey"}>{o.status}</Badge>
                    </div>
                    <div style={{ fontWeight:700, color:C.cream, fontSize:13, marginBottom:3 }}>{p?.e} {p?.name} × {o.qty}</div>
                    <div style={{ fontSize:11, color:"rgba(245,237,216,0.5)" }}>{f?.name} → {h?.name}</div>
                    <div style={{ fontSize:13, fontWeight:800, color:C.gold, marginTop:5 }}>{jmd(o.total)}</div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* FARMERS */}
        {tab === "farmers" && (
          <div>
            <TopBar title="👥 Farmers" />
            <div style={{ padding:"13px 16px" }}>
              {FARMERS.map(f => (
                <Card key={f.id} style={{ marginBottom:11 }}>
                  <div style={{ display:"flex", gap:11, alignItems:"center" }}>
                    <div style={{
                      width:44, height:44, borderRadius:11, background:"rgba(107,58,31,0.25)",
                      fontSize:24, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                    }}>{f.photo}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap", marginBottom:3 }}>
                        <span style={{ fontWeight:800, color:C.cream, fontSize:14 }}>{f.name}</span>
                        <Badge color={f.verified ? "green" : "red"}>{f.verified ? "✓ Verified" : "Pending"}</Badge>
                      </div>
                      <div style={{ fontSize:12, color:"rgba(245,237,216,0.5)" }}>{f.community} · {f.types.join(", ")}</div>
                    </div>
                  </div>
                  {!f.verified && (
                    <div style={{ marginTop:10, display:"flex", gap:8 }}>
                      <Btn sm>Verify ✓</Btn>
                      <Btn sm v="outline">View</Btn>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      <Tabs tabs={ATABS} active={tab} onChange={setTab} />
    </Shell>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [role, setRole] = useState(null);
  if (!role)          return <RoleSelect onSelect={setRole} />;
  if (role === "buyer")  return <BuyerApp  onExit={() => setRole(null)} />;
  if (role === "farmer") return <FarmerApp onExit={() => setRole(null)} />;
  if (role === "admin")  return <AdminApp  onExit={() => setRole(null)} />;
  return null;
}
