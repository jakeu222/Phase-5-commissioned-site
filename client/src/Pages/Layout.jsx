import { Outlet } from 'react-router-dom';
import NavBar from './Navbar';



export default function RootLayout() {
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}