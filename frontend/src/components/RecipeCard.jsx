import Ingredients from "./Ingredients";
import { Link } from "react-router";
import { format, formatDistanceToNow } from "date-fns";
import axios from "../helpers/axios";
const RecipeCard = ({ recipe, onDeleted }) => {
  const deleteRecipe = async () => {
    let res = await axios.delete("/api/recipes/" + recipe._id);
    if (res.status === 200) {
      onDeleted(recipe._id);
    }
    console.log("deleted recipe");
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-orange-400">{recipe.title}</h3>
        <div className="space-x-3">
          <Link
            to={`/recipes/edit/${recipe._id}`}
            className="cursor-pointer rounded-sm bg-yellow-300 px-3 py-1.5 text-sm transition hover:bg-yellow-400"
          >
            Edit
          </Link>
          <button
            className="cursor-pointer rounded-sm bg-red-500 px-3 py-1.5 text-sm text-white transition hover:bg-red-600"
            onClick={deleteRecipe}
          >
            Delete
          </button>
        </div>
      </div>
      <p>Description</p>
      <p>{recipe.description}</p>
      <Ingredients ingredients={recipe.ingredients} />
      <p className="text-gray-500">
        Published at - {format(recipe.createdAt, "yyyy-MM-dd | HH:mm")}
      </p>
    </>
  );
};

export default RecipeCard;
