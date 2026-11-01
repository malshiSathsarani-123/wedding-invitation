/**
 * Wedding Invitation Configuration Data
 * Couple: Hansani & Kavindu
 * Date: 23 July 2026
 * Venue: The Paradise Inn, Bolgoda Hall - Citrus Atrium
 * 
 * Edit this file to easily update names, dates, photos, venue details, and schedule!
 */

const WEDDING_DATA = {
  // Couple Information
  couple: {
    bride: {
      firstName: "Hansani",
      fullName: "Hansani Dharmasiri",
      parents: "Daughter of Mr. Nihal & Mrs. Kumari Dharmasiri",
      bio: "An architect of dreams, gentle at heart, with an eye for beauty in the simplest moments.",
      photo: "assets/images/bride.jpg"
    },
    groom: {
      firstName: "Kavindu",
      fullName: "Kavindu Wickramasinghe",
      parents: "Son of Mr. Sarath & Mrs. Nalini Wickramasinghe",
      bio: "A free-spirited soul, steadfast in love, who found his forever home in Hansani's smile.",
      photo: "assets/images/groom.jpg"
    },
    initials: "H & K",
    monogramTitle: "Hansani & Kavindu",
    invitationSubtitle: "Request the pleasure of your company to celebrate their wedding"
  },

  // Wedding Date & Time Details
  event: {
    // Target date for countdown (ISO 8601 string)
    dateTimeISO: "2026-07-23T09:30:00+05:30",
    dayName: "Thursday",
    dateFormatted: "23 July 2026",
    timeFormatted: "09:30 AM – 04:00 PM",
    rsvpDeadline: "10 July 2026",
    auspiciousTime: "09:48 AM (Auspicious Poruwa Nakatha)"
  },

  // Venue & Travel
  venue: {
    name: "The Paradise Inn",
    hall: "Bolgoda Hall – Citrus Atrium",
    address: "Rusirupaya, Bolgoda Lakefront, Piliyandala / Moratuwa, Sri Lanka",
    googleMapsLink: "https://maps.google.com/?q=The+Paradise+Inn+Bolgoda",
    directionsNote: "Located right along the serene Bolgoda Lakefront. Ample valet parking available at the grand gates.",
    parking: "Complimentary Valet & Self-Parking Available",
    landmarks: "Near Bolgoda Lake Bridge, 15 minutes from Southern Expressway Kottawa/Kahathuduwa exit"
  },

  // WhatsApp & RSVP Settings
  rsvp: {
    whatsappNumber: "94768559189",
    coupleContactName: "Hansani & Kavindu",
    contactPhone: "+94 76 855 9189",
    
    // Optional: Paste your free Google Sheets Webhook URL or Formspree URL here to automatically sync to Excel
    googleSheetsWebhookUrl: ""
  },

  // Music Soundtrack (Acoustic / Violin wedding music)
  music: {
    title: "Acoustic Wedding Serenade",
    artist: "Romantic Melodies",
    // Can be an audio URL, mp3 path, or fallback to the built-in procedural Web Audio synthesizer
    audioUrl: ""
  },

  // Love Story Milestones
  story: [
    {
      step: "01",
      year: "October 2021",
      title: "The First Hello",
      subtitle: "A Quiet Beginning",
      description: "What began as a chance encounter over evening Ceylon tea turned into hours of effortless laughter and shared dreams. By midnight, we both knew this was no ordinary meeting.",
      image: "assets/images/story-1.jpg"
    },
    {
      step: "02",
      year: "August 2022",
      title: "The First Adventure",
      subtitle: "Misty Hills & Sunsets",
      description: "From scenic train journeys through the misty hills of Ella to quiet evening walks on the sunlit southern shores, every step together reaffirmed that home was wherever we were side by side.",
      image: "assets/images/story-2.jpg"
    },
    {
      step: "03",
      year: "December 2024",
      title: "The Beautiful Yes",
      subtitle: "A Starlit Promise",
      description: "Surrounded by gently glowing lanterns and the rhythmic whisper of the ocean waves, Kavindu went down on one knee. Through tears of purest happiness, Hansani whispered 'Yes!'",
      image: "assets/images/story-3.jpg"
    },
    {
      step: "04",
      year: "23 July 2026",
      title: "Forever Begins Today",
      subtitle: "Hand in Hand, Heart in Heart",
      description: "Surrounded by our beloved families, cherished relatives, and closest friends, we take the sacred steps upon the Poruwa to unite our lives in eternal love and harmony.",
      image: "assets/images/story-4.jpg"
    }
  ],

  // Wedding Day Itinerary ("The Day, Beautifully Planned")
  itinerary: [
    {
      time: "09:15 AM",
      title: "Guests Arrival & Welcome",
      badge: "Welcome",
      description: "Warm welcome with traditional freshly chilled King Coconut water, herbal refreshments, and delightful sweetmeats.",
      icon: "sparkles"
    },
    {
      time: "09:45 AM",
      title: "Sacred Poruwa Ceremony",
      badge: "Tradition",
      description: "The couple ascends the traditional Poruwa amidst auspicious Magul Bera, Jayamangala Gatha, and blessings of parents.",
      icon: "crown"
    },
    {
      time: "10:30 AM",
      title: "Civil Registration & Rings",
      badge: "Vows",
      description: "Exchange of rings, sealing of sacred marriage vows, and signing of the marriage registry.",
      icon: "scroll"
    },
    {
      time: "11:15 AM",
      title: "Champagne Toast & Cake",
      badge: "Celebration",
      description: "Ceremonial cutting of the wedding cake accompanied by joyful champagne toasts and heartfelt speeches.",
      icon: "glass"
    },
    {
      time: "12:00 PM",
      title: "Grand Lunch Banquet",
      badge: "Feast",
      description: "An exquisite gourmet buffet featuring rich Sri Lankan delicacies and international culinary favorites.",
      icon: "utensils"
    },
    {
      time: "01:30 PM",
      title: "First Dance & Celebrations",
      badge: "Romance",
      description: "The newlyweds take the floor for their romantic first dance, followed by music, laughter, and photo memories.",
      icon: "music"
    },
    {
      time: "03:30 PM",
      title: "Going Away & Send-off",
      badge: "Blessings",
      description: "The couple bids a grateful farewell to their honored guests with tokens of appreciation and warm blessings.",
      icon: "heart"
    }
  ],

  // Dress Code Guide
  dressCode: {
    theme: "Traditional Formal / Elegant Lounge",
    note: "We encourage our guests to dress in graceful traditional attire (Saree / Osari / National) or refined lounge suits. Soft champagne, botanical sage, and warm neutral tones harmonize beautifully with our celebration.",
    palettes: [
      { name: "Champagne Gold", hex: "#D4AF37", border: "#B8972E" },
      { name: "Botanical Sage", hex: "#7D8C75", border: "#687661" },
      { name: "Ivory Silk", hex: "#FDFBF7", border: "#E6DEC9" },
      { name: "Dusty Rose", hex: "#C89595", border: "#B07D7D" },
      { name: "Warm Sand", hex: "#E0D5C1", border: "#C7B9A0" }
    ]
  },

  // Photo Gallery
  gallery: [
    {
      title: "Sunset Whispers",
      category: "preshoot",
      caption: "Golden hour along the southern coastline",
      src: "assets/images/gallery-1.jpg"
    },
    {
      title: "Serenade by the Shore",
      category: "preshoot",
      caption: "Gentle ocean breeze and quiet promises",
      src: "assets/images/gallery-2.jpg"
    },
    {
      title: "The Golden Ring",
      category: "moments",
      caption: "A promise of eternal companionship",
      src: "assets/images/gallery-3.jpg"
    },
    {
      title: "Laughter in Ella",
      category: "moments",
      caption: "Cherished memories amidst the green hills",
      src: "assets/images/gallery-4.jpg"
    },
    {
      title: "Bolgoda Lakefront",
      category: "venue",
      caption: "The peaceful waters and lush lawn of our venue",
      src: "assets/images/gallery-5.jpg"
    },
    {
      title: "Citrus Atrium Ballroom",
      category: "venue",
      caption: "Gilded chandeliers and floral arches prepared for you",
      src: "assets/images/gallery-6.jpg"
    }
  ],

  // Wishing Well / Gift Note
  giftNote: {
    title: "Wishing Well",
    message: "Your loving presence and heartfelt blessings on our wedding day are the greatest gifts we could ever ask for. Should you desire to honor us with a gift, a wishing well will be placed at the reception to help us build our new home together."
  },

  // Sample Wishes Pre-seeded
  initialWishes: [
    {
      name: "Dharmasiri Family",
      relation: "Bride's Family",
      message: "May your journey together be blessed with endless happiness, health, and everlasting love. We are so proud of you both!",
      date: "Just now"
    },
    {
      name: "Dr. Asela & Chamari",
      relation: "Close Friends",
      message: "Congratulations Kavindu & Hansani! You two are truly made for each other. Can't wait to celebrate the big day at Bolgoda!",
      date: "1 hour ago"
    },
    {
      name: "Uncle Sarath & Aunty Mala",
      relation: "Relatives",
      message: "Suba Mangalam! May the Triple Gem bless your union with peace, abundance, and eternal joy.",
      date: "Yesterday"
    }
  ]
};

// Export to window scope for standard scripts
if (typeof window !== "undefined") {
  window.WEDDING_DATA = WEDDING_DATA;
}

