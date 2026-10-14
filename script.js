// ================= GOOGLE SHEET WEB APP URL =================
const GOOGLE_SHEET_WEBAPP_URL = "https://script.google.com/macros/s/AKfycbyLt4caejciZrTm1btGKHdmIWRLHqCrpHmfiSYwJCDbIMGn0slJhqy1c3b_FS7BHbqVFA/exec";

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
        admin_login_btn: "🔒 Admin Mode",
        admin_logout_btn: "🔓 Exit Admin",
        admin_clear_btn: "🗑️ Clear All",
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
        admin_login_btn: "🔒 Admin Mode ဖွင့်ရန်",
        admin_logout_btn: "🔓 Admin Mode ပိတ်ရန်",
        admin_clear_btn: "🗑️ အားလုံးဖျက်မည်",
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
    updateAdminButtonsText();
});

// ================= ၇။ GOOGLE SHEET မှ ဆုတောင်းစာများဖတ်ခြင်း၊ Like ပေးခြင်းနှင့် ADMIN ဖျက်ခြင်း =================
const wishesListEl = document.getElementById('wishes-list');
const wishForm = document.getElementById('wish-form');
const adminToggleBtn = document.getElementById('adminToggleBtn');
const clearAllWishesBtn = document.getElementById('clearAllWishesBtn');

const ADMIN_KEY = "sirhtetishandsome";
let isAdmin = false;
let currentWishesData = [];

const defaultWishes = [
    { id: 'w1', name: 'Tr. May', message: 'သီတင်းကျွတ်အခါသမယမှာ ကျောင်းသား/သူများအားလုံး ပျော်ရွှင်ချမ်းမြေ့ကြပါစေ။', likes: 12 },
    { id: 'w2', name: 'Aung Aung', message: 'Happy Thadingyut to all teachers and friends! See you at the Fun & Fair!', likes: 8 }
];

function updateAdminButtonsText() {
    if (!adminToggleBtn) return;
    if (isAdmin) {
        adminToggleBtn.textContent = translations[currentLang].admin_logout_btn;
        if (clearAllWishesBtn) clearAllWishesBtn.classList.remove('hidden');
    } else {
        adminToggleBtn.textContent = translations[currentLang].admin_login_btn;
        if (clearAllWishesBtn) clearAllWishesBtn.classList.add('hidden');
    }
}

if (adminToggleBtn) {
    adminToggleBtn.addEventListener('click', () => {
        if (!isAdmin) {
            const key = prompt("Admin Security Key ရိုက်ထည့်ပါ:");
            if (key === ADMIN_KEY) {
                isAdmin = true;
                updateAdminButtonsText();
                renderWishes(currentWishesData);
                alert("✅ Admin Mode ပွင့်သွားပါပြီ။");
            } else if (key !== null) {
                alert("❌ Security Key မှားယွင်းနေပါသည်!");
            }
        } else {
            isAdmin = false;
            updateAdminButtonsText();
            renderWishes(currentWishesData);
        }
    });
}

function fetchWishes() {
    fetch(GOOGLE_SHEET_WEBAPP_URL)
        .then(res => res.json())
        .then(data => {
            if (!data || data.length === 0) {
                renderWishes(defaultWishes);
            } else {
                renderWishes(data);
            }
        })
        .catch(err => {
            console.error("Error fetching wishes:", err);
            renderWishes(defaultWishes);
        });
}
fetchWishes();

function renderWishes(wishesArray) {
    currentWishesData = wishesArray;
    wishesListEl.innerHTML = '';
    wishesArray.forEach(item => {
        const div = document.createElement('div');
        div.className = 'wish-item';
        div.innerHTML = `
            <div class="wish-content">
                <h4>🪔 ${escapeHtml(item.name)}</h4>
                <p>${escapeHtml(item.message)}</p>
            </div>
            <div class="wish-actions">
                <button class="like-btn" data-name="${escapeHtml(item.name)}" data-wish="${escapeHtml(item.message)}">
                    ❤️ <span>${item.likes || 0}</span>
                </button>
                ${isAdmin ? `<button class="delete-wish-btn" data-name="${escapeHtml(item.name)}" data-wish="${escapeHtml(item.message)}">🗑️ ဖျက်မည်</button>` : ''}
            </div>
        `;
        
        div.querySelector('.like-btn').addEventListener('click', (e) => {
            const btn = e.currentTarget;
            const name = btn.getAttribute('data-name');
            const wish = btn.getAttribute('data-wish');
            handleLike(name, wish);
        });

        if (isAdmin) {
            const delBtn = div.querySelector('.delete-wish-btn');
            if (delBtn) {
                delBtn.addEventListener('click', (e) => {
                    const btn = e.currentTarget;
                    const name = btn.getAttribute('data-name');
                    const wish = btn.getAttribute('data-wish');
                    handleDelete(name, wish);
                });
            }
        }
        wishesListEl.prepend(div);
    });
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

wishForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('wishName').value.trim();
    const message = document.getElementById('wishMessage').value.trim();
    if (!name || !message) return;

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Wish', message);

    try {
        await fetch(GOOGLE_SHEET_WEBAPP_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });
        alert("🙏 ဆုတောင်းစာ ပေးပို့ပြီးပါပြီ!");
        wishForm.reset();
        setTimeout(fetchWishes, 2000);
    } catch (err) {
        alert("❌ ပေးပို့၍ မရပါ၊ ထပ်မံကြိုးစားပါ။");
    }
});

async function handleLike(name, wish) {
    const formData = new FormData();
    formData.append('action', 'likeWish');
    formData.append('name', name);
    formData.append('wish', wish);

    try {
        await fetch(GOOGLE_SHEET_WEBAPP_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });
        setTimeout(fetchWishes, 1200);
    } catch (err) {
        console.error("Like error:", err);
    }
}

async function handleDelete(name, wish) {
    if (!isAdmin) return;
    if (!confirm("ဒီဆုတောင်းစာကို ဖျက်မှာ သေချာပါသလား?")) return;

    const formData = new FormData();
    formData.append('action', 'deleteWish');
    formData.append('name', name);
    formData.append('wish', wish);

    try {
        await fetch(GOOGLE_SHEET_WEBAPP_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });
        alert("🗑️ ဆုတောင်းစာ ဖျက်ပြီးပါပြီ!");
        setTimeout(fetchWishes, 2000);
    } catch (err) {
        alert("❌ ဖျက်၍ မရပါ။");
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
