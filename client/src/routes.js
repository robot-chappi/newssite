import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Admin } from "./pages/admin";
import { Auth } from "./pages/auth";
import { Donation } from "./pages/donation";
import { News } from "./pages/news";
import { Russia } from "./pages/russia";
import { World } from "./pages/world";
import { NewsPage } from './pages/newspage';

import { AUTH, ADMIN, DONATION, NEWS, RUSSIA, WORLD, PAGENEWS, CONFIRM_PASSWORD, CONFIRM_CODEPASSWORD, NEW_PASSWORD, CHANGE_PASSWORD } from "./utils/consts"
import { AuthModal } from './components/models/authModel';
import { EmailChange } from './components/models/changePasswordPages/inputEmailToChange';
import { CodeChange } from './components/models/changePasswordPages/inputCodeToChange';
import { PasswordChange } from './components/models/changePasswordPages/inputNewPassword';


export const useRoutes = (isAuth, isAdmin) => {

    if (isAdmin == 1) {
        return (
            <Routes>
                <Route path={NEWS} element={<News />}/>
                <Route path={RUSSIA} element={<Russia />}/>
                <Route path={WORLD} element={<World />}/>
                <Route path={DONATION} element={<Donation />}/>
                <Route path={ADMIN} element={<Admin />}/>
                <Route path={PAGENEWS} element={<NewsPage />}/>
                <Route
                        path="*"
                        element={<Navigate to={NEWS} />}
                />
            </Routes>
        ) 
    }
    if (isAuth) {
        return (
            <Routes>
                <Route path={NEWS} element={<News />}/>
                <Route path={RUSSIA} element={<Russia />}/>
                <Route path={WORLD} element={<World />}/>
                <Route path={DONATION} element={<Donation />}/>
                <Route path={PAGENEWS} element={<NewsPage />}/>
                <Route
                        path="*"
                        element={<Navigate to={NEWS} />}
                />
            </Routes>
        )
    }
    return (
            <Routes>
                <Route path={AUTH} element={<Auth />}/>
                <Route path={CONFIRM_PASSWORD} element={<AuthModal />}/>
                <Route path={CONFIRM_CODEPASSWORD} element={<CodeChange />}/>
                <Route path={NEW_PASSWORD} element={<PasswordChange />}/>
                <Route path={CHANGE_PASSWORD} element={<EmailChange />}/>
                <Route
                        path="*"
                        element={<Navigate to={AUTH} />}
                />
            </Routes>
        )
}