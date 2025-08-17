import React from "react";
import { useParams } from "react-router";

function CategoryResultsPage() {
  const category = useParams().name;
  console.log(category);

  return <div>{category}ResultsPage</div>;
}

export default CategoryResultsPage;
