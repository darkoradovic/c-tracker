import React from "react";
import styles from "./App.module.css";
import Cards from "./components/Cards/Cards";
import CounrtyPicker from "./components/CountryPicker/CounrtyPicker";
import Chart from "./components/Chart/Chart";
import { fetchData } from "./api";
import Image from './images/image.png'

class App extends React.Component {
  state = {
    data: {},
    country: ""
  };

  async componentDidMount() {
    const fetchedData = await fetchData();
    //console.log(fetchedData);

    this.setState({ data: fetchedData });
  }

  handleCountryChange = async country => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img src={Image} className={styles.image} alt="image" />
        <Cards data={data} />
        <CounrtyPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
        <p>All rights reserved © D.R</p>
      </div>
    );
  }
}

export default App;
