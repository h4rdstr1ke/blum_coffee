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
  buttonPrimary: "tracking-widest text-lg md:text-2xl font-bold text-white",

  // Основной текст
  body: "forma-textRegular md:text-lg",
} as const;

export const textStylesGuest = {
  // Заголовок
  title: "text-[#39C6FF] text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-10 text-left",

  // Поля ввода
  input: `
    forma-TextBold w-full p-1 border-none rounded-[24px] caret-transparent 
    focus:outline-none focus:ring-2 focus:border-none focus:ring-[#7EDAFF]
    bg-[#C9CCCD] text-center
    disabled:bg-gray-100 disabled:cursor-default
    forma-TextMedium tracking-wide text-[#FFFFFF] text-base text-[24px]
  `,

  /* Кнопки
  buttonEdit: "bg-[#6ec9ff] hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-lg",
  buttonSave: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg text-lg",
  buttonCancel: "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg text-lg",
  */
  // Текст
  label: "font-bold text-white",
  loadingText: "text-center py-8",

  infoField: "border-b border-gray-200 py-4 flex justify-between",
  infoLabel: "font-medium text-gray-600",

  error: "border"
} as const;

export const textStylesShop = {
  // Заголовки секций
  sectionTitle: "forma-textRegular text-center text-[#7EDAFF] text-2xl md:text-[43px] font-bold",
  sectionDescription: "forma-textMedium tracking-wide leading-normal text-center text-white text-[25px] md:text-[35px] font-bold mb-6 bg-[#7EDAFFDB] rounded-[50px] mx-auto max-w-[1200px] px-4 pb-4 pt-4",

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
    title: "forma-textMedium text-[#FFFFFF] text-bold text-[28px] md:text-[28px]  mb-1 md:mb-2",
    price: "forma-textMedium text-[#FFFFFF] text-[28px] md:text-[28px] absolute -top-12 md:-top-12 right-4 md:right-0 text-lg font-bold",
    addButton: "forma-textMedium text-[#FFFFFF] bg-[#39C6FF] text-[24px] md:text-[24px] px-5 md:px-6 rounded-lg md:rounded-xl flex "
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
  scheduleTime: "forma-textRegular text-[clamp(12px,1.8vw,20px)] text-center",
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
  mobileSchedule: "forma-textBold text-[clamp(11px,3vw,14px)] uppercase tracking-wider text-center mx-4",
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
  orderTitle: "text-red"
} as const;

