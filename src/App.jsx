import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { supabase } from "./supabaseClient.js";
const Hero3D = lazy(() => import("./Hero3D.jsx"));
import { TOPICS } from "./data/topics.js";
import { SCENARIOS } from "./data/scenarios.js";
import { BLOGS } from "./data/blogs.js";
import { QUIZ_QUESTIONS } from "./data/quiz.js";
import { ABEND_CODES, ABEND_CATEGORIES, SEVERITY_COLORS, SEVERITY_LABELS } from "./data/abends.js";
import { ROADMAP_LEVELS } from "./data/roadmap.js";

/* ═══════════════════════════════════════════════════════════════════════════
   MAINFRAME OS HUB — A to Z Knowledge Platform
   Topics · Quiz · Scenarios · Blogs · Weekly AI Updates
═══════════════════════════════════════════════════════════════════════════ */

/* ─── WHATSAPP COMMUNITY CHAT DATA ────────────────────────────────────── */
const CHAT_MEMBERS = [
  { name:"Harikrishnan", role:"Admin • Founder", color:"#00b365", status:"online", emoji:"👑" },
  { name:"Ravi Kumar", role:"Senior COBOL Dev", color:"#0071e3", status:"online", emoji:"💻" },
  { name:"Priya Sharma", role:"COBOL Expert", color:"#9b59b6", status:"online", emoji:"📘" },
  { name:"Arun Patel", role:"DB2 Specialist", color:"#e67e22", status:"away", emoji:"🗄️" },
  { name:"Meera Nair", role:"JCL Developer", color:"#e74c3c", status:"offline", emoji:"⚙️" },
  { name:"Suresh Reddy", role:"CICS Analyst", color:"#d4a017", status:"online", emoji:"🔧" },
  { name:"Anitha Das", role:"Trainee", color:"#27ae60", status:"online", emoji:"🌱" },
  { name:"Vikram Singh", role:"IMS Developer", color:"#8e44ad", status:"away", emoji:"📊" },
];
const CT = { TEXT:"text", JOB:"job", DOUBT:"doubt", THOUGHT:"thought", SYS:"system", POLL:"poll" };
const CHAT_REACTIONS = ["👍","❤️","😂","🔥","💡","🎯"];
const CHAT_SEED = [
  { id:1,sender:-1,type:CT.SYS,text:"Harikrishnan created group \"MainframeStudyHub\"",time:"9:00 AM",reactions:{},del:false },
  { id:2,sender:0,type:CT.TEXT,text:"Welcome to MainframeStudyHub Community! 🎉\nLearn, share, post jobs & help each other grow in the mainframe world.",time:"9:01 AM",reactions:{"🔥":[1,2,3],"❤️":[4,5]},del:false },
  { id:3,sender:2,type:CT.THOUGHT,text:"COBOL is experiencing a renaissance — banks desperately need devs who understand legacy systems. Golden opportunity!",time:"9:15 AM",reactions:{"💡":[0,1,3]},del:false },
  { id:4,sender:1,type:CT.JOB,text:"🏢 TCS — Mainframe Developer\n📍 Hyderabad / Chennai\n⏳ 2–5 yrs\n🛠️ COBOL, JCL, DB2, CICS\n💰 8–15 LPA\n📅 Apply before March 30",time:"9:30 AM",reactions:{"👍":[2,4,6]},del:false },
  { id:5,sender:6,type:CT.DOUBT,text:"Can someone explain COMP vs COMP-1 vs COMP-2 vs COMP-3 in COBOL? 😅",time:"9:45 AM",reactions:{},del:false },
  { id:6,sender:2,type:CT.TEXT,text:"Great question!\n• COMP → Binary\n• COMP-1 → Single-precision float\n• COMP-2 → Double-precision float\n• COMP-3 → Packed decimal (most common)\n\nFor financial calcs, always COMP-3!",time:"9:50 AM",reactions:{"🎯":[6,0],"👍":[5]},replyTo:5,del:false },
  { id:7,sender:3,type:CT.JOB,text:"🏢 Infosys — DB2 DBA\n📍 Bangalore (Remote OK)\n⏳ 3–7 yrs\n🛠️ DB2 z/OS, SQL, Perf Tuning\n💰 12–22 LPA\n✉️ DM for referral!",time:"10:05 AM",reactions:{"❤️":[1,6]},del:false },
  { id:8,sender:5,type:CT.DOUBT,text:"S0C7 abend with packed-decimal intermittently in production — can't reproduce in test 😤",time:"10:20 AM",reactions:{"💡":[2]},del:false },
  { id:9,sender:0,type:CT.TEXT,text:"S0C7 with packed decimal:\n1. Data corruption in file\n2. Missing INITIALIZE\n3. Redefines overlapping\n\nCheck abend solver on our site!",time:"10:25 AM",reactions:{"🔥":[5,1,2]},replyTo:8,del:false },
  { id:10,sender:7,type:CT.THOUGHT,text:"Just completed IBM Z Xplore Advanced badge! Hands-on labs are incredible for learning real z/OS environments.",time:"10:40 AM",reactions:{"👍":[0,2,6],"🔥":[1]},del:false },
  { id:11,sender:4,type:CT.TEXT,text:"Anyone worked with CICS Web Services? Trying to expose COBOL as REST API 😂",time:"11:00 AM",reactions:{"😂":[1,3,5]},del:false },
  { id:12,sender:1,type:CT.POLL,text:"Next week's deep-dive topic?",pollOpts:[{text:"CICS Web Services",votes:[2,4,7]},{text:"DB2 Performance",votes:[0,3]},{text:"JCL Utilities",votes:[5,6]},{text:"REXX Scripting",votes:[1]}],time:"11:15 AM",reactions:{},del:false },
];

/* ─── COOL USER AVATAR ─────────────────────────────────────────────────── */
/* ─── Darken color for accessible text contrast ─── */
function darkenColor(hex, amount=0.35) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return `#${Math.round(r*(1-amount)).toString(16).padStart(2,'0')}${Math.round(g*(1-amount)).toString(16).padStart(2,'0')}${Math.round(b*(1-amount)).toString(16).padStart(2,'0')}`;
}

const AVATAR_GRADIENTS = [
  ["#FF6B6B","#EE5A24"],["#0071e3","#7c3aed"],["#00b894","#00cec9"],
  ["#e17055","#fdcb6e"],["#6c5ce7","#a29bfe"],["#fd79a8","#e84393"],
  ["#00b365","#20bf6b"],["#f78fb3","#cf6a87"],["#3dc1d3","#0984e3"],
  ["#e77f67","#f5cd79"],["#546de5","#574b90"],["#e15f41","#c44569"],
  ["#00d2d3","#01a3a4"],["#ff9ff3","#f368e0"],["#feca57","#ff6348"],
  ["#1dd1a1","#10ac84"],["#54a0ff","#2e86de"],["#5f27cd","#341f97"],
];
const AVATAR_EMOJIS = ["🚀","⚡","🔥","💎","🌟","🎯","💻","🧠","🦊","🐉","🎮","🌈","🎸","🏆","🛡️","🔮","👾","🤖"];
const AVATAR_PATTERNS = ["dots","rings","waves","grid","diamond"];

function hashStr(s) { let h=0; for(let i=0;i<(s||"").length;i++){h=((h<<5)-h)+(s||"U").charCodeAt(i);h|=0;} return Math.abs(h); }

function UserAvatar({ name, size=36, showRing=false, onClick, style:extraStyle }) {
  const h = hashStr(name);
  const grad = AVATAR_GRADIENTS[h % AVATAR_GRADIENTS.length];
  const emoji = AVATAR_EMOJIS[h % AVATAR_EMOJIS.length];
  const pattern = AVATAR_PATTERNS[h % AVATAR_PATTERNS.length];
  const initial = (name||"U").charAt(0).toUpperCase();
  const useEmoji = h % 3 === 0;
  const [hovered, setHovered] = useState(false);

  let patternSvg = "";
  if (pattern === "dots") patternSvg = `<circle cx='4' cy='4' r='1.5' fill='rgba(255,255,255,0.15)'/><circle cx='12' cy='12' r='1.5' fill='rgba(255,255,255,0.15)'/>`;
  else if (pattern === "rings") patternSvg = `<circle cx='8' cy='8' r='6' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1.5'/>`;
  else if (pattern === "waves") patternSvg = `<path d='M0 8 Q4 4 8 8 T16 8' fill='none' stroke='rgba(255,255,255,0.12)' stroke-width='1.5'/>`;
  else if (pattern === "grid") patternSvg = `<line x1='0' y1='8' x2='16' y2='8' stroke='rgba(255,255,255,0.08)' stroke-width='1'/><line x1='8' y1='0' x2='8' y2='16' stroke='rgba(255,255,255,0.08)' stroke-width='1'/>`;
  else if (pattern === "diamond") patternSvg = `<polygon points='8,2 14,8 8,14 2,8' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/>`;

  const bgPattern = `url("data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E${encodeURIComponent(patternSvg)}%3C/svg%3E")`;

  return (
    <div onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{
        position:"relative", width:size, height:size, flexShrink:0,
        cursor: onClick ? "pointer" : "default",
        perspective: "200px", transformStyle:"preserve-3d",
        ...extraStyle
      }}>
      {/* Animated spinning ring */}
      {showRing && <div style={{
        position:"absolute", inset:-3, borderRadius:"50%",
        background:`conic-gradient(${grad[0]}, ${grad[1]}, transparent, ${grad[0]})`,
        animation:"spin 3s linear infinite",
        opacity: hovered ? 1 : 0.7,
        transition:"opacity 0.3s",
      }} />}
      {/* Glow pulse behind avatar */}
      {showRing && <div style={{
        position:"absolute", inset:-6, borderRadius:"50%",
        background:`radial-gradient(circle, ${grad[0]}40, transparent 70%)`,
        animation:"avatarPulse 2s ease-in-out infinite",
        zIndex:0,
      }} />}
      {/* Main avatar circle with 3D transform */}
      <div className="avatar-3d" style={{
        width:size, height:size, borderRadius:"50%",
        background:`linear-gradient(135deg, ${grad[0]}, ${grad[1]})`,
        backgroundImage:`${bgPattern}, linear-gradient(135deg, ${grad[0]}, ${grad[1]})`,
        display:"flex", alignItems:"center", justifyContent:"center",
        color:"#fff", fontSize: useEmoji ? size*0.5 : size*0.42, fontWeight:800,
        fontFamily:"-apple-system,sans-serif",
        boxShadow: hovered
          ? `0 8px 25px ${grad[0]}60, 0 0 15px ${grad[1]}30, inset 0 -2px 6px rgba(0,0,0,0.15)`
          : showRing
            ? `0 4px 16px ${grad[0]}40, inset 0 -2px 4px rgba(0,0,0,0.1)`
            : `0 2px 8px ${grad[0]}30, inset 0 -1px 3px rgba(0,0,0,0.1)`,
        border: showRing ? "2.5px solid rgba(255,255,255,0.9)" : "none",
        position:"relative", zIndex:1,
        letterSpacing:"-0.5px",
        textShadow:"0 1px 3px rgba(0,0,0,0.25)",
        transform: hovered ? "rotateY(15deg) rotateX(-10deg) scale(1.1)" : "rotateY(0) rotateX(0) scale(1)",
        transition:"transform 0.3s ease, box-shadow 0.3s ease",
        backfaceVisibility:"hidden",
      }}>
        {/* Inner highlight for 3D depth */}
        <div style={{
          position:"absolute", top:"8%", left:"15%", width:"35%", height:"25%",
          borderRadius:"50%", background:"rgba(255,255,255,0.25)",
          filter:"blur(3px)", pointerEvents:"none",
        }} />
        {useEmoji ? emoji : initial}
      </div>
    </div>
  );
}
/* ─── END AVATAR ───────────────────────────────────────────────────────── */

/* ─── COMMUNITY CANVAS (particle network for 3D CTA) ─────────────────── */
function CommCanvas({ style }) {
  const ref = useRef(null), anim = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    const resize = () => { c.width = c.offsetWidth * 2; c.height = c.offsetHeight * 2; ctx.scale(2,2); };
    resize(); window.addEventListener("resize", resize);
    const nodes = Array.from({length:7},(_,i) => ({ x:Math.random()*c.offsetWidth, y:Math.random()*c.offsetHeight, vx:(Math.random()-0.5)*0.5, vy:(Math.random()-0.5)*0.5, r:14+Math.random()*10, col:CHAT_MEMBERS[i%8].color, em:CHAT_MEMBERS[i%8].emoji, ph:Math.random()*Math.PI*2 }));
    const pts = Array.from({length:35},() => ({ x:Math.random()*c.offsetWidth, y:Math.random()*c.offsetHeight, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3, r:1+Math.random()*2, a:0.2+Math.random()*0.4 }));
    let t = 0;
    const draw = () => {
      t += 0.016; const w = c.offsetWidth, h = c.offsetHeight;
      ctx.clearRect(0,0,w,h);
      for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) { const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y); if(d<180){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(0,113,227,${(1-d/180)*0.12})`;ctx.lineWidth=1;ctx.stroke();} }
      pts.forEach(p => { p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,113,227,${p.a*0.4})`;ctx.fill(); });
      nodes.forEach(n => {
        n.x+=n.vx+Math.sin(t+n.ph)*0.3;n.y+=n.vy+Math.cos(t*0.7+n.ph)*0.3;if(n.x<n.r||n.x>w-n.r)n.vx*=-1;if(n.y<n.r||n.y>h-n.r)n.vy*=-1;
        const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,n.r*2.2);g.addColorStop(0,n.col+"25");g.addColorStop(1,"transparent");ctx.beginPath();ctx.arc(n.x,n.y,n.r*2.2,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
        ctx.beginPath();ctx.arc(n.x,n.y,n.r,0,Math.PI*2);ctx.fillStyle=n.col+"18";ctx.strokeStyle=n.col+"40";ctx.lineWidth=1.5;ctx.fill();ctx.stroke();
        ctx.font=`${n.r*0.85}px sans-serif`;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(n.em,n.x,n.y+1);
      });
      anim.current = requestAnimationFrame(draw);
    };
    anim.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(anim.current); window.removeEventListener("resize",resize); };
  },[]);
  return <canvas ref={ref} style={{ position:"absolute",inset:0,width:"100%",height:"100%",...style }} />;
}

