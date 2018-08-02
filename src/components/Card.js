import React, {Component} from 'react';
import {
    Dimensions,
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {PRIMARY_COLOR, BRAND_COLOR} from '../styles/variables';

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 16,
        marginTop: 16,
        borderRadius: 5,
        backgroundColor: 'white'
    },

    card__img: {
        marginBottom: 0,
        backgroundColor: BRAND_COLOR
    },

    card__content: {
        marginTop: 0,
        padding: 16
    },

    card__social: {
      flexDirection: 'row'
    },

    card__interaction: {
      flexDirection: 'row'
    },
    
    card__socialIcon: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginRight: 16,
    }, 

    card__bookmarkWrapper: {
      flex: 1
    },

    card__bookmark: {
      alignSelf: 'flex-end'
    },

    card__comments: {      
      flexDirection: 'row', 
      paddingTop: 12
    },

    card__user: {
      fontWeight: '700',
      paddingRight: 5
    },
    
    card__icon: {
      fontSize: 24,
      textAlign: 'center'
    },

    card__iconText: {
      fontSize: 16,
      fontWeight: '700',
      paddingLeft: 8
    },

    card__gray: {
      marginTop: 4,
      fontSize: 12,
      color: 'gray',
    }
})
const {width} = Dimensions.get('window');

export default class Card extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      img_width: Math.round(width - 32),
      img_height: Math.round((width - 32) * this.props.item.image.height / this.props.item.image.width),
      content_width: Math.round(width - 32),

      gemEnabled: false,
      gemColor: PRIMARY_COLOR,
      bookmark: 'bookmark-o',
      commented: false,
      commentColor: PRIMARY_COLOR,
      comment: 'comment-o',
      planeEnabled: false,
      planeColor: PRIMARY_COLOR,
      bookmarked: false,
      bookmarkColor: PRIMARY_COLOR
    };
  }

  handleToggleGem = () => {
    let isEnabled = !this.state.gemEnabled;
    let gemColor = isEnabled ? BRAND_COLOR : PRIMARY_COLOR;
    let gems = Math.round(this.props.item.gems);
    this.setState({gemEnabled: isEnabled, gemColor});
    this.props.item.gems = isEnabled ? (gems+1) : (gems-1);
  }

  handleToggleComment = () => {
    let isEnabled = !this.state.commented;
    let commentvalue = isEnabled ? 'comment' : 'comment-o';
    let commentColor = isEnabled ? BRAND_COLOR : PRIMARY_COLOR;
    let comments = Math.round(this.props.item.comments);
    this.setState({commented: isEnabled, comment: commentvalue, commentColor});
    this.props.item.comments = isEnabled ? (comments+1) : (comments-1);
  }

  handleTogglePlane = () => {
    let isEnabled = !this.state.planeEnabled;
    let planeColor = isEnabled ? BRAND_COLOR : PRIMARY_COLOR;
    this.setState({planeEnabled: isEnabled, planeColor});
  }

  handleToggleBookMark = () => {
    let isEnabled = !this.state.bookmarked;      
    let bookmarkvalue = isEnabled ? 'bookmark' : 'bookmark-o';
    let bookmarkColor = isEnabled ? BRAND_COLOR : PRIMARY_COLOR;
    this.setState({bookmarked: isEnabled, bookmark: bookmarkvalue, bookmarkColor});
  }

  render() {
      return (
        <View style={styles.card}>
          <Image source={{uri: this.props.item.image.src}}
                          style={[styles.card__img, {
                          width: this.state.img_width,
                          height: this.state.img_height
                      }]}>
          </Image>    
            
          <View style={[styles.card__content,
            {
                width: this.state.content_width
            }]}>
            
            <View style={styles.card__social}>
              <View style={styles.card__interaction}>

                <View>
                  <View style={styles.card__socialIcon}>
                    <TouchableOpacity onPress = { this.handleToggleGem }>
                      <Icon name="diamond" style={[styles.card__icon, {color: this.state.gemColor}]} /> 
                    </TouchableOpacity>
                    <Text style={styles.card__iconText}>{this.props.item.gems}</Text>
                  </View>
                </View>
              
                <View>             
                  <View style={styles.card__socialIcon}>
                    <TouchableOpacity onPress = { this.handleToggleComment }>
                      <Icon name={this.state.comment} style={[styles.card__icon, {color: this.state.commentColor}]} />  
                    </TouchableOpacity> 
                    <Text style={styles.card__iconText}>{this.props.item.comments}</Text>
                  </View>
                </View>

                <View>
                  <TouchableOpacity onPress = { this.handleTogglePlane }>
                      <Icon name="paper-plane-o" style={[styles.card__icon, {color: this.state.planeColor}]} /> 
                  </TouchableOpacity>
                </View>
              </View>
            
              <View style={styles.card__bookmarkWrapper}>
                <TouchableOpacity style={styles.card__bookmark} onPress = { this.handleToggleBookMark }>
                  <Icon name={this.state.bookmark} style={[styles.card__icon, {color: this.state.bookmarkColor}]} /> 
                </TouchableOpacity> 
              </View>
            </View>

            <View style={styles.card__comments}>
                <Text style={styles.card__user}>{this.props.item.author}</Text>
                <Text>{this.props.item.text}</Text>
            </View>
            <Text style={styles.card__gray}>view all comments</Text>
            <Text style={styles.card__gray}>Yesterday</Text>
          </View>
        </View>
      )
  }
}