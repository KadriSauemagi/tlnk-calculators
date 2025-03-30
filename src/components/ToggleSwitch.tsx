import * as React from 'react';
import { CalculatorMode, CalculatorModes } from '../types/types';

interface ToggleSwitchProps {
  mode: CalculatorMode;
  onSwitch: (mode: CalculatorMode) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ mode, onSwitch }) => {
  const getButtonClasses = (buttonMode: CalculatorMode) =>
    `cursor-pointer ${
      mode === buttonMode ? 'text-tlnk-blue border-b border-tlnk-blue' : 'hover:text-tlnk-blue'
    }`;

  return (
    <div className="flex gap-3 justify-center">
      <button
        className={getButtonClasses(CalculatorModes.MATH)}
        onClick={() => onSwitch(CalculatorModes.MATH)}
        aria-pressed={mode === CalculatorModes.MATH}
      >
        Calculator
      </button>
      <div className="border-l"></div>
      <button
        className={getButtonClasses(CalculatorModes.CURRENCY)}
        onClick={() => onSwitch(CalculatorModes.CURRENCY)}
        aria-pressed={mode === CalculatorModes.CURRENCY}
      >
        Exchange Rate
      </button>
    </div>
  );
};
