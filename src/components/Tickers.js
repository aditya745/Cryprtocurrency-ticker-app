import React, { Component } from 'react';
    import axios from 'axios';
    import './Tickers.css';
    import Cryptocurrency from './Cryptocurrency';

    class Tickers extends Component {

        constructor(props) {
            super(props);
            this.state = {
              search: "",
              data: []

            };

        }

        componentDidMount() {
            this.fetchCryptocurrencyData();
            this.interval = setInterval(() => this.fetchCryptocurrencyData(), 60 * 1000);
        }

        fetchCryptocurrencyData() {
            axios.get("https://api.coinmarketcap.com/v1/ticker/?limit=2000")
                .then(response => {

                    var result = response.data.map(currency => currency);
                    this.setState({ data: result});
                })
                .catch(err => console.log(err));
        }

        updateSearch = (event)=>{
          this.setState({
            search:event.target.value

          });
        }

        handleSort = ()=>{
          const cloneArray = [...this.state.data];
          const sorting = cloneArray.sort(function(a,b){
					return b.price_usd - a.price_usd;
				})
          this.setState({
            data:sorting

          });
        }

        handleSortByName = ()=>{
          const cloneArray2 = [...this.state.data];
          const sortingByName = cloneArray2.sort(function(a,b){
            let x = a.name.toLowerCase();
            let y = b.name.toLowerCase();
            return x < y ? -1 : x > y ? 1:0;
          })
          this.setState({
            data:sortingByName
          });
        }

         sortByRank = ()=>{
           const newArray1 = [...this.state.data];
           const sortingByRank = newArray1.sort(function(a,b){
             return a.rank -b.rank;
           })
           this.setState({
             data:sortingByRank
           })
         }
        render() {
            const newArray = [...this.state.data];
            let filtererdCrypto = newArray.filter((crypto)=>{
              return crypto.name.toLowerCase().indexOf(this.state.search) !== -1;
            });
            let tickers = filtererdCrypto.map((currency) =>
                <Cryptocurrency data={currency} key={currency.id} />
            );

            return (
                <div className="tickers-container">
                  <div className="form">
                    <input type="text" className="input" placeholder="search" name="input" value={this.state.search}
                    onChange={this.updateSearch}/>
                    <button onClick={this.handleSort} className="btn1">Sort By Price</button>
                    <button onClick={this.handleSortByName} className="btn2">Sort By Name</button>
                    <button onClick={this.sortByRank} className ="btn3">Sort By Rank</button>
                  </div>
                    <ul className="tickers">{tickers}</ul>
                    <p>Information updated every minute courtesy of coinmarketcap.com</p>
               </div>
            );
        }
    }

    export default Tickers;
