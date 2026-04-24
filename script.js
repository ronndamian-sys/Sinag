const articlesData = {
    'valentines': {
        title: '𝗛𝗜𝗚𝗛𝗟𝗜𝗚𝗛𝗧𝗦 | 𝗩𝗮𝗹𝗲𝗻𝘁𝗶𝗻𝗲’𝘀 𝗗𝗮𝘆 𝗖𝗲𝗹𝗲𝗯𝗿𝗮𝘁𝗶𝗼𝗻 𝗼𝗳 𝗣𝗨𝗣𝗶𝗮𝗻𝘀',
        meta: 'Highlights • February 14',
        images: [
            'Assets/VALENTINES FRONT.jpg',
            'Assets/VALENTINES 2.jpg',
            'Assets/VALENTINES 3.jpg',
            'Assets/VALENTINES 4.jpg'
        ],
        body: `
            <p>Captivating booths and color-coded shirts adorned the hallways of the Polytechnic University of the Philippines (PUP) — Cabiao Campus as PUPians celebrated Valentine’s Day with the theme, “Beyond Roses and Rainbows: Exploring Love in All Its Dimensions,” on February 14.</p>
            <p>During the morning segment, hearts were inspired and minds enriched as Shekinah Christian Church Head Pastor Teodora D. Suba shared insightful reflections on the art of love, commitment, and responsibility. The seminar concluded with a meaningful reflection and a “Twin Telepathy” game participated in by volunteer couples.</p>
            <p>In the afternoon, the celebration continued with a social dance and singing competition prepared by talented PUPians, filling the campus with excitement. The Cabiao Performing Arts Group also delivered a lively song-and-dance intermission number.</p>
            <p>This was followed by a social dance showdown among selected partners from each group and another interactive game. The program concluded with the much-anticipated awarding ceremony.</p>
            
            <h4>Winners:</h4>
            <p><strong>Singing Competition</strong><br>
            Champion — BEED 1st Year<br>
            1st Runner-Up — BEED 2nd Year<br>
            2nd Runner-Up — BSBA 3rd Year</p>
            
            <p><strong>Social Dance Competition</strong><br>
            Champion — BEED 3rd Year<br>
            1st Runner-Up — BEED 2nd Year<br>
            2nd Runner-Up — BEED 4th Year</p>
            
            <p>In conclusion, this year’s Valentine’s Day celebration was made successful through the collective efforts of the teachers, staff, officers, and students. Their shared time, energy, and dedication proved that love is truly a wonderful thing.</p>
            
            <div class="article-credits">
               <p>Written by: Angelu Quiambao</p>
               <p>Photos by: Marvie Mamangon and Gabriel Riosa</p>
               <p>Layout by: Marvie Mamangon</p>
               <p class="hashtags">#pupcc #pupccsinag</p>
            </div>
        `
    },
    'balik-sinta': {
        title: 'BALIK SINTA 2026',
        meta: 'News • February 10, 2026',
        images: [
            'Assets/BALIK SINTA FRONT.jpg',
            'Assets/BALIK SINTA 2.jpg',
            'Assets/BALIK SINTA 3.jpg',
            'Assets/BALIK SINTA 4.jpg',
            'Assets/BALIK SINTA 5.jpg'
        ],
        body: `
            <p>The Polytechnic University of the Philippines Cabiao Campus proudly opened its program with a meaningful sequence of activities that highlighted unity, patriotism, and institutional pride. From the solemn singing of the National Anthem and Invocation led by the PUP Chorale to the pledges and recitations delivered by student leaders, the event set a tone of commitment to both the nation and the university’s values.</p>
            <p>The program also showcased the university’s vision, mission, and campus goals, presented by dedicated student representatives. These segments emphasized PUP’s role in shaping future leaders and underscored the importance of aligning academic pursuits with service to the community. The presence of campus officials, including Ms. Criselda P. Coronado and Dr. Ivory Anne T. Taruc, further reinforced the institution’s dedication to holistic student development.</p>
            <p>Adding vibrance to the morning, the Zumba dance session brought energy and camaraderie among participants, balancing the formalities with fun and wellness. The program concluded with heartfelt renditions of the Bagong Pilipinas Hymn and the PUP Hymn, leaving everyone inspired and united under the shared vision of progress and excellence.</p>
        `
    },
    'linis-sinta': {
        title: 'LINIS SINTA 2026',
        meta: 'News • February 5, 2026',
        images: [
            'Assets/LINIS SINTA FRONT.jpg',
            'Assets/LINIS SINTA 2.jpg',
            'Assets/LINIS SINTA 3.jpg',
            'Assets/LINIS SINTA 4.jpg',
            'Assets/LINIS SINTA 5.jpg'
        ],
        body: `
            <p>Cabiao, Nueva Ecija – The Polytechnic University of the Philippines (PUP) Cabiao Campus successfully carried out its Linis Sinta 2026 activity in preparation for the upcoming second semester. Students, faculty, and staff joined forces to ensure that classrooms and campus facilities were thoroughly cleaned, organized, and made safe for the academic community.</p>
            <p>This initiative underscores the university’s commitment to providing a conducive learning environment while fostering discipline, cooperation, and shared responsibility among PUPians. More than a routine clean-up, Linis Sinta reflects the values of leadership, unity, and service that lie at the heart of the PUP-Cabiao Campus community.</p>
            <p>Through this collective effort, PUP-Cabiao reaffirms its dedication to academic excellence and student welfare, ensuring that the campus remains a place where learning and collaboration thrive.</p>
            
            <div class="article-credits">
               <p>Words and Photos by: Marvie Mamangon</p>
               <p class="hashtags">#pupcc #pupccsinag</p>
            </div>
        `
    }
};

