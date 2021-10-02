import "./index.css";
import Thinking from "../../assets/thinking.png"
function Setup({jokeId, jokeType, jokeSetup}) {
  return (
    <>
      <dl className="setup-card setup-fade">
        <div className="setup-card-item">
          <dt>Joke #</dt>
          <dd>{jokeId}</dd>
        </div>
        <div className="setup-card-item">
          <dt>Type:</dt>
          <dd>{jokeType}</dd>
        </div>
        <div className="setup-card-item">
          <img className="setup-card-img" src={Thinking} alt="thinking emoji" />
          <dt>Setup:</dt>
          <dd>{jokeSetup}</dd>
        </div>
      </dl>
    </>
  );
}

export default Setup;