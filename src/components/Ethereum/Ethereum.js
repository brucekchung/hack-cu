import React, { Component } from 'react'
import { getPrices } from '../../api/apiCall'
import { cleanCryptoData, weekCryptoData } from '../../cleaner'
import { Chart } from 'react-google-charts'
import { LineChart } from 'react-chartkick'
window.Chart = require('chart.js')

export class Ethereum extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    const ethPrice = await getPrices('ETH')
    const cleanEth = cleanCryptoData(ethPrice)
    const weekEth = weekCryptoData(ethPrice)
    
    this.setState({
      current: cleanEth,
      week: weekEth
    })
  }

  render () {
    return (
      <div className="Ethereum">
        Ethereum
        {
          this.state.week &&
          <LineChart data={this.state.week}
               title='Ethereum price - 1 week (last 168 hrs)'
               xtitle='Time'
               ytitle='Price'
               min={null}
               max={null}
               library={{height: "500px"}} />
        }
        <div className="content">
        {
          this.state.current &&
          <LineChart data={this.state.current}
               title='Ethereum price - 1 day (last 24 hrs)'
               xtitle='Time'
               ytitle='Price'
               min={null}
               max={null}
               library={{height: "500px"}} />
        }
        </div>
      </div>
    )
  }
}