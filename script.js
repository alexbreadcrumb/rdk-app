// --- CONFIGURATION ---
const CLIENT_ID = '576080826935-2mtnj52ndc8plnsjodjevt3e2gsh4m3a.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
const SESSION_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const BIO_STORAGE_KEY = 'rdk_biometric_data';
const BIO_ENCRYPTION_KEY = 'a-not-so-secret-key-for-local-encryption'; // Used only to obfuscate master key in localStorage
const MAX_TAGS_PER_KEY = 3;
const WIFI_QR_TAG_NAME = 'WiFiQR';
const REVEAL_TIMEOUT = 3000; // 3 seconds

// --- SVG ICONS ---
const ICONS = {
    chevronDown: `<svg class="key-item-chevron w-5 h-5 text-slate-400 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>`,
    edit: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>`,
    delete: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>`,
    eye: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>`,
    eyeOff: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243l-4.243-4.243zM8 10.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M4.75 4.75l14.5 14.5" /></svg>`,
    copy: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>`,
    keychainIcon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>`,
    keyIcon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>`,
    toastSuccess: `<svg class="w-6 h-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    toastInfo: `<svg class="w-6 h-6 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
    grid: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>`,
    list: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>`,
};

// --- GLOBAL STATE ---
let accessToken = null;
let tokenClient = null;
let userProfile = null; // { email, picture }
let dbData = null; // { keys: [], tags: [] }
let dbFileId = null;
let masterKey = '';
let sessionTimer = null;
let isLoading = false;
let currentDbName = '';
let activeDbFiles = [];
let currentView = 'list';
let isBiometricSupported = false;
let isWiFiMode = false;
const revealTimers = new Map();


// --- DOM ELEMENTS ---
let DOMElements;
let openingFile = null;

// --- UTILITY & HELPER FUNCTIONS ---

function showStatus(message, type = 'info') {
    console.log(`[STATUS] ${type}: ${message}`);
    if (DOMElements && DOMElements.statusMessage) {
        DOMElements.statusMessage.innerHTML = `<strong>Estado:</strong> ${message}`;
        const baseClasses = ['p-3', 'rounded-md', 'text-sm', 'my-4'];
        let typeClasses = [];
        switch (type) {
            case 'ok': typeClasses = ['bg-green-100', 'text-green-800', 'dark:bg-green-900/50', 'dark:text-green-300']; break;
            case 'error': typeClasses = ['bg-red-100', 'text-red-800', 'dark:bg-red-900/50', 'dark:text-red-300']; break;
            default: typeClasses = ['text-slate-500', 'dark:text-slate-400'];
        }
        DOMElements.statusMessage.className = [...baseClasses, ...typeClasses].join(' ');
    }
}

function showToast(message, type = 'success', duration = 3000, actions = []) {
    const container = DOMElements.toastContainer;
    const toast = document.createElement('div');
    const icon = type === 'success' ? ICONS.toastSuccess : ICONS.toastInfo;
    const typeClass = type === 'success' ? 'toast-success' : 'toast-info';

    toast.className = `toast ${typeClass}`;
    let actionsHTML = '';
    if (actions.length > 0) {
        actionsHTML = '<div class="flex gap-2 mt-2 pt-2 border-t border-black/20">';
        actions.forEach(action => {
            const btnId = `toast-action-${Date.now()}-${Math.random()}`;
            actionsHTML += `<button id="${btnId}" class="text-sm font-bold hover:underline">${escapeHtml(action.label)}</button>`;
            document.addEventListener('click', function handler(e) {
                if (e.target.id === btnId) {
                    action.callback();
                    toast.classList.add('removing');
                    toast.addEventListener('animationend', () => toast.remove());
                    e.stopImmediatePropagation();
                    document.removeEventListener('click', handler);
                }
            }, { once: true });
        });
        actionsHTML += '</div>';
    }

    toast.innerHTML = `<div class="flex items-start">${icon}<div class="flex-grow"><span>${escapeHtml(message)}</span>${actionsHTML}</div></div>`;
    
    container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => {
          toast.classList.add('removing');
          toast.addEventListener('animationend', () => toast.remove());
      }, duration);
    }
}


function setLoading(loading, element) {
    isLoading = loading;
    if (element) {
        element.disabled = loading;
        if (loading) {
            element.dataset.originalText = element.innerHTML;
            element.innerHTML = '<div class="spinner mx-auto"></div>';
        } else if (element.dataset.originalText) {
            element.innerHTML = element.dataset.originalText;
        }
    }
}

function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str).replace(/[&<>"']/g, match => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[match]);
}

// --- SERVICES (Crypto, GDrive) ---
const CryptoService = {
    encrypt: (text, key) => CryptoJS.AES.encrypt(text, key).toString(),
    decrypt: (ciphertext, key) => {
        if(!ciphertext || !key) return '';
        try {
            const bytes = CryptoJS.AES.decrypt(ciphertext, key);
            const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
            if (!decryptedText) { // This can happen if the key is wrong
                throw new Error("Decrypted to empty string. Likely wrong key.");
            }
            return decryptedText;
        } catch (e) {
            console.error("Decryption failed:", e);
            return ''; // Return empty string on failure
        }
    }
};

const GDriveService = {
    async authorizedFetch(url, options = {}) {
        const headers = new Headers(options.headers || {});
        headers.set('Authorization', `Bearer ${accessToken}`);
        const response = await fetch(url, { ...options, headers });
        if (response.status === 204) return response; // Handle no-content responses like DELETE
        if (!response.ok) {
            const error = await response.json().catch(() => ({ error: { message: `HTTP Error ${response.status}` } }));
            throw new Error(error.error?.message || 'Ocurrió un error en la API de Google Drive.');
        }
        return response;
    },
    async listDbFiles() {
        const q = "mimeType='application/octet-stream' and trashed=false and fileExtension='db'";
        const url = `https://www.googleapis.com/drive/v3/files?pageSize=100&fields=files(id,name,modifiedTime)&q=${encodeURIComponent(q)}`;
        const res = await this.authorizedFetch(url);
        return res.json();
    },
    async getFileContent(fileId) {
        const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
        const res = await this.authorizedFetch(url);
        return res.text();
    },
    async createFile(name, content) {
        const metadata = { name, mimeType: 'application/octet-stream' };
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', new Blob([content], { type: 'application/octet-stream' }));
        const url = `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id`;
        const res = await this.authorizedFetch(url, { method: 'POST', body: form });
        return res.json();
    },
    async updateFileContent(fileId, content) {
        const url = `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`;
        return this.authorizedFetch(url, { method: 'PATCH', body: new Blob([content], { type: 'application/octet-stream' }) });
    },
    async renameFile(fileId, newName) {
        const url = `https://www.googleapis.com/drive/v3/files/${fileId}`;
        const metadata = { name: newName };
        return this.authorizedFetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(metadata)
        });
    },
    async deleteFile(fileId) {
        const url = `https://www.googleapis.com/drive/v3/files/${fileId}`;
        return this.authorizedFetch(url, { method: 'DELETE' });
    }
};

// --- RENDER FUNCTIONS & VIEW MANAGEMENT ---

function toggleMenu(forceClose = false) {
    const isOpen = !DOMElements.sideMenu.classList.contains('-translate-x-full');
    if (forceClose || isOpen) {
        DOMElements.sideMenu.classList.add('-translate-x-full');
        DOMElements.menuOverlay.classList.add('opacity-0');
        setTimeout(() => DOMElements.menuOverlay.classList.add('hidden'), 300);
    } else {
        DOMElements.sideMenu.classList.remove('-translate-x-full');
        DOMElements.menuOverlay.classList.remove('hidden');
        DOMElements.menuOverlay.classList.remove('opacity-0');
    }
}

function showKeyListView() {
    DOMElements.keyListView.classList.remove('-translate-x-full');
    DOMElements.keyListView.classList.add('translate-x-0');
    DOMElements.keyFormView.classList.remove('translate-x-0');
    DOMElements.keyFormView.classList.add('translate-x-full');
    resetKeyForm();
}

function showKeyFormView(isEditing = false) {
    if (!isEditing) resetKeyForm();
    toggleMenu(true);
    DOMElements.keyListView.classList.add('-translate-x-full');
    DOMElements.keyListView.classList.remove('translate-x-0');
    DOMElements.keyFormView.classList.add('translate-x-0');
    DOMElements.keyFormView.classList.remove('translate-x-full');
    DOMElements.keyNameInput.focus();
}

function renderDbList() {
    const select = DOMElements.dbSelect;
    select.innerHTML = '';
    const sortedFiles = [...activeDbFiles].sort((a, b) => a.name.localeCompare(b.name));
    if (sortedFiles.length === 0) {
        select.innerHTML = '<option disabled>No se encontraron llaveros</option>';
        DOMElements.openDbBtn.disabled = true;
        return;
    }
    DOMElements.openDbBtn.disabled = false;
    sortedFiles.forEach(file => {
        const option = document.createElement('option');
        option.value = file.id;
        option.textContent = file.name;
        option.dataset.name = file.name;
        select.appendChild(option);
    });
}

