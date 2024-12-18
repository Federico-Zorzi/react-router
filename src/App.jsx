/* import { useState } from "react"; */
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";

import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import PostListIndexPage from "./pages/postList/PostListIndexPage";
import PostListShowPage from "./pages/postList/PostListShowPage";
import PostListPostPage from "./pages/postList/PostListPostPage";
import NotFound from "./pages/notFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route index Component={HomePage} />
            <Route path="/aboutUs" Component={AboutUsPage} />
            <Route path="/notFound" Component={NotFound}></Route>
            <Route path="/postList">
              <Route index Component={PostListIndexPage} />
              <Route path=":id" Component={PostListShowPage} />
              <Route path="addPost" Component={PostListPostPage} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
