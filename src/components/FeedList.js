import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';

import Card from './Card'
import { getCards } from '../services/api';
import { BRAND_COLOR } from '../styles/variables';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#F3F3F3'
  },

  footer:
  {
    marginBottom: 16,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },

  btn:
  {
    flex: 1,
    padding: 10,
    backgroundColor: BRAND_COLOR,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  btn__text:
  {
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  }
});
const numCardsPerLoad = 5;

export default class FeedList extends Component {
  state = {
      cachedCards: [],
      cards: [],
      isLoading: false,
      loadMore: true
  }

  componentDidMount() {
    let cachedCards = getCards();
    let cards = cachedCards.splice(0, numCardsPerLoad);

    this.setState({cards, cachedCards});
  }    

  loadNext = () => {
    if (this.state.cachedCards.length > 0) {
      let cards = this.state.cachedCards.splice(0, numCardsPerLoad);
      this.setState({cards: [...this.state.cards, ...cards]});
    }
  }

  handleLoadMore = () => {
    this.setState({ isLoading: true }, () =>
    {
        setTimeout(() =>
        {
          this.loadNext();

          this.setState({ loadMore: false });
        }, 0);   
    });
  }

  handleMoreContent = () => {
    if (!this.state.loadMore) {
      this.loadNext();
    }
  }

  renderFooter()
  {
    return (
      <View style = { styles.footer }>
      {
        (!this.state.loadMore)
        ?
          (this.state.cachedCards.length > 0)
          ?            
            <ActivityIndicator color = {BRAND_COLOR} size="large" />
          :
            null
        :
          <TouchableOpacity activeOpacity = { 0.9 } onPress = { this.handleLoadMore } style = { styles.btn }>
            <Text style = { styles.btn__text }>Load More</Text>
            {
              ( this.state.isLoading )
              ?
                <ActivityIndicator color = "white" style = {{ marginLeft: 8 }} />
              :
                null
            }
          </TouchableOpacity>
      }              
      </View>
    )
  }

  render() {
    return [
      <FlatList
        key="feedlist"
          style={styles.list}
          data={this.state.cards}
          renderItem={({item, separators}) => <Card item={item} />}
          keyExtractor={item => item.id}   
          ListFooterComponent = { this.renderFooter.bind( this ) }
          onEndReached={this.handleMoreContent}
          onEndReachedThreshold={0.2}
      />
    ];
  }
}