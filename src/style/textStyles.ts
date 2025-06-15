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
  sectionDescription: "forma-textMedium tracking-wide leading-normal text-center text-white text-3xl md:text-[35px] font-bold mb-6 bg-[#7EDAFFDB] rounded-[50px] mx-auto max-w-[1200px] px-4 pb-4 pt-4",

  // Кнопки
  infoButton: "text-gray font-bold text-sm",
  addButton: "text-white text-base md:text-xl font-bold",

  // Стили для компонента Cart (корзина справа снизу)
  cartContainer: "fixed bottom-6 right-6 z-50",
  cartLink: "flex items-center gap-3 bg-[#7EDAFF] text-white p-4 rounded-[30px] shadow-lg hover:bg-[#6ec9ff] transition-colors",
  cartIconContainer: "relative",
  cartIcon: "w-10 h-10",
  cartBadge: "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center",
  cartText: "text-3xl md:text-[40px] font-bold",

  // Стили для ProductCard
  productCard: {
    container: "flex bg-[#7EDAFFD9] rounded-[20px] md:rounded-[30px] p-4 md:p-4 h-[400px] md:h-[450px] flex-col w-full max-w-[300px] mx-auto relative",
    imageContainer: "w-full h-[200px] md:h-[250px] rounded-[26px] overflow-hidden mb-3 md:mb-1 bg-white relative",
    image: "w-full h-full object-cover",
    infoButton: "absolute bottom-2 right-2 w-8 h-8 flex items-center justify-center z-10 bg-white border border-gray-300 rounded-full shadow-sm",
    infoIcon: "w-5 h-5",
    title: "forma-textMedium text-[#FFFFFF] text-bold md:text-[28px]  mb-1 md:mb-2",
    price: "forma-textMedium text-[#FFFFFF] md:text-[28px] absolute -top-5 md:-top-12 right-4 md:right-0 text-lg font-bold",
    addButton: "forma-textMedium text-[#FFFFFF] bg-[#39C6FF] md:text-[24px] px-4 md:px-6 rounded-lg md:rounded-xl flex "
  },

  // Стили для ProductInfoModal
  productInfoModal: {
    overlay: "fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]",
    modalContainer: "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white/90 backdrop-blur-sm rounded-[24px] shadow-xl w-full max-w-[90vw] md:max-w-[800px] max-h-[90vh] overflow-auto",
    closeButton: "absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl z-50",
    contentContainer: "flex flex-col h-full bg-[#7EDAFF] p-5",
    topSection: "flex flex-1 overflow-hidden",
    imageContainer: "w-1/2 h-auto max-h-[350px] rounded-[24px] overflow-hidden",
    image: "w-full h-full object-cover",
    descriptionContainer: "w-1/2 p-6 overflow-y-auto ",
    compositionList: "forma-textMedium text-[#FFFFFF] md:text-[24px] list-disc pl-5 space-y-1",
    nutritionSection: "text-[#FFFFFF] p-6",
    nutritionGrid: "grid grid-cols-4 gap-2",
    nutritionItem: "bg-[#7EDAFF] p-2 rounded text-center shadow-sm ",
    modalLabel: "forma-textMedium text-[#A5A5A5] md:text-[30px]",
  },
  // Модальное окно
  modalTitle: "forma-textMedium tracking-wider text-[#A5A5A5] text-2xl md:text-[40px] w-[80%] md:w-[80%] mb-5 font-bold",
  modalText: "forma-textMedium text-[#FFFFFF] md:text-[24px]",
  modalValue: "forma-textRegular md:text-[24px] font-bold",
  modalSmallText: "forma-textRegular md:text-[15px] text-xs",
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

  footerText: "forma-textRegular text-[#B8B8B8] text-xl md:text-[35px] font-bold text-center md:text-left",
  footerLink: "forma-textRegular text-[#B8B8B8] text-lg md:text-[35px] font-bold hover:text-[#39C6FF] transition-colors text-center md:text-left"
} as const;


