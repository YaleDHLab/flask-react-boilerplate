import React from 'react';
import Subcomponent from './Subcomponent';
import { Route, Switch } from 'react-router-dom';

const About = (props) => (
  <div className='about'>
    About
    <Switch>
      <Route path='/about/subroute' component={Subcomponent} />
    </Switch>
  </div>
)

export default About;