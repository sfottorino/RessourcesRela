import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../buttonElement';
import { ArrowForward, ArrowRight} from './heroElements';

export default function Navigate() {
    const [hover, setHover] = useState(false) 

    const onHover = () => {
            setHover(!hover);
    }
  const history = useHistory();
  const handleOnClick = () => history.push("/signup");

  return (
    <Button onClick={handleOnClick} onMouseEnter={onHover} onMouseLeave={onHover}>Créer un compte {hover ? <ArrowForward/>: <ArrowRight/>}</Button>
  );
}