export const textStylesHeader = {
  // Общие стили
  header: "w-full bg-[#7EDAFF] text-white h-30 md:px-10 flex items-center",
  userIconContainer: "h-12 w-12 flex items-center justify-center",
  // Десктоп версия
  desktopContainer: "hidden md:flex w-full p-4 items-center justify-between relative",
  logo: "h-15",
  navContainer: "w-full flex items-center justify-between ml-[5%]",
  scheduleContainer: "text-right",
  scheduleTitle: "forma-textRegular tracking-widest text-[clamp(14px,2vw,20px)]",
  scheduleTime: "forma-textRegular text-[clamp(12px,1.8vw,18px)] text-center",
  navLink: `
    forma-textBold
    tracking-wider 
    font-bold 
    text-[clamp(14px,2vw,30px)]
    relative
    pb-1
    after:content-['']
    after:absolute
    after:bottom-0
    after:left-0
    after:w-0
    after:h-[2px]
    after:bg-white
    after:transition-all
    after:duration-300
    hover:after:w-full
    hover:opacity-90
    transition-opacity
    duration-200
    active:scale-95
  `,


  // Мобильная версия
  mobileContainer: "flex md:hidden w-full p-4 items-center justify-between",
  mobileLogo: "h-10",
  mobileSchedule: "text-[clamp(11px,3vw,14px)] uppercase tracking-wider text-center mx-4",
  menuButton: "p-2 focus:outline-none flex flex-col items-center justify-center z-50",
  menuLine: "w-6 h-0.5 bg-white mb-1.5 last:mb-0 transition-all duration-300",

  // Мобильное меню
  // Мобильное меню (полноэкранное)
  mobileMenu: `
    md:hidden
    fixed
    top-0
    left-0
    right-0
    bottom-0
    bg-[#7EDAFF]
    z-50
    flex
    flex-col
    items-center
    justify-center
    space-y-8
    pt-20
    pb-10
    overflow-y-auto
  `,

  mobileMenuItem: `
    forma-textBold
    text-3xl
    text-white
    py-4
    px-8
    w-full
    text-center
    hover:bg-white/20
    active:bg-white/30
    transition-colors
    duration-300
    border-b
    border-white/10
    last:border-0
  `,
  // Кнопка закрытия меню
  closeMenuButton: `
    absolute
    top-6
    right-6
    p-2
    z-50
  `,
} as const;


export const textStylesWelcome = {
  // Мобильная версия
  mobileTitle: `
    text-white 
    font-bold 
    text-3xl 
    text-center 
    mb-8
    forma-textBold
  `,

  mobileTitleAccent: `
    text-5xl
    text-[#7EDAFF]
    forma-textBold
  `,

  mobileSubtitle: `
    text-white 
    font-bold 
    text-2xl 
    text-center 
    pt-8
    forma-textRegular
    leading-tight
  `,

  // Десктопная версия
  desktopTitle: `
    text-white 
    md:text-[#7EDAFF] 
    font-bold 
    text-[min(4.5vw,45px)] 
    leading-tight
    forma-textBold
  `,

  desktopTitleAccent: `
    text-[min(6.5vw,65px)]
    text-[#7EDAFF]
    forma-textBold
  `,

  desktopSubtitle: `
    text-white 
    md:text-[#7EDAFF] 
    font-bold 
    text-[min(4.5vw,45px)] 
    leading-tight
    forma-textRegular
  `,

  // Общие стили изображения
  pancakeImage: `
    w-[80vw] 
    max-w-[300px] 
    min-w-[180px] 
    my-4 
    object-contain
    md:w-[40vw]
    md:max-w-[500px]
  `
} as const;

export const textStylesDelivery = {
  // Общие стили
  container: "w-full mt-10 px-4 ",
  innerContainer: "flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 max-w-screen-2xl mx-auto",

  // Левый блок (сервисы доставки)
  deliveryContainer: "flex flex-col items-stretch w-full md:w-auto ",
  mobileServiceContainer: "flex justify-start pl-2 md:hidden",
  mobileServiceImage: "w-[70%] max-w-[500px]",
  desktopServiceImage: "hidden md:block w-full max-w-[468px]",

  // Правый блок (текст и изображение)
  textContainer: "flex flex-col items-center w-full md:w-auto",
  mobileText: "md:hidden text-center my-4 w-full",
  mobileTextContent: "text-[#7EDAFF] font-bold text-3xl leading-tight forma-textBold",
  desktopText: "hidden md:block text-center mt-4",
  desktopTextContent: "text-[#FD744C] font-bold text-[60px] leading-tight forma-textBold",

  // Изображения вкуса
  mobileTasteImage: "md:hidden w-[100%] mx-auto",
  desktopTasteImage: "hidden md:block w-full max-w-[960px]"
} as const;


