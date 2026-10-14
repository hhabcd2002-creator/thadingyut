import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// =========================================================================
// ၁။ GOOGLE SHEET (Register) WEB APP URL
// =========================================================================
const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbyrFEB8v0ULpWiAINJhXsJF2qLm9BgB7VBMJoRmSCA2l-iS7Bc4O2gZIbJWWFSI0AO8/exec";

// =========================================================================
// ၂။ REAL-TIME ဆုတောင်းစာအတွက် FIREBASE CONFIG (thadingyutjfis)
// =========================================================================
const firebaseConfig = {
    databaseURL: "https://thadingyutjfis-default-rtdb.firebaseio.com",
    projectId: "thadingyutjfis"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const wishesRef = ref(db, 'thadingyut_wishes');

// ================= ၃။ ENVELOPE OPENING ANIMATION =================
const envelopeWrapper = document.getElementById('envelopeWrapper');
const envelope = document.querySelector('.envelope');
const envelopeScreen = document.getElementById('envelope-screen');
const mainContent = document.getElementById('main-content');

envelopeWrapper.addEventListener('click', () => {
    envelope.classList.add('open');
    setTimeout(() => {
        envelopeScreen.style.opacity = '0';
        setTimeout(() => {
            envelopeScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
        }, 800);
    }, 1000);
});

// ================= ၄။ INTERACTIVE OIL LAMP WITH HIGH ACTIVE GLOW =================
const oilLamp = document.getElementById('oilLamp');
oilLamp.addEventListener('click', () => {
    oilLamp.classList.toggle('active');
});

// ================= ၅။ PARTICLES & SKY LANTERNS GENERATOR =================
const particleContainer = document.getElementById('particle-container');
const lanternContainer = document.getElementById('lantern-bg-container');

// Sparkles particles
function createSparkles() {
    const count = 35;
    for (let i = 0; i < count; i++) {
        const spark = document.createElement('div');
        spark.className = 'spark-particle';
        spark.style.left = `${Math.random() * 100}vw`;
        spark.style.top = `${Math.random() * 100}vh`;
        const size = 2 + Math.random() * 5;
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        spark.style.animationDuration = `${5 + Math.random() * 7}s`;
        spark.style.animationDelay = `${Math.random() * 5}s`;
        particleContainer.appendChild(spark);
    }
}

// Thadingyut Floating Lanterns
function createSkyLanterns() {
    lanternContainer.innerHTML = '';
    const count = 18;
    for (let i = 0; i < count; i++) {
        const lantern = document.createElement('div');
        lantern.className = 'floating-sky-lantern';
        lantern.style.left = `${Math.random() * 95}vw`;
        lantern.style.animationDuration = `${10 + Math.random() * 10}s`;
        lantern.style.animationDelay = `${Math.random() * 6}s`;
        lanternContainer.appendChild(lantern);
    }
}

createSparkles();
createSkyLanterns();

// Light Mode / Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// ================= ၆။ MULTILANGUAGE TRANSLATIONS =================
let currentLang = 'en';
const translations = {
    en: {
        env_title: "HAPPY THADINGYUT",
        env_sub: "You're Cordially Invited",
        open_btn: "✉️ Open Invitation",
        cordially: "YOU'RE CORDIALLY INVITED TO OUR",
        title_1: "HAPPY THADINGYUT",
        title_and: "AND",
        title_2: "FUN & FAIR",
        tap_lamp: "(Tap the Oil Lamp to animate flame)",
        month: "OCTOBER",
        day: "FRIDAY",
        date_num: "23",
        time: "AT 9:00 AM",
        year_num: "2 0 2 6",
        venue: "JEWELS FUTURE INTERNATIONAL SCHOOL VENUE",
        look_forward: "WE LOOK FORWARD TO CELEBRATE THIS SPECIAL DAY WITH YOU",
        wishes_heading: "✨ Thadingyut Wishes & Reactions",
        write_wish_title: "Write a Wish",
        ph_name: "Your Name",
        ph_wish: "Write your Thadingyut wish...",
        send_wish_btn: "🙏 Send Wish",
        reg_heading: "📝 Event Registration",
        reg_sub: "Please enter your Name and Year to register for the event.",
        lbl_name: "Name",
        lbl_year: "Year",
        reg_btn: "✅ Register Now"
    },
    my: {
        env_title: "ပျော်ရွှင်ဖွယ် သီတင်းကျွတ်ပွဲတော်",
        env_sub: "လေးစားစွာ ဖိတ်ကြားအပ်ပါသည်",
        open_btn: "✉️ ဖိတ်စာဖွင့်ကြည့်ရန်",
        cordially: "လေးစားစွာဖြင့် ဖိတ်ကြားအပ်ပါသည်",
        title_1: "ပျော်ရွှင်ဖွယ် သီတင်းကျွတ်ပွဲတော်",
        title_and: "နှင့်",
        title_2: "ပျော်ပွဲရွှင်ပွဲ (FUN & FAIR)",
        tap_lamp: "(မီးတောက်လှုပ်ရှားစေရန် ဆီမီးခွက်ကို တို့ထိပါ)",
        month: "အောက်တိုဘာလ",
        day: "သောကြာနေ့",
        date_num: "၂၃",
        time: "နံနက် ၉:၀၀ နာရီ",
        year_num: "၂ ၀ ၂ ၆",
        venue: "JEWELS FUTURE INTERNATIONAL SCHOOL VENUE",
        look_forward: "ဤထူးခြားသောနေ့ရက်လေးကို အတူတကွ ပျော်ရွှင်စွာ ဆင်နွှဲကြပါစို့",
        wishes_heading: "✨ သီတင်းကျွတ် ဆုတောင်းစာများ",
        write_wish_title: "ဆုတောင်းစာ ရေးသားရန်",
        ph_name: "သင့်နာမည် ရေးပါ",
        ph_wish: "သီတင်းကျွတ် ဆုတောင်းစာ ရေးပေးပါ...",
        send_wish_btn: "🙏 ဆုတောင်းစာ ပေးပို့မည်",
        reg_heading: "📝 ပွဲတက်ရောက်ရန် စာရင်းပေးသွင်းခြင်း",
        reg_sub: "သင့်နာမည်နှင့် အတန်း (Year) ကို ဖြည့်သွင်းပြီး စာရင်းပေးသွင်းနိုင်ပါသည်။",
        lbl_name: "Name (နာမည်)",
        lbl_year: "Year (အတန်း / နှစ်)",
        reg_btn: "✅ စာရင်းပေးသွင်းမည်"
    }
};

document.getElementById('langToggle').addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'my' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLang][key]) {
            el.placeholder = translations[currentLang][key];
        }
    });
});

