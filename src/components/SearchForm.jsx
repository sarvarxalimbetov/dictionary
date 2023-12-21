import React from "react";
import { useForm } from "react-hook-form";
import search from "../../public/images/icon-search.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} from "../redux/wordSlice";
import notFound from "../../public/images/notFound.svg";
import Result from "./Result";

const SearchForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { data, error, loading } = useSelector((state) => state.word);
  const [searchedWord, setSearchedWord] = React.useState("");
  const [errorWord, setErrorWord] = React.useState(false);

  const onSubmit = async (input) => {
    dispatch(fetchDataStart());

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${input.search}`
      );
      if (response.status === 404) {
        setErrorWord(true);
      } else {
        setErrorWord(false);
      }

      const data = await response.json();

      dispatch(fetchDataSuccess(data));
      setSearchedWord(input.search);
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };

  return (
    <>
      <form
        className={errors.search ? "search search-error" : "search"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="search_input"
          placeholder="Search for any word…"
          {...register("search", { required: true })}
        />
        {errors.search && (
          <span className="search__error">Whoops, can’t be empty…</span>
        )}
        <button className="search_button">
          <img src={search} alt="search icon" className="search_icon" />
        </button>
        {error && <p className="search__error">Error: {error}</p>}
        {loading && (
          <div className="spinner-box">
            <div className="circle-border">
              <div className="circle-core"></div>
            </div>
          </div>
        )}
      </form>

      {errorWord ? (
        <div className="notFound_wrapper">
          <img
            className="notFound_image"
            src={notFound}
            alt="not found image"
          />

          <h3 className="notFound_title">No Definitions Found</h3>

          <p className="notFound_desc">
            Sorry pal, we couldn't find definitions for the word you were
            looking for. You can try the search again at later time or head to
            the web instead.
          </p>
        </div>
      ) : (
        ""
      )}

      {data.length > 0 && searchedWord && searchedWord === data[0].word && (
        <div className="result_wrapper">
          {data?.map((data) => (
            <Result data={data} key={Date.now()} />
          ))}
        </div>
      )}
    </>
  );
};

export default SearchForm;
