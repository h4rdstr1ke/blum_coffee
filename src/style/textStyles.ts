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