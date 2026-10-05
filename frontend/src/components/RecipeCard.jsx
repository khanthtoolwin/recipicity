import Ingredients from "./Ingredients";
import { Link } from "react-router";
import { format, formatDistanceToNow } from "date-fns";
import axios from "axios";
const RecipeCard = ({ recipe, onDeleted }) => {
  const deleteRecipe = async () => {
    let res = await axios.delete(
      "http://localhost:4000/api/recipes/" + recipe._id,
    );
    if (res.status === 200) {
      onDeleted(recipe._id);
    }
    console.log("deleted recipe");
  };
  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-orange-400">{recipe.title}</h3>
        <div className="space-x-3">
          <Link
            to={`/recipes/edit/${recipe._id}`}
            className=" bg-yellow-400 rounded-sm text-sm px-3 py-1.5 cursor-pointer hover:bg-yellow-300"
          >
            Edit
          </Link>
          <button
            className=" bg-red-500 rounded-sm text-sm text-white px-3 py-1.5 cursor-pointer hover:bg-red-600"
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