let currentArticleId = null;
let currentSlide = 0;

function openArticle(id, slideIndex = 0) {
    const article = articlesData[id];
    if (!article) return;

    currentArticleId = id;
    currentSlide = slideIndex;

    document.getElementById('modal-title').innerText = article.title;
    document.getElementById('modal-meta').innerText = article.meta;
    document.getElementById('modal-body').innerHTML = article.body;

    const modal = document.getElementById('article-modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    updateGallery();
}

// Helper to safely restore scroll if no modals are open
function restoreScroll() {
    const modals = ['article-modal', 'login-modal', 'publish-modal', 'delete-modal', 'edit-modal', 'all-articles-modal', 'all-photos-modal'];
    const anyOpen = modals.some(id => {
        const el = document.getElementById(id);
        return el && el.style.display === 'block';
    });
    if (!anyOpen) {
        document.body.style.overflow = 'auto';
    }
}

function closeArticle() {
    const modal = document.getElementById('article-modal');
    modal.style.display = 'none';
    restoreScroll();
}

function changeSlide(direction) {
    const images = articlesData[currentArticleId].images;
    currentSlide += direction;
    
    if (currentSlide >= images.length) {
        currentSlide = 0;
    }
    if (currentSlide < 0) {
        currentSlide = images.length - 1;
    }
    updateGallery();
}

function updateGallery() {
    const images = articlesData[currentArticleId].images;
    const imgElement = document.getElementById('gallery-img');
    
    imgElement.style.opacity = '0';
    
    setTimeout(() => {
        imgElement.src = images[currentSlide];
        imgElement.style.opacity = '1';
    }, 200);
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('article-modal');
    const loginModal = document.getElementById('login-modal');
    const publishModal = document.getElementById('publish-modal');
    const deleteModal = document.getElementById('delete-modal');
    
    if (event.target == modal) closeArticle();
    if (event.target == loginModal) closeLoginModal();
    if (event.target == publishModal) closePublishModal();
    if (event.target == deleteModal) closeDeleteModal();
    if (event.target == document.getElementById('edit-modal')) closeEditModal();
    if (event.target === document.getElementById('all-articles-modal')) closeAllArticlesModal();
    if (event.target === document.getElementById('all-photos-modal')) closeAllPhotosModal();
}

// News Gallery / All Articles Modal
function openAllArticlesModal() {
    const modal = document.getElementById('all-articles-modal');
    const grid = document.getElementById('all-articles-grid');
    if (!modal || !grid) return;

    grid.innerHTML = '';
    
    // Sort keys to show newest first (basic assumption: newer IDs/keys are higher or follow dynamic prefix)
    const sortedKeys = Object.keys(articlesData).sort((a, b) => {
        if (a.startsWith('dynamic-') && b.startsWith('dynamic-')) return b.split('-')[1] - a.split('-')[1];
        if (a.startsWith('dynamic-')) return -1;
        if (b.startsWith('dynamic-')) return 1;
        return 0; // Pre-existing ones stay together
    });

    sortedKeys.forEach(id => {
        const article = articlesData[id];
        const card = document.createElement('article');
        card.className = 'article-card';
        card.onclick = () => {
            closeAllArticlesModal();
            openArticle(id);
        };
        
        const introText = article.body.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';

        card.innerHTML = `
            <div class="article-image">
                <img src="${article.images[0]}" alt="${article.title}">
                ${article.images.length > 1 ? `<div style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.6); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem;">+${article.images.length - 1} More</div>` : ''}
            </div>
            <div class="article-info">
                <span class="article-meta">${article.meta}</span>
                <h3 style="font-size: 1.1rem;">${article.title}</h3>
                <p style="font-size: 0.85rem;">${introText}</p>
                <a href="javascript:void(0)" class="read-more-btn" style="font-size: 0.8rem;">Read More →</a>
            </div>
        `;
        grid.appendChild(card);
    });

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAllArticlesModal() {
    document.getElementById('all-articles-modal').style.display = 'none';
    restoreScroll();
}

// Photo Gallery Modal
function openAllPhotosModal() {
    const modal = document.getElementById('all-photos-modal');
    const grid = document.getElementById('all-photos-grid');
    if (!modal || !grid) return;

    grid.innerHTML = '';
    
    // Collect all unique photos from all articles
    Object.keys(articlesData).forEach(id => {
        const article = articlesData[id];
        article.images.forEach((imgSrc, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-photo-item';
            item.onclick = () => {
                closeAllPhotosModal();
                openArticle(id, index);
            };
            
            item.innerHTML = `
                <img src="${imgSrc}" loading="lazy">
                <div class="photo-overlay">
                    <span>${article.title}</span>
                </div>
            `;
            grid.appendChild(item);
        });
    });

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAllPhotosModal() {
    document.getElementById('all-photos-modal').style.display = 'none';
    restoreScroll();
}

// Global fade effect for gallery images
const style = document.createElement('style');
style.textContent = `
    #gallery-img {
        transition: opacity 0.3s ease-in-out;
    }
`;
document.head.appendChild(style);

/* ADMIN & PUBLISH LOGIC */

// Login Modal Controls
function openLoginModal() {
    document.getElementById('login-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
    restoreScroll();
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'pupccsinag2526') {
        localStorage.setItem('isAdmin', 'true');
        showAdminControls();
        closeLoginModal();
        alert('Logged in as Admin');
    } else {
        alert('Invalid credentials');
    }
}

// Handle Logout
function handleLogout() {
    localStorage.removeItem('isAdmin');
    showAdminControls();
    alert('Logged out');
    // Optionally reload to clean up state
    location.reload();
}

// Show Admin Controls
function showAdminControls() {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const publishBtn = document.getElementById('admin-publish-btn');
    const statusIndicator = document.getElementById('server-status');
    const loginLink = document.getElementById('admin-login-link');
    const logoutLink = document.getElementById('admin-logout-link');
    const adminActions = document.querySelectorAll('.admin-actions');

    if (isAdmin) {
        if (publishBtn) publishBtn.style.display = 'inline-block';
        if (statusIndicator) statusIndicator.style.display = 'inline-flex';
        if (loginLink) loginLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'block';
        adminActions.forEach(actions => actions.style.display = 'flex');
    } else {
        if (publishBtn) publishBtn.style.display = 'none';
        if (statusIndicator) statusIndicator.style.display = 'none';
        if (loginLink) loginLink.style.display = 'block';
        if (logoutLink) logoutLink.style.display = 'none';
        adminActions.forEach(actions => actions.style.display = 'none');
    }
}

// Publish Modal Controls
function openPublishModal() {
    document.getElementById('publish-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePublishModal() {
    document.getElementById('publish-modal').style.display = 'none';
    restoreScroll();
}

// Edit Modal Controls
function openEditModal() {
    document.getElementById('edit-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
    restoreScroll();
}

let articleToEdit = null;
let editUploadedImages = [];

function initEdit(id) {
    articleToEdit = id;
    const data = articlesData[id];
    if (!data) return;

    document.getElementById('e-headline').value = data.title;
    // Extract caption from body (naive approach for this client-side demo)
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = data.body;
    document.getElementById('e-caption').value = tempDiv.innerText;
    
    editUploadedImages = [...data.images];
    renderEditPreviews();
    openEditModal();
}

function renderEditPreviews() {
    const grid = document.getElementById('edit-preview-grid');
    if (!grid) return;

    grid.innerHTML = '';
    if (editUploadedImages.length > 0) {
        grid.style.display = 'grid';
        editUploadedImages.forEach((imgSrc, index) => {
            const item = document.createElement('div');
            item.className = 'preview-item';
            item.innerHTML = `
                <img src="${imgSrc}">
                <button type="button" class="remove-photo" onclick="removeEditPhoto(${index})">&times;</button>
            `;
            grid.appendChild(item);
        });
    } else {
        grid.style.display = 'none';
    }
}

function removeEditPhoto(index) {
    editUploadedImages.splice(index, 1);
    renderEditPreviews();
}

function handleEditSave(event) {
    event.preventDefault();
    const data = articlesData[articleToEdit];
    if (!data) return;

    const headline = document.getElementById('e-headline').value;
    const caption = document.getElementById('e-caption').value;

    if (editUploadedImages.length === 0) {
        alert('Please keep at least one image');
        return;
    }

    // Update data
    data.title = headline;
    data.images = [...editUploadedImages];
    // Improved paragraph handling: split by one or more newlines, filter empty, wrap in P tags
    data.body = caption.split(/\n+/).map(para => `<p>${para.trim()}</p>`).join('');

    // Update DOM
    const selector = articleToEdit.startsWith('dynamic-') ? 
                     `#card-${articleToEdit}` : 
                     `article[onclick*="${articleToEdit}"]`;
    const card = document.querySelector(selector);
    
    if (card) {
        card.querySelector('h3').innerText = headline;
        card.querySelector('img').src = editUploadedImages[0];
        card.querySelector('p').innerText = caption.substring(0, 150) + (caption.length > 150 ? '...' : '');
        
        const imageContainer = card.querySelector('.article-image');
        const moreLabel = imageContainer.querySelector('div[style*="background: rgba(0,0,0,0.6)"]');
        if (moreLabel) moreLabel.remove();
        
        if (editUploadedImages.length > 1) {
            const label = document.createElement('div');
            label.style.cssText = "position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.6); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem;";
            label.innerText = `+${editUploadedImages.length - 1} More`;
            imageContainer.appendChild(label);
        }
    }

    alert('Changes saved successfully!');
    closeEditModal();

    // Persist to source code
    saveToDisk({
        id: articleToEdit,
        title: headline,
        meta: data.meta,
        images: data.images,
        content: data.body,
        isEdit: true
    });
}

// Handle Publish
function handlePublish(event) {
    event.preventDefault();
    const headline = document.getElementById('p-headline').value;
    const caption = document.getElementById('p-caption').value;
    
    if (uploadedImages.length === 0) {
        alert('Please upload at least one image');
        return;
    }

    const now = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const dateStr = now.toLocaleDateString('en-US', options);

    // Create new article element
    const newsGrid = document.querySelector('.news-grid');
    const articleId = 'dynamic-' + Date.now();
    const meta = `News • ${dateStr}`;
    const body = caption.split(/\n+/).map(para => `<p>${para.trim()}</p>`).join('');
    
    // Add to articlesData so it can be opened
    articlesData[articleId] = {
        title: headline,
        meta: meta,
        images: [...uploadedImages],
        body: body
    };

    const articleCard = document.createElement('article');
    articleCard.className = 'article-card animate-up';
    articleCard.id = `card-${articleId}`;
    articleCard.onclick = () => openArticle(articleId);
    articleCard.innerHTML = `
        <div class="article-image">
            <img src="${uploadedImages[0]}" alt="${headline}">
            ${uploadedImages.length > 1 ? `<div style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.6); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem;">+${uploadedImages.length - 1} More</div>` : ''}
        </div>
        <div class="article-info">
            <span class="article-meta">${meta}</span>
            <h3>${headline}</h3>
            <p>${caption.substring(0, 150)}${caption.length > 150 ? '...' : ''}</p>
            <a href="javascript:void(0)" class="read-more-btn">Read More →</a>
            <div class="admin-actions" style="display: flex;">
                <button class="edit-article-btn" onclick="event.stopPropagation(); initEdit('${articleId}')">Edit</button>
                <button class="delete-article-btn" onclick="event.stopPropagation(); initDelete('${articleId}')">Delete</button>
            </div>
        </div>
    `;

    // Prepend to grid
    newsGrid.insertBefore(articleCard, newsGrid.firstChild);

    alert('Article Published Successfully!');
    closePublishModal();
    document.getElementById('publish-form').reset();
    clearUploadedImages();
    
    // Persist to source code
    saveToDisk({
        id: articleId,
        title: headline,
        meta: meta,
        images: articlesData[articleId].images,
        content: body,
        isEdit: false
    });

    // Scroll to new article
    window.scrollTo({
        top: document.getElementById('news').offsetTop - 100,
        behavior: 'smooth'
    });
}

async function saveToDisk(articleData) {
    try {
        const response = await fetch('http://localhost:3000/api/save-article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(articleData),
        });
        const result = await response.json();
        if (result.success) {
            console.log('Persistence status: Saved to source code');
        } else {
            throw new Error(result.error || 'Server failed to save changes');
        }
    } catch (error) {
        console.error('Persistence Error:', error);
        alert('⚠️ Warning: Could not save changes to source code permanently.\n\nMake sure the persistence server is running (node dev-server.mjs).\nYour changes will be lost after you refresh.');
    }
}

async function checkPersistenceServer() {
    const indicator = document.getElementById('server-status');
    if (!indicator) return;

    try {
        const response = await fetch('http://localhost:3000/', { method: 'HEAD', mode: 'no-cors' });
        indicator.innerHTML = '<span style="width: 8px; height: 8px; border-radius: 50%; background: #2ecc71; display: inline-block;"></span> Connected';
        indicator.style.color = '#2ecc71';
        console.log('✅ Persistence server connected');
    } catch (e) {
        indicator.innerHTML = '<span style="width: 8px; height: 8px; border-radius: 50%; background: #e74c3c; display: inline-block;"></span> Disconnected';
        indicator.style.color = '#e74c3c';
        console.warn('❌ Persistence server not detected. Changes won\'t be permanent.');
    }
}

// DELETE ARTICLE LOGIC
let articleToDelete = null;

function initDelete(id) {
    articleToDelete = id;
    document.getElementById('delete-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeDeleteModal() {
    document.getElementById('delete-modal').style.display = 'none';
    document.getElementById('delete-form').reset();
    articleToDelete = null;
    restoreScroll();
}

function handleDeleteConfirm(event) {
    event.preventDefault();
    const pass = document.getElementById('delete-password').value;

    if (pass === 'pupccsinag2526') {
        // Remove from DOM
        const selector = articleToDelete.startsWith('dynamic-') ? 
                         `#card-${articleToDelete}` : 
                         `article[onclick*="${articleToDelete}"]`;
        const card = document.querySelector(selector);
        
        if (card) {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.remove();
            }, 300);
        }

        // Remove from data
        delete articlesData[articleToDelete];

        alert('Article deleted successfully');
        closeDeleteModal();

        // Persist deletion to source code
        deleteFromDisk(articleToDelete);
    } else {
        alert('Incorrect password. Deletion cancelled.');
    }
}

