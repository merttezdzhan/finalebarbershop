// ==========================================================================
// FINALE BARBERSHOP - MAIN CLIENT APPLICATION JAVASCRIPT
// ==========================================================================

const BARBER_EMAIL = "Habapli7@gmail.com";
const CLOUD_DB_ID = "ff808181a04ccf2d01a04e6c4e940c70";
const CLOUD_DB_URL = `https://api.restful-api.dev/objects/${CLOUD_DB_ID}`;

// Global App State
let currentLang = 'de';
let allExistingAppointments = [];
let salonSettings = {
    isOpen: true,
    openHour: "09:00",
    closeHour: "19:00"
};

// Multilingual Translation Dictionaries
const translations = {
    de: {
        docTitle: "Finale Barbershop | M\u00f6rfelden-Walldorf",
        navHome: "Startseite",
        navAbout: "\u00dcber Uns",
        navServices: "Preise & Pakete",
        navContact: "Kontakt & Anfahrt",
        navBookBtn: "Termin Buchen",
        navBooking: "Termin Buchen",
        walkInBadge: "Ohne Termin m\u00f6glich",
        heroTitle: "Perfekter Cut & <span class=\"gold-gradient\">Pr\u00e4zise Bartpflege</span>",
        heroSubtitle: "Willkommen bei Finale Barbershop in M\u00f6rfelden-Walldorf. Wir bieten Ihnen professionelle Herrenhaarschnitte, moderne Fades und erstklassiges Styling in entspannter Atmosph\u00e4re.",
        heroBookBtn: "Online Termin Buchen",
        stat1Title: "Professionelle Fades",
        stat1Sub: "\u00dcberg\u00e4nge & Styles",
        stat2Title: "Ohne Termin",
        stat2Sub: "Einfach vorbeikommen",
        statusChecking: "Status wird gepr\u00fcft...",
        statusOpen: "Jetzt Ge\u00f6ffnet \u2013 Herzlich Willkommen!",
        statusClosed: "Derzeit Geschlossen",
        hoursMonFri: "Mo - Fr:",
        hoursSat: "Samstag:",
        hoursSun: "Sonntag:",
        hoursClosed: "Geschlossen",
        aboutTag: "\u00dcBER UNSEREN SALON",
        aboutTitle: "Finale Barbershop \u2013 Tradition trifft auf modernen Style",
        aboutDesc1: "In der Westendstra\u00dfe 3 in M\u00f6rfelden-Walldorf bieten wir mehr als nur Haarschnitte \u2013 wir bieten ein erstklassiges Pflegeritual f\u00fcr den modernen Mann.",
        aboutDesc2: "Egal ob pr\u00e4ziser Skin Fade, klassischer Faconschnitt oder konturenscharfe Bartpflege mit Hot-Towel Behandlung: Bei uns stehen h\u00f6chste Pr\u00e4zision und Ihre Kundenzufriedenheit an erster Stelle.",
        feat1Title: "Pr\u00e4zise Fades & Schnitte",
        feat1Desc: "Saubere \u00dcberg\u00e4nge ma\u00dfgeschneidert auf Ihre Kopfform.",
        feat2Title: "Traditionelle Bartpflege",
        feat2Desc: "Rasur, Konturen und wohltuende Pflegeprodukte.",
        feat3Title: "Spontan oder mit Termin",
        feat3Desc: "Online buchen, anrufen oder einfach vorbeikommen.",
        servicesTag: "ANGEBOT & LEISTUNGEN",
        servicesTitle: "Unsere Preise & Spezial-Pakete",
        servicesSub: "Erstklassige Qualit\u00e4t zu fairen Preisen. W\u00e4hlen Sie Ihre gew\u00fcnschte Leistung oder eines unserer Spar-Pakete.",
        packagesTitle: "Spezial Spar-Pakete",
        pkg1Badge: "SPAR PAKET",
        pkg1Title: "Paket 1",
        pkg1Desc: "Waschen, Schneiden, Rasieren, F\u00f6hnen & Stylen",
        pkg2Badge: "BELIEBT",
        pkg2Title: "Paket 2",
        pkg2Desc: "Waschen, Schneiden, Rasieren, F\u00f6hnen, Stylen & Augenbrauen zupfen",
        pkg3Badge: "FULL CARE",
        pkg3Title: "Paket 3",
        pkg3Desc: "Waschen, Schneiden, Rasieren, F\u00f6hnen, Stylen, Augenbrauen zupfen, F\u00e4rben (Bart / Haare)",
        selectServiceBtn: "W\u00e4hlen & Buchen",
        fullPriceTitle: "Einzelne Leistungen & Preise",
        p1Name: "Trocken Haarschnitt",
        p1Sub: "Klassischer oder moderner Trockenschnitt",
        p2Name: "Waschen, Schneiden, F\u00f6hnen",
        p2Sub: "Inklusive Haarw\u00e4sche, Schnitt und F\u00f6hnen",
        p3Name: "Bartrasur",
        p3Sub: "Pr\u00e4zisionsrasur und Konturenformung",
        p4Name: "Augenbrauen zupfen",
        p4Sub: "Pr\u00e4zises Zupfen & Formgebung",
        p5Name: "Kinder Haarschnitt (bis 10 Jahre)",
        p5Sub: "Geduldiger & moderner Schnitt f\u00fcr Kinder",
        p6Name: "Waschen, F\u00f6hnen, Stylen",
        p6Sub: "Haarw\u00e4sche, F\u00f6hnen und Finish-Styling",
        p7Name: "Bart / Haare F\u00e4rben",
        p7Sub: "Professionelle T\u00f6nung & F\u00e4rbung",
        bookingTag: "ONLINE RESERVIERUNG",
        bookingTitle: "Wunschtermin Vereinbaren",
        bookingSub: "W\u00e4hlen Sie Ihren Barber, Datum und Uhrzeit aus. Sie erhalten sofort einen Sicherheitscode.",
        lblBarber: "Friseur / Barber W\u00e4hlen",
        barber1Role: "Usta Berber / Master Stylist",
        barber2Role: "N\u00e4chster freier Barber",
        lblService: "Gew\u00fcnschte Leistung",
        phSelectService: "Bitte Leistung w\u00e4hlen...",
        lblDate: "Datum W\u00e4hlen",
        dateHelp: "Sonntags ist der Salon geschlossen.",
        lblTime: "Freie Uhrzeit Ausw\u00e4hlen",
        timeSlotPlaceholder: "Bitte w\u00e4hlen Sie zuerst links ein Datum aus, um die verf\u00fcgbaren Zeiten zu sehen.",
        lblName: "Ihr Vor- & Nachname",
        phName: "z.B. Max Mustermann",
        lblPhone: "Telefonnummer",
        phPhone: "z.B. 0152 5164 9190",
        lblEmail: "E-Mail Adresse (F\u00fcr Best\u00e4tigungscode)",
        phEmail: "z.B. max.mustermann@gmail.com",
        emailHelp: "Terminbest\u00e4tigung und Ihr 6-stelliger Code werden an diese E-Mail gesendet.",
        lblNotes: "Anmerkungen (Optional)",
        phNotes: "z.B. Besondere W\u00fcnsche...",
        btnConfirmBooking: "Termin Jetzt Verbindlich Buchen",
        salonClosedTitle: "Salon ist derzeit geschlossen",
        salonClosedDesc: "Derzeit k\u00f6nnen online keine Termine vereinbart werden. Bitte rufen Sie uns an oder versuchen Sie es sp\u00e4ter erneut.",
        reviewTitle: "Waren Sie mit unserem Service zufrieden?",
        reviewDesc: "Ihre Zufriedenheit ist unser gr\u00f6\u00dfter Antrieb! Unterst\u00fctzen Sie Finale Barbershop mit einer 5-Sterne Bewertung auf Google. Wir freuen uns \u00fcber Ihr Feedback!",
        reviewBtn: "Auf Google 5 Sterne Bewerten",
        contactTag: "KONTAKT & STANDORT",
        contactTitle: "Besuchen Sie Uns in M\u00f6rfelden-Walldorf",
        addrLabel: "Adresse",
        phoneLabel: "Telefon & Terminvereinbarung",
        walkInSub: "Besuche auch ohne Termin m\u00f6glich",
        instaLabel: "Instagram",
        instaSub: "Termine & Styles auf Instagram",
        hoursLabel: "\u00d6ffnungszeiten",
        footerTagline: "Ihr erstklassiger Herrenfriseur & Barbershop in M\u00f6rfelden-Walldorf.",
        adminBtn: "Y\u00f6netici Paneli",
        allRights: "Alle Rechte vorbehalten.",
        modalSuccessTitle: "Termin Erfolgreich Reserviert!",
        authCodeTag: "IHR PERS\u00d6NLICHER SICHERHEITSCODE",
        authCodeHelp: "Bitte nennen Sie diesen Code bei Ihrem Besuch im Salon.",
        modalCloseBtn: "Verstanden"
    },
    tr: {
        docTitle: "Finale Barbershop | M\u00f6rfelden-Walldorf",
        navHome: "Ana Sayfa",
        navAbout: "Hakk\u0131m\u0131zda",
        navServices: "Fiyatlar & Paketler",
        navContact: "\u0130leti\u015fim & Konum",
        navBookBtn: "Randevu Al",
        navBooking: "Randevu Al",
        walkInBadge: "Randevusuz Gelinebilir",
        heroTitle: "Kusursuz Kesim & <span class=\"gold-gradient\">Profesyonel Sakal Bak\u0131m\u0131</span>",
        heroSubtitle: "Finale Barbershop M\u00f6rfelden-Walldorf'a ho\u015f geldiniz. Profesyonel sa\u00e7 kesimi, modern fade ge\u00e7i\u015fleri ve birinci s\u0131n\u0131f sakal tasar\u0131m\u0131n\u0131 rahat bir atmosferde sunuyoruz.",
        heroBookBtn: "Hemen Online Randevu Al",
        stat1Title: "Profesyonel Fade",
        stat1Sub: "Kusursuz sa\u00e7 ge\u00e7i\u015fleri",
        stat2Title: "Randevusuz",
        stat2Sub: "Do\u011frudan gelebilirsiniz",
        statusChecking: "Durum kontrol ediliyor...",
        statusOpen: "\u015eu An A\u00e7\u0131\u011f\u0131z \u2013 Ho\u015f Geldiniz!",
        statusClosed: "\u015eu An Kapal\u0131y\u0131z",
        hoursMonFri: "Pzt - Cuma:",
        hoursSat: "Cumartesi:",
        hoursSun: "Pazar:",
        hoursClosed: "Kapal\u0131",
        aboutTag: "SALONUMUZ HAKKINDA",
        aboutTitle: "Finale Barbershop \u2013 Geleneksel Ustal\u0131k ve Modern Stil",
        aboutDesc1: "M\u00f6rfelden-Walldorf Westendstra\u00dfe 3 adresinde sadece sa\u00e7 kesimi de\u011fil, erke\u011fe \u00f6zel birinci s\u0131n\u0131f bir bak\u0131m deneyimi sunuyoruz.",
        aboutDesc2: "Skin Fade, klasik kesim veya s\u0131cak havlu e\u015fli\u011finde sakal t\u0131ra\u015f\u0131: Bizim i\u00e7in en y\u00fcksek hassasiyet ve m\u00fc\u015fteri memnuniyeti daima birinci s\u0131radad\u0131r.",
        feat1Title: "Hassas Fade & Kesim",
        feat1Desc: "Kafa yap\u0131n\u0131za \u00f6zel temiz ve modern sa\u00e7 ge\u00e7i\u015fleri.",
        feat2Title: "Geleneksel Sakal Bak\u0131m\u0131",
        feat2Desc: "Ustura t\u0131ra\u015f\u0131, keskin konturlar ve kaliteli bak\u0131m ya\u011flar\u0131.",
        feat3Title: "Randevulu veya Randevusuz",
        feat3Desc: "Online randevu al\u0131n, aray\u0131n ya da do\u011frudan gelin.",
        servicesTag: "H\u0130ZMETLER & F\u0130YATLAR",
        servicesTitle: "Fiyat Listemiz & \u00d6zel Paketler",
        servicesSub: "Uygun fiyata birinci s\u0131n\u0131f kalite. Diledi\u011finiz tekil hizmeti veya avantajl\u0131 paketlerimizi se\u00e7in.",
        packagesTitle: "\u00d6zel Avantaj Paketleri",
        pkg1Badge: "AVANTAJ PAKET\u0130",
        pkg1Title: "Paket 1",
        pkg1Desc: "Y\u0131kama, Kesim, Sakal T\u0131ra\u015f\u0131, F\u00f6n & \u015eekillendirme",
        pkg2Badge: "POP\u00dcLER",
        pkg2Title: "Paket 2",
        pkg2Desc: "Y\u0131kama, Kesim, Sakal T\u0131ra\u015f\u0131, F\u00f6n, \u015eekillendirme & Ka\u015f Alma",
        pkg3Badge: "FULL BAKIM",
        pkg3Title: "Paket 3",
        pkg3Desc: "Y\u0131kama, Kesim, Sakal, F\u00f6n, \u015eekillendirme, Ka\u015f Alma, Boyama (Sakal / Sa\u00e7)",
        selectServiceBtn: "Se\u00e7 & Randevu Al",
        fullPriceTitle: "Tekil Hizmetler & Fiyatlar",
        p1Name: "Kuru Sa\u00e7 Kesimi",
        p1Sub: "Klasik veya modern kuru kesim",
        p2Name: "Y\u0131kama, Kesim, F\u00f6n",
        p2Sub: "Sa\u00e7 y\u0131kama, kesim ve f\u00f6n dahil",
        p3Name: "Sakal T\u0131ra\u015f\u0131",
        p3Sub: "Hassas ustura t\u0131ra\u015f\u0131 ve kontur \u015fekillendirme",
        p4Name: "Ka\u015f Alma",
        p4Sub: "\u0130p ve c\u0131mb\u0131zla ka\u015f \u015fekillendirme",
        p5Name: "\u00c7ocuk Sa\u00e7 Kesimi (10 Ya\u015fa Kadar)",
        p5Sub: "\u00c7ocuklara \u00f6zel \u00f6zenli ve modern sa\u00e7 kesimi",
        p6Name: "Y\u0131kama, F\u00f6n, \u015eekillendirme",
        p6Sub: "Sa\u00e7 y\u0131kama, kurutma ve kaliteli f\u00f6n wax",
        p7Name: "Sakal / Sa\u00e7 Boyama",
        p7Sub: "Profesyonel sakal ve sa\u00e7 renklendirme",
        bookingTag: "ONL\u0130NE RANDEVU",
        bookingTitle: "Hemen Randevunuzu Olu\u015fturun",
        bookingSub: "Berberinizi, tarihi ve saati se\u00e7in. Randevu olu\u015fturuldu\u011funda g\u00fcvenlik kodunuzu an\u0131nda alacaks\u0131n\u0131z.",
        lblBarber: "Friseur / Barber W\u00e4hlen",
        barber1Role: "Usta Berber / Master Stylist",
        barber2Role: "\u0130lk M\u00fcsait Usta / Ekip",
        lblService: "Almak \u0130stedi\u011finiz Hizmet",
        phSelectService: "L\u00fctfen bir hizmet se\u00e7iniz...",
        lblDate: "Tarih Se\u00e7iniz",
        dateHelp: "Pazar g\u00fcnleri salonumuz kapal\u0131d\u0131r.",
        lblTime: "M\u00fcsait Saat Se\u00e7iniz",
        timeSlotPlaceholder: "M\u00fcsait saatleri g\u00f6rmek i\u00e7in l\u00fctfen \u00f6nce soldan bir tarih se\u00e7iniz.",
        lblName: "Ad\u0131n\u0131z & Soyad\u0131n\u0131z",
        phName: "\u00d6rn: Ahmet Y\u0131lmaz",
        lblPhone: "Telefon Numaran\u0131z",
        phPhone: "\u00d6rn: 0152 5164 9190",
        lblEmail: "E-Posta Adresiniz (Onay Kodu \u0130\u00e7in)",
        phEmail: "\u00d6rn: musteri@gmail.com",
        emailHelp: "Randevu detaylar\u0131 ve 6 haneli kodunuz bu e-postaya iletilecektir.",
        lblNotes: "Notunuz (\u0130ste\u011fe Ba\u011fl\u0131)",
        phNotes: "\u00d6rn: \u00d6zel sa\u00e7 modeli veya fade tercihi...",
        btnConfirmBooking: "Randevuyu Onayla ve Tamamla",
        salonClosedTitle: "Salonumuz \u015eu Anda Randevuya Kapal\u0131d\u0131r",
        salonClosedDesc: "\u015eu anda online randevu al\u0131m\u0131 kapal\u0131 durumdad\u0131r. L\u00fctfen bizi telefonla aray\u0131n\u0131z veya daha sonra tekrar deneyiniz.",
        reviewTitle: "Hizmetimizden Memnun Kald\u0131n\u0131z m\u0131?",
        reviewDesc: "Sizin memnuniyetiniz bizim en b\u00fcy\u00fck motivasyonumuz! Finale Barbershop'u Google'da 5 y\u0131ld\u0131z vererek destekleyebilirsiniz. G\u00f6r\u00fc\u015fleriniz bizim i\u00e7in \u00e7ok de\u011ferli!",
        reviewBtn: "Google'da 5 Y\u0131ld\u0131z Ver",
        contactTag: "\u0130LET\u0130\u015e\u0130M & KONUM",
        contactTitle: "Bizi M\u00f6rfelden-Walldorf'ta Ziyaret Edin",
        addrLabel: "Adres",
        phoneLabel: "Telefon & Randevu",
        walkInSub: "Randevusuz da gelebilirsiniz",
        instaLabel: "Instagram",
        instaSub: "T\u0131ra\u015f modellerimiz Instagram'da",
        hoursLabel: "\u00c7al\u0131\u015fma Saatleri",
        footerTagline: "M\u00f6rfelden-Walldorf'ta birinci s\u0131n\u0131f erkek kuaf\u00f6r\u00fc & barbershop.",
        adminBtn: "Y\u00f6netici Paneli",
        allRights: "T\u00fcm haklar\u0131 sakl\u0131d\u0131r.",
        modalSuccessTitle: "Randevunuz Ba\u015far\u0131yla Al\u0131nd\u0131!",
        authCodeTag: "G\u00dcVENL\u0130K VE RANDEVU KODUNUZ",
        authCodeHelp: "L\u00fctfen salona geldi\u011finizde bu kodu berberinize iletiniz.",
        modalCloseBtn: "Tamam, Anlad\u0131m"
    },
    en: {
        docTitle: "Finale Barbershop | M\u00f6rfelden-Walldorf",
        navHome: "Home",
        navAbout: "About",
        navServices: "Prices & Packages",
        navContact: "Contact",
        navBookBtn: "Book Appointment",
        navBooking: "Book Appointment",
        walkInBadge: "Walk-ins Welcome",
        heroTitle: "Flawless Cuts & <span class=\"gold-gradient\">Precision Beard Care</span>",
        heroSubtitle: "Welcome to Finale Barbershop in M\u00f6rfelden-Walldorf. We offer premium men's haircuts, sharp skin fades, and expert styling in a relaxed atmosphere.",
        heroBookBtn: "Book Online Now",
        stat1Title: "Precision Fades",
        stat1Sub: "Clean blends & styles",
        stat2Title: "Walk-ins Welcome",
        stat2Sub: "Visit us anytime",
        statusChecking: "Checking status...",
        statusOpen: "We are Open \u2013 Welcome!",
        statusClosed: "Currently Closed",
        hoursMonFri: "Mon - Fri:",
        hoursSat: "Saturday:",
        hoursSun: "Sunday:",
        hoursClosed: "Closed",
        aboutTag: "ABOUT OUR SHOP",
        aboutTitle: "Finale Barbershop \u2013 Tradition Meets Modern Style",
        aboutDesc1: "Located at Westendstra\u00dfe 3 in M\u00f6rfelden-Walldorf, we provide more than just haircuts \u2013 we deliver a premium grooming experience tailored for the modern gentleman.",
        aboutDesc2: "From crisp skin fades and classic tapers to hot-towel beard grooming: precision and customer satisfaction are always our highest priorities.",
        feat1Title: "Sharp Fades & Haircuts",
        feat1Desc: "Tailored transitions to complement your individual face shape.",
        feat2Title: "Traditional Beard Care",
        feat2Desc: "Hot towel shaves, sharp contouring, and nourishing oils.",
        feat3Title: "Appointments & Walk-ins",
        feat3Desc: "Book online, call us, or just drop by anytime.",
        servicesTag: "SERVICES & PRICING",
        servicesTitle: "Our Prices & Special Packages",
        servicesSub: "Premium craftsmanship at fair prices. Select any individual service or choose one of our value packages.",
        packagesTitle: "Special Value Packages",
        pkg1Badge: "VALUE PACKAGE",
        pkg1Title: "Package 1",
        pkg1Desc: "Wash, Cut, Beard Shave, Blow-dry & Styling",
        pkg2Badge: "POPULAR",
        pkg2Title: "Package 2",
        pkg2Desc: "Wash, Cut, Beard Shave, Blow-dry, Styling & Eyebrow Threading",
        pkg3Badge: "FULL CARE",
        pkg3Title: "Package 3",
        pkg3Desc: "Wash, Cut, Beard Shave, Blow-dry, Styling, Eyebrows, Beard/Hair Color",
        selectServiceBtn: "Select & Book",
        fullPriceTitle: "Individual Services & Prices",
        p1Name: "Dry Haircut",
        p1Sub: "Classic or modern dry haircut",
        p2Name: "Wash, Cut, Blow-dry",
        p2Sub: "Includes hair wash, precision cut and styling",
        p3Name: "Beard Shave",
        p3Sub: "Straight razor shave and contour line-up",
        p4Name: "Eyebrow Threading",
        p4Sub: "Precise shaping and threading",
        p5Name: "Kids Haircut (up to 10 yrs)",
        p5Sub: "Patient and modern haircut for kids",
        p6Name: "Wash, Blow-dry, Styling",
        p6Sub: "Hair wash, blow-dry and premium finish",
        p7Name: "Beard / Hair Color",
        p7Sub: "Professional color treatment and coverage",
        bookingTag: "ONLINE BOOKING",
        bookingTitle: "Schedule Your Appointment",
        bookingSub: "Choose your preferred barber, date, and time. You will receive an instant 6-digit security code.",
        lblBarber: "Choose Your Barber",
        barber1Role: "Master Stylist",
        barber2Role: "Next Available Barber",
        lblService: "Selected Service",
        phSelectService: "Please select a service...",
        lblDate: "Select Date",
        dateHelp: "The salon is closed on Sundays.",
        lblTime: "Choose Available Time",
        timeSlotPlaceholder: "Please choose a date to see available time slots.",
        lblName: "Your Full Name",
        phName: "e.g. John Doe",
        lblPhone: "Phone Number",
        phPhone: "e.g. 0152 5164 9190",
        lblEmail: "E-Mail Address (For Confirmation Code)",
        phEmail: "e.g. john.doe@gmail.com",
        emailHelp: "Appointment confirmation and your 6-digit code will be sent to this email.",
        lblNotes: "Notes (Optional)",
        phNotes: "e.g. Fade height or special requests...",
        btnConfirmBooking: "Confirm & Book Appointment",
        salonClosedTitle: "Salon is Currently Closed for Bookings",
        salonClosedDesc: "Online booking is temporarily disabled. Please call us directly or check back later.",
        reviewTitle: "Were you satisfied with our service?",
        reviewDesc: "Your satisfaction means the world to us! Please support Finale Barbershop with a 5-star Google review. We truly appreciate your feedback!",
        reviewBtn: "Leave a 5-Star Review on Google",
        contactTag: "CONTACT & LOCATION",
        contactTitle: "Visit Us in M\u00f6rfelden-Walldorf",
        addrLabel: "Address",
        phoneLabel: "Phone & Appointments",
        walkInSub: "Walk-ins welcome anytime",
        instaLabel: "Instagram",
        instaSub: "Follow our work on Instagram",
        hoursLabel: "Opening Hours",
        footerTagline: "Your premier barbershop and men's stylist in M\u00f6rfelden-Walldorf.",
        adminBtn: "Admin Panel",
        allRights: "All rights reserved.",
        modalSuccessTitle: "Appointment Confirmed!",
        authCodeTag: "YOUR SECURITY & CONFIRMATION CODE",
        authCodeHelp: "Please present this code upon your visit to the salon.",
        modalCloseBtn: "Got It"
    }
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initMobileNav();
    initDatePicker();
    initBookingForm();
    loadSalonSettingsAndAppointments();
});

