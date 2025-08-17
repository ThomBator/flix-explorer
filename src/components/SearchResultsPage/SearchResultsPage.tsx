import React from "react";
import { useSearchParams } from "react-router";
import { useSearch } from "../../hooks/useSearch";
import { Image } from "@mantine/core";

function SearchResultsPage() {
  const BASE_URL = "https://image.tmdb.org/t/p/original";
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") ? searchParams.get("q") : "";
  const { data, isPending, error } = useSearch(searchQuery);

   if (!searchQuery) return <p>No search term provided.</p>;
  
  if (isPending) {
    return <div>...Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  console.log(data); 

  return (
    <div>
      <ul>
        {data.results.map((item) => {
          return (
            <li key={item.id}>
              <Image w={100} src={BASE_URL + item.poster_path} alt="" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchResultsPage;
