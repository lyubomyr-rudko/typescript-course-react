//! Кастомний хук useLocalStorage отримує 2 аргумента від компонента: ключ key та значення initialValue.
//! Він зберігає в локальному сховищу значення по вказаному ключі та віддає його компоненту

import { useState, useEffect } from 'react';

function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T) => void] {
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    const [value, setValue] = useState<T>(initial);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

const CastomHookDemo = () => {
    const [name, setName] = useLocalStorage<string>('name', 'Guest');

    return (
        <>
            <h2>CastomHookDemo</h2>
            <div>
                <p>Hallo, {name}!</p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
        </>
    );
};

export default CastomHookDemo;
