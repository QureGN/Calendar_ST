import { BrowserRouter, Route, Routes } from "react-router-dom";
import Calendar from "./components/calendar/Calendar";
import Week from "./components/week/week";
import {store} from "./components/redux/store";
import {Provider} from "react-redux";
import Notenew from "./components/Notes/newnote"
import Register from "./components/Registration/registration";
import Auth from "./components/auth/auth"
import { Logout } from "./components/auth/logout";
import EditNotes from "./components/Notes/editNote";

function App() {
  return (

    <Provider store={store}>
      <BrowserRouter basename="/">
      
        <div>

          <Routes>
            
            <Route path="/" element={<Calendar/>}/>
            <Route path="/week" element={<Week/>}/>
            <Route path="/newNote" element={<Notenew/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/auth" element={<Auth/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/editNote" element={<EditNotes/>}/>

          </Routes>
        </div>
            
          
      </BrowserRouter>

    </Provider>
    
  );
}

export default App;
