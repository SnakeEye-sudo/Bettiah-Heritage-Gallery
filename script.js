// Bettiah Heritage Gallery - JavaScript
// Local photo gallery with tagging features

let gallery = [];
let allTags = new Set();
let currentFilter = null;

// Demo images - placeholders for heritage photos
const demoImages = [
    {
        data: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%234a90e2" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dy=".3em"%3EBettiah Palace%3C/text%3E%3C/svg%3E',
        tags: ['palace', 'historical', 'architecture'],
        id: Date.now() + 1
    },
    {
        data: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e74c3c" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dy=".3em"%3EAncient Temple%3C/text%3E%3C/svg%3E',
        tags: ['temple', 'religious', 'ancient'],
        id: Date.now() + 2
    },
    {
        data: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%2327ae60" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dy=".3em"%3EColonial Building%3C/text%3E%3C/svg%3E',
        tags: ['colonial-era', 'architecture', 'historical'],
        id: Date.now() + 3
    },
    {
        data: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f39c12" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dy=".3em"%3ELocal Monument%3C/text%3E%3C/svg%3E',
        tags: ['monument', 'heritage', 'landmark'],
        id: Date.now() + 4
    }
];

// Initialize gallery on page load
window.addEventListener('DOMContentLoaded', () => {
    loadGallery();
    if (gallery.length === 0) {
        // Load demo images if no images exist
        gallery = [...demoImages];
        saveGallery();
    }
    renderGallery();
    updateTagsDisplay();
});

// Load gallery from localStorage
function loadGallery() {
    try {
        const stored = localStorage.getItem('bettiahHeritagGallery');
        if (stored) {
            gallery = JSON.parse(stored);
            // Rebuild tags set
            gallery.forEach(item => {
                item.tags.forEach(tag => allTags.add(tag));
            });
        }
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}

// Save gallery to localStorage
function saveGallery() {
    try {
        localStorage.setItem('bettiahHeritagGallery', JSON.stringify(gallery));
    } catch (error) {
        console.error('Error saving gallery:', error);
        alert('Error saving to storage. Gallery may be too large.');
    }
}

// Upload new image
function uploadImage() {
    const fileInput = document.getElementById('imageUpload');
    const tagsInput = document.getElementById('imageTags');
    
    if (!fileInput.files || !fileInput.files[0]) {
        alert('Please select an image file');
        return;
    }
    
    const file = fileInput.files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
    }
    
    // Read file as base64
    const reader = new FileReader();
    reader.onload = (e) => {
        const tags = tagsInput.value
            .split(',')
            .map(tag => tag.trim().toLowerCase())
            .filter(tag => tag.length > 0);
        
        if (tags.length === 0) {
            tags.push('untagged');
        }
        
        const newImage = {
            data: e.target.result,
            tags: tags,
            id: Date.now()
        };
        
        gallery.push(newImage);
        tags.forEach(tag => allTags.add(tag));
        
        saveGallery();
        renderGallery();
        updateTagsDisplay();
        
        // Clear inputs
        fileInput.value = '';
        tagsInput.value = '';
        
        alert('Image added to gallery!');
    };
    
    reader.onerror = () => {
        alert('Error reading file');
    };
    
    reader.readAsDataURL(file);
}

// Filter gallery by tag
function filterByTag(tag) {
    currentFilter = tag;
    renderGallery();
    
    // Update active tag button
    document.querySelectorAll('.tag-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (tag === null) {
        document.querySelector('.tag-btn[onclick="filterByTag(null)"]').classList.add('active');
    } else {
        document.querySelectorAll('.tag-btn').forEach(btn => {
            if (btn.textContent === tag) {
                btn.classList.add('active');
            }
        });
    }
}

// Render gallery
function renderGallery() {
    const galleryElement = document.getElementById('gallery');
    
    let filteredGallery = gallery;
    if (currentFilter) {
        filteredGallery = gallery.filter(item => 
            item.tags.includes(currentFilter)
        );
    }
    
    if (filteredGallery.length === 0) {
        galleryElement.innerHTML = '<p style="text-align: center; color: #999; padding: 40px; grid-column: 1/-1;">No images found. Upload some heritage photos!</p>';
        return;
    }
    
    galleryElement.innerHTML = filteredGallery.map(item => `
        <div class="gallery-item">
            <img src="${item.data}" alt="Heritage photo" loading="lazy">
            <div class="gallery-item-info">
                <div class="image-tags">
                    ${item.tags.map(tag => `<span class="image-tag">${tag}</span>`).join('')}
                </div>
                <button class="delete-btn" onclick="deleteImage(${item.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Update tags display
function updateTagsDisplay() {
    const tagsDisplay = document.getElementById('tagsDisplay');
    
    const tagsHTML = `
        <button class="tag-btn ${currentFilter === null ? 'active' : ''}" onclick="filterByTag(null)">All (${gallery.length})</button>
        ${Array.from(allTags).map(tag => {
            const count = gallery.filter(item => item.tags.includes(tag)).length;
            return `<button class="tag-btn ${currentFilter === tag ? 'active' : ''}" onclick="filterByTag('${tag}')">${tag} (${count})</button>`;
        }).join('')}
    `;
    
    tagsDisplay.innerHTML = tagsHTML;
}

// Delete image
function deleteImage(id) {
    if (!confirm('Are you sure you want to delete this image?')) {
        return;
    }
    
    gallery = gallery.filter(item => item.id !== id);
    
    // Rebuild tags set
    allTags.clear();
    gallery.forEach(item => {
        item.tags.forEach(tag => allTags.add(tag));
    });
    
    saveGallery();
    renderGallery();
    updateTagsDisplay();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + U to focus upload input
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
        e.preventDefault();
        document.getElementById('imageUpload').click();
    }
});

// Drag and drop support
const uploadSection = document.querySelector('.upload-section');

uploadSection.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadSection.style.background = '#e8eaf6';
});

uploadSection.addEventListener('dragleave', () => {
    uploadSection.style.background = '#f8f9fa';
});

uploadSection.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadSection.style.background = '#f8f9fa';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        document.getElementById('imageUpload').files = files;
    }
});
