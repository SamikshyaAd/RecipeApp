import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Recipes} from './recipes';
import {Feedbacks} from './feedbacks';
import {Founders} from './founders';
import {Promotions} from './promotions';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {createForms} from 'react-redux-form';
import {InitialFeedback} from './forms';



export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            recipes:Recipes,
            feedbacks:Feedbacks,
            founders : Founders,
            promotions : Promotions,
            auth: Auth,
            ...createForms({
                feedback:InitialFeedback
            }) 
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}