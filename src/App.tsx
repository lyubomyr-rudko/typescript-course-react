import './App.css';
import { Users } from './lesson14/Users-homework';
import { UsersProvaider } from './lesson14/components/UsersContext/UsersContext';

export function App() {
    return (
        <UsersProvaider>
            <Users />
        </UsersProvaider>
    );
}

export default App;
