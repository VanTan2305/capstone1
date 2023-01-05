import React, { useEffect, useReducer } from 'react';
import List from '../components/List';
import Paginate from '../components/Paginate';
import Filter from '../components/Filter';
import Spinner from '../components/spinner/Spinner';
import NoProduct from '../components/notification/NoProduct';
import Error from '../components/error/Error';

import axios from 'axios';
import { reading_tests_url, listening_tests_url } from '../utils/constants';
import reducer from '../reducer/practice_reducer';
import { useParams } from 'react-router-dom';

const initialState = {
  data: [],
  isLoading: true,
  isError: false,
  curPage: 1,
  totalPage: 0,
  filter: {
    search: '',
    type: 'all',
    sort: '-createdAt',
  },
  reset: 0
};

const emptyData = {
  tests: [],
  currentPage: 0,
  totalPage: 0
};

const fakerData = {
  tests: [
    {
      content: ['If you are into technology, you are living in wond… soon be '],
      createdAt: '2022-12-12T16:36:40.770Z',
      description: 'If you are into technology, you are living in wonderful times. Th',
      image: {
        name: 'http://localhost:3000/1670863000705-T2S3_0.png'
      },
      questions: [
        {
          answer: [
            'tell you information about the stars.',
            'tell you where in the world you are.',
            'find objects in the sky that are not normally visible.',
            'studying a variety of subjects.'
          ],
          content: ['The Celestron SkyScout can', null],
          createdAt: '2022-12-12T16:20:08.570Z',
          description:
            'From the keywords The Celestron SkyScout, we use scanning skill to find it. In the paragraph 2, the information given is “For the truly celestially challenged, if you want to view a star or planet but do not have a clue which bit of the heavens to look in, do not despair; the SkyScout’s "locate” feature will guide you to it using illuminated arrows in the viewfinder”. So A must be the right option.\n\nTherefore, the answer for Q27 is A.',
          explaination:
            'if you want to view a star or planet but do not have a clue which bit of the heavens to look in, do not despair; the SkyScout’s "locate” feature will guide you to it using',
          title: 'Rise of the Robots',
          trueAnswer: 'tell you information about the stars.',
          type: 'multiplechoice',
          updatedAt: '2022-12-12T16:20:08.570Z',
          __v: 0,
          _id: '639754b83f898fb89263c435'
        }
      ],
      title: 'Rise of the Robots',
      updatedAt: '2022-12-12T16:36:40.770Z',
      video: 'undefined',
      __v: 0,
      _id: '639758983f898fb89263c462'
    }
  ],
  currentPage: 1,
  totalPage: 1
};

const ReadingPage = () => {
  let searchLocal = localStorage.getItem('search');
  // let typeLocal = localStorage.getItem('type');
  let sortLocal = localStorage.getItem('sort');
  let curPageLocal = localStorage.getItem('curPage');
  let userLocal = JSON.parse(localStorage.getItem('user'));
  // let Local = localStorage.getItem('');

  const [state, dispatch] = useReducer(reducer, initialState);
  const params = useParams();

  // let url = `&page=${state.curPage}${state.filter.search === '' ? '' : `&search=${state.filter.search}`}${
  //   state.filter.type === 'all' ? '' : `&choice=${state.filter.type}`
  // }&sort=${state.filter.sort}`;

  const getData = async () => {
    dispatch({ type: 'GET_PRODUCTS_BEGIN' });
    try {
      // const response = await axios.get(url);
      // const data = response.data;
      const data = userLocal.data.role ? fakerData : emptyData;
      setTimeout(() => {
        dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: data });
      }, 500);
    } catch (error) {
      console.error(error);
      dispatch({ type: 'GET_PRODUCTS_ERROR' });
    }
  };

  const setCurPage = (value) => {
    localStorage.setItem('curPage', String(value));
    dispatch({ type: 'SET_CURRENT_PAGE', payload: value });
  };

  const changeFilter = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'type') {
      value = e.target.textContent
        .split(' ')
        .map((val) => val.toLowerCase())
        .join('');
    }
    localStorage.setItem(name, String(value));
    localStorage.setItem('curPage', '1');
    dispatch({ type: 'CHANGE_FILTER', payload: { name, value } });
  };

  const searchTestHandler = () => {
    // getData(
    //   `${state.filter. === 'reading' ? reading_tests_url : listening_tests_url}&page=1${
    //     searchLocal === '' ? '' : `&search=${searchLocal}`
    //   }`
    // );
    // state.filter.search = '';
  };

  const clearFilterHandler = () => {
    localStorage.setItem('search', '');
    localStorage.setItem('type', 'all');
    localStorage.setItem('sort', '-createdAt');
    localStorage.setItem('curPage', '1');
    dispatch({ type: 'CLEAR_FILTER' });
  };

  useEffect(() => {
    // if (
    //   localStorage.getItem('search') === null ||
    //   localStorage.getItem('type') === null ||
    //   localStorage.getItem('sort') === null
    // ) {
    //   localStorage.setItem('search', '');
    //   localStorage.setItem('type', 'all');
    //   localStorage.setItem('sort', '-createdAt');
    //   // getData(url);
    //   getData();
    // } else {
    //   // getData(
    //   //   `${
    //   //     state.filter. === 'reading' ? reading_tests_url : listening_tests_url
    //   //   }&page=${curPageLocal}${searchLocal === '' ? '' : `&search=${searchLocal}`}&sort=${sortLocal}`
    //   // );
    //   getData();
    // }
    getData();
  }, [state.curPage, state.filter.type, state.filter.sort, state.reset]);

  if (state.isLoading === false) {
    console.log(state);
  }

  return (
    <>
      <h1 className="heading">Practice tests</h1>
      <Filter
        filter={state.filter}
        changeFilter={changeFilter}
        searchTestHandler={searchTestHandler}
        clearFilterHandler={clearFilterHandler}
        // type={state.filter.}
      />
      {state.isLoading === true && <Spinner />}
      {state.isLoading === false && state.isError === false && <List data={state.data} />}
      {state.data.length < 1 && state.isLoading === false && <NoProduct />}
      <Paginate setCurPage={setCurPage} curPage={state.curPage} totalPage={state.totalPage} />
      {state.isError === true && <Error />}
    </>
  );
};

export default ReadingPage;
