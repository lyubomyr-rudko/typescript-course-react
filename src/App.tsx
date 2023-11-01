import UsersPage from './lesson17-homework/Users-homework';
import { Provider } from 'react-redux';

import { store } from './lesson17-homework/redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <UsersPage />
        </Provider>
    );
};

export default App;
