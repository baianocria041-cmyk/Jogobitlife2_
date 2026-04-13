// --- 1. ESTADO INICIAL DO JOGADOR ---
let p = {
    mes: 0, 
    ano: 0, 
    grana: 50, 
    edu: 0, 
    fans: 0, 
    job: null, 
    path: "", 
    level: -1, 
    nasc: "", 
    preso: false,    
    pena: 0,         
    gangue: "Nenhuma", 
    respeito: 0,
    social: {
        yt: { inscritos: 0, prata: false },
        tt: { seguidores: 0 },
        fb: { amigos: 0 }
    }
};

// --- 2. BANCO DE DADOS (CARREIRAS E CRIMES) ---
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
    medicina: [
        {n: "Faculdade Medicina", sal: -3500, a: 18, f: 0, e: 5},
        {n: "Residente", sal: 5000, a: 24, f: 0, e: 8},
        {n: "Médico Geral", sal: 15000, a: 26, f: 0, e: 10},
        {n: "Especialista", sal: 45000, a: 30, f: 1000, e: 15},
        {n: "Neurocirurgião", sal: 120000, a: 35, f: 5000, e: 20}

            // ÁREA: SAÚDE & BEM-ESTAR
    saude: [
        {n: "Cuidador de Idosos", sal: 1800, a: 18, f: 0, e: 2},
        {n: "Técnico em Enfermagem", sal: 3200, a: 20, f: 0, e: 10},
        {n: "Enfermeiro Padrão", sal: 5500, a: 23, f: 0, e: 25},
        {n: "Fisioterapeuta", sal: 4800, a: 23, f: 200, e: 30},
        {n: "Psicólogo Clínico", sal: 6000, a: 24, f: 1000, e: 40},
        {n: "Médico Geral", sal: 15000, a: 26, f: 0, e: 60},
        {n: "Neurocirurgião", sal: 45000, a: 34, f: 5000, e: 100}
    ],
    // ÁREA: SEGURANÇA & JUSTIÇA
    justica: [
        {n: "Segurança Patrimonial", sal: 2100, a: 21, f: 0, e: 2},
        {n: "Policial Militar", sal: 4500, a: 21, f: 0, e: 10},
        {n: "Investigador Civil", sal: 7000, a: 23, f: 0, e: 25},
        {n: "Advogado Júnior", sal: 4000, a: 23, f: 300, e: 45},
        {n: "Delegado de Polícia", sal: 19000, a: 26, f: 0, e: 80},
        {n: "Promotor de Justiça", sal: 32000, a: 28, f: 0, e: 120},
        {n: "Juiz de Direito", sal: 35000, a: 30, f: 0, e: 150}
    ],
    // ÁREA: TECNOLOGIA & ESCRITÓRIO
    tech: [
        {n: "Auxiliar Administrativo", sal: 1900, a: 18, f: 0, e: 5},
        {n: "Suporte Técnico", sal: 2600, a: 18, f: 0, e: 15},
        {n: "Analista de RH", sal: 4200, a: 22, f: 0, e: 30},
        {n: "Programador Júnior", sal: 5500, a: 20, f: 500, e: 40},
        {n: "Desenvolvedor Pleno", sal: 9000, a: 24, f: 1000, e: 70},
        {n: "Arquiteto de Software", sal: 18000, a: 28, f: 2000, e: 110},
        {n: "Diretor de Tecnologia (CTO)", sal: 35000, a: 35, f: 5000, e: 160}
    ],
    // ÁREA: TRABALHOS OPERACIONAIS & SERVIÇOS
    operacional: [
        {n: "Gari / Coletor", sal: 2200, a: 18, f: 0, e: 0},
        {n: "Frentista", sal: 1900, a: 18, f: 0, e: 0},
        {n: "Operador de Caixa", sal: 1750, a: 18, f: 0, e: 1},
        {n: "Entregador de Aplicativo", sal: 2500, a: 18, f: 0, e: 0},
        {n: "Cozinheiro", sal: 2800, a: 19, f: 0, e: 10},
        {n: "Eletricista Predial", sal: 3500, a: 20, f: 0, e: 15},
        {n: "Mestre de Obras", sal: 6000, a: 30, f: 0, e: 25}
    ],
    // ÁREA: TRANSPORTE & COMUNICAÇÃO
    comunicacao: [
        {n: "Motorista de Ônibus", sal: 3100, a: 25, f: 0, e: 5},
        {n: "Vendedor Interno", sal: 2200, a: 18, f: 0, e: 5},
        {n: "Jornalista Júnior", sal: 3500, a: 22, f: 2000, e: 40},
        {n: "Radialista", sal: 4500, a: 22, f: 5000, e: 30},
        {n: "Piloto de Avião Comercial", sal: 25000, a: 25, f: 1000, e: 90},
        {n: "Gerente de Marketing", sal: 12000, a: 28, f: 10000, e: 70}
    ],
    // ÁREA: EDUCAÇÃO
    educacao: [
        {n: "Monitor de Creche", sal: 1600, a: 18, f: 0, e: 10},
        {n: "Professor Ensino Básico", sal: 4200, a: 23, f: 0, e: 40},
        {n: "Professor Universitário", sal: 11000, a: 28, f: 500, e: 90},
        {n: "Diretor de Escola", sal: 8500, a: 35, f: 0, e: 70},
        {n: "Reitor de Universidade", sal: 22000, a: 45, f: 1000, e: 150}
    
    ],
    abobora: [
        {n: "Pequenos Furtos", ganho: 500, risco: 20},
        {n: "Assalto a Banco", ganho: 50000, risco: 65}
    ]
};

