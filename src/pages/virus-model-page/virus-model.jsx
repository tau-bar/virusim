import React from 'react';
import Container from '../../ThreeSceneAnother';

const VirusModelPage = ({ history }) => {
  
  const { key } = history.location.state;

    const virusModelPath = {
        coronavirus: {
          src:'/assets/coronavirus.obj',
          img:'/assets/coronaWrap.png'
        },
        flavivirus: {
          src:'/assets/flavivirus.obj',
          img:'/assets/flavWrap.png'
        },
        mobillivirus: {
          src:'/assets/mobillivirus.obj',
          img:'/assets/mobWrap.png'
        },
        yersenia: {
          src:'/assets/yersinia.obj',
          img: '/assets/yerWrap.png'
        },
        ebolavirus: {
          src:'/assets/ebolavirus.obj',
          img: '/assets/yerWrap.png'
        },
        
        orthopoxvirus : {
          src:'/assets/orthopox.obj',
          img: '/assets/clear.png'
        },
        
        
       
      }
    return(
      <div>
        <Container img = {virusModelPath[key].img} modelPath ={virusModelPath[key].src}></Container>
      </div>
    )
}

export default VirusModelPage;