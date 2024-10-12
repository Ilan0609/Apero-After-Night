// Gestion du Panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const cartModal = document.getElementById('cart-modal');
const cartButton = document.getElementById('cart-button');
const closeModal = document.getElementById('close');
const checkoutButton = document.getElementById('checkout');

// Gestion de l'authentification
const authModal = document.getElementById('auth-modal');
const loginButton = document.getElementById('login-button');
const registerLink = document.getElementById('register-link');
const authCloseButton = document.getElementById('auth-close');
const authForm = document.getElementById('auth-form');
const authToggle = document.getElementById('auth-toggle');
const authTitle = document.getElementById('auth-title');

// Gestion de la recherche
const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const productList = document.getElementById('product-list');

// Gestion de l'image agrandie
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const imageClose = document.getElementById('image-close');

// Liste des produits 
const categories = [
    {
        name: "Alcool",
        products: [
            { name: "Poliakov", price: 3.50, image: "Poliakov.png" },
            { name: "Clan Campbell", price: 3.80, image: "clan campbell.png" },
            { name: "Jack Daniel's", price: 4.00, image: "Jack Daniel's.png" },
            { name: "Captain Morgan", price: 3.00, image: "Captain Morgan.png" },
            { name: "Pack Heineken", price: 3.00, image: "heineken.png" },
            { name: "GibsonS", price: 3.00, image: "GibsonS.png" },
        ]
    },
    {
        name: "Soft",
        products: [
            { name: "Coca Cola Original", price: 1.20, image: "Coca Cola Original.png" },
            { name: "Schweppes", price: 1.50, image: "Schweppes.png" },
            { name: "Perrier", price: 0.80, image: "Perrier.png" },
            { name: "Crazy Tiger", price: 1.00, image: "Crazy Tiger.png" },
        ]
    },
    {
        name: "Snacks",
        products: [
            { name: "Chips Nature", price: 1.50, image: "chips_nature.jpg" },
            { name: "Chips Paprika", price: 1.60, image: "chips_paprika.jpg" },
            { name: "Fruits Secs", price: 2.50, image: "fruits_secs.jpg" },
            { name: "Noix Cajou", price: 2.00, image: "noix_cajou.jpg" },
        ]
    },
    {
        name: "Douceurs",
        products: [
            { name: "Chocolats Assortis", price: 2.50, image: "chocolats_assortis.jpg" },
            { name: "Bonbons Gélifiés", price: 1.80, image: "bonbons_gelifies.jpg" },
            { name: "Biscottes Sucrées", price: 1.20, image: "biscottes_sucrees.jpg" },
            { name: "Macarons", price: 2.00, image: "macarons.jpg" },
        ]
    }
    // Ajoutez autant de catégories et de produits que nécessaire
];

// Fonction pour générer les produits par catégorie
function generateProducts() {
    categories.forEach(category => {
        // Créer une section pour la catégorie
        const categorySection = document.createElement('section');
        categorySection.classList.add('category-section');

        // Ajouter le titre de la catégorie
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category.name;
        categorySection.appendChild(categoryTitle);

        // Créer une liste de produits
        const productsDiv = document.createElement('div');
        productsDiv.classList.add('product-list-category');

        category.products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.setAttribute('data-name', product.name.toLowerCase());

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            img.classList.add('product-image');

            const title = document.createElement('h3');
            title.textContent = product.name;

            const price = document.createElement('p');
            price.textContent = `Prix : ${product.price.toFixed(2)} €`;

            const button = document.createElement('button');
            button.classList.add('add-to-cart');
            button.setAttribute('data-name', product.name);
            button.setAttribute('data-price', product.price.toFixed(2));
            button.textContent = 'Ajouter au panier';

            // Ajouter les éléments au div produit
            productDiv.appendChild(img);
            productDiv.appendChild(title);
            productDiv.appendChild(price);
            productDiv.appendChild(button);

            // Ajouter le produit à la liste de produits de la catégorie
            productsDiv.appendChild(productDiv);
        });

        // Ajouter la liste de produits à la section de la catégorie
        categorySection.appendChild(productsDiv);

        // Ajouter la section de la catégorie à la liste des produits
        productList.appendChild(categorySection);
    });
}

// Initialisation des produits
generateProducts();

// Mise à jour du compteur du panier
updateCartCount();

