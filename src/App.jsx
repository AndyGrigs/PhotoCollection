import React from 'react'

import { Collection } from './Collection'
import './App.scss'

const cats = [
  { name: 'All' },
  { name: 'Mountains' },
  { name: 'See' },
  { name: 'Architecture' },
  { name: 'Cities' }

]

function App() {
  const[searchValue, setSearchValue]= React.useState('')
  const[categoryId, setCategoryId]= React.useState(0)
  const[loading, setLoading]= React.useState(true)
  const[page, setPage]= React.useState(1)
  
  const [collections, setCollections] = React.useState([])
console.log(categoryId)
  React.useEffect(() => {
    setLoading(true)
    const category = categoryId ? `category=${categoryId}` : ''
    fetch(`https://630db2b6109c16b9abeb2eec.mockapi.io/photoCollection?page=${page}&limit=3&${category}`)
    .then(res => res.json())
      .then(data => {
        setCollections(data)
      })
      .catch(err => {
        console.warn(err)
        alert('Error with loading data')
      })
      .finally(()=>{
        setLoading(false)
      })
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>My photo collection</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((cat, i)=> (
              <li
                key={cat.id}
                onClick={()=> setCategoryId(i)}
                className={categoryId === i ? 'active' : '' }>
                {cat.name}
              </li>
            ))
          }
          
       
 
        </ul>
        <input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Search categories" />
      </div>
      <div className="content">
        {loading ? (
      <h2>Content is loading...</h2>
        ) : (
      collections
          .filter(collection => collection.name.toLowerCase().includes(searchValue.toLowerCase()))
          .map(collection => {
          return (
            
           <Collection
              key={collection.name}
              name={collection.name}
              images={collection.photos}
            />
            
          )
        })
        )}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) =>(
       <li  className={page === i + 1 ? 'active' : '' }
         onClick={()=> setPage(i+1)}
         >{i+1}</li>
        ))}
     
      </ul>
    </div>
  );
}

export default App;