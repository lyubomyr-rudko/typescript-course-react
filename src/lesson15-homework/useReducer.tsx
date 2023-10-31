//! useReducer використовується для управління складними станами, коли потрібно
//! виконувати дії на основі дій користувача.
//! Приймає функцію reducer, яка обробляє дії, і початковий стан.
//! Коли викликається dispatch, він викликає функцію reducer, яка змінює стан.

import { useReducer } from 'react';

type TBook = {
    id: number;
    title: string;
    author: string;
    releaseYear: string;
    description: string;
};

type TBookAction =
    | { type: 'ADD_BOOK'; book: TBook }
    | { type: 'REMOVE_BOOK'; title: string };

const initialBooks: TBook[] = [
    {
        id: 1,
        title: 'Grokking Algorithms. An Illustrated Guide for Programmers and Other Curious People',
        author: 'Aditya Bhargava',
        releaseYear: '2016',
        description:
            'Grokking Algorithms is a fully illustrated, friendly guide that \
            teaches you how to apply common algorithms to the practical problems \
            you face every day as a programmer.',
    },
    {
        id: 2,
        title: 'Grokking Functional Programming',
        author: 'Aditya Bhargava',
        releaseYear: '2022',
        description:
            'There’s no need to fear going functional! This friendly, lively, and \
            engaging guide is perfect for any perplexed programmer. It lays out the \
            principles of functional programming in a simple and concise way that \
            will help you grok what FP is really all about.',
    },
];

const bookReducer = (state: TBook[], action: TBookAction) => {
    switch (action.type) {
        case 'ADD_BOOK':
            return [...state, action.book];
        case 'REMOVE_BOOK':
            return state.filter((book) => book.title !== action.title);
        default:
            return state;
    }
};

const UseReducerDemo = () => {
    const [books, dispatch] = useReducer(bookReducer, initialBooks);

    const handleAddBook = () => {
        const newBook: TBook = {
            id: books[books.length - 1].id + 1,
            title: 'The power of social Media: Media',
            author: 'Aditya Bhargava',
            releaseYear: '2022',
            description:
                'The inclusion of millions of websites, apps, and more platforms\
                 for groups to be in touch through media all over the world wide\
                  web or net nowadays, this assures us that this is undeniably \
                  the era of social media.',
        };
        dispatch({ type: 'ADD_BOOK', book: newBook });
    };

    const handleRemoveBook = (title: string) => {
        dispatch({ type: 'REMOVE_BOOK', title });
    };

    return (
        <>
            <h2>useReducer</h2>
            <div style={{ width: 800 }}>
                <button style={{ marginBottom: 12 }} onClick={handleAddBook}>
                    Додати книгу
                </button>
                <ul>
                    {books.map((book) => (
                        <li
                            style={{
                                marginBottom: 12,
                                display: 'flex',
                                gap: 8,
                            }}
                            key={book.id}
                        >
                            <button
                                onClick={() => handleRemoveBook(book.title)}
                            >
                                Видалити
                            </button>
                            <div>
                                <h2>{book.title}</h2>
                                <p>Автор: {book.author}</p>
                                <p>Дата: {book.releaseYear}</p>
                                <p>{book.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default UseReducerDemo;