function getFilteredKeys() {
    if (!dbData?.keys) return [];
    
    const searchFilter = DOMElements.searchInput.value.toLowerCase();
    const tagFilter = DOMElements.tagFilterSelect.value;
    const tagMap = new Map((dbData.tags || []).map(t => [t.id, t.name.toLowerCase()]));

    let filtered = dbData.keys;

    // 1. Filter by tag
    if (tagFilter !== 'all') {
        filtered = filtered.filter(k => k.tagIds && k.tagIds.includes(tagFilter));
    }

    // 2. Filter by search term
    if (searchFilter) {
        filtered = filtered.filter(k => {
            const tagNames = (k.tagIds || [])
                .map(id => tagMap.get(id) || '')
                .join(' ');
            return [k.name.toLowerCase(), k.note?.toLowerCase(), tagNames].join(' ').includes(searchFilter);
        });
    }

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
}


function renderKeys() {
    DOMElements.keyList.innerHTML = '';
    if (!dbData) {
        DOMElements.viewsContainer.classList.add('hidden');
        DOMElements.noDbOpenMessage.classList.remove('hidden');
        DOMElements.addNewKeyHeaderBtn.disabled = true;
        DOMElements.manageTagsBtn.disabled = true;
        DOMElements.keychainTitleName.innerHTML = '';
        DOMElements.keychainTitleCount.innerHTML = '';
        return;
    }

    DOMElements.viewsContainer.classList.remove('hidden');
    DOMElements.noDbOpenMessage.classList.add('hidden');
    DOMElements.addNewKeyHeaderBtn.disabled = false;
    DOMElements.manageTagsBtn.disabled = false;

    // Update view classes (list vs card)
    if (currentView === 'list') {
        DOMElements.keyList.className = 'space-y-3';
    } else {
        DOMElements.keyList.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
    }
    
    const filteredKeys = getFilteredKeys();
    const nameWithoutExt = currentDbName.replace(/\.db$/, '');
    
    DOMElements.keychainTitleName.innerHTML = `${ICONS.keychainIcon} Llavero: <span class="text-blue-600 dark:text-blue-400 font-semibold">"${escapeHtml(nameWithoutExt)}"</span>`;
    DOMElements.keychainTitleCount.innerHTML = `${ICONS.keyIcon} Cantidad de llaves: <span class="font-semibold">${filteredKeys.length}</span>`;

    DOMElements.emptyDbMessage.classList.toggle('hidden', dbData.keys.length > 0);
    DOMElements.noResultsMessage.classList.toggle('hidden', filteredKeys.length > 0 || dbData.keys.length === 0 || !DOMElements.searchInput.value);

    filteredKeys.forEach(key => {
        const item = createKeyListItem(key);
        DOMElements.keyList.appendChild(item);
    });
}

function renderUserProfile() {
    if (userProfile && DOMElements.keychainUserInfo) {
        DOMElements.keychainUserInfo.innerHTML = `
            <img src="${escapeHtml(userProfile.picture)}" alt="Foto de perfil" class="w-6 h-6 rounded-full flex-shrink-0">
            <span class="font-medium text-slate-700 dark:text-slate-300 truncate">${escapeHtml(userProfile.email)}</span>
        `;
    } else if (DOMElements.keychainUserInfo) {
        DOMElements.keychainUserInfo.innerHTML = '';
    }
}


function createKeyListItem(key) {
    const item = document.createElement('div');
    item.className = 'key-item bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col';
    
    const wifiTag = dbData.tags.find(t => t.name === WIFI_QR_TAG_NAME);
    const isWifiKey = wifiTag && key.tagIds && key.tagIds.includes(wifiTag.id);

    let tagsHtml = '';
    if (key.tagIds && key.tagIds.length > 0) {
        tagsHtml = key.tagIds.map(tagId => {
            const tag = dbData.tags.find(t => t.id === tagId);
            if (tag) {
                const isInternalTag = tag.name === WIFI_QR_TAG_NAME;
                const pillColor = isInternalTag 
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/70 dark:text-indigo-300' 
                    : 'bg-sky-100 text-sky-800 dark:bg-sky-900/70 dark:text-sky-300';
                return `<span class="text-xs ${pillColor} px-2 py-1 rounded-full flex-shrink-0">${escapeHtml(tag.name)}</span>`;
            }
            return '';
        }).join('');
    }

    const wifiButtonHtml = isWifiKey ? `
        <button class="view-qr-btn text-sm flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
            Ver WiFi QR
        </button>
    ` : '';


    item.innerHTML = `
        <button class="key-item-header w-full flex justify-between items-center text-left p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <div class="flex items-center gap-2 flex-wrap min-w-0">
                <span class="font-bold text-slate-800 dark:text-slate-100 truncate mr-2">${escapeHtml(key.name)}</span>
                ${tagsHtml}
            </div>
            ${ICONS.chevronDown}
        </button>
        <div class="key-item-body"><div class="p-3 border-t border-slate-100 dark:border-slate-700 space-y-2 text-sm">
            ${createRevealingFieldHTML(key.id, 'user', isWifiKey ? 'Nombre de Red (SSID)' : 'Usuario', key.user)}
            ${createRevealingFieldHTML(key.id, 'pass', isWifiKey ? 'Contraseña de Red' : 'Contraseña', key.pass, true)}
            ${createUrlLinkHTML('URL', key.url)}
            ${key.note ? `<div class="pt-2 text-slate-600 dark:text-slate-300"><strong class="font-medium text-slate-800 dark:text-slate-200">Nota:</strong><p class="whitespace-pre-wrap break-words p-2 bg-slate-50 dark:bg-slate-700/50 rounded mt-1">${escapeHtml(key.note)}</p></div>` : ''}
            <div class="flex gap-4 pt-2 border-t border-slate-100 dark:border-slate-700">
                <button class="edit-btn text-sm flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline">${ICONS.edit} Editar</button>
                <button class="delete-btn text-sm flex items-center gap-1.5 text-red-600 dark:text-red-400 hover:underline">${ICONS.delete} Eliminar</button>
                ${wifiButtonHtml}
            </div>
        </div></div>`;
    item.querySelector('.key-item-header').onclick = () => item.classList.toggle('expanded');
    item.querySelector('.edit-btn').onclick = () => populateEditForm(key.id);
    item.querySelector('.delete-btn').onclick = () => handleDeleteKey(key.id);
    if(isWifiKey) {
        item.querySelector('.view-qr-btn').onclick = () => showWiFiQrCode(key);
    }
    attachRevealingFieldListeners(item);
    return item;
}

