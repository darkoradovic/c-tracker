import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async country => {
  let chagableUrl = url;

  if (country) {
    chagableUrl = `${url}/countries/${country}`;
  }
  try {
    const res = await axios.get(chagableUrl);

    const modifiedData = {
      confirmed: res.data.confirmed,
      recovered: res.data.recovered,
      deaths: res.data.deaths,
      lastUpdate: res.data.lastUpdate
    };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

 export const fetchDailyData = async () => {
  try {
    const res = await axios.get("https://api.covid19api.com/summary");

    console.log(res.data)

    const modifiedData = [
      {
      confirmed: res.data.Global.TotalConfirmed,
      deaths: res.data.Global.TotalDeaths,
      date: res.data.Date
      }
    ]

    console.log(modifiedData[0])

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
}; 

export const fetchCountries = async () => {
  try {
    const res = await axios.get(`${url}/countries`);

    return res.data.countries.map(country => country.name);
  } catch (error) {
    return error;
  }
};
