/**
 * Hansani & Kavindu - Luxury Wedding Invitation Engine
 * Handles 3D Envelope, Audio Player, Web Audio Harp Synthesizer,
 * Live Countdown, Calendar Exports, Gallery Lightbox, RSVP, WhatsApp sender, and Petals Canvas.
 */

document.addEventListener("DOMContentLoaded", () => {
  const data = window.WEDDING_DATA;
  if (!data) {
    console.error("Wedding data not loaded!");
    return;
  }

  // ============================================================
  // 1. URL PARAMETERS (PERSONALIZED GUEST INVITATION)
  // ============================================================
  const urlParams = new URLSearchParams(window.location.search);
  const guestParam = urlParams.get("to") || urlParams.get("guest") || urlParams.get("name") || "";
  const guestName = guestParam.trim();

  // Populate guest name across elements
  const envelopeGuestEl = document.getElementById("envelope-guest-name");
  const honorGuestNameEl = document.getElementById("honor-guest-name");
  const rsvpNameInput = document.getElementById("rsvp-name");

  if (guestName) {
    if (envelopeGuestEl) envelopeGuestEl.textContent = guestName;
    if (honorGuestNameEl) honorGuestNameEl.textContent = guestName;
    if (rsvpNameInput) rsvpNameInput.value = guestName;
  } else {
    if (envelopeGuestEl) envelopeGuestEl.textContent = "Honored Guest";
    if (honorGuestNameEl) honorGuestNameEl.textContent = "Honored Guest";
  }

  // ============================================================
  // 2. ROMANTIC PROCEDURAL WEB AUDIO SYNTHESIZER & SOUNDTRACK
  // ============================================================
  let audioContext = null;
  let synthInterval = null;
  let isPlaying = false;
  let customAudioEl = null;

  // Romantic acoustic chord progression (Canon in D / Wedding Chords in D major)
  // D -> A -> Bm -> F#m -> G -> D -> G -> A
  const chords = [
    [146.83, 220.00, 293.66, 369.99, 440.00, 587.33], // D maj (D3, A3, D4, F#4, A4, D5)
    [110.00, 220.00, 277.18, 329.63, 440.00, 554.37], // A maj (A2, A3, C#4, E4, A4, C#5)
    [123.47, 185.00, 246.94, 293.66, 369.99, 493.88], // B min (B2, F#3, B3, D4, F#4, B4)
    [92.50,  185.00, 220.00, 277.18, 369.99, 440.00], // F# min
    [98.00,  146.83, 196.00, 246.94, 293.66, 392.00], // G maj
    [146.83, 220.00, 293.66, 369.99, 440.00, 587.33], // D maj
    [98.00,  146.83, 196.00, 246.94, 293.66, 392.00], // G maj
    [110.00, 164.81, 220.00, 277.18, 329.63, 440.00]  // A maj
  ];

  let currentChordIndex = 0;
  let arpeggioStep = 0;

  function initAudioContext() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();
    }
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
  }

  function playHarpNote(freq, timeOffset = 0, duration = 2.4) {
    if (!audioContext) return;
    const now = audioContext.currentTime + timeOffset;

    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Gentle warm tone using sine + harmonic triangle
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    // Warm envelope
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.08, now + 0.05); // soft pluck
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gainNode);
    gainNode.connect(audioContext.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  function startProceduralMelody() {
    initAudioContext();
    if (synthInterval) clearInterval(synthInterval);

    // Play an arpeggio note every 450ms
    synthInterval = setInterval(() => {
      if (!isPlaying || !audioContext) return;

      const chord = chords[currentChordIndex];
      const noteFreq = chord[arpeggioStep % chord.length];

      // Add gentle octave shimmer occasionally
      playHarpNote(noteFreq, 0, 2.6);

      if (arpeggioStep % 4 === 0) {
        // Bass root note
        playHarpNote(chord[0] / 2, 0, 3.2);
      }

      arpeggioStep++;
      if (arpeggioStep >= chord.length) {
        arpeggioStep = 0;
        currentChordIndex = (currentChordIndex + 1) % chords.length;
      }
    }, 450);
  }

  function stopProceduralMelody() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  function playChimeSound() {
    try {
      initAudioContext();
      const chimeNotes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      chimeNotes.forEach((freq, idx) => {
        playHarpNote(freq, idx * 0.08, 1.8);
      });
    } catch (e) {
      console.log("Audio preview not available yet.");
    }
  }

  // Audio Player UI Controller
  const vinylDisk = document.getElementById("vinyl-disk");
  const eqBars = document.getElementById("equalizer-bars");
  const audioStateText = document.getElementById("audio-state-text");
  const audioToggleBtn = document.getElementById("floating-audio-toggle");

  function startMusic() {
    isPlaying = true;
    if (data.music && data.music.audioUrl) {
      if (!customAudioEl) {
        customAudioEl = new Audio(data.music.audioUrl);
        customAudioEl.loop = true;
      }
      customAudioEl.play().catch(() => startProceduralMelody());
    } else {
      startProceduralMelody();
    }

    if (vinylDisk) vinylDisk.classList.add("playing");
    if (eqBars) eqBars.classList.add("playing");
    if (audioStateText) audioStateText.textContent = "Playing Romantic Melody";
  }

  function pauseMusic() {
    isPlaying = false;
    if (customAudioEl) customAudioEl.pause();
    stopProceduralMelody();

    if (vinylDisk) vinylDisk.classList.remove("playing");
    if (eqBars) eqBars.classList.remove("playing");
    if (audioStateText) audioStateText.textContent = "Music Paused";
  }

  function toggleMusic() {
    if (isPlaying) {
      pauseMusic();
    } else {
      startMusic();
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener("click", toggleMusic);
  }

  // ============================================================
  // 3. INTERACTIVE 3D ENVELOPE UNSEALING & OPENING
  // ============================================================
  const envelopeScreen = document.getElementById("envelope-screen");
  const envelopeContainer = document.getElementById("envelope-container");
  const waxSealBtn = document.getElementById("wax-seal-wrapper");
  const openEnvelopeBtn = document.getElementById("btn-open-envelope");
  const reopenEnvelopeBtn = document.getElementById("floating-reopen-envelope");

  function openEnvelope() {
    if (!envelopeContainer) return;
    
    // Play celebratory sound & start romantic melody
    playChimeSound();
    startMusic();

    // Trigger visual unsealing & 3D opening
    envelopeContainer.classList.add("is-open");

    // Spawn golden wax crack sparkles
    if (typeof confetti === "function") {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.55 },
        colors: ["#D4AF37", "#FBF5B7", "#C5A059", "#962D22"]
      });
    }

    // After animation, fade screen to reveal website
    setTimeout(() => {
      if (envelopeScreen) {
        envelopeScreen.classList.add("opened");
        document.body.style.overflow = "auto";
      }
    }, 1250);
  }

  if (waxSealBtn) waxSealBtn.addEventListener("click", openEnvelope);
  if (openEnvelopeBtn) openEnvelopeBtn.addEventListener("click", openEnvelope);

  if (reopenEnvelopeBtn) {
    reopenEnvelopeBtn.addEventListener("click", () => {
      if (envelopeScreen && envelopeContainer) {
        envelopeContainer.classList.remove("is-open");
        envelopeScreen.classList.remove("opened");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  // ============================================================
  // 4. LIVE COUNTDOWN TIMER
  // ============================================================
  const targetDate = new Date(data.event.dateTimeISO).getTime();
  const daysEl = document.getElementById("countdown-days");
  const hoursEl = document.getElementById("countdown-hours");
  const minsEl = document.getElementById("countdown-mins");
  const secsEl = document.getElementById("countdown-secs");

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minsEl) minsEl.textContent = "00";
      if (secsEl) secsEl.textContent = "00";
      const countSubtitle = document.getElementById("countdown-subtitle");
      if (countSubtitle) countSubtitle.textContent = "Today We Celebrate Forever!";
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, "0");
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ============================================================
  // 5. CALENDAR EXPORT (GOOGLE CALENDAR & .ICS FILE)
  // ============================================================
  const btnGoogleCal = document.getElementById("btn-google-calendar");
  const btnIcsCal = document.getElementById("btn-ics-calendar");

  const calTitle = encodeURIComponent(`Wedding of Hansani & Kavindu`);
  const calDesc = encodeURIComponent(`We are delighted to celebrate our wedding day with you!\nVenue: ${data.venue.name}, ${data.venue.hall}\nDetails: ${window.location.href}`);
  const calLocation = encodeURIComponent(`${data.venue.name}, ${data.venue.address}`);
  // 2026-07-23 09:30 AM to 04:00 PM (+05:30) -> 04:00 to 10:30 UTC
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&dates=20260723T040000Z/20260723T103000Z&details=${calDesc}&location=${calLocation}`;

  if (btnGoogleCal) {
    btnGoogleCal.href = googleCalUrl;
    btnGoogleCal.target = "_blank";
  }

  if (btnIcsCal) {
    btnIcsCal.addEventListener("click", (e) => {
      e.preventDefault();
      const icsContent = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Hansani and Kavindu//Wedding Invitation//EN",
        "BEGIN:VEVENT",
        "UID:wedding-hansani-kavindu-20260723",
        "DTSTAMP:20260723T040000Z",
        "DTSTART:20260723T040000Z",
        "DTEND:20260723T103000Z",
        `SUMMARY:Wedding of Hansani & Kavindu`,
        `DESCRIPTION:Celebrating the wedding of Hansani and Kavindu at ${data.venue.name}`,
        `LOCATION:${data.venue.name}, ${data.venue.address}`,
        "STATUS:CONFIRMED",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", "Hansani-Kavindu-Wedding.ics");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // ============================================================
  // 6. GALLERY & LIGHTBOX
  // ============================================================
  const galleryFilters = document.querySelectorAll(".gallery-filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item-card");
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");

  galleryFilters.forEach(btn => {
    btn.addEventListener("click", () => {
      galleryFilters.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.filter;

      galleryItems.forEach(item => {
        if (category === "all" || item.dataset.category === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const caption = item.querySelector(".gallery-item-caption");
      if (lightboxImg && img) lightboxImg.src = img.src;
      if (lightboxCaption && caption) lightboxCaption.textContent = caption.textContent;
      if (lightboxModal) lightboxModal.classList.add("is-active");
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      if (lightboxModal) lightboxModal.classList.remove("is-active");
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove("is-active");
      }
    });
  }

  // ============================================================
  // 7. INTERACTIVE RSVP FORM & WHATSAPP GENERATION
  // ============================================================
  const rsvpForm = document.getElementById("wedding-rsvp-form");
  const rsvpSuccessAlert = document.getElementById("rsvp-success-alert");
  const rsvpWhatsappLink = document.getElementById("rsvp-whatsapp-link");
  const radioPills = document.querySelectorAll(".rsvp-radio-pill");

  radioPills.forEach(pill => {
    pill.addEventListener("click", () => {
      radioPills.forEach(p => p.classList.remove("selected"));
      pill.classList.add("selected");
      const radio = pill.querySelector("input[type='radio']");
      if (radio) radio.checked = true;
    });
  });

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("rsvp-name").value.trim() || "Honored Guest";
      const attendance = document.querySelector("input[name='attendance']:checked")?.value || "attending";
      const guestCount = document.getElementById("rsvp-guests")?.value || "1";
      const meal = document.getElementById("rsvp-meal")?.value || "Sri Lankan Festive Buffet";
      const message = document.getElementById("rsvp-message")?.value.trim() || "Warmest congratulations on your wedding!";

      const isAttending = attendance === "attending";
      const attendanceText = isAttending ? "Joyfully Accepting (සහභාගී වෙමි) ✨" : "Regretfully Declining (සහභාගී විය නොහැක)";

      // Save RSVP to Local Database (LocalStorage)
      const rsvpEntry = {
        id: "rsvp_" + Date.now(),
        date: new Date().toLocaleString(),
        name: name,
        attendance: isAttending ? "Attending" : "Declined",
        guestCount: isAttending ? guestCount : "0",
        meal: isAttending ? meal : "-",
        message: message
      };

      const existingRsvps = JSON.parse(localStorage.getItem("wedding_all_rsvps") || "[]");
      existingRsvps.unshift(rsvpEntry);
      localStorage.setItem("wedding_all_rsvps", JSON.stringify(existingRsvps));

      // Optional: Send to Google Sheets Webhook if configured
      if (data.rsvp && data.rsvp.googleSheetsWebhookUrl) {
        fetch(data.rsvp.googleSheetsWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(rsvpEntry),
          mode: "no-cors"
        }).catch(err => console.log("Google Sheets sync skipped:", err));
      }

      // Format WhatsApp text
      const waText = encodeURIComponent(
        `👰🤵 *Wedding of Hansani & Kavindu - RSVP Confirmation*\n\n` +
        `👤 *Guest Name:* ${name}\n` +
        `💌 *Attendance:* ${attendanceText}\n` +
        (isAttending ? `👥 *Number of Guests:* ${guestCount}\n🍽️ *Meal Choice:* ${meal}\n` : "") +
        `💬 *Blessings / Wish:* "${message}"\n\n` +
        `📅 Date: 23 July 2026\n📍 Venue: The Paradise Inn, Bolgoda`
      );

      const waUrl = `https://wa.me/${data.rsvp.whatsappNumber}?text=${waText}`;

      // Update WhatsApp button link
      if (rsvpWhatsappLink) {
        rsvpWhatsappLink.href = waUrl;
      }

      if (rsvpSuccessAlert) {
        rsvpSuccessAlert.style.display = "block";
        rsvpSuccessAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      // Add wish to Guestbook if message provided
      if (message) {
        addWishToWall(name, isAttending ? "Guest" : "Warm Wishes", message, "Just now");
      }

      // Celebratory Confetti Burst
      if (typeof confetti === "function") {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#D4AF37", "#FBF5B7", "#C5A059", "#25D366"]
        });
      }

      // Refresh Admin Dashboard stats if open
      renderAdminRsvps();
    });
  }

  // ============================================================
  // 8. BLESSINGS GUESTBOOK WALL
  // ============================================================
  const wishesListContainer = document.getElementById("wishes-wall-container");

  function addWishToWall(name, relation, message, dateStr) {
    if (!wishesListContainer) return;
    const card = document.createElement("div");
    card.className = "wish-card";
    card.innerHTML = `
      <div class="wish-card-header">
        <span class="wish-author">${escapeHtml(name)} <small style="font-weight:400; font-size:0.75rem; color:var(--color-gold-600)">• ${escapeHtml(relation)}</small></span>
        <span class="wish-time">${escapeHtml(dateStr)}</span>
      </div>
      <p class="wish-message">"${escapeHtml(message)}"</p>
    `;
    wishesListContainer.prepend(card);
  }

  // Pre-seed initial wishes from data
  if (data.initialWishes && data.initialWishes.length > 0 && wishesListContainer) {
    data.initialWishes.forEach(item => {
      addWishToWall(item.name, item.relation, item.message, item.date);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ============================================================
  // 9. PERSONALIZED LINK CREATOR MODAL (FOR THE COUPLE)
  // ============================================================
  const linkModal = document.getElementById("link-generator-modal");
  const openLinkModalBtn = document.getElementById("btn-open-link-generator");
  const closeLinkModalBtn = document.getElementById("close-link-generator");
  const guestInput = document.getElementById("gen-guest-name");
  const linkOutput = document.getElementById("gen-link-output");
  const copyLinkBtn = document.getElementById("btn-copy-gen-link");
  const shareWaBtn = document.getElementById("btn-share-gen-wa");

  function updateGeneratedLink() {
    const name = guestInput ? guestInput.value.trim() : "";
    const baseUrl = window.location.origin + window.location.pathname;
    const finalUrl = name ? `${baseUrl}?to=${encodeURIComponent(name)}` : baseUrl;

    if (linkOutput) linkOutput.textContent = finalUrl;

    if (shareWaBtn) {
      const waMsg = encodeURIComponent(
        `Dear ${name || "Friend"},\n\n` +
        `With joyous hearts, Hansani & Kavindu invite you to share in the celebration of their wedding on 23 July 2026.\n\n` +
        `Please open your personalized invitation here:\n${finalUrl}\n\n` +
        `With love,\nHansani & Kavindu`
      );
      shareWaBtn.href = `https://wa.me/?text=${waMsg}`;
    }
  }

  if (openLinkModalBtn) {
    openLinkModalBtn.addEventListener("click", () => {
      if (linkModal) linkModal.classList.add("is-active");
      updateGeneratedLink();
    });
  }

  if (closeLinkModalBtn) {
    closeLinkModalBtn.addEventListener("click", () => {
      if (linkModal) linkModal.classList.remove("is-active");
    });
  }

  if (guestInput) {
    guestInput.addEventListener("input", updateGeneratedLink);
  }

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", () => {
      const url = linkOutput ? linkOutput.textContent : "";
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          const originalText = copyLinkBtn.textContent;
          copyLinkBtn.textContent = "Copied to Clipboard! ✓";
          setTimeout(() => { copyLinkBtn.textContent = originalText; }, 2000);
        });
      }
    });
  }

  // ============================================================
  // 10. AMBIENT PETALS & GOLD STARDUST CANVAS
  // ============================================================
  const canvas = document.getElementById("particles-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 28;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 4 + 2,
        speedY: Math.random() * 0.8 + 0.4,
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 1.5 - 0.75,
        type: Math.random() > 0.5 ? "petal" : "dust",
        color: Math.random() > 0.5 ? "rgba(212, 175, 55, 0.45)" : "rgba(244, 218, 222, 0.55)"
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.6 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === "petal") {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 1.6, p.radius * 0.9, 0, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.radius * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(212, 175, 55, 0.6)";
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#D4AF37";
          ctx.fill();
        }

        ctx.restore();
      });

      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }

  // ============================================================
  // 11. RSVP ADMIN DASHBOARD & EXCEL/CSV EXPORTER
  // ============================================================
  const adminModal = document.getElementById("rsvp-admin-modal");
  const openAdminBtn = document.getElementById("btn-open-rsvp-admin");
  const closeAdminBtn = document.getElementById("close-rsvp-admin");
  const adminTableBody = document.getElementById("admin-rsvp-table-body");
  const exportCsvBtn = document.getElementById("btn-export-rsvps-csv");
  const clearRsvpsBtn = document.getElementById("btn-clear-rsvps");

  const statTotalEl = document.getElementById("stat-total-rsvps");
  const statAttendingEl = document.getElementById("stat-attending-guests");
  const statDeclinedEl = document.getElementById("stat-declined-rsvps");

  function getStoredRsvps() {
    return JSON.parse(localStorage.getItem("wedding_all_rsvps") || "[]");
  }

  function renderAdminRsvps() {
    if (!adminTableBody) return;
    const rsvps = getStoredRsvps();

    let totalAttendingCount = 0;
    let declinedCount = 0;

    rsvps.forEach(r => {
      if (r.attendance === "Attending") {
        totalAttendingCount += parseInt(r.guestCount || "1", 10) || 1;
      } else {
        declinedCount++;
      }
    });

    if (statTotalEl) statTotalEl.textContent = rsvps.length;
    if (statAttendingEl) statAttendingEl.textContent = totalAttendingCount;
    if (statDeclinedEl) statDeclinedEl.textContent = declinedCount;

    if (rsvps.length === 0) {
      adminTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 24px; color: var(--color-text-light);">
            No RSVPs received yet. Submit a response on the form to test!
          </td>
        </tr>
      `;
      return;
    }

    adminTableBody.innerHTML = rsvps.map(r => `
      <tr style="border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
        <td style="padding: 10px 12px; font-size: 0.82rem; white-space: nowrap;">${escapeHtml(r.date)}</td>
        <td style="padding: 10px 12px; font-weight: 600;">${escapeHtml(r.name)}</td>
        <td style="padding: 10px 12px;">
          <span style="display: inline-block; padding: 3px 8px; border-radius: 9999px; font-size: 0.72rem; font-weight: 600; background: ${r.attendance === "Attending" ? "#E8F5E9; color: #2E7D32" : "#FFEBEE; color: #C62828"};">
            ${escapeHtml(r.attendance)}
          </span>
        </td>
        <td style="padding: 10px 12px; text-align: center; font-weight: 700;">${escapeHtml(r.guestCount)}</td>
        <td style="padding: 10px 12px; font-size: 0.85rem;">${escapeHtml(r.meal)}</td>
        <td style="padding: 10px 12px; font-size: 0.85rem; max-width: 200px; font-style: italic;">"${escapeHtml(r.message || "-")}"</td>
      </tr>
    `).join("");
  }

  if (openAdminBtn) {
    openAdminBtn.addEventListener("click", () => {
      renderAdminRsvps();
      if (adminModal) adminModal.classList.add("is-active");
    });
  }

  if (closeAdminBtn) {
    closeAdminBtn.addEventListener("click", () => {
      if (adminModal) adminModal.classList.remove("is-active");
    });
  }

  if (exportCsvBtn) {
    exportCsvBtn.addEventListener("click", () => {
      const rsvps = getStoredRsvps();
      if (rsvps.length === 0) {
        alert("No RSVPs to export yet!");
        return;
      }

      // Add UTF-8 BOM so Excel opens Sinhala & Unicode characters correctly
      let csvContent = "\uFEFFDate & Time,Guest Name,Status,Number of Guests,Meal Preference,Blessings / Wishes\r\n";
      
      rsvps.forEach(r => {
        const row = [
          `"${r.date.replace(/"/g, '""')}"`,
          `"${r.name.replace(/"/g, '""')}"`,
          `"${r.attendance.replace(/"/g, '""')}"`,
          `"${r.guestCount}"`,
          `"${r.meal.replace(/"/g, '""')}"`,
          `"${(r.message || "").replace(/"/g, '""')}"`
        ];
        csvContent += row.join(",") + "\r\n";
      });

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Wedding-RSVPs-Hansani-Kavindu-${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  if (clearRsvpsBtn) {
    clearRsvpsBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to clear all stored RSVP records?")) {
        localStorage.removeItem("wedding_all_rsvps");
        renderAdminRsvps();
      }
    });
  }

  // Header scroll appearance
  const nav = document.querySelector(".site-nav");
  window.addEventListener("scroll", () => {
    if (nav) {
      if (window.scrollY > 80) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }
  });
});

