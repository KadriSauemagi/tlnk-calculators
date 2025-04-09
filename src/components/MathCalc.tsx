import {useState} from 'react';
import Keypad from './Keypad';
import {CalculatorModes} from '../types/types';
import {PiClockFill} from "react-icons/pi";

const handlePostRequest = (calculation: string) => {
  fetch('/api/history', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({calculation}),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
};


const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num === 2) return true;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const maxPrime = (a: number, b: number): number => {
  if (a >= b) return NaN;
  const start = Math.min(a, b);
  const end = Math.max(a, b);
  for (let num = end; num >= start; num--) {
    if (isPrime(num)) return num;
  }
  return NaN;
};

const MathCalc: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleCalculation = () => {
    try {
      if (displayValue.includes('P')) {
        const [a, b] = displayValue.split('P').map(Number);
        const result = maxPrime(a, b);
        setDisplayValue(String(result));
        setHistory((prev) => [...prev, `${a}P${b}=${result}`]);
        handlePostRequest(`${a}P${b}=${result}`);
        return;
      }
      let result;
      if (/\/0$/.test(displayValue)) {
        result = '∞';
      } else {
        result = eval(displayValue.replace('÷', '/').replace('×', '*'));
      }

      setDisplayValue(String(result));
      setHistory((prev) => [...prev, `${displayValue}=${result}`]);
      handlePostRequest(`${displayValue}=${result}`);
    } catch (error) {
      console.log('error', error)
      setDisplayValue('NaN');
    }
  };

  const [resetAfterEquals, setResetAfterEquals] = useState(false);

  const handleKeypadPress = (value: string) => {
    if (resetAfterEquals) {
      setDisplayValue('');
      setResetAfterEquals(false);
    }

    if (displayValue.length > 10) return;

    switch (value) {
      case 'clear':
        setDisplayValue('');
        break;
      case 'backspace':
        setDisplayValue((prev) => prev.slice(0, -1));
        break;
      case 'equals':
        handleCalculation();
        setResetAfterEquals(true);
        break;
      default:
        setDisplayValue((prev) => (prev.length < 10 ? prev + value : prev));
        break;
    }
  };

  const handleGetRequest = () => {
    fetch('/api/history')
      .then((response) => response.json())
      .then((data) => {
        const formattedHistory = data.records.map((item: {
          calculation: string
        }) => item.calculation);
        setHistory(formattedHistory);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col text-right h-full">
      <div className="grow flex flex-col px-4 justify-end">
        <div className="my-4">
          {history.map((entry, index) => (
            <p key={index}>{entry}</p>
          ))}
        </div>
        <div className="text-3xl" data-testid="result">{displayValue || '0'}</div>
        <div className="text-left">
          <button
            className="text-4xl text-white cursor-pointer hover:drop-shadow-md focus:drop-shadow-md"
            onClick={() => handleGetRequest()}><PiClockFill/></button>
        </div>
      </div>
      <Keypad variant={CalculatorModes.MATH} onKeyPress={handleKeypadPress}/>
    </div>
  );
};

export default MathCalc;
