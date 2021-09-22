import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import Profile from './utils/profile'
import NotFound from './utils/NotFound'
import {GlobalState} from '../../GlobalState'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged


    return (
        <Switch>
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/profile" exact component={isLogged ? NotFound : Profile} />
            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
