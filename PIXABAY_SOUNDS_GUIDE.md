# Pixabay Achtergrondgeluiden Gids voor Meditatie App

## Overzicht
Deze gids helpt je bij het downloaden van gratis achtergrondgeluiden van Pixabay voor verschillende meditatie types.

## Benodigde Bestanden per Meditatie Type

### 1. Sleep Meditatie
**Bestanden om te downloaden:**
- `white-noise.mp3` - Voor diepe slaap
- Zoek op Pixabay: https://pixabay.com/sound-effects/search/white-noise/
- Aanbevolen: lange tracks (10+ minuten) met zachte white noise

### 2. Stress Relief Meditatie  
**Bestanden om te downloaden:**
- `wind-chimes.mp3` - Voor ontspanning
- `stream.mp3` - Voor natuurlijke kalmte
- Zoek op Pixabay: 
  - https://pixabay.com/sound-effects/search/wind-chimes/
  - https://pixabay.com/sound-effects/search/stream/

### 3. Focus Meditatie
**Bestanden om te downloaden:**
- `singing-bowls.mp3` - Voor concentratie
- Zoek op Pixabay: https://pixabay.com/sound-effects/search/singing-bowl/
- Aanbevolen: Tibetaanse klankschalen met langzame, diepe tonen

### 4. Anxiety Relief Meditatie
**Bestanden om te downloaden:**
- `heartbeat.mp3` - Voor grounding
- Zoek op Pixabay: https://pixabay.com/sound-effects/search/heartbeat/
- Aanbevolen: Langzame, rustgevende hartslag (60-80 BPM)

### 5. Energy Meditatie
**Bestanden om te downloaden:**
- `birds.mp3` - Voor energie en vitaliteit
- Zoek op Pixabay: https://pixabay.com/sound-effects/search/birds/
- Aanbevolen: Ochtendvogels, niet te druk

## Download Instructies

### Stap 1: Bezoek Pixabay
1. Ga naar de hierboven genoemde links
2. Zoek naar de beste match voor je meditatie type
3. Let op de duur (minimaal 5-10 minuten aanbevolen)

### Stap 2: Download Process
1. Klik op het gewenste geluid
2. Klik op "Free Download"
3. Selecteer MP3 formaat
4. Download het bestand

### Stap 3: Bestand Naam en Locatie
1. Hernoem het bestand naar de exacte naam hierboven (bijv. `white-noise.mp3`)
2. Plaats het bestand in de `/mnt/c/Meditation/assets/` map

## Kwaliteitscriteria

### Voor Alle Geluiden:
- **Formaat**: MP3
- **Duur**: Minimaal 5-10 minuten (ideaal 15+ minuten)
- **Kwaliteit**: Minimaal 128kbps
- **Volume**: Consistent niveau, geen plotselinge pieken
- **Loop**: Moet naadloos kunnen herhalen

### Type-specifieke Criteria:

#### Sleep Geluiden:
- Zeer laag, constant volume
- Geen abrupte veranderingen
- Monotone, herhalende patronen

#### Stress Relief Geluiden:
- Zacht, natuurlijk klinkend
- Geen scherpe of plotselinge geluiden
- Rustgevende, voorspelbare patronen

#### Focus Geluiden:
- Minimalistisch, niet afleidend
- Langzame, diepe tonen
- Helpt bij concentratie zonder dominant te zijn

#### Anxiety Relief Geluiden:
- Zeer zacht en geruststellend
- Langzame, voorspelbare patronen
- Geen verrassende elementen

#### Energy Geluiden:
- Opwekkend maar niet overweldigend
- Natuurlijke, levendige geluiden
- Positieve, opbeurende sfeer

## Technische Implementatie

Na het downloaden van de bestanden:

1. **Plaats bestanden** in `/mnt/c/Meditation/assets/`
2. **Controleer backend** - zorg dat FFmpeg toegang heeft tot de nieuwe bestanden
3. **Test elk geluid** - genereer een test meditatie voor elk type
4. **Pas volume aan** indien nodig in de FFmpeg instellingen

## Backup Opties

Als een specifiek geluid niet beschikbaar is op Pixabay:

- **Freesound.org** - Alternatieve bron voor geluidseffecten
- **Zapsplat.com** - Professionele geluidsbibliotheek
- **BBC Sound Effects** - Gratis geluidseffecten bibliotheek

## Problemen Oplossen

### Geluid is te kort:
- Zoek naar langere versies
- Gebruik audio editing software om loops te maken

### Geluid is te luid/zacht:
- Pas de volume instellingen aan in `backend/routes/meditation.js`
- Zoek regel: `[1:a]volume=0.10[a1]` en pas de waarde aan

### Geluid loopt niet goed:
- Controleer of het bestand naadloos kan herhalen
- Zoek naar "seamless loop" versies

## Huidige Status

✅ **Geïmplementeerd**:
- Intelligente achtergrond suggesties per meditatie type
- UI aanpassingen voor nieuwe geluiden
- Meertalige ondersteuning voor nieuwe achtergrond namen

🔄 **Volgende stappen**:
1. Download de bovenstaande bestanden van Pixabay
2. Plaats ze in de assets map
3. Test elke meditatie type met de nieuwe geluiden
4. Pas volume instellingen aan indien nodig

## Licentie Informatie

Alle geluiden van Pixabay zijn:
- **Gratis voor commercieel gebruik**
- **Geen attributie vereist**
- **Wereldwijde licentie**
- **Geen copyright beperkingen**

Zorg ervoor dat je de licentie informatie controleert bij het downloaden van elk bestand.