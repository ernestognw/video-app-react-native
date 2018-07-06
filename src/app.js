import API from '../utils/api'
import React, { Component } from 'react';
import Home from './screens/containers/home';
import Header from './sections/components/header';
import CategoryList from './videos/containers/category-list';
import SuggestionList from './videos/containers/suggestion-list';
import { connect } from 'react-redux';
import Movie from './screens/containers/movie';
import Search from './sections/containers/search';

class AppLayout extends Component {
  async componentDidMount() {
    const categoryList = await API.getMovies();
    this.props.dispatch({
      type: 'SET_CATEGORY_LIST',
      payload: {
        categoryList,
        categoryLoading: false,        
      }
    })
    const suggestionList = await API.getSuggestion(4);
    this.props.dispatch({
      type: 'SET_SUGGESTION_LIST',
      payload: {
        suggestionList,
        suggestionLoading: false,
      }
    })
  }
  render() {
    if (this.props.selectedMovie) {
      return <Movie />
    }
    return (
      <Home>
        <Header />
        <Search />
        <CategoryList />
        <SuggestionList />
      </Home>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedMovie: state.selectedMovie,
  }
}

export default connect(mapStateToProps)(AppLayout);