import { useEffect, useState } from "react";
import { data, useLocation, useNavigate } from "react-router";

export default function PostListPage() {
  const backendPath = import.meta.env.VITE_BACKEND_URL;
  const backendPostListPath =
    backendPath + import.meta.env.VITE_BACKEND_URL_POST;

  const goToPage = useNavigate();

  const [postList, setPostList] = useState(null);

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

  // fetch for delete a post
  const fetchDeletePost = (id) => {
    fetch(`${backendPostListPath}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        const { posts } = data;
        setPostList(posts);
      });
  };

  return (
    <main>
      <div className="container pt-3">
        <div className="d-flex justify-content-between">
          {/* page title */}
          <div>
            <h2>Post List</h2>
          </div>

          {/* add post btn */}
          <div>
            <button
              onClick={() => goToPage(`/postList/addPost`)}
              type="button"
              className="btn btn-primary me-1"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        {/* posts table */}
        {postList ? (
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
                    {/* show post button */}
                    <button
                      type="button"
                      onClick={() => goToPage(`/postList/${post.id}`)}
                      className="btn btn-outline-secondary me-1"
                    >
                      <i className="fa-regular fa-eye fa-sm"></i>
                    </button>

                    {/* modify post button */}
                    <button
                      onClick={() => {}}
                      type="button"
                      className="btn btn-success me-1"
                    >
                      <i className="fa-solid fa-pen fa-sm"></i>
                    </button>

                    {/* delete post button */}
                    <button
                      type="button"
                      className="btn btn-danger me-1"
                      data-bs-toggle="modal"
                      data-bs-target={`#deleteModal${post.id}`}
                    >
                      <i className="fa-solid fa-trash fa-sm"></i>
                    </button>

                    {/* modal for delete post */}
                    <div
                      className="modal fade"
                      id={`deleteModal${post.id}`}
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id={`deleteModal${post.id}`}
                            >
                              Eliminazione Post: {post.title}
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            Stai per eliminare il post "{post.title}". Vuoi
                            proseguire?
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Annulla
                            </button>
                            <button
                              type="button"
                              onClick={() => fetchDeletePost(post.id)}
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                            >
                              Elimina
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-danger" role="alert">
            Non ci sono post disponibili
          </div>
        )}
      </div>
    </main>
  );
}
