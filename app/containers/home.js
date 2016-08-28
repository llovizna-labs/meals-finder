import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators }  from '../actions'

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  TextInput,
  Image,
} from 'react-native'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      searching: false
    }
  }

  searchPressed( ) {
    this.setState({searching: true})
    this.props.fetchRecipes(this.state.text).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      this.setState({searching: false})
    })
  }
  componentDidMount() {
    alert('home view')
  }

  recipes () {
    return Object.keys(this.props.searchedRecipes).map(key => this.props.searchedRecipes[key])
  }

  render() {
      return (
      <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder={ 'Type some ingredients' }
          returnKeyType={'search'}
          placeholderTextColor={"black"}
          onChangeText={(text) => this.setState({text})}
          value={(this.state && this.state.text) || ''}
        />
             <TouchableHighlight
               style={styles.button}
               onPress={() => this.searchPressed()}
               activeOpacity={75 / 100}
               underlayColor={"rgb(210,210,210)"}>
               <Text>Press</Text>
             </TouchableHighlight>
      </View>

          <ScrollView horizontal={false} style={styles.scroll}>
            { !this.state.searching && this.recipes().map((recipe, key) => {
              return (
                <TouchableHighlight key={key} onPress= {() => {this.props.navigate({key: 'Detail', id: key})}}>
                <View>
                  <Image source= { {uri: recipe.thumbnail}} style={styles.image}></Image>
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  </View>
                  </TouchableHighlight>)
            })}
            {this.state.searching ? <Text> Searching...</Text>: null}
          </ScrollView>
      </View>
      )
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 0.7,
  },
  button: {
    flex: 0.3
  },
  scroll: {
    marginTop:20,
    flex:0.8
  },
  image: {
    height:  150
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    marginTop:50,
    backgroundColor: "rgba(10,128,50,1)",
  },
  row: {
    alignItems: 'center',
    flexDirection:'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    padding: 5,
    opacity: 0.6
  },
  text: {
    marginTop: 40,
  },
  recipeTitle: {
    padding:10
  }
})


function mapStateToProps(state) {
  return {
    searchedRecipes:  state.searchedRecipes
  }
}

export default connect(mapStateToProps)(Home)