// --- Language Switcher ---
function initLanguage() {
    const savedLang = localStorage.getItem('siteLanguage') || 'de';
    changeLanguage(savedLang);
}

function changeLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('siteLanguage', lang);
    
    const selector = document.getElementById('languageSelector');
    if (selector) selector.value = lang;

    const dict = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });

    document.querySelectorAll('[data-ph-i18n]').forEach(el => {
        const key = el.getAttribute('data-ph-i18n');
        if (dict[key]) {
            el.setAttribute('placeholder', dict[key]);
        }
    });

    updateStatusBar();
}

// --- Mobile Navigation ---
function initMobileNav() {
    const toggle = document.getElementById('mobileToggle');
    const menu = document.getElementById('navMenu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
            });
        });
    }
}

// --- Barber Selection (Per-Barber Separate Calendar) ---
function selectBarber(barberName) {
    const barberInput = document.getElementById('selectedBarber');
    if (barberInput) barberInput.value = barberName;

    const bBahattin = document.getElementById('barberBahattin');
    const bTeam = document.getElementById('barberTeam');
    const badge = document.getElementById('barberNameBadge');

    if (barberName.includes('Bahattin')) {
        if (bBahattin) bBahattin.classList.add('selected');
        if (bTeam) bTeam.classList.remove('selected');
        if (badge) badge.textContent = 'Bahattin';
    } else {
        if (bBahattin) bBahattin.classList.remove('selected');
        if (bTeam) bTeam.classList.add('selected');
        if (badge) badge.textContent = (currentLang === 'tr' ? 'Finale Ekibi' : 'Finale Team');
    }

    // Re-render time slots for currently selected date
    const dateInput = document.getElementById('bookingDate');
    if (dateInput && dateInput.value) {
        const selectedDate = new Date(dateInput.value + 'T00:00:00');
        renderTimeSlots(dateInput.value, selectedDate.getDay());
    }
}

