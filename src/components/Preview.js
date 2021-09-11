import React from "react";

import { fetchQueryResultsFromURL } from "../api";

const Preview = (props) => {
  const { setSearchResults, setFeaturedResult, setIsLoading } = props;

  const { info, records } = props.searchResults;

  async function fetchPage(pageUrl) {
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside id="preview">
      <header className="pagination">
        <button
          disabled={!info.prev}
          className="previous"
          onClick={() => {
            return fetchPage(info.prev);
          }}
        >
          Previous
        </button>
        <button
          disabled={!info.next}
          className="next"
          onClick={() => {
            return fetchPage(info.next);
          }}
        >
          Next
        </button>
      </header>
      <section className="results">
        {records.map((record, index) => {
          return (
            <div
              key={index}
              className="object-preview"
              onClick={(event) => {
                event.preventDefault();
                // set the featured result to be this record, using setFeaturedResult

                setFeaturedResult(record);
              }}
            >
              {record.primaryimageurl ? (
                <img src={record.primaryimageurl} alt={record.description} />
              ) : null}

              {
                record.title ? <h3>{record.title}</h3> : <h3>MISSING INFO</h3>
                // if the record.title exists, add this: <h3>{ record.title }</h3>, otherwise show this: <h3>MISSING INFO</h3>
              }
            </div>
          );
        })}
      </section>
    </aside>
  );
};

export default Preview;
