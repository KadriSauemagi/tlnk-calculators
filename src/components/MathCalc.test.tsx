import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import MathCalc from './MathCalc';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({records: [{calculation: '1+1=2'}]}),
    })
  ) as jest.Mock;
});

afterEach(() => {
  (global.fetch as jest.Mock).mockClear();
});

describe('MathCalc Component', () => {

  test('renders without crashing', () => {
    render(<MathCalc/>);
    expect(screen.getByTestId('result').textContent).toBe('0');
  });

  test('displays calculated addition result', () => {
    render(<MathCalc/>);
    fireEvent.click(screen.getByTestId('1'));
    fireEvent.click(screen.getByTestId('+'));
    fireEvent.click(screen.getByTestId('1'));
    fireEvent.click(screen.getByTestId('equals'));
    expect(screen.getByTestId('result').textContent).toBe('2');
  });

  test('displays calculated subtraction result', () => {
    render(<MathCalc/>);
    fireEvent.click(screen.getByTestId('5'));
    fireEvent.click(screen.getByTestId('-'));
    fireEvent.click(screen.getByTestId('2'));
    fireEvent.click(screen.getByTestId('equals'));
    expect(screen.getByTestId('result').textContent).toBe('3');
  });

  test('displays calculated multiplication result', () => {
    render(<MathCalc/>);
    fireEvent.click(screen.getByTestId('5'));
    fireEvent.click(screen.getByTestId('*'));
    fireEvent.click(screen.getByTestId('3'));
    fireEvent.click(screen.getByTestId('equals'));
    expect(screen.getByTestId('result').textContent).toBe('15');
  });

  test('displays calculated division result', () => {
    render(<MathCalc/>);
    fireEvent.click(screen.getByTestId('8'));
    fireEvent.click(screen.getByTestId('/'));
    fireEvent.click(screen.getByTestId('2'));
    fireEvent.click(screen.getByTestId('equals'));
    expect(screen.getByTestId('result').textContent).toBe('4');
  });

  test('handles division by zero', () => {
    render(<MathCalc/>);
    fireEvent.click(screen.getByTestId('1'));
    fireEvent.click(screen.getByTestId('/'));
    fireEvent.click(screen.getByTestId('0'));
    fireEvent.click(screen.getByTestId('equals'));
    expect(screen.getByTestId('result').textContent).toBe('∞');
  });

  test('handles prime number calculation', () => {
    render(<MathCalc/>);
    fireEvent.click(screen.getByTestId('5'));
    fireEvent.click(screen.getByTestId('P'));
    fireEvent.click(screen.getByTestId('9'));
    fireEvent.click(screen.getByTestId('equals'));
    expect(screen.getByTestId('result').textContent).toBe('7');
  });

  test('backspace works correctly', () => {
    render(<MathCalc/>);
    fireEvent.click(screen.getByTestId('1'));
    fireEvent.click(screen.getByTestId('2'));
    fireEvent.click(screen.getByTestId('3'));
    fireEvent.click(screen.getByTestId('backspace'));
    expect(screen.getByTestId('result').textContent).toBe('12');
  });

  test('clears display on clear button click', () => {
    render(<MathCalc/>);
    fireEvent.click(screen.getByTestId('2'));
    fireEvent.click(screen.getByTestId('clear'));
    expect(screen.getByTestId('result').textContent).toBe('0');
  });
});
