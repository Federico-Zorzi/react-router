/* import { useState } from "react"; */
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import PostListPage from "./pages/PostListPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route index Component={HomePage} />
            <Route path="/aboutUs" Component={AboutUsPage} />
          </Route>

          <Route path="/postList" Component={DefaultLayout}>
            <Route index Component={PostListPage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
