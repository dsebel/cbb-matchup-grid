(this["webpackJsonpcbb-matchup-grid"]=this["webpackJsonpcbb-matchup-grid"]||[]).push([[0],{204:function(e,t,a){e.exports=a.p+"static/media/Big_Dance_CSV.96921f42.csv"},205:function(e,t,a){e.exports=a.p+"static/media/KP.1a573eb0.csv"},258:function(e,t,a){e.exports=a(411)},263:function(e,t,a){},264:function(e,t,a){},376:function(e,t,a){},409:function(e,t,a){},411:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(29),l=a.n(r),s=(a(263),a(33)),o=a(34),i=a(35),d=a(36),u=a(25),m=a(37),h=a(124),f=a.n(h),p=a(421),E=a(422),v=a(420),g=a(417),y=a(419),x=(a(264),[{value:1,text:"1"},{value:2,text:"2"},{value:3,text:"3"},{value:4,text:"4"},{value:5,text:"5"},{value:6,text:"6"},{value:7,text:"7"},{value:8,text:"8"},{value:9,text:"9"},{value:10,text:"10"},{value:11,text:"11"},{value:12,text:"12"},{value:13,text:"13"},{value:14,text:"14"},{value:15,text:"15"},{value:16,text:"16"}]);var S=function(e){return c.a.createElement(p.a.Row,null,c.a.createElement(p.a.Column,null,c.a.createElement(E.a,{as:"h3"},"Seed Select"),c.a.createElement(p.a,{columns:3},c.a.createElement(p.a.Column,{width:7},c.a.createElement(y.a,{selection:!0,fluid:!0,options:x,defaultValue:e.leftSeed,className:"seed-dropdown",onChange:e.onLeftSeedDropdownChange})),c.a.createElement(p.a.Column,{width:2,className:"vs-text"},"vs."),c.a.createElement(p.a.Column,{width:7},c.a.createElement(y.a,{selection:!0,fluid:!0,options:x,defaultValue:e.rightSeed,className:"seed-dropdown",onChange:e.onRightSeedDropdownChange})))))},w=a(56),k=a(130),C=(a(376),a(377),40),b=40,j=1200-(b+40),M=600-(C+40),O=null,A=null,Y=w.b(),B=function(e){function t(e){var a;Object(s.a)(this,t),a=Object(i.a)(this,Object(d.a)(t).call(this,e));var n=Object.values(a.props.teams);return O=w.c().domain(w.a(n.map((function(e){return e.adjO})))).range([0,j]).nice(),A=w.c().domain(w.a(n.map((function(e){return e.adjD})))).range([0,M]).nice(),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this,t=O.ticks().map((function(e){return{value:e,xOffset:O(e)}})),a=A.ticks().map((function(e){return{value:e,yOffset:A(e)}})),n=[];this.props.filteredGames.forEach((function(e){n.push(c.a.createElement("path",{key:e.key,className:"line",strokeDasharray:"3, 3",d:Y([[O(e.teamA.data.adjO),A(e.teamA.data.adjD)],[O(e.teamB.data.adjO),A(e.teamB.data.adjD)]])}))}));var r=[];this.props.filteredGames.forEach((function(e){[e.teamA,e.teamB].forEach((function(t){r.push(c.a.createElement(k.a,{key:t.key,content:"".concat(e.year,": (").concat(t.data.seed,") ").concat(t.data.name)},c.a.createElement("circle",{cx:O(t.data.adjO),cy:A(t.data.adjD),r:5,style:{fill:t.won?"green":"red"}})))}))}));var l=[];return this.props.potentialMatchups.forEach((function(t){l.push(c.a.createElement(k.a,{key:t.key,content:"".concat(e.props.currentYear,": (").concat(t.data.seed,") ").concat(t.data.name)},c.a.createElement("circle",{cx:O(t.data.adjO),cy:A(t.data.adjD),r:5,style:{fill:"purple"}})))})),c.a.createElement("svg",{width:1200,height:600},c.a.createElement("g",{transform:"translate(".concat(b,", ").concat(C,")")},c.a.createElement("g",{className:"line-container"},n),c.a.createElement("g",{className:"point-container"},r),c.a.createElement("g",{className:"point-container"},l)),c.a.createElement("g",{className:"axis",transform:"translate(".concat(b,", ").concat(M+C,")")},c.a.createElement("path",{d:"M 0 0 H ".concat(j),stroke:"currentColor"}),t.map((function(e){var t=e.value,a=e.xOffset;return c.a.createElement("g",{key:t,transform:"translate(".concat(a,", 0)")},c.a.createElement("line",{y2:"6",stroke:"currentColor"}),c.a.createElement("text",{key:t,style:{fontSize:"10px",textAnchor:"middle",transform:"translateY(16px)"}},t))})),c.a.createElement("text",{className:"axis-label",style:{textAnchor:"middle"},transform:"translate(".concat(j/2,", 35)")},"Adjusted Offensive Efficiency")),c.a.createElement("g",{className:"axis",transform:"translate(".concat(b,", ").concat(C,")")},c.a.createElement("path",{d:"M 0 0 V ".concat(M),stroke:"currentColor"}),a.map((function(e){var t=e.value,a=e.yOffset;return c.a.createElement("g",{key:t,transform:"translate(0, ".concat(a,")")},c.a.createElement("line",{x2:"-6",stroke:"currentColor"}),c.a.createElement("text",{key:t,style:{fontSize:"10px",textAnchor:"end",transform:"translateX(-8px) translateY(3px)"}},t))})),c.a.createElement("text",{className:"axis-label",style:{textAnchor:"middle"},transform:"translate(-30, ".concat(M/2,") rotate(-90)")},"Adjusted Defensive Efficiency")))}}]),t}(c.a.Component),D=a(416),P=a(418),G=a(131);var R=function(e){return c.a.createElement(p.a.Row,null,c.a.createElement(p.a.Column,null,c.a.createElement(E.a,{as:"h3"},"Filters"),c.a.createElement(p.a,{columns:3},c.a.createElement(p.a.Column,null,c.a.createElement(D.a,{label:"Show Potential Matchups",defaultChecked:e.showPotentialMatchups,onChange:e.onPotentialMatchupsCheckboxChange})," ",c.a.createElement(P.a,{trigger:c.a.createElement(G.a,{name:"info circle",color:"blue"}),content:"Show teams with the selected seeds for the current year.",style:{left:"-12px"}})),c.a.createElement(p.a.Column,null),c.a.createElement(p.a.Column,null))))},N=(a(409),a(204)),T=a.n(N),U=a(205),L=a.n(U),V=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).state={games:[],filteredGames:[],potentialMatchups:[],teams:{},currentYear:2019,leftSeed:1,rightSeed:1,startingYear:2010,endingYear:2019,showPotentialMatchups:!1,dataReady:!1},a.handleLeftSeedUpdate=a.handleLeftSeedUpdate.bind(Object(u.a)(a)),a.handleRightSeedUpdate=a.handleRightSeedUpdate.bind(Object(u.a)(a)),a.handlePotentialMatchupsUpdate=a.handlePotentialMatchupsUpdate.bind(Object(u.a)(a)),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.loadData()}},{key:"loadData",value:function(){var e=this;f.a.parse(L.a,{download:!0,header:!0,skipEmptyLines:!0,dynamicTyping:!0,complete:function(t){var a={};t.data.forEach((function(e){var t="".concat(e.Team,"-").concat(e.Year);a[t]={year:e.Year,seed:e.Seed,name:e.Team,adjO:e.AdjO,adjD:e.AdjD}})),f.a.parse(T.a,{download:!0,header:!0,skipEmptyLines:!0,dynamicTyping:!0,complete:function(t){var n=[];t.data.forEach((function(e){e.Year<2010||n.push({key:"".concat(e.Year,"-").concat(e["Team A"],"-").concat(e["Team B"]),year:e.Year,seedMatchup:[e["Seed A"],e["Seed B"]].sort(),teamA:{data:a["".concat(e["Team A"],"-").concat(e.Year)],won:e["Score A"]>e["Score B"],key:"".concat(e.Year,"-").concat(e["Team A"],"-").concat(e["Team B"])},teamB:{data:a["".concat(e["Team B"],"-").concat(e.Year)],won:e["Score B"]>e["Score A"],key:"".concat(e.Year,"-").concat(e["Team B"],"-").concat(e["Team A"])}})})),e.setState({teams:a,games:n,dataReady:!0},e.filterGames)}})}})}},{key:"handleLeftSeedUpdate",value:function(e,t){e.preventDefault(),this.setState({leftSeed:t.value},this.filterGames)}},{key:"handleRightSeedUpdate",value:function(e,t){e.preventDefault(),this.setState({rightSeed:t.value},this.filterGames)}},{key:"handlePotentialMatchupsUpdate",value:function(e,t){e.preventDefault(),this.setState({showPotentialMatchups:t.checked},this.filterPotentialGames)}},{key:"filterGames",value:function(){var e=[this.state.leftSeed,this.state.rightSeed].sort(),t=this.state.games.filter((function(t){return t.seedMatchup[0]===e[0]&&t.seedMatchup[1]===e[1]}));this.setState({filteredGames:t})}},{key:"filterPotentialGames",value:function(){var e=this,t=[];if(this.state.showPotentialMatchups){var a=[this.state.leftSeed,this.state.rightSeed].sort();this.state.games.forEach((function(n){n.year===e.state.currentYear&&(a.includes(n.teamA.data.seed)&&t.push(n.teamA),a.includes(n.teamB.data.seed)&&t.push(n.teamB))}))}this.setState({potentialMatchups:t})}},{key:"render",value:function(){return c.a.createElement(p.a,{container:!0,style:{marginTop:"20px"}},c.a.createElement(p.a.Row,null,c.a.createElement(p.a.Column,null,c.a.createElement(E.a,{as:"h1",dividing:!0},"CBB Matchup Grid"))),c.a.createElement(p.a.Row,null,c.a.createElement(p.a.Column,null,c.a.createElement(v.a,{warning:!0},c.a.createElement("b",null,"Note:")," Currently only includes data from 2010-2019."))),c.a.createElement(S,{leftSeed:this.state.leftSeed,onLeftSeedDropdownChange:this.handleLeftSeedUpdate,rightSeed:this.state.rightSeed,onRightSeedDropdownChange:this.handleRightSeedUpdate}),c.a.createElement(g.a,null),c.a.createElement(p.a.Row,{style:{maxHeight:"400px",overflowY:"scroll"}},c.a.createElement(p.a.Column,null,c.a.createElement("ul",{style:{margin:"0"}},this.state.filteredGames.length>0&&this.state.filteredGames.map((function(e){return c.a.createElement("li",{key:e.key},e.year,": ",e.teamA.data.seed," ",e.teamA.data.name," vs"," ",e.teamB.data.seed," ",e.teamB.data.name)})),0===this.state.filteredGames.length&&c.a.createElement("li",null,"No matchups with given seeds found.")))),c.a.createElement(g.a,null),c.a.createElement(R,{startingYear:this.state.startingYear,endingYear:this.state.endingYear,showPotentialMatchups:this.state.showPotentialMatchups,onPotentialMatchupsCheckboxChange:this.handlePotentialMatchupsUpdate}),c.a.createElement(p.a.Row,null,c.a.createElement(p.a.Column,null,this.state.dataReady&&c.a.createElement(B,{teams:this.state.teams,filteredGames:this.state.filteredGames,currentYear:this.state.currentYear,showPotentialMatchups:this.state.showPotentialMatchups,potentialMatchups:this.state.potentialMatchups}))),c.a.createElement(g.a,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(410);l.a.render(c.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[258,1,2]]]);
//# sourceMappingURL=main.6e9c1e5d.chunk.js.map