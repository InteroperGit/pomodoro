import {cn} from "@/libs/utils";
import HeaderLogo from "@/components/header/HeaderLogo/HeaderLogo";
import HeaderStatistics from "@/components/header/HeaderStatistics/HeaderStatistics";
import HeaderSettings from "@/components/header/HeaderSettings/HeaderSettings";
import HeaderProfile from "@/components/header/HeaderProfile/HeaderProfile";

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