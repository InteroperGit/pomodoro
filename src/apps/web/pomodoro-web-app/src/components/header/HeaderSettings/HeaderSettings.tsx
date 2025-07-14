import * as React from 'react';
import {cn} from "@/libs/utils";
import { HiCog } from "react-icons/hi";

type Props = {

};

const HeaderSettings = (props: Props) => {
    return (
        <div className={cn("flex items-center gap-2 text-gray-600")}>
            <HiCog size={24} />
            <span>Настройки</span>
        </div>
    );
};

export default HeaderSettings;