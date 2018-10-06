import React from 'react';
import _ from 'lodash'
import { Hand } from 'pokersolver'

const buildCards = (cards) => {
  let newCards = _.reverse(_.chunk(cards, 4))
  newCards.push([])
  newCards.unshift([])
  return newCards
}

export default class HandCalculator {
  constructor(playerOne, playerTwo, cards, knights, white, black){
    this.playerOne = playerOne
    this.playerTwo = playerTwo
    this.cards = buildCards(cards)
    this.knights = knights
    this.white = white
    this.black = black
  }


  swapCard(card){
    _.replace(card, '♠', 's');
    _.replace(card, '♥', 'h');
    _.replace(card, '♣', 'c');
    _.replace(card, '♦', 'd');
    return _.replace(card, '10', 'T')
  }

  whiteWins(){
    return JSON.stringify(this.winner()) === JSON.stringify(this.whiteHands())
  }

  winnerColor(){
    return this.whiteWins() ? 'white' : 'black'
  }

  winnerMessage(){
    return this.whiteWins() ? `${this.playerOne} wins: ${this.winner()[0].descr}` : `${this.playerTwo} wins: ${this.winner()[0].descr}`
  }

  whiteHands(){
    let playerOneRows = this.knights.slice(0,2).map((x)=> x[0])

    if(playerOneRows[0] === playerOneRows[1]){
      let hand = Hand.solve(_.concat(this.cards[playerOneRows[0]], this.white).map((card)=> this.swapCard(card)))
      return Hand.winners([hand])
    } else {
      let whiteOneA = Hand.solve(_.concat(this.cards[playerOneRows[0]], this.white[0]).map((card)=> this.swapCard(card)))
      let whiteOneB = Hand.solve(_.concat(this.cards[playerOneRows[0]], this.white[1]).map((card)=> this.swapCard(card)))
      let whiteTwoA = Hand.solve(_.concat(this.cards[playerOneRows[1]], this.white[0]).map((card)=> this.swapCard(card)))
      let whiteTwoB = Hand.solve(_.concat(this.cards[playerOneRows[1]], this.white[1]).map((card)=> this.swapCard(card)))
      return Hand.winners([whiteOneA, whiteOneB, whiteTwoA, whiteTwoB])
    }
  }

  blackHands(){
    let playerTwoRows = this.knights.slice(2,4).map((x)=> x[0])

    if(playerTwoRows[0] === playerTwoRows[1]){
      let hand = Hand.solve(_.concat(this.cards[playerTwoRows[0]], this.black).map((card)=> this.swapCard(card)))
      return Hand.winners([hand])
    } else {
      let blackOneA = Hand.solve(_.concat(this.cards[playerTwoRows[0]], this.black[0]).map((card)=> this.swapCard(card)))
      let blackOneB = Hand.solve(_.concat(this.cards[playerTwoRows[0]], this.black[1]).map((card)=> this.swapCard(card)))
      let blackTwoA = Hand.solve(_.concat(this.cards[playerTwoRows[1]], this.black[0]).map((card)=> this.swapCard(card)))
      let blackTwoB = Hand.solve(_.concat(this.cards[playerTwoRows[1]], this.black[1]).map((card)=> this.swapCard(card)))
      return Hand.winners([blackOneA, blackOneB, blackTwoA, blackTwoB])
    }
  }

  winner(){
    let hands = _.concat(this.whiteHands(), this.blackHands())
    return Hand.winners(hands)
  }
}
