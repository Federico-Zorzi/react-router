import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function PostListShowPage() {
  const { id } = useParams();

  const backendPath = import.meta.env.VITE_BACKEND_URL;
  const backendPostListPath =
    backendPath + import.meta.env.VITE_BACKEND_URL_POST;

  const goToPage = useNavigate();

  const [postSelected, setPostSelected] = useState({});

  const fetchShowPost = () => {
    fetch(`${backendPostListPath}/${id}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            goToPage("/notFound");
          }
          throw new Error("Qualcosa è andato storto");
        }
        return res.json();
      })
      .then((data) => {
        setPostSelected(data);
      });
  };

  useEffect(fetchShowPost, []);

  console.log(postSelected.tags);

  return (
    <main>
      <div className="container">
        <div className="d-flex justify-content-between pt-3">
          {/* page title */}
          <h3>{postSelected.title}</h3>

          {/* back to previous page btn */}
          <button
            onClick={() => goToPage(-1)}
            type="button"
            className="btn btn-outline-secondary me-1"
          >
            Indietro
          </button>
        </div>

        {/* card visualization post */}
        <div className="card my-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={backendPath + postSelected.image}
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  {postSelected.title}
                  <span className="badge text-bg-primary ms-2">
                    {postSelected.category}
                  </span>
                </h5>
                <small className="text-body-secondary">
                  {postSelected.author}
                </small>
                <p className="card-text">{postSelected.content}</p>

                {postSelected.tags && Array.isArray(postSelected.tags) ? (
                  postSelected.tags.map((tag, index) => (
                    <span key={index} className="badge bg-secondary me-1">
                      #{tag}
                    </span>
                  ))
                ) : (
                  <p>No tags available.</p>
                )}

                {postSelected.isPublished ? (
                  <span className="badge text-bg-success position-absolute top-0 start-0 py-2">
                    Pubblicato
                  </span>
                ) : (
                  <span className="badge text-bg-warning position-absolute top-0 start-0 py-2">
                    Non pubblicato
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
