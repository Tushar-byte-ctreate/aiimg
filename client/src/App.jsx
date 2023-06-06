import React from 'react'
import { BrowserRouter , Route,Routes,Link } from 'react-router-dom'
import{logo} from './assets'
import { Home, CreatePost ,About, Contact} from './pages'
const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/"><img src={logo} alt='logo' className='w-28 object-contain' /></Link>
        <Link to='/create-post' className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>Create Post</Link>
      </header>
      <main className='sm:p-8  px-4 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/create-post' element={<CreatePost/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </main>
      <footer className='w-full flex justify-between mt-2 items-center bg-blue-300 sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]'>
      <div ClassName=''> <h1 className='text-3xl font-bold'> AI IMG Generator </h1></div>
      <div className=''> <Link to='/about' className='text-gray m-1 p-2 border border-white-300 rounded-lg'>About</Link>
          <Link to='/contact' className='text-gray m-1 p-2 border border-white-300 rounded-lg'>Contact</Link> </div>
          <div> <p className='text-gray'>Copyright with Open AI</p> </div>
       </footer>
    </BrowserRouter>
  )
}

export default App