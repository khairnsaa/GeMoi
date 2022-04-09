import './App.css';
import LogoutComponent from './components/Logout';
import { UserProvider } from './context/UserContext';

// Import Component
import Routes from './Routes';

function App() {
  return (
    <div className="App">
        <UserProvider>
            <Routes />
			{/* <LogoutComponent /> */}
        </UserProvider>
    </div>
  );
}

export default App;
