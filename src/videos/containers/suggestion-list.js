import React, { Component } from 'react';
import {
  FlatList,
  Text,
  ActivityIndicator
} from 'react-native';
import Layout from '../components/suggestion-list-layout';
import Empty from '../components/empty';
import VerticalSeparator from '../components/vertical-separator';
import Suggestion from '../components/suggestion'
import { connect } from 'react-redux';
import LoaderLayout from '../../sections/components/loader-layout';

class SuggestionList extends Component {
  keyExtractor = item => item.id.toString();
  renderEmpty = () => <Empty text="No hay sugerencias :("/>
  itemSeparator = () => <VerticalSeparator />  
  viewMovie = (item) => {
    console.log(item)
    this.props.dispatch({
      type: 'SET_SELECTED_MOVIE',
      payload: {
        selectedMovie: item,
      }
    })
  }
  renderItem = ({item}) => {
    return (
      <Suggestion 
        {...item}
        onPress={() => { this.viewMovie(item) } }
      />
    )
  }
  render () {
    return (
      <Layout
        title="Recomendado para ti"
      >
      {
        this.props.loading ?
        <LoaderLayout>
          <ActivityIndicator color='#0000ff'/>
        </LoaderLayout> :
        <FlatList 
          keyExtractor={this.keyExtractor}
          data={this.props.list}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.itemSeparator}
          renderItem={this.renderItem}
        />
      }
      </Layout>
    )
  }
}

function mapStateToProps (state) {
  return {
    list: state.suggestionList,
    loading: state.suggestionLoading
  }
}

export default connect(mapStateToProps)(SuggestionList);