// --- Quick Select from Service Cards ---
function quickSelectService(serviceIdentifier) {
    const serviceSelect = document.getElementById('serviceSelect');
    if (serviceSelect) {
        const query = serviceIdentifier.toLowerCase();
        for (let i = 0; i < serviceSelect.options.length; i++) {
            const opt = serviceSelect.options[i];
            if (opt.value && (opt.value.toLowerCase().includes(query) || opt.text.toLowerCase().includes(query))) {
                serviceSelect.selectedIndex = i;
                break;
            }
        }
    }
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// --- Date Picker & Past Days/Hours Prevention ---
function initDatePicker() {
    const dateInput = document.getElementById('bookingDate');
    if (!dateInput) return;

    // Block past dates: min is today
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;

    dateInput.addEventListener('change', (e) => {
        const selectedDateStr = e.target.value;
        if (!selectedDateStr) return;

        const selectedDate = new Date(selectedDateStr + 'T00:00:00');
        const dayOfWeek = selectedDate.getDay();

        // Sunday is closed
        if (dayOfWeek === 0) {
            alert(currentLang === 'tr' ? 'Pazar g\u00fcnleri salonumuz kapal\u0131d\u0131r. L\u00fctfen ba\u015fka bir g\u00fcn se\u00e7iniz.' : 'Sonntags ist der Salon geschlossen. Bitte w\u00e4hlen Sie ein anderes Datum.');
            e.target.value = '';
            clearTimeSlots();
            return;
        }

        renderTimeSlots(selectedDateStr, dayOfWeek);
    });
}

function clearTimeSlots() {
    const container = document.getElementById('timeSlotsContainer');
    const hiddenInput = document.getElementById('selectedTimeSlot');
    if (hiddenInput) hiddenInput.value = '';
    if (container) {
        const dict = translations[currentLang];
        container.innerHTML = `
            <div class="slots-placeholder">
                <i class="fa-solid fa-calendar-day"></i>
                <p>${dict.timeSlotPlaceholder}</p>
            </div>
        `;
    }
}

// --- Render Time Slots with Barber-Specific Availability & Past Hour Filter ---
function renderTimeSlots(dateStr, dayOfWeek) {
    const container = document.getElementById('timeSlotsContainer');
    const hiddenInput = document.getElementById('selectedTimeSlot');
    const currentSelectedBarber = document.getElementById('selectedBarber').value || 'Bahattin';
    if (!container || !hiddenInput) return;

    hiddenInput.value = '';
    container.innerHTML = '';

    const startH = parseInt(salonSettings.openHour ? salonSettings.openHour.split(':')[0] : 9);
    const endH = dayOfWeek === 6 ? 18 : parseInt(salonSettings.closeHour ? salonSettings.closeHour.split(':')[0] : 19);

    const now = new Date();
    const isToday = now.toISOString().split('T')[0] === dateStr;
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();

    // Filter appointments booked ONLY for the currently selected barber on this date!
    const bookedTimesForBarber = allExistingAppointments
        .filter(apt => {
            const isMatchDate = (apt.date === dateStr);
            const isMatchBarber = (apt.barber && apt.barber.includes(currentSelectedBarber.includes('Bahattin') ? 'Bahattin' : 'Team') || (apt.barber === currentSelectedBarber));
            const isNotCancelled = (apt.status !== '\u0130ptal Edildi' && apt.status !== 'Iptal Edildi');
            return isMatchDate && isMatchBarber && isNotCancelled;
        })
        .map(apt => apt.time);

    const slots = [];
    for (let h = startH; h < endH; h++) {
        const hourStr = String(h).padStart(2, '0');
        slots.push(`${hourStr}:00`);
        slots.push(`${hourStr}:30`);
    }

    slots.forEach(time => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'time-slot-btn';

        const [slotH, slotM] = time.split(':').map(Number);
        let isPast = false;
        let isBooked = bookedTimesForBarber.includes(time);

        if (isToday) {
            if (slotH < currentHour || (slotH === currentHour && slotM <= currentMin)) {
                isPast = true;
            }
        }

        if (isPast) {
            btn.classList.add('past');
            btn.disabled = true;
            btn.innerHTML = `<span>${time}</span><small>${currentLang === 'tr' ? 'Ge\u00e7ti' : 'Vorbei'}</small>`;
        } else if (isBooked) {
            btn.classList.add('booked');
            btn.disabled = true;
            btn.innerHTML = `<span>${time}</span><small>${currentLang === 'tr' ? 'Dolu' : 'Belegt'}</small>`;
        } else {
            btn.innerHTML = `<span>${time}</span><small>${currentLang === 'tr' ? 'M\u00fcsait' : 'Frei'}</small>`;
            btn.addEventListener('click', () => {
                document.querySelectorAll('.time-slot-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                hiddenInput.value = time;
            });
        }

        container.appendChild(btn);
    });
}

// --- 6-Digit Random Security Code Generator ---
function generateAuthCode() {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    return `FN-${randomNum}`;
}

// --- Cloud DB Salon Settings & Appointments Loader ---
async function loadSalonSettingsAndAppointments() {
    try {
        const res = await fetch(CLOUD_DB_URL);
        if (res.ok) {
            const data = await res.json();
            if (data && data.data) {
                salonSettings.isOpen = (data.data.isOpen === true || data.data.isOpen === "true");
                salonSettings.openHour = data.data.openHour || "09:00";
                salonSettings.closeHour = data.data.closeHour || "19:00";
                
                if (data.data.appointments) {
                    try {
                        allExistingAppointments = JSON.parse(data.data.appointments);
                    } catch(err) {
                        allExistingAppointments = [];
                    }
                }
            }
        }
    } catch (e) {
        console.log("Using cached/local data:", e);
        allExistingAppointments = JSON.parse(localStorage.getItem('barber_appointments') || '[]');
    }
    applySalonSettings();
}

function applySalonSettings() {
    const closedBanner = document.getElementById('salonClosedNotice');
    const submitBtn = document.getElementById('submitBookingBtn');
    const monFri = document.getElementById('dispTimeMonFri');
    const contactMonFri = document.getElementById('contactMonFri');

    if (monFri) monFri.innerHTML = `${salonSettings.openHour} &ndash; ${salonSettings.closeHour} Uhr`;
    if (contactMonFri) contactMonFri.innerHTML = `${salonSettings.openHour} &ndash; ${salonSettings.closeHour} Uhr`;

    if (!salonSettings.isOpen) {
        if (closedBanner) closedBanner.style.display = 'flex';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.5';
            submitBtn.style.cursor = 'not-allowed';
        }
    } else {
        if (closedBanner) closedBanner.style.display = 'none';
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.style.cursor = 'pointer';
        }
    }
    updateStatusBar();
}

