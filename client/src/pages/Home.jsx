import React, { useEffect, useState } from 'react'
import { Cart, FormFiled, Loader } from '../components'

const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return (
        data.map((post) => <Cart key={post._id} {...post} />)
      );
    }
  
    return (
      <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
    );
  };
const Home = () => {

    const [loading, setLoading] = useState(false)
    const [allPost, setAllPost] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState(null);


    useEffect(()=>{
      const getAllPost = async ()=>{
      try {
        setLoading(true)
       
          const response = await fetch('http://localhost:8080/api/v1/posts',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          })
      if(response.ok){
       
      const result = await response.json()
      console.log(result)
      setAllPost(result.data.reverse())
     }
      } catch (error) {
        alert(error.message)
      }finally{
    setLoading(false)
      }}
      getAllPost()
    },[])


    const handleSearchChange = (e) => {
      clearTimeout(searchTimeout);
      setSearchText(e.target.value);
  
      setSearchTimeout(
        setTimeout(() => {
          const searchResult = allPost.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
          setSearchedResults(searchResult);
        }, 500),
      );
    };
    return (
        <section className="max-w-7xl mx-auto ">
            <div><h1 className='font-extrabold tetx-[#222328] text-[32px] '>The Community Showcase</h1>
                <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'> Browse Through the a collaction of imagination genrated images by AI IMG Power</p>
            </div>
            <div className='mt-16 '>   <FormFiled
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        /></div>

            <div className='mt-10'>
                {loading ? (
                    <div className='flex justify-center items-center'>
                        <Loader />
                    </div>
                ) : (<> {searchText
                    && (<h2 className='font-medium text-[#666e75] text-xl mb-3'> Showing results for <span className='text-[#222328]'> {searchText}</span></h2>)}
                    <div className='grid xl:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 grid-gap-3'> {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allPost}
                  title="No Posts Yet"
                />
              )}</div>
                </>)}

            </div>

        </section>
    )
}

export default Home