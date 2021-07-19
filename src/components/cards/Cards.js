import React from 'react';
import './Cards.scss';
import '../../pages/virus-page/virus-page.styles.scss';
import CardItem from './CardItem';
import { withRouter } from 'react-router-dom';
import viruses from '../../assets/images/viruses.jpg'

export const virusData = {
  coronavirus: {
    src:'/images/coronavirus.png'

  },
  flavivirus: {
    src:'/images/flavivirus.png'
  },
  mobillivirus: {
    src:'/images/morbillivirus.png'
  },
  yersenia: {

    src:'/images/yersinia.png'
  },
  ebolavirus: {
    src:'/images/ebola.jpeg'
  },
  orthopoxvirus : {
    src:'/images/orthopox.png'
  },   
}

const Cards = (props) => {
  return (
    <div 
    className='cards'
    style={{ backgroundImage: `url(${viruses})` }}>
      <h1 className = 'cards-title'>Understanding Viruses</h1>
      <p className = 'virus-page-text' style = {{color: 'white'}}>Click on a card to view the interactive virus model!</p>
      <div className='cards-container'>
          {
            Object.keys(virusData).map((key, index) => {
              return(
                <CardItem
                key = {`virusCards${index}`}
                src= {virusData[key].src}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                onClick={() => props.history.push({
                  pathname: `/virus/model/${key}`,
                  state: {
                    key: key,
                  }})}
              />)
            }
              )
          }
        </div>
    </div>
  );
}

export default withRouter(Cards);