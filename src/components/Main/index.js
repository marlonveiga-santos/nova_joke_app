import {useEffect, useRef, useState} from "react";
import Setup from "../Setup";
import Punchline from "../Punchline";
import Loading from "../Loading";
import "./index.css";

/* Note como este componente é o único que possui um estado e também o único que possui hooks.
  Esta construção poderia ainda ser delegada ao context ou Redux, mas um estado centralizado 
   funciona muito bem quando existe pouca complexidade. */
function Main() {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [apiRequest, setApiRequest] = useState(false);
  const punchlineRef = useRef(null);

  const scrollToBottom = () => {
    punchlineRef.current?.scrollIntoView(punchlineRef);
  };

  useEffect(() => {
    fetch("https://nova-joke-api.netlify.app/.netlify/functions/index/api/random")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      })
      .catch(error => console.log("Internal server error"));

    /* Retorna um state vazio ao desmontar o componente evitando o erro de ler 
       um componente desmontado */
    return () => {
      setData([]);
      setIsVisible(false);
      window.scrollTo(0,0)
    };
  }, [apiRequest]);

  useEffect(() => {
     scrollToBottom() 
    
  }, [isVisible]);

  return (
    <>
      {data.length === 0 ? (
        <Loading />
      ) : (
        <>
        <Setup
          jokeId={data.id}
          jokeType={data.type}
          jokeSetup={data.setup}
        />
      <div ref={punchlineRef}></div>
      <Punchline jokePunchline={data.punchline} visible={isVisible} />
      {isVisible ? (
        <button onClick={() => setApiRequest(!apiRequest)}>
          New Joke
        </button>
      ) : (
        <button onClick={() => setIsVisible(!isVisible)}>Answer</button>
      )}
        </>
      )}
    </>
  );
}

export default Main;