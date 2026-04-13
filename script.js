// --- 1. ESTADO DO JOGADOR ---
let p = {
    mes: 0, ano: 0, grana: 100, edu: 0, fans: 0, 
    job: null, path: "", level: -1, nasc: "",
    preso: false, pena: 0, gangue: "Nenhuma", respeito: 0,
    social: { yt: { inscritos: 0 }, tt: { seguidores: 0 }, fb: { amigos: 0 } }
};

// --- 2. BANCO DE DADOS COMPLETO (40+ EMPREGOS) ---
const DB = {
    futebol: [
        {n: "Escolinha do Bairro", sal: 0, a: 7, f: 0, e: 0},
        {n: "Base de Clube Grande", sal: 1500, a: 13, f: 5000, e: 0},
        {n: "Reserva Profissional", sal: 8000, a: 17, f: 50000, e: 0},
        {n: "Titular Série A", sal: 120000, a: 19, f: 500000, e: 0},
        {n: "Seleção / Europa", sal: 2500000, a: 21, f: 10000000, e: 0}
    ],
    artista: [
        {n: "Teatro de Rua", sal: 200, a: 10, f: 100, e: 0},
        {n: "Ator de Comercial", sal: 3000, a: 16, f: 10000, e: 1},
        {n: "Elenco de Apoio", sal: 12000, a: 18, f: 200000, e: 2},
        {n: "Protagonista", sal: 90000, a: 22, f: 2000000, e: 5},
        {n: "Estrela Global", sal: 5000000, a: 25, f: 50000000, e: 10}
    ],
    saude: [
        {n: "Cuidador", sal: 1800, a: 18, f: 0, e: 2},
        {n: "Técnico Enfermagem", sal: 3200, a: 20, f: 0, e: 10},
        {n: "Enfermeiro", sal: 5500, a: 23, f: 0, e: 25},
        {n: "Fisioterapeuta", sal: 4800, a: 23, f: 200, e: 30},
        {n: "Psicólogo", sal: 6000, a: 24, f: 1000, e: 40},
        {n: "Médico Geral", sal: 15000, a: 26, f: 0, e: 60},
        {n: "Neurocirurgião", sal: 45000, a: 34, f: 5000, e: 100}
    ],
    justica: [
        {n: "Segurança", sal: 2100, a: 21, f: 0, e: 2},
        {n: "Policial Militar", sal: 4500, a: 21, f: 0, e: 10},
        {n: "Investigador", sal: 7000, a: 23, f: 0, e: 25},
        {n: "Advogado Jr", sal: 4000, a: 23, f: 300, e: 45},
        {n: "Delegado", sal: 19000, a: 26, f: 0, e: 80},
        {n: "Promotor", sal: 32000, a: 28, f: 0, e: 120},
        {n: "Juiz de Direito", sal: 35000, a: 30, f: 0, e: 150}
    ],
    tech: [
        {n: "Auxiliar Adm", sal: 1900, a: 18, f: 0, e: 5},
        {n: "Suporte Técnico", sal: 2600, a: 18, f: 0, e: 15},
        {n: "Analista RH", sal: 4200, a: 22, f: 0, e: 30},
        {n: "Programador Jr", sal: 5500, a: 20, f: 500, e: 40},
        {n: "Dev Pleno", sal: 9000, a: 24, f: 1000, e: 70},
        {n: "Arquiteto Software", sal: 18000, a: 28, f: 2000, e: 110},
        {n: "Diretor CTO", sal: 35000, a: 35, f: 5000, e: 160}
    ],
    operacional: [
        {n: "Gari", sal: 2200, a: 18, f: 0, e: 0},
        {n: "Frentista", sal: 1900, a: 18, f: 0, e: 0},
        {n: "Caixa", sal: 1750, a: 18, f: 0, e: 1},
        {n: "Entregador", sal: 2500, a: 18, f: 0, e: 0},
        {n: "Cozinheiro", sal: 2800, a: 19, f: 0, e: 10},
        {n: "Eletricista", sal: 3500, a: 20, f: 0, e: 15},
        {n: "Mestre Obras", sal: 6000, a: 30, f: 0, e: 25}
    ],
    comunicacao: [
        {n: "Motorista Ônibus", sal: 3100, a: 25, f: 0, e: 5},
        {n: "Vendedor", sal: 2200, a: 18, f: 0, e: 5},
        {n: "Jornalista Jr", sal: 3500, a: 22, f: 2000, e: 40},
        {n: "Radialista", sal: 4500, a: 22, f: 5000, e: 30},
        {n: "Piloto Comercial", sal: 25000, a: 25, f: 1000, e: 90},
        {n: "Gerente MKT", sal: 12000, a: 28, f: 10000, e: 70}
    ],
    educacao: [
        {n: "Monitor Creche", sal: 1600, a: 18, f: 0, e: 10},
        {n: "Professor Básico", sal: 4200, a: 23, f: 0, e: 40},
        {n: "Prof Universitário", sal: 11000, a: 28, f: 500, e: 90},
        {n: "Diretor Escola", sal: 8500, a: 35, f: 0, e: 70},
        {n: "Reitor", sal: 22000, a: 45, f: 1000, e: 150}
    ],
    abobora: [
        {n: "Furtar Carteira", ganho: 300, risco: 15},
        {n: "Assalto Mercadinho", ganho: 2500, risco: 40},
        {n: "Invasão de Mansão", ganho: 15000, risco: 60},
        {n: "Assalto a Banco", ganho: 80000, risco: 85}
    ]
};

