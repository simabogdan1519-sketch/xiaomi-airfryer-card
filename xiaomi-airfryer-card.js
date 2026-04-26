/**
 * Xiaomi Air Fryer – Custom Lovelace Card
 *
 * type: custom:xiaomi-airfryer-card
 * device: careli_maf10a_1c99
 * language: en   # en | ro | de | fr | es | it | nl  (default: en)
 */

class XiaomiAirFryerCard extends HTMLElement {

  // ── i18n ────────────────────────────────────────────────────
  static get _i18n() { return {
    en: {
      title: 'Air Fryer Xiaomi', sub: 'kitchen · MAF10A',
      status: { idle:'Standby', cooking:'Cooking', pause:'Paused',
                preheat:'Preheating', keep_warm:'Keep Warm',
                appointment:'⏰ Scheduled', fault:'⚠️ Fault', unavailable:'● Offline' },
      temp: 'Temperature', time: 'Cook time', weight: 'Weight',
      preset_temp: 'Quick presets', preset_time: 'Quick presets',
      program: 'Cooking program', texture: 'Texture', quantity: 'Quantity',
      turn_pot: 'Turn basket', no_turn: 'Not needed', need_turn: '🔄 Turn',
      settings: 'Settings', preheat_sw: 'Preheat', auto_warm: 'Auto Warm',
      keep_warm_sw: 'Keep Warm', turn_cfg: 'Turn Pot Cfg',
      config_title: '⚙ Air Fryer Settings', click_hint: '⚙ tap to configure',
      set: 'Set', duration: 'Duration',
      prog_label: 'Cooking progress', min_left: 'min left',
      start: '▶ Start', pause_btn: '⏸', resume: '▷▷', stop: '⏹',
      tex: { NONE:'—', 'Crispy Roast':'Crispy', 'Tender Roast':'Tender', 'Degrease':'Degrease' },
      qty: { NULL:'—', 'One Layer':'1 Layer', 'Double Layer':'2 Layers', 'Half Pot':'½ Pot', 'Full Pot':'Full' },
    },
    ro: {
      title: 'Air Fryer Xiaomi', sub: 'bucătărie · MAF10A',
      status: { idle:'Standby', cooking:'Gătire', pause:'Pauză',
                preheat:'Preîncălzire', keep_warm:'Keep Warm',
                appointment:'⏰ Programat', fault:'⚠️ Eroare', unavailable:'● Offline' },
      temp: 'Temperatură', time: 'Timp gătire', weight: 'Greutate',
      preset_temp: 'Preseturi rapide', preset_time: 'Preseturi rapide',
      program: 'Program gătire', texture: 'Textură', quantity: 'Cantitate',
      turn_pot: 'Întoarce coșul', no_turn: 'Nu e nevoie', need_turn: '🔄 Întoarce',
      settings: 'Setări', preheat_sw: 'Preîncălzire', auto_warm: 'Auto Warm',
      keep_warm_sw: 'Keep Warm', turn_cfg: 'Turn Pot Cfg',
      config_title: '⚙ Configurare Air Fryer', click_hint: '⚙ atinge pentru configurare',
      set: 'Setată', duration: 'Durată',
      prog_label: 'Progres gătire', min_left: 'min rămași',
      start: '▶ Start Cook', pause_btn: '⏸', resume: '▷▷', stop: '⏹',
      tex: { NONE:'—', 'Crispy Roast':'Crispy', 'Tender Roast':'Tender', 'Degrease':'Degrease' },
      qty: { NULL:'—', 'One Layer':'1 Strat', 'Double Layer':'2 Straturi', 'Half Pot':'½ Coș', 'Full Pot':'Plin' },
    },
    de: {
      title: 'Xiaomi Heißluftfritteuse', sub: 'Küche · MAF10A',
      status: { idle:'Bereit', cooking:'Garen', pause:'Pause',
                preheat:'Vorheizen', keep_warm:'Warmhalten',
                appointment:'⏰ Geplant', fault:'⚠️ Fehler', unavailable:'● Offline' },
      temp: 'Temperatur', time: 'Garzeit', weight: 'Gewicht',
      preset_temp: 'Schnellwahl', preset_time: 'Schnellwahl',
      program: 'Garprogramm', texture: 'Textur', quantity: 'Menge',
      turn_pot: 'Korb wenden', no_turn: 'Nicht nötig', need_turn: '🔄 Wenden',
      settings: 'Einstellungen', preheat_sw: 'Vorheizen', auto_warm: 'Auto Warm',
      keep_warm_sw: 'Warmhalten', turn_cfg: 'Korb-Konfig',
      config_title: '⚙ Fritteuse einstellen', click_hint: '⚙ tippen zum Einstellen',
      set: 'Eingestellt', duration: 'Dauer',
      prog_label: 'Garfortschritt', min_left: 'Min verbleibend',
      start: '▶ Starten', pause_btn: '⏸', resume: '▷▷', stop: '⏹',
      tex: { NONE:'—', 'Crispy Roast':'Knusprig', 'Tender Roast':'Zart', 'Degrease':'Entfetten' },
      qty: { NULL:'—', 'One Layer':'1 Lage', 'Double Layer':'2 Lagen', 'Half Pot':'½ Korb', 'Full Pot':'Voll' },
    },
    fr: {
      title: 'Friteuse à air Xiaomi', sub: 'cuisine · MAF10A',
      status: { idle:'Veille', cooking:'Cuisson', pause:'Pause',
                preheat:'Préchauffage', keep_warm:'Maintien chaud',
                appointment:'⏰ Programmé', fault:'⚠️ Erreur', unavailable:'● Hors ligne' },
      temp: 'Température', time: 'Durée de cuisson', weight: 'Poids',
      preset_temp: 'Préréglages', preset_time: 'Préréglages',
      program: 'Programme', texture: 'Texture', quantity: 'Quantité',
      turn_pot: 'Retourner le panier', no_turn: 'Inutile', need_turn: '🔄 Retourner',
      settings: 'Paramètres', preheat_sw: 'Préchauffage', auto_warm: 'Auto Chaud',
      keep_warm_sw: 'Maintien chaud', turn_cfg: 'Config panier',
      config_title: '⚙ Réglages friteuse', click_hint: '⚙ toucher pour régler',
      set: 'Réglée', duration: 'Durée',
      prog_label: 'Progression', min_left: 'min restantes',
      start: '▶ Démarrer', pause_btn: '⏸', resume: '▷▷', stop: '⏹',
      tex: { NONE:'—', 'Crispy Roast':'Croustillant', 'Tender Roast':'Tendre', 'Degrease':'Dégraissage' },
      qty: { NULL:'—', 'One Layer':'1 couche', 'Double Layer':'2 couches', 'Half Pot':'½ panier', 'Full Pot':'Plein' },
    },
    es: {
      title: 'Freidora de aire Xiaomi', sub: 'cocina · MAF10A',
      status: { idle:'En espera', cooking:'Cocinando', pause:'Pausa',
                preheat:'Precalentando', keep_warm:'Manteniendo calor',
                appointment:'⏰ Programado', fault:'⚠️ Error', unavailable:'● Sin conexión' },
      temp: 'Temperatura', time: 'Tiempo de cocción', weight: 'Peso',
      preset_temp: 'Ajustes rápidos', preset_time: 'Ajustes rápidos',
      program: 'Programa', texture: 'Textura', quantity: 'Cantidad',
      turn_pot: 'Girar cesta', no_turn: 'No necesario', need_turn: '🔄 Girar',
      settings: 'Ajustes', preheat_sw: 'Precalentar', auto_warm: 'Auto Calor',
      keep_warm_sw: 'Mantener calor', turn_cfg: 'Config cesta',
      config_title: '⚙ Configurar freidora', click_hint: '⚙ toca para configurar',
      set: 'Fijada', duration: 'Duración',
      prog_label: 'Progreso cocción', min_left: 'min restantes',
      start: '▶ Iniciar', pause_btn: '⏸', resume: '▷▷', stop: '⏹',
      tex: { NONE:'—', 'Crispy Roast':'Crujiente', 'Tender Roast':'Tierno', 'Degrease':'Desengrasado' },
      qty: { NULL:'—', 'One Layer':'1 capa', 'Double Layer':'2 capas', 'Half Pot':'½ cesta', 'Full Pot':'Llena' },
    },
    it: {
      title: 'Friggitrice ad aria Xiaomi', sub: 'cucina · MAF10A',
      status: { idle:'In attesa', cooking:'Cottura', pause:'Pausa',
                preheat:'Preriscaldo', keep_warm:'Mantieni caldo',
                appointment:'⏰ Programmato', fault:'⚠️ Errore', unavailable:'● Non in linea' },
      temp: 'Temperatura', time: 'Tempo di cottura', weight: 'Peso',
      preset_temp: 'Preimpostazioni', preset_time: 'Preimpostazioni',
      program: 'Programma', texture: 'Consistenza', quantity: 'Quantità',
      turn_pot: 'Girare cestello', no_turn: 'Non necessario', need_turn: '🔄 Girare',
      settings: 'Impostazioni', preheat_sw: 'Preriscaldo', auto_warm: 'Auto caldo',
      keep_warm_sw: 'Mantieni caldo', turn_cfg: 'Config cestello',
      config_title: '⚙ Impostazioni friggitrice', click_hint: '⚙ tocca per configurare',
      set: 'Impostata', duration: 'Durata',
      prog_label: 'Avanzamento cottura', min_left: 'min rimanenti',
      start: '▶ Avvia', pause_btn: '⏸', resume: '▷▷', stop: '⏹',
      tex: { NONE:'—', 'Crispy Roast':'Croccante', 'Tender Roast':'Tenero', 'Degrease':'Sgrassaggio' },
      qty: { NULL:'—', 'One Layer':'1 strato', 'Double Layer':'2 strati', 'Half Pot':'½ cestello', 'Full Pot':'Pieno' },
    },
    nl: {
      title: 'Xiaomi Airfryer', sub: 'keuken · MAF10A',
      status: { idle:'Stand-by', cooking:'Aan het bakken', pause:'Gepauzeerd',
                preheat:'Voorverwarmen', keep_warm:'Warmhouden',
                appointment:'⏰ Gepland', fault:'⚠️ Fout', unavailable:'● Offline' },
      temp: 'Temperatuur', time: 'Baktijd', weight: 'Gewicht',
      preset_temp: 'Snelle keuze', preset_time: 'Snelle keuze',
      program: 'Bakprogramma', texture: 'Textuur', quantity: 'Hoeveelheid',
      turn_pot: 'Mand draaien', no_turn: 'Niet nodig', need_turn: '🔄 Draaien',
      settings: 'Instellingen', preheat_sw: 'Voorverwarmen', auto_warm: 'Auto Warm',
      keep_warm_sw: 'Warmhouden', turn_cfg: 'Mand instelling',
      config_title: '⚙ Airfryer instellen', click_hint: '⚙ tik om in te stellen',
      set: 'Ingesteld', duration: 'Duur',
      prog_label: 'Voortgang', min_left: 'min resterend',
      start: '▶ Starten', pause_btn: '⏸', resume: '▷▷', stop: '⏹',
      tex: { NONE:'—', 'Crispy Roast':'Knapperig', 'Tender Roast':'Mals', 'Degrease':'Ontvet' },
      qty: { NULL:'—', 'One Layer':'1 laag', 'Double Layer':'2 lagen', 'Half Pot':'½ mand', 'Full Pot':'Vol' },
    },
  }; }

