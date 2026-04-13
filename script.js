// --- ESTADO INICIAL DO JOGADOR ---
let p = {
    mes: 0, 
    ano: 0, 
    grana: 50, 
    edu: 0, 
let p = {
social: {
    yt: { inscritos: 0, videos: 0, prata: false },
    tt: { seguidores: 0, dancinhas: 0 },
    fb: { amigos: 0, posts: 0 }
},
fans: 0, // Total geral de fama

    job: null, 
    path: "", 
    level: -1, 
    nasc: "", 
    relacao: null,
    preso: false,    
    pena: 0,         
    gangue: "Nenhuma", 
    respeito: 0      
};

// --- BANCO DE DADOS ---
const DB = {
    futebol: [
        {n: "Escolinha do Bairro", sal: 0, a: 7, f: 0, e: 0},
        {n: "Base do Clube", sal: 1200, a: 13, f: 1000, e: 0},
        {n: "Profissional", sal: 8000, a: 17, f: 20000, e: 0},
        {n: "Craque da Série A", sal: 95000, a: 19, f: 250000, e: 0}
    ],
    medicina: [
        {n: "Faculdade Medicina", sal: -3500, a: 18, f: 0, e: 5},
        {n: "Neurocirurgião", sal: 120000, a: 30, f: 0, e: 20}
    ],
    abobora: [
        {n: "Pequenos Furtos", ganho: 500, risco: 20},
        {n: "Assalto a Banco", ganho: 50000, risco: 60}
    ]
};

// --- MOTOR DO JOGO (PASSAR MÊS) ---
function passarMes() {
    // Lógica se estiver preso
    if (p.preso) {
        p.mes++;
        if (p.mes > 11) {
            p.mes = 0;
            p.ano++;
            p.pena--; 
            addLog(`⛓️ Mais um ano na tranca. Restam: ${p.pena} anos.`, "orange");
        }

        if (p.pena <= 0) {
            p.preso = false;
            p.pena = 0;
            flash("🕊️ LIBERDADE!");
            addLog("Você pagou sua dívida e saiu da prisão.", "var(--primary)");
        }
        update(); 
        return;   
    }

    // Lógica normal
    p.mes++;
    if (p.mes > 11) {
        p.mes = 0;
        p.ano++;
        flash(`🎂 ${p.ano} ANOS`);
    }

    // Ganhos
    if (p.job) {
        p.grana += (p.job.sal / 12);
    }
    if (p.fans > 100000) {
        p.grana += (p.fans * 0.002);
    }

    update();
}

// --- FUNÇÕES DE INTERFACE ---
function iniciar() {
    p.nasc = `${Math.floor(Math.random()*28)+1}/${Math.floor(Math.random()*12)+1}/2026`;
    const birthEl = document.getElementById('v-birth');
    if(birthEl) birthEl.innerText = `DNA REGISTRADO: ${p.nasc}`;
    addLog("🧬 Bem-vindo ao mundo.");
    update();
}

function update() {
    document.getElementById('v-money').innerText = "R$ " + Math.floor(p.grana).toLocaleString();
    document.getElementById('v-edu').innerText = p.edu;
    document.getElementById('v-fans').innerText = p.fans >= 1000000 ? (p.fans/1000000).toFixed(1) + "M" : p.fans.toLocaleString();
    document.getElementById('v-date').innerText = `${p.mes}M, ${p.ano}A`;
    document.getElementById('v-job').innerText = p.job ? p.job.n : (p.preso ? "Detento" : "Sem Ocupação");
}

function abrir(m) {
    const modal = document.getElementById('modal');
    const c = document.getElementById('m-content');
    if(!modal || !c) return;

    c.innerHTML = ""; 
    modal.style.display = 'flex';
    document.getElementById('m-title').innerText = m.toUpperCase();

    if (p.preso) {
        renderCadeia(c);
        return;
    }

    if(m === 'jobs') {
        renderJobSection(c, "Futebol ⚽", DB.futebol, 'futebol');
        renderJobSection(c, "Medicina 🏥", DB.medicina, 'medicina');
    } else if(m === 'life') {
        c.innerHTML = `<button class="btn-age dan" style="background:var(--danger); width:100%" onclick="tentarAbobora()">🎃 TENTAR ABÓBORA</button>`;
        } else if(m === 'social') {
        c.innerHTML = `
            <div class="card" style="flex-direction:column; align-items:flex-start; gap:10px;">
                <b style="color:#ff0000">🎥 YOUTUBE</b>
                <p style="font-size:11px">Inscritos: ${p.social.yt.inscritos.toLocaleString()}</p>
                <button class="btn-menu soc" style="width:100%; padding:10px;" onclick="postarRede('yt')">Gravar Vlog</button>
            </div>
            
            <div class="card" style="flex-direction:column; align-items:flex-start; gap:10px;">
                <b style="color:#00f2ea">🎵 TIKTOK</b>
                <p style="font-size:11px">Seguidores: ${p.social.tt.seguidores.toLocaleString()}</p>
                <button class="btn-menu soc" style="width:100%; padding:10px; background:#000; border:1px solid #ff0050" onclick="postarRede('tt')">Fazer Dancinha</button>
            </div>

            <div class="card" style="flex-direction:column; align-items:flex-start; gap:10px;">
                <b style="color:#1877f2">👥 FACEBOOK</b>
                <p style="font-size:11px">Amigos: ${p.social.fb.amigos.toLocaleString()}</p>
                <button class="btn-menu sec" style="width:100%; padding:10px;" onclick="postarRede('fb')">Atualizar Status</button>
            </div>
            
        `;
    } else if(m === 'edu') {
        c.innerHTML = `<button class="btn-age acc" style="background:var(--accent); width:100%" onclick="estudar()">📚 ESTUDAR (+1 INT)</button>`;
    }
}

function renderJobSection(cont, titulo, dados, path) {
    cont.innerHTML += `<h3 style='margin:10px 0'>${titulo}</h3>`;
    let proxNivel = (p.path === path) ? p.level + 1 : 0;
    let j = dados[proxNivel];
    if(j) {
        let ok = (p.ano >= j.a && p.fans >= j.f && p.edu >= j.e);
        cont.innerHTML += `<div class="card">
            <div><b>${j.n}</b><br><small>R$ ${j.sal}/mês</small></div>
            <button style="background:${ok?'var(--primary)':'#444'}; padding:10px" onclick="setJob('${path}', ${proxNivel})">CONTRATAR</button>
        </div>`;
    }
}

function renderCadeia(cont) {
    document.getElementById('m-title').innerText = "DETENÇÃO";
    cont.innerHTML = `
        <div class="card"><b>Pena restante:</b> ${p.pena} anos</div>
        <button class="btn-age" style="background:#e67e22; width:100%" onclick="trabalharCadeia()">🧺 Trabalhar na Lavanderia</button>
        <button class="btn-age" style="background:#c0392b; width:100%; margin-top:10px" onclick="tentarFuga()">🏃 Tentar Fuga</button>
    `;
}

// --- AÇÕES DO JOGADOR ---
function setJob(path, lvl) {
    let j = DB[path][lvl];
    p.path = path; p.level = lvl; p.job = j;
    flash("💼 NOVO CARGO"); closeMod();
}

function tentarAbobora() {
    let a = DB.abobora[Math.floor(Math.random()*DB.abobora.length)];
    if(Math.random()*100 > a.risco) {
        p.grana += a.ganho; 
        flash(`🎃 SUCESSO: +R$ ${a.ganho}`);
    } else {
        p.preso = true;
        p.pena = Math.floor(Math.random()*5)+2;
        p.job = null;
        flash("🚓 RODOU!");
    }
    closeMod();
}

function trabalharCadeia() { p.respeito += 5; addLog("🧺 Você ganhou respeito no pátio."); closeMod(); }
function tentarFuga() { 
    if(Math.random() > 0.9) { p.preso = false; flash("🔓 FUGIU!"); } 
    else { p.pena += 1; flash("👮 Capturado!"); }
    closeMod();
}

function estudar() { p.edu++; addLog("🧠 Você estudou."); closeMod(); }
function postar() { let g = Math.floor(Math.random()*5000); p.fans += g; flash(`📱 +${g} FÃS`); closeMod(); }
function flash(t) { const e = document.getElementById('pop-alert'); if(e) { e.innerText = t; e.style.display = 'block'; setTimeout(()=>e.style.display='none', 2000); } }
function addLog(m, color="white") { const log = document.getElementById('log'); if(log) log.innerHTML += `<div class="log-entry" style="border-left-color:${color}">${m}</div>`; }
function closeMod() { document.getElementById('modal').style.display = 'none'; update(); }
function postarRede(rede) {
    let ganho = 0;
    let msg = "";

    if (rede === 'yt') {
        ganho = Math.floor(Math.random() * 2000) + 100;
        p.social.yt.inscritos += ganho;
        p.social.yt.videos++;
        msg = `🎥 Vídeo novo! +${ganho} inscritos.`;
        if(p.social.yt.inscritos > 100000 && !p.social.yt.prata) {
            p.social.yt.prata = true;
            flash("🥈 PLACA DE PRATA RECEBIDA!");
        }
    } else if (rede === 'tt') {
        ganho = Math.floor(Math.random() * 8000); // TikTok viraliza mais fácil
        p.social.tt.seguidores += ganho;
        msg = `🎵 Sua dancinha viralizou! +${ganho} seguidores.`;
    } else if (rede === 'fb') {
        ganho = Math.floor(Math.random() * 50);
        p.social.fb.amigos += ganho;
        msg = `👥 Post compartilhado! +${ganho} amigos.`;
    }

    p.fans += ganho; // Soma ao total de fama do jogo
    addLog(msg, "var(--social)");
    closeMod();
    
}

// Inicializa o jogo
iniciar();
