"use client"

import * as React from 'react';
import Link from 'next/link';
import {cn} from "@/libs/utils";
import { HiCog } from "react-icons/hi";
import {usePathname} from "next/navigation";

type Props = {

};

const HeaderSettings = (props: Props) => {
    const pathname = usePathname();
    const isActive = pathname === '/settings';

    return (
        <Link href={"/settings"} className={cn("flex items-center gap-2",
                isActive ? 'text-gray-900' : 'text-gray-600')}>
            <HiCog size={24} />
            <span className={cn(isActive ? 'border-b-1 border-b-[#800020]' : "")}>Настройки</span>
        </Link>
    );
};

export default HeaderSettings;