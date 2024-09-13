const imageInput = document.getElementById('imageInput');
const categoryInput = document.getElementById('categoryInput');
const uploadButton = document.getElementById('uploadButton');
const gallery = document.getElementById('gallery');
const filterSelect = document.getElementById('filterSelect');
const fullscreenViewer = document.getElementById('fullscreenViewer');
const fullscreenImage = document.getElementById('fullscreenImage');
const closeButton = document.getElementById('closeButton');
const downloadButton = document.getElementById('downloadButton');

let images = [];

uploadButton.addEventListener('click', () => {
    const files = imageInput.files;
    const category = categoryInput.value || 'Sin categoría';

    for (let file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const image = {
                src: e.target.result,
                category: category
            };
            images.push(image);
            addImageToGallery(image);
            updateFilterOptions();
        };
        reader.readAsDataURL(file);
    }

    imageInput.value = '';
    categoryInput.value = '';
});

function addImageToGallery(image) {
    const item = document.createElement('div');
    item.classList.add('gallery-item');
    item.dataset.category = image.category;

    const img = document.createElement('img');
    img.src = image.src;

    item.appendChild(img);
    gallery.appendChild(item);

    item.addEventListener('click', () => {
        openFullscreenViewer(image);
    });
}

function updateFilterOptions() {
    const categories = [...new Set(images.map(img => img.category))];
    filterSelect.innerHTML = '<option value="all">Todas</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        filterSelect.appendChild(option);
    });
}

filterSelect.addEventListener('change', () => {
    const category = filterSelect.value;
    const items = gallery.getElementsByClassName('gallery-item');
    for (let item of items) {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    }
});

function openFullscreenViewer(image) {
    fullscreenImage.src = image.src;
    fullscreenViewer.style.display = 'flex';

    downloadButton.onclick = () => {
        const link = document.createElement('a');
        link.href = image.src;
        link.download = 'imagen.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
}

closeButton.addEventListener('click', () => {
    fullscreenViewer.style.display = 'none';
});
