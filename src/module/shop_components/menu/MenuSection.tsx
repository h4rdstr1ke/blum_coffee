import { menuData } from "../../../mockData/menuMock"
import CategorySection from "./CategorySection"

type CategoryKeys = 1 | 2 | 3 | 4 | 5;

const categoryTitles: Record<CategoryKeys, string> = {
    1: "Японские Панкейки",
    2: "Чизкейки",
    3: "Напитки",
    4: "Моти",
    5: "Десерты"
}

const categoryDescriptions: Record<CategoryKeys, string> = {
    1: "Панкейки, тающие во рту — легкие, как утренний ветерок, с хрустящей корочкой и воздушные внутри.",
    2: "Хлопковые чизкейки — настолько нежные, что они буквально исчезают на языке, оставляя сладкое сливочное послевкусие.",
    3: "Напитки с сырной пенкой — неожиданно, волшебно, восхитительно. Это как десерт и напиток в одном глотке.",
    4: "Моти — как маленькие облачка, которые тают во рту. Успейте попробовать все вкусы!",
    5: "Мы экспериментируем, чтобы дарить вам новые вкусовые эмоции."
}

export default function MenuSection() {
    return (
        <div className="space-y-20 w-full">
            <h2 className="forma-textBold w-full text-center text-[64px] text-[#FD744C] border">МЕНЮ</h2>
            {menuData.map(category => {
                const categoryKey = category.id as CategoryKeys;
                return (
                    <CategorySection
                        key={category.id}
                        title={categoryTitles[categoryKey]}
                        description={categoryDescriptions[categoryKey]}
                        items={category.items}
                    />
                )
            })}
        </div>
    )
}