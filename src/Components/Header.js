import React, { useState, useEffect } from 'react';
import './HeaderStyle.css';
import { Link } from 'react-router-dom';

function Header({ handleLogout }) {
  const [lettuceValue, setLettuceValue] = useState(0);
  const [baconValue, setBaconValue] = useState(0);
  const [cheeseValue, setCheeseValue] = useState(0);
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOrderEnabled, setIsOrderEnabled] = useState(false);
  const [orderSummary, setOrderSummary] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);
  const [isOrderButtonEnabled, setIsOrderButtonEnabled] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    setUsername(savedUsername);
    const isLoggedIn = savedUsername !== null;
    setIsLoggedIn(isLoggedIn);
    setIsOrderButtonEnabled(isLoggedIn);
  }, []);

  useEffect(() => {
    setIsOrderEnabled(lettuceValue >= 1 || baconValue >= 1 || cheeseValue >= 1);
  }, [lettuceValue, baconValue, cheeseValue]);

  const calculateTotalPrice = () => {
    const lettucePrice = 0.5;
    const baconPrice = 1.0;
    const cheesePrice = 0.5;

    return (
      lettuceValue * lettucePrice +
      baconValue * baconPrice +
      cheeseValue * cheesePrice
    ).toFixed(2);
  };

  const handleLogoutClick = () => {
    handleLogout();
  };

  const handleOrderClick = () => {
    const summary = `You have ordered: ${lettuceValue} lettuce, ${baconValue} bacon, ${cheeseValue} cheese. Total price: $${calculateTotalPrice()}`;
    setOrderSummary(summary);
    setShowReceipt(true);
  };

  const handleReceiptClose = () => {
    setShowReceipt(false);
  };

  const Receipt = () => {
    return (
      <div className="receipt">
        <h2>Order Receipt</h2>
        <p>{orderSummary}</p>
        <button onClick={handleReceiptClose}>Close</button>
      </div>
    );
  };

  return (
    <div>
      <header className='header'>
        <div className='img'>
          <img src='burger.jpg' alt='myburger' />
        </div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/Header" aria-current="true">Builder Burger</Link>
            </li>
            <li>
              {isLoggedIn ? (
                <>
                  <Link className='Button' onClick={handleLogoutClick}>Logout</Link>
                  {/* <p>Welcome, {username}</p> */}
                </>
              ) : (
                <Link to="/Login">Login</Link>
              )}
            </li>
            <li>
              {isOrderButtonEnabled && (
                <button className='Buttons' disabled={!isOrderEnabled} onClick={handleOrderClick}>
                  Order Now
                </button>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <main className='LayoutC'>
        <div className='buildControl'>
          <p>
            Current price:
            <strong>
              ${calculateTotalPrice()}
            </strong>
          </p>
          <div className='buildControlB'>
            <div className='buildControlL'>Lettuce</div>
            <button
              className='buildControlD'
              onClick={() => setLettuceValue(lettuceValue - 1)}
              disabled={lettuceValue === 0}
            >
              Less
            </button>
            <button
              className='buildControlM'
              onClick={() => setLettuceValue(lettuceValue + 1)}
            >
              More
            </button>
          </div>
          <div className='buildControlB'>
            <div className='buildControlL'>Bacon</div>
            <button
              className='buildControlD'
              onClick={() => setBaconValue(baconValue - 1)}
              disabled={baconValue === 0}
            >
              Less
            </button>
            <button
              className='buildControlM'
              onClick={() => setBaconValue(baconValue + 1)}
            >
              More
            </button>
          </div>
          <div className='buildControlB'>
            <div className='buildControlL'>Cheese</div>
            <button
              className='buildControlD'
              onClick={() => setCheeseValue(cheeseValue - 1)}
              disabled={cheeseValue === 0}
            >
              Less
            </button>
            <button
              className='buildControlM'
              onClick={() => setCheeseValue(cheeseValue + 1)}
            >
              More
            </button>
          </div>
          {isLoggedIn ? (
            <>
              <button className='Buttons' disabled={!isOrderEnabled} onClick={handleOrderClick}>
                Order Now
              </button>
              {showReceipt && <Receipt />}
            </>
          ) : (
            <Link className='Buttons' to="/Login">Login to Order</Link>
          )}
          <p>Total price: ${calculateTotalPrice()}</p>
        </div>
      </main>
    </div>
  );
}

export default Header;
