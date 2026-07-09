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

// 3. SKEMA CMS LENGKAP (Memadankan semua elemen pada paparan client)
const schema = {
    settings: {
        title: 'Halaman Utama & Teks', isSingle: true,
        fields: [
            // Hubungan Jenama & Meta
            { name: 'siteName', label: 'Nama Website (Logo)', type: 'text' },
            { name: 'copyright', label: 'Teks Hak Cipta (Copyright)', type: 'text' },

            // Bahagian Hero (Atas Sekali)
            { name: 'heroTitle', label: 'Hero Title (Tajuk Utama)', type: 'text' },
            { name: 'heroDesc', label: 'Hero Subtitle (Keterangan)', type: 'textarea' },
            { name: 'heroImg', label: 'Gambar Hero', type: 'image' },
            { name: 'nextGatheringTitle', label: 'Tajuk Kad Gathering (e.g. Next Gathering)', type: 'text' },
            { name: 'nextGatheringSub', label: 'Isi Kad Gathering (e.g. Friday Usrah)', type: 'text' },

            // Bahagian About Us
            { name: 'aboutTitle', label: 'Tajuk Bahagian About Us', type: 'text' },
            { name: 'aboutDesc', label: 'Keterangan Bahagian About Us', type: 'textarea' },
            { name: 'aboutImg', label: 'Gambar Bahagian About Us', type: 'image' },

            // Bahagian Join Us & WhatsApp
            { name: 'joinTitle', label: 'Tajuk Bahagian Join Us', type: 'text' },
            { name: 'joinDesc', label: 'Keterangan Bahagian Join Us', type: 'textarea' },
            { name: 'joinWhatsapp', label: 'Pautan WhatsApp Admin (Mula dengan https://wa.me/)', type: 'text' },
            { name: 'joinBtnText', label: 'Teks Butang WhatsApp (e.g. Join via WhatsApp)', type: 'text' },

            // Bahagian Kaki (Footer)
            { name: 'footerQuote', label: 'Petikan Ayat Al-Quran (Footer)', type: 'text' },
            { name: 'footerQuoteRef', label: 'Rujukan Ayat (e.g. Quran 49:10)', type: 'text' },
            { name: 'footerAddress', label: 'Alamat Footer', type: 'textarea' },
            { name: 'footerPhone', label: 'No. Telefon Admin (Teks Paparan)', type: 'text' },
            { name: 'instagramUrl', label: 'Pautan Instagram (Penuh)', type: 'text' },
            { name: 'facebookUrl', label: 'Pautan Facebook (Penuh)', type: 'text' },
            { name: 'telegramUrl', label: 'Pautan Telegram (Penuh)', type: 'text' }
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
            { name: 'registrationLink', label: 'Pautan Pendaftaran Event (WhatsApp/Google Form)', type: 'text' },
            { name: 'status', label: 'Status Paparan', type: 'select', options: ['Draft', 'Published'] }
        ]
    },
    resources: {
        title: 'Resources',
        fields: [
            { name: 'title', label: 'Tajuk Sumber/Rujukan', type: 'text' },
            { name: 'description', label: 'Keterangan Pendek', type: 'text' },
            { name: 'icon', label: 'FontAwesome Icon (e.g. fa-solid fa-headphones)', type: 'text' },
            { name: 'link', label: 'Pautan Fail / Web Rujukan', type: 'text' }
        ]
    },
    gallery: {
        title: 'Gallery Images',
        fields: [
            { name: 'caption', label: 'Keterangan Ringkas Gambar', type: 'text' },
            { name: 'image', label: 'Upload Gambar', type: 'image' }
        ]
    },
    testimonials: {
        title: 'Testimonials',
        fields: [
            { name: 'name', label: 'Nama Ahli', type: 'text' },
            { name: 'position', label: 'Jawatan/Status (e.g. Alumna, 3rd Year)', type: 'text' },
            { name: 'review', label: 'Komen / Maklum balas', type: 'textarea' }
        ]
    },
    faqs: {
        title: 'FAQs',
        fields: [
            { name: 'question', label: 'Soalan', type: 'text' },
            { name: 'answer', label: 'Jawapan', type: 'textarea' }
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
        config.fields.slice(0, 3).forEach(f => html += `<th class="p-3">${f.label}</th>`);
        html += `<th class="p-3 text-right">Actions</th></tr></thead><tbody>`;

        data.forEach(item => {
            html += `<tr class="border-b border-gray-700 hover:bg-gray-750">`;
            config.fields.slice(0, 3).forEach(f => {
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
        const val = item ? item[f.name] : '';
        html += `<div><label class="block text-sm font-bold mb-2 text-gray-300">${f.label}</label>`;
        
        if (f.type === 'textarea') {
            html += `<textarea id="${f.name}" class="w-full p-3 bg-gray-700 border-none rounded text-white" rows="4">${val || ''}</textarea>`;
        } else if (f.type === 'image') {
            html += `
                <div class="flex items-center gap-4 bg-gray-700 p-3 rounded">
                    ${val ? `<img src="${val}" width="60" class="rounded">` : ''}
                    <input type="file" id="file-${f.name}" accept="image/*" class="text-sm">
                    <input type="hidden" id="${f.name}" value="${val || ''}">
                </div>`;
        } else if (f.type === 'select') {
            html += `<select id="${f.name}" class="w-full p-3 bg-gray-700 border-none rounded text-white">`;
            f.options.forEach(opt => html += `<option value="${opt}" ${val===opt?'selected':''}>${opt}</option>`);
            html += `</select>`;
        } else {
            html += `<input type="text" id="${f.name}" value="${val || ''}" class="w-full p-3 bg-gray-700 border-none rounded text-white">`;
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
        
        // Memproses fail & muat naik gambar ke ImgBB
        for (const f of config.fields) {
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
