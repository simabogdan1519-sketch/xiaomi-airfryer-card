/**
 * Xiaomi Air Fryer – Custom Lovelace Card
 *
 * Instalare HACS:
 *   type: custom:xiaomi-airfryer-card
 *   device: careli_maf10a_1c99
 */

class XiaomiAirFryerCard extends HTMLElement {

  setConfig(config) {
    if (!config.device) throw new Error('Specifică "device: <prefix_entitate>" ex: careli_maf10a_1c99');
    this._config = config;
    this._device = config.device;
    this._panelOpen = false;
    this._built = false;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._built) {
      this._build();
      this._built = true;
    }
    this._update();
  }

  getCardSize() { return 6; }

  // ── Entity ID helpers – cu domain explicit ──────────────────
  _s(suffix)   { return this._hass?.states[`sensor.${this._device}_${suffix}`]?.state  ?? 'unavailable'; }
  _n(suffix)   { return this._hass?.states[`number.${this._device}_${suffix}`]?.state  ?? 'unavailable'; }
  _sel(suffix) { return this._hass?.states[`select.${this._device}_${suffix}`]?.state  ?? 'unavailable'; }
  _sw(suffix)  { return this._hass?.states[`switch.${this._device}_${suffix}`]?.state  ?? 'unavailable'; }

  _pressButton(suffix) {
    this._hass.callService('button', 'press', { entity_id: `button.${this._device}_${suffix}` });
  }
  _setNumber(suffix, value) {
    this._hass.callService('number', 'set_value', { entity_id: `number.${this._device}_${suffix}`, value });
  }
  _selectOption(suffix, option) {
    this._hass.callService('select', 'select_option', { entity_id: `select.${this._device}_${suffix}`, option });
  }
  _toggleSwitch(suffix) {
    this._hass.callService('homeassistant', 'toggle', { entity_id: `switch.${this._device}_${suffix}` });
  }

  // ── Update din starea HA ────────────────────────────────────
  _update() {
    if (!this._hass || !this._built) return;

    const status  = this._s('air_fryer');
    const left    = this._s('left_time');
    const temp    = this._n('target_temperature');
    const time    = this._n('target_time');
    const weight  = this._n('cooking_weight');
    const mode    = this._sel('mode');
    const texture = this._sel('texture');
    const measure = this._sel('target_cooking_measure');
    const turnPot = this._sel('turn_pot');
    const preheat = this._sw('preheat');
    const autoWrm = this._sw('auto_keep_warm');
    const curWrm  = this._sw('current_keep_warm');
    const turnCfg = this._sw('turn_pot_config');

    const totalMin = parseFloat(time)   || 20;
    const leftMin  = parseFloat(left)   || 0;
    const pct      = totalMin > 0 ? Math.round(((totalMin - leftMin) / totalMin) * 100) : 0;
    const isActive = ['cooking','preheat','keep_warm'].includes(status?.toLowerCase?.());

    // status badge
    this._q('#statusText').textContent = this._statusLabel(status);
    this._q('#statusBadge').className  = 'status-badge ' + (isActive ? 'active' : 'idle');

    // LCD + stats
    if (temp !== 'unavailable') {
      this._q('#lcdTemp').textContent   = temp + '°C';
      this._q('#statTemp').textContent  = temp + '°';
      this._q('#tempVal').innerHTML     = temp + ' <small>°C</small>';
    }
    if (left !== 'unavailable') {
      this._q('#lcdTime').textContent   = leftMin + ' min';
      this._q('#statLeft').textContent  = leftMin;
      this._q('#progLabel').textContent = `⏱ ${leftMin} min rămași`;
      this._q('#progFill').style.width  = pct + '%';
    }
    if (time !== 'unavailable') {
      this._q('#timeVal').innerHTML = time + ' <small>min</small>';
    }
    if (weight !== 'unavailable') {
      this._q('#statWeight').textContent = weight + 'g';
      this._q('#weightVal').innerHTML    = weight + ' <small>g</small>';
    }

    // LED activ
    this._q('#led2').classList.toggle('on', isActive);

    // Mode chips
    this._all('.chip[data-group="mode"]').forEach(c =>
      c.classList.toggle('active', c.dataset.val === mode)
    );
    // Texture
    this._all('.seg-btn[data-group="texture"]').forEach(b =>
      b.classList.toggle('active', b.dataset.val === texture)
    );
    // Measure
    this._all('.seg-btn[data-group="measure"]').forEach(b =>
      b.classList.toggle('active', b.dataset.val === measure)
    );
    // Turn pot
    this._all('.seg-btn[data-group="turnpot"]').forEach(b =>
      b.classList.toggle('active', b.dataset.val === turnPot)
    );

    // Toggles
    this._tog('#togglePreheat', preheat === 'on');
    this._tog('#toggleAutoWrm', autoWrm === 'on');
    this._tog('#toggleCurWrm',  curWrm  === 'on');
    this._tog('#toggleTurnCfg', turnCfg === 'on');
  }

  _statusLabel(s) {
    const map = {
      'idle':       '⏸ Standby',
      'cooking':    '🔥 Gătire',
      'pause':      '⏸ Pauză',
      'preheat':    '🌡 Preîncălzire',
      'keep_warm':  '♨️ Keep Warm',
      'appointment':'⏰ Programat',
      'fault':      '⚠️ Eroare',
      'unavailable':'● Offline',
    };
    return map[s?.toLowerCase?.()] ?? map[s] ?? s ?? '—';
  }

  _q(sel)   { return this.shadowRoot.querySelector(sel); }
  _all(sel) { return [...this.shadowRoot.querySelectorAll(sel)]; }
  _tog(sel, on) { this._q(sel)?.classList.toggle('on', on); }

  // ── Build DOM ───────────────────────────────────────────────
  _build() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${this._css()}</style>${this._html()}`;
    this._attachEvents();
    this._buildMesh();
    this._buildHeatWaves();
  }

  _attachEvents() {
    this._q('#modelClick').addEventListener('click', () => this._togglePanel());
    this._q('#overlay').addEventListener('click',    () => this._closePanel());
    this._q('#panelHandle').addEventListener('click',() => this._closePanel());

    this._q('#btnStart').addEventListener('click',  () => this._pressButton('start_cook'));
    this._q('#btnPause').addEventListener('click',  () => this._pressButton('pause'));
    this._q('#btnResume').addEventListener('click', () => this._pressButton('resume_cook'));
    this._q('#btnStop').addEventListener('click',   () => this._pressButton('cancel_cooking'));

    this._q('#tempMinus').addEventListener('click', () => this._setNumber('target_temperature', Math.max(40,  parseFloat(this._n('target_temperature')) - 5)));
    this._q('#tempPlus').addEventListener('click',  () => this._setNumber('target_temperature', Math.min(230, parseFloat(this._n('target_temperature')) + 5)));
    this._q('#timeMinus').addEventListener('click', () => this._setNumber('target_time',        Math.max(1,   parseFloat(this._n('target_time')) - 5)));
    this._q('#timePlus').addEventListener('click',  () => this._setNumber('target_time',        Math.min(1440,parseFloat(this._n('target_time')) + 5)));
    this._q('#weightMinus').addEventListener('click',() => this._setNumber('cooking_weight',    Math.max(100, parseFloat(this._n('cooking_weight')) - 50)));
    this._q('#weightPlus').addEventListener('click', () => this._setNumber('cooking_weight',    Math.min(1800,parseFloat(this._n('cooking_weight')) + 50)));

    this._all('.chip[data-group="mode"]').forEach(c =>
      c.addEventListener('click', () => this._selectOption('mode', c.dataset.val))
    );
    this._all('.seg-btn[data-group="texture"]').forEach(b =>
      b.addEventListener('click', () => this._selectOption('texture', b.dataset.val))
    );
    this._all('.seg-btn[data-group="measure"]').forEach(b =>
      b.addEventListener('click', () => this._selectOption('target_cooking_measure', b.dataset.val))
    );
    this._all('.seg-btn[data-group="turnpot"]').forEach(b =>
      b.addEventListener('click', () => this._selectOption('turn_pot', b.dataset.val))
    );

    this._q('#togglePreheat').addEventListener('click', () => this._toggleSwitch('preheat'));
    this._q('#toggleAutoWrm').addEventListener('click', () => this._toggleSwitch('auto_keep_warm'));
    this._q('#toggleCurWrm').addEventListener('click',  () => this._toggleSwitch('current_keep_warm'));
    this._q('#toggleTurnCfg').addEventListener('click', () => this._toggleSwitch('turn_pot_config'));
  }

  _togglePanel() { this._panelOpen ? this._closePanel() : this._openPanel(); }
  _openPanel()  { this._panelOpen = true;  this._q('#configPanel').classList.add('open');    this._q('#overlay').classList.add('visible'); }
  _closePanel() { this._panelOpen = false; this._q('#configPanel').classList.remove('open'); this._q('#overlay').classList.remove('visible'); }

  _buildMesh() {
    const mesh = this._q('#afMesh');
    for (let i = 0; i < 60; i++) { const c = document.createElement('div'); c.className = 'af-hole'; mesh.appendChild(c); }
    setInterval(() => this._all('.af-hole').forEach(c => c.classList.toggle('hot', Math.random() > 0.52)), 500);
  }
  _buildHeatWaves() {
    const heat = this._q('#afHeat');
    for (let i = 0; i < 10; i++) {
      const w = document.createElement('div'); w.className = 'af-hw';
      w.style.cssText = `left:${6+i*13}px;animation-delay:${Math.random()*2}s;animation-duration:${1.4+Math.random()*.8}s;--dx:${(Math.random()-.5)*8}px`;
      heat.appendChild(w);
    }
  }

  // ── HTML ────────────────────────────────────────────────────
  _html() { return `
    <div class="card-wrap">
      <div class="ha-card af-card">
        <div class="card-main">
          <div class="card-header">
            <div class="header-left">
              <div class="header-icon">🍟</div>
              <div>
                <div class="header-title">Air Fryer Xiaomi</div>
                <div class="header-sub">bucătărie · MAF10A</div>
              </div>
            </div>
            <div class="status-badge idle" id="statusBadge">
              <span class="status-dot"></span><span id="statusText">—</span>
            </div>
          </div>

          <div class="machine-viewport" id="modelClick">
            <div class="af-scene">
              <div class="af-body">
                <div class="af-toppanel">
                  <div class="af-lcd">
                    <span class="af-lcd-main" id="lcdTemp">—°C</span>
                    <span class="af-lcd-sub"  id="lcdTime">— min</span>
                  </div>
                  <div class="af-leds">
                    <div class="af-led on"></div>
                    <div class="af-led" id="led2"></div>
                    <div class="af-led"></div>
                  </div>
                  <div class="af-knob"></div>
                </div>
                <div class="af-mid">
                  <div class="af-slot"></div>
                  <div class="af-drawer-handle"></div>
                  <div class="af-basket"><div class="af-mesh" id="afMesh"></div></div>
                  <div class="af-feet"><div class="af-foot"></div><div class="af-foot"></div></div>
                </div>
              </div>
              <div class="af-heat" id="afHeat"></div>
            </div>
            <div class="click-hint">⚙ atinge pentru configurare</div>
          </div>

          <div class="stats">
            <div class="stat"><span class="stat-val" id="statTemp">—°</span><span class="stat-key">Temp.</span></div>
            <div class="stat"><span class="stat-val" id="statLeft">—</span><span class="stat-key">Min răm.</span></div>
            <div class="stat"><span class="stat-val" id="statWeight">—g</span><span class="stat-key">Greutate</span></div>
          </div>

          <div class="progress-section">
            <div class="prog-header">
              <span class="prog-label">Progres gătire</span>
              <span class="prog-time" id="progLabel">⏱ — min rămași</span>
            </div>
            <div class="progress-bar"><div class="progress-fill" id="progFill" style="width:0%"></div></div>
          </div>

          <div class="main-controls">
            <button class="btn btn-start"  id="btnStart">▶ Start Cook</button>
            <button class="btn btn-pause"  id="btnPause">⏸</button>
            <button class="btn btn-resume" id="btnResume">▷▷</button>
            <button class="btn btn-stop"   id="btnStop">⏹</button>
          </div>
        </div>
      </div>

      <div class="panel-overlay" id="overlay"></div>

      <div class="config-panel" id="configPanel">
        <div class="panel-handle" id="panelHandle">
          <div class="panel-handle-bar"></div>
          <div class="panel-handle-title">⚙ Configurare Air Fryer</div>
          <div class="panel-handle-sub">${this._device}</div>
        </div>
        <div class="panel-scroll">

          <div class="section-label">Temperatură, Timp &amp; Greutate</div>
          <div class="num-row">
            <div class="num-control">
              <div class="num-label">Temperatură</div>
              <div class="num-mid"><div class="num-value" id="tempVal">— <small>°C</small></div>
                <div class="num-btns"><button class="num-btn" id="tempMinus">−</button><button class="num-btn" id="tempPlus">+</button></div>
              </div>
            </div>
            <div class="num-control">
              <div class="num-label">Timp (min)</div>
              <div class="num-mid"><div class="num-value" id="timeVal">— <small>min</small></div>
                <div class="num-btns"><button class="num-btn" id="timeMinus">−</button><button class="num-btn" id="timePlus">+</button></div>
              </div>
            </div>
          </div>
          <div class="num-row">
            <div class="num-control">
              <div class="num-label">Greutate (g)</div>
              <div class="num-mid"><div class="num-value" id="weightVal">— <small>g</small></div>
                <div class="num-btns"><button class="num-btn" id="weightMinus">−</button><button class="num-btn" id="weightPlus">+</button></div>
              </div>
            </div>
            <div></div>
          </div>

          <div class="section-label">Program gătire</div>
          <div class="chips-wrap">
            ${[['French Fries','🍟'],['Chicken Wing','🍗'],['Steak','🥩'],['Lamb Chops','🐑'],['Fish','🐟'],['Shrimp','🍤'],['Vegetables','🥦'],['Cake','🎂'],['Pizza','🍕'],['Defrost','❄️'],['Dried Fruit','🍇'],['Yogurt','🫙'],['Manual','🎛']]
              .map(([v,e]) => `<div class="chip" data-group="mode" data-val="${v}">${e} ${v}</div>`).join('')}
          </div>

          <div class="sel-row">
            <div class="sel-group">
              <label>Textură</label>
              <div class="seg-btns">
                ${[['NONE','—'],['Crispy Roast','Crispy'],['Tender Roast','Tender'],['Degrease','Degrease']]
                  .map(([v,l]) => `<div class="seg-btn" data-group="texture" data-val="${v}">${l}</div>`).join('')}
              </div>
            </div>
            <div class="sel-group">
              <label>Cantitate</label>
              <div class="seg-btns">
                ${[['NULL','—'],['One Layer','1L'],['Double Layer','2L'],['Half Pot','½'],['Full Pot','Full']]
                  .map(([v,l]) => `<div class="seg-btn" data-group="measure" data-val="${v}">${l}</div>`).join('')}
              </div>
            </div>
          </div>

          <div class="section-label">Întoarce coșul</div>
          <div class="seg-btns" style="border-radius:10px;overflow:hidden;border:1px solid #2a2f45">
            <div class="seg-btn" data-group="turnpot" data-val="No Need Turn Over Pot" style="flex:1">Nu e nevoie</div>
            <div class="seg-btn" data-group="turnpot" data-val="Need Turn Over Pot"    style="flex:1">🔄 Întoarce</div>
          </div>

          <div class="divider"></div>
          <div class="section-label">Setări</div>
          <div class="toggles-grid">
            <div class="toggle-card" id="togglePreheat">
              <div class="toggle-left"><span>🌡</span><span class="toggle-name">Preîncălzire</span></div>
              <div class="toggle-pill"><div class="toggle-thumb"></div></div>
            </div>
            <div class="toggle-card" id="toggleAutoWrm">
              <div class="toggle-left"><span>♨️</span><span class="toggle-name">Auto Warm</span></div>
              <div class="toggle-pill"><div class="toggle-thumb"></div></div>
            </div>
            <div class="toggle-card" id="toggleCurWrm">
              <div class="toggle-left"><span>🔥</span><span class="toggle-name">Keep Warm</span></div>
              <div class="toggle-pill"><div class="toggle-thumb"></div></div>
            </div>
            <div class="toggle-card" id="toggleTurnCfg">
              <div class="toggle-left"><span>⚖️</span><span class="toggle-name">Turn Pot Cfg</span></div>
              <div class="toggle-pill"><div class="toggle-thumb"></div></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `; }

  // ── CSS ─────────────────────────────────────────────────────
  _css() { return `
    @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    .card-wrap{font-family:'Syne',sans-serif;position:relative}
    .ha-card{background:#181c27;border:1px solid #2a2f45;border-radius:24px;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,.6)}
    .af-card{position:relative}
    .af-card::before{content:'';position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:260px;height:120px;background:radial-gradient(ellipse,rgba(249,115,22,.1) 0%,transparent 70%);pointer-events:none;z-index:0}
    .card-main{padding:22px 22px 20px;position:relative;z-index:1}
    .card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
    .header-left{display:flex;align-items:center;gap:10px}
    .header-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:linear-gradient(135deg,#f97316,#dc2626);box-shadow:0 4px 12px rgba(249,115,22,.35)}
    .header-title{font-size:15px;font-weight:700;color:#e8eaf6}
    .header-sub{font-size:11px;color:#6b7280;font-family:'DM Mono',monospace}
    .status-badge{display:flex;align-items:center;gap:6px;border-radius:20px;padding:4px 10px;font-size:11px;font-family:'DM Mono',monospace;transition:all .3s}
    .status-badge.active{background:rgba(249,115,22,.12);border:1px solid rgba(249,115,22,.3);color:#f97316}
    .status-badge.idle{background:rgba(107,114,128,.1);border:1px solid rgba(107,114,128,.2);color:#6b7280}
    .status-dot{width:6px;height:6px;border-radius:50%;background:currentColor;animation:pdot 1.4s ease-in-out infinite}
    @keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.6)}}
    .machine-viewport{display:flex;justify-content:center;align-items:center;margin-bottom:16px;cursor:pointer;position:relative;user-select:none}
    .click-hint{position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);font-size:9px;color:#3a4060;font-family:'DM Mono',monospace;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
    .af-scene{position:relative;width:196px;height:228px}
    .af-body{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);width:178px;height:188px;border-radius:18px 18px 14px 14px;background:linear-gradient(160deg,#ffffff 0%,#f2f4f7 28%,#e6e9ef 62%,#d4d8e2 100%);border:1px solid #c4c9d4;box-shadow:0 18px 50px rgba(0,0,0,.6),inset -5px 0 16px rgba(0,0,0,.1),inset 5px 0 12px rgba(255,255,255,.65),inset 0 6px 14px rgba(255,255,255,.75),inset 0 -7px 18px rgba(0,0,0,.13)}
    .af-toppanel{position:absolute;top:0;left:0;right:0;height:50px;border-radius:18px 18px 0 0;display:flex;align-items:center;justify-content:center;gap:12px;padding:0 16px;background:linear-gradient(180deg,#eaecf1 0%,#d8dce6 100%);border-bottom:2px solid #bec3cf;box-shadow:inset 0 2px 6px rgba(255,255,255,.55)}
    .af-lcd{background:#050c04;border:1px solid #0a1508;border-radius:7px;padding:4px 10px;font-family:'DM Mono',monospace;color:#fb923c;box-shadow:inset 0 2px 6px rgba(0,0,0,.9),0 0 10px rgba(251,146,60,.2);text-shadow:0 0 8px #fb923c;min-width:60px;text-align:center;display:flex;flex-direction:column;align-items:center}
    .af-lcd-main{font-size:13px;font-weight:500;line-height:1.2}
    .af-lcd-sub{font-size:8px;color:rgba(251,146,60,.55);line-height:1.1}
    .af-leds{display:flex;gap:5px}
    .af-led{width:6px;height:6px;border-radius:50%;background:#c8d0dc;border:1px solid #b0b8c4}
    .af-led.on{background:#fb923c;box-shadow:0 0 6px #fb923c}
    .af-knob{width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 38% 32%,#e8ecf2,#b0b8c8);border:2px solid #a0a8b8;box-shadow:0 3px 8px rgba(0,0,0,.3),inset 0 1px 3px rgba(255,255,255,.7);position:relative}
    .af-knob::after{content:'';position:absolute;top:5px;left:50%;transform:translateX(-50%);width:3px;height:6px;background:#f97316;border-radius:2px;box-shadow:0 0 5px rgba(249,115,22,.7)}
    .af-mid{position:absolute;top:50px;left:0;right:0;bottom:0;border-radius:0 0 14px 14px;display:flex;flex-direction:column;align-items:center;padding-top:8px}
    .af-slot{width:138px;height:3px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.12),rgba(0,0,0,.18),rgba(0,0,0,.12),transparent);border-radius:2px}
    .af-drawer-handle{width:76px;height:15px;margin-top:7px;background:linear-gradient(180deg,#d4d8e4,#b4bcc8);border-radius:8px;border:1px solid #a4acb8;box-shadow:0 3px 8px rgba(0,0,0,.2),inset 0 1px 3px rgba(255,255,255,.5);position:relative}
    .af-drawer-handle::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:22px;height:3px;background:rgba(0,0,0,.1);border-radius:2px}
    .af-basket{width:144px;height:88px;margin-top:6px;background:linear-gradient(160deg,#e4e8f0 0%,#d0d4e0 50%,#c0c4d0 100%);border-radius:8px 8px 14px 14px;border:1px solid #b4bcc8;border-top:2px solid #c4ccd8;box-shadow:0 6px 18px rgba(0,0,0,.25),inset 0 3px 8px rgba(0,0,0,.1);position:relative;overflow:hidden}
    .af-mesh{position:absolute;inset:7px;display:grid;grid-template-columns:repeat(10,1fr);grid-template-rows:repeat(6,1fr);gap:2px}
    .af-hole{background:rgba(0,0,0,.12);border-radius:2px;transition:background .4s,box-shadow .4s}
    .af-hole.hot{background:rgba(234,88,12,.35);box-shadow:0 0 3px rgba(234,88,12,.3)}
    .af-feet{display:flex;justify-content:space-between;width:136px;margin-top:5px}
    .af-foot{width:20px;height:9px;border-radius:0 0 5px 5px;background:linear-gradient(180deg,#c0c4d0,#9ca0ac);border:1px solid #aeb4c0;box-shadow:0 3px 6px rgba(0,0,0,.25)}
    .af-heat{position:absolute;top:40px;left:50%;transform:translateX(-50%);width:140px;height:28px;pointer-events:none}
    .af-hw{position:absolute;bottom:0;width:2px;border-radius:1px;background:linear-gradient(180deg,rgba(249,115,22,.7),transparent);animation:hrise 2s ease-in-out infinite}
    @keyframes hrise{0%{height:0;opacity:0}40%{opacity:.85}100%{height:26px;opacity:0;transform:translateY(-4px) translateX(var(--dx,0px))}}
    .stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px}
    .stat{background:#1e2335;border:1px solid #2a2f45;border-radius:12px;padding:10px 8px;text-align:center}
    .stat-val{font-size:17px;font-weight:800;color:#e8eaf6;display:block;font-family:'DM Mono',monospace}
    .stat-key{font-size:9px;color:#6b7280;text-transform:uppercase;letter-spacing:.06em;font-family:'DM Mono',monospace}
    .progress-section{margin-bottom:14px}
    .prog-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:7px}
    .prog-label{font-size:11px;color:#6b7280;font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.06em}
    .prog-time{font-size:11px;color:#e8eaf6;font-family:'DM Mono',monospace}
    .progress-bar{height:4px;background:#2a2f45;border-radius:4px;overflow:hidden}
    .progress-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#dc2626,#f97316);transition:width .5s ease;position:relative}
    .progress-fill::after{content:'';position:absolute;right:0;top:0;bottom:0;width:30px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.3));animation:shimmer 1.5s linear infinite}
    @keyframes shimmer{0%,100%{opacity:0}50%{opacity:1}}
    .main-controls{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:8px}
    .btn{padding:10px 8px;border-radius:12px;border:1px solid #2a2f45;background:#1e2335;color:#e8eaf6;font-family:'Syne',sans-serif;font-size:11px;font-weight:600;cursor:pointer;transition:all .2s}
    .btn:hover{background:#252a3d;transform:translateY(-1px)}
    .btn-start{background:linear-gradient(135deg,rgba(34,197,94,.2),rgba(22,163,74,.1));border-color:rgba(34,197,94,.35);color:#4ade80}
    .btn-pause{color:#fbbf24}.btn-resume{color:#60a5fa}.btn-stop{color:#f87171}
    .panel-overlay{position:fixed;inset:0;background:rgba(5,6,12,.7);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);z-index:100;opacity:0;pointer-events:none;transition:opacity .3s}
    .panel-overlay.visible{opacity:1;pointer-events:all}
    .config-panel{position:fixed;bottom:0;left:50%;transform:translateX(-50%) translateY(100%);width:360px;max-width:100vw;background:#181c27;border:1px solid #2a2f45;border-radius:24px 24px 0 0;z-index:200;transition:transform .38s cubic-bezier(.32,1,.32,1);max-height:85vh;overflow:hidden;display:flex;flex-direction:column}
    .config-panel.open{transform:translateX(-50%) translateY(0)}
    .panel-handle{display:flex;flex-direction:column;align-items:center;padding:14px 22px 10px;cursor:pointer;flex-shrink:0}
    .panel-handle-bar{width:36px;height:4px;border-radius:2px;background:#2a2f45;margin-bottom:10px}
    .panel-handle-title{font-size:12px;font-weight:700;color:#e8eaf6;letter-spacing:.05em}
    .panel-handle-sub{font-size:10px;color:#6b7280;font-family:'DM Mono',monospace;margin-top:2px}
    .panel-scroll{overflow-y:auto;padding:4px 22px 32px;flex:1}
    .panel-scroll::-webkit-scrollbar{width:4px}
    .panel-scroll::-webkit-scrollbar-thumb{background:#2a2f45;border-radius:2px}
    .section-label{font-size:9px;color:#3a4060;font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.12em;margin-bottom:8px;margin-top:16px}
    .num-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}
    .num-control{background:#1e2335;border:1px solid #2a2f45;border-radius:14px;padding:11px 12px;display:flex;flex-direction:column;gap:8px}
    .num-label{font-size:9px;color:#6b7280;font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.06em}
    .num-mid{display:flex;align-items:center;justify-content:space-between}
    .num-value{font-size:18px;font-weight:800;color:#e8eaf6;font-family:'DM Mono',monospace}
    .num-value small{font-size:10px;font-weight:400;color:#6b7280}
    .num-btns{display:flex;gap:5px}
    .num-btn{width:26px;height:26px;border-radius:8px;border:1px solid #2a2f45;background:#252a3d;color:#e8eaf6;font-size:13px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}
    .num-btn:hover{border-color:#f97316;color:#f97316}
    .chips-wrap{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
    .chip{padding:5px 10px;border-radius:10px;border:1px solid #2a2f45;background:#1e2335;color:#6b7280;font-size:10px;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap}
    .chip.active{background:rgba(249,115,22,.15);border-color:rgba(249,115,22,.5);color:#f97316}
    .sel-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}
    .sel-group label{font-size:9px;color:#3a4060;font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.08em;display:block;margin-bottom:5px}
    .seg-btns{display:flex;border-radius:10px;overflow:hidden;border:1px solid #2a2f45}
    .seg-btn{flex:1;padding:7px 4px;background:#1e2335;color:#6b7280;font-size:9px;font-weight:600;font-family:'Syne',sans-serif;border:none;cursor:pointer;transition:all .2s;border-right:1px solid #2a2f45;text-align:center}
    .seg-btn:last-child{border-right:none}
    .seg-btn.active{background:rgba(249,115,22,.15);color:#f97316}
    .divider{height:1px;background:linear-gradient(90deg,transparent,#2a2f45,transparent);margin:14px 0 0}
    .toggles-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .toggle-card{background:#1e2335;border:1px solid #2a2f45;border-radius:12px;padding:10px 12px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:all .2s}
    .toggle-card.on{border-color:rgba(249,115,22,.35);background:rgba(249,115,22,.06)}
    .toggle-left{display:flex;align-items:center;gap:7px}
    .toggle-name{font-size:10px;font-weight:600;color:#6b7280}
    .toggle-card.on .toggle-name{color:#e8eaf6}
    .toggle-pill{width:30px;height:17px;border-radius:9px;background:#2a2f45;position:relative;transition:all .25s;border:1px solid #3a4060;flex-shrink:0}
    .toggle-card.on .toggle-pill{background:rgba(249,115,22,.8);border-color:#f97316}
    .toggle-thumb{position:absolute;top:2px;left:2px;width:11px;height:11px;border-radius:50%;background:#6b7280;transition:all .25s}
    .toggle-card.on .toggle-thumb{left:15px;background:#fff}
  `; }
}

customElements.define('xiaomi-airfryer-card', XiaomiAirFryerCard);