/* ─── CHAT AVATAR ─────────────────────────────────────────────────────── */
function CA({m,sz=34}){return(<div style={{width:sz,height:sz,borderRadius:"50%",background:`linear-gradient(135deg,${m.color}20,${m.color}08)`,border:`2px solid ${m.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:sz*0.45,flexShrink:0,position:"relative"}}>{m.emoji}{m.status==="online"&&<div style={{position:"absolute",bottom:0,right:0,width:9,height:9,borderRadius:"50%",background:"#00b365",border:"2px solid #fff"}}/>}</div>);}

/* ─── CHAT MESSAGE ────────────────────────────────────────────────────── */
function ChatBubble({msg,members,self,onReact,onReply,onDel,onStar,starred}){
  const[showR,setShowR]=useState(false);const[hov,setHov]=useState(false);
  const isSelf=msg._isSelf||false,isSys=msg.type===CT.SYS;
  const sender=isSys?null:{name:msg._name||"User",role:msg._role||"",color:msg._color||"#0071e3",emoji:msg._emoji||"🧑‍💻",status:"online"};
  const replyMsg=msg.replyTo!=null?null:null; // reply preview disabled for DB messages
  if(msg.del)return<div style={{display:"flex",justifyContent:isSelf?"flex-end":"flex-start",padding:"2px 16px",opacity:0.4}}><div style={{padding:"6px 14px",borderRadius:12,background:"#f5f5f7",fontStyle:"italic",fontSize:13,color:"#666"}}>🚫 Deleted</div></div>;
  if(isSys)return<div style={{display:"flex",justifyContent:"center",padding:"8px 16px"}}><div style={{padding:"4px 16px",borderRadius:20,background:"#f0f7ff",border:"1px solid #d0e3ff",fontSize:12,color:"#555"}}>{msg.text}</div></div>;
  const tc={[CT.JOB]:{bg:"#f5f0ff",bd:"#e0d0ff",ic:"💼",lb:"Job"}, [CT.DOUBT]:{bg:"#fff8f0",bd:"#ffe0c0",ic:"❓",lb:"Doubt"}, [CT.THOUGHT]:{bg:"#f0f7ff",bd:"#c0d8ff",ic:"💭",lb:"Thought"}, [CT.POLL]:{bg:"#faf0ff",bd:"#e0c8ff",ic:"📊",lb:"Poll"}}[msg.type];
  return(
    <div style={{display:"flex",justifyContent:isSelf?"flex-end":"flex-start",padding:"3px 16px",alignItems:"flex-end",gap:8}} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>{setHov(false);setShowR(false);}}>
      {!isSelf&&sender&&<CA m={sender} sz={28}/>}
      <div style={{maxWidth:"75%",minWidth:100,position:"relative"}}>
        {hov&&<div style={{position:"absolute",top:-8,[isSelf?"left":"right"]:0,display:"flex",gap:2,background:"#fff",border:"1px solid #e8e8ed",borderRadius:8,padding:"2px 4px",zIndex:5,boxShadow:"0 2px 8px rgba(0,0,0,0.08)"}}>
          <button onClick={()=>setShowR(!showR)} style={_ab} aria-label="React">😊</button><button onClick={()=>onReply(msg)} style={_ab} aria-label="Reply">↩️</button><button onClick={()=>onStar(msg.id)} style={_ab} aria-label="Bookmark">{starred?"⭐":"☆"}</button>{isSelf&&<button onClick={()=>onDel(msg.id)} style={_ab} aria-label="Delete">🗑️</button>}
        </div>}
        {showR&&<div style={{position:"absolute",top:-40,[isSelf?"left":"right"]:0,display:"flex",gap:2,background:"#fff",border:"1px solid #e8e8ed",borderRadius:12,padding:"4px 6px",zIndex:10,boxShadow:"0 4px 16px rgba(0,0,0,0.1)"}}>
          {CHAT_REACTIONS.map(r=><button key={r} onClick={()=>{onReact(msg.id,r);setShowR(false);}} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,padding:"2px 4px",borderRadius:6}} aria-label={"React with "+r}>{r}</button>)}
        </div>}
        <div style={{background:isSelf?"linear-gradient(135deg,#0071e3,#0055b0)":tc?tc.bg:"#f5f5f7",border:`1px solid ${isSelf?"#0060c0":tc?tc.bd:"#e8e8ed"}`,borderRadius:isSelf?"16px 16px 4px 16px":"16px 16px 16px 4px",padding:"8px 12px"}}>
          {tc&&<div style={{fontSize:10,fontWeight:700,color:"#666",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.5px"}}>{tc.ic} {tc.lb}</div>}
          {!isSelf&&sender&&<div style={{fontSize:12,fontWeight:700,color:sender.color,marginBottom:3}}>{sender.name} {sender.emoji}</div>}
          {replyMsg&&<div style={{padding:"4px 8px",marginBottom:6,borderLeft:`3px solid ${members[replyMsg.sender]?.color||"#0071e3"}`,background:"rgba(0,0,0,0.03)",borderRadius:"0 6px 6px 0",fontSize:11,color:"#666"}}><span style={{color:members[replyMsg.sender]?.color,fontWeight:600}}>{members[replyMsg.sender]?.name}</span><div style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:220}}>{replyMsg.text}</div></div>}
          {msg.type===CT.POLL&&msg.pollOpts?<div><div style={{fontSize:14,color:isSelf?"#fff":"#1d1d1f",marginBottom:8,fontWeight:600}}>{msg.text}</div>{msg.pollOpts.map((o,i)=>{const tot=msg.pollOpts.reduce((s,x)=>s+x.votes.length,0);const pct=tot>0?(o.votes.length/tot)*100:0;return<div key={i} style={{marginBottom:6,position:"relative",borderRadius:8,overflow:"hidden",background:"rgba(0,0,0,0.03)",border:"1px solid rgba(0,0,0,0.05)"}}><div style={{position:"absolute",top:0,left:0,height:"100%",width:`${pct}%`,background:"rgba(0,113,227,0.1)"}} /><div style={{position:"relative",padding:"6px 10px",display:"flex",justifyContent:"space-between",fontSize:13,color:"#1d1d1f"}}><span>{o.text}</span><span style={{color:"#0071e3",fontWeight:600}}>{o.votes.length} ({Math.round(pct)}%)</span></div></div>;})}</div>
          :<div style={{fontSize:14,color:isSelf?"#fff":"#1d1d1f",whiteSpace:"pre-wrap",lineHeight:1.45}}>{msg.text}</div>}
          <div style={{fontSize:10,color:isSelf?"rgba(255,255,255,0.6)":"#666",marginTop:4,textAlign:"right"}}>{msg.time}{isSelf&&" ✓✓"}</div>
        </div>
        {Object.keys(msg.reactions).length>0&&<div style={{display:"flex",gap:4,marginTop:2,flexWrap:"wrap",justifyContent:isSelf?"flex-end":"flex-start"}}>
          {Object.entries(msg.reactions).map(([em,us])=><span key={em} onClick={()=>onReact(msg.id,em)} style={{background:us.includes(self)?"#e8f4fd":"#f5f5f7",border:`1px solid ${us.includes(self)?"#b0d4f1":"#e8e8ed"}`,borderRadius:12,padding:"1px 6px",fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",gap:3}}>{em}<span style={{fontSize:10,color:"#666"}}>{us.length}</span></span>)}
        </div>}
      </div>
    </div>
  );
}
const _ab={background:"none",border:"none",cursor:"pointer",fontSize:14,padding:"2px 4px",borderRadius:4};

/* ─── ADD MEMBER MODAL ────────────────────────────────────────────────── */
function AddMemModal({onClose,onAdd,existing}){
  const[nm,setNm]=useState("");const[rl,setRl]=useState("");
  const cols=["#e74c3c","#e67e22","#d4a017","#27ae60","#0071e3","#6366f1","#9b59b6","#ec4899"];
  const emos=["🧑‍💻","👨‍🔧","👩‍💼","🧑‍🎓","👨‍🏫","👩‍🔬","🧑‍🚀","🦸"];
  const[col,setCol]=useState(cols[4]);const[emo,setEmo]=useState(emos[0]);
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",backdropFilter:"blur(8px)"}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:20,padding:28,width:360,maxWidth:"90vw",boxShadow:"0 20px 60px rgba(0,0,0,0.15)"}}>
        <h3 style={{margin:"0 0 20px",fontSize:18,fontWeight:700,color:"#1d1d1f"}}>Add New Member</h3>
        <input value={nm} onChange={e=>setNm(e.target.value)} placeholder="Name" style={{width:"100%",boxSizing:"border-box",padding:"10px 14px",borderRadius:10,border:"1.5px solid #e8e8ed",background:"#f5f5f7",color:"#1d1d1f",fontSize:14,outline:"none",marginBottom:10}} />
        <input value={rl} onChange={e=>setRl(e.target.value)} placeholder="Role (e.g. COBOL Developer)" style={{width:"100%",boxSizing:"border-box",padding:"10px 14px",borderRadius:10,border:"1.5px solid #e8e8ed",background:"#f5f5f7",color:"#1d1d1f",fontSize:14,outline:"none",marginBottom:16}} />
        <div style={{marginBottom:12}}><div style={{fontSize:12,color:"#666",marginBottom:6}}>Color</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{cols.map(c=><div key={c} onClick={()=>setCol(c)} style={{width:28,height:28,borderRadius:"50%",background:c,cursor:"pointer",border:col===c?"3px solid #1d1d1f":"3px solid transparent"}} />)}</div></div>
        <div style={{marginBottom:20}}><div style={{fontSize:12,color:"#666",marginBottom:6}}>Avatar</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{emos.map(e=><div key={e} onClick={()=>setEmo(e)} style={{width:36,height:36,borderRadius:8,background:emo===e?"#e8f4fd":"#f5f5f7",border:emo===e?"2px solid #0071e3":"2px solid transparent",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,cursor:"pointer"}}>{e}</div>)}</div></div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={onClose} style={{flex:1,padding:"10px",borderRadius:10,border:"1.5px solid #e8e8ed",background:"transparent",color:"#666",cursor:"pointer",fontSize:14}}>Cancel</button>
          <button onClick={()=>{if(!nm.trim())return;if(existing.includes(nm.trim())){alert("Exists!");return;}onAdd({name:nm.trim(),role:rl.trim()||"Member",color:col,emoji:emo,status:"online"});onClose();}} style={{flex:1,padding:"10px",borderRadius:10,border:"none",background:"#0071e3",color:"#fff",cursor:"pointer",fontWeight:700,fontSize:14}}>Add</button>
        </div>
      </div>
    </div>
  );
}

const FF = "-apple-system,'SF Pro Display','SF Pro Text','Helvetica Neue',Arial,sans-serif";
const MONO = "'SF Mono','Fira Code','Cascadia Code',monospace";

/* ─── WEEKLY UPDATE ENGINE ───────────────────────────────────────────────── */
/* ─── WEEKLY UPDATE ENGINE (with built-in fallback content) ──────────────── */
const WEEKLY_FALLBACKS = {
  zos: {
    tip: { title: "Understanding z/OS Address Space Limits", content: "Every z/OS address space has storage limits that directly impact application behavior. The 16MB 'line' and 2GB 'bar' are architectural boundaries from 24-bit and 31-bit addressing eras. Modern applications should use 64-bit (above the bar) storage for large data buffers.\n\nWhen you encounter S878 or S80A abends, the first diagnostic step is checking REGION allocation vs actual usage via SMF Type 30 records. Use IEFUSI exit to enforce region limits per job class rather than relying on JCL REGION parameters." },
    scenario: { question: "A production CICS region is experiencing intermittent S80A abends during peak hours. The DSA is configured at 256MB. What's your approach?", answer: "First, check CICS statistics for DSA usage trends (EXEC CICS INQUIRE SYSTEM). Review EDSA vs DSA allocation — if EDSA is exhausted but DSA has room, programs may not be compiled with RENT/RMODE(ANY). Check for storage leaks using CICS auxiliary trace. Increase EDSALIM to 512MB as immediate relief while investigating the root cause program." },
    code: { title: "Check z/OS Storage Usage via REXX", snippet: "/* REXX - Display address space storage */\nARG JOBNAME\nRC = ISFCALLS('ON')\nISFPREFIX = JOBNAME\nISFCOLS = 'JNAME STPCP STECP REGION'\nADDRESS SDSF \"ISFEXEC DA\"\nDO IX = 1 TO JNAME.0\n  SAY JNAME.IX 'CPU:' STPCP.IX,\n      'Region:' REGION.IX\nEND\nRC = ISFCALLS('OFF')", explanation: "This REXX script queries SDSF to display active address space storage usage. Useful for quick capacity checks during peak processing." },
    facts: ["z/OS can manage up to 16 EB (exabytes) of virtual storage per address space in 64-bit mode", "The z/OS master scheduler address space has been running continuously since the first MVS release in 1974", "IBM Z processors can execute over 12.5 billion instructions per second per core"],
    generatedDate: new Date().toLocaleDateString()
  },
  jcl: {
    tip: { title: "JCLLIB ORDER vs STEPLIB Performance", content: "A common performance pitfall is using STEPLIB on every step when JCLLIB ORDER would be more efficient. JCLLIB ORDER is resolved at JCL conversion time by JES2, meaning the system locates procedures and includes before execution begins.\n\nSTEPLIB, on the other hand, is searched at program load time for every EXEC PGM= statement. For jobs with 20+ steps, this difference can add up to measurable elapsed time. Best practice: use JCLLIB for PROCs and STEPLIB only when you need step-specific load libraries." },
    scenario: { question: "A batch job JOB23456 is failing with JCL ERROR - IEF212I. The job worked fine yesterday. What do you check?", answer: "IEF212I means a dataset was not found during allocation. Steps: (1) Check JESMSGLG for the exact dataset name in error. (2) Verify the dataset exists using LISTCAT. (3) Check if a GDG rolled off — if using relative generation (+0, -1), a new generation may have shifted references. (4) Check for a renamed or migrated dataset via HSM. (5) If using symbolics, verify SET statements resolve correctly with MSGLEVEL=(2,1)." },
    code: { title: "Dynamic Dataset Name with System Symbols", snippet: "//DYNJOB   JOB ,'DYNAMIC DSN',CLASS=A,NOTIFY=&SYSUID\n//*\n// SET ENV=PROD\n// SET DT=&LYYMMDD\n//*\n//STEP1    EXEC PGM=SORT\n//SORTIN   DD DSN=&ENV..DAILY.TRANS.D&DT,DISP=SHR\n//SORTOUT  DD DSN=&ENV..DAILY.SORTED.D&DT,\n//            DISP=(NEW,CATLG,DELETE),\n//            SPACE=(CYL,(50,25),RLSE)\n//SYSIN    DD *\n  SORT FIELDS=(1,10,CH,A)\n/*\n//SYSOUT   DD SYSOUT=*", explanation: "This JCL uses system symbols (&LYYMMDD for current date) and SET statements to create dynamic dataset names. Eliminates manual date changes in production JCL." },
    facts: ["JCL has been in continuous use since 1964 — over 60 years of backward compatibility", "A single z/OS system can process over 100,000 batch jobs per day", "The maximum number of steps in a single JCL job is 255"],
    generatedDate: new Date().toLocaleDateString()
  },
  cobol: {
    tip: { title: "Enterprise COBOL V6 JSON GENERATE", content: "Enterprise COBOL V6.3+ includes native JSON GENERATE and JSON PARSE statements, eliminating the need for external libraries or complex string manipulation to handle JSON data.\n\nJSON GENERATE creates JSON from COBOL data structures automatically. Combined with z/OS Connect, this means COBOL programs can natively produce API responses. The key optimization: use the COUNT IN clause to get the exact byte count of generated JSON, and NAME OF clause to customize JSON key names from COBOL data names." },
    scenario: { question: "A COBOL batch program processes 50 million records and takes 4 hours. Management wants it under 2 hours. What optimization strategies do you apply?", answer: "1) Check BLKSIZE — increase to half-track (27998 for 3390). 2) Use SORT for pre-processing instead of COBOL logic. 3) Add VSAM LSR buffers (BUFND=20+). 4) Replace COMPUTE with ADD/SUBTRACT for simple math. 5) Use BINARY (COMP) instead of DISPLAY for counters. 6) Check for unnecessary PERFORM loops. 7) Use DB2 multi-row FETCH if DB2-dependent. 8) Consider splitting into parallel streams." },
    code: { title: "COBOL JSON GENERATE Example", snippet: "       01 EMPLOYEE-RECORD.\n          05 EMP-ID        PIC X(6).\n          05 EMP-NAME      PIC X(30).\n          05 EMP-SALARY    PIC 9(8)V99.\n          05 EMP-DEPT      PIC X(4).\n       01 JSON-OUTPUT      PIC X(500).\n       01 JSON-LENGTH      PIC 9(4) COMP.\n\n       PROCEDURE DIVISION.\n           MOVE '100234' TO EMP-ID\n           MOVE 'JOHN SMITH' TO EMP-NAME\n           MOVE 85000.00 TO EMP-SALARY\n           MOVE 'FIN'  TO EMP-DEPT\n\n           JSON GENERATE JSON-OUTPUT\n             FROM EMPLOYEE-RECORD\n             COUNT IN JSON-LENGTH\n             NAME OF EMP-ID IS 'employeeId'\n             NAME OF EMP-NAME IS 'name'\n             NAME OF EMP-SALARY IS 'salary'\n             NAME OF EMP-DEPT IS 'department'\n           END-JSON", explanation: "Native JSON generation in COBOL — no external libraries needed. The NAME OF clause maps COBOL field names to clean JSON keys." },
    facts: ["There are approximately 220 billion lines of COBOL code in active production worldwide", "95% of ATM transactions globally involve COBOL code at some point", "Enterprise COBOL V6 can generate optimized code that runs up to 30% faster than V4"],
    generatedDate: new Date().toLocaleDateString()
  },
  rexx: { tip:{title:"REXX OUTTRAP for Dynamic Output Capture",content:"OUTTRAP lets you capture TSO command output into REXX stem variables for programmatic processing. This is incredibly powerful for automation — you can issue any TSO or ISPF command and parse the results.\n\nCombine OUTTRAP with LISTDS, LISTCAT, or SDSF commands to build monitoring scripts that check dataset status, job output, or system health without manual intervention."},scenario:{question:"Write a REXX script that checks if a dataset exists and creates it if not.",answer:"Use SYSDSN() function: if SYSDSN(dsname)='OK' then dataset exists. Otherwise use ALLOC command to create it. Always include error handling with SIGNAL ON ERROR."},code:{title:"REXX Dataset Checker",snippet:"/* REXX - Check and create dataset */\nPARSE ARG DSNAME\nIF SYSDSN(\"'\"DSNAME\"'\") = 'OK' THEN DO\n  SAY DSNAME 'already exists'\n  EXIT 0\nEND\nELSE DO\n  SAY 'Creating' DSNAME\n  \"ALLOC DA('\"DSNAME\"') NEW CATALOG\",\n    \"SPACE(10,5) CYLINDERS\",\n    \"RECFM(F B) LRECL(80) BLKSIZE(27920)\"\n  IF RC = 0 THEN SAY 'Created successfully'\n  ELSE SAY 'Error RC=' RC\nEND",explanation:"Uses SYSDSN() for existence check and TSO ALLOC for creation. Production-ready pattern for automation scripts."},facts:["REXX was created by Mike Cowlishaw at IBM in 1979","REXX is the primary scripting language on z/OS, z/VM, and OS/2","The REXX language specification is an ANSI standard (X3.274-1996)"],generatedDate:new Date().toLocaleDateString()},
  vsam: { tip:{title:"VSAM CI/CA Split Prevention",content:"Control interval and control area splits are the #1 cause of VSAM performance degradation. CI splits cause record movement within a CI, while CA splits require allocating entire new control areas.\n\nPrevention: schedule regular REORGs, monitor FREESPACE usage via LISTCAT, and set appropriate CI/CA FREESPACE percentages. For high-insert workloads, FREESPACE(20 10) is a good starting point."},scenario:{question:"VSAM KSDS performance has degraded over time. LISTCAT shows 45% CI splits. What's your recovery plan?",answer:"1) REPRO the dataset to sequential backup. 2) DELETE the VSAM cluster. 3) DEFINE new cluster with better FREESPACE. 4) REPRO data back. 5) Schedule regular REORG. Also check for sequential inserts that might benefit from key-range partitioning."},code:{title:"IDCAMS Health Check",snippet:"//VSAMCHK  EXEC PGM=IDCAMS\n//SYSPRINT DD SYSOUT=*\n//SYSIN    DD *\n  LISTCAT ENTRIES(MY.VSAM.KSDS) -\n    ALL\n  IF LASTCC = 0 THEN -\n    PRINT INFILE(VSAMDD) -\n      COUNT(5)\n/*\n//VSAMDD   DD DSN=MY.VSAM.KSDS,DISP=SHR",explanation:"LISTCAT ALL shows splits, FREESPACE usage, and extent info — essential for VSAM health monitoring."},facts:["VSAM KSDS supports up to 255 alternate indexes","A single VSAM dataset can span up to 59 volumes","VSAM RLS (Record Level Sharing) enables multi-system access in a Sysplex"],generatedDate:new Date().toLocaleDateString()},
  db2: { tip:{title:"DB2 EXPLAIN and Access Path Analysis",content:"Always EXPLAIN your SQL before deploying to production. DB2's optimizer chooses access paths based on statistics — if RUNSTATS hasn't been run recently, the optimizer may make poor decisions.\n\nKey things to check in EXPLAIN output: tablespace scans (should be index access for OLTP), sort operations (expensive for large result sets), and join methods (nested loop vs merge scan vs hybrid join)."},scenario:{question:"A DB2 SQL query that ran in 2 seconds yesterday now takes 45 seconds. Code hasn't changed. What happened?",answer:"Most likely cause: stale statistics. Run RUNSTATS on the affected tables and indexes. Other causes: lock contention (check DB2 DISPLAY THREAD), buffer pool pressure (check SMF 101), index reorganization needed (check CLUSTERRATIO), or an LPAR change affecting CPU allocation."},code:{title:"DB2 Performance SQL",snippet:"SELECT SUBSTR(PROGNAME,1,8) AS PROGRAM,\n       DECIMAL(CPU_TIME,10,2) AS CPU_SEC,\n       DECIMAL(ELAPSED,10,2) AS ELAPSED_SEC,\n       GETPAGES,\n       CLASS1_ELAPSED\n  FROM SYSIBM.SYSPACKSTMT\n WHERE ELAPSED > 5.0\n ORDER BY ELAPSED DESC\n FETCH FIRST 20 ROWS ONLY;",explanation:"Query the DB2 catalog to find slow SQL statements. ELAPSED > 5 seconds flags potential performance problems for investigation."},facts:["DB2 for z/OS processes over 10 billion transactions daily across all installations","DB2 z/OS supports tables up to 128 TB with up to 750 columns","DB2 13 introduced AI-powered query optimization capabilities"],generatedDate:new Date().toLocaleDateString()},
  cics: { tip:{title:"CICS Channel and Container Pattern",content:"Modern CICS programming uses channels and containers instead of COMMAREAs for data passing. Channels have no size limit (COMMAREAs max at 32KB) and support named containers for structured data exchange.\n\nThis pattern enables CICS programs to exchange large XML/JSON documents and supports the microservices architecture within CICS."},scenario:{question:"CICS transactions are experiencing ATSP abends during peak. What does this mean and how do you fix it?",answer:"ATSP means a transaction is being purged because it exceeded the DTIMOUT (deadlock timeout) value. Check: 1) DB2 lock contention via DSNV409I messages, 2) VSAM record-level locking waits, 3) CICS enqueue waits. Immediate fix: increase DTIMOUT. Root cause: reduce lock hold times, use READ UPDATE only when needed, commit frequently."},code:{title:"CICS Channel/Container Example",snippet:"       EXEC CICS PUT CONTAINER('REQUEST')\n            CHANNEL('MYSERVICE')\n            FROM(WS-REQUEST-DATA)\n            FLENGTH(LENGTH OF WS-REQUEST-DATA)\n       END-EXEC\n\n       EXEC CICS LINK PROGRAM('SVCPROG1')\n            CHANNEL('MYSERVICE')\n       END-EXEC\n\n       EXEC CICS GET CONTAINER('RESPONSE')\n            CHANNEL('MYSERVICE')\n            INTO(WS-RESPONSE-DATA)\n            FLENGTH(WS-RESP-LEN)\n       END-EXEC",explanation:"Channel/Container pattern replaces COMMAREA for modern CICS. No 32KB limit, named data containers, cleaner interface."},facts:["CICS handles over 1.2 million transactions per second at peak globally","CICS Transaction Server has been in production since 1968","Over 80% of Fortune 500 companies use CICS for mission-critical applications"],generatedDate:new Date().toLocaleDateString()},
  imsdb: { tip:{title:"IMS Fast Path for Ultra-Low Latency",content:"IMS Fast Path (DEDBs and MSDBs) provides sub-millisecond response times by keeping data and indexes in memory. DEDBs (Data Entry Databases) are designed for high-insert workloads like ATM transactions.\n\nFast Path bypasses traditional IMS logging for certain operations, trading some recovery granularity for extreme performance."},scenario:{question:"IMS batch program fails with U0778 abend. What's the cause?",answer:"U0778 is an IMS user abend indicating a DL/I status code that the program didn't handle. Check the PCB status code — common causes: GE (segment not found), II (duplicate key on INSERT), AI (open failure). Review the program's status code checking logic after each DL/I call."},code:{title:"IMS DL/I REPL Call",snippet:"       CALL 'CBLTDLI' USING GU-FUNC\n                             PCB-MASK\n                             EMPLOYEE-SEGMENT\n                             SSA-EMPID.\n       IF PCB-STATUS = SPACES\n          MOVE NEW-SALARY TO EMP-SALARY\n          CALL 'CBLTDLI' USING REPL-FUNC\n                                PCB-MASK\n                                EMPLOYEE-SEGMENT\n       END-IF.",explanation:"IMS GU (Get Unique) retrieves a segment, then REPL (Replace) updates it. Always check PCB status code between calls."},facts:["IMS has been in continuous production use since 1966","IMS can process over 50,000 transactions per second per IMS system","IMS manages some of the largest databases in the world — several exceeding 50TB"],generatedDate:new Date().toLocaleDateString()},
  ca7: { tip:{title:"CA7 Cross-Platform Scheduling",content:"Modern CA7 (now Broadcom AutoSys/CA7) integrates with distributed schedulers, enabling cross-platform job dependencies. A z/OS batch job can trigger a Linux job on completion, and vice versa.\n\nUse CA7 XPJOB definitions for cross-platform jobs and NJE for cross-system z/OS dependencies."},scenario:{question:"CA7 job PAYMST01 is in LATE status. Predecessor EXTRACT1 completed but CA7 didn't trigger PAYMST01. Why?",answer:"Check: 1) SCHID — does PAYMST01 have correct schedule ID for today? 2) Resource dependencies — is a required dataset or tape drive available? 3) COND code — did EXTRACT1 end with an acceptable return code? 4) Manual hold — someone may have placed a HOLD. 5) Calendar — verify the calendar allows execution today."},code:{title:"CA7 Job Definition",snippet:"//* CA7 Commands for job management\n//*\n//* Define a new job\nDEMAND,JOB=PAYMST01,DOESSION=025,\n  LEADTM=0015,JCLID=01,MAINID=ALL\n//*\n//* Add predecessor dependency\nDBADD,JOB=PAYMST01,PRE=EXTRACT1,\n  TYPE=JOB,PRESSION=025\n//*\n//* Check job status\nLJOB,JOB=PAYMST01",explanation:"CA7 DEMAND submits on-demand, DBADD defines dependencies. PREID links predecessor jobs."},facts:["CA7 manages over 1 million batch jobs daily at large enterprises","Broadcom AutoSys WA (formerly CA7) supports scheduling across 20+ platforms","Average enterprise runs 50,000-200,000 scheduled batch jobs per day"],generatedDate:new Date().toLocaleDateString()},
  security: { tip:{title:"RACF PassTicket for SSO Integration",content:"RACF PassTickets provide one-time-use authentication tokens that enable Single Sign-On (SSO) between z/OS and distributed systems. A web application authenticates the user once, generates a PassTicket, and passes it to z/OS — no password transmitted.\n\nPassTickets are time-limited (default 10 minutes) and can only be used once, making them more secure than password-based authentication for automated processes."},scenario:{question:"Audit found that 200+ RACF user IDs have the SPECIAL attribute. How do you remediate?",answer:"SPECIAL gives full RACF admin authority — it should be limited to 3-5 security admins maximum. Steps: 1) SEARCH CLASS(USER) SPECIAL to list all. 2) Categorize: identify true admins vs unnecessary grants. 3) Remove SPECIAL with ALTUSER id NOSPECIAL. 4) Create group-level CONNECT authorities for delegated administration instead. 5) Implement RACF auditing on SETROPTS to detect future unauthorized grants."},code:{title:"RACF Audit Report",snippet:"//* Generate RACF security audit report\n//AUDIT    EXEC PGM=ICETOOL\n//TOOLMSG  DD SYSOUT=*\n//DFSMSG   DD SYSOUT=*\n//SMFIN    DD DSN=MY.SMF.TYPE80,DISP=SHR\n//REPORT   DD SYSOUT=A\n//TOOLIN   DD *\n  DISPLAY FROM(SMFIN) LIST(REPORT) -\n    TITLE('RACF Security Events') -\n    DATE TIME -\n    ON(15,8,CH,HEADER('USERID')) -\n    ON(30,44,CH,HEADER('RESOURCE')) -\n    ON(80,1,CH,HEADER('ACCESS'))\n/*",explanation:"Process SMF Type 80 (RACF) records with ICETOOL to generate security audit reports — essential for SOX and PCI-DSS compliance."},facts:["RACF manages security for over 90% of all z/OS installations worldwide","z/OS with RACF holds EAL5+ Common Criteria certification — highest for any commercial OS","A single RACF database can contain over 10 million profiles"],generatedDate:new Date().toLocaleDateString()},
  tso: { tip:{title:"ISPF Edit Macros for Productivity",content:"ISPF edit macros can automate repetitive editing tasks. Written in REXX or CLIST, they execute within the ISPF editor context and can manipulate lines, search for patterns, and apply bulk changes.\n\nCreate a macro that automatically adds standard headers to COBOL programs, reformats JCL, or validates coding standards."},scenario:{question:"How do you search across all members of a PDS for a specific string?",answer:"Use ISPF 3.14 (Search-For utility): specify the PDS name, search string, and optionally member name pattern. For more advanced searching: SuperC (ISRSUPC) supports wildcard patterns, column-specific searches, and comparison between two libraries."},code:{title:"REXX Edit Macro",snippet:"/* REXX ISPF Edit Macro */\n\"ISREDIT MACRO\"\n\"ISREDIT (LN) = LINENUM .ZFIRST\"\n\"ISREDIT (LL) = LINENUM .ZLAST\"\nDO I = LN TO LL\n  \"ISREDIT (LINE) = LINE\" I\n  IF POS('FIXME', LINE) > 0 THEN DO\n    \"ISREDIT LABEL\" I \"= .FX\"\n    SAY 'Found FIXME at line' I\n  END\nEND\n\"ISREDIT CURSOR = 1 0\"\nEXIT 0",explanation:"This edit macro scans all lines for 'FIXME' comments and labels them for quick navigation. Run with COMMAND ===> FINDFIX in the ISPF editor."},facts:["ISPF has been the primary mainframe development interface since 1975","TSO/ISPF supports up to 32,767 lines in a single PDS member","Over 3 million developers worldwide use ISPF daily"],generatedDate:new Date().toLocaleDateString()},
  procs: { tip:{title:"DFSORT JOINKEYS for Complex File Matching",content:"JOINKEYS is more powerful than ICETOOL SPLICE for complex joins. It supports inner join, left outer join, full outer join, and unpaired record handling — all in a single SORT step.\n\nThe REFORMAT statement controls which fields from each file appear in the output. Use F1: and F2: prefixes to reference fields from each input file."},scenario:{question:"You need to compare two files and produce three outputs: matched records, records only in file 1, and records only in file 2. How?",answer:"Use DFSORT JOINKEYS with JOIN UNPAIRED,F1,F2 and three OUTFIL statements: one for matched (both F1 and F2 present), one for F1-only (F2 fields are spaces), one for F2-only (F1 fields are spaces). Check the REFORMAT fields for spaces to determine which file the record came from."},code:{title:"DFSORT 3-Way Split",snippet:"//SPLIT3  EXEC PGM=SORT\n//FILE1   DD DSN=MY.OLD.MASTER,DISP=SHR\n//FILE2   DD DSN=MY.NEW.EXTRACT,DISP=SHR\n//MATCH   DD DSN=MY.MATCHED,DISP=(,CATLG)\n//ONLY1   DD DSN=MY.DELETED,DISP=(,CATLG)\n//ONLY2   DD DSN=MY.NEW.RECS,DISP=(,CATLG)\n//SYSIN   DD *\n  JOINKEYS FILE=F1,FIELDS=(1,10,A)\n  JOINKEYS FILE=F2,FIELDS=(1,10,A)\n  JOIN UNPAIRED,F1,F2\n  REFORMAT FIELDS=(F1:1,80,F2:1,80)\n  OUTFIL FNAMES=MATCH,\n    INCLUDE=(1,80,CH,NE,C' ',&,81,80,CH,NE,C' ')\n  OUTFIL FNAMES=ONLY1,\n    INCLUDE=(1,80,CH,NE,C' ',&,81,80,CH,EQ,C' ')\n  OUTFIL FNAMES=ONLY2,SAVE\n/*",explanation:"Full outer join with JOINKEYS produces matched and unmatched records. Three OUTFIL statements split the output based on which file contributed data."},facts:["DFSORT is installed on virtually every z/OS system worldwide","ICETOOL can process files up to 16 EB (exabytes) in size","DFSORT processes data at I/O speeds — often 10-100x faster than equivalent COBOL programs"],generatedDate:new Date().toLocaleDateString()},
  smf: { tip:{title:"Streaming SMF to Splunk for Real-Time Analytics",content:"Modern enterprises stream SMF records to Splunk, ELK, or Grafana in near-real-time using IBM Z IZOLDA (IBM Z Operational Log and Data Analytics) or custom programs that read SMF datasets and publish to Kafka.\n\nThis enables unified monitoring dashboards that show mainframe metrics alongside distributed system metrics — a key requirement for hybrid cloud operations."},scenario:{question:"CPU utilization spiked to 98% during the batch window. How do you identify the culprit?",answer:"1) RMF Monitor II for real-time view of top consumers. 2) SMF Type 30 subtype 3 (step termination) sorted by CPU time. 3) Check WLM service class performance — was the spike in production batch or development? 4) Compare to baseline — is this normal for month-end? 5) Check for runaway programs (CPU loop) using D A,L console command."},code:{title:"SMF Type 30 CPU Report",snippet:"//CPURPT   EXEC PGM=SORT\n//SORTIN   DD DSN=MY.SMF.DUMP,DISP=SHR\n//SORTOUT  DD SYSOUT=A,\n//            DCB=(RECFM=FBA,LRECL=133)\n//SYSIN    DD *\n  INCLUDE COND=(6,1,BI,EQ,X'1E',&,\n               23,1,BI,EQ,X'03')\n  SORT FIELDS=(340,4,BI,D)\n  OUTFIL HEADER1=(1:C'1',5:C'TOP CPU CONSUMERS',\n    50:C'DATE: ',DATE1),\n    OUTREC=(1:C' ',\n            5:19,8,CH,\n            15:C'CPU=',340,4,BI,\n            30:C'ELAPSED=',336,4,BI),\n    STOPAFT=20\n/*",explanation:"Extract top 20 CPU consumers from SMF Type 30 records. Filter for subtype 3 (step termination) and sort by CPU time descending."},facts:["A busy z/OS system generates 500GB+ of SMF data per day","SMF has recorded mainframe activity continuously since 1972","Over 200 SMF record types exist, covering every subsystem on z/OS"],generatedDate:new Date().toLocaleDateString()},
  modernization: { tip:{title:"Strangler Fig Pattern for COBOL Modernization",content:"The Strangler Fig pattern is the safest modernization approach. Instead of rewriting everything, you gradually route new functionality to modern services while the COBOL monolith continues handling existing logic.\n\nUse z/OS Connect as the API facade. New features are built as microservices (on OpenShift or cloud). As each function is replicated, traffic is redirected from COBOL to the new service until the original program can be retired."},scenario:{question:"Leadership wants to expose a 30-year-old CICS/COBOL application as a mobile API. Timeline: 3 months. What's your plan?",answer:"1) Week 1-2: Inventory CICS transactions and map to REST resources. 2) Week 3-4: Install and configure z/OS Connect EE. 3) Week 5-8: Create service definitions mapping JSON to COBOL copybooks. 4) Week 9-10: Build API definitions with OpenAPI specs. 5) Week 11-12: Security (OAuth2), testing, and performance validation. Zero code changes to COBOL."},code:{title:"z/OS Connect Service Mapping",snippet:"// z/OS Connect service.json\n{\n  \"name\": \"customerService\",\n  \"version\": \"2.0.0\",\n  \"description\": \"Customer lookup\",\n  \"connection\": {\n    \"type\": \"cicsConnection\",\n    \"cicsServer\": \"CICSPROD\",\n    \"transactionId\": \"CINQ\",\n    \"commarea\": {\n      \"requestCopybook\": \"CINQREQ\",\n      \"responseCopybook\": \"CINQRSP\"\n    }\n  }\n}",explanation:"z/OS Connect maps REST endpoints to CICS transactions. The COBOL copybook structure is automatically converted to/from JSON."},facts:["75% of mainframe rewrite projects fail to meet their objectives","z/OS Connect can expose a CICS transaction as a REST API in under 2 hours","IBM estimates $3 trillion in daily commerce relies on mainframe applications"],generatedDate:new Date().toLocaleDateString()},
  linuxonz: { tip:{title:"Hardware Crypto Acceleration on Linux on Z",content:"Linux on Z automatically benefits from CPACF (CP Assist for Cryptographic Functions) — hardware encryption built into every Z processor at no additional cost. OpenSSL and libica detect and use it automatically.\n\nFor TLS-heavy workloads (HTTPS APIs, encrypted databases), Linux on Z achieves significantly higher throughput than x86 because encryption has zero CPU overhead."},scenario:{question:"You're consolidating 200 x86 Linux VMs onto a single z15 LPAR. What capacity planning approach do you use?",answer:"1) Measure current x86 workloads (CPU, memory, I/O). 2) Use IBM zPCR (Processor Capacity Reference) to convert x86 metrics to IFL equivalents. 3) Factor in z/VM overhead (~5-10%). 4) Account for memory sharing benefit (CMM can reduce total memory 30-50%). 5) Size for peak + 20% growth. Typically 200 x86 VMs consolidate to 8-12 IFLs."},code:{title:"Check Crypto Hardware on Linux on Z",snippet:"# Check for hardware crypto support\ncat /proc/cpuinfo | grep -i 'Machine type'\nlsmod | grep -i 'aes\\|sha\\|des'\n\n# Check if OpenSSL uses hardware crypto\nopenssl speed -evp aes-256-gcm\nopenssl engine -t\n# Should show: ibmca engine available\n\n# Enable hardware crypto if not active\nmodprobe aes_s390\nmodprobe sha256_s390\nmodprobe des_s390",explanation:"Verify hardware crypto is active. If ibmca engine is loaded, all TLS/encryption operations use zero-overhead hardware acceleration."},facts:["A single IBM z16 can run up to 2 million Linux Docker containers","Linux on Z with z/VM can achieve 10:1 to 20:1 consolidation ratios vs x86","IBM LinuxONE Emperor 4 holds the record for most Linux guests on a single system"],generatedDate:new Date().toLocaleDateString()},
};

async function fetchWeeklyUpdate(topic) {
  // Try built-in fallback content first (works offline)
  if (WEEKLY_FALLBACKS[topic.id]) {
    return WEEKLY_FALLBACKS[topic.id];
  }
  // Generic fallback for topics without specific content
  return {
    tip: { title: `${topic.title} — Pro Tip of the Week`, content: `Explore the ${topic.title} sections on this site for in-depth coverage. Each section includes practical examples, code samples, and interview questions to help you master ${topic.title} from beginner to professional level.\n\nStay tuned — new tips and scenarios are added regularly to keep your mainframe skills sharp.` },
    scenario: { question: `What is the most common performance issue with ${topic.title} and how do you diagnose it?`, answer: `Performance issues in ${topic.title} typically relate to resource contention, suboptimal configuration, or inefficient code patterns. Use SMF records, RMF reports, and system traces to identify bottlenecks. Check the ${topic.title} sections on this site for detailed troubleshooting guides.` },
    code: { title: `${topic.title} Quick Reference`, snippet: `//* See the ${topic.title} topic sections\n//* for comprehensive code examples\n//* covering beginner to expert level`, explanation: `Visit the ${topic.title} topic for detailed code examples with explanations.` },
    facts: [`${topic.title} is a critical component of IBM Z enterprise computing`, `Mastering ${topic.title} is essential for mainframe professionals`, `This site covers ${topic.sections?.length || 10}+ sections on ${topic.title}`],
    generatedDate: new Date().toLocaleDateString()
  };
}

/* ─── STORAGE HELPERS ────────────────────────────────────────────────── */
async function saveUpdate(topicId, update) {
  try { localStorage.setItem("weekly_" + topicId, JSON.stringify(update)); localStorage.setItem("lastUpdate", new Date().toISOString()); } catch {}
}
async function loadUpdate(topicId) {
  try { const r = localStorage.getItem("weekly_" + topicId); return r ? JSON.parse(r) : null; } catch { return null; }
}
async function loadLastUpdate() {
  try { return localStorage.getItem("lastUpdate"); } catch { return null; }
}

/* ─── MAIN APP ───────────────────────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState(() => {
    const hash = window.location.hash.replace("#","");
    return ["home","topics","scenarios","blog","quiz","playground","community","abends","roadmap","weekly","about"].includes(hash) ? hash : "home";
  });
  
  // Sync page state with URL hash
  useEffect(() => {
    window.location.hash = page === "home" ? "" : page;
  }, [page]);
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#","");
      if (h && h !== page) setPage(h);
      else if (!h && page !== "home") setPage("home");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [page]);
  
  /* ─── Defer 3D scene to avoid blocking main thread ─── */
  const [show3D, setShow3D] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth <= 768) return;
    // Load 3D only after user scrolls or after 6s idle — whichever comes first
    let loaded = false;
    const load3D = () => { if (!loaded) { loaded = true; setShow3D(true); } };
    const timer = setTimeout(load3D, 6000);
    const onScroll = () => { load3D(); window.removeEventListener("scroll", onScroll); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(timer); window.removeEventListener("scroll", onScroll); };
  }, []);
  const [activeTopic, setActiveTopic] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [quiz, setQuiz] = useState({ index: 0, score: 0, selected: null, done: false, showExp: false });
  const [quizTopicFilter, setQuizTopicFilter] = useState("All");
  
  /* ─── AUTH STATE (moved up to avoid TDZ) ─── */
  const [user, setUser] = useState(null);
  const quizQuestions = quizTopicFilter === "All" ? QUIZ_QUESTIONS : QUIZ_QUESTIONS.filter(q => q.topic === quizTopicFilter);
  const QUIZ_TOPICS = ["All", ...Array.from(new Set(QUIZ_QUESTIONS.map(q => q.topic)))];

  /* ─── DAILY CHALLENGE ─── */
  const [dailyMode, setDailyMode] = useState(false);
  const [dailyTimer, setDailyTimer] = useState(0);
  const dailyTimerRef = useRef(null);
  const getDailyQuestions = () => {
    const today = new Date().toISOString().slice(0, 10);
    let seed = 0;
    for (let i = 0; i < today.length; i++) { seed = ((seed << 5) - seed) + today.charCodeAt(i); seed = seed & seed; }
    const shuffled = [...QUIZ_QUESTIONS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      seed = (seed * 1664525 + 1013904223) & 0x7FFFFFFF;
      const j = seed % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 5);
  };
  const [dailyQuestions] = useState(getDailyQuestions);
  const dailyDoneKey = "mfsh_daily_" + new Date().toISOString().slice(0, 10);
  const [dailyCompleted, setDailyCompleted] = useState(null);

  // Load daily completion
  useEffect(() => {
    const load = async () => {
      try {
        if (user) {
          const { data } = await supabase.from("user_data").select("value").eq("user_id",user.id).eq("key",dailyDoneKey).maybeSingle();
          if (data?.value) { setDailyCompleted(data.value); return; }
        }
      } catch {}
      try { const s = localStorage.getItem(dailyDoneKey); if(s) setDailyCompleted(JSON.parse(s)); } catch {}
    };
    load();
  }, [user]);

  const startDaily = () => {
    setDailyMode(true);
    setQuiz({ index: 0, score: 0, selected: null, done: false, showExp: false });
    setDailyTimer(0);
    dailyTimerRef.current = setInterval(() => setDailyTimer(t => t + 1), 1000);
  };
  const finishDaily = async (score) => {
    clearInterval(dailyTimerRef.current);
    const result = { score, total: 5, time: dailyTimer, date: new Date().toISOString().slice(0, 10) };
    setDailyCompleted(result);
    try { localStorage.setItem(dailyDoneKey, JSON.stringify(result)); } catch {}
    // Save streak
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    let prevStreak = {count:0,lastDate:""};
    if (user) {
      try {
        const { data } = await supabase.from("user_data").select("value").eq("user_id",user.id).eq("key","streak").maybeSingle();
        if (data?.value) prevStreak = data.value;
      } catch {}
    } else {
      try { prevStreak = JSON.parse(localStorage.getItem("mfsh_streak") || '{"count":0,"lastDate":""}'); } catch {}
    }
    const newStreak = prevStreak.lastDate === yesterday ? prevStreak.count + 1 : 1;
    const streakData = { count: newStreak, lastDate: result.date };
    try { localStorage.setItem("mfsh_streak", JSON.stringify(streakData)); } catch {}
    if (user) {
      await supabase.from("user_data").upsert({ user_id:user.id, key:dailyDoneKey, value:result },{onConflict:"user_id,key"}).catch(()=>{});
      await supabase.from("user_data").upsert({ user_id:user.id, key:"streak", value:streakData },{onConflict:"user_id,key"}).catch(()=>{});
    }
  };
  const getStreak = () => {
    try {
      const s = JSON.parse(localStorage.getItem("mfsh_streak") || '{"count":0}');
      const today = new Date().toISOString().slice(0, 10);
      return s.lastDate === today ? s.count : 0;
    } catch { return 0; }
  };

  /* ─── ABEND SOLVER STATE ─── */
  const [abendSearch, setAbendSearch] = useState("");
  const [abendCategory, setAbendCategory] = useState("All");
  const [abendExpanded, setAbendExpanded] = useState(null);
  const filteredAbends = ABEND_CODES.filter(a => {
    const matchCat = abendCategory === "All" || a.category === abendCategory;
    const matchSearch = !abendSearch || a.code.toLowerCase().includes(abendSearch.toLowerCase()) || a.name.toLowerCase().includes(abendSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  /* ─── ROADMAP STATE ─── */
  const [roadmapLevel, setRoadmapLevel] = useState(null);
  
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scenarioCat, setScenarioCat] = useState("All");
  const [scenarioDiff, setScenarioDiff] = useState("All");
  const [expandedScenario, setExpandedScenario] = useState(null);
  const [expandedBlog, setExpandedBlog] = useState(null);
  const [weeklyLoading, setWeeklyLoading] = useState(false);
  const [weeklyUpdate, setWeeklyUpdate] = useState(null);
  const [weeklyTopic, setWeeklyTopic] = useState(null);
  const [weeklyError, setWeeklyError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [weeklyTab, setWeeklyTab] = useState("tip");

  /* ─── AUTH STATE (Supabase) ─── */
  const [authModal, setAuthModal] = useState(null); // null, "signin", "signup"
  const [authForm, setAuthForm] = useState({ name:"", email:"", password:"", role:"", itYears:"", mfYears:"" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Fetch profile from Supabase profiles table
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();
      if (error || !data) return null;
      return {
        id: data.id,
        name: data.name || "User",
        email: data.email || "",
        role: data.role || "Mainframe Professional",
        itYears: String(data.it_years || 0),
        mfYears: String(data.mf_years || 0),
        joinDate: data.join_date || new Date().toISOString().slice(0, 10),
        avatar: (data.avatar || data.name?.charAt(0) || "U").toUpperCase(),
      };
    } catch (e) {
      console.error("fetchProfile error:", e);
      return null;
    }
  };

  // Listen for Supabase auth state changes
  // Helper: build profile from session (fallback when DB fails)
  const profileFromSession = (u) => {
    const meta = u.user_metadata || {};
    const name = meta.name || u.email?.split("@")[0] || "User";
    return { id: u.id, name, email: u.email, role: meta.role || "Mainframe Professional",
      itYears: String(meta.it_years || 0), mfYears: String(meta.mf_years || 0),
      joinDate: new Date().toISOString().slice(0, 10), avatar: name.charAt(0).toUpperCase() };
  };

  useEffect(() => {
    // Handle email confirmation token from URL hash (e.g. #access_token=...)
    const hash = window.location.hash;
    if (hash && (hash.includes("access_token") || hash.includes("type=signup") || hash.includes("type=recovery"))) {
      // Supabase auto-detects the hash — just give it a moment to process
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (session?.user) {
          try {
            const profile = await fetchProfile(session.user.id);
            setUser(profile || profileFromSession(session.user));
          } catch { setUser(profileFromSession(session.user)); }
        }
        // Clean up URL hash
        if (window.history.replaceState) {
          window.history.replaceState(null, "", window.location.pathname);
        }
      }).catch(() => {});
    } else {
      supabase.auth.getSession().then(async ({ data: { session } }) => {
        if (session?.user) {
          try {
            const profile = await fetchProfile(session.user.id);
            setUser(profile || profileFromSession(session.user));
          } catch { setUser(profileFromSession(session.user)); }
        }
      }).catch(() => {});
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && session?.user) {
        try {
          const profile = await fetchProfile(session.user.id);
          setUser(profile || profileFromSession(session.user));
        } catch { setUser(profileFromSession(session.user)); }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const authSignUp = async () => {
    setAuthError("");
    if (!authForm.name.trim() || !authForm.email.trim() || !authForm.password.trim()) { setAuthError("Name, email, and password are required."); return; }
    if (authForm.password.length < 6) { setAuthError("Password must be at least 6 characters."); return; }
    setAuthLoading(true);
    const timeout = setTimeout(() => { setAuthLoading(false); setAuthError("Request timed out. Please check your internet and try again."); }, 30000);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: authForm.email.trim().toLowerCase(),
        password: authForm.password,
        options: {
          data: {
            name: authForm.name.trim(),
            role: authForm.role.trim() || "Mainframe Professional",
            it_years: parseInt(authForm.itYears) || 0,
            mf_years: parseInt(authForm.mfYears) || 0,
            avatar: authForm.name.trim().charAt(0).toUpperCase(),
          },
          emailRedirectTo: (window.location.hostname === "localhost" ? window.location.origin : "https://mainframestudyhub.com") + "/confirm.html",
        }
      });
      if (error) {
        clearTimeout(timeout);
        const msg = error.message || "";
        if (msg.includes("already registered") || msg.includes("already exists")) {
          setAuthError("This email is already registered. Try signing in instead.");
        } else if (msg.includes("rate limit")) {
          setAuthError("Too many attempts. Please wait a minute and try again.");
        } else if (msg.includes("password")) {
          setAuthError("Password must be at least 6 characters.");
        } else {
          setAuthError(msg);
        }
        setAuthLoading(false); return;
      }

      if (data.user && !data.session && !data.user.identities?.length) {
        // Supabase returns a fake user with no identities when email already exists
        setAuthError("This email is already registered. Try signing in instead.");
        setAuthLoading(false); return;
      }

      if (data.user) {
        if (data.session) {
          // Email confirmation disabled — logged in immediately
          const fallbackName = authForm.name.trim();
          const profile = {
            id: data.user.id, name: fallbackName, email: data.user.email,
            role: authForm.role.trim() || "Mainframe Professional",
            itYears: authForm.itYears || "0", mfYears: authForm.mfYears || "0",
            joinDate: new Date().toISOString().slice(0, 10),
            avatar: fallbackName.charAt(0).toUpperCase(),
          };
          // Update profile in background
          setTimeout(async () => {
            try {
              await supabase.from("profiles").upsert({
                id: data.user.id, name: profile.name, email: profile.email,
                role: profile.role, it_years: parseInt(authForm.itYears)||0,
                mf_years: parseInt(authForm.mfYears)||0, avatar: profile.avatar,
              }, { onConflict: "id" });
            } catch(e) { console.warn("Profile upsert:", e); }
          }, 500);
          setUser(profile);
          setAuthModal(null);
          setAuthForm({ name:"", email:"", password:"", role:"", itYears:"", mfYears:"" });
        } else {
          setAuthError("");
          setAuthModal(null);
          setAuthForm({ name:"", email:"", password:"", role:"", itYears:"", mfYears:"" });
          alert("Account created! Please check your email to confirm your account, then sign in.");
        }
      }
    } catch (e) { clearTimeout(timeout); setAuthError(e.message || "Something went wrong."); }
    clearTimeout(timeout); setAuthLoading(false);
  };

  const authSignIn = async () => {
    setAuthError("");
    if (!authForm.email.trim() || !authForm.password.trim()) { setAuthError("Email and password are required."); return; }
    setAuthLoading(true);
    // Safety timeout - never stay stuck
    const timeout = setTimeout(() => { setAuthLoading(false); setAuthError("Request timed out. Please check your internet and try again."); }, 30000);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authForm.email.trim().toLowerCase(),
        password: authForm.password,
      });
      clearTimeout(timeout);
      if (error) {
        const msg = error.message || "";
        if (msg.includes("Email not confirmed")) {
          setAuthError("Please check your email inbox (and spam) for the confirmation link. Click it first, then sign in.");
        } else if (msg.includes("Invalid login")) {
          setAuthError("Invalid email or password. Please try again or sign up for a new account.");
        } else if (msg.includes("rate limit") || msg.includes("too many")) {
          setAuthError("Too many attempts. Please wait a minute and try again.");
        } else {
          setAuthError(msg || "Sign in failed. Please try again.");
        }
        setAuthLoading(false);
        return;
      }
      if (data.user) {
        let profile = null;
        try { profile = await fetchProfile(data.user.id); } catch {}
        if (!profile) {
          const meta = data.user.user_metadata || {};
          const fallbackName = meta.name || data.user.email?.split("@")[0] || "User";
          profile = {
            id: data.user.id, name: fallbackName, email: data.user.email,
            role: meta.role || "Mainframe Professional",
            itYears: String(meta.it_years || 0), mfYears: String(meta.mf_years || 0),
            joinDate: new Date().toISOString().slice(0, 10),
            avatar: fallbackName.charAt(0).toUpperCase(),
          };
          supabase.from("profiles").upsert({
            id: data.user.id, name: profile.name, email: profile.email,
            role: profile.role, it_years: 0, mf_years: 0, avatar: profile.avatar,
          }, { onConflict: "id" }).catch(() => {});
        }
        setUser(profile);
        setAuthModal(null);
        setAuthForm({ name:"", email:"", password:"", role:"", itYears:"", mfYears:"" });
      }
    } catch (e) {
      clearTimeout(timeout);
      setAuthError(e.message || "Connection error. Please check your internet and try again.");
    }
    setAuthLoading(false);
  };
  const authSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Google OAuth Sign In
  const authSignInWithGoogle = async () => {
    setAuthError("");
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: (window.location.hostname === "localhost" ? window.location.origin : "https://mainframestudyhub.com"),
        }
      });
      if (error) {
        setAuthError(error.message || "Google sign-in failed. Please try again.");
        setAuthLoading(false);
      }
      // On success, Supabase redirects to Google — no need to setAuthLoading(false)
    } catch (e) {
      setAuthError(e.message || "Google sign-in failed. Please check your connection.");
      setAuthLoading(false);
    }
  };

  // Forgot Password
  const authForgotPassword = async () => {
    setAuthError("");
    if (!authForm.email.trim()) { setAuthError("Please enter your email address first."); return; }
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(authForm.email.trim().toLowerCase(), {
        redirectTo: (window.location.hostname === "localhost" ? window.location.origin : "https://mainframestudyhub.com") + "/reset-password.html",
      });
      if (error) { setAuthError(error.message); } else {
        setAuthError("");
        setAuthModal("forgot-sent");
      }
    } catch (e) { setAuthError(e.message || "Something went wrong."); }
    setAuthLoading(false);
  };

  // Edit Profile
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editForm, setEditForm] = useState({ name:"", role:"", itYears:"", mfYears:"" });

  const openEditProfile = () => {
    if (user) {
      setEditForm({ name: user.name||"", role: user.role||"", itYears: user.itYears||"0", mfYears: user.mfYears||"0" });
      setEditProfileOpen(true);
      setAuthModal(null);
    }
  };

  const saveProfile = async () => {
    if (!user || !editForm.name.trim()) return;
    setAuthLoading(true);
    try {
      const { error } = await supabase.from("profiles").update({
        name: editForm.name.trim(),
        role: editForm.role.trim() || "Mainframe Professional",
        it_years: parseInt(editForm.itYears) || 0,
        mf_years: parseInt(editForm.mfYears) || 0,
        avatar: editForm.name.trim().charAt(0).toUpperCase(),
      }).eq("id", user.id);
      if (!error) {
        const profile = await fetchProfile(user.id);
        setUser(profile);
        setEditProfileOpen(false);
      } else { setAuthError(error.message); }
    } catch (e) { setAuthError(e.message); }
    setAuthLoading(false);
  };

  // Change Password (from profile)
  const [changePassOpen, setChangePassOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passMsg, setPassMsg] = useState("");

  const changePassword = async () => {
    setPassMsg("");
    if (newPassword.length < 6) { setPassMsg("Password must be at least 6 characters."); return; }
    setAuthLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) { setPassMsg(error.message); } else {
        setPassMsg("✅ Password updated successfully!");
        setNewPassword("");
        setTimeout(() => { setChangePassOpen(false); setPassMsg(""); }, 1500);
      }
    } catch (e) { setPassMsg(e.message); }
    setAuthLoading(false);
  };

  const ROLE_OPTIONS = ["Mainframe Developer","Systems Programmer","DB2 DBA","CICS Administrator","Storage Admin","Security Admin","Network Engineer","Operations/Batch","DevOps Engineer","Manager/Lead","Student/Intern","Career Changer","Other"];

  /* ─── AI CHAT STATE ─── */
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMax, setChatMax] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role:"assistant", content:"Hey! 👋 I'm the **MainframeStudyHub AI** — think of me as your personal mainframe expert, always here to help.\n\nI can help with:\n• **Coding** — JCL, COBOL, REXX, DB2 SQL, CICS commands\n• **Debugging** — Explain any abend (S0C7, S0C4, S878...)\n• **Learning** — Tutorials from beginner to architect level\n• **Career** — Interview prep, salary info, learning paths\n• **Modernization** — Zowe, APIs, DevOps on mainframe\n\nJust ask me anything — I'll give you real answers with code examples, not generic fluff. Try something like *\"How do I fix an S0C7?\"* or *\"Write JCL to sort a file\"*" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior:"smooth" }); }, [chatMessages]);

  const MF_SYSTEM_PROMPT = `You are MainframeStudyHub AI — a world-class IBM Z mainframe engineer and educator, similar to how ChatGPT or Claude works but specialized in mainframes. You have deep expertise across the entire IBM Z ecosystem:

Core: JCL, COBOL, REXX, Assembler, CLIST, PL/I
Data: VSAM, DB2 for z/OS, IMS DB/DC, QSAM, BSAM
Online: CICS Transaction Server, IMS/TM, MQ Series
System: z/OS internals, USS, TSO/ISPF, SDSF, WLM, RMF, SMF
Security: RACF, Top Secret, ACF2
Utilities: DFSORT, ICETOOL, IDCAMS, SMP/E, IEBGENER, IEBCOPY
Scheduling: CA7, TWS, AutoSys, Control-M
Modern: Zowe, z/OS Connect EE, DevOps, Git on z/OS, APIs, Python on z/OS
Infrastructure: Linux on Z, OpenShift on Z, z/VM, PR/SM
Career: Interview prep, salary guidance, learning paths, certifications

Behavior guidelines:
- Be conversational and natural — respond like a knowledgeable colleague chatting, not a textbook
- Answer ANY question a user asks — including general tech, career advice, coding help, and life questions — but naturally weave in mainframe expertise when relevant
- For mainframe questions: include code snippets (JCL, COBOL, REXX, SQL), abend explanations, and practical examples
- Use markdown formatting: **bold** for emphasis, \`inline code\`, code blocks with \`\`\`, bullet points
- When explaining errors or abends, give the cause AND the fix with concrete steps
- Be encouraging to beginners, technically precise for experts
- Keep initial responses focused but expand if the user asks for more detail
- Remember the full conversation context and refer back to earlier messages naturally
- If you're unsure about something, say so honestly rather than making things up
- For interview questions, give thorough real-world answers
- Vary your response length — short for simple questions, detailed for complex ones`;

  const streamText = useRef(null);

  const callClaudeAPI = async (apiMessages) => {
    const r = await fetch("/.netlify/functions/chat", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ system:MF_SYSTEM_PROMPT, messages:apiMessages.slice(-20) })
    });
    if (!r.ok) throw new Error("API error " + r.status);
    const d = await r.json();
    if (d.error) throw new Error(d.error);
    if (d.content?.[0]?.text) return d.content[0].text;
    throw new Error("No response");
  };

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    const newMessages = [...chatMessages, { role:"user", content:userMsg }];
    setChatMessages(newMessages);
    setChatLoading(true);

    let fullReply = "";
    try {
      const apiMessages = newMessages.filter((m, i) => i > 0).map(m => ({ role:m.role, content:m.content }));
      fullReply = await callClaudeAPI(apiMessages);
    } catch {
      fullReply = localSearch(userMsg);
    }

    // Typing effect
    setChatLoading(false);
    setChatMessages(prev => [...prev, { role:"assistant", content:"" }]);
    const words = fullReply.split(/(\s+)/);
    let shown = "";
    let i = 0;
    const speed = Math.max(8, Math.min(25, 3000 / words.length));
    if (streamText.current) clearInterval(streamText.current);
    streamText.current = setInterval(() => {
      if (i >= words.length) {
        clearInterval(streamText.current);
        streamText.current = null;
        return;
      }
      shown += words[i];
      i++;
      setChatMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { role:"assistant", content: shown };
        return copy;
      });
    }, speed);
  };

  // Comprehensive mainframe knowledge engine
  const localSearch = (query) => {
    const q = query.toLowerCase().trim();

    // 1) ABEND CODE LOOKUP — check against full 87-code database
    const abendMatch = q.match(/s0c[0-9a-f]|s[0-9]{3}|sb37|sd37|se37|s[0-9a-f]{3}|asra|asrb|aey[0-9a-z]|aei[a-z]|aeq|aexl|atsp|aall|abmb|akcs|00c9|04[ef]|047|071|u[0-9]{4}|jcl\s*err/i);
    if (abendMatch) {
      const code = abendMatch[0].toUpperCase().replace(/\s/g,"");
      const found = ABEND_CODES.find(a => a.code.toUpperCase() === code || a.code.toUpperCase().replace("-","") === code);
      if (found) {
        return `**${found.code} — ${found.name}** (${found.category} | Severity: ${found.severity})\n\n**⚠️ Cause:**\n${found.cause}\n\n**✅ Fix:**\n${found.fix}\n\n${found.tips?.length ? "**💡 Tips:**\n" + found.tips.map(t => "• " + t).join("\n") : ""}`;
      }
    }

    // 2) KNOWLEDGE BASE — direct answers for 40+ common questions
    const KB = [
      { keys:["deadlock","dead lock","lock contention","lock timeout","sqlcode -911","sqlcode -913","00c9"],
        answer:"**How to Clear/Resolve Deadlocks in Mainframe:**\n\nA deadlock occurs when two or more tasks each hold a lock that the other needs.\n\n**In DB2:**\n• SQLCODE -911 = timeout, SQLCODE -913 = deadlock (DB2 chose a victim)\n• Fix: Ensure consistent lock ordering across programs\n• Use `COMMIT` frequently to release locks sooner\n• Increase `IRLMRWT` (lock timeout) parameter\n• Use `ISOLATION(UR)` for read-only queries when dirty reads are acceptable\n• Run `DISPLAY THREAD` to identify blocking threads\n\n**In CICS:**\n• AEYB abend = deadlock timeout\n• Check VSAM file string waits with `CEMT I FILE`\n• Check DB2 thread waits\n• Increase `DTIMOUT` in transaction definition\n\n**In IMS:**\n• PCB status AI = deadlock detected\n• Review DL/I call sequence for lock ordering\n\n**Prevention Best Practices:**\n1. Always access tables/files in the same order across all programs\n2. Keep transactions short — `COMMIT` early and often\n3. Avoid `SELECT *` — lock only what you need\n4. Use appropriate `ISOLATION` level\n5. Schedule conflicting batch jobs sequentially, not in parallel"},

      { keys:["jcl basic","jcl tutorial","what is jcl","jcl explain","learn jcl","jcl beginner"],
        answer:"**JCL (Job Control Language) Basics:**\n\nJCL tells z/OS what program to run, what files to use, and where to put the output.\n\n**Three main statements:**\n• `JOB` — identifies the job (name, accounting, class)\n• `EXEC` — specifies the program to run (`PGM=`) or PROC\n• `DD` — defines datasets (input/output files)\n\n**Example:**\n```\n//MYJOB  JOB (ACCT),'MY JOB',CLASS=A,MSGCLASS=X\n//STEP1  EXEC PGM=IEBGENER\n//SYSUT1 DD DSN=MY.INPUT.FILE,DISP=SHR\n//SYSUT2 DD DSN=MY.OUTPUT.FILE,DISP=(NEW,CATLG),\n//          SPACE=(CYL,(10,5)),UNIT=SYSDA\n//SYSPRINT DD SYSOUT=*\n//SYSIN  DD DUMMY\n```\n\n**Key parameters:**\n• `DISP=(status,normal,abnormal)` — OLD/SHR/NEW/MOD\n• `SPACE=(unit,(primary,secondary))` — CYL/TRK/bytes\n• `DCB=(RECFM=FB,LRECL=80,BLKSIZE=27920)`"},

      { keys:["cobol comp","comp-3","packed decimal","comp vs comp-3","binary cobol","computational"],
        answer:"**COBOL COMP Types Explained:**\n\n• **COMP (COMP-4/BINARY):** Pure binary. PIC 9(4) COMP = 2 bytes (halfword), PIC 9(9) COMP = 4 bytes (fullword), PIC 9(18) COMP = 8 bytes (doubleword)\n\n• **COMP-3 (PACKED-DECIMAL):** Each digit takes half a byte + 1 nibble for sign. PIC 9(7) COMP-3 = 4 bytes. Formula: (digits+1)/2 rounded up\n\n• **COMP-1:** Single-precision float (4 bytes). Rarely used in business\n• **COMP-2:** Double-precision float (8 bytes). Rarely used in business\n\n**When to use:**\n• COMP-3 for money/arithmetic (most common in business COBOL)\n• COMP for subscripts, counters, and indexes\n• DISPLAY (default) for fields that need to be readable in dumps\n\n**S0C7 Connection:** If a COMP-3 field contains spaces (X'40') instead of packed digits, any arithmetic on it causes S0C7. Always INITIALIZE before use."},

      { keys:["vsam","ksds","esds","rrds","vsam type","vsam explain"],
        answer:"**VSAM File Types:**\n\n• **KSDS (Key-Sequenced):** Records accessed by a key field. Like a DB table with a primary key. Most common type. Supports random and sequential access.\n\n• **ESDS (Entry-Sequenced):** Records stored in insertion order. Like a log file. No key — accessed by RBA (Relative Byte Address). Good for sequential processing.\n\n• **RRDS (Relative Record):** Records accessed by relative record number (slot number). Like an array. Fixed slots — can have empty slots.\n\n• **LDS (Linear):** Raw byte stream. Used by DB2 for tablespaces.\n\n**Key Concepts:**\n• CI (Control Interval) = smallest I/O unit\n• CA (Control Area) = group of CIs\n• CI/CA splits degrade performance — use FREESPACE and schedule REORGs\n• SHAREOPTIONS control multi-job access\n• Use `IDCAMS LISTCAT ALL` to check health"},

      { keys:["cics","what is cics","cics basic","cics explain","cics transaction"],
        answer:"**CICS (Customer Information Control System):**\n\nCICS is IBM's online transaction processing (OLTP) system. It manages thousands of concurrent users accessing mainframe programs in real-time.\n\n**Key concepts:**\n• **Pseudo-conversational:** Program ends after each screen send, restarts when user responds. Saves resources.\n• **COMMAREA:** Data passed between program invocations (max 32KB). Use channels/containers for larger data.\n• **BMS Maps:** Define screen layouts (like HTML forms)\n• **EXEC CICS commands:** SEND MAP, RECEIVE MAP, READ FILE, LINK, XCTL, RETURN\n\n**Debugging:**\n• CEDF = interactive debugger (step through EXEC CICS commands)\n• ASRA = program check (equivalent of S0C7/S0C4 in batch)\n• CEMT = master terminal commands for administration\n\n**Common commands:**\n• `CEMT I TRANS` — view transaction status\n• `CEMT SET PROG(name) NEWCOPY` — refresh after recompile\n• `CEMT I FILE` — view file status"},

      { keys:["db2 sql","sqlcode","sql error","db2 error","sqlcode -805","sqlcode -818","db2 explain"],
        answer:"**Common DB2 SQLCODEs:**\n\n• **SQLCODE 0** = Success\n• **SQLCODE 100** = Row not found (normal for end of cursor)\n• **SQLCODE -805** = DBRM/package not found. Run BIND/REBIND.\n• **SQLCODE -811** = SELECT returned more than one row. Use cursor or add WHERE.\n• **SQLCODE -818** = Plan/program timestamp mismatch. REBIND the plan.\n• **SQLCODE -904** = Resource unavailable. Check if object is stopped.\n• **SQLCODE -911** = Lock timeout. Another job holds the lock.\n• **SQLCODE -913** = Deadlock. DB2 killed your transaction.\n• **SQLCODE -551** = Authorization failure. GRANT needed.\n\n**Performance Tips:**\n1. Run RUNSTATS after data loads — optimizer needs fresh statistics\n2. EXPLAIN your SQL — check for tablespace scans\n3. Use appropriate ISOLATION level\n4. COMMIT frequently in batch to release locks"},

      { keys:["sort","dfsort","icetool","sort jcl","sort example","syncsort"],
        answer:"**DFSORT Quick Reference:**\n\n**Basic sort:**\n```\n//SORT EXEC PGM=SORT\n//SORTIN  DD DSN=MY.INPUT,DISP=SHR\n//SORTOUT DD DSN=MY.OUTPUT,DISP=(,CATLG)\n//SYSIN   DD *\n  SORT FIELDS=(1,10,CH,A)\n/*\n```\n\n**Key operations:**\n• `SORT FIELDS=(pos,len,format,order)` — A=ascending, D=descending\n• `INCLUDE COND=(1,3,CH,EQ,C'ABC')` — filter records\n• `OMIT COND=` — exclude records\n• `INREC` — reformat input before sort\n• `OUTREC` — reformat output after sort\n• `OUTFIL` — multiple output files from one sort\n• `OPTION COPY` — copy without sorting\n\n**ICETOOL (multi-step):**\n• `SPLICE` — join two files by key\n• `DISPLAY` — formatted reports\n• `STATS` — min/max/avg/count statistics"},

      { keys:["interview","interview question","interview prep","mainframe interview"],
        answer:"**Top Mainframe Interview Questions:**\n\n**JCL:**\n1. What's the difference between DISP=OLD, SHR, and MOD?\n2. Explain COND parameter vs IF/THEN/ELSE\n3. What happens if secondary space runs out?\n\n**COBOL:**\n1. Difference between COMP, COMP-3, and DISPLAY?\n2. What causes S0C7? How do you debug it?\n3. Explain PERFORM VARYING vs PERFORM UNTIL\n\n**DB2:**\n1. What is SQLCODE -805 and how to fix it?\n2. When do you run RUNSTATS and why?\n3. Explain DB2 isolation levels\n\n**CICS:**\n1. What is pseudo-conversational programming?\n2. How to debug ASRA abend?\n3. LINK vs XCTL — when to use which?\n\n**Tips:**\n• Know your abend codes (S0C7, S0C4, S878, SB37)\n• Be ready to explain a production issue you resolved\n• Understand batch vs online processing\n• Practice JCL debugging scenarios"},

      { keys:["racf","security","racf permit","racf profile","access control"],
        answer:"**RACF Security Basics:**\n\n**Key commands:**\n• `PERMIT 'dataset' ID(userid) ACCESS(READ)` — grant access\n• `RLIST DATASET 'dsn' ALL` — view profile details\n• `SEARCH CLASS(USER)` — list users\n• `ALTUSER userid PASSWORD(newpass)` — reset password\n• `CONNECT userid GROUP(grpname)` — add to group\n\n**Access levels (low to high):**\nNONE → EXECUTE → READ → UPDATE → CONTROL → ALTER\n\n**Common issues:**\n• **ICH408I** message = access denied. Check the profile and PERMIT.\n• **S913 abend** = RACF denied dataset access\n• **UACC(NONE)** = no default access, must be explicitly PERMITted\n\n**SPECIAL attribute** = full RACF admin. Limit to 3-5 people max."},

      { keys:["rexx","rexx script","rexx example","rexx tutorial","tso rexx"],
        answer:"**REXX Scripting on z/OS:**\n\n**Basic example:**\n```\n/* REXX - Hello World */\nSAY 'Hello from z/OS!'\nPARSE ARG INPUT_NAME\nIF INPUT_NAME = '' THEN\n  SAY 'No name provided'\nELSE\n  SAY 'Hello,' INPUT_NAME\nEXIT 0\n```\n\n**Key functions:**\n• `SYSDSN(dsname)` — check if dataset exists\n• `OUTTRAP(var)` — capture command output into stem variable\n• `EXECIO` — read/write files from REXX\n• `ADDRESS TSO` — run TSO commands\n• `ADDRESS ISPEXEC` — run ISPF services\n\n**Common patterns:**\n• Parse arguments: `PARSE ARG var1 var2`\n• Loops: `DO i = 1 TO 10 ... END`\n• Stem variables: `name.1 = 'John'`, `name.0 = count`"},

      { keys:["moderniz","zowe","z/os connect","api","rest api","devops mainframe","cloud mainframe"],
        answer:"**Mainframe Modernization Overview:**\n\n**z/OS Connect EE:**\nExposes CICS/IMS/batch programs as REST/JSON APIs without changing COBOL code. Maps JSON ↔ copybook automatically.\n\n**Zowe:**\nOpen-source framework for modern mainframe interaction:\n• Zowe CLI — command-line access to z/OS from your laptop\n• Zowe Explorer — VS Code extension for mainframe development\n• Zowe API Mediation Layer — unified API gateway\n\n**Strangler Fig Pattern:**\nThe safest modernization approach:\n1. Put an API layer in front of existing COBOL\n2. Build new features as microservices\n3. Gradually route traffic from old → new\n4. Retire COBOL modules when fully replaced\n\n**Key principle:** 75% of rewrite projects fail. Modernize incrementally, don't rewrite."},

      { keys:["performance","tuning","slow","optimize","cpu","response time"],
        answer:"**Mainframe Performance Tuning:**\n\n**DB2:**\n1. Run `RUNSTATS` — stale stats = bad access paths\n2. `EXPLAIN` your SQL — look for tablespace scans\n3. Check `CLUSTERRATIO` — below 80% means REORG needed\n4. Use appropriate index for WHERE clause columns\n\n**COBOL:**\n1. Use `COMP-3` for arithmetic (faster than DISPLAY)\n2. Binary search (`SEARCH ALL`) instead of serial SEARCH\n3. `PERFORM VARYING` with inline code vs paragraph CALL\n4. Minimize I/O — buffer records, process in blocks\n\n**CICS:**\n1. Keep transactions short (pseudo-conversational)\n2. Avoid file string waits — check `STRINGS` parameter\n3. Use `READNEXT` instead of repeated `READ` for sequential access\n\n**Batch:**\n1. Increase `BUFNO` for sequential files\n2. Use `REGION=0M` for maximum storage\n3. DFSORT is 10-100x faster than COBOL for file processing\n4. Use checkpoint/restart for long-running jobs"},

      { keys:["career","salary","job","future","mainframe future","mainframe career","mainframe job"],
        answer:"**Mainframe Career Guide:**\n\n**Current market:**\n• Average mainframe developer salary: $85K-$130K (US)\n• Severe talent shortage — 60% of mainframe workforce retiring by 2030\n• Growing demand as banks/insurers can't replace mainframe systems\n\n**Career path:**\n1. **Trainee** (0-1 yr): TSO/ISPF, JCL, basic COBOL\n2. **Junior** (1-3 yr): VSAM, DB2, production support\n3. **Developer** (3-5 yr): CICS, IMS, complex batch\n4. **Senior** (5-8 yr): Performance tuning, mentoring\n5. **Lead/Architect** (8+ yr): Modernization, strategy\n\n**Top skills in demand:**\n• COBOL + DB2 + CICS (core combination)\n• z/OS Connect + REST APIs (modernization)\n• DevOps for mainframe (Zowe, Git, Jenkins)\n• Cloud integration (AWS/Azure + mainframe)\n\nCheck our **Learning Roadmap** page for a detailed skill path!"},

      { keys:["ispf","tso","ispf command","tso command","sdsf","navigate"],
        answer:"**TSO/ISPF Quick Reference:**\n\n**Key ISPF panels:**\n• **3.4** — Dataset list (most used!). Enter HLQ to browse datasets.\n• **3.14** — Search-For. Find strings across PDS members.\n• **2** — Edit. Open a dataset for editing.\n• **3.1** — Library utility\n• **6** — Command entry\n\n**Edit commands:**\n• `C 'old' 'new' ALL` — change all occurrences\n• `F 'text'` — find text\n• `COPY` / `MOVE` — copy/move lines\n• Line commands: `I` (insert), `D` (delete), `R` (repeat), `C`/`M` (copy/move)\n\n**SDSF:**\n• `ST` — view job status\n• `DA` — active jobs\n• `H` — held output\n• `LOG` — system log\n• `PREFIX *` — show all jobs (not just yours)"},

      { keys:["s0c7","data exception","non numeric","invalid data","0c7"],
        answer:"**S0C7 — Data Exception (The #1 Mainframe Debug Question):**\n\n**What happened:** Your program tried to do arithmetic on a field that contains non-numeric data (spaces, low-values, garbage).\n\n**Most common causes:**\n1. **Uninitialized COMP-3/packed field** — has spaces (X'40') instead of packed zeros (X'0C')\n2. **Wrong record layout** — reading a different record type with the wrong copybook\n3. **File not found / empty read** — READ returned spaces but you didn't check FILE STATUS\n4. **REDEFINES issue** — two fields share the same memory, one has text, you're treating it as numeric\n\n**How to fix:**\n1. `DISPLAY` the field right before the failing statement\n2. `INITIALIZE` all group items in WORKING-STORAGE\n3. Always check `FILE STATUS` after READ\n4. Use `IF field IS NUMERIC` before arithmetic\n5. Compile with `LIST` option — the offset in the dump maps to a line in the listing\n\n**Pro tip:** Hex `F0-F9` = valid zoned decimal. Hex `0C, 1C...9C` = valid positive packed. `X'40'` = space = S0C7 guaranteed."},
    ];

    // Match against knowledge base
    for (const entry of KB) {
      const matchCount = entry.keys.filter(k => q.includes(k)).length;
      if (matchCount > 0) return entry.answer;
    }

    // 3) TOPIC SEARCH — smarter excerpt with context
    const results = [];
    TOPICS.forEach(topic => {
      topic.sections?.forEach(sec => {
        const text = ((sec.content||"") + " " + (sec.code||"")).toLowerCase();
        const title = (sec.title||"").toLowerCase();
        const words = q.split(/\s+/).filter(w => w.length > 2);
        const titleMatches = words.filter(w => title.includes(w)).length * 3; // Title match = 3x weight
        const contentMatches = words.filter(w => text.includes(w)).length;
        const score = titleMatches + contentMatches;
        if (score >= 2) {
          results.push({ topic: topic.title, section: sec.title, content: sec.content || sec.code || "", score });
        }
      });
    });
    results.sort((a,b) => b.score - a.score);
    if (results.length > 0) {
      const top = results[0];
      // Extract a relevant paragraph, not just the first 400 chars
      const paragraphs = top.content.split("\n\n");
      const qWords = q.split(/\s+/).filter(w => w.length > 2);
      const bestParagraph = paragraphs.reduce((best, p) => {
        const pScore = qWords.filter(w => p.toLowerCase().includes(w)).length;
        return pScore > best.score ? { text: p, score: pScore } : best;
      }, { text: paragraphs[0], score: 0 });
      const excerpt = bestParagraph.text.substring(0, 500).trim();
      return `**${top.topic} → ${top.section}:**\n\n${excerpt}\n\n💡 *Visit the **${top.topic}** topic for complete details and code examples.*`;
    }

    return "Great question! I can help with IBM mainframe topics including:\n\n• **JCL, COBOL, REXX** — syntax, debugging, best practices\n• **DB2, CICS, IMS** — SQL, transactions, database programming\n• **VSAM, RACF, TSO/ISPF** — files, security, navigation\n• **Abend codes** — S0C7, S0C4, S878, ASRA, and 87 more\n• **Career & interview prep**\n\nTry asking:\n• \"How to clear deadlock in DB2?\"\n• \"What is S0C7 and how to fix it?\"\n• \"Explain CICS pseudo-conversational\"\n• \"DFSORT INCLUDE example\"\n• \"Mainframe career path\"";
  };

  // Simple markdown renderer for chat
  // Mainframe syntax highlighter — token-based to prevent cascade issues
  const highlightCode = (code) => {
    if (!code) return "";
    let s = code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    const T = [];
    const k = (m, c, b) => { const i = T.length; T.push(`<span style="color:${c}${b?";font-weight:700":""}">${m}</span>`); return `\u00AB${i}\u00BB`; };
    s = s.replace(/(\/\/\*.*)/g, m=>k(m,"#6b7280"));
    s = s.replace(/(\/\*[\s\S]*?\*\/)/g, m=>k(m,"#6b7280"));
    s = s.replace(/'([^']*?)'/g, m=>k(m,"#fbbf24"));
    s = s.replace(/"([^"]*?)"/g, m=>k(m,"#fbbf24"));
    s = s.replace(/^(\/\/\w+)/gm, m=>k(m,"#22d3ee",1));
    s = s.replace(/^(\/\/)/gm, m=>k(m,"#22d3ee"));
    s = s.replace(/\b(PROCEDURE DIVISION|DATA DIVISION|WORKING-STORAGE SECTION|LINKAGE SECTION|FILE SECTION|IDENTIFICATION DIVISION|ENVIRONMENT DIVISION)\b/g, m=>k(m,"#c084fc",1));
    s = s.replace(/\b(EXEC PGM|EXEC CICS|END-EXEC|EXEC)\b/g, m=>k(m,"#f472b6",1));
    s = s.replace(/\b(JOB|DD|DSN|DISP|SPACE|REGION|CLASS|COND|NOTIFY|SYSOUT|PGM|PROC|SET|INCLUDE|OUTFIL|SORT|MERGE|PARM|DCB|VOL|SER|UNIT|LABEL|OUTPUT|LRECL|BLKSIZE|RECFM|MSGCLASS|MSGLEVEL|TYPRUN|RESTART|PRTY|TIME)\b/g, m=>k(m,"#f472b6"));
    s = s.replace(/\b(MOVE|PERFORM|DISPLAY|COMPUTE|ADD|SUBTRACT|MULTIPLY|DIVIDE|INITIALIZE|STRING|UNSTRING|INSPECT|READ|WRITE|REWRITE|STOP RUN|GOBACK|EVALUATE|WHEN|OTHER|END-EVALUATE|END-IF|END-PERFORM|END-READ|END-WRITE|END-COMPUTE|END-STRING|END-CALL|JSON GENERATE|END-JSON|ACCEPT|SEARCH|GO TO)\b/g, m=>k(m,"#60a5fa"));
    s = s.replace(/\b(IF|ELSE|CALL|RETURN|OPEN|CLOSE|EXIT|NOT|AND|OR|UNTIL|VARYING|THRU|THROUGH|FROM|TO|BY|GIVING|INTO|ON|SIZE|ERROR|OVERFLOW|AT|END|DELETE|START)\b/g, m=>k(m,"#60a5fa"));
    s = s.replace(/\b(PIC|PICTURE|COMP|COMP-3|COMP-1|COMP-2|BINARY|PACKED-DECIMAL|VALUE|REDEFINES|OCCURS|INDEXED|DEPENDING|FILLER|COPY|REPLACING)\b/g, m=>k(m,"#34d399"));
    s = s.replace(/\b(SELECT|FROM|WHERE|INSERT|UPDATE|ORDER|GROUP|HAVING|JOIN|LEFT|RIGHT|INNER|OUTER|CREATE|ALTER|DROP|GRANT|REVOKE|FETCH|FIRST|ROWS|ONLY|COMMIT|ROLLBACK|DECLARE|CURSOR|DECIMAL|SUBSTR|COUNT|SUM|AVG|MAX|MIN|BETWEEN|LIKE|EXISTS|DISTINCT|UNION|TABLE|INDEX|VIEW|RUNSTATS|BIND|PLAN|PACKAGE)\b/g, m=>k(m,"#fbbf24"));
    s = s.replace(/\b(SEND|RECEIVE|LINK|XCTL|READNEXT|STARTBR|ENDBR|PUT|GET|CONTAINER|CHANNEL|PROGRAM|MAP|MAPSET|COMMAREA|RESP|RESP2|SYNCPOINT|HANDLE|CONDITION|ABEND|TRANSID|FLENGTH|FREEMAIN|GETMAIN|DEFINE|CLUSTER|REPRO|VERIFY|LISTCAT|ENTRIES|PRINT|INFILE|EXPORT|IMPORT)\b/g, m=>k(m,"#fb923c"));
    s = s.replace(/\b(PARSE|ARG|SAY|DO|THEN|SIGNAL|ADDRESS|PULL|PUSH|QUEUE|TRACE|INTERPRET|OTHERWISE|LEAVE|ITERATE|NOP|OUTTRAP|SYSDSN|ALLOC|EXECIO|NUMERIC|UPPER|LOWER|STRIP|COPIES|CENTER|OVERLAY|WORD|WORDS|QUEUED)\b/g, m=>k(m,"#a78bfa"));
    for (let i = T.length - 1; i >= 0; i--) { s = s.split("\u00AB" + i + "\u00BB").join(T[i]); }
    return s;
  };

  // Rich content renderer — transforms plain text into styled learning material
  const renderContent = (text) => {
    if (!text) return null;
    const lines = text.split("\n");
    const elements = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i].trim();
      if (!line) { i++; continue; }

      // Heading: line ending with ":" and next line is not empty or is indented
      if (line.endsWith(":") && line.length < 120 && !line.match(/^\d+\./)) {
        elements.push(
          <div key={i} style={{ marginTop: elements.length ? 28 : 0, marginBottom: 14, display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:4, height:24, borderRadius:4, background:`linear-gradient(to bottom,${activeTopic?.color||"#0071e3"},${activeTopic?.color||"#7c3aed"})`, flexShrink:0 }} />
            <h3 style={{ fontSize:18, fontWeight:800, color:"#1d1d1f", letterSpacing:"-0.3px", lineHeight:1.4 }}>{line}</h3>
          </div>
        );
        i++; continue;
      }

      // Numbered list: "1." "2." etc
      if (line.match(/^\d+[\.\)]/)) {
        const listItems = [];
        while (i < lines.length && lines[i].trim().match(/^\d+[\.\)]/)) {
          const item = lines[i].trim().replace(/^\d+[\.\)]\s*/, "");
          listItems.push(item);
          i++;
        }
        elements.push(
          <div key={`list-${i}`} style={{ margin:"12px 0", display:"flex", flexDirection:"column", gap:8 }}>
            {listItems.map((item, j) => (
              <div key={j} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <div style={{ width:28, height:28, borderRadius:8, background:`${activeTopic?.color||"#0071e3"}12`,
                  color:activeTopic?.color||"#0071e3", fontSize:13, fontWeight:800, display:"flex", alignItems:"center",
                  justifyContent:"center", flexShrink:0, marginTop:1 }}>{j+1}</div>
                <p style={{ fontSize:15, color:"#3a3a3c", lineHeight:1.85, flex:1 }}>{item}</p>
              </div>
            ))}
          </div>
        );
        continue;
      }

      // Bullet: "•" or "- " or "· "
      if (line.match(/^[•\-·]\s/)) {
        const bullets = [];
        while (i < lines.length && lines[i].trim().match(/^[•\-·]\s/)) {
          bullets.push(lines[i].trim().replace(/^[•\-·]\s*/, ""));
          i++;
        }
        elements.push(
          <div key={`bul-${i}`} style={{ margin:"12px 0 12px 4px", display:"flex", flexDirection:"column", gap:6 }}>
            {bullets.map((b, j) => (
              <div key={j} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:activeTopic?.color||"#0071e3", flexShrink:0, marginTop:9 }} />
                <p style={{ fontSize:15, color:"#3a3a3c", lineHeight:1.85 }}>{b}</p>
              </div>
            ))}
          </div>
        );
        continue;
      }

      // Key-value pair: "KEYWORD — description" or "KEYWORD = description"
      if (line.match(/^[A-Z][A-Z0-9\/\-_]{1,20}\s*(—|–|-|=|:)\s/) && line.length < 200) {
        const sepMatch = line.match(/^([A-Z][A-Z0-9\/\-_]{1,20})\s*(—|–|-|=|:)\s*(.*)/);
        if (sepMatch) {
          elements.push(
            <div key={i} style={{ margin:"6px 0", padding:"10px 16px", background:"rgba(245,245,247,0.6)",
              borderRadius:10, borderLeft:`3px solid ${activeTopic?.color||"#0071e3"}` }}>
              <span style={{ fontWeight:700, color:"#1d1d1f", fontFamily:"'SF Mono',Menlo,Consolas,monospace", fontSize:14 }}>{sepMatch[1]}</span>
              <span style={{ color:"#666" }}> {sepMatch[2]} </span>
              <span style={{ color:"#3a3a3c", fontSize:14.5 }}>{sepMatch[3]}</span>
            </div>
          );
          i++; continue;
        }
      }

      // Regular paragraph
      elements.push(
        <p key={i} style={{ fontSize:15.5, color:"#2d2d30", lineHeight:2, margin:"8px 0",
          fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif" }}>
          {line}
        </p>
      );
      i++;
    }
    return <div>{elements}</div>;
  };

  const renderChatMd = (text) => {
    if (!text) return null;
    // Split by code blocks first
    const parts = text.split(/(```[\s\S]*?```)/g);
    return parts.map((part, pi) => {
      if (part.startsWith("```")) {
        const lines = part.slice(3, -3).split("\n");
        const lang = lines[0].trim();
        const code = (lang && !lang.includes(" ") ? lines.slice(1) : lines).join("\n");
        return (
          <div key={pi} style={{ margin:"8px 0",borderRadius:10,overflow:"hidden",border:"1px solid rgba(0,0,0,0.08)" }}>
            {lang && !lang.includes(" ") && <div style={{ background:"#1c1c1e",padding:"6px 12px",fontSize:11,color:"#8b949e",fontWeight:600,textTransform:"uppercase" }}>{lang}</div>}
            <pre style={{ margin:0,padding:"12px 14px",background:"#1c1c1e",color:"#e6edf3",fontSize:12.5,lineHeight:1.7,overflowX:"auto",fontFamily:MONO }}>{code}</pre>
          </div>
        );
      }
      return part.split("\n").map((line, i) => {
        let html = line
          .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
          .replace(/`(.+?)`/g, '<code style="background:rgba(0,113,227,0.06);padding:1px 6px;border-radius:4px;font-size:12px;font-family:monospace;color:#0055b0">$1</code>')
          .replace(/\*(.+?)\*/g, '<em>$1</em>');
        if (/^#{1,3}\s/.test(line)) {
          const level = line.match(/^(#+)/)[1].length;
          const content = line.replace(/^#+\s*/, "");
          html = `<strong style="font-size:${18 - level * 2}px;display:block;margin:8px 0 4px">${content}</strong>`;
        }
        if (line.startsWith("• ") || line.startsWith("- ") || /^\d+[\.\)]\s/.test(line)) {
          html = '<span style="display:inline-block;width:16px;flex-shrink:0"></span>' + html;
        }
        return <div key={`${pi}-${i}`} dangerouslySetInnerHTML={{ __html: html || "&nbsp;" }} />;
      });
    });
  };

  /* ─── USER BLOGS STATE (Supabase) ─── */
  const [userBlogs, setUserBlogs] = useState([]);
  const [blogEditorOpen, setBlogEditorOpen] = useState(false);
  const [blogDraft, setBlogDraft] = useState({ title:"", content:"", category:"General" });
  const BLOG_CATEGORIES = ["JCL","COBOL","REXX","VSAM","DB2","CICS","IMS","RACF","z/OS","Modernization","Linux on Z","Career","General"];

  const canWriteBlog = user && (parseInt(user.mfYears||0) >= 5 || parseInt(user.itYears||0) >= 5);

  // Load user blogs from Supabase
  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await supabase.from("user_blogs").select("*").order("created_at",{ascending:false});
        if (data) setUserBlogs(data.map(b => ({
          id:b.id, title:b.title, content:b.content, category:b.category,
          date:(b.created_at||"").slice(0,10), readTime:Math.max(1,Math.round((b.content||"").split(/\s+/).length/200))+" min read",
          author:b.author, authorRole:b.author_role, isUserBlog:true, likes:0
        })));
      } catch {}
    };
    load();
  }, []);

  const saveUserBlog = async () => {
    if (!blogDraft.title.trim() || !blogDraft.content.trim() || !user) return;
    await supabase.from("user_blogs").insert({
      user_id:user.id, title:blogDraft.title.trim(), content:blogDraft.content.trim(),
      category:blogDraft.category, author:user.name, author_role:user.role
    });
    // Reload
    const { data } = await supabase.from("user_blogs").select("*").order("created_at",{ascending:false});
    if (data) setUserBlogs(data.map(b => ({
      id:b.id, title:b.title, content:b.content, category:b.category,
      date:(b.created_at||"").slice(0,10), readTime:Math.max(1,Math.round((b.content||"").split(/\s+/).length/200))+" min read",
      author:b.author, authorRole:b.author_role, isUserBlog:true, likes:0
    })));
    setBlogDraft({ title:"", content:"", category:"General" });
    setBlogEditorOpen(false);
  };

  const likeUserBlog = (blogId) => {
    if (!user) { setAuthModal("signin"); setAuthError(""); return; }
    setUserBlogs(p => p.map(b => b.id === blogId ? { ...b, likes: (b.likes||0) + 1 } : b));
  };

  const allBlogs = [...userBlogs, ...BLOGS];

  /* ─── COMMUNITY Q&A STATE (Supabase) ─── */
  const [communityPosts, setCommunityPosts] = useState([]);
  const [communitySort, setCommunitySort] = useState("hot");
  const [communityFilter, setCommunityFilter] = useState("All");
  const [communitySearch, setCommunitySearch] = useState("");
  const [communityView, setCommunityView] = useState(null);
  const [newPostOpen, setNewPostOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title:"", body:"", topic:"General", author:"" });
  const [newAnswer, setNewAnswer] = useState("");

  // Load Q&A from Supabase (defer realtime to community page visit)
  const qaLoaded = useRef(false);
  useEffect(() => {
    const loadQA = async () => {
      try {
        const { data: posts } = await supabase.from("qa_posts").select("*").order("created_at",{ascending:false});
        const { data: answers } = await supabase.from("qa_answers").select("*").order("created_at",{ascending:true});
        if (posts) {
          const mapped = posts.map(p => ({
            id:p.id, title:p.title, body:p.body, topic:p.topic, author:p.author,
            authorRole:p.author_role, date:(p.created_at||"").slice(0,10), votes:p.votes||1,
            answers:(answers||[]).filter(a=>a.post_id===p.id).map(a=>({
              id:a.id, body:a.body, author:a.author, authorRole:a.author_role,
              date:(a.created_at||"").slice(0,10), votes:a.votes||1
            }))
          }));
          setCommunityPosts(mapped);
        }
      } catch {}
    };
    // Only load data + subscribe when user visits community
    if (page === "community" && !qaLoaded.current) { qaLoaded.current = true; loadQA(); }
    if (page !== "community") return;
    try {
      const ch = supabase.channel("qa").on("postgres_changes",{event:"*",schema:"public",table:"qa_posts"},()=>loadQA()).on("postgres_changes",{event:"*",schema:"public",table:"qa_answers"},()=>loadQA()).subscribe();
      return () => supabase.removeChannel(ch);
    } catch {}
  }, [page]);

  const votePost = async (postId, dir) => {
    if (!user) { setAuthModal("signin"); setAuthError(""); setAuthForm({name:"",email:"",password:"",role:"",itYears:"",mfYears:""}); return; }
    const post = communityPosts.find(p=>p.id===postId); if (!post) return;
    await supabase.rpc("vote_post", { post_id: postId, vote_dir: dir });
    setCommunityPosts(p=>p.map(x=>x.id===postId?{...x,votes:x.votes+dir}:x));
  };
  const voteAnswer = async (postId, ansId, dir) => {
    if (!user) { setAuthModal("signin"); setAuthError(""); setAuthForm({name:"",email:"",password:"",role:"",itYears:"",mfYears:""}); return; }
    await supabase.rpc("vote_answer", { answer_id: ansId, vote_dir: dir });
    setCommunityPosts(p=>p.map(x=>x.id===postId?{...x,answers:x.answers.map(a=>a.id===ansId?{...a,votes:a.votes+dir}:a)}:x));
  };
  const submitPost = async () => {
    if (!user) { setAuthModal("signin"); setAuthError(""); setAuthForm({name:"",email:"",password:"",role:"",itYears:"",mfYears:""}); return; }
    if (!newPost.title.trim()) return;
    await supabase.from("qa_posts").insert({ user_id:user.id, author:user.name, author_role:user.role, title:newPost.title, body:newPost.body, topic:newPost.topic });
    setNewPost({ title:"", body:"", topic:"General", author:"" }); setNewPostOpen(false);
  };
  const submitAnswer = async (postId) => {
    if (!user) { setAuthModal("signin"); setAuthError(""); setAuthForm({name:"",email:"",password:"",role:"",itYears:"",mfYears:""}); return; }
    if (!newAnswer.trim()) return;
    await supabase.from("qa_answers").insert({ post_id:postId, user_id:user.id, author:user.name, author_role:user.role, body:newAnswer });
    setNewAnswer("");
  };
  const sortedPosts = [...communityPosts]
    .filter(p => communityFilter === "All" || p.topic === communityFilter)
    .filter(p => !communitySearch || p.title.toLowerCase().includes(communitySearch.toLowerCase()) || p.body.toLowerCase().includes(communitySearch.toLowerCase()))
    .sort((a,b) => communitySort === "new" ? b.date.localeCompare(a.date) : communitySort === "top" ? b.votes - a.votes : (b.votes + b.answers.length*2) - (a.votes + a.answers.length*2));

  /* ─── REAL COMMUNITY CHAT (Supabase) ─── */
  const [chatMsgs, setChatMsgs] = useState([]);
  const [grpInput, setGrpInput] = useState("");
  const [chatJoined, setChatJoined] = useState(false);
  const [chatSidebar, setChatSidebar] = useState(false);
  const [chatMsgType, setChatMsgType] = useState(CT.TEXT);
  const [chatReply, setChatReply] = useState(null);
  const [chatSrch, setChatSrch] = useState("");
  const [chatShowSrch, setChatShowSrch] = useState(false);
  const [chatStarred, setChatStarred] = useState(new Set());
  const [chatShowStars, setChatShowStars] = useState(false);
  const [chatPopup, setChatPopup] = useState(false);
  const [chatPopPhase, setChatPopPhase] = useState(0);
  const [chatOnlineUsers, setChatOnlineUsers] = useState([]);
  const chatEnd = useRef(null);
  const chatInpRef = useRef(null);

  // Format DB row to UI message
  const fmtMsg = (r) => ({
    id:r.id, type:r.msg_type||"text", text:r.content, del:r.deleted||false,
    reactions:r.reactions||{}, replyTo:r.reply_to,
    time: new Date(r.created_at).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),
    _name:r.sender_name, _role:r.sender_role, _color:r.sender_color||"#0071e3",
    _emoji:r.sender_emoji||"🧑‍💻", _userId:r.user_id,
    _isSelf: r.user_id === user?.id,
  });

  // Load chat messages from Supabase (only when visiting community)
  const chatLoaded = useRef(false);
  useEffect(() => {
    if (page !== "community" && !chatLoaded.current) return;
    chatLoaded.current = true;
    const load = async () => {
      try {
        const { data } = await supabase.from("chat_messages").select("*").order("created_at",{ascending:true}).limit(200);
        if (data) setChatMsgs(data.map(fmtMsg));
      } catch {}
    };
    load();
    try {
      const channel = supabase.channel("chat").on("postgres_changes",{event:"INSERT",schema:"public",table:"chat_messages"}, (payload) => {
        setChatMsgs(prev => [...prev, fmtMsg(payload.new)]);
      }).on("postgres_changes",{event:"UPDATE",schema:"public",table:"chat_messages"}, (payload) => {
        setChatMsgs(prev => prev.map(m => m.id === payload.new.id ? fmtMsg(payload.new) : m));
      }).subscribe();
      return () => { supabase.removeChannel(channel); };
    } catch {}
  }, [user, page]);

  // Load online users (only when visiting community)
  useEffect(() => {
    if (page !== "community") return;
    const load = async () => {
      try {
        const { data } = await supabase.from("user_presence").select("*").gte("last_seen", new Date(Date.now()-5*60000).toISOString());
        if (data) setChatOnlineUsers(data);
      } catch {}
    };
    load();
    const iv = setInterval(load, 30000);
    return () => clearInterval(iv);
  }, [page]);

  // Update presence when user is logged in
  useEffect(() => {
    if (!user) return;
    const update = async () => {
      try {
        await supabase.from("user_presence").upsert({
          user_id:user.id, name:user.name, role:user.role,
          emoji:"🧑‍💻", color:"#0071e3", last_seen:new Date().toISOString()
        });
      } catch {}
    };
    update();
    const iv = setInterval(update, 60000);
    return () => clearInterval(iv);
  }, [user]);

  useEffect(() => { if(!chatPopup)return; setChatPopPhase(0); const a=setTimeout(()=>setChatPopPhase(1),100),b=setTimeout(()=>setChatPopPhase(2),500),c=setTimeout(()=>setChatPopPhase(3),900); return()=>{clearTimeout(a);clearTimeout(b);clearTimeout(c);}; },[chatPopup]);
  useEffect(() => { if(page==="community"&&(chatJoined||user)) setTimeout(()=>chatEnd.current?.scrollIntoView({behavior:"smooth"}),50); },[chatMsgs,page,chatJoined,user]);

  // Auto-join if signed in
  useEffect(() => { if(user) setChatJoined(true); }, [user]);

  const chatSend = async () => {
    if(!grpInput.trim()||!user) return;
    await supabase.from("chat_messages").insert({
      user_id:user.id, sender_name:user.name, sender_role:user.role||"Member",
      sender_color:"#0071e3", sender_emoji:"🧑‍💻",
      msg_type:chatMsgType, content:grpInput.trim(),
      reply_to:chatReply?.id||null
    });
    setGrpInput("");setChatMsgType(CT.TEXT);setChatReply(null);chatInpRef.current?.focus();
  };
  const chatReact = async (mid,em) => {
    const msg = chatMsgs.find(m=>m.id===mid); if(!msg||!user) return;
    const r = {...(msg.reactions||{})}; if(!r[em])r[em]=[];
    if(r[em].includes(user.id)){r[em]=r[em].filter(i=>i!==user.id);if(!r[em].length)delete r[em];}
    else r[em]=[...r[em],user.id];
    await supabase.rpc("react_message", { msg_id: mid, new_reactions: r });
  };
  const chatDel = async (mid) => {
    await supabase.rpc("delete_message", { msg_id: mid });
  };
  const chatStarFn = mid => setChatStarred(p=>{const s=new Set(p);s.has(mid)?s.delete(mid):s.add(mid);return s;});
  const chatFiltered = (() => { let ms=chatMsgs; if(chatShowStars)ms=ms.filter(m=>chatStarred.has(m.id)); if(chatSrch.trim())ms=ms.filter(m=>m.text.toLowerCase().includes(chatSrch.toLowerCase())); return ms; })();
  const chatOnline = chatOnlineUsers.length || 0;
  const chatMembers = chatOnlineUsers.length > 0 ? chatOnlineUsers.map(u=>({name:u.name,role:u.role,color:u.color||"#0071e3",status:"online",emoji:u.emoji||"🧑‍💻"})) : CHAT_MEMBERS;
  // Compatibility shims for UI references
  const chatSelf = user ? 0 : null;
  const chatJoinName = ""; const setChatJoinName = ()=>{};
  const chatJoinRole = ""; const setChatJoinRole = ()=>{};
  const chatAddModal = false; const setChatAddModal = ()=>{};
  const chatNid = {current:999};
  const chatJoin = () => { if(!user){setChatPopup(false);setWelcomePhase(0);setAuthModal("signup");setAuthError("");setAuthForm({name:"",email:"",password:"",role:"",itYears:"",mfYears:""});} else{setChatJoined(true);setPage("community");setCommunityView("chat");setChatPopup(false);} };

  /* ─── WELCOME SEQUENCE + TOP BANNER ─── */
  const [topBanner, setTopBanner] = useState(true);

  /* ─── CODE PLAYGROUND ─── */
  const [pgCode, setPgCode] = useState("//MYJOB   JOB ,'MY JOB',CLASS=A,NOTIFY=&SYSUID\n//STEP1   EXEC PGM=IEBGENER\n//SYSUT1  DD DSN=INPUT.FILE,DISP=SHR\n//SYSUT2  DD DSN=OUTPUT.FILE,\n//           DISP=(NEW,CATLG,DELETE),\n//           SPACE=(TRK,(10,5),RLSE)\n//SYSPRINT DD SYSOUT=*\n//SYSIN   DD DUMMY");
  const [pgLang, setPgLang] = useState("JCL");
  const [pgMode, setPgMode] = useState("explain"); // explain, errors, simulate
  const [pgResult, setPgResult] = useState(null);
  const [pgLoading, setPgLoading] = useState(false);
  const pgSamples = {
    JCL: "//MYJOB   JOB ,'MY JOB',CLASS=A,NOTIFY=&SYSUID\n//STEP1   EXEC PGM=IEBGENER\n//SYSUT1  DD DSN=INPUT.FILE,DISP=SHR\n//SYSUT2  DD DSN=OUTPUT.FILE,\n//           DISP=(NEW,CATLG,DELETE),\n//           SPACE=(TRK,(10,5),RLSE)\n//SYSPRINT DD SYSOUT=*\n//SYSIN   DD DUMMY",
    COBOL: "       IDENTIFICATION DIVISION.\n       PROGRAM-ID. HELLO.\n       DATA DIVISION.\n       WORKING-STORAGE SECTION.\n       01 WS-NAME PIC X(30) VALUE 'MAINFRAME'.\n       01 WS-COUNT PIC 9(4) COMP VALUE 0.\n       PROCEDURE DIVISION.\n           DISPLAY 'HELLO ' WS-NAME\n           ADD 1 TO WS-COUNT\n           STOP RUN.",
    REXX: "/* REXX - Check dataset existence */\nPARSE ARG DSNAME\nIF DSNAME = '' THEN DO\n  SAY 'Usage: DSCHK dataset.name'\n  EXIT 8\nEND\nX = SYSDSN(\"'\"DSNAME\"'\")\nIF X = 'OK' THEN\n  SAY DSNAME 'exists'\nELSE\n  SAY DSNAME 'not found:' X\nEXIT 0",
    "DB2 SQL": "SELECT E.EMPNO, E.LASTNAME, E.SALARY,\n       D.DEPTNAME,\n       AVG(E.SALARY) OVER(PARTITION BY E.WORKDEPT) AS DEPT_AVG\nFROM EMPLOYEE E\nJOIN DEPARTMENT D ON E.WORKDEPT = D.DEPTNO\nWHERE E.SALARY > 50000\nORDER BY E.SALARY DESC\nFETCH FIRST 20 ROWS ONLY;"
  };
  const runPlayground = async () => {
    if (!pgCode.trim()) return;
    setPgLoading(true); setPgResult(null);
    const prompts = {
      explain: `You are an expert IBM z/OS mainframe instructor. Analyze this ${pgLang} code line by line. For EACH statement/line, explain: what it does, why it matters, and any important parameters. Use clear formatting with line references. End with a "Key Takeaways" summary.`,
      errors: `You are an expert IBM z/OS mainframe debugger. Analyze this ${pgLang} code for errors, potential issues, and bad practices. For each issue found: describe the problem, explain why it's wrong, and provide the corrected code. If the code is correct, say so and suggest optimizations. Be specific with line numbers.`,
      simulate: `You are an IBM z/OS mainframe simulator. Given this ${pgLang} code, explain step by step what would happen if this ran on z/OS. Include: what z/OS does at each step, what datasets are allocated/accessed, what output is generated, and what the expected return code would be. Make it feel like watching the job run in real-time.`
    };
    try {
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: prompts[pgMode], messages: [{ role: "user", content: pgCode }] })
      });
      const data = await res.json();
      if (data.content?.[0]?.text) setPgResult(data.content[0].text);
      else setPgResult("Error: " + (data.error || "No response"));
    } catch (e) { setPgResult("Connection error. Please try again."); }
    setPgLoading(false);
  };

  /* ─── FEEDBACK FORM (appears after 5 min) ─── */
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({ rating: 0, message: "", name: "", email: "" });
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const feedbackShown = useRef(false);
  useEffect(() => {
    const alreadyDone = localStorage.getItem("mfsh_feedback_done");
    if (alreadyDone) return;
    const timer = setTimeout(() => {
      if (!feedbackShown.current) { feedbackShown.current = true; setFeedbackOpen(true); }
    }, 5 * 60 * 1000); // 5 minutes
    return () => clearTimeout(timer);
  }, []);
  const submitFeedback = async () => {
    if (!feedbackForm.message.trim()) return;
    setFeedbackLoading(true);
    try {
      await supabase.from("feedback").insert({
        user_id: user?.id || null,
        name: feedbackForm.name.trim() || user?.name || "Anonymous",
        email: feedbackForm.email.trim() || user?.email || null,
        rating: feedbackForm.rating || null,
        message: feedbackForm.message.trim(),
        page: page,
      });
    } catch {}
    localStorage.setItem("mfsh_feedback_done", "1");
    setFeedbackLoading(false);
    setFeedbackSent(true);
    setTimeout(() => { setFeedbackOpen(false); setFeedbackSent(false); }, 2500);
  };
  const [welcomePhase, setWelcomePhase] = useState(0); // 0=none, 1=welcome, 2=signin, 3=community
  const welcomeShown = useRef({welcome:false, signin:false, community:false});

  useEffect(() => {
    // Phase 1: Welcome popup after first user scroll (not timer - avoids Lighthouse TBT)
    const onFirstScroll = () => {
      if (!welcomeShown.current.welcome) {
        setTimeout(() => { setWelcomePhase(1); welcomeShown.current.welcome = true; }, 1500);
      }
      window.removeEventListener("scroll", onFirstScroll);
    };
    window.addEventListener("scroll", onFirstScroll, { passive: true });
    // Phase 2: Sign-in nudge after 60s (if not signed in)
    const t2 = setTimeout(() => {
      if (!user && !welcomeShown.current.signin) { setWelcomePhase(2); welcomeShown.current.signin = true; }
    }, 60000);
    // Phase 3: Community nudge after 120s (if not joined)
    const t3 = setTimeout(() => {
      if (!chatJoined && !welcomeShown.current.community) { setWelcomePhase(3); welcomeShown.current.community = true; }
    }, 120000);
    return () => { window.removeEventListener("scroll", onFirstScroll); clearTimeout(t2); clearTimeout(t3); };
  }, [user, chatJoined]);

  const categories = [
    { id: "all", label: "All" },
    { id: "languages", label: "Languages", ids: ["jcl","cobol","rexx","procs"] },
    { id: "databases", label: "Databases", ids: ["db2","imsdb","vsam"] },
    { id: "middleware", label: "Middleware", ids: ["cics","tso"] },
    { id: "operations", label: "Operations", ids: ["ca7","smf","security"] },
    { id: "modern", label: "Modern Z", ids: ["modernization","linuxonz","zowe"] },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    loadLastUpdate().then(d => setLastUpdate(d));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [page, activeTopic]);

  const filteredTopics = TOPICS.filter(t => {
    const s = search.toLowerCase();
    const matchSearch = t.title.toLowerCase().includes(s) || t.subtitle.toLowerCase().includes(s) || t.description.toLowerCase().includes(s);
    const matchCat = cat === "all" || (categories.find(c => c.id === cat)?.ids || []).includes(t.id);
    return matchSearch && matchCat;
  });

  const openTopic = (t) => { setActiveTopic(t); setActiveTab(0); setPage("topics"); setNavOpen(false); window.scrollTo(0,0); };
  const goPage = (p, tab) => { setPage(p); setActiveTopic(null); setNavOpen(false); setExpandedScenario(null); setExpandedBlog(null); setCommunityView(p==="community" ? (tab||"chat") : null); };

  const answerQuiz = (i) => {
    if (quiz.selected !== null) return;
    const activeQs = dailyMode ? dailyQuestions : quizQuestions;
    const correct = i === activeQs[quiz.index].answer;
    setQuiz(q => ({ ...q, selected: i, score: correct ? q.score + 1 : q.score, showExp: true }));
    setTimeout(() => {
      if (quiz.index + 1 < activeQs.length) {
        setQuiz(q => ({ ...q, index: q.index + 1, selected: null, showExp: false }));
      } else {
        setQuiz(q => ({ ...q, done: true }));
        if (dailyMode) finishDaily(correct ? quiz.score + 1 : quiz.score);
      }
    }, 2200);
  };

  const resetQuiz = () => setQuiz({ index: 0, score: 0, selected: null, done: false, showExp: false });

  const fetchUpdate = async (topic) => {
    setWeeklyLoading(true);
    setWeeklyError(null);
    setWeeklyTopic(topic);
    setWeeklyUpdate(null);
    setWeeklyTab("tip");

    // Try storage first
    const cached = await loadUpdate(topic.id);
    if (cached) {
      setWeeklyUpdate(cached);
      setWeeklyLoading(false);
      return;
    }

    try {
      const update = await fetchWeeklyUpdate(topic);
      if (update) {
        update.topicId = topic.id;
        update.generatedDate = new Date().toLocaleString();
        await saveUpdate(topic.id, update);
        setWeeklyUpdate(update);
        setLastUpdate(new Date().toISOString());
      } else {
        setWeeklyError("Could not parse update. Try again.");
      }
    } catch (e) {
      setWeeklyError("Failed to fetch update: " + e.message);
    } finally {
      setWeeklyLoading(false);
    }
  };

  const refreshUpdate = async () => {
    if (!weeklyTopic) return;
    try { localStorage.removeItem('weekly_' + weeklyTopic.id); } catch {}
    fetchUpdate(weeklyTopic);
  };

  /* ─ Filtered scenarios ─ */
  const filtScenarios = SCENARIOS.filter(s =>
    (scenarioCat === "All" || s.category === scenarioCat) &&
    (scenarioDiff === "All" || s.difficulty === scenarioDiff)
  );
  const scenCats = ["All", ...new Set(SCENARIOS.map(s => s.category))];
  const scenDiffs = ["All", "Beginner", "Intermediate", "Advanced"];

  /* ─────────── RENDER ─────────── */
  return (
    <div style={S.root}>
      {/* Mesh gradient background */}
      <div className="mesh-bg">
        <div className="mesh-orb" style={{ width:600,height:600,top:'-10%',right:'-5%',background:'radial-gradient(circle,#7c3aed,transparent 70%)',animationDelay:'0s' }} />
        <div className="mesh-orb" style={{ width:500,height:500,bottom:'10%',left:'-8%',background:'radial-gradient(circle,#0071e3,transparent 70%)',animationDelay:'4s' }} />
        <div className="mesh-orb" style={{ width:400,height:400,top:'40%',right:'20%',background:'radial-gradient(circle,#06b6d4,transparent 70%)',animationDelay:'8s',opacity:0.1 }} />
      </div>
      <style>{`
        /* system fonts used — no external fonts needed */
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#f8f9fc;overflow-x:hidden}
        .nav-scroll::-webkit-scrollbar{display:none}
        .nav-scroll{-ms-overflow-style:none;scrollbar-width:none}
        .topic-sidebar::-webkit-scrollbar{width:3px}
        .topic-sidebar::-webkit-scrollbar-thumb{background:#e0e0e0;border-radius:3px}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:#d1d1d6;border-radius:3px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes commPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.3)}}
        @keyframes slideDown{from{transform:translateY(-100%);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes popIn{from{transform:scale(0.85) translateY(20px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
        @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes avatarPulse{0%,100%{transform:scale(1);opacity:0.5}50%{transform:scale(1.15);opacity:0.8}}
        @keyframes slideInLeft{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slideInRight{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
        @keyframes pulse{0%,100%{opacity:0.4}50%{opacity:0.8}}
        .fu{animation:fadeUp 0.5s cubic-bezier(.25,.46,.45,.94) both}
        .fi{animation:fadeIn 0.4s ease both}
        .slideL{animation:slideInLeft 0.5s ease both}
        .slideR{animation:slideInRight 0.5s ease both}
        .scaleIn{animation:scaleIn 0.4s cubic-bezier(.25,.46,.45,.94) both}
        .card:hover{transform:translateY(-8px) rotateX(2deg) rotateY(-1deg) scale(1.01)!important;box-shadow:0 24px 60px rgba(0,0,0,0.12),0 0 0 1px rgba(0,113,227,0.08)!important}
        .content-card{background:rgba(255,255,255,0.88);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border:1px solid rgba(255,255,255,0.7);border-radius:22px;padding:44px 48px;box-shadow:0 4px 30px rgba(0,0,0,0.04),0 1px 3px rgba(0,0,0,0.02);transition:box-shadow 0.3s ease}
        .content-card:hover{box-shadow:0 8px 40px rgba(0,0,0,0.06)}
        .content-card pre{font-size:15px!important;line-height:2!important;color:#2d2d30!important;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif!important}
        .mesh-bg{position:fixed;top:0;left:0;right:0;bottom:0;z-index:-1;pointer-events:none;overflow:hidden}
        .mesh-orb{position:absolute;border-radius:50%;filter:blur(80px);opacity:0.18;animation:float 12s ease-in-out infinite}
        .tab:hover{background:rgba(0,0,0,0.03)!important}
        .glow-line{height:2px;background:linear-gradient(90deg,transparent,#0071e3,#7c3aed,transparent);background-size:200% 100%;animation:shimmer 3s linear infinite}
        .hero-glow{position:absolute;width:320px;height:320px;border-radius:50%;filter:blur(100px);opacity:0.2;animation:pulse 5s ease-in-out infinite}
        .card{transition:all 0.35s cubic-bezier(.25,.46,.45,.94)!important;transform-style:preserve-3d!important;perspective:800px!important}
        .card:hover .card-icon{transform:scale(1.2) rotate(-5deg);transition:transform 0.3s ease}
        .card-icon{transition:transform 0.3s ease;display:inline-block}
        .scenario-card{transition:all 0.3s ease!important}
        .scenario-card:hover{transform:translateY(-3px)!important;box-shadow:0 12px 36px rgba(0,0,0,0.1)!important}
        .glow-btn{position:relative;overflow:hidden}
        .glow-btn::after{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(255,255,255,0.25) 0%,transparent 70%);transform:scale(0);transition:transform 0.5s ease;border-radius:50%}
        .glow-btn:hover::after{transform:scale(1)}
        .hero-float{animation:float 6s ease-in-out infinite}
        .hero-float-delay{animation:float 6s ease-in-out 2s infinite}
        .text-gradient{background:linear-gradient(135deg,#0071e3 0%,#7c3aed 50%,#0071e3 100%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:gradientShift 4s ease infinite}
        .stat-card{transition:transform 0.3s ease,box-shadow 0.3s ease}
        .stat-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,0.08)}
        @keyframes chatBounce{0%{transform:scale(0.8);opacity:0}50%{transform:scale(1.05)}100%{transform:scale(1);opacity:1}}
        @keyframes chatSlideUp{from{opacity:0;transform:translateY(20px) scale(0.95)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes dotPulse{0%,80%,100%{transform:scale(0.6);opacity:0.4}40%{transform:scale(1);opacity:1}}
        .chat-fab{animation:chatBounce 0.4s ease both;transition:transform 0.2s,box-shadow 0.2s}
        .chat-fab:hover{transform:scale(1.08)!important;box-shadow:0 8px 32px rgba(124,58,237,0.4)!important}
        .chat-window{animation:chatSlideUp 0.3s ease both}
        .chat-msg-enter{animation:fadeUp 0.3s ease both}
        .chat-input:focus{border-color:#7c3aed!important;box-shadow:0 0 0 3px rgba(124,58,237,0.1)!important}
        .card{transition:transform .22s ease,box-shadow .22s ease!important}
        .nav-btn:hover{color:#1d1d1f!important}
        .pill:hover{opacity:.85!important}
        .tab:hover{color:#1d1d1f!important}
        .scenario-card:hover{border-color:#0071e3!important}
        .scenario-card{transition:border-color .2s ease!important}
        @keyframes revealUp{from{opacity:0;transform:translateY(40px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        .reveal{opacity:0;animation:revealUp 0.7s cubic-bezier(.25,.46,.45,.94) forwards}
        @keyframes glow3d{0%{box-shadow:0 0 20px rgba(0,113,227,0.15)}50%{box-shadow:0 0 40px rgba(124,58,237,0.2)}100%{box-shadow:0 0 20px rgba(0,113,227,0.15)}}
        .card:hover .card-icon{transform:scale(1.3) rotate(-8deg) translateZ(20px)!important;transition:transform 0.4s cubic-bezier(.34,1.56,.64,1)!important}

        /* ═══ RESPONSIVE — TABLET (≤768px) ═══ */
        @media(max-width:768px){
          .content-card{padding:24px 20px!important;border-radius:16px!important}
          .content-card pre{font-size:12.5px!important;white-space:pre-wrap!important;word-break:break-all!important}
          .hero-glow{width:200px!important;height:200px!important;filter:blur(60px)!important}
          .hero-float,.hero-float-delay{display:none!important}
        }

        /* ═══ RESPONSIVE — MOBILE (≤480px) ═══ */
        @media(max-width:480px){
          .content-card{padding:18px 14px!important;border-radius:14px!important}
          .content-card pre{font-size:11.5px!important;padding:12px!important}
          .chat-fab{width:52px!important;height:52px!important;font-size:22px!important;bottom:16px!important;right:16px!important}
          .chat-window{bottom:78px!important;right:8px!important;left:8px!important;width:auto!important;max-width:none!important;border-radius:20px!important}
          .hero-glow{width:150px!important;height:150px!important}
        }

        /* ═══ TOUCH TARGETS — all mobile ═══ */
        @media(hover:none) and (pointer:coarse){
          button,a,[role="button"]{min-height:44px}
          .tab{min-height:44px!important}
          .pill{min-height:36px!important}
          input,select,textarea{font-size:16px!important}
        }

        /* ═══ SAFE AREA — iPhone notch ═══ */
        @supports(padding: env(safe-area-inset-bottom)){
          .chat-fab{bottom:calc(16px + env(safe-area-inset-bottom))!important}
          .chat-window{bottom:calc(78px + env(safe-area-inset-bottom))!important}
        }

        /* ═══ PRINT ═══ */
        @media print{
          .chat-fab,.chat-window,.mesh-bg,.mesh-orb,.hero-glow{display:none!important}
          body{background:#fff!important}
          .content-card{box-shadow:none!important;border:1px solid #ddd!important}
        }
      `}</style>

      {/* ══ NAV ══ */}
      <nav role="navigation" aria-label="Main navigation" style={{ ...S.nav,
        background: scrolled ? "rgba(248,249,252,0.88)" : "rgba(248,249,252,0.6)",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.1)" : "none",
        backdropFilter: "saturate(180%) blur(20px)",
        WebkitBackdropFilter: "saturate(180%) blur(20px)",
      }}>
        <div style={S.navInner}>
          <button style={S.navLogo} onClick={() => goPage("home")}>
            <img src="/favicon.svg" alt="logo" style={{ width:28,height:28,borderRadius:6 }} />
            <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: "-.3px" }}>MainframeStudyHub</span>
          </button>
          <div className="nav-scroll" style={S.navLinks}>
            {[["home","Overview"],["topics","Topics"],["scenarios","Scenarios"],["blog","Blog"],["quiz","Quiz"],["playground","Code Lab"],["community","Community"],["abends","Abend Solver"],["roadmap","Roadmap"],["weekly","Weekly Update"],["about","About"]].map(([p,l]) => (
              <button key={p} className="nav-btn" onClick={() => goPage(p)}
                style={{ ...S.navLink, color: page===p ? "#1d1d1f":"#555", fontWeight: page===p?600:400 }}>
                {l}
              </button>
            ))}
          </div>
          {/* Auth */}
          {user ? (
            <UserAvatar name={user.name} size={32} showRing
              onClick={() => setAuthModal(authModal==="profile"?null:"profile")}
              style={{ marginLeft:8 }} />
          ) : (
            <button onClick={() => { setAuthModal("signin"); setAuthError(""); setAuthForm({name:"",email:"",password:"",role:"",itYears:"",mfYears:""}); }}
              style={{ marginLeft:8,background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",border:"none",
                borderRadius:980,padding:"6px 16px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:FF,whiteSpace:"nowrap",flexShrink:0 }}>
              Sign In
            </button>
          )}
          <button aria-label="Menu" style={S.hamburger} onClick={() => setNavOpen(o => !o)}>
            <div style={{ width:18,height:1.5,background:"#1d1d1f",marginBottom:5,transform:navOpen?"rotate(45deg) translate(4px,4px)":"none",transition:"all .2s" }} />
            <div style={{ width:18,height:1.5,background:"#1d1d1f",marginBottom:5,opacity:navOpen?0:1,transition:"all .2s" }} />
            <div style={{ width:18,height:1.5,background:"#1d1d1f",transform:navOpen?"rotate(-45deg) translate(4px,-4px)":"none",transition:"all .2s" }} />
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      {navOpen && (
        <div style={S.drawer} className="fi">
          <div style={{ height:52 }} />
          {/* Mobile user info */}
          {user ? (
            <div style={{ padding:"12px 24px",display:"flex",alignItems:"center",gap:12,borderBottom:"1px solid rgba(0,0,0,0.06)",marginBottom:8 }}>
              <UserAvatar name={user.name} size={36} showRing />
              <div style={{ flex:1,minWidth:0 }}>
                <div style={{ fontSize:14,fontWeight:700,color:"#1d1d1f" }}>{user.name}</div>
                <div style={{ fontSize:11,color:"#666" }}>{user.role} · {user.mfYears}yr MF</div>
              </div>
              <button onClick={() => { authSignOut(); setNavOpen(false); }}
                style={{ fontSize:11,color:"#991b1b",background:"#fee2e2",border:"none",borderRadius:6,padding:"4px 10px",cursor:"pointer",fontFamily:FF }}>
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ padding:"8px 24px 12px",borderBottom:"1px solid rgba(0,0,0,0.06)",marginBottom:8 }}>
              <button onClick={() => { setAuthModal("signin"); setAuthError(""); setNavOpen(false); }}
                style={{ width:"100%",background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",border:"none",
                  borderRadius:10,padding:"10px",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:FF }}>
                Sign In / Sign Up
              </button>
            </div>
          )}
          {[["home","🏠 Overview"],["topics","📚 Topics"],["scenarios","🎯 Scenarios"],["blog","📰 Blog"],["quiz","🧠 Quiz"],["community","💬 Community"],["abends","🔍 Abend Solver"],["roadmap","🗺️ Roadmap"],["weekly","🔄 Weekly Update"],["about","👤 About"]].map(([p,l]) => (
            <button key={p} onClick={() => goPage(p)}
              style={{ ...S.drawerLink, color: page===p?"#0071e3":"#1d1d1f" }}>{l}</button>
          ))}
          <div style={{ height:1,background:"#f5f5f7",margin:"8px 0" }} />
          {TOPICS.map(t => (
            <button key={t.id} onClick={() => openTopic(t)} style={S.drawerTopicLink}>
              {t.icon} {t.title}
            </button>
          ))}
        </div>
      )}
      {navOpen && <div style={{ position:"fixed",inset:0,zIndex:998 }} onClick={() => setNavOpen(false)} />}

      {/* ─── FLOATING COMMUNITY TOP BANNER ─── */}
      {topBanner && (
        <div style={{ position:"fixed",top:52,left:0,right:0,zIndex:900,background:"linear-gradient(90deg,#0a1628 0%,#0d2040 50%,#0a1628 100%)",borderBottom:"1px solid rgba(0,113,227,0.2)",padding:"8px 0",animation:"slideDown 0.5s ease",overflow:"hidden" }}>
          <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%,rgba(0,113,227,0.08),transparent 70%)" }} />
          <div style={{ maxWidth:1200,margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",justifyContent:"center",gap:16,position:"relative" }}>
            <span style={{ width:7,height:7,borderRadius:"50%",background:"#00b365",boxShadow:"0 0 6px #00b365",animation:"commPulse 2s ease-in-out infinite",flexShrink:0 }} />
            <span style={{ fontSize:13,color:"rgba(255,255,255,0.8)",fontWeight:500 }}>🖥️ <strong style={{color:"#fff"}}>MainframeStudyHub Community</strong> is live — {chatOnline} members online</span>
            <button onClick={() => { setChatPopup(true); setChatPopPhase(0); setTopBanner(false); }}
              style={{ background:"rgba(0,113,227,0.9)",color:"#fff",border:"none",borderRadius:980,padding:"5px 16px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:FF,flexShrink:0 }}>Join Now</button>
            <button onClick={() => setTopBanner(false)} style={{ position:"absolute",right:24,background:"none",border:"none",color:"rgba(255,255,255,0.3)",cursor:"pointer",fontSize:16,padding:4 }}aria-label="Close">✕</button>
          </div>
        </div>
      )}

      <main id="main-content" role="main" style={{ paddingTop: 52, minHeight: "100vh" }}>

        {/* ══ AUTH MODAL ══ */}
        {(authModal==="signin" || authModal==="signup") && (
          <div style={{ position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",
            background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)" }}
            onClick={e => { if(e.target===e.currentTarget) setAuthModal(null); }}>
            <div className="scaleIn" style={{ background:"rgba(255,255,255,0.97)",backdropFilter:"blur(20px)",borderRadius:24,
              padding:"36px 32px",maxWidth:420,width:"90%",boxShadow:"0 24px 80px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.8)" }}>
              {/* Header */}
              <div style={{ textAlign:"center",marginBottom:24 }}>
                <img src="/favicon.svg" alt="logo" style={{ width:48,height:48,borderRadius:12,marginBottom:12 }} />
                <h2 style={{ fontSize:24,fontWeight:800,letterSpacing:"-0.5px",color:"#1d1d1f",marginBottom:4 }}>
                  {authModal==="signin" ? "Welcome Back" : "Join MainframeStudyHub"}
                </h2>
                <p style={{ fontSize:14,color:"#666" }}>
                  {authModal==="signin" ? "Sign in to your account" : "Create your account to join the community"}
                </p>
              </div>

              {/* Google OAuth Button */}
              <button onClick={authSignInWithGoogle} disabled={authLoading}
                style={{ width:"100%",padding:"11px",background:"#fff",color:"#1d1d1f",border:"1.5px solid #e0e0e0",
                  borderRadius:12,fontSize:14,fontWeight:600,cursor:authLoading?"wait":"pointer",fontFamily:FF,
                  display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:16,
                  transition:"background 0.2s,box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background="#f8f8f8"; e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.boxShadow="none"; }}>
                <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                {authModal==="signin" ? "Sign in with Google" : "Sign up with Google"}
              </button>

              <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:16 }}>
                <div style={{ flex:1,height:1,background:"#e8e8ed" }} />
                <span style={{ fontSize:12,color:"#666",fontWeight:500 }}>or</span>
                <div style={{ flex:1,height:1,background:"#e8e8ed" }} />
              </div>

              {authError && (
                <div style={{ background:"#fee2e2",color:"#991b1b",padding:"10px 14px",borderRadius:10,fontSize:13,marginBottom:16,border:"1px solid #fecaca" }}>
                  {authError}
                </div>
              )}

              {/* Sign Up extra fields */}
              {authModal==="signup" && (
                <input value={authForm.name} onChange={e => setAuthForm({...authForm, name:e.target.value})}
                  aria-label="Full name" placeholder="Full Name *" style={modalInput} />
              )}
              <input value={authForm.email} onChange={e => setAuthForm({...authForm, email:e.target.value})}
                aria-label="Email address" placeholder="Email *" type="email" style={modalInput} />
              <input value={authForm.password} onChange={e => setAuthForm({...authForm, password:e.target.value})}
                placeholder={authModal==="signup" ? "Password (min 6 chars) *" : "Password *"} type="password" style={modalInput}
                onKeyDown={e => { if(e.key==="Enter" && !authLoading) { e.preventDefault(); authModal==="signin"?authSignIn():authSignUp(); }}} />

              {authModal==="signup" && (
                <>
                  <div style={{ marginBottom:16 }}>
                    <label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:4 }}>Current Role</label>
                    <select value={authForm.role} onChange={e => setAuthForm({...authForm, role:e.target.value})}
                      style={{ ...modalInput, marginBottom:0,cursor:"pointer",color:authForm.role?"#1d1d1f":"#666" }}>
                      <option value="">Select your role...</option>
                      {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div style={{ display:"flex",gap:10,marginBottom:20 }}>
                    <div style={{ flex:1 }}>
                      <label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:4 }}>IT Experience (years)</label>
                      <input value={authForm.itYears} onChange={e => setAuthForm({...authForm, itYears:e.target.value})}
                        aria-label="IT experience years" placeholder="e.g. 5" type="number" min="0" max="50" style={{ ...modalInput, marginBottom:0 }} />
                    </div>
                    <div style={{ flex:1 }}>
                      <label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:4 }}>Mainframe Exp (years)</label>
                      <input value={authForm.mfYears} onChange={e => setAuthForm({...authForm, mfYears:e.target.value})}
                        aria-label="Mainframe experience years" placeholder="e.g. 2" type="number" min="0" max="50" style={{ ...modalInput, marginBottom:0 }} />
                    </div>
                  </div>
                </>
              )}

              <button onClick={authModal==="signin" ? authSignIn : authSignUp}
                disabled={authLoading}
                className="glow-btn"
                style={{ width:"100%",padding:"12px",background:authLoading?"#a0a0a5":"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",
                  border:"none",borderRadius:12,fontSize:15,fontWeight:700,cursor:authLoading?"wait":"pointer",fontFamily:FF,marginTop:authModal==="signin"?16:0 }}>
                {authLoading ? "Please wait..." : authModal==="signin" ? "Sign In" : "Create Account"}
              </button>

              {/* Forgot Password link */}
              {authModal==="signin" && (
                <div style={{ textAlign:"center",marginTop:10 }}>
                  <button onClick={authForgotPassword}
                    style={{ background:"none",border:"none",color:"#666",cursor:"pointer",fontFamily:FF,fontSize:12,fontWeight:500 }}>
                    Forgot your password?
                  </button>
                </div>
              )}

              <div style={{ textAlign:"center",marginTop:12,fontSize:13,color:"#666" }}>
                {authModal==="signin" ? (
                  <>Don't have an account? <button onClick={() => { setAuthModal("signup"); setAuthError(""); }}
                    style={{ background:"none",border:"none",color:"#0071e3",cursor:"pointer",fontWeight:600,fontFamily:FF,fontSize:13 }}>Sign Up</button></>
                ) : (
                  <>Already have an account? <button onClick={() => { setAuthModal("signin"); setAuthError(""); }}
                    style={{ background:"none",border:"none",color:"#0071e3",cursor:"pointer",fontWeight:600,fontFamily:FF,fontSize:13 }}>Sign In</button></>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══ PROFILE DROPDOWN ══ */}
        {authModal==="profile" && (
          <>
            <div style={{ position:"fixed",inset:0,zIndex:9998 }} onClick={() => setAuthModal(null)} />
            <div className="scaleIn" style={{ position:"fixed",top:48,right:16,zIndex:9999,background:"rgba(255,255,255,0.97)",
              backdropFilter:"blur(20px)",borderRadius:18,padding:24,boxShadow:"0 16px 56px rgba(0,0,0,0.18)",
              border:"1px solid rgba(0,0,0,0.06)",minWidth:260 }}>
              <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:18,paddingBottom:16,borderBottom:"1px solid rgba(0,0,0,0.06)" }}>
                <UserAvatar name={user?.name} size={52} showRing />
                <div>
                  <div style={{ fontSize:17,fontWeight:800,color:"#1d1d1f",letterSpacing:"-0.3px" }}>{user?.name}</div>
                  <div style={{ fontSize:12,color:"#0071e3",fontWeight:600 }}>{user?.role}</div>
                  <div style={{ fontSize:11,color:"#666" }}>{user?.email}</div>
                </div>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:18 }}>
                <div style={{ background:"rgba(245,245,247,0.8)",borderRadius:12,padding:"12px",textAlign:"center" }}>
                  <div style={{ fontSize:22,fontWeight:800,color:"#1d1d1f" }}>{user?.itYears}</div>
                  <div style={{ fontSize:10,color:"#666",fontWeight:600 }}>IT YEARS</div>
                </div>
                <div style={{ background:"rgba(245,245,247,0.8)",borderRadius:12,padding:"12px",textAlign:"center" }}>
                  <div style={{ fontSize:22,fontWeight:800,color:"#1d1d1f" }}>{user?.mfYears}</div>
                  <div style={{ fontSize:10,color:"#666",fontWeight:600 }}>MF YEARS</div>
                </div>
              </div>
              <div style={{ fontSize:12,color:"#666",marginBottom:16,textAlign:"center" }}>
                Member since {user?.joinDate}
              </div>
              <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
                <button onClick={openEditProfile}
                  style={{ width:"100%",padding:"10px",background:"rgba(0,113,227,0.08)",color:"#0071e3",border:"none",
                    borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:FF }}>
                  ✏️ Edit Profile
                </button>
                <button onClick={() => { setChangePassOpen(true); setAuthModal(null); setPassMsg(""); setNewPassword(""); }}
                  style={{ width:"100%",padding:"10px",background:"rgba(245,245,247,0.8)",color:"#3a3a3c",border:"none",
                    borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:FF }}>
                  🔒 Change Password
                </button>
                <button onClick={() => { authSignOut(); setAuthModal(null); }}
                  style={{ width:"100%",padding:"10px",background:"#fee2e2",color:"#991b1b",border:"none",
                    borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:FF }}>
                  Sign Out
                </button>
              </div>
            </div>
          </>
        )}

        {/* ══ FORGOT PASSWORD SENT ══ */}
        {authModal==="forgot-sent" && (
          <div style={{ position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",
            background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)" }}
            onClick={e => { if(e.target===e.currentTarget) setAuthModal(null); }}>
            <div className="scaleIn" style={{ background:"rgba(255,255,255,0.97)",backdropFilter:"blur(20px)",borderRadius:24,
              padding:"40px 32px",maxWidth:400,width:"90%",textAlign:"center",boxShadow:"0 24px 80px rgba(0,0,0,0.2)" }}>
              <div style={{ fontSize:56,marginBottom:16 }}>📧</div>
              <h2 style={{ fontSize:22,fontWeight:800,color:"#1d1d1f",marginBottom:8 }}>Check Your Email</h2>
              <p style={{ fontSize:14,color:"#666",lineHeight:1.6,marginBottom:24 }}>
                We've sent a password reset link to <strong style={{ color:"#1d1d1f" }}>{authForm.email}</strong>. Click the link in the email to set a new password.
              </p>
              <button onClick={() => { setAuthModal("signin"); setAuthError(""); }}
                className="glow-btn"
                style={{ padding:"10px 28px",background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",
                  border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:FF }}>
                Back to Sign In
              </button>
            </div>
          </div>
        )}

        {/* ══ EDIT PROFILE MODAL ══ */}
        {editProfileOpen && (
          <div style={{ position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",
            background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)" }}
            onClick={e => { if(e.target===e.currentTarget) setEditProfileOpen(false); }}>
            <div className="scaleIn" style={{ background:"rgba(255,255,255,0.97)",backdropFilter:"blur(20px)",borderRadius:24,
              padding:"36px 32px",maxWidth:420,width:"90%",boxShadow:"0 24px 80px rgba(0,0,0,0.2)" }}>
              <div style={{ textAlign:"center",marginBottom:24 }}>
                <div style={{ width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#0071e3,#7c3aed)",
                  color:"#fff",fontSize:24,fontWeight:700,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:12 }}>
                  {editForm.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <h2 style={{ fontSize:22,fontWeight:800,color:"#1d1d1f" }}>Edit Profile</h2>
              </div>
              <label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:4 }}>Full Name</label>
              <input value={editForm.name} onChange={e => setEditForm({...editForm, name:e.target.value})}
                aria-label="Full name" placeholder="Full Name *" style={modalInput} />
              <label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:4 }}>Current Role</label>
              <select value={editForm.role} onChange={e => setEditForm({...editForm, role:e.target.value})}
                style={{ ...modalInput, cursor:"pointer",color:"#1d1d1f" }}>
                <option value="">Select your role...</option>
                {ROLE_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
              <div style={{ display:"flex",gap:10,marginBottom:20 }}>
                <div style={{ flex:1 }}>
                  <label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:4 }}>IT Experience (years)</label>
                  <input value={editForm.itYears} onChange={e => setEditForm({...editForm, itYears:e.target.value})}
                    type="number" min="0" max="50" style={{ ...modalInput, marginBottom:0 }} />
                </div>
                <div style={{ flex:1 }}>
                  <label style={{ fontSize:12,fontWeight:600,color:"#666",display:"block",marginBottom:4 }}>Mainframe Exp (years)</label>
                  <input value={editForm.mfYears} onChange={e => setEditForm({...editForm, mfYears:e.target.value})}
                    type="number" min="0" max="50" style={{ ...modalInput, marginBottom:0 }} />
                </div>
              </div>
              <div style={{ display:"flex",gap:10 }}>
                <button onClick={saveProfile} disabled={authLoading} className="glow-btn"
                  style={{ flex:1,padding:"12px",background:authLoading?"#a0a0a5":"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",
                    border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:authLoading?"wait":"pointer",fontFamily:FF }}>
                  {authLoading ? "Saving..." : "Save Changes"}
                </button>
                <button onClick={() => setEditProfileOpen(false)}
                  style={{ padding:"12px 20px",background:"rgba(245,245,247,0.8)",color:"#3a3a3c",border:"none",
                    borderRadius:12,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:FF }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ══ CHANGE PASSWORD MODAL ══ */}
        {changePassOpen && (
          <div style={{ position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",
            background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)" }}
            onClick={e => { if(e.target===e.currentTarget) setChangePassOpen(false); }}>
            <div className="scaleIn" style={{ background:"rgba(255,255,255,0.97)",backdropFilter:"blur(20px)",borderRadius:24,
              padding:"36px 32px",maxWidth:380,width:"90%",boxShadow:"0 24px 80px rgba(0,0,0,0.2)" }}>
              <div style={{ textAlign:"center",marginBottom:24 }}>
                <div style={{ fontSize:48,marginBottom:8 }}>🔒</div>
                <h2 style={{ fontSize:22,fontWeight:800,color:"#1d1d1f" }}>Change Password</h2>
              </div>
              {passMsg && (
                <div style={{ background:passMsg.includes("✅")?"#f0fdf4":"#fee2e2",color:passMsg.includes("✅")?"#166534":"#991b1b",
                  padding:"10px 14px",borderRadius:10,fontSize:13,marginBottom:16 }}>
                  {passMsg}
                </div>
              )}
              <input value={newPassword} onChange={e => setNewPassword(e.target.value)}
                placeholder="New password (min 6 chars)" type="password" style={modalInput}
                onKeyDown={e => { if(e.key==="Enter") changePassword(); }} />
              <div style={{ display:"flex",gap:10 }}>
                <button onClick={changePassword} disabled={authLoading} className="glow-btn"
                  style={{ flex:1,padding:"12px",background:authLoading?"#a0a0a5":"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",
                    border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:authLoading?"wait":"pointer",fontFamily:FF }}>
                  {authLoading ? "Updating..." : "Update Password"}
                </button>
                <button onClick={() => setChangePassOpen(false)}
                  style={{ padding:"12px 20px",background:"rgba(245,245,247,0.8)",color:"#3a3a3c",border:"none",
                    borderRadius:12,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:FF }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ HOME ════════════════ */}
        {page === "home" && (
          <div>
            <section style={{ position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#030712 0%,#0a0e27 40%,#0f1642 70%,#1a0a3e 100%)",
              padding:"100px 0 70px",minHeight:"85vh",display:"flex",alignItems:"center" }}>
              {/* 3D Background — deferred load for performance */}
              {show3D && (
                <Suspense fallback={null}><Hero3D /></Suspense>
              )}
              {/* Gradient overlay for text readability */}
              <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 30% 50%,rgba(0,113,227,0.12) 0%,transparent 60%)",pointerEvents:"none" }} />
              <div style={{ position:"absolute",inset:0,background:"radial-gradient(ellipse at 70% 60%,rgba(124,58,237,0.1) 0%,transparent 50%)",pointerEvents:"none" }} />
              {/* Grid pattern */}
              <div style={{ position:"absolute",inset:0,opacity:0.04,pointerEvents:"none",
                backgroundImage:"linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)",
                backgroundSize:"60px 60px" }} />

              <div style={{ ...S.heroInner,position:"relative",zIndex:2 }}>
                <div className="fu" style={{ animationDelay:"0ms",display:"inline-flex",alignItems:"center",gap:8,
                  background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:980,
                  padding:"8px 20px 8px 12px",marginBottom:20,backdropFilter:"blur(10px)" }}>
                  <span style={{ width:8,height:8,borderRadius:"50%",background:"#22c55e",animation:"pulse 2s ease infinite" }} />
                  <span style={{ fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.8)",letterSpacing:"0.5px" }}>IBM Z Knowledge Platform</span>
                </div>
                <h1 className="fu" style={{ fontSize:"clamp(40px,7vw,76px)",fontWeight:900,lineHeight:1.04,letterSpacing:"-3px",
                  color:"#fff",marginBottom:20,animationDelay:"80ms" }}>
                  Everything<br/>Mainframe.
                </h1>
                <h2 className="fu" style={{ fontSize:"clamp(22px,3.5vw,36px)",fontWeight:800,lineHeight:1.15,letterSpacing:"-1px",
                  marginBottom:24,animationDelay:"140ms",
                  background:"linear-gradient(135deg,#60a5fa 0%,#a78bfa 40%,#f472b6 70%,#22d3ee 100%)",
                  backgroundSize:"200% auto",animation:"gradientShift 4s ease infinite",
                  WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>
                  Beginner to Professional.
                </h2>
                <p className="fu" style={{ fontSize:"clamp(15px,1.6vw,18px)",color:"rgba(255,255,255,0.55)",lineHeight:1.7,
                  maxWidth:560,marginBottom:36,animationDelay:"200ms",fontWeight:400 }}>
                  The most comprehensive IBM Z reference. JCL, COBOL, REXX, DB2, CICS, IMS, RACF — every topic, every level, updated weekly.
                </p>
                <div className="fu" style={{ display:"flex",gap:12,flexWrap:"wrap",animationDelay:"260ms" }}>
                  <button className="glow-btn" onClick={() => goPage("topics")}
                    style={{ padding:"14px 32px",background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",
                      border:"none",borderRadius:14,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:FF,
                      boxShadow:"0 4px 24px rgba(0,113,227,0.4),0 0 0 1px rgba(255,255,255,0.1) inset",
                      transition:"transform 0.2s,box-shadow 0.2s" }}>
                    Explore Topics →
                  </button>
                  <button onClick={() => goPage("quiz")}
                    style={{ padding:"14px 28px",background:"rgba(255,255,255,0.06)",color:"#fff",
                      border:"1px solid rgba(255,255,255,0.15)",borderRadius:14,fontSize:15,fontWeight:600,
                      cursor:"pointer",fontFamily:FF,backdropFilter:"blur(10px)",transition:"all 0.2s" }}
                    onMouseOver={e => { e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"; }}
                    onMouseOut={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; }}>
                    Take the Quiz
                  </button>
                  <button onClick={() => goPage("abends")}
                    style={{ padding:"14px 28px",background:"rgba(255,255,255,0.06)",color:"#fff",
                      border:"1px solid rgba(255,255,255,0.15)",borderRadius:14,fontSize:15,fontWeight:600,
                      cursor:"pointer",fontFamily:FF,backdropFilter:"blur(10px)",transition:"all 0.2s" }}
                    onMouseOver={e => { e.currentTarget.style.background="rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"; }}
                    onMouseOut={e => { e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; }}>
                    Abend Solver
                  </button>
                </div>
                {/* Tech tags */}
                <div className="fu" style={{ display:"flex",gap:8,flexWrap:"wrap",marginTop:40,animationDelay:"320ms" }}>
                  {["JCL","COBOL","DB2","CICS","VSAM","REXX","IMS","RACF","z/OS","TSO"].map(t => (
                    <span key={t} style={{ fontSize:11,fontWeight:600,padding:"4px 12px",borderRadius:980,
                      background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
                      color:"rgba(255,255,255,0.45)",letterSpacing:"0.5px" }}>{t}</span>
                  ))}
                </div>
              </div>
            </section>

            {/* Stats bar — floating over the dark/light transition */}
            <section style={{ background:"#fff",position:"relative",zIndex:3 }}>
              <div style={{ maxWidth:1000,margin:"0 auto",padding:"0 24px",transform:"translateY(-40px)" }}>
                <div style={{ display:"flex",justifyContent:"center",gap:0,flexWrap:"wrap",
                  background:"rgba(255,255,255,0.95)",backdropFilter:"blur(20px)",borderRadius:20,
                  padding:"24px 16px",boxShadow:"0 8px 40px rgba(0,0,0,0.08),0 0 0 1px rgba(0,0,0,0.04)" }}>
                  {[["15","Topics","📚"],["192+","Sections","📄"],["200","Quiz Qs","🧠"],["87","Abend Codes","🔍"],["6","Levels","🗺️"],["Weekly","AI Updates","🤖"]].map(([n,l,icon],i) => (
                    <div key={l} className="fu stat-card" style={{ flex:"1 1 120px",textAlign:"center",padding:"12px 8px",
                      borderRadius:12,animationDelay:`${i*60}ms`,cursor:"default" }}>
                      <div style={{ fontSize:11,marginBottom:4 }}>{icon}</div>
                      <div style={{ fontSize:24,fontWeight:800,color:"#1d1d1f",letterSpacing:"-1px",lineHeight:1 }}>{n}</div>
                      <div style={{ fontSize:11,color:"#666",fontWeight:600,marginTop:4 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section style={{ ...S.section, background:"rgba(245,245,247,0.5)" }}>
              <div style={S.inner}>
                <h2 style={S.sectionTitle}>All Topics — A to Z.</h2>
                <div style={S.topicsGrid}>
                  {TOPICS.map((t,i) => (
                    <button key={t.id} className="card fu" style={{ ...S.topicCard, borderTop:`3px solid ${t.color}`, animationDelay:`${i*25}ms` }}
                      onClick={() => openTopic(t)}>
                      <div style={{ fontSize:32,marginBottom:12 }}>{t.icon}</div>
                      <div style={S.tcTitle}>{t.title}</div>
                      <div style={S.tcSub}>{t.subtitle}</div>
                      <div style={{ fontSize:11,color:"#666",marginBottom:10 }}>{t.level}</div>
                      <div style={{ ...S.tcMore, color:darkenColor(t.color) }}>Learn more →</div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section style={S.section}>
              <div style={S.inner}>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24 }}>
                  <div className="card" style={S.featureCard} onClick={() => goPage("scenarios")}>
                    <div style={{ fontSize:40,marginBottom:16 }}>🎯</div>
                    <h3 style={S.fcTitle}>Real-World Scenarios</h3>
                    <p style={S.fcDesc}>Production abends, performance issues, security incidents. Solve real problems with expert analysis and step-by-step solutions.</p>
                    <div style={{ color:"#0071e3",fontSize:14,fontWeight:500,marginTop:16 }}>Browse Scenarios →</div>
                  </div>
                  <div className="card" style={S.featureCard} onClick={() => goPage("blog")}>
                    <div style={{ fontSize:40,marginBottom:16 }}>📰</div>
                    <h3 style={S.fcTitle}>Expert Blog</h3>
                    <p style={S.fcDesc}>Deep dives into mainframe topics. Why COBOL will outlive all of us. Debugging production abends at 3 AM. IMS vs DB2 explained.</p>
                    <div style={{ color:"#0071e3",fontSize:14,fontWeight:500,marginTop:16 }}>Read Articles →</div>
                  </div>
                  <div className="card" style={S.featureCard} onClick={() => goPage("weekly")}>
                    <div style={{ fontSize:40,marginBottom:16 }}>🔄</div>
                    <h3 style={S.fcTitle}>Weekly AI Updates</h3>
                    <p style={S.fcDesc}>Every Saturday, fresh content generated by AI for any mainframe topic. New tips, new scenarios, new code examples — always current.</p>
                    <div style={{ color:"#0071e3",fontSize:14,fontWeight:500,marginTop:16 }}>Get This Week's Update →</div>
                  </div>
                  <div className="card" style={S.featureCard} onClick={() => { setCommunityView("chat"); goPage("community"); }}>
                    <div style={{ fontSize:40,marginBottom:16 }}>💬</div>
                    <h3 style={S.fcTitle}>Community Hub</h3>
                    <p style={S.fcDesc}>WhatsApp-style group chat + Q&A forum. Jobs, doubts, knowledge sharing — all real-time with {chatMembers.length}+ members.</p>
                    <div style={{ color:"#0071e3",fontSize:14,fontWeight:500,marginTop:16 }}>Join the Community →</div>
                  </div>
                  <div className="card" style={S.featureCard} onClick={() => goPage("abends")}>
                    <div style={{ fontSize:40,marginBottom:16 }}>🔍</div>
                    <h3 style={S.fcTitle}>Abend Solver</h3>
                    <p style={S.fcDesc}>Quick-search 30+ IBM ABEND codes with instant cause, fix, and pro tips. Debug production issues in seconds.</p>
                    <div style={{ color:"#0071e3",fontSize:14,fontWeight:500,marginTop:16 }}>Search Abends →</div>
                  </div>
                  <div className="card" style={S.featureCard} onClick={() => goPage("roadmap")}>
                    <div style={{ fontSize:40,marginBottom:16 }}>🗺️</div>
                    <h3 style={S.fcTitle}>Learning Roadmap</h3>
                    <p style={S.fcDesc}>Your guided path from Trainee to Architect. Six levels with skills, milestones, and direct links to study material.</p>
                    <div style={{ color:"#0071e3",fontSize:14,fontWeight:500,marginTop:16 }}>View Roadmap →</div>
                  </div>
                </div>
              </div>
            </section>

            {/* ─── 3D ANIMATED COMMUNITY CTA ─── */}
            <section style={{ padding:"72px 0", background:"linear-gradient(180deg, #f0f4ff 0%, #f8f9fc 100%)" }}>
              <div style={{ ...S.inner, display:"flex", flexDirection:"column", alignItems:"center" }}>
                <div style={{ position:"relative", width:"100%", maxWidth:820, borderRadius:28, overflow:"hidden", background:"linear-gradient(135deg, #0a1628, #0d2040, #0a1628)", border:"1.5px solid rgba(0,113,227,0.15)", minHeight:420, cursor:"pointer", boxShadow:"0 24px 80px rgba(0,0,0,0.18), 0 0 60px rgba(0,113,227,0.06)" }} onClick={() => { setChatPopup(true); setChatPopPhase(0); }}>
                  <CommCanvas />
                  <div style={{ position:"relative", zIndex:2, padding:"52px 44px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
                    <div className="fu" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(0,179,101,0.12)", border:"1px solid rgba(0,179,101,0.25)", borderRadius:20, padding:"6px 16px", marginBottom:24, animationDelay:"0ms" }}>
                      <span style={{ width:8, height:8, borderRadius:"50%", background:"#00b365", boxShadow:"0 0 10px #00b365", animation:"commPulse 2s ease-in-out infinite" }} />
                      <span style={{ fontSize:13, color:"#00b365", fontWeight:600 }}>{chatOnline} members online now</span>
                    </div>
                    <h2 className="fu" style={{ fontSize:"clamp(28px,4.5vw,46px)", fontWeight:800, color:"#fff", letterSpacing:"-1.5px", marginBottom:14, lineHeight:1.1, animationDelay:"80ms" }}>
                      Join Our <span style={{ background:"linear-gradient(135deg,#58a6ff,#0071e3)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Live Community</span>
                    </h2>
                    <p className="fu" style={{ fontSize:16, color:"rgba(255,255,255,0.55)", maxWidth:480, lineHeight:1.6, marginBottom:28, animationDelay:"160ms" }}>
                      {chatMembers.length}+ mainframe professionals sharing knowledge, posting jobs, solving doubts — all in real-time group chat.
                    </p>
                    <div className="fu" style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginBottom:28, animationDelay:"240ms" }}>
                      {[{i:"💬",t:"Live Chat"},{i:"💼",t:"Jobs"},{i:"❓",t:"Doubt Solving"},{i:"💭",t:"Knowledge"},{i:"📊",t:"Polls"}].map((f,idx)=>
                        <span key={idx} style={{ padding:"5px 14px", borderRadius:20, fontSize:12, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.55)", display:"flex", alignItems:"center", gap:5 }}>{f.i} {f.t}</span>
                      )}
                    </div>
                    <div className="fu" style={{ display:"flex", marginBottom:28, animationDelay:"320ms" }}>
                      {chatMembers.slice(0,6).map((m,i)=>
                        <div key={i} style={{ width:40, height:40, borderRadius:"50%", background:`linear-gradient(135deg,${m.color}35,${m.color}12)`, border:`2px solid ${m.color}50`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, marginLeft:i>0?-8:0, zIndex:6-i, boxShadow:`0 0 14px ${m.color}18` }}>{m.emoji}</div>
                      )}
                      <div style={{ width:40, height:40, borderRadius:"50%", background:"rgba(0,113,227,0.15)", border:"2px solid rgba(0,113,227,0.3)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, color:"#58a6ff", fontWeight:700, marginLeft:-8 }}>+{chatMembers.length-6}</div>
                    </div>
                    <button className="fu glow-btn" onClick={(e)=>{ e.stopPropagation(); setChatPopup(true); setChatPopPhase(0); }}
                      style={{ background:"#0071e3", color:"#fff", border:"none", borderRadius:980, padding:"14px 40px", fontSize:16, fontWeight:700, cursor:"pointer", fontFamily:FF, boxShadow:"0 4px 24px rgba(0,113,227,0.4)", animationDelay:"400ms" }}>
                      Join Community →
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* ════════════════ TOPICS ════════════════ */}
        {page === "topics" && (
          <div>
            {!activeTopic ? (
              <div>
                <div style={S.pageHero}>
                  <h1 style={S.pageHeroTitle}>Topics</h1>
                  <p style={S.pageHeroSub}>Every IBM Z topic from absolute beginner to ultra pro. {TOPICS.length} subjects, hundreds of code examples.</p>
                </div>
                <div style={{ borderBottom:"1px solid rgba(0,0,0,0.06)",padding:"14px 0",position:"sticky",top:52,background:"rgba(248,249,252,0.88)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",zIndex:100 }}>
                  <div style={{ ...S.inner,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap" }}>
                    <div style={{ position:"relative",flexShrink:0 }}>
                      <span style={{ position:"absolute",left:11,top:"50%",transform:"translateY(-50%)",color:"#666",fontSize:14 }}>⌕</span>
                      <input role="searchbox" style={S.searchInput} placeholder="Search all topics…" value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                      {categories.map(c => (
                        <button key={c.id} className="pill"
                          style={{ ...S.pill, background:cat===c.id?"#1d1d1f":"#e8e8ed", color:cat===c.id?"#fff":"#1d1d1f" }}
                          onClick={() => setCat(c.id)}>{c.label}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div style={{ ...S.inner,paddingTop:32,paddingBottom:80 }}>
                  <div style={S.topicsGrid}>
                    {filteredTopics.map((t,i) => (
                      <button key={t.id} className="card fu" style={{ ...S.topicCard, borderTop:`3px solid ${t.color}`, animationDelay:`${i*20}ms` }}
                        onClick={() => openTopic(t)}>
                        <div style={{ fontSize:32,marginBottom:12 }}>{t.icon}</div>
                        <div style={S.tcTitle}>{t.title}</div>
                        <div style={S.tcSub}>{t.subtitle}</div>
                        <div style={{ fontSize:11,color:"#666",marginBottom:10 }}>{t.level}</div>
                        <div style={{ ...S.tcMore, color:darkenColor(t.color) }}>Learn more →</div>
                      </button>
                    ))}
                  </div>
                  {filteredTopics.length === 0 && (
                    <div style={{ textAlign:"center",padding:"80px 0",color:"#666" }}>
                      <div style={{ fontSize:48,marginBottom:12 }}>🔍</div>
                      No results for "{search}"
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* ── TOPIC DETAIL WITH SIDEBAR ── */
              <div className="fi">
                <div style={{ ...S.inner,paddingTop:24 }}>
                  <button style={S.backBtn} onClick={() => setActiveTopic(null)}>‹ All Topics</button>
                </div>
                {/* Topic header - compact */}
                <div style={{ background:`linear-gradient(135deg,${activeTopic.color}12 0%,rgba(255,255,255,0.6) 50%,${activeTopic.color}06 100%)`,padding:"20px 0",borderBottom:'1px solid rgba(0,0,0,0.04)' }}>
                  <div style={S.inner}>
                    <div style={{ display:"flex",alignItems:"center",gap:16 }}>
                      <span style={{ fontSize:40 }}>{activeTopic.icon}</span>
                      <div>
                        <h1 style={{ fontSize:28,fontWeight:800,letterSpacing:"-1px",color:"#1d1d1f",marginBottom:2 }}>{activeTopic.title} Tutorial</h1>
                        <div style={{ fontSize:13,color:"#666" }}>
                          Progress <span style={{ fontWeight:700,color:activeTopic.color }}>{activeTab + 1}</span> of {activeTopic.sections.length} lessons
                        </div>
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div style={{ marginTop:12,height:4,background:"rgba(0,0,0,0.06)",borderRadius:4,overflow:"hidden" }}>
                      <div style={{ height:"100%",width:`${((activeTab+1)/activeTopic.sections.length)*100}%`,background:`linear-gradient(90deg,${activeTopic.color},${activeTopic.color}cc)`,borderRadius:4,transition:"width 0.3s ease" }} />
                    </div>
                  </div>
                </div>
                {/* Sidebar + Content layout */}
                <div style={{ ...S.inner, display:"flex", gap:0, alignItems:"flex-start", paddingTop:0, paddingBottom:60 }}>
                  {/* ── SIDEBAR ── */}
                  <div className="topic-sidebar" style={{ width:280,flexShrink:0,borderRight:"1px solid rgba(0,0,0,0.06)",
                    position:"sticky",top:52,height:"calc(100vh - 52px)",overflowY:"auto",
                    padding:"16px 0",display:typeof window!=='undefined'&&window.innerWidth<900?"none":"block" }}>
                    <div style={{ padding:"0 12px",marginBottom:12 }}>
                      <div style={{ fontSize:12,fontWeight:700,color:"#666",textTransform:"uppercase",letterSpacing:"0.5px" }}>
                        {activeTopic.sections.length} Lessons
                      </div>
                    </div>
                    {(() => {
                      /* Group sections by difficulty level as chapters */
                      const chapters = {};
                      activeTopic.sections.forEach((sec, i) => {
                        const ch = sec.level || "General";
                        if (!chapters[ch]) chapters[ch] = [];
                        chapters[ch].push({ ...sec, idx: i });
                      });
                      return Object.entries(chapters).map(([chName, secs]) => (
                        <div key={chName} style={{ marginBottom:8 }}>
                          <div style={{ padding:"8px 16px",fontSize:11,fontWeight:700,color:"#999",textTransform:"uppercase",letterSpacing:"0.5px" }}>
                            {chName}
                          </div>
                          {secs.map(sec => (
                            <button key={sec.idx} onClick={() => { setActiveTab(sec.idx); window.scrollTo(0,280); }}
                              style={{ display:"flex",alignItems:"center",gap:10,width:"100%",textAlign:"left",
                                padding:"10px 16px",background:activeTab===sec.idx?`${activeTopic.color}10`:"transparent",
                                border:"none",borderLeft:activeTab===sec.idx?`3px solid ${activeTopic.color}`:"3px solid transparent",
                                cursor:"pointer",fontFamily:FF,fontSize:13,color:activeTab===sec.idx?"#1d1d1f":"#555",
                                fontWeight:activeTab===sec.idx?600:400,transition:"all 0.15s",lineHeight:1.4 }}>
                              <span style={{ fontSize:11,color:activeTab===sec.idx?activeTopic.color:"#ccc",flexShrink:0 }}>
                                {activeTab===sec.idx?"▸":"○"}
                              </span>
                              <span style={{ overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{sec.title}</span>
                            </button>
                          ))}
                        </div>
                      ));
                    })()}
                  </div>
                  {/* ── MOBILE SECTION SELECTOR ── */}
                  {typeof window!=='undefined'&&window.innerWidth<900 && (
                    <div style={{ width:"100%",padding:"12px 0",borderBottom:"1px solid rgba(0,0,0,0.06)" }}>
                      <select value={activeTab} onChange={e => setActiveTab(Number(e.target.value))}
                        aria-label="Select lesson"
                        style={{ width:"100%",padding:"10px 14px",borderRadius:10,border:"1.5px solid rgba(0,0,0,0.08)",
                          fontSize:14,fontFamily:FF,background:"#fff",color:"#1d1d1f",cursor:"pointer" }}>
                        {activeTopic.sections.map((sec,i) => (
                          <option key={i} value={i}>{i+1}. {sec.title} [{sec.level}]</option>
                        ))}
                      </select>
                    </div>
                  )}
                  {/* ── MAIN CONTENT ── */}
                  <div style={{ flex:1,minWidth:0,padding:"32px 0 32px 40px",maxWidth:800 }} className="scaleIn" key={activeTab}>
                    {/* Breadcrumb */}
                    <div style={{ fontSize:12,color:"#999",marginBottom:16 }}>
                      <span style={{ cursor:"pointer",color:"#0071e3" }} onClick={() => setActiveTopic(null)}>Topics</span>
                      {" › "}
                      <span style={{ cursor:"pointer",color:"#0071e3" }} onClick={() => setActiveTab(0)}>{activeTopic.title}</span>
                      {" › "}
                      <span style={{ color:"#555" }}>{activeTopic.sections[activeTab].title}</span>
                    </div>
                    {/* Lesson header */}
                    <h2 style={{ fontSize:28,fontWeight:800,color:"#1d1d1f",letterSpacing:"-0.5px",marginBottom:6 }}>
                      {activeTopic.sections[activeTab].title}
                    </h2>
                    <div style={{ display:"flex",gap:12,alignItems:"center",marginBottom:24 }}>
                      <span style={{ ...S.diffBadge, background: activeTopic.sections[activeTab].level==="Beginner"?"#dcfce7":activeTopic.sections[activeTab].level==="Intermediate"?"#dbeafe":activeTopic.sections[activeTab].level==="Advanced"?"#f3e8ff":"#fee2e2",
                        color: activeTopic.sections[activeTab].level==="Beginner"?"#166534":activeTopic.sections[activeTab].level==="Intermediate"?"#1e40af":activeTopic.sections[activeTab].level==="Advanced"?"#6b21a8":"#991b1b" }}>
                        {activeTopic.sections[activeTab].level}
                      </span>
                      <span style={{ fontSize:12,color:"#999" }}>
                        Lesson {activeTab + 1} of {activeTopic.sections.length}
                      </span>
                      <span style={{ fontSize:12,color:"#999" }}>
                        · ~{Math.max(3, Math.round((activeTopic.sections[activeTab].content||"").length / 900))} min read
                      </span>
                    </div>
                    {/* Content */}
                    <div className="content-card" style={{ border:"none",boxShadow:"none",padding:0 }}>
                      {activeTopic.sections[activeTab].content && renderContent(activeTopic.sections[activeTab].content)}
                      {activeTopic.sections[activeTab].code && (
                        <div style={S.codeWrap}>
                          <div style={S.codeTopBar}>
                            <div style={{ display:"flex",gap:6 }}>
                              {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{ width:12,height:12,borderRadius:"50%",background:c }} />)}
                            </div>
                            <span style={{ fontSize:11,color:"#888",letterSpacing:"1px" }}>CODE EXAMPLE</span>
                          </div>
                          <pre style={{ ...S.codePre, background:"#0f172a",color:"#e2e8f0" }}
                            dangerouslySetInnerHTML={{ __html: highlightCode(activeTopic.sections[activeTab].code) }} />
                        </div>
                      )}
                    </div>
                    {/* Prev / Next LESSON buttons */}
                    <div style={{ display:"flex",gap:12,marginTop:40,paddingTop:24,borderTop:"1px solid #f0f0f0" }}>
                      {activeTab > 0 && (
                        <button onClick={() => { setActiveTab(activeTab-1); window.scrollTo(0,280); }}
                          style={{ flex:1,padding:"14px 18px",borderRadius:12,border:"1.5px solid #e8e8ed",background:"#fff",
                            cursor:"pointer",textAlign:"left",fontFamily:FF }}>
                          <div style={{ fontSize:11,color:"#999",marginBottom:4 }}>‹ Previous Lesson</div>
                          <div style={{ fontSize:14,fontWeight:600,color:"#1d1d1f" }}>{activeTopic.sections[activeTab-1].title}</div>
                        </button>
                      )}
                      {activeTab < activeTopic.sections.length - 1 && (
                        <button onClick={() => { setActiveTab(activeTab+1); window.scrollTo(0,280); }}
                          style={{ flex:1,padding:"14px 18px",borderRadius:12,border:`1.5px solid ${activeTopic.color}30`,
                            background:`${activeTopic.color}08`,cursor:"pointer",textAlign:"right",fontFamily:FF }}>
                          <div style={{ fontSize:11,color:"#999",marginBottom:4 }}>Next Lesson ›</div>
                          <div style={{ fontSize:14,fontWeight:600,color:activeTopic.color }}>{activeTopic.sections[activeTab+1].title}</div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {/* Prev/Next TOPIC buttons */}
                <div style={{ ...S.inner,paddingBottom:60,borderTop:"1px solid #f5f5f7",paddingTop:28,display:"flex",gap:16,flexWrap:"wrap" }}>
                  {TOPICS[TOPICS.indexOf(activeTopic)-1] && (
                    <button style={S.prevNextBtn} onClick={() => openTopic(TOPICS[TOPICS.indexOf(activeTopic)-1])}>
                      <span style={{ fontSize:11,color:"#666",display:"block",marginBottom:4 }}>Previous</span>
                      <span style={{ fontSize:15,fontWeight:500 }}>{TOPICS[TOPICS.indexOf(activeTopic)-1].icon} {TOPICS[TOPICS.indexOf(activeTopic)-1].title}</span>
                    </button>
                  )}
                  {TOPICS[TOPICS.indexOf(activeTopic)+1] && (
                    <button style={{ ...S.prevNextBtn,textAlign:"right",marginLeft:"auto" }} onClick={() => openTopic(TOPICS[TOPICS.indexOf(activeTopic)+1])}>
                      <span style={{ fontSize:11,color:"#666",display:"block",marginBottom:4 }}>Next</span>
                      <span style={{ fontSize:15,fontWeight:500 }}>{TOPICS[TOPICS.indexOf(activeTopic)+1].icon} {TOPICS[TOPICS.indexOf(activeTopic)+1].title}</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ════════════════ SCENARIOS ════════════════ */}
        {page === "scenarios" && (
          <div>
            <div style={S.pageHero}>
              <h1 style={S.pageHeroTitle}>Real-World Scenarios</h1>
              <p style={S.pageHeroSub}>Production incidents, performance crises, security audits. Learn from real problems with expert step-by-step solutions.</p>
            </div>
            <div style={{ borderBottom:"1px solid #f5f5f7",padding:"12px 0",position:"sticky",top:52,background:"rgba(255,255,255,0.95)",backdropFilter:"blur(20px)",zIndex:100 }}>
              <div style={{ ...S.inner,display:"flex",gap:10,flexWrap:"wrap",alignItems:"center" }}>
                <span style={{ fontSize:12,color:"#666",fontWeight:500 }}>Category:</span>
                {scenCats.map(c => (
                  <button key={c} className="pill"
                    style={{ ...S.pill,fontSize:11,padding:"5px 12px",background:scenarioCat===c?"#1d1d1f":"#e8e8ed",color:scenarioCat===c?"#fff":"#1d1d1f" }}
                    onClick={() => setScenarioCat(c)}>{c}</button>
                ))}
                <span style={{ fontSize:12,color:"#666",fontWeight:500,marginLeft:8 }}>Level:</span>
                {scenDiffs.map(d => (
                  <button key={d} className="pill"
                    style={{ ...S.pill,fontSize:11,padding:"5px 12px",background:scenarioDiff===d?"#0071e3":"#e8e8ed",color:scenarioDiff===d?"#fff":"#1d1d1f" }}
                    onClick={() => setScenarioDiff(d)}>{d}</button>
                ))}
              </div>
            </div>
            <div style={{ ...S.inner,paddingTop:28,paddingBottom:80 }}>
              {filtScenarios.map((sc,i) => (
                <div key={sc.id} className="scenario-card fu"
                  style={{ border:"1.5px solid #e8e8ed",borderRadius:16,marginBottom:16,overflow:"hidden",animationDelay:`${i*60}ms` }}>
                  <button style={{ width:"100%",background:"none",border:"none",padding:"20px 24px",cursor:"pointer",textAlign:"left",fontFamily:FF }}
                    onClick={() => setExpandedScenario(expandedScenario===sc.id?null:sc.id)}>
                    <div style={{ display:"flex",alignItems:"center",gap:12,flexWrap:"wrap" }}>
                      <span style={{ ...S.diffBadge, background: sc.difficulty==="Beginner"?"#dcfce7":sc.difficulty==="Intermediate"?"#fef9c3":"#fee2e2",
                        color:sc.difficulty==="Beginner"?"#166534":sc.difficulty==="Intermediate"?"#854d0e":"#991b1b" }}>
                        {sc.difficulty}
                      </span>
                      <span style={{ ...S.diffBadge,background:"#eff6ff",color:"#1e40af" }}>{sc.category}</span>
                      <h3 style={{ fontSize:16,fontWeight:600,color:"#1d1d1f",flex:1,textAlign:"left" }}>{sc.question}</h3>
                      <span style={{ fontSize:20,color:"#666",transition:"transform .2s",transform:expandedScenario===sc.id?"rotate(180deg)":"none" }}>⌄</span>
                    </div>
                  </button>
                  {expandedScenario === sc.id && (
                    <div className="fi" style={{ borderTop:"1px solid #f5f5f7",padding:"24px" }}>
                      <div style={{ marginBottom:12,fontSize:13,fontWeight:600,color:"#0071e3" }}>Expert Answer & Solution:</div>
                      <div style={{ background:"#f8f9fc",padding:24,borderRadius:14,border:"1px solid #e8e8ed" }}>
                        {sc.answer.split("\n").map((line, li) => {
                          const l = line.trim();
                          if (!l) return null;
                          if (l.match(/^\d+[\.\)]/)) {
                            const num = l.match(/^(\d+)/)[1];
                            const rest = l.replace(/^\d+[\.\)]\s*/, "");
                            return <div key={li} style={{ display:"flex",gap:10,alignItems:"flex-start",marginBottom:8 }}>
                              <span style={{ width:24,height:24,borderRadius:8,background:"#0071e312",color:"#0071e3",fontSize:12,fontWeight:800,
                                display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:2 }}>{num}</span>
                              <span style={{ fontSize:14.5,color:"#3a3a3c",lineHeight:1.8 }}>{rest}</span>
                            </div>;
                          }
                          return <p key={li} style={{ fontSize:14.5,color:"#3a3a3c",lineHeight:1.8,marginBottom:6 }}>{l}</p>;
                        })}
                      </div>
                      <div style={{ marginTop:12,display:"flex",gap:6,flexWrap:"wrap" }}>
                        {sc.tags.map(tag => (
                          <span key={tag} style={{ fontSize:11,background:"#f5f5f7",color:"#555",padding:"3px 10px",borderRadius:980 }}>#{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════ BLOG ════════════════ */}
        {page === "blog" && (
          <div>
            <div style={S.pageHero}>
              <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:16 }}>
                <div>
                  <h1 style={S.pageHeroTitle}>Expert Blog</h1>
                  <p style={S.pageHeroSub}>Deep technical insights, career guidance, and industry perspective from mainframe practitioners.</p>
                </div>
                {canWriteBlog && (
                  <button onClick={() => setBlogEditorOpen(!blogEditorOpen)} className="glow-btn"
                    style={{ ...S.btnBlue, fontSize:14, padding:"10px 22px", marginTop:8, whiteSpace:"nowrap" }}>
                    ✍️ Write Expert Blog
                  </button>
                )}
                {user && !canWriteBlog && (
                  <div style={{ fontSize:12,color:"#666",background:"rgba(245,245,247,0.8)",borderRadius:10,padding:"8px 14px",maxWidth:220,marginTop:8 }}>
                    💡 Members with 5+ years experience can write expert blogs
                  </div>
                )}
              </div>
            </div>
            <div style={{ ...S.inner,paddingBottom:80 }}>

              {/* Blog Editor */}
              {blogEditorOpen && canWriteBlog && (
                <div className="scaleIn" style={{ background:"rgba(255,255,255,0.9)",backdropFilter:"blur(20px)",border:"1px solid rgba(0,0,0,0.08)",
                  borderRadius:20,padding:32,marginBottom:32,boxShadow:"0 8px 32px rgba(0,0,0,0.06)" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:20 }}>
                    <UserAvatar name={user.name} size={40} showRing />
                    <div>
                      <div style={{ fontSize:15,fontWeight:700 }}>{user.name}</div>
                      <div style={{ fontSize:12,color:"#666" }}>{user.role} · {user.mfYears} yrs mainframe experience</div>
                    </div>
                    <span style={{ marginLeft:"auto",fontSize:11,fontWeight:600,padding:"4px 10px",borderRadius:980,
                      background:"linear-gradient(135deg,#059669,#0d9488)",color:"#fff" }}>✦ Expert Author</span>
                  </div>
                  <input value={blogDraft.title} onChange={e => setBlogDraft({...blogDraft, title:e.target.value})}
                    placeholder="Blog title — make it compelling *"
                    style={{ width:"100%",padding:"14px 16px",fontSize:18,fontWeight:700,border:"1.5px solid rgba(0,0,0,0.08)",
                      borderRadius:12,outline:"none",fontFamily:FF,background:"rgba(245,245,247,0.6)",marginBottom:14,color:"#1d1d1f" }} />
                  <div style={{ display:"flex",gap:10,marginBottom:14 }}>
                    <select value={blogDraft.category} onChange={e => setBlogDraft({...blogDraft, category:e.target.value})}
                      style={{ padding:"8px 14px",fontSize:13,border:"1.5px solid rgba(0,0,0,0.08)",borderRadius:10,
                        outline:"none",fontFamily:FF,background:"rgba(245,245,247,0.6)",cursor:"pointer",color:"#1d1d1f" }}>
                      {BLOG_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <span style={{ fontSize:12,color:"#666",alignSelf:"center" }}>
                      {blogDraft.content ? Math.max(1, Math.round(blogDraft.content.split(/\s+/).length / 200)) + " min read" : ""}
                    </span>
                  </div>
                  <textarea value={blogDraft.content} onChange={e => setBlogDraft({...blogDraft, content:e.target.value})}
                    placeholder={"Share your expertise...\n\nWrite about real-world experiences, technical deep dives, best practices, lessons learned, or career advice.\n\nTip: Use clear paragraphs and include code examples where relevant."}
                    rows={14}
                    style={{ width:"100%",padding:"16px",fontSize:15,lineHeight:1.8,border:"1.5px solid rgba(0,0,0,0.08)",
                      borderRadius:12,outline:"none",fontFamily:FF,background:"rgba(245,245,247,0.6)",resize:"vertical",
                      minHeight:200,color:"#2d2d30" }} />
                  <div style={{ display:"flex",gap:10,marginTop:16 }}>
                    <button onClick={saveUserBlog} className="glow-btn"
                      style={{ ...S.btnBlue,fontSize:14,padding:"10px 24px",opacity:blogDraft.title&&blogDraft.content?1:0.5 }}>
                      Publish Blog
                    </button>
                    <button onClick={() => setBlogEditorOpen(false)}
                      style={{ ...S.btnGhost,fontSize:14,padding:"10px 20px" }}>Cancel</button>
                  </div>
                </div>
              )}

              {!expandedBlog ? (
                <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:24 }}>
                  {allBlogs.map((b,i) => (
                    <button key={b.id} className="card fu" onClick={() => setExpandedBlog(b.id)}
                      style={{ ...S.blogCard,animationDelay:`${i*60}ms` }}>
                      <div style={{ display:"flex",gap:8,marginBottom:16,flexWrap:"wrap",alignItems:"center" }}>
                        <span style={{ ...S.diffBadge,background:"#eff6ff",color:"#1e40af" }}>{b.category}</span>
                        <span style={{ ...S.diffBadge,background:"#f5f5f7",color:"#555" }}>{b.readTime}</span>
                        {b.isUserBlog && (
                          <span style={{ ...S.diffBadge,background:"linear-gradient(135deg,#059669,#0d9488)",color:"#fff" }}>✦ Community</span>
                        )}
                      </div>
                      <h3 style={{ fontSize:18,fontWeight:700,color:"#1d1d1f",lineHeight:1.4,marginBottom:12,textAlign:"left" }}>{b.title}</h3>
                      <p style={{ fontSize:13,color:"#666",marginBottom:16,textAlign:"left" }}>
                        {b.content.substring(0,150)}…
                      </p>
                      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                        <div style={{ fontSize:12,color:"#666",textAlign:"left" }}>
                          {b.isUserBlog ? (<><strong style={{ color:"#1d1d1f" }}>{b.author}</strong> · {b.authorRole} · </>) : ""}
                          {b.date}
                        </div>
                        {b.isUserBlog && b.likes > 0 && (
                          <span style={{ fontSize:12,color:"#ef4444" }}>❤️ {b.likes}</span>
                        )}
                      </div>
                      <div style={{ color:"#0071e3",fontSize:13,fontWeight:500,marginTop:12,textAlign:"left" }}>Read Article →</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="fi" style={{ maxWidth:720,margin:"0 auto" }}>
                  <button style={S.backBtn} onClick={() => setExpandedBlog(null)}>‹ Blog</button>
                  {(() => {
                    const b = allBlogs.find(x => x.id === expandedBlog);
                    if (!b) return null;
                    return (
                      <div>
                        <div style={{ display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",alignItems:"center" }}>
                          <span style={{ ...S.diffBadge,background:"#eff6ff",color:"#1e40af" }}>{b.category}</span>
                          <span style={{ ...S.diffBadge,background:"#f5f5f7",color:"#555" }}>{b.readTime}</span>
                          <span style={{ ...S.diffBadge,background:"#f5f5f7",color:"#555" }}>{b.date}</span>
                          {b.isUserBlog && (
                            <span style={{ ...S.diffBadge,background:"linear-gradient(135deg,#059669,#0d9488)",color:"#fff" }}>✦ Community Expert</span>
                          )}
                        </div>
                        <h1 style={{ fontSize:"clamp(24px,4vw,40px)",fontWeight:800,letterSpacing:"-1px",color:"#1d1d1f",marginBottom:16,lineHeight:1.2 }}>{b.title}</h1>
                        {b.isUserBlog && (
                          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:28,padding:"16px 20px",
                            background:"rgba(245,245,247,0.7)",borderRadius:14,border:"1px solid rgba(0,0,0,0.04)" }}>
                            <div style={{ width:44,height:44,borderRadius:"50%",background:"linear-gradient(135deg,#0071e3,#7c3aed)",
                              color:"#fff",fontSize:18,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center" }}>
                              {b.author?.charAt(0)}
                            </div>
                            <div>
                              <div style={{ fontSize:15,fontWeight:700,color:"#1d1d1f" }}>{b.author}</div>
                              <div style={{ fontSize:12,color:"#666" }}>{b.authorRole} · {b.authorMfYears} years mainframe experience</div>
                            </div>
                            <button onClick={(e) => { e.stopPropagation(); likeUserBlog(b.id); }}
                              style={{ marginLeft:"auto",background:"none",border:"1.5px solid #fecaca",borderRadius:10,padding:"6px 14px",
                                cursor:"pointer",fontSize:13,color:"#ef4444",fontFamily:FF,fontWeight:600 }}>
                              ❤️ {b.likes || 0}
                            </button>
                          </div>
                        )}
                        <div className="content-card" style={{ padding:"36px 40px" }}>
                          <div style={{ fontSize:16,color:"#3a3a3c",lineHeight:1.9,whiteSpace:"pre-wrap" }}>{b.content}</div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════════════ QUIZ ════════════════ */}
        {page === "quiz" && (
          <div>
            <div style={S.pageHero}>
              <h1 style={S.pageHeroTitle}>{dailyMode ? "Daily Challenge" : "Knowledge Quiz"}</h1>
              <p style={S.pageHeroSub}>{dailyMode ? "5 questions • One attempt per day • Beat the clock!" : `${QUIZ_QUESTIONS.length} questions across all mainframe topics. Beginner to expert level.`}</p>
            </div>
            <div style={{ ...S.inner,paddingBottom:80 }}>

              {/* Daily Challenge Banner */}
              {!dailyMode && (
                <div className="fi" style={{ background:"linear-gradient(135deg,#0f172a,#1e1b4b)",borderRadius:20,padding:"28px 28px",
                  marginBottom:28,display:"flex",alignItems:"center",gap:20,flexWrap:"wrap",justifyContent:"space-between",
                  border:"1px solid rgba(124,58,237,0.2)",boxShadow:"0 4px 24px rgba(0,0,0,0.1)" }}>
                  <div>
                    <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:6 }}>
                      <span style={{ fontSize:28 }}>🏆</span>
                      <span style={{ color:"#f59e0b",fontSize:18,fontWeight:800,letterSpacing:"-0.3px" }}>Daily Challenge</span>
                      {getStreak() > 0 && (
                        <span style={{ background:"rgba(239,68,68,0.2)",color:"#f87171",padding:"3px 10px",borderRadius:980,fontSize:12,fontWeight:700 }}>
                          🔥 {getStreak()}-day streak
                        </span>
                      )}
                    </div>
                    <p style={{ color:"rgba(255,255,255,0.6)",fontSize:13,lineHeight:1.5 }}>
                      {dailyCompleted
                        ? `Today's score: ${dailyCompleted.score}/5 in ${dailyCompleted.time}s — Come back tomorrow!`
                        : "5 random questions. Timed. One attempt per day. How fast can you go?"
                      }
                    </p>
                  </div>
                  {!dailyCompleted ? (
                    <button onClick={startDaily} className="glow-btn"
                      style={{ padding:"12px 28px",background:"linear-gradient(135deg,#f59e0b,#ef4444)",color:"#fff",
                        border:"none",borderRadius:12,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:FF,whiteSpace:"nowrap",flexShrink:0 }}>
                      Start Challenge →
                    </button>
                  ) : (
                    <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                      <div style={{ textAlign:"center" }}>
                        <div style={{ fontSize:28,fontWeight:800,color:"#f59e0b" }}>{dailyCompleted.score}/5</div>
                        <div style={{ fontSize:11,color:"rgba(255,255,255,0.4)" }}>{dailyCompleted.time}s</div>
                      </div>
                      <div style={{ fontSize:32 }}>
                        {dailyCompleted.score === 5 ? "🏅" : dailyCompleted.score >= 3 ? "⭐" : "💪"}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Daily Mode Timer Bar */}
              {dailyMode && !quiz.done && (
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,
                  background:"rgba(245,245,247,0.8)",borderRadius:12,padding:"10px 18px" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                    <span style={{ fontSize:18 }}>⏱️</span>
                    <span style={{ fontSize:20,fontWeight:800,color:"#1d1d1f",fontFamily:"'SF Mono',Menlo,monospace" }}>
                      {Math.floor(dailyTimer/60)}:{String(dailyTimer%60).padStart(2,"0")}
                    </span>
                  </div>
                  <button onClick={() => { setDailyMode(false); clearInterval(dailyTimerRef.current); setQuiz({ index:0,score:0,selected:null,done:false,showExp:false }); }}
                    style={{ background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:13,fontFamily:FF }}>✕ Exit Challenge</button>
                </div>
              )}

              {/* Topic filter — hide in daily mode */}
              {!dailyMode && (
              <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:24,justifyContent:"center" }}>
                {QUIZ_TOPICS.map(t => (
                  <button key={t} onClick={() => { setQuizTopicFilter(t); setQuiz({ index:0,score:0,selected:null,done:false,showExp:false }); }}
                    style={{ padding:"6px 14px",borderRadius:980,fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:FF,border:"none",
                      background:quizTopicFilter===t?"linear-gradient(135deg,#0071e3,#7c3aed)":"rgba(245,245,247,0.8)",
                      color:quizTopicFilter===t?"#fff":"#555",transition:"all .15s" }}>
                    {t === "All" ? `All (${QUIZ_QUESTIONS.length})` : `${t} (${QUIZ_QUESTIONS.filter(q=>q.topic===t).length})`}
                  </button>
                ))}
              </div>
              )}
              {(() => { const activeQs = dailyMode ? dailyQuestions : quizQuestions; return (
              <div style={{ maxWidth:640,margin:"0 auto" }}>
                {activeQs.length === 0 ? (
                  <div style={{ textAlign:"center",padding:60,color:"#666" }}>No questions for this topic yet.</div>
                ) : !quiz.done ? (
                  <div className="fi" key={quiz.index}>
                    <div style={{ height:4,background:"#f5f5f7",borderRadius:2,marginBottom:20,overflow:"hidden" }}>
                      <div style={{ height:"100%",background:dailyMode?"#f59e0b":"#0071e3",borderRadius:2,width:`${(quiz.index/activeQs.length)*100}%`,transition:"width .4s ease" }} />
                    </div>
                    <div style={{ display:"flex",justifyContent:"space-between",marginBottom:24,fontSize:13,color:"#666" }}>
                      <span>Question {quiz.index+1} of {activeQs.length}</span>
                      <span>Score: {quiz.score}/{quiz.index}</span>
                    </div>
                    {activeQs[quiz.index].topic && (
                      <span style={{ display:"inline-block",fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:980,marginBottom:14,
                        background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff" }}>{activeQs[quiz.index].topic}</span>
                    )}
                    <h2 style={{ fontSize:"clamp(17px,2.5vw,22px)",fontWeight:700,color:"#1d1d1f",letterSpacing:"-.5px",lineHeight:1.4,marginBottom:24 }}>
                      {activeQs[quiz.index].q}
                    </h2>
                    <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                      {activeQs[quiz.index].options.map((opt,i) => {
                        let bg="#fff", border="1.5px solid #d2d2d7", color="#1d1d1f", lblBg="#f5f5f7", lblColor="#666";
                        if (quiz.selected !== null) {
                          if (i === activeQs[quiz.index].answer) { bg="#f0fdf4";border="1.5px solid #22c55e";color="#166534";lblBg="#22c55e";lblColor="#fff"; }
                          else if (i === quiz.selected) { bg="#fff1f0";border="1.5px solid #ef4444";color="#991b1b";lblBg="#ef4444";lblColor="#fff"; }
                        }
                        return (
                          <button key={i} onClick={() => answerQuiz(i)}
                            style={{ display:"flex",alignItems:"center",gap:12,padding:"15px 18px",borderRadius:12,cursor:"pointer",
                              fontSize:15,textAlign:"left",fontFamily:FF,background:bg,border,color,transition:"all .15s",width:"100%" }}>
                            <span style={{ width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
                              fontSize:12,fontWeight:600,flexShrink:0,background:lblBg,color:lblColor,transition:"all .2s" }}>
                              {String.fromCharCode(65+i)}
                            </span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {quiz.showExp && quiz.selected !== null && (
                      <div className="fi" style={{ marginTop:20,padding:16,background:"#f8f9fa",borderRadius:12,border:"1px solid #e8e8ed" }}>
                        <div style={{ fontSize:13,fontWeight:600,color:"#0071e3",marginBottom:8 }}>
                          {quiz.selected === activeQs[quiz.index].answer ? "✅ Correct!" : "❌ Incorrect"}
                        </div>
                        <div style={{ fontSize:13,color:"#3a3a3c",lineHeight:1.6 }}>{activeQs[quiz.index].explanation}</div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="fi" style={{ textAlign:"center",padding:"60px 0" }}>
                    {dailyMode && (
                      <div style={{ marginBottom:16 }}>
                        <span style={{ background:"linear-gradient(135deg,#f59e0b,#ef4444)",color:"#fff",padding:"6px 16px",
                          borderRadius:980,fontSize:13,fontWeight:700 }}>
                          ⏱️ Completed in {dailyTimer}s
                        </span>
                      </div>
                    )}
                    <div style={{ fontSize:72,fontWeight:800,letterSpacing:"-3px",color:"#1d1d1f",lineHeight:1,marginBottom:8 }}>
                      {quiz.score}/{activeQs.length}
                    </div>
                    <div style={{ fontSize:24,fontWeight:700,letterSpacing:"-.5px",color:"#1d1d1f",marginBottom:10 }}>
                      {quiz.score===activeQs.length?"🏆 Perfect — Mainframe Master!":quiz.score>=activeQs.length*0.8?"🎉 Expert Level":quiz.score>=activeQs.length*0.5?"📚 Solid Knowledge":"💪 Keep Learning"}
                    </div>
                    <p style={{ color:"#555",fontSize:15,marginBottom:28 }}>
                      {dailyMode
                        ? `Daily Challenge — ${new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})}${getStreak()>0?` • 🔥 ${getStreak()}-day streak`:""}`
                        : `${Math.round((quiz.score/activeQs.length)*100)}% correct${quizTopicFilter !== "All" ? ` in ${quizTopicFilter}` : ""}`
                      }
                    </p>
                    <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
                      {dailyMode ? (
                        <button style={S.btnBlue} onClick={() => { setDailyMode(false); resetQuiz(); }}>Back to Quiz</button>
                      ) : (
                        <button style={S.btnBlue} onClick={resetQuiz}>Try Again</button>
                      )}
                      <button style={S.btnGhost} onClick={() => goPage("topics")}>Study Topics</button>
                      <button style={S.btnGhost} onClick={() => goPage("scenarios")}>Practice Scenarios</button>
                    </div>
                  </div>
                )}
              </div>
              ); })()}
            </div>
          </div>
        )}

        {/* ════════════════ WEEKLY UPDATE ════════════════ */}
        {page === "weekly" && (
          <div>
            <div style={S.pageHero}>
              <h1 style={S.pageHeroTitle}>Weekly AI Update</h1>
              <p style={S.pageHeroSub}>
                Every Saturday, fresh mainframe content generated by AI. Pick any topic — get new tips, scenarios, and code examples.
                {lastUpdate && <span style={{ display:"block",fontSize:13,color:"#666",marginTop:6 }}>Last updated: {new Date(lastUpdate).toLocaleDateString()}</span>}
              </p>
            </div>
            <div style={{ ...S.inner,paddingBottom:80 }}>
              {/* Topic picker */}
              <div style={{ marginBottom:32 }}>
                <h3 style={{ fontSize:17,fontWeight:700,color:"#1d1d1f",marginBottom:16 }}>Choose a topic to update:</h3>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10 }}>
                  {TOPICS.map(t => (
                    <button key={t.id} onClick={() => fetchUpdate(t)}
                      style={{ background:weeklyTopic?.id===t.id?"#1d1d1f":"#f5f5f7",
                        color:weeklyTopic?.id===t.id?"#fff":"#1d1d1f",
                        border:"none",borderRadius:12,padding:"12px 16px",cursor:"pointer",
                        fontSize:13,fontWeight:500,fontFamily:FF,textAlign:"left",
                        display:"flex",alignItems:"center",gap:8,
                        transition:"background .2s,color .2s" }}>
                      {t.icon} {t.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loading */}
              {weeklyLoading && (
                <div style={{ textAlign:"center",padding:"60px 0" }}>
                  <div style={{ width:40,height:40,border:"3px solid #f5f5f7",borderTop:"3px solid #0071e3",borderRadius:"50%",animation:"spin 0.8s linear infinite",margin:"0 auto 16px" }} />
                  <div style={{ fontSize:16,color:"#555" }}>Fetching fresh content for {weeklyTopic?.title}…</div>
                  <div style={{ fontSize:13,color:"#666",marginTop:6 }}>This may take a moment</div>
                </div>
              )}

              {/* Error */}
              {weeklyError && (
                <div style={{ background:"#fff1f0",border:"1px solid #fecaca",borderRadius:12,padding:20,color:"#991b1b",marginBottom:24 }}>
                  <strong>Error:</strong> {weeklyError}
                  <br/><span style={{ fontSize:13 }}>Make sure you're connected to the internet and try again.</span>
                </div>
              )}

              {/* Update content */}
              {weeklyUpdate && !weeklyLoading && (
                <div className="fi">
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12,marginBottom:24 }}>
                    <div>
                      <h2 style={{ fontSize:22,fontWeight:700,color:"#1d1d1f" }}>
                        {weeklyTopic?.icon} {weeklyTopic?.title} — Weekly Update
                      </h2>
                      <div style={{ fontSize:13,color:"#666",marginTop:4 }}>Generated: {weeklyUpdate.generatedDate}</div>
                    </div>
                    <button style={{ ...S.btnGhost,fontSize:13,padding:"8px 16px" }} onClick={refreshUpdate}>
                      ↻ Refresh Content
                    </button>
                  </div>

                  {/* Content tabs */}
                  <div style={{ display:"flex",gap:4,marginBottom:24,flexWrap:"wrap" }}>
                    {["tip","scenario","code","facts"].map(tab => (
                      <button key={tab} onClick={() => setWeeklyTab(tab)}
                        style={{ background:weeklyTab===tab?"#1d1d1f":"#f5f5f7",color:weeklyTab===tab?"#fff":"#1d1d1f",
                          border:"none",borderRadius:8,padding:"8px 16px",cursor:"pointer",fontSize:13,fontWeight:500,fontFamily:FF,
                          textTransform:"capitalize" }}>
                        {tab==="tip"?"💡 New Tip":tab==="scenario"?"🎯 New Scenario":tab==="code"?"💻 Code Example":"📊 Key Facts"}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  {weeklyTab === "tip" && weeklyUpdate.tip && (
                    <div className="fi" style={{ background:"#f8f9fa",borderRadius:16,padding:28,border:"1px solid #e8e8ed" }}>
                      <h3 style={{ fontSize:18,fontWeight:700,color:"#1d1d1f",marginBottom:16 }}>{weeklyUpdate.tip.title}</h3>
                      <div style={{ fontSize:15,color:"#3a3a3c",lineHeight:1.8,whiteSpace:"pre-wrap" }}>{weeklyUpdate.tip.content}</div>
                    </div>
                  )}
                  {weeklyTab === "scenario" && weeklyUpdate.scenario && (
                    <div className="fi">
                      <div style={{ background:"#eff6ff",borderRadius:12,padding:20,border:"1px solid #bfdbfe",marginBottom:16 }}>
                        <div style={{ fontSize:13,fontWeight:600,color:"#1e40af",marginBottom:8 }}>Scenario Question:</div>
                        <div style={{ fontSize:15,color:"#1e3a8a",fontWeight:500,lineHeight:1.6 }}>{weeklyUpdate.scenario.question}</div>
                      </div>
                      <div style={{ background:"#f0fdf4",borderRadius:12,padding:20,border:"1px solid #bbf7d0" }}>
                        <div style={{ fontSize:13,fontWeight:600,color:"#166534",marginBottom:8 }}>Expert Answer:</div>
                        <pre style={{ fontSize:14,color:"#14532d",lineHeight:1.8,whiteSpace:"pre-wrap",fontFamily:FF }}>{weeklyUpdate.scenario.answer}</pre>
                      </div>
                    </div>
                  )}
                  {weeklyTab === "code" && weeklyUpdate.code && (
                    <div className="fi">
                      <h3 style={{ fontSize:17,fontWeight:700,color:"#1d1d1f",marginBottom:12 }}>{weeklyUpdate.code.title}</h3>
                      <div style={S.codeWrap}>
                        <div style={S.codeTopBar}>
                          <div style={{ display:"flex",gap:6 }}>
                            {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{ width:12,height:12,borderRadius:"50%",background:c }} />)}
                          </div>
                        </div>
                        <pre style={{ ...S.codePre,background:"#0f172a",color:"#e2e8f0" }}
                          dangerouslySetInnerHTML={{ __html: highlightCode(weeklyUpdate.code.snippet) }} />
                      </div>
                      {weeklyUpdate.code.explanation && (
                        <div style={{ marginTop:16,fontSize:15,color:"#3a3a3c",lineHeight:1.7,padding:"16px 20px",background:"#f8f9fa",borderRadius:12 }}>
                          {weeklyUpdate.code.explanation}
                        </div>
                      )}
                    </div>
                  )}
                  {weeklyTab === "facts" && weeklyUpdate.facts && (
                    <div className="fi">
                      <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
                        {weeklyUpdate.facts.map((f,i) => (
                          <div key={i} style={{ display:"flex",gap:16,alignItems:"flex-start",background:"#f8f9fa",borderRadius:12,padding:20,border:"1px solid #e8e8ed" }}>
                            <div style={{ fontSize:24,fontWeight:800,color:"#0071e3",minWidth:32,lineHeight:1 }}>{i+1}</div>
                            <div style={{ fontSize:15,color:"#3a3a3c",lineHeight:1.6 }}>{f}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Empty state */}
              {!weeklyLoading && !weeklyUpdate && !weeklyError && (
                <div style={{ textAlign:"center",padding:"60px 0",color:"#666" }}>
                  <div style={{ fontSize:56,marginBottom:16 }}>🔄</div>
                  <div style={{ fontSize:18,fontWeight:600,color:"#1d1d1f",marginBottom:8 }}>Select a topic above</div>
                  <div style={{ fontSize:15 }}>AI will generate fresh tips, a new scenario, a code example, and key facts — every Saturday.</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════════════ CODE PLAYGROUND ════════════════ */}
        {page === "playground" && (
          <div>
            <div style={S.pageHero}>
              <h1 style={S.pageHeroTitle}>🧪 Code Lab</h1>
              <p style={S.pageHeroSub}>Paste JCL, COBOL, REXX, or DB2 SQL — get instant AI-powered explanations, error detection, and execution simulation.</p>
            </div>
            <div style={{ ...S.inner, paddingTop:24, paddingBottom:80 }}>
              {/* Language + Mode selector */}
              <div style={{ display:"flex",gap:10,flexWrap:"wrap",marginBottom:16,alignItems:"center" }}>
                {["JCL","COBOL","REXX","DB2 SQL"].map(lang => (
                  <button key={lang} onClick={() => { setPgLang(lang); setPgCode(pgSamples[lang]); setPgResult(null); }}
                    style={{ padding:"8px 16px",borderRadius:10,border:pgLang===lang?"2px solid #0071e3":"2px solid #e8e8ed",
                      background:pgLang===lang?"#e8f4fd":"#fff",color:pgLang===lang?"#0071e3":"#666",
                      fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:FF }}>{lang}</button>
                ))}
                <div style={{ marginLeft:"auto",display:"flex",gap:6 }}>
                  {[["explain","💡 Explain"],["errors","🔍 Find Errors"],["simulate","▶️ Simulate"]].map(([m,label]) => (
                    <button key={m} onClick={() => setPgMode(m)}
                      style={{ padding:"8px 14px",borderRadius:10,border:pgMode===m?"2px solid #7c3aed":"2px solid #e8e8ed",
                        background:pgMode===m?"#f3e8ff":"#fff",color:pgMode===m?"#7c3aed":"#666",
                        fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:FF }}>{label}</button>
                  ))}
                </div>
              </div>
              {/* Code editor */}
              <div style={{ borderRadius:16,overflow:"hidden",border:"1.5px solid #e0e0e5",boxShadow:"0 4px 20px rgba(0,0,0,0.06)" }}>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",background:"#1e293b" }}>
                  <div style={{ display:"flex",gap:6 }}>
                    {["#ff5f57","#febc2e","#28c840"].map(c=><div key={c} style={{ width:12,height:12,borderRadius:"50%",background:c }} />)}
                  </div>
                  <span style={{ fontSize:11,color:"#64748b",letterSpacing:"1px",fontFamily:MONO }}>{pgLang}</span>
                  <button onClick={runPlayground} disabled={pgLoading}
                    style={{ background:pgLoading?"#64748b":"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",
                      border:"none",borderRadius:8,padding:"6px 18px",fontSize:12,fontWeight:700,cursor:pgLoading?"wait":"pointer",fontFamily:FF }}>
                    {pgLoading ? "Analyzing..." : pgMode==="explain" ? "💡 Explain Code" : pgMode==="errors" ? "🔍 Find Errors" : "▶️ Run Simulation"}
                  </button>
                </div>
                <textarea value={pgCode} onChange={e => setPgCode(e.target.value)}
                  aria-label="Code editor"
                  spellCheck={false}
                  style={{ width:"100%",minHeight:280,padding:"20px",margin:0,border:"none",resize:"vertical",
                    background:"#0f172a",color:"#e2e8f0",fontSize:13.5,lineHeight:1.8,fontFamily:MONO,
                    outline:"none",tabSize:2 }}
                  onKeyDown={e => {
                    if(e.key==="Tab"){ e.preventDefault(); const s=e.target.selectionStart; setPgCode(pgCode.substring(0,s)+"  "+pgCode.substring(e.target.selectionEnd)); setTimeout(()=>{e.target.selectionStart=e.target.selectionEnd=s+2;},0); }
                  }} />
              </div>
              {/* Sample codes */}
              <div style={{ display:"flex",gap:8,marginTop:12,flexWrap:"wrap" }}>
                <span style={{ fontSize:12,color:"#999",lineHeight:"32px" }}>Try:</span>
                {[
                  ["JCL","SORT Job","//SORTJOB JOB ,'SORT',CLASS=A\n//STEP1  EXEC PGM=SORT\n//SORTIN DD DSN=MY.INPUT.FILE,DISP=SHR\n//SORTOUT DD DSN=MY.OUTPUT.FILE,\n//          DISP=(NEW,CATLG,DELETE),\n//          SPACE=(CYL,(10,5),RLSE)\n//SYSIN DD *\n  SORT FIELDS=(1,10,CH,A)\n  OUTREC FIELDS=(1,80)\n/*"],
                  ["COBOL","File Processing","       IDENTIFICATION DIVISION.\n       PROGRAM-ID. FILREAD.\n       ENVIRONMENT DIVISION.\n       INPUT-OUTPUT SECTION.\n       FILE-CONTROL.\n           SELECT INFILE ASSIGN TO INDD\n             FILE STATUS IS WS-FS.\n       DATA DIVISION.\n       FILE SECTION.\n       FD INFILE RECORDING MODE F.\n       01 IN-REC PIC X(80).\n       WORKING-STORAGE SECTION.\n       01 WS-FS PIC XX.\n       01 WS-EOF PIC 9 VALUE 0.\n       01 WS-COUNT PIC 9(6) COMP VALUE 0.\n       PROCEDURE DIVISION.\n           OPEN INPUT INFILE\n           PERFORM UNTIL WS-EOF = 1\n             READ INFILE\n               AT END MOVE 1 TO WS-EOF\n               NOT AT END ADD 1 TO WS-COUNT\n             END-READ\n           END-PERFORM\n           CLOSE INFILE\n           DISPLAY 'RECORDS READ: ' WS-COUNT\n           STOP RUN."],
                  ["DB2 SQL","Employee Report","SELECT D.DEPTNAME,\n       COUNT(*) AS EMP_COUNT,\n       AVG(E.SALARY) AS AVG_SALARY,\n       MAX(E.SALARY) AS MAX_SALARY\nFROM EMPLOYEE E\nINNER JOIN DEPARTMENT D\n  ON E.WORKDEPT = D.DEPTNO\nGROUP BY D.DEPTNAME\nHAVING COUNT(*) > 5\nORDER BY AVG_SALARY DESC;"]
                ].map(([lang,name,code]) => (
                  <button key={name} onClick={() => { setPgLang(lang); setPgCode(code); setPgResult(null); }}
                    style={{ padding:"4px 12px",borderRadius:8,border:"1px solid #e8e8ed",background:"#fafafa",
                      color:"#555",fontSize:11,cursor:"pointer",fontFamily:FF }}>{name}</button>
                ))}
              </div>
              {/* Result */}
              {pgResult && (
                <div style={{ marginTop:24,borderRadius:16,border:"1px solid rgba(0,113,227,0.15)",
                  background:"rgba(0,113,227,0.03)",padding:"24px 28px",animation:"fadeUp 0.3s ease" }}>
                  <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:16 }}>
                    <span style={{ fontSize:20 }}>{pgMode==="explain"?"💡":pgMode==="errors"?"🔍":"▶️"}</span>
                    <span style={{ fontSize:16,fontWeight:700,color:"#1d1d1f" }}>
                      {pgMode==="explain"?"Code Explanation":pgMode==="errors"?"Error Analysis":"Execution Simulation"}
                    </span>
                  </div>
                  <div style={S.contentPre}>{renderContent(pgResult)}</div>
                </div>
              )}
              {pgLoading && (
                <div style={{ marginTop:24,textAlign:"center",padding:"40px 0" }}>
                  <div style={{ width:40,height:40,border:"3px solid #e8e8ed",borderTop:"3px solid #0071e3",
                    borderRadius:"50%",animation:"spin 1s linear infinite",margin:"0 auto 16px" }} />
                  <p style={{ fontSize:14,color:"#666" }}>
                    {pgMode==="explain"?"Analyzing your code line by line...":pgMode==="errors"?"Checking for errors and bad practices...":"Simulating execution on z/OS..."}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════════════ COMMUNITY — WhatsApp Group Chat + Q&A ════════════════ */}
        {page === "community" && (
          <div>
            {/* ─── TAB SWITCHER: Group Chat vs Q&A ─── */}
            <div style={S.pageHero}>
              <h1 style={S.pageHeroTitle}>💬 Community</h1>
              <p style={S.pageHeroSub}>Real-time group chat, job postings, doubt solving & Q&A — all in one place.</p>
              <div style={{ display:"flex",gap:8,marginTop:20 }}>
                <button onClick={()=>setCommunityView("chat")} style={{ padding:"10px 24px",borderRadius:980,border:communityView==="chat"||communityView===null?"none":"1.5px solid #e8e8ed",background:communityView==="chat"||communityView===null?"#1d1d1f":"#fff",color:communityView==="chat"||communityView===null?"#fff":"#1d1d1f",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:FF }}>🖥️ Group Chat</button>
                <button onClick={()=>setCommunityView("qa")} style={{ padding:"10px 24px",borderRadius:980,border:communityView==="qa"?"none":"1.5px solid #e8e8ed",background:communityView==="qa"?"#1d1d1f":"#fff",color:communityView==="qa"?"#fff":"#1d1d1f",fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:FF }}>❓ Q&A Forum</button>
              </div>
            </div>

            {/* ═══ WHATSAPP GROUP CHAT TAB ═══ */}
            {(communityView === "chat" || communityView === null) && (
              <div style={{ maxWidth:900, margin:"0 auto", padding:"0 24px 80px" }}>
                {!chatJoined ? (
                  /* Join card */
                  <div style={{ position:"relative", borderRadius:24, overflow:"hidden", background:"linear-gradient(135deg, #0a1628, #0d2040)", border:"1.5px solid rgba(0,113,227,0.2)", minHeight:380 }}>
                    <CommCanvas style={{opacity:0.5}} />
                    <div style={{ position:"relative", zIndex:2, padding:"48px 36px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
                      <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(0,179,101,0.12)",border:"1px solid rgba(0,179,101,0.25)",borderRadius:20,padding:"6px 16px",marginBottom:20 }}>
                        <span style={{ width:8,height:8,borderRadius:"50%",background:"#00b365",boxShadow:"0 0 8px #00b365",animation:"commPulse 2s ease-in-out infinite" }} />
                        <span style={{ fontSize:13,color:"#00b365",fontWeight:600 }}>{chatOnline} members online</span>
                      </div>
                      <h2 style={{ fontSize:28,fontWeight:800,color:"#fff",letterSpacing:"-1px",marginBottom:8 }}>Join <span style={{ color:"#58a6ff" }}>MainframeStudyHub</span> Group</h2>
                      <p style={{ fontSize:14,color:"rgba(255,255,255,0.5)",maxWidth:400,lineHeight:1.6,marginBottom:24 }}>{chatMembers.length} members sharing knowledge, jobs & solving doubts in real-time</p>
                      <div style={{ display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:24 }}>
                        {["💬 Chat","💼 Jobs","❓ Doubts","💭 Ideas","📊 Polls"].map((f,i)=><span key={i} style={{ padding:"4px 12px",borderRadius:16,fontSize:11,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)" }}>{f}</span>)}
                      </div>
                      <div style={{ display:"flex",marginBottom:24 }}>
                        {chatMembers.slice(0,6).map((m,i)=><div key={i} style={{ width:36,height:36,borderRadius:"50%",background:`${m.color}25`,border:`2px solid ${m.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,marginLeft:i>0?-8:0,zIndex:6-i }}>{m.emoji}</div>)}
                      </div>
                      <div style={{ width:"100%",maxWidth:320 }}>
                        <button onClick={() => {setChatPopup(false);setWelcomePhase(0);setAuthModal("signin");setAuthError("");setAuthForm({name:"",email:"",password:"",role:"",itYears:"",mfYears:""});}} style={{ width:"100%",padding:"14px",borderRadius:12,border:"none",background:"#0071e3",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:FF,boxShadow:"0 4px 16px rgba(0,113,227,0.3)" }}>Sign In →</button>
                        <p style={{ fontSize:12,color:"rgba(255,255,255,0.35)",marginTop:10 }}>New here? Create a free account to join the community</p>
                        <button onClick={chatJoin} style={{ width:"100%",padding:"13px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#7c3aed,#0071e3)",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:FF,boxShadow:"0 4px 16px rgba(0,113,227,0.3)" }}>Join Community →</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Full chat UI */
                  <div style={{ border:"1.5px solid #e8e8ed", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.06)", height:"70vh", display:"flex" }}>
                    {/* Sidebar */}
                    <div style={{ width:chatSidebar?260:0, minWidth:chatSidebar?260:0, background:"#fafbfc", borderRight:"1px solid #e8e8ed", transition:"all 0.3s", overflow:"hidden", display:"flex", flexDirection:"column" }}>
                      <div style={{ padding:"12px 16px", borderBottom:"1px solid #f5f5f7", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <span style={{ fontSize:13,fontWeight:700,color:"#1d1d1f" }}>Members ({chatMembers.length})</span>
                        <div style={{ display:"flex",gap:6 }}>
                          <button onClick={()=>setChatAddModal(true)} style={{ background:"#e8f4fd",border:"none",borderRadius:8,color:"#0071e3",padding:"3px 8px",cursor:"pointer",fontSize:11,fontWeight:600 }}>+ Add</button>
                          <button onClick={()=>setChatSidebar(false)} style={{ background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:14 }}aria-label="Close">✕</button>
                        </div>
                      </div>
                      <div style={{ flex:1,overflowY:"auto",padding:"4px 0" }}>
                        {chatMembers.map((m,i)=>(
                          <div key={i} style={{ display:"flex",alignItems:"center",gap:8,padding:"8px 16px" }}>
                            <CA m={m} sz={30}/>
                            <div style={{ flex:1,minWidth:0 }}>
                              <div style={{ fontSize:12,color:"#1d1d1f",fontWeight:600,display:"flex",alignItems:"center",gap:4 }}>{m.name}{i===0&&<span style={{ fontSize:9,background:"#e8f8f0",color:"#00b365",padding:"1px 5px",borderRadius:6 }}>Admin</span>}{i===chatSelf&&<span style={{ fontSize:9,background:"#e8f4fd",color:"#0071e3",padding:"1px 5px",borderRadius:6 }}>You</span>}</div>
                              <div style={{ fontSize:10,color:"#666" }}>{m.role}</div>
                            </div>
                            {i!==0&&i!==chatSelf&&<button onClick={()=>setChatMsgs(p=>[...p,{id:chatNid.current++,sender:-1,type:CT.SYS,text:`${m.name} was removed`,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),reactions:{},del:false}])} style={{ background:"none",border:"none",color:"#e8e8ed",cursor:"pointer",fontSize:12 }} onMouseEnter={e=>e.target.style.color="#e74c3c"} onMouseLeave={e=>e.target.style.color="#e8e8ed"}aria-label="Close">✕</button>}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Main chat */}
                    <div style={{ flex:1,display:"flex",flexDirection:"column",minWidth:0 }}>
                      {/* Header */}
                      <div style={{ padding:"10px 16px",background:"#fff",borderBottom:"1px solid #f5f5f7",display:"flex",alignItems:"center",gap:10 }}>
                        <button onClick={()=>setChatSidebar(!chatSidebar)} style={{ background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:16,padding:2 }}aria-label="Toggle menu">☰</button>
                        <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#e8f4fd,#f0f7ff)",border:"1px solid #d0e3ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18 }}>🖥️</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:14,fontWeight:700,color:"#1d1d1f" }}>MainframeStudyHub</div>
                          <div style={{ fontSize:11,color:"#666" }}>{chatMembers.length} members • {chatOnline} online</div>
                        </div>
                        <button onClick={()=>{setChatShowSrch(!chatShowSrch);setChatSrch("");}} style={{ background:chatShowSrch?"#e8f4fd":"transparent",border:"none",borderRadius:6,color:chatShowSrch?"#0071e3":"#666",cursor:"pointer",fontSize:14,padding:"4px 8px" }}aria-label="Search">🔍</button>
                        <button onClick={()=>setChatShowStars(!chatShowStars)} aria-label="Toggle bookmarks" style={{ background:chatShowStars?"#fef9e7":"transparent",border:"none",borderRadius:6,color:chatShowStars?"#d4a017":"#666",cursor:"pointer",fontSize:14,padding:"4px 8px" }}>{chatShowStars?"⭐":"☆"}</button>
                      </div>
                      {chatShowSrch&&<div style={{ padding:"6px 16px",background:"#f5f5f7",borderBottom:"1px solid #e8e8ed" }}><input value={chatSrch} onChange={e=>setChatSrch(e.target.value)} placeholder="Search messages..." autoFocus style={{ width:"100%",boxSizing:"border-box",padding:"6px 12px",borderRadius:8,border:"1.5px solid #e8e8ed",background:"#fff",color:"#1d1d1f",fontSize:13,outline:"none",fontFamily:FF }} /></div>}
                      {chatShowStars&&<div style={{ padding:"5px 16px",background:"#fef9e7",borderBottom:"1px solid #fde68a",fontSize:12,color:"#d4a017",display:"flex",alignItems:"center",gap:4 }}>⭐ Starred ({chatStarred.size})<button onClick={()=>setChatShowStars(false)} style={{ background:"none",border:"none",color:"#d4a017",cursor:"pointer",marginLeft:"auto",fontSize:12 }}>Show all</button></div>}
                      {/* Messages */}
                      <div style={{ flex:1,overflowY:"auto",padding:"12px 0",background:"#fafbfc" }}>
                        {chatFiltered.map(msg=><ChatBubble key={msg.id} msg={msg} members={chatMembers} self={chatSelf} onReact={chatReact} onReply={setChatReply} onDel={chatDel} onStar={chatStarFn} starred={chatStarred.has(msg.id)} />)}
                        {chatFiltered.length===0&&<div style={{ textAlign:"center",padding:40,color:"#666",fontSize:13 }}>{chatShowStars?"No starred messages":"No messages found"}</div>}
                        <div ref={chatEnd} />
                      </div>
                      {/* Reply */}
                      {chatReply&&<div style={{ padding:"6px 16px",background:"#f5f5f7",borderTop:"1px solid #e8e8ed",display:"flex",alignItems:"center",gap:8 }}>
                        <div style={{ width:3,height:24,borderRadius:2,background:chatMembers[chatReply.sender]?.color||"#0071e3" }} />
                        <div style={{ flex:1,minWidth:0 }}><div style={{ fontSize:11,color:chatMembers[chatReply.sender]?.color,fontWeight:600 }}>{chatMembers[chatReply.sender]?.name}</div><div style={{ fontSize:11,color:"#666",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{chatReply.text}</div></div>
                        <button onClick={()=>setChatReply(null)} style={{ background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:14 }}aria-label="Close">✕</button>
                      </div>}
                      {/* Input */}
                      <div style={{ padding:"8px 12px",background:"#fff",borderTop:"1px solid #f5f5f7" }}>
                        <div style={{ display:"flex",gap:4,marginBottom:6 }}>
                          {[{t:CT.TEXT,i:"💬",l:"Message"},{t:CT.JOB,i:"💼",l:"Job"},{t:CT.DOUBT,i:"❓",l:"Doubt"},{t:CT.THOUGHT,i:"💭",l:"Thought"}].map(x=>
                            <button key={x.t} onClick={()=>setChatMsgType(x.t)} style={{ padding:"3px 10px",borderRadius:980,border:`1.5px solid ${chatMsgType===x.t?"#0071e3":"#e8e8ed"}`,background:chatMsgType===x.t?"#e8f4fd":"#fff",color:chatMsgType===x.t?"#0071e3":"#666",fontSize:11,cursor:"pointer",fontFamily:FF,display:"flex",alignItems:"center",gap:3 }}>{x.i} {x.l}</button>
                          )}
                        </div>
                        <div style={{ display:"flex",gap:8,alignItems:"flex-end" }}>
                          <textarea ref={chatInpRef} value={grpInput} onChange={e=>setGrpInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();chatSend();}}}
                            placeholder={chatMsgType===CT.JOB?"Paste job details...":chatMsgType===CT.DOUBT?"Ask your doubt...":chatMsgType===CT.THOUGHT?"Share your thought...":"Type a message..."} rows={1}
                            style={{ flex:1,padding:"9px 12px",borderRadius:12,border:"1.5px solid #e8e8ed",background:"#f5f5f7",color:"#1d1d1f",fontSize:13,fontFamily:FF,outline:"none",resize:"none",minHeight:38,maxHeight:90 }} />
                          <button onClick={chatSend} disabled={!grpInput.trim()} style={{ width:38,height:38,borderRadius:10,border:"none",background:grpInput.trim()?"#0071e3":"#e8e8ed",color:grpInput.trim()?"#fff":"#666",fontSize:16,cursor:grpInput.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>➤</button>
                        </div>
                      </div>
                    </div>
                    {chatAddModal&&<AddMemModal onClose={()=>setChatAddModal(false)} onAdd={m=>{setChatMembers(p=>[...p,m]);setChatMsgs(p=>[...p,{id:chatNid.current++,sender:-1,type:CT.SYS,text:`${m.name} joined`,time:new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),reactions:{},del:false}]);}} existing={chatMembers.map(m=>m.name)} />}
                  </div>
                )}
              </div>
            )}

            {/* ═══ Q&A FORUM TAB (existing) ═══ */}
            {communityView === "qa" && (
              <div style={{ ...S.inner, maxWidth:900, paddingBottom:80 }}>
                <div style={{ display:"flex",gap:10,flexWrap:"wrap",marginBottom:24,alignItems:"center" }}>
                  <div style={{ position:"relative",flex:"1 1 200px" }}>
                    <span style={{ position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:14,color:"#666" }}>🔍</span>
                    <input value={communitySearch} onChange={e => setCommunitySearch(e.target.value)}
                      aria-label="Search questions" placeholder="Search questions..." style={{ ...S.searchInput, width:"100%",paddingLeft:32 }} />
                  </div>
                  <div style={{ display:"flex",gap:4 }}>
                    {["hot","new","top"].map(s => (
                      <button key={s} onClick={() => setCommunitySort(s)}
                        style={{ ...S.pill, background:communitySort===s?"#1d1d1f":"rgba(255,255,255,0.7)", color:communitySort===s?"#fff":"#1d1d1f",
                          border:communitySort===s?"none":"1.5px solid #e8e8ed",textTransform:"capitalize" }}>{s==="hot"?"🔥 Hot":s==="new"?"🕐 New":"⬆️ Top"}</button>
                    ))}
                  </div>
                  <select value={communityFilter} onChange={e => setCommunityFilter(e.target.value)}
                    style={{ padding:"6px 12px",borderRadius:8,border:"1.5px solid #e8e8ed",background:"#fff",fontSize:13,color:"#1d1d1f",fontFamily:FF,cursor:"pointer" }}>
                    <option>All</option>{TOPICS.map(t => <option key={t.id} value={t.title}>{t.title}</option>)}<option>General</option>
                  </select>
                  <button onClick={() => { if (!user) { setAuthModal("signin"); return; } setNewPostOpen(!newPostOpen); }}
                    style={{ ...S.btnBlue, padding:"8px 18px", fontSize:13, display:"flex",alignItems:"center",gap:6 }}>✍️ Ask Question</button>
                </div>
                {newPostOpen && (
                  <div className="fi" style={{ border:"1.5px solid #0071e3",borderRadius:16,padding:20,marginBottom:24,background:"#fafbfc" }}>
                    <input value={newPost.title} onChange={e => setNewPost(p=>({...p,title:e.target.value}))} placeholder="Question title..." style={{ width:"100%",boxSizing:"border-box",padding:"10px 14px",borderRadius:10,border:"1.5px solid #e8e8ed",background:"#fff",fontSize:15,fontWeight:600,color:"#1d1d1f",outline:"none",fontFamily:FF,marginBottom:10 }} />
                    <textarea value={newPost.body} onChange={e => setNewPost(p=>({...p,body:e.target.value}))} placeholder="Details (optional)..." rows={3} style={{ width:"100%",boxSizing:"border-box",padding:"10px 14px",borderRadius:10,border:"1.5px solid #e8e8ed",background:"#fff",fontSize:14,color:"#1d1d1f",outline:"none",fontFamily:FF,resize:"vertical",marginBottom:10 }} />
                    <div style={{ display:"flex",gap:10,alignItems:"center" }}>
                      <select value={newPost.topic} onChange={e => setNewPost(p=>({...p,topic:e.target.value}))} style={{ padding:"8px 12px",borderRadius:8,border:"1.5px solid #e8e8ed",fontSize:13,fontFamily:FF }}>
                        {TOPICS.map(t => <option key={t.id} value={t.title}>{t.title}</option>)}<option>General</option>
                      </select>
                      <button onClick={submitPost} style={{ ...S.btnBlue,padding:"8px 20px",fontSize:13 }}>Post Question</button>
                      <button onClick={() => setNewPostOpen(false)} style={{ background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:13,fontFamily:FF }}>Cancel</button>
                    </div>
                  </div>
                )}
                {sortedPosts.length === 0 && <div style={{ textAlign:"center",padding:"48px 0",color:"#666" }}><div style={{ fontSize:40,marginBottom:12 }}>🔍</div>No questions found.</div>}
                {sortedPosts.map(post => (
                  <div key={post.id} className="card" style={{ border:"1.5px solid #e8e8ed", borderRadius:16, padding:"20px 24px", marginBottom:16, cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.03)" }}
                    onClick={() => setCommunityView(post.id)}>
                    <div style={{ display:"flex",gap:16,alignItems:"flex-start" }}>
                      <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4,minWidth:40 }}>
                        <button onClick={e => { e.stopPropagation(); votePost(post.id, 1); }} style={{ background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:16 }}>▲</button>
                        <span style={{ fontSize:16,fontWeight:800,color:"#1d1d1f" }}>{post.votes}</span>
                        <button onClick={e => { e.stopPropagation(); votePost(post.id, -1); }} style={{ background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:16 }}>▼</button>
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:16,fontWeight:700,color:"#1d1d1f",marginBottom:6,lineHeight:1.4 }}>{post.title}</div>
                        {post.body && <div style={{ fontSize:13,color:"#555",lineHeight:1.5,marginBottom:8,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden" }}>{post.body}</div>}
                        <div style={{ display:"flex",gap:10,alignItems:"center",fontSize:12,color:"#666" }}>
                          <span style={{ ...S.pill, background:"#f0f7ff",color:"#0071e3",padding:"3px 10px",fontSize:11 }}>{post.topic}</span>
                          <span>by <strong style={{ color:"#1d1d1f" }}>{post.author}</strong></span>
                          <span>{post.date}</span>
                          <span style={{ color:"#0071e3" }}>💬 {post.answers.length} {post.answers.length===1?"answer":"answers"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ═══ Q&A DETAIL VIEW ═══ */}
            {communityView && communityView !== "chat" && communityView !== "qa" && (() => {
              const post = communityPosts.find(p => p.id === communityView);
              if (!post) return null;
              return (
                <div style={{ ...S.inner, maxWidth:800, paddingBottom:80 }}>
                  <button onClick={() => setCommunityView("qa")} style={S.backBtn}>← Back to all questions</button>
                  <div style={{ border:"1.5px solid #e8e8ed", borderRadius:20, padding:"28px 32px", marginBottom:32, background:"#fff" }}>
                    <div style={{ display:"flex",gap:16 }}>
                      <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
                        <button onClick={() => votePost(post.id, 1)} style={{ background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:20 }}>▲</button>
                        <span style={{ fontSize:24,fontWeight:800,color:"#1d1d1f" }}>{post.votes}</span>
                        <button onClick={() => votePost(post.id, -1)} style={{ background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:20 }}>▼</button>
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex",gap:8,marginBottom:12 }}>
                          <span style={{ ...S.pill, background:"#f0f7ff",color:"#0071e3",padding:"4px 12px" }}>{post.topic}</span>
                        </div>
                        <h2 style={{ fontSize:22,fontWeight:800,color:"#1d1d1f",marginBottom:12,letterSpacing:"-.3px" }}>{post.title}</h2>
                        {post.body && <div style={{ fontSize:15,color:"#3a3a3c",lineHeight:1.8,marginBottom:16,whiteSpace:"pre-wrap" }}>{post.body}</div>}
                        <div style={{ fontSize:13,color:"#666" }}>Asked by <strong style={{ color:"#1d1d1f" }}>{post.author}</strong>{post.authorRole && <span style={{ color:"#0071e3" }}> • {post.authorRole}</span>} on {post.date}</div>
                      </div>
                    </div>
                  </div>
                  <h3 style={{ fontSize:18,fontWeight:700,marginBottom:16,color:"#1d1d1f" }}>{post.answers.length} {post.answers.length===1?"Answer":"Answers"}</h3>
                  {post.answers.map(ans => (
                    <div key={ans.id} style={{ border:"1.5px solid #e8e8ed",borderRadius:16,padding:"20px 24px",marginBottom:16,background:"#fff" }}>
                      <div style={{ display:"flex",gap:12 }}>
                        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:4 }}>
                          <button onClick={() => voteAnswer(post.id, ans.id, 1)} style={{ background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:16 }}>▲</button>
                          <span style={{ fontSize:16,fontWeight:800,color:"#1d1d1f" }}>{ans.votes}</span>
                          <button onClick={() => voteAnswer(post.id, ans.id, -1)} style={{ background:"none",border:"none",color:"#666",cursor:"pointer",fontSize:16 }}>▼</button>
                        </div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:14,color:"#3a3a3c",lineHeight:1.8,whiteSpace:"pre-wrap" }}>{ans.body}</div>
                          <div style={{ fontSize:12,color:"#666",marginTop:10 }}>Answered by <strong style={{ color:"#1d1d1f" }}>{ans.author}</strong>{ans.authorRole && <span style={{ color:"#0071e3" }}> • {ans.authorRole}</span>} on {ans.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {user ? (
                    <div style={{ border:"1.5px solid #e8e8ed",borderRadius:16,padding:20,background:"#fafbfc" }}>
                      <h4 style={{ fontSize:15,fontWeight:700,color:"#1d1d1f",marginBottom:12 }}>Your Answer</h4>
                      <textarea value={newAnswer} onChange={e => setNewAnswer(e.target.value)} rows={4} placeholder="Write your answer..." style={{ width:"100%",boxSizing:"border-box",padding:"12px 14px",borderRadius:10,border:"1.5px solid #e8e8ed",background:"#fff",fontSize:14,color:"#1d1d1f",outline:"none",fontFamily:FF,resize:"vertical",marginBottom:12 }} />
                      <button onClick={() => submitAnswer(post.id)} style={{ ...S.btnBlue, padding:"10px 24px", fontSize:14 }}>Post Answer</button>
                    </div>
                  ) : (
                    <div style={{ border:"1.5px solid #e8e8ed",borderRadius:16,padding:"24px 20px",textAlign:"center",background:"#fafbfc" }}>
                      <p style={{ color:"#666",marginBottom:12 }}>Sign in to post your answer</p>
                      <button onClick={() => { setAuthModal("signin"); setAuthError(""); setAuthForm({name:"",email:"",password:"",role:"",itYears:"",mfYears:""}); }} style={S.btnBlue}>Sign In</button>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ════════════════ ABEND SOLVER ════════════════ */}
        {page === "abends" && (
          <div>
            <div style={S.pageHero}>
              <h1 style={S.pageHeroTitle}>Abend Solver</h1>
              <p style={S.pageHeroSub}>Quick-search IBM ABEND codes — get the cause and fix instantly</p>
            </div>
            <div style={{ ...S.inner, paddingBottom:80 }}>
              {/* Search + Filter */}
              <div className="content-card fi" style={{ marginBottom:24 }}>
                <div style={{ display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:18 }}>
                  <div style={{ flex:1,minWidth:200,position:"relative" }}>
                    <span style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",fontSize:18 }}>🔍</span>
                    <input value={abendSearch} onChange={e => { setAbendSearch(e.target.value); setAbendExpanded(null); }}
                      aria-label="Search abend codes" placeholder="Search abend code (e.g. S0C7, ASRA, S878...)"
                      style={{ width:"100%",padding:"14px 14px 14px 44px",fontSize:15,border:"2px solid rgba(0,0,0,0.08)",
                        borderRadius:14,outline:"none",background:"rgba(245,245,247,0.8)",fontFamily:"inherit",color:"#1d1d1f",
                        transition:"border-color 0.2s" }}
                      onFocus={e => e.target.style.borderColor="#7c3aed"}
                      onBlur={e => e.target.style.borderColor="rgba(0,0,0,0.08)"} />
                  </div>
                  <div style={{ fontSize:13,color:"#666",fontWeight:600 }}>{filteredAbends.length} codes</div>
                </div>
                <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                  {ABEND_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => { setAbendCategory(cat); setAbendExpanded(null); }}
                      style={{ padding:"6px 16px",borderRadius:980,border:"1.5px solid",fontSize:12,fontWeight:600,
                        cursor:"pointer",fontFamily:"inherit",transition:"all 0.2s",
                        background:abendCategory===cat?"linear-gradient(135deg,#0071e3,#7c3aed)":"transparent",
                        color:abendCategory===cat?"#fff":"#555",
                        borderColor:abendCategory===cat?"transparent":"rgba(0,0,0,0.1)" }}>
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div style={{ display:"flex",flexDirection:"column",gap:12 }}>
                {filteredAbends.length === 0 && (
                  <div style={{ textAlign:"center",padding:"48px 0",color:"#666" }}>
                    <div style={{ fontSize:48,marginBottom:12 }}>🔎</div>
                    <p>No abend codes found. Try a different search term.</p>
                  </div>
                )}
                {filteredAbends.map((a, i) => (
                  <div key={a.code} className="fi" style={{ animationDelay:`${Math.min(i,8)*40}ms` }}>
                    {/* Header row */}
                    <div onClick={() => setAbendExpanded(abendExpanded===a.code?null:a.code)}
                      style={{ background:"rgba(255,255,255,0.82)",backdropFilter:"blur(20px)",border:"1px solid rgba(255,255,255,0.6)",
                        borderRadius:abendExpanded===a.code?"16px 16px 0 0":"16px",padding:"18px 22px",cursor:"pointer",
                        display:"flex",alignItems:"center",gap:14,transition:"all 0.2s",
                        boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
                      <div style={{ background:SEVERITY_COLORS[a.severity]+"18",color:SEVERITY_COLORS[a.severity],
                        padding:"8px 14px",borderRadius:10,fontSize:18,fontWeight:800,fontFamily:"'SF Mono',Menlo,monospace",
                        letterSpacing:"0.5px",minWidth:70,textAlign:"center",border:`1.5px solid ${SEVERITY_COLORS[a.severity]}30` }}>
                        {a.code}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:15,fontWeight:700,color:"#1d1d1f",marginBottom:2 }}>{a.name}</div>
                        <div style={{ display:"flex",gap:8,alignItems:"center",flexWrap:"wrap" }}>
                          <span style={{ fontSize:11,color:SEVERITY_COLORS[a.severity],fontWeight:700 }}>{SEVERITY_LABELS[a.severity]}</span>
                          <span style={{ fontSize:11,color:"#666",background:"rgba(245,245,247,0.8)",padding:"2px 8px",borderRadius:980 }}>{a.category}</span>
                        </div>
                      </div>
                      <span style={{ fontSize:18,color:"#666",transition:"transform 0.3s",
                        transform:abendExpanded===a.code?"rotate(180deg)":"rotate(0)" }}>▼</span>
                    </div>

                    {/* Expanded detail */}
                    {abendExpanded===a.code && (
                      <div style={{ background:"rgba(255,255,255,0.95)",borderRadius:"0 0 16px 16px",
                        padding:"24px 22px",borderTop:"2px solid",borderImage:"linear-gradient(90deg,#0071e3,#7c3aed) 1",
                        boxShadow:"0 4px 20px rgba(0,0,0,0.06)" }}>
                        {/* Cause */}
                        <div style={{ marginBottom:20 }}>
                          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
                            <span style={{ background:"#fee2e2",color:"#dc2626",padding:"4px 10px",borderRadius:8,fontSize:12,fontWeight:700 }}>⚠️ CAUSE</span>
                          </div>
                          <p style={{ fontSize:14,color:"#3a3a3c",lineHeight:1.75 }}>{a.cause}</p>
                        </div>
                        {/* Fix */}
                        <div style={{ marginBottom:20 }}>
                          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10 }}>
                            <span style={{ background:"#dcfce7",color:"#16a34a",padding:"4px 10px",borderRadius:8,fontSize:12,fontWeight:700 }}>✅ FIX</span>
                          </div>
                          <div style={{ fontSize:14,color:"#3a3a3c",lineHeight:1.75,whiteSpace:"pre-line" }}>{a.fix}</div>
                        </div>
                        {/* Tips */}
                        {a.tips && a.tips.length > 0 && (
                          <div style={{ background:"rgba(0,113,227,0.04)",borderRadius:12,padding:"14px 18px",
                            border:"1px solid rgba(0,113,227,0.08)" }}>
                            <div style={{ fontSize:12,fontWeight:700,color:"#0071e3",marginBottom:8 }}>💡 PRO TIPS</div>
                            {a.tips.map((tip,j) => (
                              <div key={j} style={{ fontSize:13,color:"#3a3a3c",lineHeight:1.6,paddingLeft:16,position:"relative",marginBottom:4 }}>
                                <span style={{ position:"absolute",left:0,color:"#0071e3" }}>›</span>
                                {tip}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ ROADMAP ════════════════ */}
        {page === "roadmap" && (
          <div>
            <div style={S.pageHero}>
              <h1 style={S.pageHeroTitle}>Learning Roadmap</h1>
              <p style={S.pageHeroSub}>Your path from Trainee to Architect — click any level to explore</p>
            </div>
            <div style={{ ...S.inner, paddingBottom:80, maxWidth:900 }}>
              {/* Timeline */}
              <div style={{ position:"relative",paddingLeft:40 }}>
                {/* Vertical line */}
                <div style={{ position:"absolute",left:18,top:0,bottom:0,width:4,
                  background:"linear-gradient(to bottom,#22c55e,#3b82f6,#8b5cf6,#ec4899,#f59e0b,#ef4444)",
                  borderRadius:4 }} />

                {ROADMAP_LEVELS.map((lvl, i) => (
                  <div key={lvl.level} className="fi" style={{ marginBottom:i<ROADMAP_LEVELS.length-1?32:0,
                    position:"relative",animationDelay:`${i*100}ms` }}>
                    {/* Node dot */}
                    <div style={{ position:"absolute",left:-30,top:20,width:28,height:28,borderRadius:"50%",
                      background:lvl.color,border:"4px solid #fff",boxShadow:`0 0 0 3px ${lvl.color}40, 0 2px 8px ${lvl.color}30`,
                      display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,zIndex:1 }}>
                      <span style={{ filter:"grayscale(0)" }}>{lvl.icon}</span>
                    </div>

                    {/* Card */}
                    <div onClick={() => setRoadmapLevel(roadmapLevel===lvl.level?null:lvl.level)}
                      className="scenario-card"
                      style={{ background:"rgba(255,255,255,0.85)",backdropFilter:"blur(20px)",
                        border:`1.5px solid ${roadmapLevel===lvl.level?lvl.color+"50":"rgba(0,0,0,0.05)"}`,
                        borderRadius:18,padding:"24px 26px",cursor:"pointer",
                        boxShadow:roadmapLevel===lvl.level?`0 8px 32px ${lvl.color}15`:"0 2px 12px rgba(0,0,0,0.04)" }}>
                      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:roadmapLevel===lvl.level?16:0 }}>
                        <div>
                          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:4 }}>
                            <span style={{ fontSize:11,fontWeight:800,color:lvl.color,background:lvl.color+"15",
                              padding:"3px 10px",borderRadius:980 }}>LEVEL {lvl.level}</span>
                            <span style={{ fontSize:11,color:"#666" }}>{lvl.duration}</span>
                          </div>
                          <div style={{ fontSize:20,fontWeight:800,color:"#1d1d1f",letterSpacing:"-0.3px" }}>
                            {lvl.icon} {lvl.title}
                          </div>
                          <div style={{ fontSize:13,color:"#666" }}>{lvl.subtitle}</div>
                        </div>
                        <span style={{ fontSize:18,color:"#666",transition:"transform 0.3s",
                          transform:roadmapLevel===lvl.level?"rotate(180deg)":"rotate(0)",flexShrink:0 }}>▼</span>
                      </div>

                      {/* Expanded skills */}
                      {roadmapLevel===lvl.level && (
                        <div style={{ borderTop:"1px solid rgba(0,0,0,0.06)",paddingTop:16 }}>
                          <div style={{ fontSize:12,fontWeight:700,color:"#666",marginBottom:12,textTransform:"uppercase",letterSpacing:"0.5px" }}>Skills to Master</div>
                          <div style={{ display:"flex",flexDirection:"column",gap:8,marginBottom:16 }}>
                            {lvl.skills.map((skill, j) => (
                              <div key={j} style={{ display:"flex",alignItems:"center",gap:10 }}>
                                <div style={{ width:8,height:8,borderRadius:"50%",background:lvl.color,flexShrink:0 }} />
                                <span style={{ fontSize:14,color:"#3a3a3c" }}>{skill.name}</span>
                                <button onClick={(e) => { e.stopPropagation(); const t = TOPICS.find(t=>t.id===skill.topic); if(t) openTopic(t); }}
                                  style={{ background:lvl.color+"12",color:lvl.color,border:"none",padding:"2px 10px",
                                    borderRadius:980,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",marginLeft:"auto",flexShrink:0 }}>
                                  Study →
                                </button>
                              </div>
                            ))}
                          </div>
                          <div style={{ background:`${lvl.color}08`,borderRadius:12,padding:"14px 18px",
                            border:`1px solid ${lvl.color}15` }}>
                            <div style={{ fontSize:12,fontWeight:700,color:lvl.color,marginBottom:4 }}>🎯 MILESTONE</div>
                            <div style={{ fontSize:13,color:"#3a3a3c",lineHeight:1.6 }}>{lvl.milestone}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ ABOUT ════════════════ */}
        {page === "about" && (
          <div>
            <div style={S.pageHero}>
              <h1 style={S.pageHeroTitle}>About</h1>
              <p style={S.pageHeroSub}>The story behind MainframeStudyHub</p>
            </div>
            <div style={{ ...S.inner, paddingBottom:80, maxWidth:800 }}>
              {/* Mission Card */}
              <div className="content-card fi" style={{ marginBottom:32 }}>
                <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:28 }}>
                  <div style={{ width:56,height:56,borderRadius:16,background:"linear-gradient(135deg,#0071e3,#7c3aed)",
                    display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,flexShrink:0 }}>🎯</div>
                  <div>
                    <h2 style={{ fontSize:24,fontWeight:800,color:"#1d1d1f",letterSpacing:"-0.5px" }}>About This Platform</h2>
                    <p style={{ fontSize:14,color:"#666" }}>Built with passion for the Mainframe community</p>
                  </div>
                </div>
                <div style={{ fontSize:15,color:"#3a3a3c",lineHeight:1.85 }}>
                  <p style={{ marginBottom:18 }}>
                    Welcome to this dedicated learning space built for the <strong style={{ color:"#1d1d1f" }}>Mainframe community</strong>.
                  </p>
                  <p style={{ marginBottom:18 }}>
                    I created this website with a simple mission — to bring together all essential Mainframe concepts in one place and make learning <strong style={{ color:"#1d1d1f" }}>easier, structured, and practical</strong>. As someone deeply interested in Mainframe technologies and real-world development practices, I wanted to build a platform that helps beginners and experienced professionals strengthen their fundamentals and prepare confidently for interviews and projects.
                  </p>
                  <p style={{ marginBottom:18 }}>
                    My growing interest in modern development approaches and <em>"vibe coding"</em> inspired me to design and develop this site in a clean, focused, and user-friendly way. This platform reflects both my passion for Mainframe technology and my curiosity for building efficient digital learning experiences.
                  </p>
                  <p style={{ marginBottom:18 }}>
                    I will be truly happy to see learners use this site effectively for their <strong style={{ color:"#1d1d1f" }}>study purposes, career growth, and skill enhancement</strong>. If this platform helps even one person gain clarity in COBOL, JCL, DB2, CICS, or overall Mainframe concepts — it fulfills its purpose.
                  </p>
                  <p style={{ fontSize:17,fontWeight:700,color:"#0071e3",fontStyle:"italic" }}>
                    Let's grow and learn together. 🚀
                  </p>
                </div>
              </div>

              {/* What We Offer */}
              <div className="content-card fi" style={{ marginBottom:32,animationDelay:"0.1s" }}>
                <h3 style={{ fontSize:20,fontWeight:800,color:"#1d1d1f",marginBottom:20,letterSpacing:"-0.3px" }}>What You'll Find Here</h3>
                <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14 }}>
                  {[
                    ["📚","15 Topics","Comprehensive coverage from z/OS to Modernization"],
                    ["🧠","200 Quiz Questions","Test your knowledge across all mainframe domains"],
                    ["🎯","Real Scenarios","Practice with production-like interview scenarios"],
                    ["💬","Community Q&A","Ask questions and share knowledge with peers"],
                    ["📰","Expert Blogs","Insights from experienced mainframe professionals"],
                    ["🤖","AI Assistant","Get instant help with mainframe concepts and debugging"],
                  ].map(([icon,title,desc],i) => (
                    <div key={i} style={{ background:"rgba(245,245,247,0.6)",borderRadius:14,padding:"18px 16px",
                      border:"1px solid rgba(0,0,0,0.04)" }}>
                      <div style={{ fontSize:24,marginBottom:8 }}>{icon}</div>
                      <div style={{ fontSize:14,fontWeight:700,color:"#1d1d1f",marginBottom:4 }}>{title}</div>
                      <div style={{ fontSize:12,color:"#666",lineHeight:1.5 }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Founder Card */}
              <div className="content-card fi" style={{ animationDelay:"0.2s" }}>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:24 }}>
                  <div style={{ width:4,height:28,borderRadius:4,background:"linear-gradient(135deg,#0071e3,#7c3aed)" }} />
                  <h3 style={{ fontSize:20,fontWeight:800,color:"#1d1d1f",letterSpacing:"-0.3px" }}>Meet the Founder</h3>
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:24,flexWrap:"wrap" }}>
                  <div style={{ position:"relative",flexShrink:0 }}>
                    <div style={{ position:"absolute",inset:-4,borderRadius:"50%",
                      background:"conic-gradient(#0071e3, #7c3aed, #00b365, #0071e3)",
                      animation:"spin 4s linear infinite",opacity:0.7 }} />
                    <img src="/founder.jpg" alt="Harikrishnan K" style={{
                      width:90,height:90,borderRadius:"50%",objectFit:"cover",
                      border:"3px solid #fff",position:"relative",zIndex:1,
                      boxShadow:"0 8px 24px rgba(0,113,227,0.25)"
                    }} />
                  </div>
                  <div style={{ flex:1,minWidth:200 }}>
                    <div style={{ fontSize:24,fontWeight:800,color:"#1d1d1f",letterSpacing:"-0.5px",marginBottom:2 }}>Harikrishnan K</div>
                    <div style={{ fontSize:14,color:"#555",marginBottom:10 }}>Founder & Creator of MainframeStudyHub</div>
                    <div style={{ display:"inline-flex",alignItems:"center",gap:6,background:"linear-gradient(135deg,#0071e3,#7c3aed)",
                      color:"#fff",padding:"5px 14px",borderRadius:980,fontSize:12,fontWeight:700,marginBottom:14 }}>
                      🖥️ Mainframe Developer
                    </div>
                    <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
                      <a href="mailto:harikrish17642@gmail.com" style={{ display:"inline-flex",alignItems:"center",gap:6,
                        background:"rgba(245,245,247,0.8)",color:"#3a3a3c",padding:"8px 14px",borderRadius:10,fontSize:12,
                        fontWeight:600,textDecoration:"none",border:"1px solid rgba(0,0,0,0.06)",transition:"all 0.2s" }}>
                        📧 Email
                      </a>
                      <a href="https://www.linkedin.com/in/harikrishnan-k-4560241a2" target="_blank" rel="noopener noreferrer"
                        style={{ display:"inline-flex",alignItems:"center",gap:6,
                        background:"#0A66C2",color:"#fff",padding:"8px 14px",borderRadius:10,fontSize:12,
                        fontWeight:700,textDecoration:"none",transition:"all 0.2s" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop:24,padding:"18px 22px",background:"linear-gradient(135deg,rgba(0,113,227,0.04),rgba(124,58,237,0.04))",
                  borderRadius:14,border:"1px solid rgba(0,113,227,0.08)" }}>
                  <p style={{ fontSize:13.5,color:"#4a4a4f",lineHeight:1.7,margin:0 }}>
                    Passionate about making mainframe knowledge accessible to everyone. Built MainframeStudyHub 
                    to bridge the gap between experienced professionals and newcomers entering the IBM Z world. 
                    Have suggestions or want to contribute? I'd love to connect!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ─── WELCOME SEQUENCE POPUPS ─── */}
      {welcomePhase > 0 && (
        <div style={{ position:"fixed",inset:0,zIndex:2400,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn 0.4s ease" }} onClick={()=>setWelcomePhase(0)}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#fff",borderRadius:24,overflow:"hidden",width:420,maxWidth:"92vw",boxShadow:"0 30px 80px rgba(0,0,0,0.25)",animation:"popIn 0.5s cubic-bezier(0.16,1,0.3,1)" }}>
            {welcomePhase === 1 && (
              <div>
                <div style={{ position:"relative",height:180,background:"linear-gradient(135deg, #0a1628, #0d2040)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <CommCanvas style={{opacity:0.5}} />
                  <div style={{ position:"relative",zIndex:2,textAlign:"center" }}>
                    <div style={{ fontSize:56,marginBottom:8,animation:"popIn 0.6s ease 0.2s both" }}>🖥️</div>
                    <h2 style={{ margin:0,fontSize:26,fontWeight:800,color:"#fff",letterSpacing:"-0.5px",animation:"popIn 0.6s ease 0.3s both" }}>
                      Welcome to the<br/><span style={{ background:"linear-gradient(135deg,#58a6ff,#0071e3)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Mainframe World</span>
                    </h2>
                  </div>
                </div>
                <div style={{ padding:"24px 28px 28px",textAlign:"center" }}>
                  <p style={{ fontSize:15,color:"#555",lineHeight:1.6,marginBottom:20 }}>
                    The most comprehensive IBM Z learning platform. Master JCL, COBOL, DB2, CICS and more — from beginner to architect.
                  </p>
                  <div style={{ display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center",marginBottom:24 }}>
                    {["📚 15+ Topics","🧠 Quiz","🎯 Scenarios","🔍 Abend Solver","💬 Community","🗺️ Roadmap"].map((t,i)=>
                      <span key={i} style={{ padding:"4px 12px",borderRadius:16,fontSize:12,background:"#f0f7ff",color:"#0071e3",border:"1px solid #d0e3ff" }}>{t}</span>
                    )}
                  </div>
                  <button onClick={()=>setWelcomePhase(0)}
                    style={{ width:"100%",padding:"14px",borderRadius:12,border:"none",background:"#0071e3",color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:FF,boxShadow:"0 4px 16px rgba(0,113,227,0.3)" }}>
                    Start Exploring →
                  </button>
                </div>
              </div>
            )}
            {welcomePhase === 2 && (
              <div>
                <div style={{ position:"relative",height:140,background:"linear-gradient(135deg, #1a0a38, #2d1060)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <div style={{ position:"relative",zIndex:2,textAlign:"center" }}>
                    <div style={{ fontSize:48,marginBottom:6 }}>🔐</div>
                    <h2 style={{ margin:0,fontSize:22,fontWeight:800,color:"#fff" }}>Create Your Account</h2>
                  </div>
                </div>
                <div style={{ padding:"20px 28px 28px",textAlign:"center" }}>
                  <p style={{ fontSize:14,color:"#555",lineHeight:1.6,marginBottom:20 }}>
                    Sign in to save progress, post in Q&A, get personalized recommendations, and track your learning journey.
                  </p>
                  <div style={{ display:"flex",gap:10 }}>
                    <button onClick={()=>setWelcomePhase(0)} style={{ flex:1,padding:"12px",borderRadius:12,border:"1.5px solid #e8e8ed",background:"transparent",color:"#666",cursor:"pointer",fontSize:14,fontFamily:FF }}>Maybe Later</button>
                    <button onClick={()=>{setWelcomePhase(0);setAuthModal("signup");setAuthError("");setAuthForm({name:"",email:"",password:"",role:"",itYears:"",mfYears:""});}}
                      style={{ flex:1,padding:"12px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#7c3aed,#0071e3)",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:FF }}>Sign Up Free</button>
                  </div>
                </div>
              </div>
            )}
            {welcomePhase === 3 && (
              <div>
                <div style={{ position:"relative",height:160,background:"linear-gradient(135deg, #0a1628, #0d2040)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center" }}>
                  <CommCanvas style={{opacity:0.4}} />
                  <div style={{ position:"relative",zIndex:2,textAlign:"center" }}>
                    <div style={{ display:"flex",justifyContent:"center",marginBottom:10 }}>
                      {chatMembers.slice(0,5).map((m,i)=><div key={i} style={{ width:32,height:32,borderRadius:"50%",background:`${m.color}25`,border:`2px solid ${m.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,marginLeft:i>0?-6:0,zIndex:5-i }}>{m.emoji}</div>)}
                    </div>
                    <h2 style={{ margin:0,fontSize:22,fontWeight:800,color:"#fff" }}>Join the <span style={{color:"#58a6ff"}}>Community</span></h2>
                  </div>
                </div>
                <div style={{ padding:"20px 28px 28px",textAlign:"center" }}>
                  <p style={{ fontSize:14,color:"#555",lineHeight:1.6,marginBottom:20 }}>
                    {chatMembers.length}+ mainframe professionals are chatting right now. Share knowledge, find jobs, solve doubts in real-time!
                  </p>
                  <div style={{ display:"flex",gap:10 }}>
                    <button onClick={()=>setWelcomePhase(0)} style={{ flex:1,padding:"12px",borderRadius:12,border:"1.5px solid #e8e8ed",background:"transparent",color:"#666",cursor:"pointer",fontSize:14,fontFamily:FF }}>Later</button>
                    <button onClick={()=>{setWelcomePhase(0);setChatPopup(true);setChatPopPhase(0);}}
                      style={{ flex:1,padding:"12px",borderRadius:12,border:"none",background:"#0071e3",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:FF }}>Join Community</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── COMMUNITY JOIN POPUP ─── */}
      {/* ─── AI KEY SETTINGS MODAL ─── */}

      {/* ─── FEEDBACK MODAL ─── */}
      {feedbackOpen && (
        <div style={{ position:"fixed",inset:0,zIndex:9999,background:"rgba(0,0,0,0.45)",backdropFilter:"blur(10px)",
          display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn 0.3s ease" }}
          onClick={()=>setFeedbackOpen(false)}>
          <div onClick={e=>e.stopPropagation()} className="scaleIn" style={{
            background:"rgba(255,255,255,0.98)",backdropFilter:"blur(20px)",borderRadius:24,
            padding:"36px 32px",maxWidth:440,width:"90%",boxShadow:"0 24px 80px rgba(0,0,0,0.2)",
            border:"1px solid rgba(255,255,255,0.8)" }}>
            {feedbackSent ? (
              <div style={{ textAlign:"center",padding:"20px 0" }}>
                <div style={{ fontSize:56,marginBottom:12 }}>🎉</div>
                <h3 style={{ fontSize:22,fontWeight:800,color:"#1d1d1f",marginBottom:8 }}>Thank You!</h3>
                <p style={{ fontSize:14,color:"#666" }}>Your feedback helps us improve.</p>
              </div>
            ) : (
              <>
                <div style={{ textAlign:"center",marginBottom:20 }}>
                  <div style={{ fontSize:40,marginBottom:8 }}>💬</div>
                  <h3 style={{ fontSize:22,fontWeight:800,color:"#1d1d1f",letterSpacing:"-0.5px",marginBottom:4 }}>How's your experience?</h3>
                  <p style={{ fontSize:13,color:"#666" }}>We'd love your feedback to make MainframeStudyHub even better</p>
                </div>
                {/* Star Rating */}
                <div style={{ display:"flex",justifyContent:"center",gap:8,marginBottom:20 }}>
                  {[1,2,3,4,5].map(s => (
                    <button key={s} onClick={() => setFeedbackForm({...feedbackForm, rating:s})}
                      style={{ background:"none",border:"none",fontSize:32,cursor:"pointer",
                        transform:feedbackForm.rating>=s?"scale(1.15)":"scale(1)",
                        filter:feedbackForm.rating>=s?"none":"grayscale(1) opacity(0.4)",
                        transition:"all 0.15s ease" }}>
                      ⭐
                    </button>
                  ))}
                </div>
                <textarea value={feedbackForm.message} onChange={e => setFeedbackForm({...feedbackForm, message:e.target.value})}
                  aria-label="Feedback message" placeholder="What do you like? What can we improve? Any features you'd love to see?"
                  rows={3} style={{ ...modalInput, resize:"vertical",minHeight:72 }} />
                {!user && (
                  <div style={{ display:"flex",gap:8 }}>
                    <input value={feedbackForm.name} onChange={e => setFeedbackForm({...feedbackForm, name:e.target.value})}
                      aria-label="Your name" placeholder="Name (optional)" style={{ ...modalInput, flex:1 }} />
                    <input value={feedbackForm.email} onChange={e => setFeedbackForm({...feedbackForm, email:e.target.value})}
                      aria-label="Your email" placeholder="Email (optional)" style={{ ...modalInput, flex:1 }} />
                  </div>
                )}
                <div style={{ display:"flex",gap:10 }}>
                  <button onClick={()=>{ setFeedbackOpen(false); localStorage.setItem("mfsh_feedback_done","1"); }}
                    style={{ flex:1,padding:"12px",borderRadius:12,border:"1.5px solid #e8e8ed",background:"transparent",
                      color:"#666",cursor:"pointer",fontSize:14,fontFamily:FF }}>Maybe Later</button>
                  <button onClick={submitFeedback} disabled={feedbackLoading || !feedbackForm.message.trim()}
                    style={{ flex:1,padding:"12px",borderRadius:12,border:"none",
                      background:feedbackForm.message.trim()?"linear-gradient(135deg,#0071e3,#7c3aed)":"#d1d1d6",
                      color:"#fff",fontSize:14,fontWeight:700,cursor:feedbackForm.message.trim()?"pointer":"default",fontFamily:FF }}>
                    {feedbackLoading ? "Sending..." : "Submit Feedback"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {chatPopup && (
        <div style={{ position:"fixed",inset:0,zIndex:2500,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(10px)",display:"flex",alignItems:"center",justifyContent:"center" }} onClick={()=>setChatPopup(false)}>
          <div onClick={e=>e.stopPropagation()} style={{
            width:420,maxWidth:"92vw",background:"#fff",borderRadius:24,overflow:"hidden",
            boxShadow:"0 30px 80px rgba(0,0,0,0.2)",
            transform:chatPopPhase>=1?"scale(1) translateY(0)":"scale(0.85) translateY(30px)",
            opacity:chatPopPhase>=1?1:0,transition:"all 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <div style={{ position:"relative",height:150,background:"linear-gradient(135deg,#0a1628,#0d2040)",overflow:"hidden" }}>
              <CommCanvas style={{ opacity:0.6 }} />
              <div style={{ position:"relative",zIndex:2,padding:"26px 26px 0",textAlign:"center" }}>
                <div style={{ display:"inline-flex",alignItems:"center",gap:6,background:"rgba(0,179,101,0.15)",border:"1px solid rgba(0,179,101,0.3)",borderRadius:20,padding:"4px 12px",marginBottom:10,opacity:chatPopPhase>=2?1:0,transition:"opacity 0.4s ease 0.1s" }}>
                  <span style={{ width:7,height:7,borderRadius:"50%",background:"#00b365",boxShadow:"0 0 6px #00b365" }} />
                  <span style={{ fontSize:12,color:"#00b365",fontWeight:600 }}>{chatOnline} online</span>
                </div>
                <h3 style={{ margin:0,fontSize:20,fontWeight:800,color:"#fff",letterSpacing:"-0.5px",opacity:chatPopPhase>=2?1:0,transform:chatPopPhase>=2?"translateY(0)":"translateY(10px)",transition:"all 0.4s ease 0.2s" }}>
                  MainframeStudyHub <span style={{ color:"#58a6ff" }}>Community</span>
                </h3>
              </div>
            </div>
            <div style={{ padding:"16px 26px 6px",display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",opacity:chatPopPhase>=2?1:0,transition:"opacity 0.4s ease 0.3s" }}>
              {["💬 Chat","💼 Jobs","❓ Doubts","💭 Ideas","📊 Polls"].map((f,i)=>
                <span key={i} style={{ padding:"4px 10px",borderRadius:16,fontSize:11,background:"#f5f5f7",color:"#555",border:"1px solid #e8e8ed" }}>{f}</span>
              )}
            </div>
            <div style={{ padding:"14px 26px",display:"flex",justifyContent:"center",opacity:chatPopPhase>=3?1:0,transition:"opacity 0.4s ease 0.35s" }}>
              {chatMembers.slice(0,6).map((m,i)=><div key={i} style={{ width:32,height:32,borderRadius:"50%",background:`${m.color}15`,border:`2px solid ${m.color}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,marginLeft:i>0?-6:0,zIndex:6-i }}>{m.emoji}</div>)}
              <div style={{ width:32,height:32,borderRadius:"50%",background:"#e8f4fd",border:"2px solid #c0d8ff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#0071e3",fontWeight:700,marginLeft:-6 }}>+{Math.max(0,chatMembers.length-6)}</div>
            </div>
            <div style={{ padding:"0 26px 26px",opacity:chatPopPhase>=3?1:0,transform:chatPopPhase>=3?"translateY(0)":"translateY(10px)",transition:"all 0.4s ease 0.4s" }}>
              <button onClick={() => {setChatPopup(false);setWelcomePhase(0);setAuthModal("signin");setAuthError("");setAuthForm({name:"",email:"",password:"",role:"",itYears:"",mfYears:""});}} style={{ width:"100%",padding:"13px",borderRadius:12,border:"none",background:"#0071e3",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:FF,boxShadow:"0 4px 16px rgba(0,113,227,0.25)" }}>
                Sign In →
              </button>
              <p style={{ fontSize:11,color:"#666",marginTop:8,textAlign:"center" }}>New here? Create a free account</p>
              <button onClick={chatJoin} style={{ width:"100%",padding:"13px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#7c3aed,#0071e3)",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:FF,boxShadow:"0 4px 16px rgba(0,113,227,0.25)" }}>Join Community →</button>
            </div>
          </div>
        </div>
      )}
      {/* FAB Button */}
      <button className="chat-fab" onClick={() => setChatOpen(o => !o)}
        style={{ position:"fixed",bottom:24,right:24,zIndex:3000,width:60,height:60,borderRadius:"50%",border:"none",
          cursor:"pointer",background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",fontSize:26,
          display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 6px 24px rgba(124,58,237,0.35)" }}>
        {chatOpen ? "✕" : "🤖"}
      </button>

      {/* Chat Window */}
      {chatOpen && (
        <div className={chatMax?"":"chat-window"} style={chatMax ? {
          position:"fixed",inset:0,zIndex:3001,background:"rgba(255,255,255,0.99)",backdropFilter:"blur(24px)",
          display:"flex",flexDirection:"column",overflow:"hidden"
        } : { position:"fixed",bottom:96,right:24,zIndex:3000,width:400,maxWidth:"calc(100vw - 32px)",
          height:560,maxHeight:"calc(100vh - 140px)",background:"rgba(255,255,255,0.97)",backdropFilter:"blur(24px)",
          WebkitBackdropFilter:"blur(24px)",borderRadius:24,boxShadow:"0 20px 60px rgba(0,0,0,0.2),0 0 0 1px rgba(0,0,0,0.05)",
          display:"flex",flexDirection:"column",overflow:"hidden" }}>

          {/* Chat Header */}
          <div style={{ padding:chatMax?"16px 24px":"18px 22px",background:"linear-gradient(135deg,#0071e3,#7c3aed)",color:"#fff",flexShrink:0 }}>
            <div style={{ display:"flex",alignItems:"center",gap:12 }}>
              <div style={{ width:38,height:38,borderRadius:12,background:"rgba(255,255,255,0.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22 }}>
                🤖
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:chatMax?18:16,fontWeight:700 }}>MainframeStudyHub AI</div>
                <div style={{ fontSize:11,opacity:0.85 }}>Your mainframe learning companion</div>
              </div>
              <div style={{ display:"flex",gap:6,alignItems:"center" }}>
                <button onClick={() => setChatMax(m => !m)} title={chatMax?"Minimize":"Maximize"}
                  style={{ background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",borderRadius:8,padding:"4px 10px",
                    cursor:"pointer",fontSize:13,fontFamily:FF,fontWeight:600 }}>
                  {chatMax ? "⊖" : "⊕"}
                </button>
                <button onClick={() => { setChatMessages([chatMessages[0]]); }}
                  style={{ background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",borderRadius:8,padding:"4px 10px",
                    cursor:"pointer",fontSize:11,fontFamily:FF,fontWeight:600 }}>
                  Clear
                </button>
                {chatMax && (
                  <button onClick={() => { setChatMax(false); setChatOpen(false); }}
                    style={{ background:"rgba(255,255,255,0.15)",border:"none",color:"#fff",borderRadius:8,padding:"4px 10px",
                      cursor:"pointer",fontSize:13,fontFamily:FF,fontWeight:600 }}>
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div style={{ flex:1,overflowY:"auto",padding:chatMax?"24px 0":"16px 18px",display:"flex",flexDirection:"column",gap:12,
            ...(chatMax?{maxWidth:720,margin:"0 auto",width:"100%",paddingLeft:24,paddingRight:24}:{}) }}>
            {chatMessages.map((msg, i) => (
              <div key={i} className={i>0?"chat-msg-enter":""}
                style={{ display:"flex",gap:10,flexDirection:msg.role==="user"?"row-reverse":"row",
                  animationDelay:`${Math.min(i,3)*80}ms` }}>
                {msg.role==="assistant" && (
                  <div style={{ width:30,height:30,borderRadius:10,background:"linear-gradient(135deg,#0071e3,#7c3aed)",
                    color:"#fff",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>🤖</div>
                )}
                <div style={{ maxWidth:chatMax?"90%":"82%",padding:chatMax?"16px 20px":"12px 16px",borderRadius:msg.role==="user"?"18px 18px 4px 18px":"18px 18px 18px 4px",
                  background:msg.role==="user"?"linear-gradient(135deg,#0071e3,#7c3aed)":"rgba(245,245,247,0.9)",
                  color:msg.role==="user"?"#fff":"#1d1d1f",fontSize:chatMax?15:13.5,lineHeight:1.7,
                  border:msg.role==="user"?"none":"1px solid rgba(0,0,0,0.04)" }}>
                  {renderChatMd(msg.content)}
                </div>
                {msg.role==="user" && user && (
                  <UserAvatar name={user.name} size={30} />
                )}
              </div>
            ))}
            {chatLoading && (
              <div style={{ display:"flex",gap:10 }}>
                <div style={{ width:30,height:30,borderRadius:10,background:"linear-gradient(135deg,#0071e3,#7c3aed)",
                  color:"#fff",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>🤖</div>
                <div style={{ padding:"14px 20px",background:"rgba(245,245,247,0.9)",borderRadius:"18px 18px 18px 4px",
                  display:"flex",gap:6,alignItems:"center",border:"1px solid rgba(0,0,0,0.04)" }}>
                  {[0,1,2].map(j => (
                    <div key={j} style={{ width:8,height:8,borderRadius:"50%",background:"#7c3aed",animation:"dotPulse 1.2s ease infinite",
                      animationDelay:`${j*0.2}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick prompts (shown when few messages) */}
          {chatMessages.length <= 2 && (
            <div style={{ padding:"0 18px 8px",display:"flex",gap:6,flexWrap:"wrap" }}>
              {["What causes S0C7 and how to fix it?","Write JCL to sort a file by column 1-10","Explain CICS pseudo-conversational","DB2 performance tuning tips","COBOL COMP-3 vs COMP","How to debug a production abend","Mainframe career path & salary","What is Zowe?"].map(q => (
                <button key={q} onClick={() => { setChatInput(q); }}
                  style={{ fontSize:11,padding:"5px 10px",borderRadius:980,border:"1px solid rgba(0,0,0,0.08)",
                    background:"rgba(255,255,255,0.8)",color:"#3a3a3c",cursor:"pointer",fontFamily:FF,fontWeight:500,
                    transition:"all 0.15s" }}
                  onMouseOver={e => e.currentTarget.style.background="#eff6ff"}
                  onMouseOut={e => e.currentTarget.style.background="rgba(255,255,255,0.8)"}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input */}
          <div style={{ padding:chatMax?"16px 24px":"12px 16px",borderTop:"1px solid rgba(0,0,0,0.06)",background:"rgba(255,255,255,0.9)",flexShrink:0,
            ...(chatMax?{maxWidth:720,margin:"0 auto",width:"100%"}:{}) }}>
            <div style={{ display:"flex",gap:8 }}>
              <input className="chat-input" value={chatInput} onChange={e => setChatInput(e.target.value)}
                aria-label="Ask about mainframes" placeholder="Ask about mainframes..."
                onKeyDown={e => { if(e.key==="Enter" && !e.shiftKey) { e.preventDefault(); sendChat(); } }}
                style={{ flex:1,padding:chatMax?"14px 18px":"10px 14px",fontSize:chatMax?16:14,border:"1.5px solid rgba(0,0,0,0.08)",borderRadius:14,
                  outline:"none",fontFamily:FF,background:"rgba(245,245,247,0.6)",color:"#1d1d1f",transition:"all 0.2s" }} />
              <button onClick={sendChat} disabled={chatLoading || !chatInput.trim()}
                style={{ width:42,height:42,borderRadius:14,border:"none",cursor:chatInput.trim()?"pointer":"default",
                  background:chatInput.trim()?"linear-gradient(135deg,#0071e3,#7c3aed)":"rgba(245,245,247,0.8)",
                  color:chatInput.trim()?"#fff":"#666",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center",
                  transition:"all 0.2s",flexShrink:0 }}>
                ↑
              </button>
            </div>
            <div style={{ fontSize:10,color:"#b0b0b6",textAlign:"center",marginTop:6 }}>
              AI assistant for mainframe learning · Powered by Claude
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop:"1px solid rgba(0,0,0,0.06)",background:"rgba(255,255,255,0.6)",backdropFilter:"blur(20px)",padding:"28px 0" }}>
        <div style={{ ...S.inner,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12 }}>
          <span style={{ fontSize:12,color:"#666",display:"flex",alignItems:"center",gap:6 }}><img src="/favicon.svg" alt="" style={{ width:16,height:16,borderRadius:3 }} /> MainframeStudyHub Hub — The complete IBM Z knowledge platform. A to Z, Beginner to Professional.</span>
          <div style={{ display:"flex",gap:16,flexWrap:"wrap" }}>
            {[["home","Overview"],["topics","Topics"],["scenarios","Scenarios"],["blog","Blog"],["quiz","Quiz"],["community","Community"],["weekly","Weekly"]].map(([p,l]) => (
              <button key={p} onClick={() => goPage(p)} style={{ background:"none",border:"none",color:"#666",fontSize:12,cursor:"pointer",fontFamily:FF }}>{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ─── STYLES ────────────────────────────────────────────────────────────── */
const modalInput = { width:"100%",padding:"12px 14px",fontSize:14,border:"1.5px solid rgba(0,0,0,0.08)",
  borderRadius:10,outline:"none",fontFamily:FF,background:"rgba(245,245,247,0.8)",marginBottom:12,color:"#1d1d1f",
  transition:"border-color 0.2s" };
const S = {
  root:{ fontFamily:FF,background:"transparent",color:"#1d1d1f",minHeight:"100vh",overflowX:"hidden" },
  nav:{ position:"fixed",top:0,left:0,right:0,zIndex:1000,height:52,transition:"background .3s,box-shadow .3s" },
  navInner:{ maxWidth:1200,margin:"0 auto",padding:"0 24px",height:52,display:"flex",alignItems:"center" },
  navLogo:{ display:"flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",color:"#1d1d1f",fontFamily:FF },
  navLinks:{ display:"flex",gap:0,marginLeft:"auto",overflowX:"auto",overflowY:"hidden",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",msOverflowStyle:"none",maxWidth:"calc(100vw - 200px)",flexShrink:1 },
  navLink:{ background:"none",border:"none",cursor:"pointer",fontSize:13,padding:"6px 11px",borderRadius:6,fontFamily:FF,transition:"color .2s",whiteSpace:"nowrap",flexShrink:0 },
  hamburger:{ display:"flex",flexDirection:"column",background:"none",border:"none",cursor:"pointer",padding:"8px",marginLeft:"auto" },
  drawer:{ position:"fixed",top:0,left:0,right:0,background:"rgba(248,249,252,0.97)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",zIndex:999,padding:"8px 0 24px",boxShadow:"0 8px 30px rgba(0,0,0,0.1)",maxHeight:"90vh",overflowY:"auto" },
  drawerLink:{ display:"block",width:"100%",textAlign:"left",padding:"12px 24px",background:"none",border:"none",fontSize:17,fontWeight:500,cursor:"pointer",fontFamily:FF },
  drawerTopicLink:{ display:"block",width:"100%",textAlign:"left",padding:"9px 24px",background:"none",border:"none",fontSize:14,color:"#1d1d1f",cursor:"pointer",fontFamily:FF },
  hero:{ background:"transparent",padding:"88px 0 56px",textAlign:"center" },
  heroInner:{ maxWidth:720,margin:"0 auto",padding:"0 24px" },
  eyebrow:{ fontSize:13,fontWeight:600,color:"#0071e3",letterSpacing:"1px",textTransform:"uppercase",marginBottom:16 },
  heroTitle:{ fontSize:"clamp(38px,6vw,68px)",fontWeight:800,lineHeight:1.06,letterSpacing:"-2.5px",color:"#1d1d1f",marginBottom:18 },
  heroSub:{ fontSize:"clamp(15px,1.8vw,18px)",color:"#555",lineHeight:1.65,marginBottom:32,fontWeight:400 },
  heroBtns:{ display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap" },
  btnBlue:{ background:"#0071e3",color:"#fff",border:"none",borderRadius:980,padding:"12px 24px",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:FF },
  btnGhost:{ background:"transparent",color:"#0071e3",border:"1.5px solid #0071e3",borderRadius:980,padding:"12px 24px",fontSize:15,fontWeight:600,cursor:"pointer",fontFamily:FF },
  statsRow:{ display:"flex",justifyContent:"center",flexWrap:"wrap",background:"rgba(255,255,255,0.5)",backdropFilter:"blur(12px)",borderRadius:20,margin:"0 24px",border:"1px solid rgba(255,255,255,0.7)",boxShadow:"0 2px 20px rgba(0,0,0,0.04)" },
  statItem:{ flex:"1 1 120px",padding:"28px 16px",textAlign:"center",borderRight:"1px solid rgba(0,0,0,0.04)" },
  statN:{ fontSize:40,fontWeight:800,letterSpacing:"-2px",color:"#1d1d1f",lineHeight:1 },
  statL:{ fontSize:13,color:"#666",marginTop:6 },
  section:{ padding:"72px 0" },
  inner:{ maxWidth:1200,margin:"0 auto",padding:"0 24px" },
  sectionTitle:{ fontSize:"clamp(26px,4vw,44px)",fontWeight:800,letterSpacing:"-1.5px",color:"#1d1d1f",marginBottom:36 },
  topicsGrid:{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(185px,1fr))",gap:14 },
  topicCard:{ background:"rgba(255,255,255,0.75)",borderRadius:16,border:"1px solid rgba(255,255,255,0.7)",padding:"20px 18px",cursor:"pointer",textAlign:"left",boxShadow:"0 2px 16px rgba(0,0,0,0.05)",backdropFilter:"blur(12px)" },
  tcTitle:{ fontSize:16,fontWeight:700,color:"#1d1d1f",marginBottom:4 },
  tcSub:{ fontSize:12,color:"#666",marginBottom:6,lineHeight:1.4 },
  tcMore:{ fontSize:13,fontWeight:600 },
  featureCard:{ background:"rgba(255,255,255,0.75)",border:"1px solid rgba(255,255,255,0.7)",borderRadius:20,padding:"32px 28px",cursor:"pointer",textAlign:"left",boxShadow:"0 4px 20px rgba(0,0,0,0.05)",backdropFilter:"blur(12px)" },
  fcTitle:{ fontSize:20,fontWeight:700,color:"#1d1d1f",marginBottom:10 },
  fcDesc:{ fontSize:14,color:"#555",lineHeight:1.6 },
  pageHero:{ padding:"64px 24px 36px",maxWidth:1200,margin:"0 auto" },
  pageHeroTitle:{ fontSize:"clamp(34px,5vw,60px)",fontWeight:800,letterSpacing:"-2px",color:"#1d1d1f",marginBottom:12 },
  pageHeroSub:{ fontSize:18,color:"#555",fontWeight:400,maxWidth:620 },
  searchInput:{ background:"#f5f5f7",border:"none",borderRadius:8,padding:"8px 12px 8px 32px",fontSize:14,color:"#1d1d1f",outline:"none",fontFamily:FF,width:220 },
  pill:{ border:"none",borderRadius:980,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer",fontFamily:FF,transition:"all .15s" },
  backBtn:{ background:"none",border:"none",color:"#0071e3",cursor:"pointer",fontSize:15,fontFamily:FF,marginBottom:20,padding:0 },
  contentPre:{ fontSize:15.5,color:"#2d2d30",lineHeight:2.05,whiteSpace:"pre-wrap",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif",letterSpacing:"-.15px",wordSpacing:"0.5px" },
  codeWrap:{ borderRadius:14,overflow:"hidden",border:"1.5px solid #e8e8ed",background:"#1c1c1e",marginTop:20 },
  codeTopBar:{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",background:"#2c2c2e" },
  codePre:{ padding:"22px",margin:0,fontSize:13,lineHeight:1.85,overflowX:"auto",fontFamily:MONO },
  prevNextBtn:{ background:"none",border:"1.5px solid #e8e8ed",borderRadius:12,padding:"14px 18px",cursor:"pointer",textAlign:"left",fontFamily:FF,color:"#1d1d1f",flex:"0 0 auto",maxWidth:260 },
  diffBadge:{ fontSize:11,fontWeight:600,padding:"3px 10px",borderRadius:980 },
  blogCard:{ background:"rgba(255,255,255,0.75)",border:"1px solid rgba(255,255,255,0.7)",borderRadius:18,padding:"24px",cursor:"pointer",textAlign:"left",boxShadow:"0 2px 16px rgba(0,0,0,0.05)",backdropFilter:"blur(12px)" },
};
