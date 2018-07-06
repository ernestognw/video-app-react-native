import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import HorizontalSeparator from '../../sections/components/horizontal-separator';
import Category from '../components/category';
import Empty from '../components/empty';
import Layout from '../components/category-list-layout';
import { connect } from 'react-redux';
import LoaderLayout from '../../sections/components/loader-layout';

class CategoryList extends Component {
  keyExtractor = item => item.id.toString();
  renderEmpty = () => <Empty text="No hay sugerencias :("/>
  itemSeparator = () => <HorizontalSeparator />  
  renderItem = ({item}) => {
    return (
      <Category
        {...item} 
      />
    )
  }      
  render() {
    return(
      <Layout
        title='Categorías'
      >
      {
        this.props.loading ?
        <LoaderLayout>
          <ActivityIndicator color='#0000ff'/>
        </LoaderLayout> :
        <FlatList
          horizontal 
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

function mapStateToProps(state) {
  return {
    list: state.categoryList,
    loading: state.categoryLoading
  }
}

export default connect(mapStateToProps)(CategoryList);