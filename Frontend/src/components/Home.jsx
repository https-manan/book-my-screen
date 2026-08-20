import { useContext } from 'react'
import Banner from './Banner'
import Recommended from './Recommended'
import LiveEvents from './LiveEvents'
import SearchResults from './SearchResults'
import { SearchContext } from '../context/SearchContext'

const Home = () => {
  const { searchTerm } = useContext(SearchContext)

  if (searchTerm.trim()) {
    return <SearchResults />
  }

  return (
    <div>
      <Banner/>
      <Recommended/>
      <LiveEvents/>
    </div>
  )
}

export default Home