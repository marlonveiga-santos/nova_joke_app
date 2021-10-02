import "./index.css";
import Laugh from "../../assets/laugh.png";

function Punchline({jokePunchline, visible}) {
  if (visible) {
    return (
      <>
        <dl className="punchline-card punchline-fade">
          <dt>Punchline:</dt>
          <img className="punchline-card-img" src={Laugh} alt="laugh emoji" />
          <dd>{jokePunchline}</dd>
        </dl>
      </>
    );
  } else {
    return null;
  }
}

export default Punchline;
