import React, { Fragment } from "react";

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from "../api";

const Searchable = (props) => {
  const { searchTerm, searchValue, setIsLoading, setSearchResults } = props;

  return (
    <span className="content">
      <a
        href="#"
        onClick={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          try {
            const response = await fetchQueryResultsFromTermAndValue(
              searchTerm,
              searchValue
            );
            setSearchResults(response);
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {searchValue}
      </a>
    </span>
  );
};

const Feature = (props) => {
  const { featuredResult, setIsLoading, setSearchResults } = props;

  if (!featuredResult) {
    return <main id="feature"></main>;
  }

  const {
    title,
    dated,
    description,
    style,
    culture,
    technique,
    medium,
    people,
    dimensions,
    department,
    division,
    contact,
    creditline,
    images,
  } = featuredResult;

  return (
    <main id="feature">
      <div className="object-feature">
        <header>
          <h3>{title}</h3>
          <h4>{dated}</h4>
        </header>
        <section className="facts">
          {description ? (
            <>
              <span className="title">Description</span>
              <span className="content">{description}</span>
            </>
          ) : null}
          {style ? (
            <>
              <span className="title">Style</span>
              <span className="content">{style}</span>
            </>
          ) : null}
          {culture ? (
            <>
              <span className="title">Culture</span>
              <Searchable
                searchTerm="culture"
                searchValue={culture}
                setIsLoading={setIsLoading}
                setSearchResults={setSearchResults}
              />
            </>
          ) : null}
          {technique ? (
            <>
              <span className="title">Technique</span>
              <Searchable
                searchTerm="technique"
                searchValue={technique}
                setIsLoading={setIsLoading}
                setSearchResults={setSearchResults}
              />
            </>
          ) : null}
          {medium ? (
            <>
              <span className="title">Medium</span>
              <Searchable
                searchTerm="medium"
                searchValue={medium}
                setIsLoading={setIsLoading}
                setSearchResults={setSearchResults}
              />
            </>
          ) : null}
          {people ? (
            <>
              <span className="title">People</span>
              {people.map((person, indx) => {
                console.log(person.displayname);
                const name = person.displayname;
                return (
                  <Searchable
                    key={`people-${indx}`}
                    searchTerm="person"
                    searchValue={name}
                    setIsLoading={setIsLoading}
                    setSearchResults={setSearchResults}
                  />
                );
              })}
            </>
          ) : null}

          {dimensions ? (
            <>
              <span className="title">Dimensions</span>
              <span className="content">{dimensions}</span>
            </>
          ) : null}
          {department ? (
            <>
              <span className="title">Department</span>
              <span className="content">{department}</span>
            </>
          ) : null}
          {division ? (
            <>
              <span className="title">Division</span>
              <span className="content">{division}</span>
            </>
          ) : null}
          {contact ? (
            <>
              <span className="title">Contact</span>
              <span className="content">{contact}</span>
            </>
          ) : null}
          {creditline ? (
            <>
              <span className="title">Creditline</span>
              <span className="content">{creditline}</span>
            </>
          ) : null}
        </section>
        {images.length ? (
          <>
            <section className="photos">
              {images.map((image, indx) => {
                return (
                  <img
                    key={`image-${indx}`}
                    src={image.baseimageurl}
                    alt="SOMETHING_WORTHWHILE"
                  />
                );
              })}
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
};

export default Feature;
