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

let p = {
    mes: 0, ano: 0, grana: 50, edu: 0, fans: 0, 
    job: null, path: "", level: -1, 
    nasc: "", relacao: null
};

// Funções de Inicialização
function iniciar() {
    p.nasc = `${Math.floor(Math.random()*28)+1}/${Math.floor(Math.random()*12)+1}/2026`;
    document.getElementById('v-birth').innerText = `DNA REGISTRADO: ${p.nasc}`;
    addLog("🧬 Bem-vindo ao mundo.");
    update();
}

function update() {
    document.getElementById('v-money').innerText = "R$ " + Math.floor(p.grana).toLocaleString();
    document.getElementById('v-edu').innerText = p.edu;
    document.getElementById('v-fans').innerText = p.fans >= 1000000 ? (p.fans/1000000).toFixed(1) + "M" : p.fans.toLocaleString();
    document.getElementById('v-date').innerText = `${p.mes}M, ${p.ano}A`;
    document.getElementById('v-job').innerText = p.job ? p.job.n : "Sem Ocupação";
}

function passarMes() {
    p.mes++;
    if(p.mes > 11) { p.mes = 0; p.ano++; flash(`🎂 ${p.ano} ANOS`); }
    if(p.job) p.grana += (p.job.sal / 12);
    if(p.fans > 100000) p.grana += (p.fans * 0.002);
    update();
}

function passarMes() {
if(p.preso) {
    if(p.mes === 0) { // Uma vez por ano na cadeia
        p.pena--;
        if(p.pena <= 0) {
            p.preso = false;
            flash("🕊️ LIBERDADE! Sua pena acabou.");
            addLog("Você saiu da detenção. Vida nova?");
        }
    }
    update();
    return; // Impede que ganhe salário ou faça outras coisas
}

}

// Funções de Menu
function abrir(m) {
    const c = document.getElementById('m-content');
    c.innerHTML = ""; document.getElementById('modal').style.display = 'flex';
    document.getElementById('m-title').innerText = m.toUpperCase();

    if(m === 'jobs') {
        renderJobSection(c, "Futebol ⚽", DB.futebol, 'futebol');
        renderJobSection(c, "Medicina 🏥", DB.medicina, 'medicina');
    } else if(m === 'life') {
        c.innerHTML = `<button class="btn-age dan" onclick="tentarAbobora()">🎃 TENTAR ABÓBORA</button>`;
    } else if(m === 'social') {
        c.innerHTML = `<button class="btn-age soc" onclick="postar()">📸 POSTAR VIRAL</button>`;
    } else if(m === 'edu') {
        c.innerHTML = `<button class="btn-age acc" onclick="estudar()">📚 ESTUDAR (+1 INT)</button>`;
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
        p.respeito += 5;
    } else {
        p.preso = true;
        p.pena = Math.floor(Math.random() * 5) + 2; // Pena de 2 a 7 anos
        p.job = null;
        flash("🚓 RODOU! Você foi levado para a Detenção.");
        addLog(`⚖️ Sentença: ${p.pena} anos de reclusão.`, "var(--danger)");
    }
    closeMod();

    function menuCadeia() {
    const c = document.getElementById('m-content');
    document.getElementById('m-title').innerText = "DETENÇÃO";
    c.innerHTML = `
        <div class="card"><b>Respeito:</b> ${p.respeito} | <b>Gangue:</b> ${p.gangue}</div>
        <button class="btn-age btn-presidio" onclick="entrarGangue()">🤝 Juntar-se a uma Gangue</button>
        <button class="btn-age btn-presidio" onclick="tentarFuga()">🏃 Tentar Fuga Desesperada</button>
        <button class="btn-age btn-presidio" onclick="trabalharLavanderia()">🧺 Trabalhar na Lavanderia</button>
    `;
}

function entrarGangue() {
    if(p.respeito > 20) {
        p.gangue = "Caveiras do Pátio";
        flash("💀 Você agora faz parte de uma gangue!");
    } else {
        flash("❌ Você é muito 'peixe novo'. Ganhe respeito primeiro.");
    }
    closeMod();
}

function tentarFuga() {
    let chance = p.gangue !== "Nenhuma" ? 30 : 10;
    if(Math.random()*100 < chance) {
        p.preso = false;
        p.pena = 0;
        flash("🔓 FUGA COM SUCESSO! Você está foragido.");
        addLog("🏃 Você escapou da cadeia pelo túnel!");
    } else {
        p.pena += 2;
        flash("👮 Capturado! Sua pena aumentou em 2 anos.");
    }
    closeMod();
}

function trabalharLavanderia() {
    p.respeito += 2;
    addLog("🧺 Você trabalhou e ganhou respeito entre os detentos.");
    closeMod();

    function abrir(m) {
    if(p.preso) {
        menuCadeia();
        document.getElementById('modal').style.display = 'flex';
        return;
    }
    // ... resto do seu código original da função abrir()



}

function estudar() { p.edu++; addLog("🧠 Estudaste."); closeMod(); }
function postar() { let g = Math.floor(Math.random()*5000); p.fans += g; flash(`📱 +${g} FÃS`); closeMod(); }
function flash(t) { const e = document.getElementById('pop-alert'); e.innerText = t; e.style.display = 'block'; setTimeout(()=>e.style.display='none', 2000); }
function addLog(m) { document.getElementById('log').innerHTML += `<div class="log-entry">${m}</div>`; }
function closeMod() { document.getElementById('modal').style.display = 'none'; update(); }

iniciar();
