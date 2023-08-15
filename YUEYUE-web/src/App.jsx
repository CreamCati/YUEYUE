import {Route, Routes} from 'react-router-dom';
import Index from './view/index/index.jsx';
import Admin from './view/admin/index.jsx';
import NotFound from "./view/NotFound/index.jsx";
import './App.css'
import Login from "./view/login/index.jsx";

const App = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