export const cartStyles = {
  // Общие стили
  pageContainer: "max-w-4xl mx-auto p-4",
  pageTitle: "text-3xl font-bold mb-6",
  gridContainer: "grid md:grid-cols-3 gap-8",
  leftColumn: "md:col-span-2 space-y-6",
  rightColumn: "space-y-6",

  // UserInfoSection
  userInfoContainer: "bg-white p-6 rounded-lg shadow",
  sectionTitle: " text-[#39C6FF] text-[40px] font-bold mb-4",
  userInfoGrid: "grid grid-cols-1 md:grid-cols-1 gap-4",
  inputField: "forma-textBold tracking-wider w-full max-w-[300px] text-center text-white border rounded-[20px] bg-[#C9CCCD] text-[24px] pointer-events-none",

  // DeliveryTimeSection

  timeInput: `
 w-full
                                          p-2
                                          border-2
                                          border-[#7EDAFF]
                                          rounded-[20px]
                                          text-center
                                          text-[20px]
                                          focus:outline-none
                                          focus:ring-2
                                          focus:ring-[#7EDAFF]
                                          bg-[#D9D9D9]
                                          
                            `,
  timeOptionBase: `
        forma-textBold
        font-bold
        tracking-wider
        p-2
        rounded-[20px]
        text-[24px]
        font-bold
        cursor-pointer
        overflow-hidden
        relative
        select-none
        text-[#FFFFFF]
    `,
  timeOptionActive: `
        bg-[#7EDAFF]
        shadow-md
    `,
  timeOptionInactive: `
        bg-[#A5A5A5]
        hover:bg-[#929090]
    `,



  // PaymentMethodSection
  paymentOption: `
        rounded-[20px]
        text-[24px]
        font-bold
        cursor-pointer
        transition-colors
        duration-200
        text-center
        select-none
    `,
  paymentOptionBase: `
        forma-textBold
        font-bold
        tracking-wider
        rounded-[20px]
        text-[24px]
        font-bold
        cursor-pointer
        overflow-hidden
        relative
        select-none
        p-2
    `,
  paymentOptionActive: `
        bg-[#7EDAFF]
        shadow-md
    `,
  paymentOptionInactive: `
        bg-[#A5A5A5]
        hover:bg-[#929090]
    `,

  // OrderCommentSection
  textarea: `
        forma-textRegular
        tracking-wider
        w-full 
        p-4 
        border-2 
        border-[#7EDAFF]
        rounded-[20px]
        bg-white
        text-[18px]
        font-medium
        text-gray-700
        placeholder-gray-400
        focus:outline-none
        focus:ring-2
        focus:ring-[#7EDAFF]
        focus:border-transparent
        resize-none
        transition-all
        duration-200
    `,

  // CartItemsSection
  cartContainer: "bg-white p-6 rounded-lg shadow border",
  cartItem: "p-4 px-8 bg-[#7EDAFFDB] bg-opacity-[90%] rounded-[24px] relative border",
  itemContainer: "flex items-start gap-4",
  itemImage: "w-45 h-40 object-cover rounded-lg",
  itemTitle: "forma-textBold text-[30px] font-bold text-[#FFFFFF]",
  quantityControls: "flex items-center gap-2 bg-[#39C6FF] rounded-full px-3 py-1",
  quantityButton: "w-6 h-6 flex items-center justify-center text-[#FFFFFF] font-bold hover:bg-gray-100 rounded-full",
  quantityValue: "mx-2 font-medium text-[#FFFFFF]",
  itemPrice: "text-lg font-bold text-[#FFFFFF]",
  removeButton: "absolute top-3 right-3 text-gray-400 hover:text-red-500",
  totalContainer: "flex text-[#39C6FF] justify-end font-bold text-lg mt-6 pt-4 border-t border-gray-200",
  submitButton: "forma-textBold tracking-wider text-center w-full max-w-[300px] rounded-lg font-bold text-[24px]",
  activeButton: "bg-[#39C6FF] text-white hover:bg-[#2fb0e6]",
  disabledButton: "bg-gray-300 cursor-not-allowed",
  backLink: "block text-center text-[#39C6FF] hover:underline mt-4",
  emptyCartText: "py-4 text-center text-gray-500",
} as const;