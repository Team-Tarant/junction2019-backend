import axios from 'axios'

export const getVisitorEstimate = (timestamp: string) =>
  axios
    .get('http://163.172.138.216:5000/predict?timestamp=' + timestamp)
    .then(({ data }) => data)