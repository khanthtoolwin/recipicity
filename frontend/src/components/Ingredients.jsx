export default function Ingredients({ ingredients }) {
  return (
    <div className="space-x-2">
      <span>Ingredients -</span>
      {ingredients.length ? (
        ingredients.map((ingredient, index) => (
          <span
            className="bg-orange-400 text-white px-2 py-1 text-sm rounded-full"
            key={index}
          >
            {ingredient}
          </span>
        ))
      ) : (
        <span className=" text-[#d0cfcfbd]">No ingredient added</span>
      )}
    </div>
  );
}