// --- 3. MOTOR DO JOGO ---
function passarMes() {
    p.mes++;
    if (p.mes > 11) { p.mes = 0; p.ano++; flash(`🎂 ${p.ano} ANOS`); }

    // Perda de seguidores mensal
    if (p.fans > 500) {
        let perda = Math.floor(p.fans * 0.01);
        p.social.yt.inscritos = Math.max(0, p.social.yt.inscritos - Math.floor(perda/2));
        p.social.tt.seguidores = Math.max(0, p.social.tt.seguidores - Math.floor(perda/2));
        p.fans = p.social.yt.inscritos + p.social.tt.seguidores + p.social.fb.amigos;
    }

    if (p.preso) {
        if (p.mes === 0) { 
            p.pena--; 
            addLog(`⛓️ Pena: ${p.pena} anos restantes.`, "orange");
        }
        if (p.pena <= 0) {
            p.preso = false; flash("🕊️ LIBERDADE!");
            addLog("Você saiu da detenção.");
        }
    } else {
        if (p.job) p.grana += (p.job.sal / 12);
    }
    update();
}

function update() {
    document.getElementById('v-money').innerText = "R$ " + Math.floor(p.grana).toLocaleString();
    document.getElementById('v-edu').innerText = p.edu;
    document.getElementById('v-fans').innerText = p.fans >= 1000000 ? (p.fans/1000000).toFixed(1) + "M" : p.fans.toLocaleString();
    document.getElementById('v-date').innerText = `${p.mes}M, ${p.ano}A`;
    document.getElementById('v-job').innerText = p.job ? p.job.n : (p.preso ? "Detento" : "Sem Ocupação");
}

// --- 4. MENUS ---
function abrir(m) {
    const c = document.getElementById('m-content');
    const modal = document.getElementById('modal');
    c.innerHTML = ""; modal.style.display = 'flex';
    document.getElementById('m-title').innerText = m.toUpperCase();

    if (p.preso) { renderCadeia(c); return; }

    if (m === 'jobs') {
        c.innerHTML = `
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:15px;">
                <button class="btn-menu sec" onclick="renderSubMenu('comum')">🛠️ COMUNS</button>
                <button class="btn-menu acc" style="background:var(--gold); color:#000" onclick="renderSubMenu('fama')">🌟 CARREIRAS</button>
            </div>
            <div id="sub-job-content"></div>`;
    } else if (m === 'social') { renderSocial(c); }
    else if (m === 'edu') { c.innerHTML = `<button class="btn-age acc" onclick="p.edu++; addLog('🧠 Estudou.'); closeMod()">📚 ESTUDAR</button>`; }
    else if (m === 'life') { c.innerHTML = `<button class="btn-age dan" onclick="tentarAbobora()">🎃 CRIME (ABÓBORA)</button>`; }
}