function updateStatusBar() {
    const dot = document.getElementById('statusDot');
    const label = document.getElementById('statusLabel');
    if (!dot || !label) return;

    const dict = translations[currentLang];
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const min = now.getMinutes();
    const timeVal = hour + min / 60;

    let openH = parseInt(salonSettings.openHour.split(':')[0]);
    let closeH = parseInt(salonSettings.closeHour.split(':')[0]);

    let isOpenNow = salonSettings.isOpen && day !== 0 && timeVal >= openH && (day === 6 ? timeVal < 18 : timeVal < closeH);

    if (isOpenNow) {
        dot.className = 'status-dot';
        label.textContent = dict.statusOpen;
    } else {
        dot.className = 'status-dot closed';
        label.textContent = dict.statusClosed;
    }
}

// --- Booking Form Submission ---
function initBookingForm() {
    const form = document.getElementById('booking-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!salonSettings.isOpen) {
            alert(currentLang === 'tr' ? 'Salonumuz \u015fu anda randevuya kapal\u0131d\u0131r.' : 'Salon ist derzeit geschlossen.');
            return;
        }

        const barber = document.getElementById('selectedBarber').value || 'Bahattin';
        const service = document.getElementById('serviceSelect').value;
        const date = document.getElementById('bookingDate').value;
        const time = document.getElementById('selectedTimeSlot').value;
        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        const notes = document.getElementById('customerNotes').value.trim();

        if (!time) {
            alert(currentLang === 'tr' ? 'L\u00fctfen bir randevu saati se\u00e7iniz.' : 'Bitte w\u00e4hlen Sie eine Uhrzeit aus.');
            return;
        }

        const submitBtn = document.getElementById('submitBookingBtn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ' + (currentLang === 'tr' ? 'Kaydediliyor...' : 'Wird reserviert...');

        const authCode = generateAuthCode();

        const appointmentData = {
            id: Date.now().toString(),
            authCode: authCode,
            barber: barber,
            service: service,
            date: date,
            time: time,
            name: name,
            phone: phone,
            email: email,
            notes: notes || '-',
            status: 'Offen',
            createdAt: new Date().toISOString()
        };

        allExistingAppointments.unshift(appointmentData);

        // 1. Save Locally
        saveLocalAppointment(appointmentData);

        // 2. Save to Cloud DB
        await saveCloudAppointment(appointmentData);

        // 3. Send Email Notification to Barber
        await sendEmailNotification(appointmentData);

        // 4. Show Modal with Security Code
        document.getElementById('modalAuthCode').textContent = authCode;
        const modal = document.getElementById('bookingModal');
        if (modal) modal.classList.add('active');

        form.reset();
        clearTimeSlots();
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-check-circle"></i> ' + translations[currentLang].btnConfirmBooking;
    });
}

