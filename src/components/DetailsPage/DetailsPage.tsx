import { useParams } from "react-router";
import { useDetails } from "@/hooks/data-hooks/useDetails";

function DetailsPage() {
  const id = useParams().id;

  const { isPending, error, data } = useDetails(id);

  if (isPending) {
    return <div>...Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  console.log(data);

  return <div>DetailsPage</div>;
}

export default DetailsPage;