// Fonction pour mettre à jour le nombre d'articles dans le panier
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Fonction pour ajouter un produit au panier
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: parseFloat(productPrice) });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Ajouter des écouteurs d'événements pour les boutons "Ajouter au panier"
function addCartEventListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-name');
            const productPrice = this.getAttribute('data-price');
            addToCart(productName, productPrice);
        });
    });
}

// Appeler la fonction pour ajouter les écouteurs après génération des produits
addCartEventListeners();

// Fonction pour afficher le contenu du panier
function displayCart() {
    cartItems.innerHTML = ''; // Réinitialiser le contenu
    let total = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        
        const itemInfo = document.createElement('span');
        itemInfo.textContent = `${item.name} - ${item.price.toFixed(2)} €`;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-item');
        removeButton.textContent = 'Supprimer';
        removeButton.setAttribute('data-index', index);
        removeButton.onclick = function() {
            removeFromCart(this.getAttribute('data-index'));
        };

        itemElement.appendChild(itemInfo);
        itemElement.appendChild(removeButton);
        cartItems.appendChild(itemElement);
        total += item.price;
    });

    totalPrice.textContent = `Prix total: ${total.toFixed(2)} €`;
}

// Fonction pour supprimer un article du panier
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

// Événements pour ouvrir et fermer le panier
cartButton.onclick = function() {
    displayCart();
    cartModal.style.display = "block";
}

closeModal.onclick = function() {
    cartModal.style.display = "none";
}

// Fonction de paiement simple (exemple)
checkoutButton.onclick = function() {
    if (cart.length === 0) {
        alert('Votre panier est vide.');
        return;
    }

    // Ici, vous pouvez implémenter votre logique de paiement
    alert('Paiement effectué ! Merci de votre achat.');
}

// Fonctions Authentification
function openAuthModal(mode) {
    authModal.style.display = 'block';
    if (mode === 'login') {
        authTitle.textContent = 'Se connecter';
        authToggle.innerHTML = "Vous n'avez pas de compte ? <a href='#' id='toggle-auth'>Inscrivez-vous ici.</a>";
    } else if (mode === 'register') {
        authTitle.textContent = 'Créer un compte';
        authToggle.innerHTML = "Vous avez déjà un compte ? <a href='#' id='toggle-auth'>Connectez-vous ici.</a>";
    }
}

loginButton.onclick = function() {
    openAuthModal('login');
}

registerLink.onclick = function(event) {
    event.preventDefault();
    openAuthModal('register');
}

authCloseButton.onclick = function() {
    authModal.style.display = "none";
}

authToggle.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'toggle-auth') {
        event.preventDefault();
        if (authTitle.textContent === 'Se connecter') {
            openAuthModal('register');
        } else {
            openAuthModal('login');
        }
    }
});

// Gestion du formulaire Authentification
authForm.onsubmit = function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (authTitle.textContent === 'Se connecter') {
        // Connexion
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[email] && users[email] === password) {
            alert('Connexion réussie !');
            authModal.style.display = "none";
        } else {
            alert('Nom d\'utilisateur ou mot de passe incorrect.');
        }
    } else {
        // Inscription
        let users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[email]) {
            alert('Email déjà utilisé.');
        } else {
            users[email] = password;
            localStorage.setItem('users', JSON.stringify(users));
            alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
            authModal.style.display = "none";
        }
    }

    authForm.reset();
}

// Gestion de la recherche
searchButton.onclick = function() {
    const query = searchBar.value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const name = product.getAttribute('data-name').toLowerCase();
        if (name.includes(query)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

// Permettre la recherche en appuyant sur "Entrée"
searchBar.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchButton.click();
    }
})

// Fonctions Image Agrandie
function addImageEventListeners() {
    const productImages = document.querySelectorAll('.product-image');
    productImages.forEach(image => {
        image.addEventListener('click', function() {
            modalImage.src = this.src;
            imageModal.style.display = "block";
        });
    });
}

// Appeler la fonction pour ajouter les écouteurs après génération des produits
addImageEventListeners();

imageClose.onclick = function() {
    imageModal.style.display = "none";
}

// Fermer les modals en cliquant en dehors
window.onclick = function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
    if (event.target === authModal) {
        authModal.style.display = "none";
    }
    if (event.target === imageModal) {
        imageModal.style.display = "none";
    }
}
