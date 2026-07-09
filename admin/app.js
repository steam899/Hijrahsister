// 1. Initialize Firebase (REPLACE WITH YOUR FIREBASE CONFIG)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT",
    storageBucket: "YOUR_PROJECT.appspot.com",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();

// 2. CMS Schema Configuration (Add all 15 modules here)
const schema = {
    events: {
        title: 'Events',
        fields: [
            { name: 'title', label: 'Event Title', type: 'text' },
            { name: 'category', label: 'Category (e.g. Usrah)', type: 'text' },
            { name: 'date', label: 'Date & Time', type: 'text' },
            { name: 'venue', label: 'Location', type: 'text' },
            { name: 'image', label: 'Featured Image', type: 'image' },
            { name: 'registrationLink', label: 'WhatsApp / Reg Link', type: 'text' },
            { name: 'status', label: 'Status', type: 'select', options: ['Draft', 'Published'] }
        ]
    },
    activities: {
        title: 'Activities',
        fields: [
            { name: 'title', label: 'Title', type: 'text' },
            { name: 'description', label: 'Description', type: 'textarea' },
            { name: 'icon', label: 'FontAwesome Icon Class', type: 'text' }
        ]
    },
    gallery: {
        title: 'Gallery Images',
        fields: [
            { name: 'caption', label: 'Caption', type: 'text' },
            { name: 'url', label: 'Upload Image', type: 'image' }
        ]
    },
    settings: {
        title: 'General Settings',
        isSingle: true, // No list view, just one form
        fields: [
            { name: 'siteName', label: 'Website Name', type: 'text' },
            { name: 'heroTitle', label: 'Hero Title', type: 'text' },
            { name: 'heroImg', label: 'Hero Background Image', type: 'image' }
        ]
    }
};

let currentToken = null;
let currentCollection = null;

