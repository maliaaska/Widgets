import React, { useState, useEffect } from "react";
import axios from "axios";
const Search = () => {
  const [term, setTerm] = useState("programing");
  // eslint-disable-next-line
  const [results, setResults] = useState([]);

  console.log(results);
  useEffect(() => {
    // inside useEffect we cannot use the async function immediately, we need to create a helping function.
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term,
        },
      });
      setResults(data.query.search);
    };

    if (term && !results.length) {
      search();
    } else {
      const timeoutId = setTimeout(() => {
        if (term) {
          search();
        }
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
    // eslint-disable-next-line
  }, [term]);

  const renderResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            GO!!!!
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
          {result.snippet}
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">{renderResults}</div>
    </div>
  );
};

export default Search;
