import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, push, onValue, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// =========================================================================
// ၁။ GOOGLE SHEET (Register) ချိတ်ဆက်ရန် URL (ထည့်သွင်းပြီးသား)
// =========================================================================
const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbyrFEB8v0ULpWiAINJhXsJF2qLm9BgB7VBMJoRmSCA2l-iS7Bc4O2gZIbJWWFSI0AO8/exec";

// =========================================================================
// ၂။ REAL-TIME ဆုတောင်းစာအတွက် FIREBASE CONFIG
// =========================================================================
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

let db = null;
let wishesRef = null;
const isFirebaseConfigured = !firebaseConfig.databaseURL.includes("YOUR_PROJECT");

if (isFirebaseConfigured) {
    try {
        const app = initializeApp(firebaseConfig);
        db = getDatabase(app);
        wishesRef = ref(db, 'thadingyut_wishes');
    } catch (err) {
        console.warn("Firebase ချိတ်ဆက်မှု မရှိသေးပါ၊ Local Real-time စနစ်ဖြင့် အလုပ်လုပ်နေပါသည်။");
    }
}

// ================= ၃။ အဖွင့် စာအိတ် (ENVELOPE) ဖွင့်ခြင်း =================
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
        }, 700);
    }, 900);
});

// ================= ၄။ ဆီမီးခွက် (OIL LAMP) ထိလိုက်လျှင် မီးတောက်လှုပ်ရှားခြင်း =================
const oilLamp = document.getElementById('oilLamp');
oilLamp.addEventListener('click', () => {
    oilLamp.classList.toggle('active');
});

// ================= ၅။ LIGHT MODE / DARK MODE နှင့် မီးပုံးပျံများ =================
const themeToggle = document.getElementById('themeToggle');
const lanternContainer = document.getElementById('lantern-bg-container');

function createSkyLanterns() {
    lanternContainer.innerHTML = '';
    const count = 18;
    for (let i = 0; i < count; i++) {
        const lantern = document.createElement('div');
        lantern.className = 'floating-sky-lantern';
        lantern.style.left = `${Math.random() * 95}vw`;
        lantern.style.animationDuration = `${8 + Math.random() * 10}s`;
        lantern.style.animationDelay = `${Math.random() * 6}s`;
        lanternContainer.appendChild(lantern);
    }
}
createSkyLanterns();

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    const isDark = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// ================= ၆။ မြန်မာ / အင်္ဂလိပ် ဘာသာစကား ပြောင်းလဲခြင်း =================
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

// ================= ၇။ REAL-TIME ဆုတောင်းစာနှင့် LIKE REACTION =================
const wishesListEl = document.getElementById('wishes-list');
const wishForm = document.getElementById('wish-form');

const defaultWishes = [
    { id: 'w1', name: 'Tr. May', message: 'သီတင်းကျွတ်အခါသမယမှာ ကျောင်းသား/သူများအားလုံး ပျော်ရွှင်ချမ်းမြေ့ကြပါစေ။', likes: 12 },
    { id: 'w2', name: 'Aung Aung', message: 'Happy Thadingyut to all teachers and friends! See you at the Fun & Fair!', likes: 8 }
];

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

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

if (isFirebaseConfigured && wishesRef) {
    onValue(wishesRef, (snapshot) => {
        const data = snapshot.val();
        if (!data) {
            renderWishes(defaultWishes);
            return;
        }
        const list = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        renderWishes(list);
    });
} else {
    let localWishes = JSON.parse(localStorage.getItem('thadingyut_wishes')) || defaultWishes;
    renderWishes(localWishes);

    window.addEventListener('storage', () => {
        localWishes = JSON.parse(localStorage.getItem('thadingyut_wishes')) || defaultWishes;
        renderWishes(localWishes);
    });
}

wishForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('wishName').value.trim();
    const message = document.getElementById('wishMessage').value.trim();
    if (!name || !message) return;

    if (isFirebaseConfigured && wishesRef) {
        push(wishesRef, { name, message, likes: 0 });
    } else {
        const localWishes = JSON.parse(localStorage.getItem('thadingyut_wishes')) || defaultWishes;
        localWishes.push({ id: 'w_' + Date.now(), name, message, likes: 0 });
        localStorage.setItem('thadingyut_wishes', JSON.stringify(localWishes));
        renderWishes(localWishes);
    }
    wishForm.reset();
});

function handleLike(id) {
    if (isFirebaseConfigured && db) {
        const itemLikeRef = ref(db, `thadingyut_wishes/${id}/likes`);
        runTransaction(itemLikeRef, (currentLikes) => (currentLikes || 0) + 1);
    } else {
        const localWishes = JSON.parse(localStorage.getItem('thadingyut_wishes')) || defaultWishes;
        const target = localWishes.find(w => w.id === id);
        if (target) {
            target.likes = (target.likes || 0) + 1;
            localStorage.setItem('thadingyut_wishes', JSON.stringify(localWishes));
            renderWishes(localWishes);
        }
    }
}

// ================= ၈။ GOOGLE SHEET (Register) သို့ DATA ပို့ခြင်း =================
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