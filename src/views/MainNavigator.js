'use strict';

import { StackNavigator } from 'react-navigation';
import DecksScreen from './DecksScreen';
import DeckScreen from './DeckScreen';
import NewDeckScreen from './NewDeckScreen';
import CardsScreen from './CardsScreen';
import NewCardScreen from './NewCardScreen';
import QuizScreen from './QuizScreen';

const MainNavigator = StackNavigator({
  Decks: { screen: DecksScreen },
  Deck: { screen: DeckScreen },
  NewDeck: { screen: NewDeckScreen },
  Cards: { screen: CardsScreen },
  NewCard: { screen: NewCardScreen },
  Quiz: { screen: QuizScreen },
});

export default MainNavigator;
