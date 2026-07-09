// 1. FIREBASE AUTH CONFIG (Replace with your Firebase Web Config)
const firebaseConfig = {
    apiKey: "AIzaSyATtQm1xsf3bOlIB1xR76koRP2zAGBGdMs",
    authDomain: "hijrahsister.firebaseapp.com",
    projectId: "hijrahsister"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// 2. IMGBB API KEY (Get this from api.imgbb.com)
const IMGBB_API_KEY = "50e185b01c7b0fb4206b32827c88a766";
// 3. SKEMA CMS 100% DINAMIK - MEMUATKAN SEMUA DATA ASAL DARI CLIENT INDEX.HTML
const schema = {
    settings: {
        title: 'Halaman Utama & Teks', isSingle: true,
        fields: [
            { type: 'heading', label: '🌸 IDENTITI BRANDING & LOGO' },
            { name: 'siteLogoImg', label: 'Upload Gambar Logo Utama (Menggantikan Ikon)', type: 'image', default: '' },
            { name: 'siteLogoIcon', label: 'FontAwesome Icon Lalai', type: 'text', default: 'fa-solid fa-leaf', placeholder: 'e.g. fa-solid fa-leaf' },
            { name: 'siteName', label: 'Nama Website (Logo Teks)', type: 'text', default: 'Hijrah Sisters', placeholder: 'e.g. Hijrah Sisters' },
            { name: 'siteSub', label: 'Sub-Logo Teks', type: 'text', default: 'IIUMK', placeholder: 'e.g. IIUMK' },
            { name: 'navJoinBtnText', label: 'Teks Butang Navigasi Atas', type: 'text', default: 'Join Our Circle' },

            { type: 'heading', label: '✨ HERO SECTION (BAHAGIAN ATAS)' },
            { name: 'heroTagline', label: 'Teks Tagline Kecil', type: 'text', default: 'Growing in Faith, Knowledge & Sisterhood' },
            { name: 'heroTitle', label: 'Tajuk Utama Hero', type: 'text', default: 'A Safe Space for Every Muslimah to Grow' },
            { name: 'heroDesc', label: 'Keterangan Hero', type: 'textarea', default: '"Building hearts connected to Allah through knowledge, sincere sisterhood, and meaningful reminders."' },
            { name: 'heroImg', label: 'Gambar Hero Utama', type: 'image', default: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'heroJoinBtn', label: 'Teks Butang Utama', type: 'text', default: 'Join Our Circle' },
            { name: 'heroExploreBtn', label: 'Teks Butang Kedua', type: 'text', default: 'Explore Events' },
            
            { type: 'heading', label: '📆 KAD NEXT GATHERING' },
            { name: 'nextGatheringIcon', label: 'Icon Kad (FontAwesome Class)', type: 'text', default: 'fa-solid fa-quran', placeholder: 'e.g. fa-solid fa-quran' },
            { name: 'nextGatheringTitle', label: 'Tajuk Kad', type: 'text', default: 'Next Gathering' },
            { name: 'nextGatheringSub', label: 'Isi Kad', type: 'text', default: 'Friday Usrah' },

            { type: 'heading', label: '📖 BAHAGIAN ABOUT US' },
            { name: 'aboutTitle', label: 'Tajuk Seksyen', type: 'text', default: 'Nurturing Souls, Building Sisterhood' },
            { name: 'aboutDesc1', label: 'Perenggan 1', type: 'textarea', default: 'Welcome to Hijrah Sisters IIUMK, a sanctuary designed for Muslim women. We are more than just a community; we are a support system dedicated to nurturing each other spiritually, emotionally, and intellectually.' },
            { name: 'aboutDesc2', label: 'Perenggan 2', type: 'textarea', default: 'In a fast-paced world, we provide a calm, welcoming space to pause, reflect, and reconnect with our Creator and our true selves. We grow together through:' },
            { name: 'aboutBullet1', label: 'Bullet Point 1', type: 'text', default: 'Weekly Usrah & Heart Talks' },
            { name: 'aboutBullet2', label: 'Bullet Point 2', type: 'text', default: 'Quran Reflections & Tadabbur' },
            { name: 'aboutBullet3', label: 'Bullet Point 3', type: 'text', default: 'Personal Development based on Islam' },
            { name: 'aboutImg', label: 'Gambar Seksyen About Us', type: 'image', default: 'https://images.unsplash.com/photo-1507914372368-b2b085cc1450?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },

            { type: 'heading', label: '🛠️ KAWALAN TAJUK SEKSYEN LAIN' },
            { name: 'activitiesTitle', label: 'Tajuk Seksyen Activities', type: 'text', default: 'Our Activities' },
            { name: 'eventsTitle', label: 'Tajuk Seksyen Events', type: 'text', default: 'Upcoming Events' },
            { name: 'eventsSubtitle', label: 'Keterangan Seksyen Events', type: 'text', default: 'Join us in our upcoming gatherings.' },
            { name: 'eventsFilterAll', label: 'Teks Filter "All"', type: 'text', default: 'All' },
            { name: 'eventsFilterMonth', label: 'Teks Filter "This Month"', type: 'text', default: 'This Month' },
            { name: 'resourcesTitle', label: 'Tajuk Seksyen Resources', type: 'text', default: 'Nourish Your Soul' },
            { name: 'resourcesSubtitle', label: 'Keterangan Seksyen Resources', type: 'text', default: 'Curated resources for your spiritual journey.' },
            { name: 'galleryTitle', label: 'Tajuk Seksyen Gallery', type: 'text', default: 'Moments of Sisterhood' },
            { name: 'gallerySubtitle', label: 'Keterangan Seksyen Gallery', type: 'text', default: 'Glimpses of our peaceful gatherings.' },
            { name: 'testimonialsSwipeText', label: 'Teks Arahan Komen', type: 'text', default: 'Swipe to read more' },

            { type: 'heading', label: '🤝 BAHAGIAN JOIN OUR CIRCLE' },
            { name: 'joinTitle', label: 'Tajuk Seksyen Join', type: 'text', default: 'Become Part of Our Sisterhood' },
            { name: 'joinDesc', label: 'Keterangan Seksyen Join', type: 'textarea', default: 'Whether you are taking your first steps towards practicing or looking for a community to help you stay steadfast, there is a place for you here.' },
            { name: 'joinWhatsapp', label: 'Pautan WhatsApp Admin', type: 'text', default: 'https://wa.me/60123456789' },
            { name: 'joinBtnText', label: 'Teks Butang WhatsApp', type: 'text', default: 'Join via WhatsApp' },
            { name: 'joinNoteText', label: 'Teks Nota Bawah Butang', type: 'text', default: 'Clicking the button will open a chat with our admin.' },
            { name: 'faqTitle', label: 'Tajuk FAQ', type: 'text', default: 'Frequently Asked Questions' },

            { type: 'heading', label: '📌 FOOTER & MEDIA SOSIAL' },
            { name: 'footerQuote', label: 'Petikan Quran', type: 'text', default: 'Indeed, the believers are but brothers (and sisters).' },
            { name: 'footerQuoteRef', label: 'Rujukan Petikan', type: 'text', default: '(Qur\'an 49:10)' },
            { name: 'footerLinksTitle', label: 'Tajuk Kolum Links', type: 'text', default: 'Quick Links' },
            { name: 'footerConnectTitle', label: 'Tajuk Kolum Hubungi', type: 'text', default: 'Connect With Us' },
            { name: 'footerAddress', label: 'Alamat Kaki', type: 'textarea', default: 'IIUM Kuantan Campus,\nPahang, Malaysia' },
            { name: 'footerPhone', label: 'No Telefon Paparan', type: 'text', default: '+60 12-345 6789 (Admin)' },
            { name: 'instagramUrl', label: 'Pautan Instagram', type: 'text', default: '#' },
            { name: 'facebookUrl', label: 'Pautan Facebook', type: 'text', default: '#' },
            { name: 'telegramUrl', label: 'Pautan Telegram', type: 'text', default: '#' },
            { name: 'tiktokUrl', label: 'Pautan TikTok', type: 'text', default: '#' }
        ]
    },
    activities: {
        title: 'Activities',
        fields: [
            { name: 'title', label: 'Nama Aktiviti', type: 'text', placeholder: 'e.g. Weekly Usrah' },
            { name: 'description', label: 'Keterangan Aktiviti', type: 'textarea', placeholder: 'e.g. Intimate circles sharing reminders and strengthening bonds.' },
            { name: 'icon', label: 'Icon Class (e.g. fa-solid fa-users)', type: 'text', placeholder: 'fa-solid fa-users' }
        ]
    },
    events: {
        title: 'Events',
        fields: [
            { name: 'title', label: 'Nama Event', type: 'text', placeholder: 'e.g. Tafakkur in Nature' },
            { name: 'category', label: 'Kategori', type: 'text', placeholder: 'e.g. RETREAT, USRAH' },
            { name: 'date', label: 'Hari & Tarikh', type: 'text', placeholder: 'e.g. Sunday, 10th Dec 2024' },
            { name: 'venue', label: 'Tempat / Lokasi', type: 'text', placeholder: 'e.g. Botanical Gardens' },
            { name: 'image', label: 'Poster Event', type: 'image' },
            { name: 'registrationLink', label: 'Pautan Pendaftaran WhatsApp', type: 'text', placeholder: 'e.g. https://wa.me/60123456789' },
            { name: 'status', label: 'Status Paparan', type: 'select', options: ['Draft', 'Published'] }
        ]
    },
    resources: {
        title: 'Resources',
        fields: [
            { name: 'title', label: 'Tajuk Rujukan', type: 'text', placeholder: 'e.g. Recommended Books' },
            { name: 'description', label: 'Keterangan Rujukan', type: 'text', placeholder: 'e.g. A library of must-read Islamic books.' },
            { name: 'icon', label: 'Icon Class (e.g. fa-solid fa-book)', type: 'text', placeholder: 'fa-solid fa-book' },
            { name: 'link', label: 'Pautan Rujukan', type: 'text', placeholder: 'e.g. https://example.com/books' }
        ]
    },
    gallery: {
        title: 'Gallery Images',
        fields: [
            { name: 'caption', label: 'Keterangan Gambar', type: 'text', placeholder: 'e.g. Coffee meetup' },
            { name: 'image', label: 'Upload Gambar', type: 'image' }
        ]
    },
    testimonials: {
        title: 'Testimonials',
        fields: [
            { name: 'name', label: 'Nama Ahli', type: 'text', placeholder: 'e.g. Fatimah Z.' },
            { name: 'position', label: 'Status', type: 'text', placeholder: 'e.g. Alumna' },
            { name: 'review', label: 'Ulasan Ahli', type: 'textarea', placeholder: 'Tulis komen di sini...' }
        ]
    },
    faqs: {
        title: 'FAQs',
        fields: [
            { name: 'question', label: 'Soalan FAQ', type: 'text', placeholder: 'Tulis soalan di sini...' },
            { name: 'answer', label: 'Jawapan FAQ', type: 'textarea', placeholder: 'Tulis jawapan di sini...' }
        ]
    }
};

let currentToken = null;

auth.onAuthStateChanged(async user => {
    if (user) {
        currentToken = await user.getIdToken();
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('sidebar').classList.remove('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        buildMenu();
        loadCollection('events');
    } else {
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('sidebar').classList.add('hidden');
        document.getElementById('main-content').classList.add('hidden');
    }
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (err) { alert("Login failed: " + err.message); }
});

document.getElementById('logout-btn').addEventListener('click', () => auth.signOut());

function buildMenu() {
    document.getElementById('menu-container').innerHTML = Object.keys(schema).map(key => `
        <button onclick="loadCollection('${key}')" class="w-full text-left p-3 rounded hover:bg-gray-800 transition-colors">
            ${schema[key].title}
        </button>
    `).join('');
}

async function apiCall(endpoint, method = 'GET', body = null) {
    const options = { method, headers: { 'Authorization': `Bearer ${currentToken}`, 'Content-Type': 'application/json' } };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(`/api/admin/${endpoint}`, options);
    return res.json();
}

async function loadCollection(collectionId) {
    const config = schema[collectionId];
    document.getElementById('page-title').innerText = config.title;
    const content = document.getElementById('content-area');
    content.innerHTML = '<p class="text-gray-400">Loading data...</p>';

    if (config.isSingle) {
        document.getElementById('add-new-btn').classList.add('hidden');
        const data = await apiCall(collectionId);
        renderForm(collectionId, data[0] || { id: 'general' }); 
    } else {
        document.getElementById('add-new-btn').classList.remove('hidden');
        document.getElementById('add-new-btn').onclick = () => renderForm(collectionId);
        
        const data = await apiCall(collectionId);
        
        let html = `<table class="w-full text-left"><thead><tr class="border-b border-gray-700">`;
        config.fields.filter(f => f.type !== 'heading').slice(0, 3).forEach(f => html += `<th class="p-3 text-pink-400 text-xs uppercase">${f.label}</th>`);
        html += `<th class="p-3 text-right text-pink-400 text-xs uppercase">Tindakan</th></tr></thead><tbody>`;

        data.forEach(item => {
            html += `<tr class="border-b border-gray-800 hover:bg-gray-900/40">`;
            config.fields.filter(f => f.type !== 'heading').slice(0, 3).forEach(f => {
                const val = item[f.name] || '';
                html += `<td class="p-3 text-sm">${f.type === 'image' ? `<img src="${val}" class="w-12 h-12 object-cover rounded-xl border border-gray-700">` : val}</td>`;
            });
            html += `<td class="p-3 text-right">
                <button onclick='renderForm("${collectionId}", ${JSON.stringify(item)})' class="text-blue-400 mr-4 font-bold text-sm">Edit</button>
                <button onclick='deleteItem("${collectionId}", "${item.id}")' class="text-red-400 font-bold text-sm">Delete</button>
            </td></tr>`;
        });
        html += `</tbody></table>`;
        content.innerHTML = html;
    }
}

window.clearImageField = function(fieldName) {
    document.getElementById(fieldName).value = '';
    const preview = document.getElementById(`preview-${fieldName}`);
    if (preview) preview.src = '';
    const fileInput = document.getElementById(`file-${fieldName}`);
    if (fileInput) fileInput.value = '';
    alert('Imej dipadam daripada draf. Klik "Save" untuk simpan perubahan.');
};

window.renderForm = function(collectionId, item = null) {
    const config = schema[collectionId];
    document.getElementById('add-new-btn').classList.add('hidden');
    
    let html = `<form id="dynamic-form" class="space-y-6 max-w-2xl">`;
    config.fields.forEach(f => {
        if (f.type === 'heading') {
            html += `
                <div class="pt-8 border-t border-gray-800 mt-8 first:pt-0 first:mt-0 first:border-none">
                    <h3 class="text-md font-serif font-bold text-pink-400 flex items-center gap-2">
                        ${f.label}
                    </h3>
                </div>`;
            return;
        }

        const val = item ? item[f.name] : '';
        const displayVal = (val !== undefined && val !== null && val !== '') ? val : (f.default || '');
        const placeholderVal = f.placeholder || '';

        html += `<div><label class="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">${f.label}</label>`;
        
        if (f.type === 'textarea') {
            html += `<textarea id="${f.name}" placeholder="${placeholderVal}" class="w-full p-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-pink-500" rows="4">${displayVal}</textarea>`;
        } else if (f.type === 'image') {
            html += `
                <div class="flex items-center gap-4 bg-gray-900 p-4 border border-gray-800 rounded-xl">
                    <img src="${displayVal}" id="preview-${f.name}" width="70" class="rounded-xl border border-gray-700 bg-black/40 min-h-[50px] object-cover" onerror="this.style.display='none'" onload="this.style.display='block'">
                    <div class="flex-grow">
                        <input type="file" id="file-${f.name}" accept="image/*" class="text-xs text-gray-400">
                        <input type="hidden" id="${f.name}" value="${displayVal || ''}">
                    </div>
                    <button type="button" onclick="clearImageField('${f.name}')" class="bg-red-950/40 border border-red-900 text-red-400 text-xs px-3 py-1.5 rounded-lg hover:bg-red-900/50">Reset</button>
                </div>`;
        } else if (f.type === 'select') {
            html += `<select id="${f.name}" class="w-full p-3 bg-gray-900 border border-gray-800 rounded-xl text-white">`;
            f.options.forEach(opt => html += `<option value="${opt}" ${displayVal===opt?'selected':''}>${opt}</option>`);
            html += `</select>`;
        } else {
            html += `<input type="text" id="${f.name}" placeholder="${placeholderVal}" value="${displayVal}" class="w-full p-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:outline-none focus:border-pink-500">`;
        }
        html += `</div>`;
    });

    // PANDUAN FONTAWESOME DROPDOWN (COLLAPSIBLE ACCORDION GUNA <details>)
    html += `
        <details class="group border border-gray-800 bg-gray-900/30 rounded-2xl overflow-hidden mt-6 transition-all duration-300">
            <summary class="flex cursor-pointer items-center justify-between p-4 text-pink-400 font-bold text-xs uppercase tracking-widest [&::-webkit-details-marker]:hidden bg-gray-950 select-none">
                <span class="flex items-center gap-2">
                    <i class="fa-solid fa-circle-info"></i> 
                    💡 Lihat Panduan Kod Ikon (26 Pilihan Ikon)
                </span>
                <span class="transition-transform group-open:rotate-180">
                    <i class="fa-solid fa-chevron-down text-gray-400"></i>
                </span>
            </summary>
            <div class="p-5 border-t border-gray-850 bg-gray-900/10">
                <p class="text-xs text-gray-400 mb-4">Salin (Copy) nama kod di bawah dan tampal (paste) ke dalam ruangan input <b>Icon Class</b> di atas:</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div class="flex items-center gap-2.5 bg-gray-950 p-2.5 rounded-xl"><i class="fa-solid fa-users text-pink-400 w-5 text-center"></i> <span>fa-solid fa-users</span> (Usrah / Ahli)</div>
                    <div class="flex items-center gap-2.5 bg-gray-950 p-2.5 rounded-xl"><i class="fa-solid fa-book-quran text-pink-400 w-5 text-center"></i> <span>fa-solid fa-book-quran</span> (Al-Quran)</div>
                    <div class="flex items-center gap-2.5 bg-gray-950 p-2.5 rounded-xl"><i class="fa-solid fa-mug-hot text-pink-400 w-5 text-center"></i> <span>fa-solid fa-mug-hot</span> (Book Club)</div>
                    <div class="flex items-center gap-2.5 bg-gray-950 p-2.5 rounded-xl"><i class="fa-solid fa-microphone-lines text-pink-400 w-5 text-center"></i> <span>fa-solid fa-microphone-lines</span> (Ceramah)</div>
                    <div class="flex items-center gap-2.5 bg-gray-950 p-2.5 rounded-xl"><i class="fa-solid fa-leaf text-pink-400 w-5 text-center"></i> <span>fa-solid fa-leaf</span> (Retreat / Daun)</div>
                    <div class="flex items-center gap-2.5 bg-gray-950 p-2.5 rounded-xl"><i class="fa-solid fa-headphones text-pink-400 w-5 text-center"></i> <span>fa-solid fa-headphones</span> (Podcast)</div>
                    <div class="flex items-center gap-2.5 bg-gray-950 p-2.5 rounded-xl"><i class="fa-solid fa-pen-nib text-pink-400 w-5 text-center"></i> <span>fa-solid fa-pen-nib</span> (Artikel)</div>
                    <div class="flex items-center gap-2.5 bg-gray-950 p-2.5 rounded-xl"><i class="fa-solid fa-book-journal-whills text-pink-400 w-5 text-center"></i> <span>fa-solid fa-book-journal-whills</span></div>
                    <div class="flex items-center gap-3"><i class="fa-solid fa-mosque text-pink-400 w-5"></i> <span>fa-solid fa-mosque</span></div>
                    <div class="flex items-center gap-3"><i class="fa-solid fa-heart text-pink-400 w-5"></i> <span>fa-solid fa-heart</span></div>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-graduation-cap text-pink-400 w-5 text-center"></i> <span>fa-solid fa-graduation-cap</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-compass text-pink-400 w-5 text-center"></i> <span>fa-solid fa-compass</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-calendar-days text-pink-400 w-5 text-center"></i> <span>fa-solid fa-calendar-days</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-star text-pink-400 w-5 text-center"></i> <span>fa-solid fa-star</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-hands-praying text-pink-400 w-5 text-center"></i> <span>fa-solid fa-hands-praying</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-lightbulb text-pink-400 w-5 text-center"></i> <span>fa-solid fa-lightbulb</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-clock text-pink-400 w-5 text-center"></i> <span>fa-solid fa-clock</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-seedling text-pink-400 w-5 text-center"></i> <span>fa-solid fa-seedling</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-dove text-pink-400 w-5 text-center"></i> <span>fa-solid fa-dove</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-moon text-pink-400 w-5 text-center"></i> <span>fa-solid fa-moon</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-house-chimney-window text-pink-400 w-5 text-center"></i> <span>fa-solid fa-house-chimney-window</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-globe text-pink-400 w-5 text-center"></i> <span>fa-solid fa-globe</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-comments text-pink-400 w-5 text-center"></i> <span>fa-solid fa-comments</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-file-pdf text-pink-400 w-5 text-center"></i> <span>fa-solid fa-file-pdf</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-video text-pink-400 w-5 text-center"></i> <span>fa-solid fa-video</span></li>
                    <li class="flex items-center gap-3 bg-gray-950 p-2 rounded-xl"><i class="fa-solid fa-gem text-pink-400 w-5 text-center"></i> <span>fa-solid fa-gem</span></li>
                </div>
            </div>
        </details>`;

    html += `<div class="flex gap-4 pt-6 border-t border-gray-800">
        <button type="submit" class="bg-pink-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-pink-700 transition-all active:scale-95" id="save-btn">Simpan Perubahan</button>
        ${!config.isSingle ? `<button type="button" onclick="loadCollection('${collectionId}')" class="bg-gray-800 border border-gray-700 text-gray-300 px-6 py-2.5 rounded-xl font-bold">Batal</button>` : ''}
    </div></form>`;

    document.getElementById('content-area').innerHTML = html;

    document.getElementById('dynamic-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('save-btn');
        btn.innerText = 'Menyimpan...';
        btn.disabled = true;

        const payload = {};
        
        for (const f of config.fields) {
            if (f.type === 'heading') continue;

            if (f.type === 'image') {
                const fileInput = document.getElementById(`file-${f.name}`);
                if (fileInput && fileInput.files.length > 0) {
                    const formData = new FormData();
                    formData.append('image', fileInput.files[0]);

                    try {
                        const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: 'POST', body: formData });
                        const imgData = await imgRes.json();
                        if (imgData.success) {
                            payload[f.name] = imgData.data.url;
                        } else {
                            alert("Muat naik gambar gagal, ImgBB mengembalikan ralat."); return;
                        }
                    } catch (err) { alert("Sistem tidak dapat berhubung dengan ImgBB."); return; }
                } else {
                    payload[f.name] = document.getElementById(f.name).value;
                }
            } else {
                payload[f.name] = document.getElementById(f.name).value;
            }
        }

        try {
            if (item && item.id) await apiCall(`${collectionId}/${item.id}`, 'PUT', payload);
            else await apiCall(`${collectionId}`, 'POST', payload);
            loadCollection(collectionId);
        } catch (err) { alert('Ralat semasa menyimpan ke database.'); btn.innerText = 'Simpan'; btn.disabled = false; }
    });
}

window.deleteItem = async function(collectionId, itemId) {
    if(confirm('Padam item ini selama-lamanya?')) {
        await apiCall(`${collectionId}/${itemId}`, 'DELETE');
        loadCollection(collectionId);
    }
}
