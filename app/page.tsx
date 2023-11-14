import Launch from "./components/Launch";
import { apiEndpoint } from "./config";

async function fetchLaunches() {
  const response = await fetch(`${apiEndpoint}/launches`);
  const launches = await response.json();
  return launches;
}

export default async function Launches(context: any) {
  console.log("context", context);
  // https://www.smashingmagazine.com/2020/10/graphql-server-next-javascript-api-routes/
  const launches = await fetchLaunches();

  return (
    <div>
      {launches.map((launch: any) => (
        <Launch key={launch.flight_number} launch={launch} />
      ))}
    </div>
  );
}
