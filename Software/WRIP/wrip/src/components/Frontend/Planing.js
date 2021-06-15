import React from 'react';
import './Planing.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Plan your trip!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='https://images.unsplash.com/photo-1617793910803-dac609647901?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
              text='Here has to be the Inputs!'
              label='BETA'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;