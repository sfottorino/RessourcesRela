import React, {useState} from "react";
import { HeroContainer, HeroBg, HeroContent, HeroH1, HeroP, HeroBtnWrapper,ArrowForward, ArrowRight, VideoBg } from './heroElements';
import { Button } from '../buttonElement';
import Video from '../../videos/video.mp4';

const HeroSection = () => {
    const [hover, setHover] = useState(false) 

    const onHover = () => {
         setHover(!hover);
    }

    return (
      <HeroContainer>
          <HeroBg>
            <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
          </HeroBg>
            <HeroContent>
                <HeroH1>Créer, partager, apprendre</HeroH1>
                    <HeroP>
                    L'apprentissage est la seule chose que l'esprit n'épuise jamais, ne craint jamais et ne regrette jamais.
                    </HeroP>
                <HeroBtnWrapper>
                    <Button to='signup' onMouseEnter={onHover} onMouseLeave={onHover}>Se connecter {hover ? <ArrowForward/>: <ArrowRight/>}</Button>
                </HeroBtnWrapper>
            </HeroContent>
      </HeroContainer>

    );
};

export default HeroSection;