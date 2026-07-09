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
            { type: 'heading', label: '🌸 IDENTITI BRANDING & LOGO (BOLEH UBAH DENGAN UPLOAD)' },
            { name: 'siteLogoImg', label: 'Upload Gambar Logo Utama (Menggantikan Ikon Daun Asal)', type: 'image', default: '' },
            { name: 'siteLogoIcon', label: 'FontAwesome Icon Lalai (Jika tiada gambar logo diupload)', type: 'text', default: 'fa-solid fa-leaf' },
            { name: 'siteName', label: 'Nama Website (Logo Teks)', type: 'text', default: 'Hijrah Sisters' },
            { name: 'siteSub', label: 'Sub-Logo Teks (e.g. IIUMK)', type: 'text', default: 'IIUMK' },
            { name: 'navJoinBtnText', label: 'Teks Butang Navigasi Atas', type: 'text', default: 'Join Our Circle' },

            { type: 'heading', label: '✨ HERO SECTION (BAHAGIAN ATAS)' },
            { name: 'heroTagline', label: 'Teks Tagline Kecil', type: 'text', default: 'Growing in Faith, Knowledge & Sisterhood' },
            { name: 'heroTitle', label: 'Tajuk Utama Hero', type: 'text', default: 'A Safe Space for Every Muslimah to Grow' },
            { name: 'heroDesc', label: 'Keterangan Hero', type: 'textarea', default: '"Building hearts connected to Allah through knowledge, sincere sisterhood, and meaningful reminders."' },
            { name: 'heroImg', label: 'Gambar Hero Utama', type: 'image', default: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
            { name: 'heroJoinBtn', label: 'Teks Butang Utama (Primary)', type: 'text', default: 'Join Our Circle' },
            { name: 'heroExploreBtn', label: 'Teks Butang Kedua (Secondary)', type: 'text', default: 'Explore Events' },
            
            { type: 'heading', label: '📆 KAD NEXT GATHERING (PADA GAMBAR HERO)' },
            { name: 'nextGatheringIcon', label: 'Icon Kad Gathering (FontAwesome Class)', type: 'text', default: 'fa-solid fa-quran' },
            { name: 'nextGatheringTitle', label: 'Tajuk Kad Gathering', type: 'text', default: 'Next Gathering' },
            { name: 'nextGatheringSub', label: 'Isi Kad Gathering', type: 'text', default: 'Friday Usrah' },

            { type: 'heading', label: '📖 BAHAGIAN ABOUT US (TENTANG KAMI)' },
            { name: 'aboutTitle', label: 'Tajuk Seksyen About Us', type: 'text', default: 'Nurturing Souls, Building Sisterhood' },
            { name: 'aboutDesc1', label: 'Perenggan 1 About Us', type: 'textarea', default: 'Welcome to Hijrah Sisters IIUMK, a sanctuary designed for Muslim women. We are more than just a community; we are a support system dedicated to nurturing each other spiritually, emotionally, and intellectually.' },
            { name: 'aboutDesc2', label: 'Perenggan 2 About Us', type: 'textarea', default: 'In a fast-paced world, we provide a calm, welcoming space to pause, reflect, and reconnect with our Creator and our true selves. We grow together through:' },
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
            { name: 'testimonialsSwipeText', label: 'Teks Arahan Komen (Swipe Text)', type: 'text', default: 'Swipe to read more' },

            { type: 'heading', label: '🤝 BAHAGIAN JOIN OUR CIRCLE' },
            { name: 'joinTitle', label: 'Tajuk Seksyen Join', type: 'text', default: 'Become Part of Our Sisterhood' },
            { name: 'joinDesc', label: 'Keterangan Seksyen Join', type: 'textarea', default: 'Whether you are taking your first steps towards practicing or looking for a community to help you stay steadfast, there is a place for you here.' },
            { name: 'joinWhatsapp', label: 'Pautan Chat WhatsApp Admin (Mula dengan https://wa.me/)', type: 'text', default: 'https://wa.me/YOUR_PHONE_NUMBER_HERE?text=Assalamu%27alaikum!%20I%20am%20interested%20in%20joining%20Hijrah%20Sisters%20IIUMK.' },
            { name: 'joinBtnText', label: 'Teks Butang Hubungi', type: 'text', default: 'Join via WhatsApp' },
            { name: 'joinNoteText', label: 'Teks Nota di bawah Butang', type: 'text', default: 'Clicking the button will open a chat with our admin.' },
            { name: 'faqTitle', label: 'Tajuk Seksyen FAQ', type: 'text', default: 'Frequently Asked Questions' },

            { type: 'heading', label: '📌 KANDUNGAN FOOTER (BAHAGIAN KAKI)' },
            { name: 'footerQuote', label: 'Petikan Ayat Al-Quran (Footer)', type: 'text', default: 'Indeed, the believers are but brothers (and sisters).' },
            { name: 'footerQuoteRef', label: 'Rujukan Ayat (e.g. (Qur\'an 49:10))', type: 'text', default: '(Qur\'an 49:10)' },
            { name: 'footerLinksTitle', label: 'Tajuk Kolum Links', type: 'text', default: 'Quick Links' },
            { name: 'footerConnectTitle', label: 'Tajuk Kolum Hubungi', type: 'text', default: 'Connect With Us' },
            { name: 'footerAddress', label: 'Alamat Kaki Website', type: 'textarea', default: 'IIUM Kuantan Campus,\nPahang, Malaysia' },
            { name: 'footerPhone', label: 'No. Telefon Admin (Paparan)', type: 'text', default: '+60 12-345 6789 (Admin)' },
            { name: 'footerCopyright', label: 'Keterangan Hak Cipta', type: 'text', default: '© 2024 Hijrah Sisters IIUMK. All rights reserved.' },
            { name: 'footerCredit', label: 'Teks Penghargaan Pereka', type: 'text', default: 'Designed with ❤️ for the sake of Allah.' },
            { name: 'instagramUrl', label: 'Pautan Instagram (Penuh)', type: 'text', default: '#' },
            { name: 'facebookUrl', label: 'Pautan Facebook (Penuh)', type: 'text', default: '#' },
            { name: 'telegramUrl', label: 'Pautan Telegram (Penuh)', type: 'text', default: '#' }
        ]
    },
    activities: {
        title: 'Activities',
        fields: [
            { name: 'title', label: 'Nama Aktiviti', type: 'text' },
            { name: 'description', label: 'Keterangan Pendek', type: 'textarea' },
            { name: 'icon', label: 'FontAwesome Icon Class (e.g. fa-solid fa-users)', type: 'text' }
        ]
    },
    events: {
        title: 'Events',
        fields: [
            { name: 'title', label: 'Nama Event', type: 'text' },
            { name: 'category', label: 'Kategori Event (e.g. USRAH, RETREAT)', type: 'text' },
            { name: 'date', label: 'Tarikh & Hari (Teks)', type: 'text' },
            { name: 'venue', label: 'Tempat / Lokasi', type: 'text' },
            { name: 'image', label: 'Poster Event', type: 'image' },
            { name: 'registrationLink', label: 'Pautan Pendaftaran Event', type: 'text' },
            { name: 'status', label: 'Status Paparan', type: 'select', options: ['Draft', 'Published'] }
        ]
    },
    resources: {
        title: 'Resources',
        fields: [
            { name: 'title', label: 'Tajuk Rujukan', type: 'text' },
            { name: 'description', label: 'Keterangan Rujukan', type: 'text' },
            { name: 'icon', label: 'Icon Class (e.g. fa-solid fa-book)', type: 'text' },
            { name: 'link', label: 'Pautan Fail/Laman', type: 'text' }
        ]
    },
    gallery: {
        title: 'Gallery Images',
        fields: [
            { name: 'caption', label: 'Keterangan Gambar', type: 'text' },
            { name: 'image', label: 'Upload Gambar', type: 'image' }
        ]
    },
    testimonials: {
        title: 'Testimonials',
        fields: [
            { name: 'name', label: 'Nama Ahli', type: 'text' },
            { name: 'position', label: 'Status (e.g. Alumna, 3rd Year)', type: 'text' },
            { name: 'review', label: 'Ulasan Ahli', type: 'textarea' }
        ]
    },
    faqs: {
        title: 'FAQs',
        fields: [
            { name: 'question', label: 'Soalan FAQ', type: 'text' },
            { name: 'answer', label: 'Jawapan FAQ', type: 'textarea' }
        ]
    }
};