async function deleteFromDisk(id) {
    try {
        const response = await fetch('http://localhost:3000/api/delete-article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });
        const result = await response.json();
        console.log('Deletion persistence status:', result);
    } catch (error) {
        console.warn('Persistence server not running. Deletion is temporary until refresh.', error);
    }
}

// DRAG AND DROP / FILE UPLOAD LOGIC
let uploadedImages = [];

document.addEventListener('DOMContentLoaded', () => {
    showAdminControls();
    checkPersistenceServer();

    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('p-image-file');

    const editUploadArea = document.getElementById('edit-upload-area');
    const editFileInput = document.getElementById('e-image-file');

    if (!uploadArea || !editUploadArea) return;

    // Drag and drop events for Publish
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
        editUploadArea.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('dragover');
        }, false);
        editUploadArea.addEventListener(eventName, () => {
            editUploadArea.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('dragover');
        }, false);
        editUploadArea.addEventListener(eventName, () => {
            editUploadArea.classList.remove('dragover');
        }, false);
    });

    uploadArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }, false);

    editUploadArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleEditFiles(files);
    }, false);

    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    editFileInput.addEventListener('change', function() {
        handleEditFiles(this.files);
    });

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    uploadedImages.push(e.target.result);
                    renderPreviews();
                };
                reader.readAsDataURL(file);
            }
        });
    }

    function handleEditFiles(files) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    editUploadedImages.push(e.target.result);
                    renderEditPreviews();
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

function renderPreviews() {
    const grid = document.getElementById('image-preview-grid');
    if (!grid) return;

    grid.innerHTML = '';
    if (uploadedImages.length > 0) {
        grid.style.display = 'grid';
        uploadedImages.forEach((imgSrc, index) => {
            const item = document.createElement('div');
            item.className = 'preview-item';
            item.innerHTML = `
                <img src="${imgSrc}">
                <button type="button" class="remove-photo" onclick="removePhoto(${index})">&times;</button>
            `;
            grid.appendChild(item);
        });
    } else {
        grid.style.display = 'none';
    }
}

function removePhoto(index) {
    uploadedImages.splice(index, 1);
    renderPreviews();
}

function clearUploadedImages() {
    uploadedImages = [];
    renderPreviews();
    const fileInput = document.getElementById('p-image-file');
    if (fileInput) fileInput.value = '';
}