function saveLocalAppointment(apt) {
    try {
        const list = JSON.parse(localStorage.getItem('barber_appointments') || '[]');
        list.unshift(apt);
        localStorage.setItem('barber_appointments', JSON.stringify(list));
    } catch (e) {
        console.error("Local save error:", e);
    }
}

async function saveCloudAppointment(apt) {
    try {
        const getRes = await fetch(CLOUD_DB_URL);
        let appointments = [];
        if (getRes.ok) {
            const currentData = await getRes.json();
            if (currentData && currentData.data && currentData.data.appointments) {
                try {
                    appointments = JSON.parse(currentData.data.appointments);
                } catch(err) {
                    appointments = [];
                }
            }
        }

        appointments.unshift(apt);

        const updateBody = {
            name: "FinaleBarber_Production_DB",
            data: {
                isOpen: String(salonSettings.isOpen),
                openHour: salonSettings.openHour,
                closeHour: salonSettings.closeHour,
                appointments: JSON.stringify(appointments)
            }
        };

        await fetch(CLOUD_DB_URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateBody)
        });
    } catch (e) {
        console.error("Cloud DB save error:", e);
    }
}

async function sendEmailNotification(apt) {
    try {
        const payload = {
            "_subject": `\uD83D\uDC88 FINALE BARBER [${apt.authCode}] - ${apt.barber} Randevusu`,
            "_template": "table",
            "_captcha": "false",
            "G\u00fcvenlik Kodu": apt.authCode,
            "Se\u00e7ilen Berber": apt.barber,
            "M\u00fc\u015fteri Ad\u0131": apt.name,
            "Telefon": apt.phone,
            "E-Mail": apt.email,
            "Tarih": apt.date,
            "Saat": apt.time,
            "Hizmet": apt.service,
            "Notlar": apt.notes,
            "Kay\u0131t Tarihi": new Date().toLocaleString('de-DE')
        };

        await fetch(`https://formsubmit.co/ajax/${BARBER_EMAIL}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        });
    } catch (err) {
        console.log("Email dispatch:", err);
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.classList.remove('active');
}