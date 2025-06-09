export const textStylesHistory = {
    // Заголовки
    h1: "forma-textBold text-[#39C6FF] text-4xl md:text-[75px] tracking-wide",
    h2: "forma-textRegular text-[#39C6FF] text-3xl md:text-[50px] font-bold",

    // Текст заказов
    orderDate: "forma-textRegular md:text-2xl text-[#39C6FF] tracking-wider",
    orderTotal: "text-lg md:text-2xl text-[#39C6FF]",

    // Товары
    itemName: "forma-textBold tracking-wider text-xl md:text-3xl font-medium",
    itemQuantity: "text-lg md:text-2xl",
    itemPrice: "text-xl md:text-3xl font-bold tracking-wider",

    // Кнопки
    buttonPrimary: "tracking-widest text-lg md:text-2xl font-bold text-[#39C6FF]",

    // Основной текст
    body: "forma-textRegular md:text-lg",
} as const;

export const textStylesGuest = {
    // Заголовок
    title: "text-[#39C6FF] text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-10 text-left",

    // Поля ввода
    input: "w-full h-12 md:h-14 rounded-lg md:rounded-xl py-2 px-4 bg-[#A5A5A5] placeholder:text-base text-3xl",

    // Кнопки
    buttonEdit: "bg-[#6ec9ff] hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-lg",
    buttonSave: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg text-lg",
    buttonCancel: "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg text-lg",

    // Текст
    label: "font-bold text-white",
    loadingText: "text-center py-8"
} as const;

export const textStylesShop = {
    // Заголовки секций
    sectionTitle: "forma-textRegular text-center text-[#7EDAFF] text-2xl md:text-[43px] font-bold",
    sectionDescription: "forma-textMedium tracking-wide leading-normal text-center text-white text-3xl md:text-[48px] font-bold",

    // Карточки продуктов
    productTitle: "text-white text-xl md:text-3xl font-bold",
    productPrice: "text-white text-lg md:text-2xl font-bold",

    // Кнопки
    infoButton: "text-gray font-bold text-sm",
    addButton: "text-white text-base md:text-xl font-bold",

    // Модальное окно
    modalTitle: "text-2xl font-bold text-gray-800",
    modalLabel: "font-semibold text-gray-800",
    modalText: "text-gray-600",
    modalValue: "font-bold text-[#39C6FF]",
    modalSmallText: "text-xs text-gray-500",

} as const;

export const textStylesCart = {
    // Заголовки
    cartTitle: "text-2xl md:text-3xl font-bold text-[#39C6FF]",

    // Товары в корзине
    itemName: "text-lg md:text-xl font-medium text-white",
    itemPrice: "text-lg md:text-xl font-bold text-white",
    itemQuantity: "text-base md:text-lg text-white",

    // Итого
    totalLabel: "text-xl md:text-2xl font-bold text-[#39C6FF]",
    totalPrice: "text-xl md:text-2xl font-bold text-white",

    // Кнопки
    checkoutButton: "text-lg md:text-xl font-bold text-white bg-[#39C6FF]",
    clearButton: "text-base md:text-lg text-gray-300 hover:text-white"
} as const;


export const textStylesFooter = {

    footerText: "text-[#B8B8B8] text-xl md:text-[35px] font-bold text-center md:text-left",
    footerLink: "text-[#B8B8B8] text-lg md:text-[35px] font-bold hover:text-[#39C6FF] transition-colors text-center md:text-left"
} as const;