// ================= ၇။ FIREBASE REAL-TIME WISHES & LIKES =================
const wishesListEl = document.getElementById('wishes-list');
const wishForm = document.getElementById('wish-form');

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function renderWishes(wishesArray) {
    wishesListEl.innerHTML = '';
    wishesArray.forEach(item => {
        const div = document.createElement('div');
        div.className = 'wish-item';
        div.innerHTML = `
            <div class="wish-content">
                <h4>🪔 ${escapeHtml(item.name)}</h4>
                <p>${escapeHtml(item.message)}</p>
            </div>
            <button class="like-btn" data-id="${item.id}">
                ❤️ <span>${item.likes || 0}</span>
            </button>
        `;
        div.querySelector('.like-btn').addEventListener('click', () => handleLike(item.id));
        wishesListEl.prepend(div);
    });
}

// Fetch wishes in real-time
onValue(wishesRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
        push(wishesRef, {
            name: "Jewels Future International School",
            message: "သီတင်းကျွတ်အခါသမယမှာ အားလုံးပဲ ပျော်ရွှင်ချမ်းမြေ့ကြပါစေ! Happy Thadingyut!",
            likes: 1
        });
        return;
    }
    const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    renderWishes(list);
});

// Post a wish
wishForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('wishName').value.trim();
    const message = document.getElementById('wishMessage').value.trim();
    if (!name || !message) return;

    push(wishesRef, {
        name: name,
        message: message,
        likes: 0,
        timestamp: Date.now()
    });
    wishForm.reset();
});

// Likes Transaction
function handleLike(id) {
    const itemLikeRef = ref(db, `thadingyut_wishes/${id}/likes`);
    runTransaction(itemLikeRef, (currentLikes) => (currentLikes || 0) + 1);
}

// ================= ၈။ GOOGLE SHEET REGISTER =================
const registerForm = document.getElementById('register-form');
const regStatus = document.getElementById('regStatus');
const regSubmitBtn = document.getElementById('regSubmitBtn');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nameVal = document.getElementById('regName').value.trim();
    const yearVal = document.getElementById('regYear').value.trim();

    regSubmitBtn.disabled = true;
    regStatus.style.color = "#d4af37";
    regStatus.textContent = "⏳ စာရင်းပေးသွင်းနေပါသည်...";

    try {
        const formData = new FormData();
        formData.append('Name', nameVal);
        formData.append('Year', yearVal);

        await fetch(GOOGLE_SHEET_WEBAPP_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });

        regStatus.style.color = "#28a745";
        regStatus.textContent = "🎉 စာရင်းပေးသွင်းမှု အောင်မြင်ပါသည်! (Registered Successfully)";
        registerForm.reset();
    } catch (error) {
        regStatus.style.color = "#d9534f";
        regStatus.textContent = "❌ အမှားအယွင်းရှိနေပါသည်။ ထပ်မံကြိုးစားကြည့်ပါ။";
    } finally {
        regSubmitBtn.disabled = false;
    }
});
