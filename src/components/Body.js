import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useEffect, useState } from 'react';
import Shimmer from "./Shimmer";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  
  useEffect(()=>{
    fetchData();
    console.log("UseEffect called")
  },[]);

  const fetchData = async()=>{
  const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4913862&lng=78.3998642&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
  const json = await data.json();
  //console.log(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);  
   setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  }

  if(listOfRestaurants.length === 0){
    return <Shimmer/>
  }
 
  return (
    <div className="body">
      <div className="filter">
        <button className="filter-btn" onClick={()=>{
          let filterRestaurants = listOfRestaurants.filter((res)=> {
            console.log(res.info.avgRating);
            return res.info.avgRating > 4.2
          }
          );
          setListOfRestaurants(filterRestaurants);
          }}
        >
          Top Rated Restaurents
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.info.id} resData={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Body;