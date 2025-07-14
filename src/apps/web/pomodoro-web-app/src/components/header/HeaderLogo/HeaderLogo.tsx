import * as React from 'react';
import {cn} from "@/libs/utils";
import PomodoroLogo from "@/components/images/PomodoroLogo/PomodoroLogo";

type Props = {
    
};

const HeaderLogo = (props: Props) => {
    return (
        <div className={cn("flex flex-row gap-2 justify-center items-center")}>
            <PomodoroLogo />
            <p>Pomodoro</p>
        </div>
    );
};

export default HeaderLogo;