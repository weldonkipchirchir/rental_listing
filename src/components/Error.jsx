import { useRouteError } from "react-router-dom";
function Error() {
  const error = useRouteError();
  return (
    <div>
      <h1 className="text-xl dark:text-white text-center">Error: {error.message}</h1>
      <pre className="text-xl dark:text-white text-center">{error.status}</pre>
    </div>
  );
}

export default Error;
