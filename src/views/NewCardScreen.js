'use strict';

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View, 
  // TextInput
} from 'react-native';

import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-native'

import { saveQuestion } from '../actions'

import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'
import moment from 'moment';

class NewCardScreen extends Component {


  constructor(props, context) {
    super(props, context)
    this.state = {
      form: {
        fullName: 'Marco Polo',
        tos: false,
      }
    }
  }

  handleValueChange(values) {
    console.log('handleValueChange', values)
    this.setState({ form: values })
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deck.title,
  })

  componentDidMount () {
    // const { setParams } = this.props.navigation;
    // const { deck } = this.props
    // setParams({
    //   title: navigation.state.params.deck.title,
    // })
  }

  render() {
    
    return (
      <GiftedForm
        formName='newDeckForm' // GiftedForm instances that use the same name will also share the same states
        clearOnClose={true} // delete the values of the form when unmounted
        defaults={{}}
        validators={{
          questionDescription: {
            title: 'Question\'s description',
            validate: [{
              validator: 'isLength',
              arguments: [1, 20],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },

          questionAnswer: {
            title: 'Question\'s description',
            validate: [{
              validator: 'isLength',
              arguments: [1, 30],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          },
          
        }}
      >
        <GiftedForm.SeparatorWidget />

        <GiftedForm.TextInputWidget
          name='questionDescription' // mandatory
          title='Question'
          image={require('../icons/color/user.png')}
          placeholder='Ex. first planet?'
          clearButtonMode='while-editing'
        />
        
        <GiftedForm.SeparatorWidget />

         <GiftedForm.TextInputWidget
          name='questionAnswer' // mandatory
          title='Answer'
          image={require('../icons/color/user.png')}
          placeholder='Ex. Mercury'
          clearButtonMode='while-editing'
        />

        <GiftedForm.SeparatorWidget />

        <GiftedForm.ErrorsWidget/>

        <GiftedForm.SubmitWidget
          title='Save Question Card'
          widgetStyles={{
            submitButton: {
              backgroundColor: '#2185D0',
            }
          }}
          onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null) => {
            if (isValid === true) {
              this.props.saveQuestion({
                deck_id: this.props.navigation.state.params.deck.id,
                questionAnswer: values.questionAnswer,
                questionDescription: values.questionDescription,
              })
              postSubmit(); // disable the loader
              GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used

              this.props.navigation.state.params.returnData()
              this.props.navigation.goBack()

              /* Implement the request to your server using values variable
              ** then you can do:
              ** postSubmit(); // disable the loader
              ** postSubmit(['An error occurred, please try again']); // disable the loader and display an error message
              ** postSubmit(['Username already taken', 'Email already taken']); // disable the loader and display an error message
              ** GiftedFormManager.reset('signupForm'); // clear the states of the form manually. 'signupForm' is the formName used
              */
            }
          }}
        />

        <GiftedForm.NoticeWidget
          title='By signing up, you agree to the Terms of Service and Privacy Policity.'
        />

        <GiftedForm.HiddenWidget name='tos' value={true} />
      </GiftedForm>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: "#454545",
  },
  button: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366',
    marginLeft: 10,
    marginRight: 10
  }
});

const mapStateToProps = (state, ownProps) => {
  return {
    // decks: state.decks
    deck: state.deck
  }
}

const mapDispatchToProps = { saveQuestion}


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(NewCardScreen)
