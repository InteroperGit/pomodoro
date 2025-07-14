import * as React from 'react';
import {cn} from "@/libs/utils";
import { HiChartBar } from "react-icons/hi";

type Props = {

};

const HeaderStatistics = (props: Props) => {
    return (
        <div className={cn("flex items-center gap-2 text-gray-600")}>
            <HiChartBar size={24} />
            <span>Статистика</span>
        </div>
    );
};

export default HeaderStatistics;