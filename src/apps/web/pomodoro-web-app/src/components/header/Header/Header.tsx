import {cn} from "@/libs/utils";
import HeaderLogo from "@/components/header/HeaderLogo/HeaderLogo";
import HeaderStatistics from "@/components/header/HeaderStatistics/HeaderStatistics";
import HeaderSettings from "@/components/header/HeaderSettings/HeaderSettings";
import HeaderProfile from "@/components/header/HeaderProfile/HeaderProfile";

/**
 * Компонент Header — шапка веб-приложения Pomodoro, отвечает за навигационные и пользовательские функции.
 *
 * Назначение:
 * - Организация верхнего уровня интерфейса с фирменным логотипом, статистикой, настройками и профилем пользователя.
 *
 * Структура и поведение:
 * - Использует flexbox для равномерного распределения контента по горизонтали.
 * - Левая часть содержит компонент `HeaderLogo`, правая — блок с тремя основными зонами:
 *   - `HeaderStatistics` — отображение информации о прогрессе или статистике сессий;
 *   - `HeaderSettings` — доступ к пользовательским или системным настройкам;
 *   - `HeaderProfile` — информация о пользователе (аватар, имя) или действия профиля.
 *
 * Стилизация:
 * - Верхняя граница выделяется красной линией (`border-b-1 border-red-700`) для акцента.
 * - Отступы (`p-2`, `mr-5`) обеспечивают читаемость и разреженность элементов.
 * - Утилита `cn()` объединяет классы Tailwind с возможностью динамической модификации при необходимости.
 *
 * Технические детали:
 * - Полностью функциональный компонент без состояния, предназначенный для компоновки верхнего уровня UI.
 * - Использует модульную структуру: каждая часть шапки реализована отдельным компонентом для высокой модульности и повторного использования.
 *
 * Преимущества подхода:
 * - Простота расширения: можно легко добавить дополнительные секции (например, уведомления).
 * - Поддерживаемость: отдельные компоненты изолируют логику и позволяют легче тестировать/развивать отдельные части UI.
 * - Гибкость верстки благодаря Tailwind.
 *
 * Возможные улучшения:
 * - Можно добавить `position: sticky` или `fixed`, если нужно закрепить шапку при прокрутке.
 * - Динамическая подгрузка данных профиля и статистики с использованием zustand/store или React Query.
 * - Возможна интеграция адаптивного меню для мобильных устройств.
 */
const Header = () =>
{
    return (
        <header
            className={cn("top-0 w-full p-2 border-b-1 border-red-700")}
        >
            <div className={cn("flex flex-row justify-between items-center")}>
                <div>
                    <HeaderLogo />
                </div>

                <div className={cn("flex justify-items-stretch mr-5")}>
                    <div className={"mr-5"}>
                        <HeaderStatistics />
                    </div>

                    <div className={"mr-5"}>
                        <HeaderSettings />
                    </div>

                    <div>
                        <HeaderProfile />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;