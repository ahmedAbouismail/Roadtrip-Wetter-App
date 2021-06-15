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
              src='https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
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