export const textStylesHeaderModal = {
  overlay: "fixed inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center z-50",
  modalContainer: "bg-white p-6 rounded-lg max-w-sm w-full",
  modalTitle: "text-xl font-bold text-[#39C6FF] mb-4",
  buttonContainer: "flex justify-end space-x-3 mt-4",
  cancelButton: `
    px-4 py-2 text-gray-600 hover:text-gray-800 
    transition-colors rounded-lg border border-gray-300
    hover:bg-gray-100
  `,
  confirmButton: `
    px-4 py-2 bg-red-500 text-white rounded-lg
    hover:bg-red-600 transition-colors
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
  mobileText: "md:hidden text-center my-10 w-full",
  mobileTextContent: "text-[#7EDAFF] font-bold text-[30px] leading-tight forma-textBold",
  desktopText: "hidden md:block text-center mt-4 tracking-wider",
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
  inputField: "forma-textBold tracking-wider w-full max-w-[300px] text-center text-white border rounded-[20px] bg-[#C9CCCD] text-[24px] pointer-events-none bg-[#C9CCCD]",

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
  cartContainer: "bg-white p-6 rounded-lg shadow mt-10",
  cartItem: "p-4 px-8 bg-[#7EDAFFDB] bg-opacity-[90%] rounded-[24px] relative ",
  itemContainer: "flex items-start gap-4",
  itemImage: "w-45 h-40 object-cover rounded-lg",
  itemTitle: "forma-textBold text-[30px] font-bold text-[#FFFFFF]",
  quantityControls: "flex items-center gap-2 bg-[#39C6FF] rounded-full px-3 py-1",
  quantityButton: "w-6 h-6 flex items-center justify-center text-[#FFFFFF] font-bold hover:bg-gray-100 rounded-full",
  quantityValue: "mx-2 font-medium text-[#FFFFFF]",
  itemPrice: "text-lg font-bold text-[#FFFFFF]",
  removeButton: "absolute top-3 right-3 text-gray-400 hover:text-red-500",
  totalContainer: "flex text-[#39C6FF] justify-end font-bold text-lg mt-6 pt-4 border-t border-gray-200",
  submitButton: "forma-textBold tracking-wider text-center w-full max-w-[300px] rounded-[30px] font-bold text-[24px]",
  activeButton: "bg-[#39C6FF] text-white hover:bg-[#2fb0e6]",
  disabledButton: "bg-gray-300 cursor-not-allowed",
  backLink: "block text-center text-[#39C6FF] hover:underline mt-4",
  emptyCartText: "py-4 text-center text-gray-500",
} as const;

export const textStylesReg = {
  // Общие стили страницы
  pageContainer: "min-h-screen flex items-center justify-center bg-[#7EDAFF] p-4",
  formContainer: "bg-white p-8 rounded-3xl shadow-lg w-full max-w-md",
  title: "text-3xl font-bold text-center mb-6 text-[#39C6FF]",

  // Стили для ошибок
  errorContainer: "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4",

  // Стили для полей ввода
  inputLabel: "block text-sm font-medium text-gray-700 mb-1",
  inputField: `
    w-full p-3 border-2 border-[#7EDAFF] rounded-xl
    focus:outline-none focus:ring-2 focus:ring-[#39C6FF]
    text-gray-800 text-lg
    transition-all duration-200
  `,
  inputError: "border-red-500 focus:ring-red-500",

  // Стили для кнопок
  primaryButton: `
    w-full bg-[#39C6FF] text-white py-3 px-4 rounded-xl
    hover:bg-[#2fb0e6] focus:outline-none focus:ring-2 focus:ring-[#39C6FF]
    disabled:opacity-50 disabled:cursor-not-allowed
    font-bold text-lg
    transition-all duration-200
  `,
  secondaryButton: `
    w-full text-[#39C6FF] hover:text-[#2fb0e6] text-sm
    focus:outline-none
    transition-colors duration-200
  `,

  // Стили для переключения режимов
  modeSwitchContainer: "flex justify-center space-x-4 mt-6",
  modeButton: (active: boolean) => `
    text-sm ${active ? 'text-[#39C6FF] font-bold' : 'text-gray-600 hover:text-[#39C6FF]'}
    transition-colors duration-200
  `,

  // Стили для сообщения о коде
  codeSentMessage: "text-sm text-gray-600 mb-2",
} as const;


export const textStylesEmployeeOrders = {
  // Общие стили
  pageContainer: "max-w-6xl mx-auto p-4 md:p-6",
  pageTitle: "text-3xl md:text-4xl font-bold mb-8 text-[#39C6FF] forma-textBold tracking-wider text-center",
  errorContainer: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 forma-textRegular",
  loadingText: "text-center py-12 text-[#39C6FF] text-xl forma-textRegular",
  emptyText: "text-center text-[#39C6FF] text-xl py-12 forma-textRegular",

  // Карточка заказа
  orderCard: "     rounded-2xl p-5 md:p-6 shadow-md bg-white mb-6",
  orderHeader: "flex flex-col md:flex-row md:justify-between gap-4 pb-4",
  orderTitle: "text-xl md:text-2xl font-bold text-[#39C6FF] mb-2 forma-textBold",
  orderMeta: "grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:text-base forma-textRegular",
  orderMetaLabel: "text-gray-500 forma-textRegular tracking-wider",
  orderMetaValue: "text-gray-800 forma-textRegular tracking-wider",
  orderStatus: (status: string) => `
    px-3 py-1 text-center rounded-full text-sm font-medium forma-textBold
    ${status === "Готовится" ? 'bg-blue-100 text-blue-800' :
      status === "Завершен" ? 'bg-green-100 text-green-800' :
        'bg-red-100 text-red-800'}
  `,
  orderComment: "text-gray-600 italic mt-2 text-sm forma-textRegular tracking-wider",

  // Кнопки управления
  actionButtons: "flex flex-col sm:flex-row gap-2 mt-4 md:mt-0 md:ml-4",
  completeButton: `
    px-5 py-2 bg-[#39C6FF] text-white rounded-xl hover:bg-[#39dbff]
    transition-colors duration-200 font-medium flex items-center justify-center
    gap-2 min-w-[120px] forma-textBold
  `,
  cancelButton: `
    px-5 py-2 bg-[#A5A5A5] text-white rounded-xl hover:bg-[#c2c2c2]
    transition-colors duration-200 font-medium flex items-center justify-center
    gap-2 min-w-[120px] forma-textBold
  `,

  // Состав заказа
  orderItems: "mt-4",
  itemsTitle: "font-bold text-lg text-[#39C6FF] mb-3 forma-textBold",
  itemsHeader: "grid grid-cols-12 gap-4 py-2 font-medium text-gray-500 text-sm forma-textBold",
  itemContainer: `
    grid grid-cols-12 gap-4 py-3 items-center last:border-b-0
    hover:bg-gray-50 rounded-lg px-2 transition-colors
  `,
  itemImage: "w-12 h-12 object-cover rounded-lg col-span-1",
  itemName: "text-gray-800 font-medium col-span-6 md:col-span-5 forma-textRegular",
  itemQuantity: "text-gray-600 text-center col-span-2 md:col-span-1 forma-textRegular",
  itemPrice: "text-gray-800 font-medium text-right col-span-3 md:col-span-2 forma-textRegular",
  itemTotal: "font-bold text-[#39C6FF] text-right col-span-3 forma-textBold",

  // Итого
  orderTotal: "flex justify-between items-center mt-4 pt-4",
  totalLabel: "font-bold text-lg forma-textBold",
  totalPrice: "font-bold text-2xl text-[#39C6FF] forma-textBold tracking-wider",

  // Кнопка выхода
  logoutButton: "mt-8 flex justify-center"
} as const;

export const textStylesPanel = {
  container: "p-4 max-w-6xl mx-auto bg-gray-50 rounded-lg shadow-sm",
  title: "text-3xl font-bold mb-8 text-[#39C6FF]",
  section: "mb-8 p-6 bg-white rounded-lg shadow",
  sectionTitle: "text-2xl font-semibold mb-6 text-[#39C6FF]",

  // Формы
  input: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39C6FF] focus:border-transparent",
  inputLabel: "block mb-2 text-sm font-medium text-gray-700",
  textarea: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39C6FF] focus:border-transparent",
  select: "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#39C6FF] focus:border-transparent",

  // Кнопки
  primaryButton: "px-6 py-3 bg-[#39C6FF] text-white rounded-lg hover:bg-[#2FB0E0] transition-colors",
  secondaryButton: "px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors",
  dangerButton: "px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors",
  successButton: "px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors",

  // Карточки
  categoryCard: `
    p-4 bg-white rounded-lg border border-gray-200 
    hover:shadow-md transition-shadow
    flex flex-col
  `,
  categoryHeader: `
    flex justify-between items-start mb-2
  `,
  categoryName: `
    font-semibold text-lg text-gray-800
  `,
  categoryDescription: `
    text-sm text-gray-600 mt-2 p-3 bg-gray-50 rounded
    transition-all duration-200 cursor-pointer
    hover:bg-gray-100
  `,
  categoryDescriptionCollapsed: `
    max-h-20 overflow-hidden
  `,
  categoryDescriptionExpanded: `
    max-h-none
  `,
  editDescriptionInput: `
    w-full p-2 border border-gray-300 rounded
    focus:ring-2 focus:ring-[#39C6FF] focus:border-transparent
  `,
  editButtons: `
    flex gap-2 mt-2 justify-end
  `,
  saveButton: `
    px-3 py-1 bg-green-500 text-white rounded text-sm
    hover:bg-green-600
  `,
  cancelButton: `
    px-3 py-1 bg-gray-500 text-white rounded text-sm
    hover:bg-gray-600
  `,
  editButton: `
    text-blue-600 hover:text-blue-800 p-1
    hover:bg-blue-100 rounded-full text-sm
  `,
  deleteButton: `
    text-red-600 hover:text-red-800 p-1
    hover:bg-red-100 rounded-full
  `,
  actionButtons: `
    flex gap-1
  `,
  productCard: "border rounded-lg p-4 hover:shadow-md transition-shadow bg-white",
  productTitle: "font-semibold text-lg text-gray-800",
  productPrice: "text-blue-600 font-bold",
  productMeta: "text-sm text-gray-500",

  // Ингредиенты
  ingredientItem: "flex items-center justify-between p-3 bg-gray-50 rounded border",
  ingredientName: "font-medium text-gray-800",
  ingredientQuantity: "ml-2 text-gray-600",

  // Сетки
  gridCols1: "grid grid-cols-1 gap-4",
  gridCols2: "grid grid-cols-1 md:grid-cols-2 gap-4",
  gridCols3: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",

  // Разное
  divider: "my-6 border-t border-gray-200",
  errorText: "text-red-600 text-sm",
  successText: "text-green-600 text-sm"
};