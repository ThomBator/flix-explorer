import { usePopular } from "../hooks/usePopular";

function Home() {
  const BASE_URL = "https://image.tmdb.org/t/p/w200";
  const { isPending, error, data } = usePopular();
  if (isPending) {
    return <p>...Loading</p>;
  }

  if (error) {
    return <p>Error, contact site admin.</p>;
  }

  console.log(data);
  return <div>Home</div>;
}

export default Home;
