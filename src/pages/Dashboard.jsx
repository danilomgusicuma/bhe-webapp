import { Grid, Box, Heading } from 'grommet'
import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2'
import api from '../service/api'
import './Dashboard.css'

const data = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Moorings',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        '#2774FA',
        '#2774FA',
        '#2774FA',
        '#2774FA',
        '#2774FA',
        '#2774FA',
      ],
      borderWidth: 0,
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        gridLines: {
          display: false
        },
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false
        }
      }
    ]
  },
}

const Dashboard = () => {

  const [timeByPurpose, setTimeByPurpose] = useState([])
  const [timeByUnmooring, setTimeByUnmooring] = useState([])
  const [timeByMooring, setTimeByMooring] = useState([])
  const [timeByMooringPerMonth, setTimeByMooringPerMonth] = useState(null)
  const [costQueueSize, setCostQueueSize] = useState(0)
  const [availableBerths, setAvailableBerths] = useState(0)

  const [timeseriesData1, settimeseriesData1] = useState({})
  const [timeseriesData2, settimeseriesData2] = useState({})
  const [timeseriesData3, settimeseriesData3] = useState({})
  const [timeseriesData4, settimeseriesData4] = useState({})

  async function getCostQueue(){
    await api.get('/cost-queue')
    .then((response)=>{
      console.log('cost-queue:', response)
      const { data } = response
      setCostQueueSize(data.entries.length)
    })
  }

  async function getBerths(){
    await api.get('/berths')
    .then((response)=>{
      console.log('berths', response)
      const { data } = response
      setAvailableBerths(data.entries.length)
    })
  }

  async function getTimeByPurpose(){
    api.get('/pspmetrics/time/purposes')
    .then((response) => {
      const {data} = response
      console.log('purpose', data)
      setTimeByPurpose(data.entries)
    })
  }

  async function getTimeByUnmooring(){
    api.get('/pspmetrics/time/unmooring')
    .then((response) => {
      const {data} = response
      console.log('unmooring', data)
      setTimeByUnmooring(data.entries)
    })
  }

  async function getTimeByMooring(){
    api.get('/pspmetrics/time/mooring')
    .then((response)=>{
      const {data} = response
      console.log('mooring', data)
      setTimeByMooring(data.entries)
    })
  }

  async function getTimeByMooringPerMonth1(){
    api.get('/pspmetrics/count/moorings-per-month?year=2019')
    .then((response)=>{
      const {data} = response
      console.log('mooringpermonth', data)
      const chartData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
          {
            label: '1S2019 Atracações',
            data: data.entries.slice(0,5).map(value => value.count),
            backgroundColor: [
              '#2774FA',
              '#2774FA',
              '#2774FA',
              '#2774FA',
              '#2774FA',
              '#2774FA',
            ],
            borderWidth: 0,
          },
        ],
      }
      settimeseriesData1(chartData)
    })
  }

  async function getTimeByMooringPerMonth2(){
    api.get('/pspmetrics/count/moorings-per-month?year=2019')
    .then((response)=>{
      const {data} = response
      console.log('mooringpermonth', data)
      const chartData = {
        labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
          {
            label: '2S2019 Atracações',
            data: data.entries.slice(5,11).map(value => value.count),
            backgroundColor: [
              '#2774FA',
              '#2774FA',
              '#2774FA',
              '#2774FA',
              '#2774FA',
              '#2774FA',
            ],
            borderWidth: 0,
          },
        ],
      }
      settimeseriesData2(chartData)
    })
  }

  async function getTimeByMooringPerMonth3(){
    api.get('/pspmetrics/count/moorings-per-month?year=2018')
    .then((response)=>{
      const {data} = response
      console.log('mooringpermonth', data)
      const chartData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
          {
            label: '1S2018 Atracações',
            data: data.entries.slice(0,5).map(value => value.count),
            backgroundColor: [
              '#2774FA',
              '#2774FA',
              '#2774FA',
              '#2774FA',
              '#2774FA',
              '#2774FA',
            ],
            borderWidth: 0,
          },
        ],
      }
      settimeseriesData3(chartData)
    })
  }

  async function getTimeByMooringPerMonth4(){
    api.get('/pspmetrics/count/moorings-per-month?year=2018')
    .then((response)=>{
      const {data} = response
      console.log('mooringpermonth', data)
      const chartData = {
        labels: ['Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [
          {
            label: '2S2018 Atracações',
            data: data.entries.slice(5,11).map(value => value.count),
            backgroundColor: [
              '#2774FA',
              '#2774FA',
              '#2774FA',
              '#2774FA',
              '#2774FA',
              '#2774FA',
            ],
            borderWidth: 0,
          },
        ],
      }
      settimeseriesData4(chartData)
    })
  }

  useEffect(()=>{
    getTimeByPurpose()
    getTimeByUnmooring()
    getTimeByMooring()
    getTimeByMooringPerMonth1()
    getTimeByMooringPerMonth2()
    getTimeByMooringPerMonth3()
    getTimeByMooringPerMonth4()
    getCostQueue()
    getBerths()
  },[])
  


  return(
    <Box
      fill
      pad="medium"
      overflow={{vertical:"scroll"}}
    >
    <Grid
      fill
      rows={['xsmall', 'medium', 'medium']}
      columns={['flex', 'flex', 'flex', 'flex']}
      gap="small"
      areas={[
        { name: 'number1', start: [0, 0], end: [0, 0] },
        { name: 'number2', start: [1, 0], end: [1, 0] },
        { name: 'number3', start: [2, 0], end: [2, 0] },
        { name: 'number4', start: [3, 0], end: [3, 0] },
        { name: 'chart1', start: [0, 1], end: [1, 1] },
        { name: 'chart2', start: [2, 1], end: [3, 1] },
        { name: 'chart3', start: [0, 2], end: [1, 2] },
        { name: 'chart4', start: [2, 2], end: [3, 2] },
      ]}
    >
      <Box
        gridArea="number1"
        background="brand"
        elevation="small"
        round="small"
        pad={{left:"small", top:"small"}}
      >
        <Heading margin="none" level={6}>Atraso médio para atracação</Heading>
        <Heading margin={{left:"auto", right:"small", top:"none", bottom:"none"}} level={2}>
          {timeByMooring.length ? `${timeByMooring[0].days}d${Math.round(timeByMooring[0].hours)}h` : null}
        </Heading>

      </Box>
      <Box
        gridArea="number2"
        background="brand"
        elevation="small"
        round="small"
        pad={{left:"small", top:"small"}}
      >
        <Heading margin="none" level={6}>Espera média para Granel Sólido</Heading>
        <Heading margin={{left:"auto", right:"small", top:"none", bottom:"none"}} level={2}>
          {timeByPurpose.length ? `${timeByPurpose[0].days}d${Math.round(timeByPurpose[0].hours)}h` : null}
        </Heading>
      </Box>
      <Box
        gridArea="number3"
        background="brand"
        elevation="small"
        round="small"
        pad={{left:"small", top:"small"}}
      >
        <Heading margin="none" level={6}>Berços disponíveis</Heading>
        <Heading margin={{left:"auto", right:"small", top:"none", bottom:"none"}} level={2}>
          {availableBerths}
        </Heading>
      </Box>
      <Box
        gridArea="number4"
        background="brand"
        elevation="small"
        round="small"
        pad={{left:"small", top:"small"}}
      >
        <Heading margin="none" level={6}>Números de navios na fila</Heading>
        <Heading margin={{left:"auto", right:"small", top:"none", bottom:"none"}} level={2}>
          {costQueueSize}
        </Heading>
      </Box>
      <Box
        gridArea="chart1"
        background="light-1"
        elevation="small"
        round="small"
        pad="medium"
      >
        <Bar data={timeseriesData1} options={options}></Bar>
      </Box>
      <Box
        gridArea="chart2"
        background="light-1"
        elevation="small"
        round="small"
        pad="medium"
      >
        <Bar data={timeseriesData2} options={options}></Bar>
      </Box>
      <Box
        gridArea="chart3"
        background="light-1"
        elevation="small"
        round="small"
        pad="medium"
      >
        <Bar data={timeseriesData3} options={options}></Bar>
      </Box>
      <Box
        gridArea="chart4"
        background="light-1"
        elevation="small"
        round="small"
        pad="medium"
      >
        <Bar data={timeseriesData4} options={options}></Bar>
      </Box>
    </Grid>
    </Box>
  )
}

export default Dashboard