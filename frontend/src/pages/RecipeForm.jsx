import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

import plus from "../assets/plus.svg";
import Ingredients from "../components/Ingredients";

export default function RecipeForm() {
  let { id } = useParams();

  const navigate = useNavigate();

  const [ingredients, setIngredients] = React.useState([]);
  const [newIngredient, setNewIngredient] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [errors, setErrors] = React.useState([]);

  React.useEffect(() => {
    let fetchRecipe = async () => {
      if (id) {
        let res = await axios.get("http://localhost:4000/api/recipes/" + id);
        if (res.status === 200) {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setIngredients(res.data.ingredients);
        }
      }
    };
    fetchRecipe();
  }, [id]);
  const addIngredient = () => {
    setIngredients((prev) => [newIngredient.toLowerCase(), ...prev]);
    setNewIngredient("");
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let recipe = {
        title,
        description,
        ingredients,
      };
      let res;
      if (id) {
        res = await axios.patch(
          "http://localhost:4000/api/recipes/" + id,
          recipe,
        );
      } else {
        res = await axios.post("http://localhost:4000/api/recipes/", recipe);
      }
      if (res.status === 200) {
        navigate("/?page=1");
      }
      setTitle("");
      setDescription("");
      setIngredients([]);
    } catch (e) {
      setErrors(Object.keys(e.response.data.errors));
      console.log(e);
    }
  };
  return (
    <div className="mx-auto max-w-md border-2 border-white p-4">
      <h1 className="mb-6 text-2xl font-bold text-orange-400 text-center">
        Recipe {id ? "Edit " : "Create "} Form
      </h1>
      <form action="" className="space-y-5" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          className="w-full p-1 bg-white"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="Recipe Description"
          rows="5"
          className="w-full p-1 bg-white"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <div className="flex justify-evenly items-center ">
          <input
            type="text"
            placeholder="Recipe Ingredient"
            className="w-full p-1 bg-white"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
          />
          <img
            src={plus}
            alt=""
            className="cursor-pointer"
            onClick={addIngredient}
          />
        </div>
        <div>
          <Ingredients ingredients={ingredients} />
        </div>
        <ul className="pl-3 list-disc">
          {!!errors.length &&
            errors.map((error, index) => (
              <li
                key={index}
                className=" text-red-500 font-semibold text-sm capitalize"
              >
                {error} is invalid.
              </li>
            ))}
        </ul>
        <button
          type="submit"
          className="w-full px-3 py-1 rounded-full bg-orange-400 text-white"
        >
          {id ? "Update " : "Create "} Recipe
        </button>
      </form>
    </div>
  );
}
