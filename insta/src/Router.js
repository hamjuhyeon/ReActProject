import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Login,
  Main,
  Signup,
  Logout,
  Profile,
  ProfileEdit,
} from "./components/pages";
import LoginCheck from "./components/organisms/LoginCheck";
import { PageHeader } from "./components/organisms";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginCheck />}>
          <Route path="/" element={<PageHeader />}>
            <Route path="/" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;