import * as React from 'react';
import {cn} from "@/libs/utils";
import { HiUser } from "react-icons/hi";

type Props = {

};

const HeaderProfile = (props: Props) => {
    return (
        <div className={cn("flex items-center gap-2 text-gray-600")}>
            <HiUser size={24} />
            <span>Пользователь</span>
        </div>
    );
};

export default HeaderProfile;