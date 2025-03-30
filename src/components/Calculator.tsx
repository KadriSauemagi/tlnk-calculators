import React from 'react';
import {useState} from 'react';
import {CalculatorMode, CalculatorModes} from '../types/types';
import {ToggleSwitch} from './ToggleSwitch';
import MathCalc from "./MathCalc";
import CurrencyCalc from "./CurrencyCalc";

export const Calculator: React.FC = () => {
    const [mode, setMode] = useState<CalculatorMode>(CalculatorModes.MATH);
    const handleModeChange = (newMode: CalculatorMode) => {
        setMode(newMode);
    };

    return (
        <div className="max-w-sm mx-auto h-[844px] flex flex-col rounded-3xl bg-gray-100 overflow-hidden drop-shadow-[0_0_35px_rgba(0,0,0,0.25)] font-inter font-light">
            <div className="px-3 pt-6">
                <ToggleSwitch mode={mode} onSwitch={handleModeChange}/>
            </div>
            <div className="grow">
                {mode === 'math' ? <MathCalc /> : <CurrencyCalc/>}
            </div>
        </div>
    );
};
