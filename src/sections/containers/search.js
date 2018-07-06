import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import API from '../../../utils/api'
import { connect } from 'react-redux';

class Search extends Component {
  handleSubmit = async () => {
    const movies = await API.searchMovie(this.props.text);
    console.log(movies)
    if(movies == undefined) {
      this.props.dispatch({
        type: 'NO_COINCIDENCE_FOUND',
        payload: {
          noCoincidence: true,
        }
      })
    } else {
      this.props.dispatch({
        type: 'SET_SEARCHED_MOVIE',
        payload: {
          selectedMovie: movies[0],
        }
      })
    }      
  }
  handleChangeText = (query) => {
    this.props.dispatch({
      type: 'SET_SEARCH_TERM',
      payload: {
        query,
        noCoincidence: false,
      }
    })
  }
  render() {
    return (
      <View>
        <TextInput 
          placeholder={"Busca tu película favorita"}
          autoCorrect={false}
          autoCapitalize="none"
          underlineColorAndroid="transparent"
          onSubmitEditing={this.handleSubmit}
          onChangeText={this.handleChangeText}
          style={styles.input}
        />
          {
            this.props.showCoincidenceError &&
            <Text style={styles.errorText}>No se encontró ningún resultado :(</Text>
          }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#eaeaea'
  },
  errorText: {
    textAlign: 'center',
    color: '#323232',
    fontSize: 14,
    width: '100%',
    backgroundColor: '#fecc01',
  },
})

function mapStateToProps(state) {
  return {
    text: state.query,
    showCoincidenceError: state.noCoincidence
  }
  
}

export default connect(mapStateToProps)(Search);