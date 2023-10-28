import './App.css';
import UseReducerDemo from './lesson15-homework/useReducer';
import UseEffectDemo from './lesson15-homework/useEffect';
import UseStateDemo from './lesson15-homework/useState';
import CastomHookDemo from './lesson15-homework/customHook';

const Line = () => {
    return (
        <span style={{ width: '100%', height: 1, backgroundColor: '#fff' }} />
    );
};

export const App = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <UseEffectDemo />
            <Line />
            <UseReducerDemo />
            <Line />
            <UseStateDemo />
            <Line />
            <CastomHookDemo />
        </div>
    );
};

export default App;
