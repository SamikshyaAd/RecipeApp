import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const addFeedback = (feedback)=> ({
    type:ActionTypes.ADD_FEEDBACK,
    payload:feedback
});
export const postFeedback = (recipeId, rating, comment)=> (dispatch) => {
    const newFeedback = {
        recipe:recipeId,
        rating:rating, 
        comment:comment
    }

    const bearer = 'Bearer ' + localStorage.getItem('token');
    try{
        return fetch(baseUrl+'feedbacks',{
                method:'POST',
                body:JSON.stringify(newFeedback),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': bearer
                },
                credentials:'same-origin'
        })
        .then(response=>{
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error'+response.status+ ': '+response.statusText);
                error.response = response;
                throw error;   
            } 
        },
        error=> {
            var errmess = new Error (error.message);
            throw errmess;
        })
        .then(response=> response.json())
        .then(response=> dispatch(addFeedback(response)))
        .catch(error => {console.log('Post feedback: ', error.message);
        alert('Your feedback could not be posted.\n Error: '+ error.message);})
    }catch (err) {
       console.error(err);
    }
};

export const fetchRecipes = () => (dispatch) => {

        dispatch(recipeLoading(true));

        return fetch(baseUrl+'recipes')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error ('Error: '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(recipes => dispatch(addRecipes(recipes)))
        .catch(error => dispatch(recipeFailed(error.message)))
  
}
export const recipeLoading = () => ({
    type : ActionTypes.RECIPE_LOADING
  
});
export const addRecipes = (recipes) => ({
    type : ActionTypes.ADD_RECIPE,
    payload : recipes
});
export const recipeFailed = (errmess) => ({
    type : ActionTypes.RECIPE_FAILED,
    payload : errmess
});
export const fetchFeedbacks = () => (dispatch) => {

    dispatch(recipeLoading(true));

    return fetch(baseUrl+'feedbacks')
    .then(response=>{
        if(response.ok){
            return response;
        }
        else {
            var error = new Error('Error'+response.status+ ': '+response.statusText);
            error.response = response;
            throw error;   
        } 
    },
    error=> {
        var errmess = new Error (error.message);
        throw errmess;
    })
    .then(response=> response.json())
    .then(feedbacks=> dispatch(addFeedbacks(feedbacks)))
    .catch(error => dispatch(feedbacksFailed(error.message)));
}
export const feedbacksFailed = (errmess) => ({
    type: ActionTypes.FEEDBACKS_FAILED,
    payload: errmess
});
export const addFeedbacks = (feedbacks) => ({
    type: ActionTypes.ADD_FEEDBACKS,
    payload: feedbacks
});
export const postRecipe = (name, imageFileName, category, ingredients, direction, description, imageFile)=> (dispatch) => {

     const formData = new FormData();
     formData.append('imageFile',imageFile);

     const bearer = 'Bearer ' + localStorage.getItem('token'); 
     try{
         return fetch(baseUrl+'imageUpload',{
            method:'POST',
            body:formData,
            headers:{
                'Authorization': bearer
            },
            credentials:'same-origin'
        })
        .then((response) => {
            const recipe = {
                name:name,
                image:'images/'+imageFileName, 
                category:category,  
                ingredients:ingredients,
                direction:direction,
                description:description,
            }
            return fetch(baseUrl+'recipes',{
                method:'POST',
                body:JSON.stringify(recipe),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': bearer
                },
                credentials:'same-origin'
            })
            .then(response=>{
                if(response.ok){
                    return response;
                }
                else {
                    var error = new Error('Error'+response.status+ ': '+response.statusText);
                    error.response = response;
                    throw error;   
                } 
            },
            error=> {
                    var errmess = new Error (error.message);
                    throw errmess;
            })
            .then(response => response.json())
            .then(recipe => dispatch(concatRecipes(recipe)))
            .catch(error => {console.log('Post recipe: '+ error.message);
                alert('Recipe could not be added.\nError: '+ error.message);
            });        
        })
        .catch((error) => {
            alert('RecipeImage could not be uploaded.'+ error);
        });  
     } catch (err) {
        console.error(err);
    }
}
export const concatRecipes = (recipe)=> ({
    type:ActionTypes.ADD_SINGLERECIPE,
    payload:recipe
});
export const deleteRecipe = (recipeId, history) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');
    try{
        return fetch(`${baseUrl+'recipes'}/${recipeId}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'Authorization': bearer
        },
        credentials:'same-origin'
    })
    .then(response=>{
        if(response.ok){
            return response;
        }
        else {
            var error = new Error('Error'+response.status+ ': '+response.statusText);
            error.response = response;
            throw error;   
        } 
    },
    error=> {
        var errmess = new Error (error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(delRecipe => dispatch(deletedRecipe(delRecipe)))
    .catch(error => {console.log('Recipe not deleted: '+ error.message);
        alert('Recipe could not be deleted. \nError: '+ error.message);});
    }catch (err) {
       console.error(err);
    }
}
    
export const deletedRecipe = (delRecipe) =>({
    type: ActionTypes.DELETED_RECIPE,
    payload: delRecipe
});
export const updateRecipe = (recipe, recipeId) => (dispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');
    try{
        return fetch(`${baseUrl+'recipes'}/${recipeId}`,{
            method:'PUT',
            body:JSON.stringify(recipe),
            headers:{
                'Content-Type':'application/json',
                'Authorization': bearer
            },
            credentials:'same-origin'
        })
        .then(response=>{
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error'+response.status+ ': '+response.statusText);
                error.response = response;
                throw error;   
            } 
        },
        error=> {
            var errmess = new Error (error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(updatedRecipe => dispatch(recipeSuccess(updatedRecipe)))
        .catch(error => {console.log('Update recipe: '+ error.message);
            alert('Recipe could not be updated.\n Error: '+ error.message);});
        }catch (err) {
            console.error(err);
        }
}
export const recipeSuccess = (updatedRecipe)=>({
    type:ActionTypes.UPDATE_RECIPE_SUCCESS,
    payload:updatedRecipe
});
export const fetchFounders = () => (dispatch) => {

        dispatch(founderLoading(true));

        return fetch(baseUrl+'founders')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error ('Error: '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(founders => dispatch(addFounders(founders)))
        .catch(error => dispatch(founderFailed(error.message)))
}
export const founderLoading = () => ({
    type : ActionTypes.FOUNDER_LOADING
  
});
export const addFounders = (founders) => ({
    type : ActionTypes.ADD_FOUNDER,
    payload : founders
});
export const founderFailed = (errmess) => ({
    type : ActionTypes.FOUNDER_FAILED,
    payload : errmess
});
export const postGeneralFeedback = (firstname, lastname, telnum, email, agree, contactType, message)=> (dispatch) => {
    const feedback = {
        firstname:firstname,
        lastname:lastname, 
        telnum:telnum,
        email:email,
        agree:agree,
        contactType:contactType,
        message:message
    }
    const bearer = 'Bearer ' + localStorage.getItem('token');
    try{
        return fetch(baseUrl+'generalfeedbacks',{
            method:'POST',
            body:JSON.stringify(feedback),
            headers:{
                'Content-Type':'application/json',
                'Authorization': bearer
            },
            credentials:'same-origin'
        })
        .then(response=>{
            if(response.ok){
                return response;
            }
            else {
                var error = new Error('Error'+response.status+ ': '+response.statusText);
                error.response = response;
                throw error;   
            } 
        },
        error=> {
            var errmess = new Error (error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => { console.log('Feedback', response); alert('Thank you for your feedback!\n'+JSON.stringify(response)); })
        .catch(error =>  { console.log('Feedback', error.message); alert('Sorry your feedback could not be posted. \nError: '+error.message); });
    }catch (err) {
       console.error(err);
    }
};
    
   
export const fetchPromotions = () => (dispatch) => {

        dispatch(promotionLoading(true));

        return fetch(baseUrl+'promotions')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error ('Error: '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionFailed(error.message)))
}
export const promotionLoading = () => ({
    type : ActionTypes.PROMOTION_LOADING
  
});
export const addPromotions = (promotions) => ({
    type : ActionTypes.ADD_PROMOTION,
    payload : promotions
});
export const promotionFailed = (errmess) => ({
    type : ActionTypes.PROMOTION_FAILED,
    payload : errmess
});

export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            //dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(receiveLogout())
};

export const requestRegister = ( creds) => {
    return {
        type: ActionTypes.REGISTER_REQUEST,
         creds
    }
}
export const registerError = (message) => {
    return {
        type: ActionTypes.REGISTER_FAILURE,
        message
    }
}
export const receiveRegister = (response) => {
    return {
        type: ActionTypes.REGISTER_SUCCESS,
        status: response.status
    }
}
export const registerUser = (creds) => (dispatch) => {
    dispatch(requestRegister(creds));

    // const creds = {
    //     username : username,
    //     password : password,
    //     firstname : firstname,
    //     lastname : lastname
    // }

    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) { 
            alert('Successfully registered!');
            dispatch(receiveRegister(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(registerError(error.message)));
};

export const postFavorite = (recipeId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + recipeId, {
        method: "POST",
        body: JSON.stringify({"_id": recipeId}),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favorites => { console.log('Favorite Added', favorites); dispatch(addFavorites(favorites)); })
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite = (recipeId) => (dispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites/' + recipeId, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favorites => { console.log('Favorite Deleted', favorites); dispatch(addFavorites(favorites)); })
    .catch(error => dispatch(favoritesFailed(error.message)));
};

export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(error => dispatch(favoritesFailed(error.message)));
}

export const favoritesLoading = () => ({
    type: ActionTypes.FAVORITES_LOADING
});

export const favoritesFailed = (errmess) => ({
    type: ActionTypes.FAVORITES_FAILED,
    payload: errmess
});

export const addFavorites = (favorites) => ({
    type: ActionTypes.ADD_FAVORITES,
    payload: favorites
});