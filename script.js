// products
let apple = [
    {
        id: 0,
        image: 'product-img/iphone11.png',
        title: 'Iphone 11',
        memorySize: 128,
        price: 299990,
    },
    {
        id: 1,
        image: 'product-img/iphone12.png',
        title: 'Iphone 12',
        memorySize: 64,
        price: 374990,
    },
    {
        id: 2,
        image: 'product-img/iphone13.png',
        title: 'Iphone 13',
        memorySize: 128,
        price: 409990,
    },
    {
        id: 3,
        image: 'product-img/iphone14.png',
        title: 'Iphone14',
        memorySize: 256,
        price: 729990,
    }
];
let samsung = [
    {
        id: 0,
        image: 'product-img/SamsungS21.png',
        title: 'SamsungS21',
        memorySize: 128,
        price: 269890,
    },
    {
        id: 1,
        image: 'product-img/SamsungS22.png',
        title: 'SamsungS22',
        memorySize: 128,
        price: 369890,
    },
    {
        id: 2,
        image: 'product-img/SamsungS23.png',
        title: 'SamsungS23',
        memorySize: 256,
        price: 749890,
    },
    {
        id: 3,
        image: 'product-img/SamsungNote20.png',
        title: 'SamsungNote20',
        memorySize: 256,
        price: 314890,
    }
];
let huawei = [
    {
        id: 0,
        image: 'product-img/HUAWEINova8i.png',
        title: 'HUAWEI Nova 8i',
        memorySize: 64,
        price: 159990,
    },
    {
        id: 1,
        image: 'product-img/HUAWEIY5P2.png',
        title: 'HUAWEI Y5P 2',
        memorySize: 32,
        price: 19494,
    },
    {
        id: 2,
        image: 'product-img/HUAWEIY8P.png',
        title: 'HUAWEI Y8P',
        memorySize: 128,
        price: 44995,
    },
    {
        id: 3,
        image: 'product-img/HUAWEIY6P.png',
        title: 'HUAWEI Y6P',
        memorySize: 64,
        price: 24995,
    }
];
let xiomi = [
    {
        id: 0,
        image: 'product-img/XiaomiRedmiNote10Pro.png',
        title: 'Xiaomi Redmi Note 10 Pro',
        memorySize: 64,
        price: 159990,
    },
    {
        id: 1,
        image: 'product-img/XiaomiRedmi9A.png',
        title: 'Xiaomi Redmi 9A',
        memorySize: 32,
        price: 34990,
    },
    {
        id: 2,
        image: 'product-img/XiaomiRedmiNote10S.png',
        title: 'Xiaomi Redmi Note 10S',
        memorySize: 64,
        price: 109890,
    },
    {
        id: 2,
        image: 'product-img/XiaomiRedmiNote11.png',
        title: 'Xiaomi Redmi Note 11',
        memorySize: 128,
        price: 119990,
    },
];
let categories = [
    apple,
    samsung,
    huawei,
    xiomi
];

// scroll and show products
let box = document.querySelectorAll('.brand-box');
const productsType = document.querySelectorAll('.products-container');
const product = document.querySelectorAll('.product-container');
const products = document.getElementById('Products');

for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('click', () => {
        products.style.display = "block";
        productsType.forEach(check => {
            if (check.style.display === "block") {
                check.style.display = "none";
            }
        });

        productsType[i].style.display = "block";

        product[i].innerHTML = categories[i].map((item, index) => {
            const { image, title, memorySize, price } = item;
            return `<div class="product-box">
                        <h2><span id="product-name">${title}</span></h2>
                        <img src=${image} alt="">
                        <div class="product-layer">
                            Память: ${memorySize}гб<br>
                            Цена: ${price}тг
                        </div>
                        <input type="button" class='buy-button' value='Купить' onclick='addToCart(${i},${index})'>
                    </div>
                 </div>
                `;
        }).join('');

        const sectionTop = products.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    });
}

// buy products
let cart = [];
const itemField = document.getElementById('cartItem');
const saleCount = document.getElementById('sale-count');
const saleSum = document.getElementById('sale-sum');

if (cart.length === 0) {
    saleSum.setAttribute('style', 'display: none;');
}

function addToCart(categoryIndex, elementIndex) {
    document.getElementById('emptyCart').style.display = "none";
    cart.push({ ...categories[categoryIndex][elementIndex], count: 1 });
    displayCart();

    saleCount.innerHTML = cart.length;
    saleSum.setAttribute('style', 'display: relative;');

    if (cart.length >= 100) {
        saleCount.style.width = "40px";
        saleCount.style.height = "40px";

        const productCount = document.getElementById('product-count');
        cart.forEach(item => {
            if (item.count >= 100) {
                productCount.style.width = "40px";
                productCount.style.height = "40px";
            }
        })
    }
}

function delElement(title) {
    const index = cart.findIndex(item => item.title === title);

    if (index !== -1) {
        const item = cart[index];
        item.count--;
        if (item.count === 0) {
            cart.splice(index, 1);
        }
        displayCart();

        if (cart.length === 0) {
            saleSum.setAttribute('style', 'display: none;');
        }
    }
}

function addProductCount(title) {
    const item = cart.find(item => item.title === title);
    if (item) {
        item.count++;
        displayCart();
    }
}

//payment

function productsPayment() {
    let sum = cart.reduce((total, item) => total + item.price * item.count, 0);
    if (sum >= 10000)
        document.getElementById('payment').innerHTML = sum
            .toLocaleString('en', { useGrouping: true }).replace(/,/g, ' ');
}

function displayCart() {
    productsPayment();

    let cartCount = cart.reduce((obj, item) => {
        const key = item.title;
        if (!obj.hasOwnProperty(key)) {
            obj[key] = { ...item, count: 0 };
        }
        obj[key].count += item.count;
        return obj;
    }, {});
    if (cart.length == 0) {
        document.getElementById('cartItem').innerHTML = "";
        document.getElementById('emptyCart').style.display = "block";
        return;
    }
    itemField.innerHTML = Object.keys(cartCount).map(key => {
        const { count, title, price, image } = cartCount[key];
        return (
            `<div class="cart-item">
             <div class="row-img">
                <img class="rowimg" src=${image}>
             </div>
             <p style="font-size: 12px; margin: 0 2px">${title}</p>
             <h2 style="font-size: 15px; margin-bottom: 0;">${price}тг</h2>
             <p class = "product-count" id="product-count">${count}</p>
             <i class='bx bx-cart-add' onclick='addProductCount("${title}")'></i>
             <i class='bx bx-trash' onclick='delElement("${title}")'></i></div>`
        );
    }).join('');
}

// sticky navbar
window.addEventListener('scroll', () => {
    document.querySelector('header').classList.toggle('sticky', window.scrollY > 100);
});

// click basket
const main = document.querySelector('.main');
const basket = document.getElementById('basket');
const getBasket = document.querySelector('.sale');

basket.addEventListener('click', () => {
    getBasket.setAttribute('style', 'display: block;');
    main.setAttribute('style', 'pointer-events: none; opacity: .5;')
})

//close basket
const closeBasket = document.querySelector('.close');

closeBasket.addEventListener('click', () => {
    main.setAttribute('style', 'pointer-events: auto;');
    getBasket.style.display = "none";
});