// --- 3. MOTOR DO JOGO (PASSAR MÊS) ---
function passarMes() {
    p.mes++;
    
    // Perda orgânica de seguidores (Realismo)
    if (p.fans > 500) {
        let perda = Math.floor(p.fans * 0.01);
        p.social.yt.inscritos = Math.max(0, p.social.yt.inscritos - Math.floor(perda/2));
        p.social.tt.seguidores = Math.max(0, p.social.tt.seguidores - Math.floor(perda/2));
        p.fans = p.social.yt.inscritos + p.social.tt.seguidores + p.social.fb.amigos;
    }

    if (p.preso) {
        if (p.mes > 11) {
            p.mes = 0; p.ano++; p.pena--; 
            addLog(`⛓️ Mais um ano na tranca. Restam: ${p.pena} anos.`, "orange");
        }
        if (p.pena <= 0) {
            p.preso = false; p.pena = 0;
            flash("🕊️ LIBERDADE!");
            addLog("Você saiu da prisão.");
        }
        update(); return;   
    }

    if (p.mes > 11) { p.mes = 0; p.ano++; flash(`🎂 ${p.ano} ANOS`); }

    // Salário e Fama
    if (p.job) {
        p.grana += (p.job.sal / 12);
        // Risco de demissão por flop (Carreiras de Fama)
        if (p.path === 'futebol' || p.path === 'artista') {
            let req = DB[p.path][p.level].f;
            if (p.fans < req * 0.7 && p.level > 0 && Math.random() > 0.8) {
                addLog("📉 Você foi demitido por estar em baixa!", "var(--danger)");
                p.job = null; p.path = ""; p.level = -1;
            }
        }
    }
    
    update();
}

// --- 4. INTERFACE E MENUS ---
function iniciar() {
    p.nasc = `${Math.floor(Math.random()*28)+1}/${Math.floor(Math.random()*12)+1}/2026`;
    const birthEl = document.getElementById('v-birth');
    if(birthEl) birthEl.innerText = `DNA: ${p.nasc}`;
    addLog("🧬 Bem-vindo ao BitLife Brasil.");
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
    c.innerHTML = ""; modal.style.display = 'flex';
    document.getElementById('m-title').innerText = m.toUpperCase();

    if (p.preso) { renderCadeia(c); return; }

    if(m === 'jobs') {
        c.innerHTML = `
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:20px;">
                <button class="btn-menu sec" style="padding:15px;" onclick="renderSubMenu('comum')">🛠️ Comuns</button>
                <button class="btn-menu acc" style="padding:15px; background:var(--gold); color:#000;" onclick="renderSubMenu('fama')">🌟 Profissional</button>
            </div>
            <div id="sub-job-content"><p style="text-align:center; opacity:0.5;">Escolha uma categoria</p></div>`;
    } else if(m === 'social') { renderSocial(c);
    } else if(m === 'life') { c.innerHTML = `<button class="btn-age" style="background:var(--danger); width:100%" onclick="tentarAbobora()">🎃 TENTAR ABÓBORA</button>`;
    } else if(m === 'edu') { c.innerHTML = `<button class="btn-age acc" style="width:100%" onclick="estudar()">📚 ESTUDAR (+1 INT)</button>`; }
}

function renderSubMenu(tipo) {
    const container = document.getElementById('sub-job-content');
    container.innerHTML = "";

    if (tipo === 'fama') {
        renderJobSection(container, "Atleta ⚽", DB.futebol, 'futebol');
        renderJobSection(container, "Artista 🎭", DB.artista, 'artista');
    } else {
        // Exibe as 6 novas categorias de empregos comuns
        renderJobSection(container, "Saúde 🏥", DB.saude, 'saude');
        renderJobSection(container, "Justiça & Militar ⚖️", DB.justica, 'justica');
        renderJobSection(container, "Tecnologia 💻", DB.tech, 'tech');
        renderJobSection(container, "Serviços & Obras 🛠️", DB.operacional, 'operacional');
        renderJobSection(container, "Transporte & Mídia ✈️", DB.comunicacao, 'comunicacao');
        renderJobSection(container, "Educação 📚", DB.educacao, 'educacao');
    }
}


