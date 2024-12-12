import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostListPostPage(updatePosts) {
  const backendPath = import.meta.env.VITE_BACKEND_URL;
  const backendPostListPath =
    backendPath + import.meta.env.VITE_BACKEND_URL_POST;

  const defaultPost = {
    title: "",
    content: "",
    author: "",
    image: "",
    category: "",
    isPublished: false,
    tags: [],
  };

  const [newPostListUpdated, setNewPostListUpdated] = useState(defaultPost);

  const [formData, setformData] = useState(defaultPost);
  const [categoriesList, setCategoriesList] = useState([]);

  const goToPage = useNavigate();

  const handleFormData = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setformData({ ...formData, [e.target.name]: value });
  };

  const handleTagsFormData = (e) => {
    let newTags = e.target.checked
      ? [...formData.tags, e.target.value]
      : formData.tags.filter((tag) => tag != e.target.value);

    setformData({ ...formData, tags: newTags });
  };

  /* fetch for categories list*/
  const fetchPostCategories = () => {
    fetch(backendPostListPath)
      .then((res) => res.json())
      .then((data) => {
        const { categories } = data;
        setCategoriesList(categories);
      });
  };
  useEffect(fetchPostCategories, []);

  /* fetch for add new post*/
  const fetchPostNewEl = (e) => {
    e.preventDefault();

    fetch(backendPostListPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        author: formData.author,
        content: formData.content,
        image:
          "/images/" + (formData.image ? formData.image : "img-default.svg"),
        category: formData.category,
        isPublished: formData.isPublished,
        tags: formData.tags,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { posts } = data;
        setNewPostListUpdated(posts);
      });

    /* setformData(defaultPost); */
  };

  const handleSubmit = () =>
    goToPage("/postList", { state: { newPostListUpdated } });

  return (
    <main>
      <div className="container">
        <div className="d-flex justify-content-between pt-3">
          {/* page title */}
          <h2>Crea nuovo post</h2>

          {/* back to previous page btn */}
          <button
            onClick={() => goToPage(-1)}
            type="button"
            className="btn btn-outline-secondary me-1"
          >
            Indietro
          </button>
        </div>

        <div>
          <form onSubmit={fetchPostNewEl}>
            <div className="row g-2">
              {/* title input */}
              <div className="col-6">
                <label htmlFor="inputTitle" className="form-label">
                  Titolo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputTitle"
                  value={formData.title}
                  name="title"
                  onChange={handleFormData}
                />
              </div>

              {/* author input */}
              <div className="col-6">
                <label htmlFor="inputAuthor" className="form-label">
                  Autore
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAuthor"
                  value={formData.author}
                  name="author"
                  onChange={handleFormData}
                />
              </div>

              {/* content input */}
              <div className="col-12">
                <label htmlFor="inputContent" className="form-label">
                  Contenuto post
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputContent"
                  value={formData.content}
                  name="content"
                  onChange={handleFormData}
                />
              </div>

              {/* image input */}
              <div className="col-12">
                <label htmlFor="inputImage" className="form-label">
                  Immagine
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputImage"
                  value={formData.image}
                  name="image"
                  onChange={handleFormData}
                />
              </div>

              {/* category select */}
              <div className="col-6">
                <label htmlFor="inputCategory" className="form-label">
                  Categoria
                </label>

                <select
                  id="inputCategory"
                  className="form-select"
                  aria-label="Default select example"
                  value={formData.category}
                  onChange={handleFormData}
                  name="category"
                >
                  <option value=""> Open this select menu</option>

                  {categoriesList.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* tags select */}
              <div className="col-6">
                <label
                  htmlFor="articleTags"
                  className="form-label me-3 d-block"
                >
                  Tags
                </label>

                <div
                  id="articleTags"
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck1"
                    autoComplete="off"
                    value="Tag 1"
                    checked={formData.tags.includes("Tag 1")}
                    onChange={handleTagsFormData}
                    name="tags"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck1"
                  >
                    Tag 1
                  </label>

                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck2"
                    value="Tag 2"
                    checked={formData.tags.includes("Tag 2")}
                    onChange={handleTagsFormData}
                    name="tags"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck2"
                  >
                    Tag 2
                  </label>

                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck3"
                    value="Tag 3"
                    checked={formData.tags.includes("Tag 3")}
                    onChange={handleTagsFormData}
                    name="tags"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck3"
                  >
                    Tag 3
                  </label>
                </div>
              </div>

              {/* isPublished checkbox */}
              <div className="col-12">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  id="checkboxPublished"
                  checked={formData.isPublished}
                  name="isPublished"
                  onChange={handleFormData}
                />
                <label className="form-check-label" htmlFor="checkboxPublished">
                  Pubblica
                </label>
              </div>

              {/* submit button */}
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
