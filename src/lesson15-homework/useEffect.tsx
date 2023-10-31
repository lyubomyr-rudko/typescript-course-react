//! useEffect - це хук, який дозволяє виконувати певний код
//! після того, як компонент був відображений на сторінці та
//! відслідковувати зміни вказаних залежностей.
//! Він виконує роль житєвого цикла компонента.
//! У цьому прикладі, я використовую useEffect,
//! щоб створити таймер, який оновлює стан seconds кожну секунду
//! і припиняє роботу setInterval, якщо компонент розмонтовується.

import { useState, useEffect } from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState<number>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(seconds + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [seconds]);

    return <p>Time: {seconds} sec</p>;
};

const UseEffectDemo = () => {
    const [isTimerShow, setIsTimerShow] = useState(true);

    const handleTimerToggle = () => {
        setIsTimerShow(!isTimerShow);
    };

    return (
        <>
            <h2>useEffect</h2>
            <div>
                <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={handleTimerToggle}>
                        {isTimerShow ? 'Close timer' : 'Show timer'}
                    </button>
                    {isTimerShow && <Timer />}
                </div>
            </div>
        </>
    );
};

export default UseEffectDemo;
