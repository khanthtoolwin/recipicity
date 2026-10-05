import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate } from "react-router";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [links, setLinks] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const searchQuery = new URLSearchParams(location.search);
  let page = searchQuery.get("page"); // String
  page = parseInt(page); // int

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(
        "http://localhost:4000/api/recipes?page=" + page,
      );
      if (response.ok) {
        const data = await response.json();
        setLinks(data.links);
        setRecipes(data.data);
        //scroll to top
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
      }
    };
    fetchRecipes();
  }, [page]);

  const onDeleted = (_id) => {
    if (recipes.length === 1 && page > 1) {
      navigate("/?page=" + (page - 1));
    } else {
      setRecipes((prev) => prev.filter((r) => r._id != _id));
    }
  };

  return (
    <div className="space-y-3">
      {!!recipes.length &&
        recipes.map((recipe) => (
          <div className="bg-white p-5 rounded-2xl space-y-3" key={recipe._id}>
            <RecipeCard recipe={recipe} onDeleted={onDeleted} />
          </div>
        ))}
      {!!links && <Pagination links={links} page={page || 1} />}
    </div>
  );
};

export default Home;
