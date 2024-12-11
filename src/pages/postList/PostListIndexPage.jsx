import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function PostListPage() {
  const backendPath = import.meta.env.VITE_BACKEND_URL;
  const backendPostListPath =
    backendPath + import.meta.env.VITE_BACKEND_URL_POST;

  const goToPage = useNavigate();

  const [postList, setPostList] = useState([]);

  // fetch post list from backend
  const fetchPostList = () => {
    fetch(backendPostListPath)
      .then((res) => res.json())
      .then((data) => {
        const { newPostList } = data;

        setPostList(newPostList);
      });
  };

  useEffect(fetchPostList, []);

  return (
    <main>
      <div className="container pt-3">
        <h2>Post List</h2>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Preview</th>
              <th scope="col">Titolo</th>
              <th scope="col">Autore</th>
              <th scope="col">Categoria</th>
              <th scope="col">Pubblicato</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {postList.map((post) => (
              <tr key={post.id}>
                <td>
                  <img
                    src={backendPath + post.image}
                    className="rounded"
                    width="80"
                  />
                </td>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td>{post.category}</td>
                <td>
                  {post.isPublished ? (
                    <span className="badge text-bg-success">Pubblicato</span>
                  ) : (
                    <span className="badge text-bg-warning">
                      Non pubblicato
                    </span>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => goToPage(`/postList/${post.id}`)}
                    type="button"
                    className="btn btn-outline-secondary me-1"
                  >
                    <i className="fa-regular fa-eye fa-sm"></i>
                  </button>

                  <button
                    onClick={() => {}}
                    type="button"
                    className="btn btn-success me-1"
                  >
                    <i className="fa-solid fa-pen fa-sm"></i>
                  </button>

                  <button type="button" className="btn btn-danger me-1">
                    <i className="fa-solid fa-trash fa-sm"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
