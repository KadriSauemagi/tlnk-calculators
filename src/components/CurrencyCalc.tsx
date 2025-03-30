import React, { useEffect, useState } from 'react';
import Keypad from './Keypad';
import { CalculatorModes } from '../types/types';
import formatNumberString from "../utils/formatNumber";

interface Rates {
  [key: string]: {
    [key: string]: number;
  };
}

const CurrencyCalculator: React.FC = () => {
  const [rates, setRates] = useState<Rates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [sourceCurrency, setSourceCurrency] = useState<string>('USD');
  const [targetCurrency, setTargetCurrency] = useState<string>('EUR');
  const [amount, setAmount] = useState<string>('');
  const [converted, setConverted] = useState<string>('');

  const fetchRates = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/rates');
      const data = await response.json();
      setRates(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Error fetching rates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    if (amount !== '' && rates?.[targetCurrency]?.[sourceCurrency]) {
      const conversionRate = rates?.[targetCurrency]?.[sourceCurrency];
      const result = parseFloat(amount) * conversionRate;
      setConverted(result.toFixed(2));
    } else if (targetCurrency === sourceCurrency ) {
      setConverted(amount);
    } else {
      setConverted('');
    }
  }, [amount, sourceCurrency, targetCurrency, rates]);

  const handleKeypadPress = (value: string) => {
    if (amount.length > 10) return;
    if (value === 'clear') {
      setAmount('');
      setConverted('');
    } else if (value === 'backspace') {
      setAmount(prev => prev.slice(0, -1));
    } else {
      setAmount(prev => prev + value);
    }
  };

  const formatTimeSinceUpdate = () => {
    if (!lastUpdate) return 'Loading rates';
    const seconds = Math.floor((new Date().getTime() - lastUpdate.getTime()) / 1000);

    if (seconds < 60) return `Last Updated ${seconds} sec ago`;
    if (seconds < 3600) return `Last Updated ${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `Last Updated ${Math.floor(seconds / 3600)} hour${seconds >= 7200 ? 's' : ''} ago`;
    return `Last Updated ${Math.floor(seconds / 86400)} day${seconds >= 172800 ? 's' : ''} ago`;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="grow flex flex-col h-full">
      <div className="grow flex flex-col gap-6 p-6 justify-center">
        <div className="grid grid-cols-2 items-center gap-2 min-h-[38px]">
          <select
            id="sourceCurrency"
            value={sourceCurrency}
            onChange={e => setSourceCurrency(e.target.value)}
            className="text-xl cursor-pointer"
          >
            {Object.keys(rates).map(curr => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
          <div className="text-tlnk-blue text-3xl place-self-end">{formatNumberString(amount)}</div>
        </div>
        <div className="grid grid-cols-2 gap-2 min-h-[38px]">
          <select
            id="targetCurrency"
            value={targetCurrency}
            onChange={e => setTargetCurrency(e.target.value)}
            className="text-xl cursor-pointer"
          >
            {Object.keys(rates).map(curr => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
          <div className="text-3xl place-self-end">{formatNumberString(converted)}</div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        <span>{formatTimeSinceUpdate()}</span>
        <button onClick={fetchRates} aria-label="Reload rates"
                className={`text-lg m-2 cursor-pointer ${loading ? 'animate-spin' : ''}`}>
          &#x21BB;
        </button>
      </div>
    </div>
      <Keypad variant={CalculatorModes.CURRENCY} onKeyPress={handleKeypadPress}/>
    </div>
  );
};

export default CurrencyCalculator;
