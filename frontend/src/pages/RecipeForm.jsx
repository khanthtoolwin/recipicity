import React from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../helpers/axios";

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
        let res = await axios.get("/api/recipes/" + id);
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
        res = await axios.patch("/api/recipes/" + id, recipe);
      } else {
        res = await axios.post("/api/recipes/", recipe);
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
      <h1 className="mb-6 text-center text-2xl font-bold text-orange-400">
        Recipe {id ? "Edit " : "Create "} Form
      </h1>
      <form action="" className="space-y-5" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Title"
          className="w-full bg-white p-1"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="Recipe Description"
          rows="5"
          className="w-full bg-white p-1"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <div className="flex items-center justify-evenly">
          <input
            type="text"
            placeholder="Recipe Ingredient"
            className="w-full bg-white p-1"
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
        <ul className="list-disc pl-3">
          {!!errors.length &&
            errors.map((error, index) => (
              <li
                key={index}
                className="text-sm font-semibold text-red-500 capitalize"
              >
                {error} is invalid.
              </li>
            ))}
        </ul>
        <button
          type="submit"
          className="w-full rounded-full bg-orange-400 px-3 py-1 text-white"
        >
          {id ? "Update " : "Create "} Recipe
        </button>
      </form>
    </div>
  );
}
