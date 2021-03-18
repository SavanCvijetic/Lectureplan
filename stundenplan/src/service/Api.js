import axios from 'axios'

export const OCCUPATION_API = axios.create({
  occupationURL: 'http://sandbox.gibm.ch/berufe.php'
}) 