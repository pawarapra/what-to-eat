import AsyncStorage from '@react-native-async-storage/async-storage';

/*********************** ASYNC FUNCTIONS ***********************/

// for a given userID build the key and get the array of favorites for that key
// returns an empty array if no favorites exist for that key
export async function getFavArrayByUser(userId) {

  let arrFav = [];
  // console.log('getting favorites');

  try {
    arrFav = await AsyncStorage.getItem(userId + '_FAV'); 
  } catch (e) {
    console.log('error: ' + e);
  }

  // console.log(arrFav);
  return arrFav;
}

// add/overwrite the favorites array for a given user
// NOTE: no validation here, service consumer should ensure array is in the correct format
export async function updateFavArrayByUser(userId, arrFavorites) {

  // console.log('updating favorites');

  try {
    await AsyncStorage.setItem(userId + '_FAV', JSON.stringify(arrFavorites))
  } catch (e) {
    console.log('error: ' + e);
  }
}



/*********************** UTILITY FUNCTIONS (NOT ASYNC) ***********************/
export function checkFavorite(checkKey, currFavList) {
  // find the first index where the id matches the checked key  
  let foundIndex = currFavList.findIndex(ele => ele.id == checkKey);

  if (foundIndex >= 0) {
    return true;
  }

  return false;
}

// gets the favorite list, checks to see if should be added, then updates
export function addFavorite(newResort, currFavList) {

  // console.log('pre id: ' + delResort.id);
  // console.log('pre: ' + currFavList.length);

  /** 
   * NOTE: here we are saving the lite resort data so in the fav list we don't have to 
   * make a request to the api, this could mean that you end up with stale data in the 
   * localStorage, so this wouldn't be a good idea if it was likely to change
  */
  if (!checkFavorite(newResort.id, currFavList)) {
    // we don't add the whole resort just key data
    const liteResort = {
      id: newResort.id,
      slug: newResort.slug,
      name: newResort.name,
      active: newResort.active,
      keyImage: newResort.keyImage
    }

    // not in list so add and update
    currFavList.push(newResort);   

    // console.log('post: ' + filteredList.length);
  }

  // else do nothing it's already there
  // could also return a false or throw an error to prevent an un-neccessary update

  // don't need a return since the array is passed by reference so it's already changed
}

// gets the favorite list, checks to see if should be added, then updates
export function delFavorite(delResort, currFavList) {

  // console.log('pre id: ' + delResort.id);
  // console.log('pre: ' + currFavList.length);

  // filter returns a copy of the arry with the matching criteria filtered out
  let filteredList = currFavList.filter(ele => ele.id != delResort.id);

  // console.log('post: ' + filteredList.length);
  
  // this time we do need a return since we had to copy to a new array
  return filteredList;
}