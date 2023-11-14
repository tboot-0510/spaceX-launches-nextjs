const formatDate = (utcDateString: string): string => {
  const utcDate = new Date(utcDateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  return new Intl.DateTimeFormat("en-US", options).format(utcDate);
};

const formatSuccess = (success: boolean) => {
  if (success) return "Success";
  return "Failed";
};

const formatLaunchData = (launch: any) => {
  return {
    name: launch.name,
    dateUTC: formatDate(launch.date_utc),
    status: {
      success: launch.success,
      details: launch.details,
      failures: launch.failures,
    },
    media: {
      imageURL: launch.links.patch.small || launch.links.patch.large,
      videoURL: launch.links.webcast,
      article: launch.links.article,
      wiki: launch.links.wikipedia,
    },
    core_details: launch.cores,
    additional_details: {
      launchpad: launch.launchpad,
      ships: launch.ships,
      crew: launch.crew,
      capsules: launch.capsules,
      payloads: launch.payloads,
      fairings: launch.fairings,
      rocket: launch.rocket,
    },
  };
};

export { formatDate, formatSuccess, formatLaunchData };
