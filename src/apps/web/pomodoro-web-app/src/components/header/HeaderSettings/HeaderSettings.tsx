import * as React from 'react';
import Link from 'next/link';
import {cn} from "@/libs/utils";
import { HiCog } from "react-icons/hi";

type Props = {

};

const HeaderSettings = (props: Props) => {
    return (
        <Link href={"/settings"} className={cn("flex items-center gap-2 text-gray-600")}>
            <HiCog size={24} />
            <span>Настройки</span>
        </Link>
    );
};

export default HeaderSettings;