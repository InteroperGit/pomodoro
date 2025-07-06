import {cn} from "@/libs/utils";

export default function Header() {
    return (
        <header
            className={cn("top-0 w-full border-1 border-blue-800 p-10")}
        >
            <div className={cn("h-10")}>
                Header
            </div>

        </header>
    );
}