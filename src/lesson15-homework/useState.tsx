//! useState - це хук, який дозволяє компонентам React зберігати та оновлювати стани.
//! В прикладі, я використовую useState, щоб створити стан randomNamber, який представляє число, та функцію setRandomNamber,
//! яку можна використовувати для зміни значення randomNamber.

import { useState } from 'react';

const UseStateDemo = () => {
    const [randomNamber, setRandomNamber] = useState<number | null>(null);

    const handleClick = () => {
        setRandomNamber(Math.floor(Math.random() * 100 - 1));
    };

    return (
        <>
            <h2>UseStateDemo</h2>
            <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={handleClick}>Get random number</button>
                {randomNamber && <p>{randomNamber}</p>}
            </div>
        </>
    );
};
export default UseStateDemo;
