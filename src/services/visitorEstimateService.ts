import axios from 'axios'

export const getVisitorEstimate = () =>
  axios
    .get('http://163.172.138.216:5000/predict?timestamp=' + Math.floor(Date.now() / 1000))
    .then(({ data }) => data)