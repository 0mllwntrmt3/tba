async function fetchPrice(){await fetch("https://api.gmx.io/prices").then((e=>e.json())).then((e=>{let t=e["0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"];updateValue("entry-price",t.length>8?t/1e30:1600),getAndUpdate(!0)})).catch((e=>{console.log(e)}))}function getFormData(){let e=document.getElementById("calc").elements;return{type:e.type.value,price:Number(e["entry-price"].value),margin:Number(e.margin.value),leverage:Number(e.leverage.value),stopLoss:Number(e["stop-loss"].value),stopLossPrice:calculateStopLoss(e.type.value,e["entry-price"].value,e["stop-loss"].value),takeProfitPrice:Number(e["take-profit"].value)}}function updateFormData(e){let t=getFormData(),r={};r.type=t.type,r.price=t.price,r.margin=t.margin,r.marginCurrency="long"==t.type?"ETH":"USDC",r.leverage=t.leverage,r.position=calculatePosition(t.type,t.price,t.margin,t.leverage),r.stopLoss=t.stopLoss,r.stopLossPrice=calculateStopLoss(t.type,t.price,t.stopLoss),r.stopLossFee=calculateStopLossFee(t.stopLoss),r.takeProfitPrice=e?calculateTakeProfit(t.type,t.price):t.takeProfitPrice,r.takeProfitPercent=calculateTakeProfitPercent(t.price,r.takeProfitPrice),r.payout=calculatePayout(t.type,t.price,t.margin,t.stopLoss,r.stopLossPrice),r.profits=calculateProfits(r),updateText("entry-price-text",formatPrice(r.price)),updateValue("entry-price",r.price),updateText("margin-currency",r.marginCurrency),updateText("leverage-text",r.leverage+"x"),updateValue("position",r.position),updateText("stop-loss-fee-text",r.stopLossFee+"%"),updateText("stop-loss-text",formatPrice(r.stopLossPrice)),updateValue("take-profit",r.takeProfitPrice),updateText("take-profit-percent",r.takeProfitPercent),updateText("payout",parseFloat(r.payout)>0?"+$"+r.payout:"&#129300;"),updateText("profits",parseFloat(r.profits)>0?"+$"+r.profits:"&#129300;")}function getAndUpdate(e){getFormData(),updateFormData(e)}function calculateStopLoss(e,t,r){let a=1;return"long"==e&&(a=1-r/100),"short"==e&&(a=1+r/100),Math.round(t*a*100)/100}function calculateStopLossFee(e){return Number(10*e)}function formatPrice(e){return e.toLocaleString("en-US",{maximumFractionDigits:2})}function calculatePosition(e,t,r,a){let o=0;return"long"==e&&(o=Math.round(r*a*.998*1e4)/1e4),"short"==e&&(o=Math.round(r/t*a*.998*1e4)/1e4),o}function calculateTakeProfit(e,t){let r=0;return"long"==e&&(r=Math.round(1.1*t*100)/100),"short"==e&&(r=Math.round(.9*t*100)/100),r}function calculateTakeProfitPercent(e,t){let r=Number(((t-e)/e*100).toFixed(1)),a="";return a=r>0?"+"+r:+r,a+"%"}function calculatePayout(e,t,r,a,o){let i=0;return"long"==e&&(i=r*t-r*o),"short"==e&&(i=r*(a/100)),formatPrice(i)}function calculateProfits(e){let t=0,r=0,a=(100-10*e.stopLoss)/100;return"long"==e.type&&(t=Math.round(e.margin*e.leverage*.998*1e4)/1e4,r=(t*e.takeProfitPrice-t*e.price)*a),"short"==e.type&&(t=Math.round(e.margin/e.price*e.leverage*.998*1e4)/1e4,r=(t*e.price-t*e.takeProfitPrice)*a),formatPrice(r)}function updateText(e,t){document.getElementById(e).innerHTML=t}function updateValue(e,t){document.getElementById(e).value=t}