function renderSubMenu(tipo) {
    const cont = document.getElementById('sub-job-content');
    cont.innerHTML = "";
    if (tipo === 'fama') {
        renderJobSection(cont, "Futebol ⚽", DB.futebol, 'futebol');
        renderJobSection(cont, "Artista 🎭", DB.artista, 'artista');
    } else {
        ["saude", "justica", "tech", "operacional", "comunicacao", "educacao"].forEach(cat => {
            renderJobSection(cont, cat.toUpperCase(), DB[cat], cat);
        });
    }
}

function renderJobSection(cont, titulo, dados, path) {
    cont.innerHTML += `<h3 style='margin:10px 0; font-size:12px; color:var(--primary)'>${titulo}</h3>`;
    let prox = (p.path === path) ? p.level + 1 : 0;
    let j = dados[prox];
    if (j) {
        let pode = p.ano >= j.a && p.fans >= j.f && p.edu >= j.e;
        cont.innerHTML += `<div class="card" style="flex-direction:column; align-items:flex-start; font-size:12px;">
            <b>${j.n}</b> <small>Salário: R$ ${j.sal}</small>
            <button class="btn-menu" style="width:100%; margin-top:5px; background:${pode?'var(--primary)':'#333'}" onclick="${pode?`setJob('${path}',${prox})`:`flash('Bloqueado')`}">CONTRATAR</button>
        </div>`;
    }
}

function renderSocial(cont) {
    cont.innerHTML = `
        <div class="card" style="flex-direction:column; gap:5px;">
            <b>YouTube: ${p.social.yt.inscritos}</b>
            <button class="btn-age" style="background:#ff0000" onclick="postarRede('yt')">Vlog</button>
        </div>
        <div class="card" style="flex-direction:column; gap:5px;">
            <b>TikTok: ${p.social.tt.seguidores}</b>
            <button class="btn-age" style="background:#000" onclick="postarRede('tt')">Dancinha</button>
        </div>`;
}

// --- 5. AÇÕES ---
function postarRede(rede) {
    let sorte = Math.random() * 100; let ganho = 0;
    if (rede === 'yt') {
        if (sorte > 90) ganho = Math.floor(Math.random()*5000);
        else if (sorte < 30) ganho = -Math.floor(p.social.yt.inscritos * 0.05 + 5);
        else ganho = Math.floor(Math.random()*200);
        p.social.yt.inscritos = Math.max(0, p.social.yt.inscritos + ganho);
    } else {
        if (sorte > 80) ganho = Math.floor(Math.random()*10000);
        else ganho = -Math.floor(p.social.tt.seguidores * 0.08 + 10);
        p.social.tt.seguidores = Math.max(0, p.social.tt.seguidores + ganho);
    }
    p.fans = p.social.yt.inscritos + p.social.tt.seguidores;
    addLog(`📱 Social: ${ganho >= 0 ? '+' : ''}${ganho}`, ganho >= 0 ? "var(--social)" : "var(--danger)");
    closeMod();
}

function tentarAbobora() {
    let a = DB.abobora[Math.floor(Math.random()*DB.abobora.length)];
    if(Math.random()*100 > a.risco) { p.grana += a.ganho; flash("💰 SUCESSO!"); }
    else { p.preso = true; p.pena = Math.floor(Math.random()*5)+2; p.job = null; flash("🚓 RODOU!"); }
    closeMod();
}

function setJob(path, lvl) { p.path = path; p.level = lvl; p.job = DB[path][lvl]; flash("💼 CONTRATADO!"); closeMod(); }
function flash(t) { const e = document.getElementById('pop-alert'); e.innerText = t; e.style.display='block'; setTimeout(()=>e.style.display='none', 2000); }
function addLog(m, color="white") { const log = document.getElementById('log'); log.innerHTML += `<div class="log-entry" style="border-left-color:${color}">${m}</div>`; }
function closeMod() { document.getElementById('modal').style.display = 'none'; update(); }
function renderCadeia(cont) { cont.innerHTML = `<div class="card">Pena: ${p.pena} anos</div><button class="btn-age dan" onclick="if(Math.random()>0.9){p.preso=false;flash('FUGIU!')}else{p.pena++;flash('Pena aumentada!')};closeMod()">🏃 TENTAR FUGA</button>`; }

// INICIAR
p.nasc = "13/04/2026";
update();
