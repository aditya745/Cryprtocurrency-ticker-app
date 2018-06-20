import React, {Component} from 'react';
import './Cryptocurrency.css';

class Cryptocurrency extends Component{
  render(){
    let {
      id,
      name,
      symbol,
      price_usd,
      percent_change_1h,
      percent_change_24h,
      percent_change_7d,
    } = this.props.data;
    return(
      <li className={"cryptocurrency " + id}>
        <h2 className="cryptocurrency-name">{name} ({symbol})</h2>
        <h2>Price: ${(+price_usd).toFixed(4)}</h2>
        <p>Percent_change_1h: {percent_change_1h}</p>
        <p>Percent_change_24h: {percent_change_24h}</p>
        <p>percent_change_7d: {percent_change_7d}</p>
      </li>
    );
  }
}
export default Cryptocurrency;