function renderJobSection(cont, titulo, dados, path) {
    cont.innerHTML += `<h3 style='margin:10px 0; font-size:14px; color:var(--primary)'>${titulo}</h3>`;
    let prox = (p.path === path) ? p.level + 1 : 0;
    let j = dados[prox];
    if (j) {
        let pode = p.ano >= j.a && p.fans >= j.f && p.edu >= j.e;
        cont.innerHTML += `<div class="card" style="flex-direction:column; align-items:flex-start; gap:5px;">
            <div style="width:100%; display:flex; justify-content:space-between;"><b>${j.n}</b> <span>R$ ${j.sal}</span></div>
            <small style="font-size:9px; color:#aaa">Req: ${j.a} anos | ${j.f.toLocaleString()} fãs | ${j.e} edu</small>
            <button class="btn-menu" style="width:100%; background:${pode?'var(--primary)':'#333'}" onclick="${pode?`setJob('${path}',${prox})`:`flash('Bloqueado')`}">CONTRATAR</button>
        </div>`;
    }
}

function renderSocial(cont) {
    cont.innerHTML = `
        <div class="card" style="flex-direction:column; gap:10px;">
            <b>🎥 YOUTUBE: ${p.social.yt.inscritos.toLocaleString()}</b>
            <button class="btn-age" style="background:#ff0000; width:100%" onclick="postarRede('yt')">Gravar Vlog</button>
        </div>
        <div class="card" style="flex-direction:column; gap:10px;">
            <b>🎵 TIKTOK: ${p.social.tt.seguidores.toLocaleString()}</b>
            <button class="btn-age" style="background:#000; width:100%; border:1px solid #ff0050" onclick="postarRede('tt')">Dancinha</button>
        </div>
        <div class="card" style="flex-direction:column; gap:10px;">
            <b>👥 FACEBOOK: ${p.social.fb.amigos.toLocaleString()}</b>
            <button class="btn-age" style="background:#1877f2; width:100%" onclick="postarRede('fb')">Postar</button>
        </div>`;
}

// --- 5. AÇÕES ---
function postarRede(rede) {
    let sorte = Math.random() * 100; let ganho = 0; let msg = ""; let cor = "var(--social)";
    if (rede === 'yt') {
        if (sorte > 92) { ganho = Math.floor(Math.random()*4000); msg = "🔥 VIRAL! +"; }
        else if (sorte > 40) { ganho = Math.floor(Math.random()*300); msg = "🎥 Vídeo: +"; }
        else { ganho = -Math.floor(p.social.yt.inscritos*0.03 + 5); msg = "📉 Flop: -"; cor="var(--danger)"; }
        p.social.yt.inscritos = Math.max(0, p.social.yt.inscritos + ganho);
    } else if (rede === 'tt') {
        if (sorte > 85) { ganho = Math.floor(Math.random()*12000); msg = "🚀 TREND! +"; }
        else { ganho = -Math.floor(p.social.tt.seguidores*0.05 + 10); msg = "❌ Flop: -"; cor="var(--danger)"; }
        p.social.tt.seguidores = Math.max(0, p.social.tt.seguidores + ganho);
    } else {
        ganho = Math.floor(Math.random()*40) - 10; p.social.fb.amigos = Math.max(0, p.social.fb.amigos + ganho);
        msg = ganho >= 0 ? "👥 Amigos: +" : "👥 Unfriend: -";
    }
    p.fans = p.social.yt.inscritos + p.social.tt.seguidores + p.social.fb.amigos;
    addLog(`${msg}${Math.abs(ganho)}`, cor); closeMod();
}

function tentarAbobora() {
    let a = DB.abobora[Math.floor(Math.random()*DB.abobora.length)];
    if(Math.random()*100 > a.risco) { p.grana += a.ganho; flash(`🎃 SUCESSO!`); }
    else { p.preso = true; p.pena = Math.floor(Math.random()*5)+2; p.job = null; flash("🚓 RODOU!"); }
    closeMod();
}

function setJob(path, lvl) { p.path = path; p.level = lvl; p.job = DB[path][lvl]; flash("💼 CONTRATADO!"); closeMod(); }
function estudar() { p.edu++; addLog("🧠 Você estudou."); closeMod(); }
function renderCadeia(cont) { cont.innerHTML = `<div class="card">Pena: ${p.pena} anos</div><button class="btn-age" style="background:#e67e22; width:100%" onclick="p.respeito+=5;closeMod()">🧺 Trabalhar</button><button class="btn-age" style="background:#c0392b; width:100%; margin-top:10px" onclick="if(Math.random()>0.9){p.preso=false;flash('FUGIU!')}else{p.pena+=1;flash('Falhou!')};closeMod()">🏃 Fuga</button>`; }
function flash(t) { const e = document.getElementById('pop-alert'); if(e) { e.innerText = t; e.style.display='block'; setTimeout(()=>e.style.display='none', 2000); } }
function addLog(m, color="white") { const log = document.getElementById('log'); if(log) log.innerHTML += `<div class="log-entry" style="border-left-color:${color}">${m}</div>`; }
function closeMod() { document.getElementById('modal').style.display = 'none'; update(); }

iniciar();
