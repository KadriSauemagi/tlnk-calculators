import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import CurrencyCalculator from './CurrencyCalc';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        USD: {EUR: 0.94},
        EUR: {USD: 1.07},
      }),
    })
  ) as jest.Mock;
});

afterEach(() => {
  (global.fetch as jest.Mock).mockClear();
});

describe('CurrencyCalculator Component', () => {
  test('renders without crashing', () => {
    render(<CurrencyCalculator/>);
    expect(screen.getByText('Loading rates')).toBeInTheDocument();
  });

  test('displays converted amount correctly', async () => {
    render(<CurrencyCalculator/>);
    await waitFor(() => {
      const sourceCurrencySelect = screen.getByTestId('source-currency') as HTMLSelectElement;
      expect(sourceCurrencySelect.value).toBe('USD');
      expect(screen.queryByText('Loading rates')).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('1'));
    fireEvent.click(screen.getByTestId('0'));

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('10.7')).toBeInTheDocument();
  });

  test('converts correctly when currencies are the same', async () => {
    render(<CurrencyCalculator/>);
    const sourceCurrencySelect = screen.getByTestId('source-currency') as HTMLSelectElement;
    await waitFor(() => {
      expect(sourceCurrencySelect.value).toBe('USD');
      expect(screen.queryByText('Loading rates')).not.toBeInTheDocument();
    })

    fireEvent.change(sourceCurrencySelect, {target: {value: 'EUR'}});
    expect(sourceCurrencySelect.value).toBe('EUR');

    fireEvent.click(screen.getByTestId('5'));

    expect(screen.getByTestId('amount').textContent).toBe('5');
    expect(screen.getByTestId('converted').textContent).toBe('5');
  });

  test('clears amount when clear button is pressed', async () => {
    render(<CurrencyCalculator/>);
    const sourceCurrencySelect = screen.getByTestId('source-currency') as HTMLSelectElement;
    await waitFor(() => {
      expect(sourceCurrencySelect.value).toBe('USD');
      expect(screen.queryByText('Loading rates')).not.toBeInTheDocument();
    })

    fireEvent.click(screen.getByTestId('1'));
    fireEvent.click(screen.getByTestId('0'));
    fireEvent.click(screen.getByTestId('clear'));

    expect(screen.getByTestId('amount').textContent).toBe('');
    expect(screen.getByTestId('converted').textContent).toBe('');
  });

  test('backspace button works correctly', async () => {
    render(<CurrencyCalculator/>);
    const sourceCurrencySelect = screen.getByTestId('source-currency') as HTMLSelectElement;
    await waitFor(() => {
      expect(sourceCurrencySelect.value).toBe('USD');
      expect(screen.queryByText('Loading rates')).not.toBeInTheDocument();
    })

    fireEvent.click(screen.getByTestId('1'));
    fireEvent.click(screen.getByTestId('0'));
    fireEvent.click(screen.getByTestId('3'));
    fireEvent.click(screen.getByTestId('backspace'));

    expect(screen.getByTestId('amount').textContent).toBe('10');
    expect(screen.getByTestId('converted').textContent).toBe('10.7');
  });

  test('reloads rates on reload button click1', async () => {
    render(<CurrencyCalculator/>);
    (global.fetch as jest.Mock).mockClear();
    fireEvent.click(screen.getByTestId('reload-rates'));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByTestId('reload-rates')).toHaveClass('animate-spin');
  });
});
