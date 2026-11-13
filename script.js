// ==============================
// 1. WHATSAPP НОМЕРИ
// ==============================
// Бул жерге заказ кабыл ала турган WhatsApp номерин жаз.
const RECEIVER = "996998003480";

// ==============================
// 2. МЕНЮДАГЫ ТАМАКТАР
// ==============================
const MENU = [
    // ШОРПОЛОР
    { c: "Шорпо", e: "🍗", n: "Тоок шорпо",       p: 250, d: "Жеңил жана тойгузган" },
    { c: "Шорпо", e: "🦃", n: "Индюк шорпо",     p: 300, d: "Диеталык, даамдуу" },
    { c: "Шорпо", e: "🥩", n: "Мал шорпо",       p: 350, d: "Уйдун эти менен" },
    { c: "Шорпо", e: "🐑", n: "Кой шорпо",       p: 400, d: "Салттуу кой эти" },

    // ТАМАКТАР
    { c: "Тамак", e: "🍛", n: "Палоо",           p: 300, d: "Үй палоосу" },
    { c: "Тамак", e: "🥟", n: "Эт манты",        p: 0,   d: "Эт кошулган манты" },
    { c: "Тамак", e: "🥟", n: "Картошка манты",  p: 0,   d: "Картошка кошулган манты" },
    { c: "Тамак", e: "🥟", n: "Ашкабак манты",   p: 0,   d: "Ашкабак кошулган манты" },
    { c: "Тамак", e: "🍖", n: "Гуляш",           p: 0,   d: "Даамдуу гуляш" },
    { c: "Тамак", e: "🥩", n: "Бифштекс",        p: 0,   d: "Эттен жасалган бифштекс" },
    { c: "Тамак", e: "🍚", n: "Гарнир",          p: 0,   d: "Гарнир" },
    { c: "Тамак", e: "🍲", n: "Мастава",         p: 0,   d: "Даамдуу мастава" },
    { c: "Тамак", e: "🥣", n: "Чүчвара",         p: 0,   d: "Даамдуу чүчвара" },
    { c: "Тамак", e: "🍽️", n: "Оромо",           p: 0,   d: "Салттуу оромо" },
    { c: "Тамак", e: "🥗", n: "Салат",           p: 120, d: "Жаңы жашылча" },

    // СУУСУНДУКТАР
    { c: "Суусундук", e: "🍵", n: "Көк чай",      p: 0, d: "Көк чай" },
    { c: "Суусундук", e: "☕", n: "Кара чай",     p: 0, d: "Кара чай" },
    { c: "Суусундук", e: "🫖", n: "Аралаш чай",   p: 0, d: "Аралаш чай" },
    { c: "Суусундук", e: "💧", n: "Легенда 1л",      p: 0, d: "Суу" },
    { c: "Суусундук", e: "🥤", n: "Coca Cola 1л",         p: 0, d: "Кола" },
    { c: "Суусундук", e: "🥤", n: "Pepsi 1л",        p: 0, d: "Пепси" },
    { c: "Суусундук", e: "🥤", n: "Fanta 1л",        p: 0, d: "Фанта" },
    { c: "Суусундук", e: "☕", n: "Кофе",         p: 0, d: "Кофе" },
    { c: "Суусундук", e: "🫖", n: "Султан чай 1л",   p: 0, d: "Султан чай" },
    { c: "Суусундук", e: "🥤", n: "Lets Go 1.2л",       p: 0, d: "Летсго" }
];

// HTML ичиндеги элементтерди ID аркылуу табуу.
const $ = (id) => document.getElementById(id);

// Учурда тандалган категория жана себет.
let category = "Баары";
let cart = {};

// ==============================
// 3. МЕНЮНУ ЭКРАНГА ЧЫГАРУУ
// ==============================
function showMenu() {
    const categories = ["Баары", ...new Set(MENU.map(item => item.c))];

    // Категория баскычтарын түзүү.
    $("tabs").innerHTML = categories.map(name => `
        <button
            class="tab ${name === category ? "on" : ""}"
            onclick="setCategory('${name}')">
            ${name}
        </button>
    `).join("");

    // Тандалган категориядагы тамактарды көрсөтүү.
    const visibleMenu = MENU.map((item, index) => {
        if (category !== "Баары" && category !== item.c) {
            return "";
        }

        return `
            <div class="card">
                <div class="e">${item.e}</div>
                <h3>${item.n}</h3>
                <small>${item.d}</small>
                <div class="p">${item.p} сом</div>
                <button class="add" onclick="change(${index}, 1)">
                    Себетке кошуу
                </button>
            </div>
        `;
    }).join("");

    $("grid").innerHTML = visibleMenu;
}

// Категорияны алмаштыруу.
function setCategory(name) {
    category = name;
    showMenu();
}

// ==============================
// 4. СЕБЕТКЕ ТАМАК КОШУУ ЖАНА АЗАЙТУУ
// ==============================
function change(index, amount) {
    cart[index] = (cart[index] || 0) + amount;

    if (cart[index] <= 0) {
        delete cart[index];
    }

    showCart();
}

// ==============================
// 5. СЕБЕТТИ ЖАНА ЖАЛПЫ БААНЫ КӨРСӨТҮҮ
// ==============================
function showCart() {
    const ids = Object.keys(cart);

    let total = 0;
    let count = 0;

    if (ids.length === 0) {
        $("lines").innerHTML =
            '<p style="color:var(--mut)">Себет бош. Менюдан тамак тандаңыз.</p>';
    } else {
        $("lines").innerHTML = ids.map(id => {
            const item = MENU[id];
            const quantity = cart[id];
            const itemTotal = item.p * quantity;

            total += itemTotal;
            count += quantity;

            return `
                <div class="row">
                    <span>${item.e} ${item.n}</span>

                    <span class="q">
                        <button onclick="change(${id}, -1)">−</button>
                        ${quantity}
                        <button onclick="change(${id}, 1)">+</button>
                    </span>

                    <b>${itemTotal} сом</b>
                </div>
            `;
        }).join("");
    }

    $("sum").textContent = total;
    $("cnt").textContent = count;
}

// ==============================
// 6. ЗАКАЗДЫ WHATSAPPКА ЖӨНӨТҮҮ
// ==============================
function send() {
    const ids = Object.keys(cart);

    const name = $("name").value.trim();
    const phone = $("phone").value.trim();
    const address = $("addr").value.trim();

    // Маалыматтарды текшерүү.
    if (ids.length === 0) {
        $("err").textContent = "Себетке тамак кошуңуз";
        return;
    }

    if (!name || !phone || !address) {
        $("err").textContent =
            "Аты, телефон жана дарек толтурулушу керек";
        return;
    }

    if (RECEIVER === "996000000000") {
        $("err").textContent =
            "JavaScript файлындагы RECEIVER номерин өзгөртүңүз";
        return;
    }

    let total = 0;

    const items = ids.map(id => {
        const item = MENU[id];
        const quantity = cart[id];

        total += item.p * quantity;
        return `${item.n} x${quantity}`;
    }).join("\n");

    const message =
        `Жаңы заказ!\n${items}\nЖалпы: ${total} сом\n` +
        `Аты: ${name}\nТел: ${phone}\nДарек: ${address}\nТөлөм: MBank KR`;

    const whatsappURL =
        `https://wa.me/${RECEIVER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

    $("form").style.display = "none";
    $("ok").style.display = "block";
}

// ==============================
// 7. САЙТ АЧЫЛГАНДА ИШТЕТҮҮ
// ==============================
showMenu();
showCart();
