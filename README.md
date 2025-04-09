# 🧮 Calculator
- The "React Calculator" supports two modes: math and currency. The math mode is opened by default.

## ➗ Math
- Users can enter up to 10 digits for numbers (both integers and foats) by clicking on the pad or hitting numbers on the keyboard.
- Five operations are supported: addition, subtraction, division, multiplication, and "Max Prime Number" operation ("P" button). 
- "C" button resets the input to "0" and resets current operation, .
- Backspace button resets the latest input or operation.
- Each operation `POST` its operands, operation, and result to `/api/history` (MirageJS).
- If operation is imposible, result shown is NaN.


## 💸 Currency
- Currency rates are available at `/api/rates` (MirageJS).
- Users can choose both currencies, which are native Select elements.
- Users can enter a value for the first currency, and the second currency is calculated based on the rates upon each change (value for the first currency or any currency).
- Rates are downloaded upon each tab opening, and users can see how much time has passed since the last update and force an update by clicking the "reload" icon.

## 👩‍💻 Development
- Dev mode `npm run dev` 
- Build `npm run build` and `npm run preview`
- Tests `npm run test`

