import { useState } from 'react';
import { CalculatorMode, CalculatorModes } from '../types/types';
import { ToggleSwitch } from './ToggleSwitch';

export const Calculator: React.FC = () => {
    const [mode, setMode] = useState<CalculatorMode>(CalculatorModes.CURRENCY);
    const handleModeChange = (newMode: CalculatorMode) => {
        setMode(newMode);
    };

    return (
        <div className="max-w-sm mx-auto rounded-3xl bg-gray-100 overflow-hidden shadow-sm font-inter">
            <div className="px-3 pt-6">
                <ToggleSwitch mode={mode} onSwitch={handleModeChange}/>
            </div>
            <div className="px-4 py-10">
                Calc - {mode}
            </div>
        </div>
    );
};