function createUrlLinkHTML(label, encryptedUrl) {
    if (!encryptedUrl) return '';
    
    const decryptedUrl = CryptoService.decrypt(encryptedUrl, masterKey);
    if (!decryptedUrl) return '';
    
    const urlContainer = document.createElement('div');
    urlContainer.className = 'flex items-center justify-between gap-2 p-2 bg-slate-50 dark:bg-slate-700/50 rounded';
    urlContainer.innerHTML = `
        <div class="flex-grow min-w-0">
            <span class="font-medium text-slate-800 dark:text-slate-200">${label}:</span>
            <a href="#" class="text-blue-600 dark:text-blue-400 hover:underline break-all ml-1">${escapeHtml(decryptedUrl)}</a>
        </div>`;
    
    const link = urlContainer.querySelector('a');
    link.onclick = (e) => {
        e.preventDefault();
        if (confirm(`¿Quieres abrir esta URL en una nueva pestaña?\n\n${decryptedUrl}`)) {
            window.open(decryptedUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return urlContainer.outerHTML;
}

function createRevealingFieldHTML(keyId, fieldType, label, encryptedValue, isMono = false) {
    if (!encryptedValue) return '';
    const maskedValue = '••••••••';
    const uniqueId = `${keyId}-${fieldType}`;
    // Store the ENCRYPTED value in data-value for just-in-time decryption
    return `<div class="flex items-center justify-between gap-2 p-2 bg-slate-50 dark:bg-slate-700/50 rounded">
        <div class="flex-grow min-w-0">
            <span class="font-medium text-slate-800 dark:text-slate-200">${label}:</span>
            <span class="value-span ${isMono ? 'font-mono' : ''} text-slate-700 dark:text-slate-300 break-all ml-1" data-encrypted-value="${escapeHtml(encryptedValue)}">${maskedValue}</span>
        </div>
        <div class="flex-shrink-0 flex items-center gap-2">
            <button class="reveal-btn p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors" title="Mostrar/Ocultar" data-field-id="${uniqueId}">${ICONS.eye}</button>
            <button class="copy-btn p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors" title="Copiar ${label}">${ICONS.copy}</button>
        </div>
    </div>`;
}

function attachRevealingFieldListeners(parentElement) {
    parentElement.querySelectorAll('.reveal-btn').forEach(btn => {
        const fieldId = btn.dataset.fieldId;
        const valueSpan = btn.closest('div').parentElement.querySelector('.value-span');

        const hideField = () => {
            valueSpan.textContent = '••••••••';
            btn.innerHTML = ICONS.eye;
            if (revealTimers.has(fieldId)) {
                clearTimeout(revealTimers.get(fieldId));
                revealTimers.delete(fieldId);
            }
        };

        btn.onclick = (e) => {
            e.stopPropagation(); // Prevent card from expanding/collapsing
            if (revealTimers.has(fieldId)) {
                hideField(); // If clicked again while revealed, hide immediately
                return;
            }

            const isMasked = valueSpan.textContent === '••••••••';
            if (isMasked) {
                const encryptedValue = valueSpan.dataset.encryptedValue;
                const decryptedValue = CryptoService.decrypt(encryptedValue, masterKey);
                valueSpan.textContent = decryptedValue || '[Error al descifrar]';
                btn.innerHTML = ICONS.eyeOff;

                // Set a timer to auto-hide
                const timerId = setTimeout(hideField, REVEAL_TIMEOUT);
                revealTimers.set(fieldId, timerId);
            }
        };
    });

    parentElement.querySelectorAll('.copy-btn').forEach(btn => btn.onclick = (e) => {
        e.stopPropagation(); // Prevent card from expanding/collapsing
        const valueSpan = e.currentTarget.closest('div').parentElement.querySelector('.value-span');
        const encryptedValue = valueSpan.dataset.encryptedValue;
        const decryptedValue = CryptoService.decrypt(encryptedValue, masterKey);
        navigator.clipboard.writeText(decryptedValue);
        const originalIcon = e.currentTarget.innerHTML;
        e.currentTarget.innerHTML = ICONS.check;
        setTimeout(() => e.currentTarget.innerHTML = originalIcon, 1500);
    });
}


// --- CORE LOGIC ---

async function loadDbListAndRender() {
    showStatus('Cargando lista de llaveros...');
    try {
        const { files } = await GDriveService.listDbFiles();
        activeDbFiles = files || [];
        renderDbList();
        showStatus(`Se encontraron ${activeDbFiles.length} llavero(s).`);
    } catch (e) { showStatus(`Error al listar archivos: ${e.message}`, 'error'); }
}

async function handleCreateDb(event) {
    event.preventDefault();
    const name = DOMElements.newDbNameInput.value.trim();
    const mKey = DOMElements.createMasterKeyInput.value;
    if (!name || !mKey) return alert('El nombre del nuevo llavero y la clave maestra son requeridos.');
    setLoading(true, DOMElements.createDbBtn);
    showStatus(`Creando '${name}.db'...`);
    try {
        const newDbData = { 
            keys: [], 
            tags: [
                // Add the reserved WiFiQR tag by default to all new keychains
                { id: `tag_internal_${WIFI_QR_TAG_NAME}`, name: WIFI_QR_TAG_NAME }
            ] 
        };
        const encryptedContent = CryptoService.encrypt(JSON.stringify(newDbData), mKey);
        const created = await GDriveService.createFile(`${name}.db`, encryptedContent);
        dbData = newDbData; masterKey = mKey; dbFileId = created.id; currentDbName = `${name}.db`;
        showStatus(`Llavero '${currentDbName}' creado y abierto.`, 'ok');
        saveSessionState();
        DOMElements.createDbForm.reset();
        await loadDbListAndRender();
        renderKeys();
        renderUserProfile();
        populateTagFilterSelect();
        showKeyListView();
        toggleMenu(true);
        promptToSetupBiometrics();
    } catch (e) { showStatus(`Error al crear archivo: ${e.message}`, 'error'); } finally { setLoading(false, DOMElements.createDbBtn); }
}

async function handleOpenDb(event) {
    if (event) event.preventDefault();
    if (!openingFile) return;
    
    const mKey = DOMElements.modalMasterKeyInput.value;
    if (!mKey) return alert('La clave maestra es requerida.');
    
    await unlockDbWithMasterKey(openingFile.id, openingFile.name, mKey);
}

async function unlockDbWithMasterKey(fileId, fileName, mKey) {
    setLoading(true, DOMElements.modalUnlockBtn);
    showStatus(`Abriendo '${fileName}'...`);
    try {
        const encryptedContent = await GDriveService.getFileContent(fileId);
        const decryptedJson = CryptoService.decrypt(encryptedContent, mKey);
        if (!decryptedJson) throw new Error("Descifrado falló. Clave maestra incorrecta o archivo corrupto.");
        
        let parsedData = JSON.parse(decryptedJson);
        
        // --- Backward Compatibility & Data Migration ---
        if (Array.isArray(parsedData)) { // Very old format was just an array of keys
            parsedData = { keys: parsedData, tags: [] };
        }
        if (!parsedData.tags) {
            parsedData.tags = [];
        }
        if (parsedData.keys && Array.isArray(parsedData.keys)) {
            parsedData.keys.forEach(key => {
                if (key.tagId && !key.tagIds) { // Migrate single tagId to new array format
                    key.tagIds = [key.tagId];
                    delete key.tagId;
                } else if (!key.tagIds) { // Ensure all keys have the tagIds array
                    key.tagIds = [];
                }
            });
        }
        parsedData.tags.forEach(t => { if(!t.id) t.id = `tag_${Date.now()}_${Math.random()}`; });

        dbData = (parsedData && Array.isArray(parsedData.keys)) ? parsedData : { keys: [], tags: [] };
        // --- End Compatibility ---

        masterKey = mKey; dbFileId = fileId; currentDbName = fileName;
        saveSessionState();
        DOMElements.openDbModal.classList.add('hidden');
        DOMElements.modalMasterKeyInput.value = '';
        openingFile = null;
        showStatus(`'${fileName}' abierto correctamente.`, 'ok');
        renderKeys();
        renderUserProfile();
        populateTagFilterSelect();
        showKeyListView();
        toggleMenu(true);
        
        promptToSetupBiometrics();

    } catch (e) { showStatus(e.message, 'error'); } finally { setLoading(false, DOMElements.modalUnlockBtn); }
}

async function saveDb() {
    if (!dbFileId || !masterKey) return;
    showStatus('Guardando...');
    try {
        const encryptedContent = CryptoService.encrypt(JSON.stringify(dbData), masterKey);
        await GDriveService.updateFileContent(dbFileId, encryptedContent);
        saveSessionState();
        showToast('Guardado en Drive correctamente.');
    } catch (e) { showStatus(`Error al guardar: ${e.message}`, 'error'); }
}

function handleSaveKey(event) {
    event.preventDefault();
    if (!dbData) return;
    const name = DOMElements.keyNameInput.value.trim();
    if (!name) return alert('El nombre de la llave es requerido.');

    const selectedPills = DOMElements.selectedTagsContainer.querySelectorAll('[data-tag-id]');
    const userSelectedTagIds = Array.from(selectedPills).map(pill => pill.dataset.tagId);
    
    // Use a Set for robust addition/removal of the WiFi tag
    const finalTagIds = new Set(userSelectedTagIds);

    // Find the reserved WiFi tag. It should always exist for new keychains.
    let wifiTag = dbData.tags.find(t => t.name === WIFI_QR_TAG_NAME);

    if (isWiFiMode) {
        // For old keychains that might not have it, create it on the fly.
        if (!wifiTag) {
            wifiTag = { id: `tag_internal_${WIFI_QR_TAG_NAME}`, name: WIFI_QR_TAG_NAME };
            dbData.tags.push(wifiTag);
        }
        finalTagIds.add(wifiTag.id);
    } else {
        // If not in WiFi mode, ensure the internal tag is removed.
        if (wifiTag) {
            finalTagIds.delete(wifiTag.id);
        }
    }

    const keyData = {
        name,
        user: CryptoService.encrypt(DOMElements.keyUserInput.value, masterKey),
        pass: CryptoService.encrypt(DOMElements.keyPassInput.value, masterKey),
        url: CryptoService.encrypt(DOMElements.keyUrlInput.value, masterKey),
        note: DOMElements.keyNoteInput.value,
        tagIds: Array.from(finalTagIds), // Convert Set back to Array for saving
    };

    if (isWiFiMode) {
        keyData.wifiEncryption = DOMElements.wifiEncryptionSelect.value;
    }

    const existingId = DOMElements.keyIdInput.value;
    if (existingId) {
        const index = dbData.keys.findIndex(k => k.id === existingId);
        if (index > -1) {
            const updatedKey = { ...dbData.keys[index], ...keyData };
            if (!isWiFiMode) {
                delete updatedKey.wifiEncryption;
            }
            dbData.keys[index] = updatedKey;
        }
    } else {
        dbData.keys.push({ id: `id_${Date.now()}_${Math.random()}`, ...keyData });
    }
    saveDb();
    renderKeys();
    showKeyListView();
}


function handleDeleteKey(keyId) {
    if (!dbData || !confirm('¿Estás seguro de que quieres eliminar esta llave?')) return;
    dbData.keys = dbData.keys.filter(k => k.id !== keyId);
    saveDb();
    renderKeys();
}

async function handleRenameDb(event) {
    event.preventDefault();
    let newName = DOMElements.renameDbInput.value.trim();
    if (!newName) return alert('El nuevo nombre no puede estar vacío.');
    if (!newName.endsWith('.db')) newName += '.db';
    
    setLoading(true, DOMElements.renameConfirmBtn);
    try {
        await GDriveService.renameFile(dbFileId, newName);
        currentDbName = newName;
        
        // Update biometric data if it exists
        const bioData = getBiometricData();
        if (bioData[dbFileId]) {
            bioData[dbFileId].forEach(cred => cred.name = newName);
            saveBiometricData(bioData);
        }

        DOMElements.renameDbModal.classList.add('hidden');
        showStatus(`Llavero renombrado a '${newName}'.`, 'ok');
        renderKeys(); // Re-render to show new name immediately
        await loadDbListAndRender();
        saveSessionState();
    } catch(e) { showStatus(`Error al renombrar: ${e.message}`, 'error'); }
    finally { setLoading(false, DOMElements.renameConfirmBtn); }
}

async function handleDeleteDb() {
    setLoading(true, DOMElements.deleteConfirmBtn);
    try {
        await GDriveService.deleteFile(dbFileId);
        
        // Remove biometric data
        const bioData = getBiometricData();
        if (bioData[dbFileId]) {
            delete bioData[dbFileId];
            saveBiometricData(bioData);
        }

        DOMElements.deleteDbModal.classList.add('hidden');
        showStatus(`Llavero '${currentDbName}' eliminado.`, 'ok');
        dbData = null; dbFileId = null; masterKey = ''; currentDbName = '';
        sessionStorage.removeItem('keychainSession');
        sessionStorage.removeItem('accessToken');
        renderKeys();
        populateTagFilterSelect();
        await loadDbListAndRender();
    } catch(e) { showStatus(`Error al eliminar: ${e.message}`, 'error'); }
    finally { setLoading(false, DOMElements.deleteConfirmBtn); }
}

async function handleChangeMasterKey(event) {
    event.preventDefault();
    const currentKey = DOMElements.currentMasterKeyInput.value;
    const newKey = DOMElements.newMasterKeyInput.value;
    const confirmKey = DOMElements.confirmMasterKeyInput.value;

    if (newKey !== confirmKey) {
        showStatus('La nueva clave y su confirmación no coinciden.', 'error');
        return;
    }
    if (!currentKey || !newKey) {
        showStatus('Todos los campos son obligatorios.', 'error');
        return;
    }

    setLoading(true, DOMElements.changeMasterKeyConfirmBtn);

    // Correct validation against the in-memory master key
    if (currentKey !== masterKey) {
        showStatus('La clave maestra actual es incorrecta.', 'error');
        setLoading(false, DOMElements.changeMasterKeyConfirmBtn);
        return;
    }
    
    showStatus('Re-encriptando datos...');

    try {
        // Re-encrypt all data with the new key
        dbData.keys.forEach(key => {
            key.user = CryptoService.encrypt(CryptoService.decrypt(key.user, currentKey), newKey);
            key.pass = CryptoService.encrypt(CryptoService.decrypt(key.pass, currentKey), newKey);
            key.url = CryptoService.encrypt(CryptoService.decrypt(key.url, currentKey), newKey);
            // Non-encrypted fields like name, note, tagIds, etc., are left as is.
        });

        masterKey = newKey; // Update global master key

        // Update biometric data if it exists for this file
        const bioData = getBiometricData();
        if (bioData[dbFileId] && Array.isArray(bioData[dbFileId])) {
            bioData[dbFileId].forEach(cred => {
                cred.encryptedMasterKey = CryptoService.encrypt(newKey, BIO_ENCRYPTION_KEY);
            });
            saveBiometricData(bioData);
            showToast('Clave biométrica actualizada.', 'info');
        }

        await saveDb(); // This will save the re-encrypted data and update session state

        DOMElements.changeMasterKeyModal.classList.add('hidden');
        DOMElements.changeMasterKeyForm.reset();
        showStatus('Clave maestra cambiada con éxito.', 'ok');
        showToast('Clave maestra cambiada con éxito.', 'success');
        renderKeys(); // Re-render to ensure all listeners use the new master key
    } catch (e) {
        showStatus(`Error al cambiar la clave: ${e.message}`, 'error');
        // IMPORTANT: If re-encryption fails, revert the master key to avoid a locked state.
        masterKey = currentKey;
    } finally {
        setLoading(false, DOMElements.changeMasterKeyConfirmBtn);
    }
}


function resetKeyForm() {
    DOMElements.keyForm.reset();
    DOMElements.keyIdInput.value = '';
    DOMElements.keyFormTitle.textContent = 'Añadir llave nueva';
    DOMElements.cancelEditBtn.classList.add('hidden');
    // Ensure inputs are not password type on reset
    DOMElements.keyUserInput.type = 'text';
    DOMElements.keyPassInput.type = 'password';
    renderTagSelector([]);
    updatePasswordStrengthUI('', DOMElements.passwordStrengthIndicator, DOMElements.keyPassInput);
    toggleWiFiFormMode(false); // Ensure WiFi mode is off
}

function populateEditForm(keyId) {
    const key = dbData.keys.find(k => k.id === keyId);
    if (!key) return;

    const wifiTag = dbData.tags.find(t => t.name === WIFI_QR_TAG_NAME);
    const isWifiKey = wifiTag && key.tagIds && key.tagIds.includes(wifiTag.id);

    toggleWiFiFormMode(isWifiKey);

    try {
        DOMElements.keyIdInput.value = key.id;
        DOMElements.keyNameInput.value = key.name;
        // Decrypt only when populating the edit form
        DOMElements.keyUserInput.type = 'text';
        DOMElements.keyPassInput.type = 'password';
        DOMElements.keyUserInput.value = CryptoService.decrypt(key.user, masterKey);
        DOMElements.keyPassInput.value = CryptoService.decrypt(key.pass, masterKey);
        DOMElements.keyUrlInput.value = CryptoService.decrypt(key.url, masterKey);
        DOMElements.keyNoteInput.value = key.note || '';
        DOMElements.keyFormTitle.textContent = `Editando '${key.name}'`;
        DOMElements.cancelEditBtn.classList.remove('hidden');
        if(isWifiKey) {
            DOMElements.wifiEncryptionSelect.value = key.wifiEncryption || 'WPA';
        }
        renderTagSelector(key.tagIds || []);
        showKeyFormView(true);
        updatePasswordStrengthUI(DOMElements.keyPassInput.value, DOMElements.passwordStrengthIndicator, DOMElements.keyPassInput);
    } catch (e) { showStatus('Error al preparar la llave para edición.', 'error'); }
}

// --- PASSWORD STRENGTH ---
function checkPasswordStrength(password) {
    let score = 0;
    if (!password) return { score: 0, strength: 'weak', emoji: '', className: '' };

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score < 3) return { score, strength: 'weak', emoji: '🔴', className: 'strength-weak' };
    if (score < 5) return { score, strength: 'medium', emoji: '🟠', className: 'strength-medium' };
    return { score, strength: 'strong', emoji: '🟢', className: 'strength-strong' };
}

function updatePasswordStrengthUI(password, indicatorEl, inputEl) {
    const { emoji, className } = checkPasswordStrength(password);
    indicatorEl.textContent = emoji;
    inputEl.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
    if (className) {
        inputEl.classList.add(className);
    }
}

// --- TAG MANAGEMENT ---

function openTagsModal() {
    DOMElements.tagsModal.classList.remove('hidden');
    renderTagsInModal();
    toggleMenu(true);
}

function renderTagsInModal() {
    DOMElements.tagsList.innerHTML = '';
    const userTags = dbData ? dbData.tags.filter(t => t.name !== WIFI_QR_TAG_NAME) : [];
    if (userTags.length === 0) {
        DOMElements.tagsList.innerHTML = '<p class="text-slate-500 text-sm">No hay etiquetas. Añade una nueva abajo.</p>';
        return;
    }
    userTags.sort((a,b) => a.name.localeCompare(b.name)).forEach(tag => {
        const div = document.createElement('div');
        div.className = 'flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-800 rounded';
        div.innerHTML = `
            <span class="text-slate-800 dark:text-slate-200">${escapeHtml(tag.name)}</span>
            <div class="flex gap-2">
                <button class="edit-tag-btn text-blue-600 dark:text-blue-400 hover:underline text-sm">Editar</button>
                <button class="delete-tag-btn text-red-600 dark:text-red-400 hover:underline text-sm">Eliminar</button>
            </div>
        `;
        div.querySelector('.edit-tag-btn').onclick = () => openEditTagModal(tag.id, tag.name);
        div.querySelector('.delete-tag-btn').onclick = () => handleDeleteTag(tag.id);
        DOMElements.tagsList.appendChild(div);
    });
}

function handleAddTag(e) {
    e.preventDefault();
    const newTagName = DOMElements.addTagInput.value.trim();
    if (!newTagName || !dbData) return;
    if (newTagName === WIFI_QR_TAG_NAME) {
        return alert('Ese nombre de etiqueta es reservado.');
    }
    if (dbData.tags.some(t => t.name.toLowerCase() === newTagName.toLowerCase())) {
        return alert('Esa etiqueta ya existe.');
    }
    dbData.tags.push({ id: `tag_${Date.now()}_${Math.random()}`, name: newTagName });
    DOMElements.addTagInput.value = '';
    saveDb();
    renderTagsInModal();
    populateTagFilterSelect();
}

function openEditTagModal(tagId, tagName) {
    DOMElements.editTagIdInput.value = tagId;
    DOMElements.editTagNameInput.value = tagName;
    DOMElements.editTagModal.classList.remove('hidden');
}

function handleUpdateTag(e) {
    e.preventDefault();
    const tagId = DOMElements.editTagIdInput.value;
    const newTagName = DOMElements.editTagNameInput.value.trim();
    if (!tagId || !newTagName || !dbData) return;

    if (newTagName === WIFI_QR_TAG_NAME) {
        return alert('Ese nombre de etiqueta es reservado.');
    }
    if (dbData.tags.some(t => t.name.toLowerCase() === newTagName.toLowerCase() && t.id !== tagId)) {
        return alert('Ya existe otra etiqueta con ese nombre.');
    }
    const tag = dbData.tags.find(t => t.id === tagId);
    if (tag) {
        tag.name = newTagName;
        saveDb();
        renderTagsInModal();
        renderKeys();
        populateTagFilterSelect();
        DOMElements.editTagModal.classList.add('hidden');
    }
}

function handleDeleteTag(tagId) {
    if (!dbData || !confirm('¿Seguro que quieres eliminar esta etiqueta? Se quitará de todas las llaves asociadas.')) return;
    dbData.tags = dbData.tags.filter(t => t.id !== tagId);
    // Remove the tag from any key that has it
    dbData.keys.forEach(k => {
        if (k.tagIds) {
            k.tagIds = k.tagIds.filter(id => id !== tagId);
        }
    });
    saveDb();
    renderTagsInModal();
    renderKeys();
    populateTagFilterSelect();
}

function renderTagSelector(selectedIds = []) {
    DOMElements.selectedTagsContainer.innerHTML = '';
    DOMElements.addTagDropdown.innerHTML = '<option value="">Añadir etiqueta...</option>';
    
    const allUserTags = (dbData.tags || []).filter(t => t.name !== WIFI_QR_TAG_NAME);
    const availableTags = allUserTags.filter(tag => !selectedIds.includes(tag.id));

    availableTags.sort((a,b) => a.name.localeCompare(b.name)).forEach(tag => {
        const option = document.createElement('option');
        option.value = tag.id;
        option.textContent = tag.name;
        DOMElements.addTagDropdown.appendChild(option);
    });
    
    selectedIds.forEach(id => {
        const tag = allUserTags.find(t => t.id === id);
        if (tag) {
            const pill = document.createElement('div');
            pill.className = 'flex items-center gap-1.5 bg-sky-100 text-sky-800 text-sm px-2 py-1 rounded-full dark:bg-sky-900/70 dark:text-sky-300';
            pill.dataset.tagId = tag.id;
            pill.innerHTML = `
                <span>${escapeHtml(tag.name)}</span>
                <button type="button" class="remove-tag-pill-btn font-bold leading-none text-sky-600 dark:text-sky-200 hover:text-sky-900 dark:hover:text-sky-50">&times;</button>
            `;
            DOMElements.selectedTagsContainer.appendChild(pill);
        }
    });
    const selectedUserTags = selectedIds.filter(id => allUserTags.some(t => t.id === id));

    const count = selectedUserTags.length;
    DOMElements.tagCountIndicator.textContent = count;
    DOMElements.addTagDropdown.disabled = count >= MAX_TAGS_PER_KEY;
    if (count < MAX_TAGS_PER_KEY) DOMElements.addTagDropdown.value = '';
}


function populateTagFilterSelect() {
    const select = DOMElements.tagFilterSelect;
    select.innerHTML = '<option value="all">Todas las etiquetas</option>';
    if (!dbData) return;
    const userTags = dbData.tags.filter(t => t.name !== WIFI_QR_TAG_NAME);
    userTags.sort((a, b) => a.name.localeCompare(b.name)).forEach(tag => {
        const option = document.createElement('option');
        option.value = tag.id;
        option.textContent = tag.name;
        select.appendChild(option);
    });
}

// --- WIFI QR ---
function toggleWiFiFormMode(forceState = null) {
    isWiFiMode = forceState !== null ? forceState : !isWiFiMode;

    DOMElements.toggleWiFiModeBtn.classList.toggle('bg-blue-100', isWiFiMode);
    DOMElements.toggleWiFiModeBtn.classList.toggle('dark:bg-blue-900/50', isWiFiMode);
    DOMElements.wifiOptionsContainer.classList.toggle('hidden', !isWiFiMode);

    if (isWiFiMode) {
        DOMElements.keyUserLabel.textContent = 'Nombre de Red (SSID)';
        DOMElements.keyUserInput.placeholder = 'ej: MiWiFi_Casa';
        DOMElements.keyPassLabel.textContent = 'Contraseña de Red';
        DOMElements.keyPassInput.placeholder = 'Contraseña del WiFi';
    } else {
        DOMElements.keyUserLabel.textContent = 'Usuario / Correo';
        DOMElements.keyUserInput.placeholder = 'usuario@ejemplo.com';
        DOMElements.keyPassLabel.textContent = 'Contraseña';
        DOMElements.keyPassInput.placeholder = 'Tu contraseña segura';
    }
}

function showWiFiQrCode(key) {
    if (typeof QRCode === 'undefined') {
        return showStatus('La librería de QR no está cargada.', 'error');
    }
    try {
        const ssid = CryptoService.decrypt(key.user, masterKey);
        const password = CryptoService.decrypt(key.pass, masterKey);
        const encryption = key.wifiEncryption || 'WPA'; // Default to WPA for safety
        
        // Format: WIFI:T:<encryption>;S:<ssid>;P:<password>;;
        const wifiString = `WIFI:T:${encryption};S:${escapeSemicolon(ssid)};P:${escapeSemicolon(password)};;`;

        const container = DOMElements.qrCodeContainer;
        container.innerHTML = ''; // Clear previous QR
        new QRCode(container, {
            text: wifiString,
            width: 256,
            height: 256,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        
        DOMElements.qrCodeModal.classList.remove('hidden');

    } catch(e) {
        showStatus('Error al generar el código QR.', 'error');
        console.error(e);
    }
}

function escapeSemicolon(str) {
    // According to the spec, special characters like ';', ',', '"', '\' should be escaped with a backslash.
    return str.replace(/([\\;,"])/g, '\\$1');
}

// --- BIOMETRIC AUTHENTICATION (WEBAUTHN) ---

function parseUserAgent(ua) {
    let os = 'Dispositivo Desconocido';
    if (/Windows/i.test(ua)) os = 'Windows';
    else if (/Macintosh|Mac OS/i.test(ua)) os = 'macOS';
    else if (/iPhone|iPad/i.test(ua)) os = 'iOS';
    else if (/Android/i.test(ua)) os = 'Android';
    else if (/Linux/i.test(ua)) os = 'Linux';

    let browser = 'Navegador Desconocido';
    if (/Edg/i.test(ua)) browser = 'Edge';
    else if (/Chrome/i.test(ua)) browser = 'Chrome';
    else if (/Safari/i.test(ua)) browser = 'Safari';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';

    return `${browser} en ${os}`;
}

async function checkBiometricSupport() {
    if (window.PublicKeyCredential && typeof PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function') {
        try {
            isBiometricSupported = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        } catch (e) {
            console.error("Error checking biometric support:", e);
            isBiometricSupported = false;
        }
    } else {
        isBiometricSupported = false;
    }
    DOMElements.manageBiometricsBtn.disabled = !isBiometricSupported;
    console.log(`Biometric support (isUserVerifyingPlatformAuthenticatorAvailable): ${isBiometricSupported}`);
}

function getBiometricData() {
    try {
        const data = localStorage.getItem(BIO_STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (e) {
        return {};
    }
}

function saveBiometricData(data) {
    localStorage.setItem(BIO_STORAGE_KEY, JSON.stringify(data));
}

function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function base64ToArrayBuffer(base64) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

async function setupBiometrics() {
    if (!isBiometricSupported || !dbFileId || !masterKey) return;
    
    try {
        const challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);

        const credential = await navigator.credentials.create({
            publicKey: {
                challenge,
                rp: { name: "Llavero RDK" },
                user: {
                    id: new TextEncoder().encode(dbFileId),
                    name: currentDbName,
                    displayName: currentDbName,
                },
                pubKeyCredParams: [{ type: "public-key", alg: -7 }], // ES256
                authenticatorSelection: {
                    authenticatorAttachment: "platform",
                    userVerification: "required",
                },
                timeout: 60000,
            }
        });

        if (credential) {
            const data = getBiometricData();
            if (!data[dbFileId] || !Array.isArray(data[dbFileId])) {
                data[dbFileId] = [];
            }
            const newCredentialRecord = {
                credentialId: arrayBufferToBase64(credential.rawId),
                name: currentDbName,
                encryptedMasterKey: CryptoService.encrypt(masterKey, BIO_ENCRYPTION_KEY),
                deviceInfo: navigator.userAgent,
            };
            data[dbFileId].push(newCredentialRecord);
            saveBiometricData(data);
            showToast('¡Desbloqueo biométrico activado para este llavero en este dispositivo!', 'success');
        }
    } catch (err) {
        console.error("Error al configurar biometría:", err);
        showStatus(`Error al configurar biometría: ${err.message}`, 'error');
    }
}

function promptToSetupBiometrics() {
    const bioData = getBiometricData();
    let credentialsForThisFile = bioData[dbFileId];
     if (credentialsForThisFile && !Array.isArray(credentialsForThisFile)) {
        credentialsForThisFile = [credentialsForThisFile];
    }
    if (isBiometricSupported && dbFileId && (!credentialsForThisFile || credentialsForThisFile.length === 0)) {
        showToast('¿Quieres desbloquear este llavero con tu huella/rostro la próxima vez?', 'info', 10000, [
            { label: 'Sí, configurar', callback: setupBiometrics },
        ]);
    }
}

async function handleBiometricUnlock() {
    if (!openingFile || !isBiometricSupported) return;

    const bioData = getBiometricData();
    let credentialsForFile = bioData[openingFile.id];
     if (credentialsForFile && !Array.isArray(credentialsForFile)) {
        credentialsForFile = [credentialsForFile];
    }
    
    if (!credentialsForFile || credentialsForFile.length === 0) return;
    
    setLoading(true, DOMElements.modalBiometricBtn);

    try {
        const challenge = new Uint8Array(32);
        crypto.getRandomValues(challenge);

        const allowCredentials = credentialsForFile.map(cred => ({
            type: 'public-key',
            id: base64ToArrayBuffer(cred.credentialId),
        }));

        const assertion = await navigator.credentials.get({
            publicKey: {
                challenge,
                allowCredentials,
                userVerification: 'required',
                timeout: 60000,
            }
        });

        if (assertion) {
            const successfulCredentialId = arrayBufferToBase64(assertion.rawId);
            const usedCredential = credentialsForFile.find(cred => cred.credentialId === successfulCredentialId);

            if (usedCredential) {
                 const decryptedMasterKey = CryptoService.decrypt(usedCredential.encryptedMasterKey, BIO_ENCRYPTION_KEY);
                if (decryptedMasterKey) {
                    await unlockDbWithMasterKey(openingFile.id, openingFile.name, decryptedMasterKey);
                } else {
                    throw new Error("No se pudo descifrar la clave maestra guardada.");
                }
            } else {
                 throw new Error("La credencial biométrica utilizada no se reconoce.");
            }
        }
    } catch (err) {
        console.error("Error de desbloqueo biométrico:", err);
        showStatus(`Fallo biométrico: ${err.message}`, 'error');
    } finally {
        setLoading(false, DOMElements.modalBiometricBtn);
    }
}


function openBiometricsManager() {
    DOMElements.biometricsModal.classList.remove('hidden');
    renderBiometricsInModal();
    toggleMenu(true);
}

function renderBiometricsInModal() {
    const list = DOMElements.biometricsList;
    list.innerHTML = '';
    const bioData = getBiometricData();
    const fileIds = Object.keys(bioData);
    let hasEntries = false;

    if (fileIds.length === 0) {
        list.innerHTML = '<p class="text-slate-500 text-sm">No hay llaveros con desbloqueo biométrico activado.</p>';
        return;
    }

    fileIds.forEach(fileId => {
        let credentials = bioData[fileId];
        if(!Array.isArray(credentials)) credentials = [credentials]; // Migration for old format

        credentials.forEach(cred => {
            hasEntries = true;
            const div = document.createElement('div');
            div.className = 'flex justify-between items-center p-2 bg-slate-50 dark:bg-slate-700/50 rounded';
            div.innerHTML = `
                <div class="flex-grow min-w-0 pr-2">
                    <p class="font-semibold text-slate-800 dark:text-slate-200 truncate">${escapeHtml(cred.name)}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400">${escapeHtml(parseUserAgent(cred.deviceInfo || ''))}</p>
                </div>
                <button class="remove-bio-btn flex-shrink-0 text-red-600 dark:text-red-400 hover:underline text-sm" data-file-id="${escapeHtml(fileId)}" data-credential-id="${escapeHtml(cred.credentialId)}">Eliminar</button>
            `;
            list.appendChild(div);
        });
    });
    
    if (!hasEntries) {
         list.innerHTML = '<p class="text-slate-500 text-sm">No hay llaveros con desbloqueo biométrico activado.</p>';
    }

    list.querySelectorAll('.remove-bio-btn').forEach(btn => {
        btn.onclick = (e) => {
            const fileIdToRemoveFrom = e.target.dataset.fileId;
            const credIdToRemove = e.target.dataset.credentialId;

            if (confirm('¿Seguro que quieres quitar el desbloqueo biométrico para este dispositivo?')) {
                const currentData = getBiometricData();
                if(currentData[fileIdToRemoveFrom] && Array.isArray(currentData[fileIdToRemoveFrom])) {
                    currentData[fileIdToRemoveFrom] = currentData[fileIdToRemoveFrom].filter(cred => cred.credentialId !== credIdToRemove);
                    if (currentData[fileIdToRemoveFrom].length === 0) {
                        delete currentData[fileIdToRemoveFrom];
                    }
                    saveBiometricData(currentData);
                    renderBiometricsInModal();
                    showToast('Desbloqueo biométrico eliminado.', 'info');
                }
            }
        };
    });
}

// --- SESSION MANAGEMENT ---

function startSessionTimer(expiryTime) {
    if (sessionTimer) clearInterval(sessionTimer);
    
    DOMElements.sessionTimerHeader.style.display = 'flex';

    const updateTimer = () => {
        const remaining = expiryTime - Date.now();
        if (remaining <= 0) {
            handleSignOut(true); // Sign out without confirmation
            return;
        }
        const minutes = String(Math.floor((remaining / 1000) / 60)).padStart(2, '0');
        const seconds = String(Math.floor((remaining / 1000) % 60)).padStart(2, '0');
        DOMElements.sessionTimerTimeHeader.textContent = `${minutes}:${seconds}`;
    };
    updateTimer();
    sessionTimer = setInterval(updateTimer, 1000);
}

function resetSessionTimer() {
    if (sessionTimer) {
        const newExpiry = Date.now() + SESSION_TIMEOUT;
        sessionStorage.setItem('sessionExpiry', newExpiry);
        startSessionTimer(newExpiry);
    }
}

function saveSessionState() {
    if (!dbFileId || !masterKey || !accessToken) return;
    const sessionData = {
        dbFileId,
        masterKey: CryptoService.encrypt(masterKey, accessToken), // Encrypt master key with access token for session
        dbData,
        currentDbName,
        userProfile
    };
    sessionStorage.setItem('keychainSession', JSON.stringify(sessionData));
    sessionStorage.setItem('sessionExpiry', Date.now() + SESSION_TIMEOUT);
    sessionStorage.setItem('accessToken', accessToken);
}

function restoreSessionState() {
    const sessionDataStr = sessionStorage.getItem('keychainSession');
    const expiry = sessionStorage.getItem('sessionExpiry');
    const storedToken = sessionStorage.getItem('accessToken');

    if (!sessionDataStr || !expiry || !storedToken || Date.now() > parseInt(expiry)) {
        sessionStorage.clear();
        return false;
    }

    try {
        const sessionData = JSON.parse(sessionDataStr);
        const decryptedMasterKey = CryptoService.decrypt(sessionData.masterKey, storedToken);

        if (decryptedMasterKey) {
            accessToken = storedToken;
            dbFileId = sessionData.dbFileId;
            masterKey = decryptedMasterKey;
            dbData = sessionData.dbData;
            currentDbName = sessionData.currentDbName;
            userProfile = sessionData.userProfile;

            DOMElements.loginView.classList.add('hidden');
            DOMElements.appView.classList.remove('hidden');
            DOMElements.menuBtn.classList.remove('hidden');
            
            startSessionTimer(parseInt(expiry));
            
            showStatus(`Sesión restaurada para '${currentDbName}'.`, 'ok');
            return true;
        }
    } catch (e) {
        console.error("Failed to restore session:", e);
    }
    sessionStorage.clear();
    return false;
}

// --- GOOGLE SIGN-IN ---

function gsiLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: async (tokenResponse) => {
            if (tokenResponse && tokenResponse.access_token) {
                const newAccessToken = tokenResponse.access_token;
                
                // If a session is already active (from restoreSessionState), 
                // just update the token for future API calls and do nothing else.
                if (accessToken) {
                    accessToken = newAccessToken;
                    console.log('Access token has been silently refreshed.');
                    return;
                }
                
                // Otherwise, this is a new login flow.
                accessToken = newAccessToken;

                DOMElements.loginView.classList.add('hidden');
                DOMElements.appView.classList.remove('hidden');
                DOMElements.menuBtn.classList.remove('hidden');
                startSessionTimer(Date.now() + SESSION_TIMEOUT);
                
                await fetchUserProfile();
                await loadDbListAndRender();
                renderKeys();
                renderUserProfile();
                populateTagFilterSelect();
            } else {
                 // This can happen if the silent token request fails.
                 console.log("Silent token request failed or user is not logged in.");
            }
        },
    });
    // Attempt to get a token silently on page load, which will trigger the callback.
    tokenClient.requestAccessToken({ prompt: 'none' });
    DOMElements.signinBtn.disabled = false;
}

function gisLoaded() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = gsiLoaded;
    document.body.appendChild(script);
}

function handleAuthClick() {
    resetSessionTimer();
    if (accessToken) {
        google.accounts.oauth2.revoke(accessToken, () => { console.log('Token revoked.'); });
        accessToken = null;
    }
    // We clear the global `accessToken` here to signal to the callback that this is a new, explicit login.
    tokenClient.requestAccessToken();
}

async function fetchUserProfile() {
    if (!accessToken) return;
    // We allow refetching the profile picture in case it changed.
    try {
        const response = await GDriveService.authorizedFetch('https://www.googleapis.com/oauth2/v2/userinfo');
        const profile = await response.json();
        userProfile = { email: profile.email, picture: profile.picture };
    } catch (e) {
        console.error("Error fetching user profile:", e);
        showStatus("No se pudo obtener la información del perfil.", "error");
    }
}


function handleSignOut(isTimeout = false) {
    if (!isTimeout && !confirm('¿Estás seguro de que quieres cerrar la sesión?')) return;

    if (accessToken) {
        google.accounts.oauth2.revoke(accessToken, () => { console.log('Token revoked on sign out.'); });
    }
    
    // Clear state
    accessToken = null;
    dbData = null;
    dbFileId = null;
    masterKey = '';
    currentDbName = '';
    userProfile = null;
    
    // Stop and clear the session timer
    if (sessionTimer) {
        clearInterval(sessionTimer);
        sessionTimer = null;
    }
    sessionStorage.clear();

    // Reset UI to login state
    DOMElements.loginView.classList.remove('hidden');
    DOMElements.appView.classList.add('hidden');
    DOMElements.menuBtn.classList.add('hidden');
    
    // Explicitly hide the timer header and clear its content
    DOMElements.sessionTimerHeader.style.display = 'none';
    DOMElements.sessionTimerTimeHeader.textContent = '';

    renderUserProfile(); // This will clear the user info
    toggleMenu(true);

    showStatus(isTimeout ? 'La sesión expiró por inactividad.' : 'Sesión cerrada.');
}

// --- INITIALIZATION ---

function handleTagSelectorChange(e) {
    const selectedTagId = e.target.value;
    if (!selectedTagId) return;

    const selectedPills = Array.from(DOMElements.selectedTagsContainer.querySelectorAll('[data-tag-id]'));
    let currentIds = selectedPills.map(pill => pill.dataset.tagId);

    if (currentIds.length < MAX_TAGS_PER_KEY && !currentIds.includes(selectedTagId)) {
        currentIds.push(selectedTagId);
        renderTagSelector(currentIds);
    }
}

function handleTagPillRemove(e) {
    if (e.target.classList.contains('remove-tag-pill-btn')) {
        const pill = e.target.parentElement;
        const tagIdToRemove = pill.dataset.tagId;
        
        const selectedPills = Array.from(DOMElements.selectedTagsContainer.querySelectorAll('[data-tag-id]'));
        let currentIds = selectedPills.map(p => p.dataset.tagId);
        
        currentIds = currentIds.filter(id => id !== tagIdToRemove);
        renderTagSelector(currentIds);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Cache all DOM elements
    DOMElements = {
        signinBtn: document.getElementById('signin-btn'),
        statusMessage: document.getElementById('status-message'),
        loginView: document.getElementById('login-view'),
        appView: document.getElementById('app-view'),
        menuBtn: document.getElementById('menu-btn'),
        closeMenuBtn: document.getElementById('close-menu-btn'),
        sideMenu: document.getElementById('side-menu'),
        menuOverlay: document.getElementById('menu-overlay'),
        signoutBtnMobile: document.getElementById('signout-btn-mobile'),
        dbSelect: document.getElementById('db-select'),
        openDbBtn: document.getElementById('open-db-btn'),
        createDbForm: document.getElementById('create-db-form'),
        newDbNameInput: document.getElementById('new-db-name-input'),
        createMasterKeyInput: document.getElementById('create-master-key-input'),
        createDbBtn: document.getElementById('create-db-btn'),
        keyList: document.getElementById('key-list'),
        keyForm: document.getElementById('key-form'),
        keyIdInput: document.getElementById('key-id-input'),
        keyNameInput: document.getElementById('key-name-input'),
        keyUserLabel: document.getElementById('key-user-label'),
        keyUserInput: document.getElementById('key-user-input'),
        keyPassLabel: document.getElementById('key-pass-label'),
        keyPassInput: document.getElementById('key-pass-input'),
        keyUrlInput: document.getElementById('key-url-input'),
        keyNoteInput: document.getElementById('key-note-input'),
        keyFormTitle: document.getElementById('key-form-title'),
        cancelEditBtn: document.getElementById('cancel-edit-btn'),
        addNewKeyHeaderBtn: document.getElementById('add-new-key-header-btn'),
        backToListBtn: document.getElementById('back-to-list-btn'),
        keyListView: document.getElementById('key-list-view'),
        keyFormView: document.getElementById('key-form-view'),
        viewsContainer: document.getElementById('views-container'),
        noDbOpenMessage: document.getElementById('no-db-open-message'),
        emptyDbMessage: document.getElementById('empty-db-message'),
        noResultsMessage: document.getElementById('no-results-message'),
        keychainTitleName: document.getElementById('keychain-title-name'),
        keychainTitleCount: document.getElementById('keychain-title-count'),
        keychainUserInfo: document.getElementById('keychain-user-info'),
        dbManagementBtn: document.getElementById('db-management-btn'),
        dbManagementDropdown: document.getElementById('db-management-dropdown'),
        renameDbBtn: document.getElementById('rename-db-btn'),
        deleteDbBtn: document.getElementById('delete-db-btn'),
        changeMasterKeyBtn: document.getElementById('change-master-key-btn'),
        searchInput: document.getElementById('search-input'),
        toastContainer: document.getElementById('toast-container'),
        sessionTimerTimeHeader: document.getElementById('session-timer-time-header'),
        sessionTimerHeader: document.getElementById('session-timer-header'),
        // Modals
        openDbModal: document.getElementById('open-db-modal'),
        modalDbName: document.getElementById('modal-db-name'),
        openDbForm: document.getElementById('open-db-form'),
        modalMasterKeyInput: document.getElementById('modal-master-key-input'),
        modalUnlockBtn: document.getElementById('modal-unlock-btn'),
        renameDbModal: document.getElementById('rename-db-modal'),
        renameDbForm: document.getElementById('rename-db-form'),
        renameDbInput: document.getElementById('rename-db-input'),
        renameConfirmBtn: document.getElementById('rename-confirm-btn'),
        deleteDbModal: document.getElementById('delete-db-modal'),
        deleteDbName: document.getElementById('delete-db-name'),
        deleteConfirmBtn: document.getElementById('delete-confirm-btn'),
        changeMasterKeyModal: document.getElementById('change-master-key-modal'),
        changeMasterKeyForm: document.getElementById('change-master-key-form'),
        currentMasterKeyInput: document.getElementById('current-master-key-input'),
        newMasterKeyInput: document.getElementById('new-master-key-input'),
        confirmMasterKeyInput: document.getElementById('confirm-master-key-input'),
        changeMasterKeyConfirmBtn: document.getElementById('change-master-key-confirm-btn'),
        newPasswordStrengthIndicator: document.getElementById('new-password-strength-indicator'),
        tagsModal: document.getElementById('tags-modal'),
        tagsList: document.getElementById('tags-list'),
        addTagForm: document.getElementById('add-tag-form'),
        addTagInput: document.getElementById('add-tag-input'),
        manageTagsBtn: document.getElementById('manage-tags-btn'),
        editTagModal: document.getElementById('edit-tag-modal'),
        editTagForm: document.getElementById('edit-tag-form'),
        editTagIdInput: document.getElementById('edit-tag-id'),
        editTagNameInput: document.getElementById('edit-tag-name-input'),
        tagFilterSelect: document.getElementById('tag-filter-select'),
        passwordStrengthIndicator: document.getElementById('password-strength-indicator'),
        // New Tag Selector
        tagCountIndicator: document.getElementById('tag-count-indicator'),
        selectedTagsContainer: document.getElementById('selected-tags-container'),
        addTagDropdown: document.getElementById('add-tag-dropdown'),
        // View toggle
        viewToggleBtn: document.getElementById('view-toggle-btn'),
        // Biometrics
        modalBiometricBtn: document.getElementById('modal-biometric-btn'),
        biometricDivider: document.getElementById('biometric-divider'),
        manageBiometricsBtn: document.getElementById('manage-biometrics-btn'),
        biometricsModal: document.getElementById('biometrics-modal'),
        biometricsList: document.getElementById('biometrics-list'),
        // WiFi QR
        toggleWiFiModeBtn: document.getElementById('toggle-wifi-mode-btn'),
        wifiOptionsContainer: document.getElementById('wifi-options-container'),
        wifiEncryptionSelect: document.getElementById('wifi-encryption-select'),
        qrCodeModal: document.getElementById('qr-code-modal'),
        qrCodeContainer: document.getElementById('qr-code-container'),
    };
    
    // --- APP INITIALIZATION FLOW ---

    // 1. Try to restore session from sessionStorage immediately.
    if (restoreSessionState()) {
        // If successful, populate the UI with restored data.
        fetchUserProfile().then(renderUserProfile);
        loadDbListAndRender(); // Fetch latest file list for the menu
        renderKeys();
        populateTagFilterSelect();
    }
    
    // 2. Load Google Sign-In client. It will handle new logins or silently refresh the token for the restored session.
    gisLoaded();
    checkBiometricSupport();

    // 3. Attach all event listeners for user interaction.
    DOMElements.signinBtn.addEventListener('click', handleAuthClick);
    DOMElements.signoutBtnMobile.addEventListener('click', () => handleSignOut());
    
    // --- Menu & Navigation ---
    DOMElements.menuBtn.addEventListener('click', () => toggleMenu());
    DOMElements.closeMenuBtn.addEventListener('click', () => toggleMenu(true));
    DOMElements.menuOverlay.addEventListener('click', () => toggleMenu(true));
    DOMElements.addNewKeyHeaderBtn.addEventListener('click', () => showKeyFormView());
    DOMElements.backToListBtn.addEventListener('click', showKeyListView);
    DOMElements.cancelEditBtn.addEventListener('click', showKeyListView);
    document.body.addEventListener('click', resetSessionTimer);
    document.body.addEventListener('keydown', resetSessionTimer);

    // --- DB Actions ---
    DOMElements.createDbForm.addEventListener('submit', handleCreateDb);
    DOMElements.openDbBtn.addEventListener('click', () => {
        const selectedOption = DOMElements.dbSelect.options[DOMElements.dbSelect.selectedIndex];
        if (!selectedOption) return;

        if (dbFileId && selectedOption.value === dbFileId) {
            showToast('Ese llavero ya está abierto.', 'info');
            toggleMenu(true);
            return;
        }

        openingFile = { id: selectedOption.value, name: selectedOption.dataset.name };
        DOMElements.modalDbName.textContent = openingFile.name;
        DOMElements.openDbModal.classList.remove('hidden');

        // Biometric button visibility
        const bioData = getBiometricData();
        let credentialsForFile = bioData[openingFile.id];
        if (credentialsForFile && !Array.isArray(credentialsForFile)) { // Migration for old format
            credentialsForFile = [credentialsForFile];
        }

        if (isBiometricSupported && credentialsForFile && credentialsForFile.length > 0) {
            DOMElements.modalBiometricBtn.classList.remove('hidden');
            DOMElements.biometricDivider.classList.remove('hidden');
        } else {
            DOMElements.modalBiometricBtn.classList.add('hidden');
            DOMElements.biometricDivider.classList.add('hidden');
        }
        DOMElements.modalMasterKeyInput.focus();
    });
    DOMElements.openDbForm.addEventListener('submit', handleOpenDb);
    DOMElements.modalBiometricBtn.addEventListener('click', handleBiometricUnlock);

    // --- DB Management Dropdown ---
    DOMElements.dbManagementBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        DOMElements.dbManagementDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
        if (!DOMElements.dbManagementBtn.contains(e.target)) {
            DOMElements.dbManagementDropdown.classList.add('hidden');
        }
    });
    DOMElements.renameDbBtn.addEventListener('click', () => {
        DOMElements.dbManagementDropdown.classList.add('hidden');
        DOMElements.renameDbInput.value = currentDbName.replace(/\.db$/, '');
        DOMElements.renameDbModal.classList.remove('hidden');
    });
    DOMElements.renameDbForm.addEventListener('submit', handleRenameDb);
    DOMElements.deleteDbBtn.addEventListener('click', () => {
        DOMElements.dbManagementDropdown.classList.add('hidden');
        DOMElements.deleteDbName.textContent = currentDbName;
        DOMElements.deleteDbModal.classList.remove('hidden');
    });
    DOMElements.deleteConfirmBtn.addEventListener('click', handleDeleteDb);
    DOMElements.changeMasterKeyBtn.addEventListener('click', () => {
        DOMElements.dbManagementDropdown.classList.add('hidden');
        DOMElements.changeMasterKeyModal.classList.remove('hidden');
        DOMElements.currentMasterKeyInput.focus();
    });
    DOMElements.changeMasterKeyForm.addEventListener('submit', handleChangeMasterKey);
    DOMElements.newMasterKeyInput.addEventListener('input', e => updatePasswordStrengthUI(e.target.value, DOMElements.newPasswordStrengthIndicator, DOMElements.newMasterKeyInput));


    // --- Key Management ---
    DOMElements.keyForm.addEventListener('submit', handleSaveKey);
    DOMElements.searchInput.addEventListener('input', renderKeys);
    DOMElements.tagFilterSelect.addEventListener('change', renderKeys);

    // --- WiFi QR ---
    DOMElements.toggleWiFiModeBtn.addEventListener('click', () => toggleWiFiFormMode());
    DOMElements.qrCodeModal.addEventListener('click', () => {
        DOMElements.qrCodeModal.classList.add('hidden');
        DOMElements.qrCodeContainer.innerHTML = '';
    });

    // --- Modal Management ---
    document.querySelectorAll('.modal-cancel-btn').forEach(btn => btn.onclick = (e) => {
        e.target.closest('.modal-container').classList.add('hidden');
        openingFile = null;
    });

    // --- Tag Management ---
    DOMElements.manageTagsBtn.addEventListener('click', openTagsModal);
    DOMElements.addTagForm.addEventListener('submit', handleAddTag);
    DOMElements.editTagForm.addEventListener('submit', handleUpdateTag);
    DOMElements.addTagDropdown.addEventListener('change', handleTagSelectorChange);
    DOMElements.selectedTagsContainer.addEventListener('click', handleTagPillRemove);


    // --- Biometric Management ---
    DOMElements.manageBiometricsBtn.addEventListener('click', openBiometricsManager);

    // --- Accordion Logic (Side Menu) ---
    const allAccordionItems = document.querySelectorAll('#menu-accordion .accordion-item');
    document.querySelectorAll('#menu-accordion .accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const currentItem = button.parentElement;
            
            // Close all other accordion items
            allAccordionItems.forEach(item => {
                if (item !== currentItem) {
                    item.classList.remove('expanded');
                }
            });
            
            // Toggle the clicked item
            currentItem.classList.toggle('expanded');
        });
    });

    // --- Password visibility toggles with auto-hide ---
    DOMElements.keyPassInput.addEventListener('input', e => updatePasswordStrengthUI(e.target.value, DOMElements.passwordStrengthIndicator, DOMElements.keyPassInput));
    
    document.querySelectorAll('[data-toggle-password]').forEach(btn => {
        const input = document.getElementById(btn.dataset.togglePassword);
        btn.innerHTML = ICONS.eye; // Set initial icon
        btn.addEventListener('click', () => {
            const inputId = input.id;

            // If a timer is already running for this input, clicking the button again should just hide it.
            if (revealTimers.has(inputId)) {
                clearTimeout(revealTimers.get(inputId));
                revealTimers.delete(inputId);
                input.type = 'password';
                btn.innerHTML = ICONS.eye;
                return;
            }
            
            if (input.type === 'password') {
                input.type = 'text';
                btn.innerHTML = ICONS.eyeOff;

                // Set a timer to hide it again
                const timerId = setTimeout(() => {
                    if (document.getElementById(inputId)) { // Check if element still exists
                        input.type = 'password';
                        btn.innerHTML = ICONS.eye;
                    }
                    revealTimers.delete(inputId);
                }, REVEAL_TIMEOUT);
                revealTimers.set(inputId, timerId);
            }
        });
    });

    // --- View Toggle (List/Card) ---
    function updateViewToggleBtn(view) {
        DOMElements.viewToggleBtn.innerHTML = view === 'list' ? ICONS.grid : ICONS.list;
        DOMElements.viewToggleBtn.title = view === 'list' ? 'Vista de tarjetas' : 'Vista de lista';
    }

    DOMElements.viewToggleBtn.addEventListener('click', () => {
        currentView = currentView === 'list' ? 'card' : 'list';
        localStorage.setItem('rdk_view_preference', currentView);
        updateViewToggleBtn(currentView);
        renderKeys();
    });

    // Restore view preference
    const savedView = localStorage.getItem('rdk_view_preference');
    if (savedView === 'card' || savedView === 'list') {
        currentView = savedView;
    }
    updateViewToggleBtn(currentView);
});