  // ── Lifecycle ────────────────────────────────────────────────
  setConfig(config) {
    if (!config.device) throw new Error('Specify "device: <entity_prefix>" e.g. careli_maf10a_1c99');
    this._config  = config;
    this._device  = config.device;
    this._lang    = XiaomiAirFryerCard._i18n[config.language] ? config.language : 'en';
    this._t       = XiaomiAirFryerCard._i18n[this._lang];
    this._panelOpen = false;
    this._built     = false;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._built) { this._build(); this._built = true; }
    this._update();
  }

  getCardSize() { return 6; }

  // ── Entity helpers ───────────────────────────────────────────
  _s(suffix)   { return this._hass?.states[`sensor.${this._device}_${suffix}`]?.state  ?? 'unavailable'; }
  _n(suffix)   { return this._hass?.states[`number.${this._device}_${suffix}`]?.state  ?? 'unavailable'; }
  _sel(suffix) { return this._hass?.states[`select.${this._device}_${suffix}`]?.state  ?? 'unavailable'; }
  _sw(suffix)  { return this._hass?.states[`switch.${this._device}_${suffix}`]?.state  ?? 'unavailable'; }

  _call(domain, service, suffix, extra = {}) {
    this._hass.callService(domain, service, { entity_id: `${domain}.${this._device}_${suffix}`, ...extra });
  }
  _pressButton(suffix)          { this._call('button',  'press',         suffix); }
  _setNumber(suffix, value)     { this._call('number',  'set_value',     suffix, { value }); }
  _selectOption(suffix, option) { this._call('select',  'select_option', suffix, { option }); }
  _toggleSwitch(suffix) {
    this._hass.callService('homeassistant', 'toggle', { entity_id: `switch.${this._device}_${suffix}` });
  }

  // ── Update ───────────────────────────────────────────────────
  _update() {
    if (!this._hass || !this._built) return;
    const t = this._t;

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

    const totalMin = parseFloat(time) || 20;
    const leftMin  = parseFloat(left) || 0;
    const pct      = totalMin > 0 ? Math.round(((totalMin - leftMin) / totalMin) * 100) : 0;
    const isActive = ['cooking','preheat','keep_warm'].includes(status?.toLowerCase?.());

    const statusKey = status?.toLowerCase?.().replace(' ','_');
    this._q('#statusText').textContent = t.status[statusKey] ?? t.status[status] ?? status ?? '—';
    this._q('#statusBadge').className  = 'status-badge ' + (isActive ? 'active' : 'idle');

    if (temp !== 'unavailable') {
      const tv = parseFloat(temp);
      this._q('#lcdTemp').textContent = tv + '°C';
      this._q('#statTemp').textContent = tv + '°';
      if (!this._draggingTemp) {
        this._q('#tempDisplay').innerHTML = tv + ' <small>°C</small>';
        this._q('#tempSlider').value = tv;
        this._q('#tempFill').style.width = this._pct(tv, 40, 230);
        this._all('#tempPresets .preset').forEach(p => p.classList.toggle('active', parseInt(p.dataset.val) === tv));
      }
    }
    if (left !== 'unavailable') {
      this._q('#lcdTime').textContent   = leftMin + ' min';
      this._q('#statLeft').textContent  = leftMin;
      this._q('#progLabel').textContent = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> ${leftMin} ${t.min_left}`;
      this._q('#progFill').style.width  = pct + '%';
    }
    if (time !== 'unavailable') {
      const tv = parseFloat(time);
      if (!this._draggingTime) {
        this._q('#timeDisplay').innerHTML = tv + ' <small>min</small>';
        this._q('#timeSlider').value = tv;
        this._q('#timeFill').style.width = this._pct(tv, 1, 120);
        this._all('#timePresets .tpreset').forEach(p => p.classList.toggle('active', parseInt(p.dataset.val) === tv));
      }
    }
    if (weight !== 'unavailable') {
      const wv = parseFloat(weight);
      this._q('#statWeight').textContent   = wv + 'g';
      this._q('#weightDisplay').innerHTML  = wv + ' <small>g</small>';
    }

    this._q('#led2').classList.toggle('on', isActive);

    this._all('.chip[data-group="mode"]').forEach(c => c.classList.toggle('active', c.dataset.val === mode));
    this._all('.seg-btn[data-group="texture"]').forEach(b => b.classList.toggle('active', b.dataset.val === texture));
    this._all('.seg-btn[data-group="measure"]').forEach(b => b.classList.toggle('active', b.dataset.val === measure));
    this._all('.seg-btn[data-group="turnpot"]').forEach(b => b.classList.toggle('active', b.dataset.val === turnPot));

    this._tog('#togglePreheat', preheat === 'on');
    this._tog('#toggleAutoWrm', autoWrm === 'on');
    this._tog('#toggleCurWrm',  curWrm  === 'on');
    this._tog('#toggleTurnCfg', turnCfg === 'on');
  }

  _pct(val, min, max) { return ((val - min) / (max - min) * 100).toFixed(1) + '%'; }
  _q(sel)   { return this.shadowRoot.querySelector(sel); }
  _all(sel) { return [...this.shadowRoot.querySelectorAll(sel)]; }
  _tog(sel, on) { this._q(sel)?.classList.toggle('on', on); }

  // ── Build ────────────────────────────────────────────────────
  _build() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `<style>${this._css()}</style>${this._html()}`;
    this._attachEvents();
    this._buildMesh();
    this._buildHeatWaves();
  }

  _attachEvents() {
    const t = this._t;
    this._q('#modelClick').addEventListener('click', () => this._togglePanel());
    this._q('#overlay').addEventListener('click',    () => this._closePanel());
    this._q('#panelHandle').addEventListener('click',() => this._closePanel());

    this._q('#btnStart').addEventListener('click',  () => this._pressButton('start_cook'));
    this._q('#btnPause').addEventListener('click',  () => this._pressButton('pause'));
    this._q('#btnResume').addEventListener('click', () => this._pressButton('resume_cook'));
    this._q('#btnStop').addEventListener('click',   () => this._pressButton('cancel_cooking'));

    // temp slider
    const ts = this._q('#tempSlider');
    ts.addEventListener('mousedown',  () => this._draggingTemp = true);
    ts.addEventListener('touchstart', () => this._draggingTemp = true, { passive: true });
    ts.addEventListener('mouseup',    () => { this._draggingTemp = false; this._setNumber('target_temperature', parseInt(ts.value)); });
    ts.addEventListener('touchend',   () => { this._draggingTemp = false; this._setNumber('target_temperature', parseInt(ts.value)); });
    ts.addEventListener('input', () => {
      const v = parseInt(ts.value);
      this._q('#tempDisplay').innerHTML = v + ' <small>°C</small>';
      this._q('#tempFill').style.width  = this._pct(v, 40, 230);
      this._q('#lcdTemp').textContent   = v + '°C';
      this._all('#tempPresets .preset').forEach(p => p.classList.toggle('active', parseInt(p.dataset.val) === v));
    });
    this._all('#tempPresets .preset').forEach(p => {
      p.addEventListener('click', () => {
        const v = parseInt(p.dataset.val);
        ts.value = v;
        this._q('#tempDisplay').innerHTML = v + ' <small>°C</small>';
        this._q('#tempFill').style.width  = this._pct(v, 40, 230);
        this._q('#lcdTemp').textContent   = v + '°C';
        this._all('#tempPresets .preset').forEach(x => x.classList.remove('active'));
        p.classList.add('active');
        this._setNumber('target_temperature', v);
      });
    });

    // time slider
    const tms = this._q('#timeSlider');
    tms.addEventListener('mousedown',  () => this._draggingTime = true);
    tms.addEventListener('touchstart', () => this._draggingTime = true, { passive: true });
    tms.addEventListener('mouseup',    () => { this._draggingTime = false; this._setNumber('target_time', parseInt(tms.value)); });
    tms.addEventListener('touchend',   () => { this._draggingTime = false; this._setNumber('target_time', parseInt(tms.value)); });
    tms.addEventListener('input', () => {
      const v = parseInt(tms.value);
      this._q('#timeDisplay').innerHTML = v + ' <small>min</small>';
      this._q('#timeFill').style.width  = this._pct(v, 1, 120);
      this._q('#lcdTime').textContent   = v + ' min';
      this._all('#timePresets .tpreset').forEach(p => p.classList.toggle('active', parseInt(p.dataset.val) === v));
    });
    this._all('#timePresets .tpreset').forEach(p => {
      p.addEventListener('click', () => {
        const v = parseInt(p.dataset.val);
        tms.value = v;
        this._q('#timeDisplay').innerHTML = v + ' <small>min</small>';
        this._q('#timeFill').style.width  = this._pct(v, 1, 120);
        this._q('#lcdTime').textContent   = v + ' min';
        this._all('#timePresets .tpreset').forEach(x => x.classList.remove('active'));
        p.classList.add('active');
        this._setNumber('target_time', v);
      });
    });

    // weight
    this._q('#weightMinus').addEventListener('click', () => this._setNumber('cooking_weight', Math.max(100,  parseFloat(this._n('cooking_weight')) - 50)));
    this._q('#weightPlus').addEventListener('click',  () => this._setNumber('cooking_weight', Math.min(1800, parseFloat(this._n('cooking_weight')) + 50)));

    // selects
    this._all('.chip[data-group="mode"]').forEach(c => c.addEventListener('click', () => this._selectOption('mode', c.dataset.val)));
    this._all('.seg-btn[data-group="texture"]').forEach(b => b.addEventListener('click', () => this._selectOption('texture', b.dataset.val)));
    this._all('.seg-btn[data-group="measure"]').forEach(b => b.addEventListener('click', () => this._selectOption('target_cooking_measure', b.dataset.val)));
    this._all('.seg-btn[data-group="turnpot"]').forEach(b => b.addEventListener('click', () => this._selectOption('turn_pot', b.dataset.val)));

    // toggles
    this._q('#togglePreheat').addEventListener('click', () => this._toggleSwitch('preheat'));
    this._q('#toggleAutoWrm').addEventListener('click', () => this._toggleSwitch('auto_keep_warm'));
    this._q('#toggleCurWrm').addEventListener('click',  () => this._toggleSwitch('current_keep_warm'));
    this._q('#toggleTurnCfg').addEventListener('click', () => this._toggleSwitch('turn_pot_config'));
  }

  _togglePanel() { this._panelOpen ? this._closePanel() : this._openPanel(); }
  _openPanel()   { this._panelOpen = true;  this._q('#configPanel').classList.add('open');    this._q('#overlay').classList.add('visible'); }
  _closePanel()  { this._panelOpen = false; this._q('#configPanel').classList.remove('open'); this._q('#overlay').classList.remove('visible'); }

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

  // ── HTML ─────────────────────────────────────────────────────
  _html() {
    const t = this._t;
    const tex = Object.entries(t.tex).map(([v,l]) => `<div class="seg-btn" data-group="texture" data-val="${v}">${l}</div>`).join('');
    const qty = Object.entries(t.qty).map(([v,l]) => `<div class="seg-btn" data-group="measure" data-val="${v}">${l}</div>`).join('');
    const modes = [
        ['French Fries','<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="8" width="3" height="13" rx="1"/><rect x="8" y="5" width="3" height="16" rx="1"/><rect x="13" y="8" width="3" height="13" rx="1"/><rect x="18" y="5" width="3" height="16" rx="1"/></svg>'],
        ['Chicken Wing','<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 5s1-1 4 2 7 11 7 11"/><path d="M15 18s4-2 4-7-4-9-9-9-6 4-6 4"/></svg>'],
        ['Steak','<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12h8"/></svg>'],
        ['Lamb Chops','<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 7c0 2.21-3.58 4-8 4S4 9.21 4 7c0-2.21 3.58-4 8-4s8 1.79 8 4z"/><path d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7"/></svg>'],
        ['Fish','<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6.5 12C6.5 8.96 9.24 6.5 12 6.5c4.14 0 7.5 2.46 7.5 5.5S16.14 17.5 12 17.5c-2.76 0-5.5-2.46-5.5-5.5z"/><path d="M6.5 12l-3.5-4v8l3.5-4z"/></svg>'],
        ['Shrimp','<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 3C9 3 5 8 5 12c0 3 2 5 5 6"/><path d="M10 18c1 2 3 3 5 3 4 0 5-3 5-7 0-3-2-5-5-5"/></svg>'],
        ['Vegetables','<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 22l10-10M16 8c0 4-6 12-6 12s-6-8-6-12a6 6 0 0112 0z"/></svg>'],
        ['Cake','<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2 1 2 1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></svg>'],
        ['Pizza','<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2l9 19H3z"/><path d="M8 15c1-1 2.5-1 3.5 0"/></svg>'],
        ['Defrost','<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="M17 7l-5-5-5 5"/><path d="M17 17l-5 5-5-5"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M7 7l-5 5 5 5"/><path d="M17 7l5 5-5 5"/></svg>'],
        ['Dried Fruit','<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="7"/><path d="M12 5v2M12 17v2M5 12H3M21 12h-2"/></svg>'],
        ['Yogurt','<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 3h8l1 9H7z"/><path d="M7 12l1 9h8l1-9"/></svg>'],
        ['Manual','<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M17.66 17.66l1.41 1.41M4.93 4.93l1.41 1.41M6.34 17.66l-1.41 1.41M2 12h2M20 12h2M12 2v2M12 20v2"/></svg>']
      ]
      .map(([v,e]) => `<div class="chip" data-group="mode" data-val="${v}">${e} ${v}</div>`).join('');

    return `
    <div class="card-wrap">
      <div class="ha-card af-card">
        <div class="card-main">
          <div class="card-header">
            <div class="header-left">
              <div class="header-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/></svg></div>
              <div>
                <div class="header-title">${t.title}</div>
                <div class="header-sub">${t.sub}</div>
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
            <div class="click-hint">${t.click_hint}</div>
          </div>

          <div class="stats">
            <div class="stat"><span class="stat-val" id="statTemp">—°</span><span class="stat-key">${t.temp}</span></div>
            <div class="stat"><span class="stat-val" id="statLeft">—</span><span class="stat-key">${t.min_left}</span></div>
            <div class="stat"><span class="stat-val" id="statWeight">—g</span><span class="stat-key">${t.weight}</span></div>
          </div>

          <div class="progress-section">
            <div class="prog-header">
              <span class="prog-label">${t.prog_label}</span>
              <span class="prog-time" id="progLabel"><span style="display:inline-flex;align-items:center;gap:4px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> — ${t.min_left}</span></span>
            </div>
            <div class="progress-bar"><div class="progress-fill" id="progFill" style="width:0%"></div></div>
          </div>

          <div class="main-controls">
            <button class="btn btn-start"  id="btnStart"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> ${t.start}</button>
            <button class="btn btn-pause"  id="btnPause"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> ${t.pause_btn}</button>
            <button class="btn btn-resume" id="btnResume"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg> ${t.resume}</button>
            <button class="btn btn-stop"   id="btnStop"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg> ${t.stop}</button>
          </div>
        </div>
      </div>

      <div class="panel-overlay" id="overlay"></div>

      <div class="config-panel" id="configPanel">
        <div class="panel-handle" id="panelHandle">
          <div class="panel-handle-bar"></div>
          <div class="panel-handle-title">${t.config_title}</div>
          <div class="panel-handle-sub">${this._device}</div>
        </div>
        <div class="panel-scroll">

          <div class="section-label">${t.temp}</div>
          <div class="ctrl-block">
            <div class="ctrl-big" id="tempDisplay">— <small>°C</small></div>
            <div class="presets" id="tempPresets">
              <div class="preset" data-val="100">100°</div>
              <div class="preset" data-val="140">140°</div>
              <div class="preset" data-val="160">160°</div>
              <div class="preset" data-val="180">180°</div>
              <div class="preset" data-val="200">200°</div>
              <div class="preset" data-val="220">220°</div>
            </div>
            <div class="slider-wrap">
              <div class="slider-track"><div class="slider-fill orange" id="tempFill" style="width:0%"></div></div>
              <input type="range" class="orange" id="tempSlider" min="40" max="230" step="5" value="180">
            </div>
            <div class="slider-limits"><span class="slider-limit">40°C</span><span class="slider-limit">230°C</span></div>
          </div>

          <div class="section-label">${t.time}</div>
          <div class="ctrl-block">
            <div class="ctrl-big" id="timeDisplay">— <small>min</small></div>
            <div class="time-presets" id="timePresets">
              <div class="tpreset" data-val="5">5<span>min</span></div>
              <div class="tpreset" data-val="10">10<span>min</span></div>
              <div class="tpreset" data-val="15">15<span>min</span></div>
              <div class="tpreset" data-val="20">20<span>min</span></div>
              <div class="tpreset" data-val="30">30<span>min</span></div>
              <div class="tpreset" data-val="45">45<span>min</span></div>
              <div class="tpreset" data-val="60">60<span>min</span></div>
            </div>
            <div class="slider-wrap">
              <div class="slider-track"><div class="slider-fill blue" id="timeFill" style="width:0%"></div></div>
              <input type="range" class="blue" id="timeSlider" min="1" max="120" step="1" value="15">
            </div>
            <div class="slider-limits"><span class="slider-limit">1 min</span><span class="slider-limit">120 min</span></div>
          </div>

          <div class="section-label">${t.weight}</div>
          <div class="weight-row">
            <div class="weight-left">
              <div class="wlabel">Cooking Weight</div>
              <div class="wval" id="weightDisplay">— <small>g</small></div>
            </div>
            <div class="wbtns">
              <button class="wbtn" id="weightMinus">−</button>
              <button class="wbtn" id="weightPlus">+</button>
            </div>
          </div>

          <div class="divider"></div>

          <div class="section-label">${t.program}</div>
          <div class="chips-wrap">${modes}</div>

          <div class="sel-row">
            <div class="sel-group">
              <label>${t.texture}</label>
              <div class="seg-btns">${tex}</div>
            </div>
            <div class="sel-group">
              <label>${t.quantity}</label>
              <div class="seg-btns">${qty}</div>
            </div>
          </div>

          <div class="section-label">${t.turn_pot}</div>
          <div class="seg-btns" style="border-radius:10px;overflow:hidden;border:1px solid rgba(0,0,0,.07);margin-bottom:4px">
            <div class="seg-btn" data-group="turnpot" data-val="No Need Turn Over Pot" style="flex:1">${t.no_turn}</div>
            <div class="seg-btn" data-group="turnpot" data-val="Need Turn Over Pot"    style="flex:1">${t.need_turn}</div>
          </div>

          <div class="divider"></div>
          <div class="section-label">${t.settings}</div>
          <div class="toggles-grid">
            <div class="toggle-card" id="togglePreheat">
              <div class="toggle-left"><span style="display:flex;align-items:center;color:#d4640a"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z"/></svg></span><span class="toggle-name">${t.preheat_sw}</span></div>
              <div class="toggle-pill"><div class="toggle-thumb"></div></div>
            </div>
            <div class="toggle-card" id="toggleAutoWrm">
              <div class="toggle-left"><span style="display:flex;align-items:center;color:#d4640a"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/><circle cx="12" cy="12" r="4"/></svg></span><span class="toggle-name">${t.auto_warm}</span></div>
              <div class="toggle-pill"><div class="toggle-thumb"></div></div>
            </div>
            <div class="toggle-card" id="toggleCurWrm">
              <div class="toggle-left"><span style="display:flex;align-items:center;color:#d4640a"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 3z"/></svg></span><span class="toggle-name">${t.keep_warm_sw}</span></div>
              <div class="toggle-pill"><div class="toggle-thumb"></div></div>
            </div>
            <div class="toggle-card" id="toggleTurnCfg">
              <div class="toggle-left"><span style="display:flex;align-items:center;color:#d4640a"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 00-1.905 1.46L2 20h20L19.405 9.46A2 2 0 0017.5 8z"/></svg></span><span class="toggle-name">${t.turn_cfg}</span></div>
              <div class="toggle-pill"><div class="toggle-thumb"></div></div>
            </div>
          </div>

        </div>
      </div>
    </div>`;
  }

  // ── CSS ──────────────────────────────────────────────────────
  _css() { return `
    @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=Lora:wght@400;600&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    .card-wrap{font-family:'Quicksand',sans-serif;position:relative}
    .ha-card{background:#f7f8f6;border:1px solid rgba(0,0,0,0.03);border-radius:24px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.06)}
    .af-card{position:relative}
    .af-card::before{content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:radial-gradient(circle,rgba(122,184,139,.08) 0%,transparent 70%);pointer-events:none;z-index:0}
    .card-main{padding:22px 22px 20px;position:relative;z-index:1}
    .card-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
    .header-left{display:flex;align-items:center;gap:10px}
    .header-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:linear-gradient(135deg,#f97316,#dc2626);box-shadow:0 4px 12px rgba(249,115,22,.25)}
    .header-title{font-size:15px;font-weight:700;color:#1a1a1a;font-family:'Lora',serif}
    .header-sub{font-size:11px;color:#aaa;font-family:'Quicksand',sans-serif;font-weight:600}
    .status-badge{display:flex;align-items:center;gap:6px;border-radius:20px;padding:4px 10px;font-size:11px;font-family:'Quicksand',sans-serif;font-weight:700;transition:all .3s}
    .status-badge.active{background:rgba(249,115,22,.1);border:1px solid rgba(249,115,22,.25);color:#d4640a}
    .status-badge.idle{background:rgba(0,0,0,.04);border:1px solid rgba(0,0,0,.07);color:#aaa}
    .status-dot{width:6px;height:6px;border-radius:50%;background:currentColor;animation:pdot 1.4s ease-in-out infinite}
    @keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.6)}}
    .machine-viewport{display:flex;justify-content:center;align-items:center;margin-bottom:16px;cursor:pointer;position:relative;user-select:none}
    .click-hint{position:absolute;bottom:-4px;left:50%;transform:translateX(-50%);font-size:9px;color:#bbb;font-family:'Quicksand',sans-serif;font-weight:700;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
    .af-scene{position:relative;width:196px;height:228px}
    .af-body{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);width:178px;height:188px;border-radius:18px 18px 14px 14px;background:linear-gradient(160deg,#fdf6ee 0%,#f5ede0 30%,#edddd0 65%,#e0cfc0 100%);border:1px solid #d8c8b8;box-shadow:0 10px 32px rgba(0,0,0,.10),inset -5px 0 16px rgba(0,0,0,.04),inset 5px 0 12px rgba(255,255,255,.55),inset 0 6px 14px rgba(255,255,255,.65),inset 0 -7px 18px rgba(0,0,0,.06)}
    .af-toppanel{position:absolute;top:0;left:0;right:0;height:50px;border-radius:18px 18px 0 0;display:flex;align-items:center;justify-content:center;gap:12px;padding:0 16px;background:linear-gradient(180deg,#f0e4d4 0%,#e4d4c0 100%);border-bottom:2px solid #d0bfac;box-shadow:inset 0 2px 6px rgba(255,255,255,.55)}
    .af-lcd{background:#050c04;border:1px solid #0a1508;border-radius:7px;padding:4px 10px;font-family:'Quicksand',monospace;color:#fb923c;box-shadow:inset 0 2px 6px rgba(0,0,0,.9),0 0 10px rgba(251,146,60,.2);text-shadow:0 0 8px #fb923c;min-width:60px;text-align:center;display:flex;flex-direction:column;align-items:center}
    .af-lcd-main{font-size:13px;font-weight:600;line-height:1.2}
    .af-lcd-sub{font-size:8px;color:rgba(251,146,60,.55);line-height:1.1}
    .af-leds{display:flex;gap:5px}
    .af-led{width:6px;height:6px;border-radius:50%;background:#c8d0dc;border:1px solid #b0b8c4}
    .af-led.on{background:#fb923c;box-shadow:0 0 6px #fb923c}
    .af-knob{width:26px;height:26px;border-radius:50%;background:radial-gradient(circle at 38% 32%,#f0e8dc,#c8b8a4);border:2px solid #b8a894;box-shadow:0 3px 8px rgba(0,0,0,.14),inset 0 1px 3px rgba(255,255,255,.7);position:relative}
    .af-knob::after{content:'';position:absolute;top:5px;left:50%;transform:translateX(-50%);width:3px;height:6px;background:#f97316;border-radius:2px;box-shadow:0 0 5px rgba(249,115,22,.7)}
    .af-mid{position:absolute;top:50px;left:0;right:0;bottom:0;border-radius:0 0 14px 14px;display:flex;flex-direction:column;align-items:center;padding-top:8px}
    .af-slot{width:138px;height:3px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.09),rgba(0,0,0,.14),rgba(0,0,0,.09),transparent);border-radius:2px}
    .af-drawer-handle{width:76px;height:15px;margin-top:7px;background:linear-gradient(180deg,#e8d8c4,#d0bfaa);border-radius:8px;border:1px solid #c0afa0;box-shadow:0 3px 8px rgba(0,0,0,.12),inset 0 1px 3px rgba(255,255,255,.5);position:relative}
    .af-drawer-handle::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:22px;height:3px;background:rgba(0,0,0,.1);border-radius:2px}
    .af-basket{width:144px;height:88px;margin-top:6px;background:linear-gradient(160deg,#e8ddd0 0%,#d8cdc0 50%,#c8bdb0 100%);border-radius:8px 8px 14px 14px;border:1px solid #c4b4a4;border-top:2px solid #d0bfb0;box-shadow:0 6px 18px rgba(0,0,0,.11),inset 0 3px 8px rgba(0,0,0,.07);position:relative;overflow:hidden}
    .af-mesh{position:absolute;inset:7px;display:grid;grid-template-columns:repeat(10,1fr);grid-template-rows:repeat(6,1fr);gap:2px}
    .af-hole{background:rgba(0,0,0,.08);border-radius:2px;transition:background .4s,box-shadow .4s}
    .af-hole.hot{background:rgba(234,88,12,.32);box-shadow:0 0 3px rgba(234,88,12,.25)}
    .af-feet{display:flex;justify-content:space-between;width:136px;margin-top:5px}
    .af-foot{width:20px;height:9px;border-radius:0 0 5px 5px;background:linear-gradient(180deg,#d0bfb0,#a89888);border:1px solid #b8a898;box-shadow:0 3px 6px rgba(0,0,0,.15)}
    .af-heat{position:absolute;top:40px;left:50%;transform:translateX(-50%);width:140px;height:28px;pointer-events:none}
    .af-hw{position:absolute;bottom:0;width:2px;border-radius:1px;background:linear-gradient(180deg,rgba(249,115,22,.7),transparent);animation:hrise 2s ease-in-out infinite}
    @keyframes hrise{0%{height:0;opacity:0}40%{opacity:.85}100%{height:26px;opacity:0;transform:translateY(-4px) translateX(var(--dx,0px))}}
    .stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px}
    .stat{background:rgba(0,0,0,.02);border:1px solid rgba(0,0,0,.05);border-radius:12px;padding:10px 8px;text-align:center}
    .stat-val{font-size:17px;font-weight:700;color:#1a1a1a;display:block;font-family:'Lora',serif}
    .stat-key{font-size:9px;color:#aaa;text-transform:uppercase;letter-spacing:.06em;font-family:'Quicksand',sans-serif;font-weight:700}
    .progress-section{margin-bottom:14px}
    .prog-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:7px}
    .prog-label{font-size:11px;color:#aaa;font-family:'Quicksand',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.06em}
    .prog-time{font-size:11px;color:#1a1a1a;font-family:'Quicksand',sans-serif;font-weight:700}
    .progress-bar{height:4px;background:rgba(0,0,0,.07);border-radius:4px;overflow:hidden}
    .progress-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#dc2626,#f97316);transition:width .5s ease;position:relative}
    .progress-fill::after{content:'';position:absolute;right:0;top:0;bottom:0;width:30px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.4));animation:shimmer 1.5s linear infinite}
    @keyframes shimmer{0%,100%{opacity:0}50%{opacity:1}}
    .main-controls{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:8px}
    .btn{padding:10px 8px;border-radius:12px;border:1px solid rgba(0,0,0,.08);background:rgba(0,0,0,.03);color:#555;font-family:'Quicksand',sans-serif;font-size:11px;font-weight:700;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:5px}
    .btn:hover{background:rgba(0,0,0,.07);transform:translateY(-1px)}
    .btn-start{background:rgba(34,197,94,.08);border-color:rgba(34,197,94,.25);color:#15803d}
    .btn-pause{color:#b45309}.btn-resume{color:#2563eb}.btn-stop{color:#dc2626}
    .panel-overlay{position:fixed;inset:0;background:rgba(0,0,0,.35);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);z-index:100;opacity:0;pointer-events:none;transition:opacity .3s}
    .panel-overlay.visible{opacity:1;pointer-events:all}
    .config-panel{position:fixed;bottom:0;left:50%;transform:translateX(-50%) translateY(100%);width:360px;max-width:100vw;background:#f7f8f6;border:1px solid rgba(0,0,0,.07);border-radius:24px 24px 0 0;z-index:200;transition:transform .38s cubic-bezier(.32,1,.32,1);max-height:88vh;overflow:hidden;display:flex;flex-direction:column}
    .config-panel.open{transform:translateX(-50%) translateY(0)}
    .panel-handle{display:flex;flex-direction:column;align-items:center;padding:14px 22px 10px;cursor:pointer;flex-shrink:0;border-bottom:1px solid rgba(0,0,0,.06)}
    .panel-handle-bar{width:36px;height:4px;border-radius:2px;background:rgba(0,0,0,.12);margin-bottom:10px}
    .panel-handle-title{font-size:12px;font-weight:700;color:#1a1a1a;letter-spacing:.05em;font-family:'Lora',serif}
    .panel-handle-sub{font-size:10px;color:#aaa;font-family:'Quicksand',sans-serif;font-weight:600;margin-top:2px}
    .panel-scroll{overflow-y:auto;padding:6px 20px 32px;flex:1}
    .panel-scroll::-webkit-scrollbar{width:4px}
    .panel-scroll::-webkit-scrollbar-thumb{background:rgba(0,0,0,.1);border-radius:2px}
    .section-label{font-size:9px;color:#bbb;font-family:'Quicksand',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.12em;margin-bottom:8px;margin-top:18px}
    .ctrl-block{background:rgba(0,0,0,.02);border:1px solid rgba(0,0,0,.06);border-radius:16px;padding:15px 16px;margin-bottom:4px}
    .ctrl-big{font-size:36px;font-weight:700;color:#1a1a1a;font-family:'Lora',serif;line-height:1;letter-spacing:-1px;margin-bottom:12px}
    .ctrl-big small{font-size:14px;font-weight:400;color:#aaa;letter-spacing:0;margin-left:2px;font-family:'Quicksand',sans-serif}
    .presets{display:flex;gap:5px;margin-bottom:12px;flex-wrap:wrap}
    .preset{padding:4px 11px;border-radius:8px;border:1px solid rgba(0,0,0,.07);background:rgba(0,0,0,.03);color:#888;font-size:11px;font-weight:700;cursor:pointer;transition:all .18s;font-family:'Quicksand',sans-serif}
    .preset:hover{border-color:rgba(249,115,22,.35);color:#d4640a}
    .preset.active{background:rgba(249,115,22,.1);border-color:rgba(249,115,22,.4);color:#d4640a}
    .time-presets{display:flex;gap:5px;margin-bottom:12px}
    .tpreset{flex:1;padding:7px 2px;border-radius:9px;border:1px solid rgba(0,0,0,.07);background:rgba(0,0,0,.03);color:#888;font-size:10px;font-weight:700;cursor:pointer;transition:all .18s;font-family:'Quicksand',sans-serif;text-align:center;line-height:1.3}
    .tpreset span{display:block;font-size:7px;color:#ccc;font-weight:600;margin-top:1px}
    .tpreset:hover{border-color:rgba(99,102,241,.3);color:#6366f1}
    .tpreset.active{background:rgba(99,102,241,.08);border-color:rgba(99,102,241,.35);color:#4f46e5}
    .slider-wrap{position:relative;height:34px;display:flex;align-items:center}
    .slider-track{position:absolute;left:0;right:0;height:4px;background:rgba(0,0,0,.07);border-radius:4px}
    .slider-fill{height:100%;border-radius:4px}
    .slider-fill.orange{background:linear-gradient(90deg,#dc2626,#f97316)}
    .slider-fill.blue{background:linear-gradient(90deg,#4f46e5,#6366f1)}
    input[type=range]{position:relative;z-index:2;width:100%;height:4px;-webkit-appearance:none;appearance:none;background:transparent;cursor:pointer;margin:0}
    input[type=range].orange::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#f97316,#dc2626);border:3px solid #f7f8f6;box-shadow:0 0 0 2px rgba(249,115,22,.35),0 3px 8px rgba(249,115,22,.25);cursor:grab;transition:transform .15s}
    input[type=range].orange:active::-webkit-slider-thumb{cursor:grabbing;transform:scale(1.25)}
    input[type=range].blue::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#4f46e5);border:3px solid #f7f8f6;box-shadow:0 0 0 2px rgba(99,102,241,.35),0 3px 8px rgba(99,102,241,.25);cursor:grab;transition:transform .15s}
    input[type=range].blue:active::-webkit-slider-thumb{cursor:grabbing;transform:scale(1.25)}
    input[type=range].orange::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#f97316,#dc2626);border:3px solid #f7f8f6;cursor:grab}
    input[type=range].blue::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#4f46e5);border:3px solid #f7f8f6;cursor:grab}
    .slider-limits{display:flex;justify-content:space-between;margin-top:4px}
    .slider-limit{font-size:9px;color:#ccc;font-family:'Quicksand',sans-serif;font-weight:600}
    .weight-row{background:rgba(0,0,0,.02);border:1px solid rgba(0,0,0,.06);border-radius:14px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}
    .weight-left .wlabel{font-size:9px;color:#aaa;font-family:'Quicksand',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.08em}
    .weight-left .wval{font-size:20px;font-weight:700;color:#1a1a1a;font-family:'Lora',serif}
    .weight-left .wval small{font-size:10px;font-weight:400;color:#aaa;font-family:'Quicksand',sans-serif}
    .wbtns{display:flex;gap:6px}
    .wbtn{width:30px;height:30px;border-radius:9px;border:1px solid rgba(0,0,0,.08);background:rgba(0,0,0,.04);color:#555;font-size:14px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s}
    .wbtn:hover{border-color:#f97316;color:#f97316}
    .divider{height:1px;background:linear-gradient(90deg,transparent,rgba(0,0,0,.07),transparent);margin:4px 0 0}
    .chips-wrap{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}
    .chip{padding:5px 10px;border-radius:10px;border:1px solid rgba(0,0,0,.07);background:rgba(0,0,0,.02);color:#888;font-size:10px;font-weight:700;cursor:pointer;transition:all .2s;white-space:nowrap;font-family:'Quicksand',sans-serif;display:inline-flex;align-items:center;gap:5px}
    .chip.active{background:rgba(249,115,22,.1);border-color:rgba(249,115,22,.35);color:#d4640a}
    .sel-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}
    .sel-group label{font-size:9px;color:#bbb;font-family:'Quicksand',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.08em;display:block;margin-bottom:5px}
    .seg-btns{display:flex;border-radius:10px;overflow:hidden;border:1px solid rgba(0,0,0,.07)}
    .seg-btn{flex:1;padding:7px 4px;background:rgba(0,0,0,.02);color:#888;font-size:9px;font-weight:700;font-family:'Quicksand',sans-serif;border:none;cursor:pointer;transition:all .2s;border-right:1px solid rgba(0,0,0,.07);text-align:center}
    .seg-btn:last-child{border-right:none}
    .seg-btn.active{background:rgba(249,115,22,.1);color:#d4640a}
    .toggles-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
    .toggle-card{background:rgba(0,0,0,.02);border:1px solid rgba(0,0,0,.06);border-radius:12px;padding:10px 12px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;transition:all .2s}
    .toggle-card.on{border-color:rgba(249,115,22,.3);background:rgba(249,115,22,.05)}
    .toggle-left{display:flex;align-items:center;gap:7px}
    .toggle-name{font-size:10px;font-weight:700;color:#aaa;font-family:'Quicksand',sans-serif}
    .toggle-card.on .toggle-name{color:#1a1a1a}
    .toggle-pill{width:30px;height:17px;border-radius:9px;background:rgba(0,0,0,.1);position:relative;transition:all .25s;border:1px solid rgba(0,0,0,.1);flex-shrink:0}
    .toggle-card.on .toggle-pill{background:rgba(249,115,22,.75);border-color:#f97316}
    .toggle-thumb{position:absolute;top:2px;left:2px;width:11px;height:11px;border-radius:50%;background:#bbb;transition:all .25s}
    .toggle-card.on .toggle-thumb{left:15px;background:#fff}
  `; }
}

customElements.define('xiaomi-airfryer-card', XiaomiAirFryerCard);
