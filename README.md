🍟 Xiaomi Air Fryer – Custom Lovelace Card
Card custom pentru Home Assistant cu design 3D animat, pentru Xiaomi Smart Air Fryer (careli MAF10A) prin integrarea XiaomiAirFryer.
Show Image

Instalare
1. Copiază fișierul
/config/www/xiaomi-airfryer-card.js
2. Adaugă resursa în HA
Settings → Dashboards → Resources → Add resource
CâmpValoareURL/local/xiaomi-airfryer-card.jsResource typeJavaScript module
3. Adaugă cardul în Lovelace
yamltype: custom:xiaomi-airfryer-card
device: careli_maf10a_1c99

Înlocuiește careli_maf10a_1c99 cu prefixul entităților tale.


Cerințe

Integrarea XiaomiAirFryer instalată și configurată
Home Assistant 2023.x+


Entități folosite
Cardul detectează automat toate entitățile pe baza prefixului device:
EntitateRolsensor.*_air_fryerStatus (Cooking / Standby / Pause...)sensor.*_left_timeTimp rămas (min)number.*_target_temperatureTemperatură țintă (40–230°C)number.*_target_timeTimp gătire (1–1440 min)select.*_modeProgram (French Fries, Chicken, Steak...)select.*_textureTextură (Crispy / Tender / Degrease)select.*_target_cooking_measureCantitate (1L / 2L / Half / Full)select.*_turn_potÎntoarce coșulswitch.*_preheatPreîncălzireswitch.*_auto_keep_warmAuto Keep Warmswitch.*_current_keep_warmCurrent Keep Warmswitch.*_turn_pot_configTurn Pot Configbutton.*_start_cookStart gătirebutton.*_pausePauzăbutton.*_resume_cookReia gătireabutton.*_cancel_cookingStop / Anulare

Features

🍟 Model 3D animat al air fryerului (CSS pur)
🔥 Mesh animat cu puncte portocalii când e activ
📊 Stats — temperatură, timp rămas
⏱ Progress bar cu timp rămas
⚙️ Panou de configurare care apare la click pe dispozitiv (slide-up)
🎛 Toate programele disponibile ca chips selectabile
🔘 Toggles pentru preîncălzire, keep warm, întoarcere coș
▶️ Butoane Start / Pauză / Reia / Stop
