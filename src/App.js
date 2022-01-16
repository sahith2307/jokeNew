import React,{useEffect,useState} from 'react';
import './App.css';
import JokeTeller from './components/jokeTeller';

function App() {
  const [data,setData]=useState([])
  const [languages,setLanguages]=useState([])
  const [flags,setFlags]=useState([])
  const [formats,setFormats]=useState([])
  const [typeData,setTypeData]=useState([])
  const [range,setRange]=useState({})
  useEffect(()=>{
    const fetchData=async()=>{
    const url="https://v2.jokeapi.dev/info"
    const response=await fetch(url)
    const dataFetched=await response.json()
      const dataFiltered=dataFetched.jokes.categories.filter(each=>each!=="Any")
      const languageFiltered=dataFetched.jokes.safeJokes
      const flagsData=dataFetched.jokes.flags
      const formatData=dataFetched.formats
      const typeData=dataFetched.jokes.types
      const idRange=dataFetched.jokes.idRange
      console.log(dataFetched)
      setData(dataFiltered)
      setLanguages(languageFiltered)
      setFlags(flagsData)
      setFormats(formatData)
      setTypeData(typeData)
      setRange(idRange)
    }
    fetchData()
  },[])
  return (
    // <div>
    //   sdljldfj
    // </div>
    <JokeTeller fetchedData={data} languagesData={languages} flagsData={flags} formatData={formats} typeDataPro={typeData}  rangeData={range}/>
  );
}

export default App;
