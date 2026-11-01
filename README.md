# 💍 Hansani & Kavindu - Luxury Wedding Invitation Website

A high-end, responsive wedding invitation website designed with modern editorial aesthetics, warm champagne gold accents, 3D interactive envelope unsealing, romantic background melody, live countdown timer, schedule of the day, photo gallery lightbox, and direct WhatsApp RSVP integration.

---

## ✨ Features (Reference එකට වඩා ලස්සනට සකසා ඇති විශේෂාංග)

1. **💌 3D Interactive Wax Seal Envelope (විවෘත කළ හැකි ආරාධනා පත්‍ර කවරය)**
   - Organic 3D burgundy wax seal with couple monogram (`H & K`).
   - Clicking the seal triggers realistic unsealing, golden sparkle burst, and 3D folding flap opening.
   - The letter slides up smoothly out of the envelope and reveals the website.
   - Includes a floating button to re-open and view the envelope again at any time.

2. **🏷️ Dynamic Guest Personalization (එක් එක් ආරාධිතයාගේ නමින්ම Invitation එක යැවීම)**
   - Supports URL query parameters:
     - `?to=Mr.+&+Mrs.+Perera`
     - `?guest=Sampath+Silva`
     - `?name=Uncle+Sunil`
   - Dynamically prints the guest's name on:
     - The wax seal envelope badge
     - The personalized welcome card
     - Pre-fills the RSVP form
     - Personalizes WhatsApp confirmation messages
   - Includes a built-in **"Guest WhatsApp Link Generator"** modal in the footer for the couple to create customized links easily.

3. **🎵 Floating Romantic Music Player & Procedural Wedding Harp**
   - Starts soft romantic music automatically once the envelope is opened.
   - Features a floating glassmorphic vinyl record player with spinning disc, audio equalizer bars, and Play/Pause control.
   - Uses Web Audio API synthesis (Canon in D / Wedding Chords) so music plays smoothly offline without any missing audio file errors, or you can drop in any MP3.

4. **🌸 Ambient Falling Petals & Stardust Canvas**
   - Gentle, lightweight 60fps canvas particles of blushing rose petals and champagne gold dust.

5. **⏳ Live Countdown Timer & Calendar Sync**
   - Real-time countdown (Days, Hours, Minutes, Seconds) counting down to **23 July 2026**.
   - **"Add to Google Calendar"** 1-click button.
   - **"Download .ICS"** file for Apple Calendar & Microsoft Outlook.

6. **📜 The Day, Beautifully Planned (Day Itinerary)**
   - Polished visual timeline incorporating Sri Lankan wedding traditions:
     - 09:15 AM: Guest Arrival & Welcome Refreshments (King Coconut)
     - 09:48 AM: Sacred Poruwa Ceremony & Auspicious Nakatha
     - 10:30 AM: Registration & Ring Exchange
     - 11:30 AM: Champagne Toast & Cake Cutting
     - 12:15 PM: Grand Lunch Banquet
     - 01:45 PM: First Dance & Live Melodies
     - 03:30 PM: Going Away & Send-off

7. **🖼️ Interactive Photo Gallery with Fullscreen Lightbox**
   - Categorized gallery: All, Pre-shoot, Moments, Venue.
   - Click to open high-resolution photo with smooth modal lightbox, caption, and zoom.

8. **📍 Venue & Navigation Guide**
   - Spotlight on **The Paradise Inn, Bolgoda Hall - Citrus Atrium**.
   - Direct "Open in Google Maps" navigation button.
   - Practical guest information (Valet parking, Uber/PickMe drop-off, Air conditioned ballroom).

9. **👗 Dress Code & Color Palette Guide**
   - Visual color palette circles: Champagne Gold, Botanical Sage, Ivory Silk, Dusty Rose, and Charcoal.

10. **💌 Interactive RSVP with Direct WhatsApp Notification**
    - Guests can confirm attendance, guest count, and meal preferences.
    - Confetti burst celebration on submit.
    - Direct **"Send RSVP via WhatsApp"** button formatted with all guest details ready to send to the couple!

11. **💬 Wishes & Blessings Guestbook Wall**
    - Guests can write heartfelt blessings that appear in real time on the guestbook wall.

---

## 🚀 How to Run Locally (ඔබගේ පරිගණකයේ Open කර බලන ආකාරය)

### Method 1: Just Double-Click
Simply double-click `index.html` in Windows Explorer to open it in Chrome, Edge, or Brave!

### Method 2: Test with Personalized Guest Name
Open in your browser with the query parameter:
```text
file:///C:/Users/User/Downloads/wedding-invitation/index.html?to=Mr.+%26+Mrs.+Perera
```

### Method 3: Using Local Server
Run with npm in the project folder:
```bash
npm start
# or
python -m http.server 8080
```
Then visit `http://localhost:8080` or `http://localhost:8080/?to=Nimal+Perera`.

---

## 🛠️ How to Customize (විස්තර වෙනස් කරගන්නේ කෙසේද?)

Open `js/wedding-data.js`. Everything is organized in one place:
- **Couple Names**: `couple.bride.fullName`, `couple.groom.fullName`
- **Wedding Date & Time**: `event.dateTimeISO`, `event.dateFormatted`, `event.timeFormatted`
- **Venue**: `venue.name`, `venue.address`, `venue.googleMapsLink`
- **WhatsApp Phone**: `rsvp.whatsappNumber` (e.g. `94771234567`)
- **Photos**: Swap images in `assets/images/` or change URLs in `wedding-data.js`

---

## 🌐 Free Hosting Options (Online දාන ආකාරය)
You can deploy this static website completely free in less than 2 minutes:
1. **GitHub Pages**: Upload repository and enable GitHub Pages under Settings.
2. **Netlify**: Drag and drop the `wedding-invitation` folder into [Netlify Drop](https://app.netlify.com/drop).
3. **Vercel**: Run `vercel` or connect your GitHub repository.