let currentToken = null;

// Mengawal log masuk Firebase Auth
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
    try {
        await auth.signInWithEmailAndPassword(document.getElementById('email').value, document.getElementById('password').value);
    } catch (err) { alert("Login failed: " + err.message); }
});

document.getElementById('logout-btn').addEventListener('click', () => auth.signOut());

function buildMenu() {
    document.getElementById('menu-container').innerHTML = Object.keys(schema).map(key => `
        <button onclick="loadCollection('${key}')" class="w-full text-left p-3 rounded hover:bg-gray-700 transition-colors">
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
        config.fields.filter(f => f.type !== 'heading').slice(0, 3).forEach(f => html += `<th class="p-3">${f.label}</th>`);
        html += `<th class="p-3 text-right">Actions</th></tr></thead><tbody>`;

        data.forEach(item => {
            html += `<tr class="border-b border-gray-700 hover:bg-gray-750">`;
            config.fields.filter(f => f.type !== 'heading').slice(0, 3).forEach(f => {
                const val = item[f.name] || '';
                html += `<td class="p-3">${f.type === 'image' ? `<img src="${val}" class="w-12 h-12 object-cover rounded">` : val}</td>`;
            });
            html += `<td class="p-3 text-right">
                <button onclick='renderForm("${collectionId}", ${JSON.stringify(item)})' class="text-blue-400 mr-4">Edit</button>
                <button onclick='deleteItem("${collectionId}", "${item.id}")' class="text-red-400">Delete</button>
            </td></tr>`;
        });
        html += `</tbody></table>`;
        content.innerHTML = html;
    }
}

window.renderForm = function(collectionId, item = null) {
    const config = schema[collectionId];
    document.getElementById('add-new-btn').classList.add('hidden');
    
    let html = `<form id="dynamic-form" class="space-y-6 max-w-2xl">`;
    config.fields.forEach(f => {
        if (f.type === 'heading') {
            html += `
                <div class="pt-8 border-t border-gray-700 mt-8 first:pt-0 first:mt-0 first:border-none">
                    <h3 class="text-lg font-serif font-bold text-pink-400 flex items-center gap-2">
                        ${f.label}
                    </h3>
                </div>`;
            return;
        }

        const val = item ? item[f.name] : '';
        const displayVal = (val !== undefined && val !== null && val !== '') ? val : (f.default || '');

        html += `<div><label class="block text-sm font-bold mb-2 text-gray-300">${f.label}</label>`;
        
        if (f.type === 'textarea') {
            html += `<textarea id="${f.name}" class="w-full p-3 bg-gray-700 border-none rounded text-white" rows="4">${displayVal}</textarea>`;
        } else if (f.type === 'image') {
            html += `
                <div class="flex items-center gap-4 bg-gray-700 p-3 rounded">
                    ${displayVal ? `<img src="${displayVal}" id="preview-${f.name}" width="60" class="rounded">` : ''}
                    <input type="file" id="file-${f.name}" accept="image/*" class="text-sm">
                    <input type="hidden" id="${f.name}" value="${displayVal || ''}">
                </div>`;
        } else if (f.type === 'select') {
            html += `<select id="${f.name}" class="w-full p-3 bg-gray-700 border-none rounded text-white">`;
            f.options.forEach(opt => html += `<option value="${opt}" ${displayVal===opt?'selected':''}>${opt}</option>`);
            html += `</select>`;
        } else {
            html += `<input type="text" id="${f.name}" value="${displayVal}" class="w-full p-3 bg-gray-700 border-none rounded text-white">`;
        }
        html += `</div>`;
    });

    html += `<div class="flex gap-4 pt-6 border-t border-gray-700">
        <button type="submit" class="bg-pink-600 text-white px-6 py-2 rounded font-bold hover:bg-pink-700" id="save-btn">Save</button>
        ${!config.isSingle ? `<button type="button" onclick="loadCollection('${collectionId}')" class="bg-gray-600 px-6 py-2 rounded font-bold">Cancel</button>` : ''}
    </div></form>`;

    document.getElementById('content-area').innerHTML = html;

    document.getElementById('dynamic-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('save-btn');
        btn.innerText = 'Saving...';
        btn.disabled = true;

        const payload = {};
        
        for (const f of config.fields) {
            if (f.type === 'heading') continue;

            if (f.type === 'image') {
                const fileInput = document.getElementById(`file-${f.name}`);
                if (fileInput.files.length > 0) {
                    const formData = new FormData();
                    formData.append('image', fileInput.files[0]);

                    try {
                        const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, { method: 'POST', body: formData });
                        const imgData = await imgRes.json();
                        if (imgData.success) {
                            payload[f.name] = imgData.data.url;
                        } else {
                            alert("Image upload failed"); return;
                        }
                    } catch (err) { alert("ImgBB error"); return; }
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
        } catch (err) { alert('Error saving data'); btn.innerText = 'Save'; btn.disabled = false; }
    });
}

window.deleteItem = async function(collectionId, itemId) {
    if(confirm('Delete this item permanently?')) {
        await apiCall(`${collectionId}/${itemId}`, 'DELETE');
        loadCollection(collectionId);
    }
}
