import React, { Component } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

import Home from './src/screens/containers/home';
import Header from './src/sections/components/header';
import SuggestionList from './src/videos/containers/suggestion-list';
import CategoryList from './src/videos/containers/category-list';
import Video from 'react-native-video';
import API from './utils/api';

type Props = {};
export default class App extends Component<Props> {
  state = {
    suggestionList: [],
    categoryList: [],
    loading: true,
  }
  async componentDidMount() {
    const movies = await API.getSuggestion(4);
    const categories = await API.getMovies();    
    console.log(movies);
    console.log(categories);    
    this.setState({
      suggestionList: movies,
      categoryList: categories,
      loading: false,
    })
  }
  render() {
    const { suggestionList, loading, categoryList } = this.state
    return (
      <Home>
      <Header>
      {/* SearchBar */}
      </Header>
      <View
        style={{
          flex: 1,
          height: 200,
       }}
      >
        <Video 
          source={{uri: 'https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4' }}
          style={{
            position: 'absolute',
            left: 0,            
            right: 0,
            bottom: 0,
            top: 0,
          }}
        />
      </View>
      
        <Text>Header</Text>
        <Text>Buscador</Text>
        <Text>Categorías</Text>
        {
          loading ? 
          <View>
            <ActivityIndicator
              size='small'
              color='#0000ff'
            />
          </View>
          :
          <CategoryList 
            list={categoryList}
          />
        }  
        {
          !loading &&
          <SuggestionList 
            list={suggestionList}
          />
        }
      </Home>
    );
  }
}