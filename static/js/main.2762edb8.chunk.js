(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,a,t){e.exports=t(29)},23:function(e,a,t){},29:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(4),i=t.n(c),s=(t(23),t(5)),o=t(6),l=t(11),u=t(7),d=t(3),m=t(12),h=t(1);function p(e){return r.a.createElement(h.Box,{px:3,py:3},r.a.createElement(h.Image,{src:"/flashcards/fadedSquare.png"}),r.a.createElement(h.Button,{mt:2,onClick:function(){return e.onClick()}},"Begin"))}function C(e){var a,t=(a=e.flashcard.multipleChoices,a.find(function(e){return e.correct})).name;return r.a.createElement(h.Box,{px:3,py:3},r.a.createElement(h.Image,{src:"/flashcards"+e.flashcard.image}),r.a.createElement(h.Heading,{as:"h3"},"Correct!"),r.a.createElement(h.Text,null,r.a.createElement("p",null,"Yes, the answer is ",r.a.createElement("strong",null,t))),e.isLastCard?r.a.createElement("p",null,"You guessed X out of X"):r.a.createElement(h.Button,{onClick:function(){return e.onClick()}},"Next"))}function f(e){return r.a.createElement(h.Box,{px:3,py:3},r.a.createElement(h.Image,{src:"/flashcards"+e.card.image}),r.a.createElement("div",null,a(0)),r.a.createElement("div",null,a(1)),r.a.createElement("div",null,a(2)));function a(a){var t=e.guesses[a];return r.a.createElement(g,{choice:e.card.multipleChoices[a],onClick:function(){return e.onClick(a)},guessIsIncorrect:t?"incorrect":null})}}function g(e){var a=e.guessIsIncorrect?{backgroundColor:"red"}:null;return r.a.createElement(h.Button,{mt:2,fontSize:"2",style:a,onClick:e.onClick},e.choice.name)}function v(e){return r.a.createElement(h.Box,{width:[1,1,500]},r.a.createElement(h.Card,{p:1,borderRadius:2,boxShadow:"0 0 16px rgba(0, 0, 0, .25)"},e.children))}var E=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(l.a)(this,Object(u.a)(a).call(this,e))).handleGuess=t.handleGuess.bind(Object(d.a)(t)),t.handleNewCard=t.handleNewCard.bind(Object(d.a)(t)),t.state={guesses:b(),action:"newGame"},t}return Object(m.a)(a,e),Object(o.a)(a,[{key:"_isWinning",value:function(e){return this.props.flashcard.multipleChoices[e].correct}},{key:"handleNewCard",value:function(){this.props.advanceToNextCard(),this.setState(function(e){return{action:"playing",guesses:b()}})}},{key:"handleGuess",value:function(e){var a=this;this.setState(function(t){return t.guesses[e]="guessed",t.action=a._isWinning(e)?"winning":t.action,t})}},{key:"render",value:function(){var e;switch(this.state.action){case"playing":e=r.a.createElement(f,{card:this.props.flashcard,onClick:this.handleGuess,guesses:this.state.guesses});break;case"winning":e=r.a.createElement(C,{flashcard:this.props.flashcard,isLastCard:this.props.isLastCard,onClick:this.handleNewCard});break;default:e=r.a.createElement(p,{onClick:this.handleNewCard})}return r.a.createElement(v,null,e)}}]),a}(r.a.Component);function b(){return Array(3).fill(null)}var k=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(l.a)(this,Object(u.a)(a).call(this,e))).handleAdvanceToNextCard=t.handleAdvanceToNextCard.bind(Object(d.a)(t)),t.state={currentCard:NaN,isLastCard:!1},t}return Object(m.a)(a,e),Object(o.a)(a,[{key:"handleAdvanceToNextCard",value:function(){this.setState(function(e){return{currentCard:isNaN(e.currentCard)?0:e.currentCard+1,isLastCard:[{image:"/cards/IMG_8587.jpg",multipleChoices:[{name:"Dodecatheon pilchellum",correct:!1},{name:"Trametes versicolor",correct:!0},{name:"Gavia pacifica",correct:!1}]},{image:"/cards/IMG_8607.jpg",multipleChoices:[{name:"Gaulteria Shallon",correct:!0},{name:"Boletus edulis",correct:!1},{name:"Morchella esculenta",correct:!1}]},{image:"/cards/IMG_8625.jpg",multipleChoices:[{name:"Agaricus campestris",correct:!1},{name:"Ganoderma applanatum",correct:!1},{name:"Dicentra formosa",correct:!0}]}].length-2===e.currentCard}})}},{key:"render",value:function(){return r.a.createElement(E,{flashcard:[{image:"/cards/IMG_8587.jpg",multipleChoices:[{name:"Dodecatheon pilchellum",correct:!1},{name:"Trametes versicolor",correct:!0},{name:"Gavia pacifica",correct:!1}]},{image:"/cards/IMG_8607.jpg",multipleChoices:[{name:"Gaulteria Shallon",correct:!0},{name:"Boletus edulis",correct:!1},{name:"Morchella esculenta",correct:!1}]},{image:"/cards/IMG_8625.jpg",multipleChoices:[{name:"Agaricus campestris",correct:!1},{name:"Ganoderma applanatum",correct:!1},{name:"Dicentra formosa",correct:!0}]}][this.state.currentCard],advanceToNextCard:this.handleAdvanceToNextCard,isLastCard:this.state.isLastCard})}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[17,1,2]]]);
//# sourceMappingURL=main.2762edb8.chunk.js.map