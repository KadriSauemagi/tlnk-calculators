import React, {FC, useEffect} from 'react';
import {CalculatorMode, CalculatorModes} from '../types/types';

interface KeypadProps {
    variant: CalculatorMode;
    onKeyPress: (value: string) => void;
}

const Keypad: FC<KeypadProps> = ({variant, onKeyPress}) => {
    const handleButtonClick = (value: string) => {
        onKeyPress(value);
    };

    const handleKeyDown = (event: KeyboardEvent | globalThis.KeyboardEvent) => {
        const {key} = event;
        const validDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const validOperators = ['+', '-', '*', '/', 'x', 'X', '÷', '.'];

        if (validDigits.includes(key)) {
            onKeyPress(key);
        } else if (validOperators.includes(key)) {
            if (key === 'x' || key === 'X') {
                onKeyPress('*');
            } else if (key === '÷') {
                onKeyPress('/');
            } else {
                onKeyPress(key);
            }
        } else if (key === 'Backspace') {
            onKeyPress('backspace');
        } else if (key === 'Enter') {
            onKeyPress('equals');
        } else if (key === 'Escape') {
            onKeyPress('clear');
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    const mathLayout = [
        {label: 'C', value: 'clear', classes: 'text-tlnk-red'},
        {label: '⌫', value: 'backspace', classes: 'text-tlnk-blue'},
        {label: 'P', value: 'P', classes: 'text-tlnk-blue'},
        {label: '÷', value: '/', classes: 'text-tlnk-blue'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '×', value: '*', classes: 'text-tlnk-blue'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '+', value: '+', classes: 'text-tlnk-blue'},
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '-', value: '-', classes: 'text-tlnk-blue'},
        {label: '0', value: '0'},
        {label: '.', value: '.'},
        {label: '=', value: 'equals', classes: 'bg-tlnk-green col-span-2 mx-6'},
    ];

    const currencyLayout = [
        {label: 'C', value: 'clear', classes: 'text-tlnk-red'},
        {label: '⌫', value: 'backspace', classes: 'text-tlnk-blue col-span-2 max-w-1/2'},
        {label: '7', value: '7'},
        {label: '8', value: '8'},
        {label: '9', value: '9'},
        {label: '4', value: '4'},
        {label: '5', value: '5'},
        {label: '6', value: '6'},
        {label: '1', value: '1'},
        {label: '2', value: '2'},
        {label: '3', value: '3'},
        {label: '00', value: '00'},
        {label: '0', value: '0'},
        {label: '.', value: '.'},
    ];

    const buttons = variant === CalculatorModes.MATH ? mathLayout : currencyLayout;
    const gridClasses =
        variant === CalculatorModes.MATH
            ? 'grid grid-cols-4 gap-3 px-3'
            : 'grid grid-cols-3 gap-3 px-3 max-w-3/4';

    return (
        <div className="w-full bg-white py-12 rounded-t-3xl">
            <div className={gridClasses}>
                {buttons.map((btn) => (
                    <button
                        key={btn.label}
                        type="button"
                        className={`cursor-pointer rounded p-4 text-center text-4xl
                        active:bg-gray-100 hover:bg-gray-100
                        ${btn.classes ?? ''}`}
                        onClick={() => handleButtonClick(btn.value)}
                    >
                        {btn.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Keypad;
