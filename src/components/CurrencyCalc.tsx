import React, {useEffect, useState} from 'react';
import Keypad from './Keypad';
import {CalculatorModes} from '../types/types';
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
    } else if (targetCurrency === sourceCurrency) {
      setConverted(amount);
    } else {
      setConverted('');
    }
  });

  const handleKeypadPress = (value: string) => {
    if (value === 'equals') return;

    else if (value === 'clear') {
      setAmount('');
      setConverted('');
      return;
    } else if (value === 'backspace') {
      setAmount(prev => prev.slice(0, -1));
      return;
    } else if (amount.length <= 10) {
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
        <div className="grow flex flex-col gap-2 p-6 justify-center">
          <div className="flex items-baseline justify-between gap-2 min-h-[38px]">
            <div className="relative w-1/2">
              <select
                id="sourceCurrency"
                value={sourceCurrency}
                onChange={e => setSourceCurrency(e.target.value)}
                className="text-xl cursor-pointer appearance-none p-2 w-full"
                data-testid="source-currency"
              >
                {Object.keys(rates).map(curr => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
              <span
                className={`${lastUpdate ? 'absolute right-1 top-1/2 -translate-1/2 ' : 'hidden'}`}>
                 &#10095;
              </span>
            </div>
            <div className="text-tlnk-blue text-3xl bg-gray-100 relative" data-testid="amount">
              {formatNumberString(amount)}
            </div>
          </div>
          <div className="flex items-baseline justify-between gap-2 min-h-[38px]">
            <div className="relative w-1/2">
              <select
                id="targetCurrency"
                value={targetCurrency}
                onChange={e => setTargetCurrency(e.target.value)}
                className="text-xl cursor-pointer appearance-none p-2 w-full"
                data-testid="target-currency"
              >
                {Object.keys(rates).map(curr => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
              <span
                className={`${lastUpdate ? 'absolute right-1 top-1/2 -translate-1/2 ' : 'hidden'}`}>
                 &#10095;
              </span>
            </div>
            <div className="text-3xl place-self-end bg-gray-100 relative" data-testid="converted">
              {formatNumberString(converted)}
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <span>{formatTimeSinceUpdate()}</span>
          <button onClick={fetchRates}
                  aria-label="Reload rates"
                  data-testid="reload-rates"
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