// 3. Authentication Flow
auth.onAuthStateChanged(async user => {
    if (user) {
        currentToken = await user.getIdToken();
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('sidebar').classList.remove('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        buildMenu();
        loadCollection('events'); // Default load
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
    } catch (error) {
        alert("Login failed: " + error.message);
    }
});

document.getElementById('logout-btn').addEventListener('click', () => auth.signOut());

// 4. UI Builders
function buildMenu() {
    const menuHtml = Object.keys(schema).map(key => `
        <button onclick="loadCollection('${key}')" class="w-full text-left p-3 rounded hover:bg-gray-800 transition-colors">
            ${schema[key].title}
        </button>
    `).join('');
    document.getElementById('menu-container').innerHTML = menuHtml;
}

async function apiCall(endpoint, method = 'GET', body = null) {
    const options = {
        method,
        headers: { 'Authorization': `Bearer ${currentToken}`, 'Content-Type': 'application/json' }
    };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(`/api/admin/${endpoint}`, options);
    return res.json();
}

// 5. Collection Rendering Engine (Table & Forms)
async function loadCollection(collectionId) {
    currentCollection = collectionId;
    const config = schema[collectionId];
    document.getElementById('page-title').innerText = config.title;
    
    const content = document.getElementById('content-area');
    content.innerHTML = '<p>Loading...</p>';

    if (config.isSingle) {
        document.getElementById('add-new-btn').classList.add('hidden');
        const data = await apiCall(`${collectionId}`);
        renderForm(collectionId, data[0] || { id: 'general' }); 
    } else {
        document.getElementById('add-new-btn').classList.remove('hidden');
        document.getElementById('add-new-btn').onclick = () => renderForm(collectionId);
        
        const data = await apiCall(collectionId);
        
        let tableHtml = `<table class="w-full border-collapse"><thead><tr class="bg-gray-100 text-left">`;
        config.fields.slice(0, 3).forEach(f => tableHtml += `<th class="p-3 border-b">${f.label}</th>`);
        tableHtml += `<th class="p-3 border-b">Actions</th></tr></thead><tbody>`;

        data.forEach(item => {
            tableHtml += `<tr>`;
            config.fields.slice(0, 3).forEach(f => {
                const val = item[f.name] || '';
                tableHtml += `<td class="p-3 border-b">${f.type === 'image' ? `<img src="${val}" width="50" class="rounded">` : val}</td>`;
            });
            tableHtml += `<td class="p-3 border-b">
                <button onclick='renderForm("${collectionId}", ${JSON.stringify(item)})' class="text-blue-600 mr-3">Edit</button>
                <button onclick='deleteItem("${collectionId}", "${item.id}")' class="text-red-600">Delete</button>
            </td></tr>`;
        });
        tableHtml += `</tbody></table>`;
        content.innerHTML = tableHtml;
    }
}

// 6. Dynamic Form Generator
window.renderForm = function(collectionId, item = null) {
    const config = schema[collectionId];
    const content = document.getElementById('content-area');
    document.getElementById('add-new-btn').classList.add('hidden');

    let formHtml = `<form id="dynamic-form" class="space-y-6">`;
    
    config.fields.forEach(f => {
        const val = item ? item[f.name] : '';
        formHtml += `<div><label class="block text-sm font-bold mb-2">${f.label}</label>`;
        
        if (f.type === 'textarea') {
            formHtml += `<textarea id="${f.name}" class="w-full p-2 border rounded" rows="4">${val || ''}</textarea>`;
        } else if (f.type === 'image') {
            formHtml += `
                <div class="flex items-center gap-4">
                    ${val ? `<img src="${val}" id="preview-${f.name}" width="100" class="rounded shadow">` : ''}
                    <input type="file" id="file-${f.name}" accept="image/*" class="p-2">
                    <input type="hidden" id="${f.name}" value="${val || ''}">
                </div>`;
        } else if (f.type === 'select') {
            formHtml += `<select id="${f.name}" class="w-full p-2 border rounded">`;
            f.options.forEach(opt => formHtml += `<option value="${opt}" ${val===opt?'selected':''}>${opt}</option>`);
            formHtml += `</select>`;
        } else {
            formHtml += `<input type="${f.type}" id="${f.name}" value="${val || ''}" class="w-full p-2 border rounded">`;
        }
        formHtml += `</div>`;
    });

    formHtml += `
        <div class="flex gap-4 pt-4 border-t">
            <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded font-bold hover:bg-green-700">Save</button>
            ${!config.isSingle ? `<button type="button" onclick="loadCollection('${collectionId}')" class="bg-gray-400 text-white px-6 py-2 rounded font-bold">Cancel</button>` : ''}
        </div>
    </form>`;

    content.innerHTML = formHtml;

    document.getElementById('dynamic-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const payload = {};
        
        // Handle Form Values & Firebase Storage Image Uploads
        for (const f of config.fields) {
            if (f.type === 'image') {
                const fileInput = document.getElementById(`file-${f.name}`);
                if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    const storageRef = storage.ref(`uploads/${Date.now()}_${file.name}`);
                    await storageRef.put(file);
                    payload[f.name] = await storageRef.getDownloadURL();
                } else {
                    payload[f.name] = document.getElementById(f.name).value;
                }
            } else {
                payload[f.name] = document.getElementById(f.name).value;
            }
        }

        try {
            if (item && item.id) {
                await apiCall(`${collectionId}/${item.id}`, 'PUT', payload);
            } else {
                await apiCall(`${collectionId}`, 'POST', payload);
            }
            alert('Saved successfully!');
            loadCollection(collectionId);
        } catch (err) {
            alert('Error saving data');
        }
    });
}

// 7. Delete Item
window.deleteItem = async function(collectionId, itemId) {
    if(confirm('Are you sure you want to delete this item?')) {
        await apiCall(`${collectionId}/${itemId}`, 'DELETE');
        loadCollection(collectionId);
    }
}
