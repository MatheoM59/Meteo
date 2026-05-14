export const processData = (data) => {
  return {
    city: data.resolvedAddress,
    timezone: data.timezone,
    current: {
      temp: data.currentConditions.temp,
      feelsLike: data.currentConditions.feelslike,
      humidity: data.currentConditions.humidity,
      conditions: data.currentConditions.conditions,
      icon: data.currentConditions.icon,
      windspeed: data.currentConditions.windspeed,
    },
    week: data.days.slice(0, 7).map((day) => ({
      date: day.datetime,
      tempMax: day.tempmax,
      tempMin: day.tempmin,
      conditions: day.conditions,
      icon: day.icon,
    })),
  };
};
