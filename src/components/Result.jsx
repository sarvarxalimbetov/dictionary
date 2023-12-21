import React from "react";
import play from "../../public/images/icon-play.svg";
import link from "../../public/images/icon-new-window.svg";
// import "./Result.css";

const Result = ({ data }) => {
  const audio = new Audio(data?.phonetics[1]?.audio);
  console.log(data?.phonetics[1]?.audio);

  return (
    <div className="result">
      <div className="result__header">
        <div className="result__textbox">
          <h1 className="result__title">{data.word}</h1>
          <p className="result__text">{data.phonetic}</p>
        </div>
        <div className="result__phonetics">
          {data?.phonetics[1]?.audio ? (
            <button className="result__playbtn" onClick={() => audio.play()}>
              <img src={play} alt="play button" />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* definitions section */}
      <div className="result__definition">
        {data.meanings.map((mean) => {
          return (
            <div className="result__partsection" key={Date.now()}>
              <div className="result__part-wrapper">
                <p className="result__part">{mean.partOfSpeech}</p>
                <span className="result__part-line"></span>
              </div>
              <div className="result__meaning-wrapper">
                <p className="result__meaning">Meaning</p>
                <ul className="result__meaning-list">
                  {mean.definitions.map((def) => {
                    return (
                      <li key={Date.now()} className="result__meaning-item">
                        <span className="result__meaning-circle"></span>
                        {def.definition}

                        {def.example ? (
                          <span className="result__meaning-example">
                            - "{def.example}"
                          </span>
                        ) : (
                          ""
                        )}
                      </li>
                    );
                  })}
                </ul>
                {mean.antonyms.length ? (
                  <div className="result__meaning-antonyms">
                    <p className="result__meaning-antonym">Antonyms:</p>
                    <span className="result__meaning-antonymtext">
                      {mean.antonyms.join(", ")}
                    </span>
                  </div>
                ) : (
                  ""
                )}

                {mean.synonyms.length ? (
                  <div className="result__meaning-synonyms">
                    <p className="result__meaning-synonym">Synonyms:</p>
                    <span className="result__meaning-synonymtext">
                      {mean.synonyms.join(", ")}
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="result__source">
        <p className="result__source-title">Source</p>
        <a
          href={data.sourceUrls[0]}
          className="result__source-link"
          target="_blank"
        >
          {data.sourceUrls[0]}

          <img src={link} alt="link icon" />
        </a>
      </div>
    </div>
  );
};

export default Result;
