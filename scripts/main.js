async function fetchPrice(){await fetch("https://api.gmx.io/prices").then((e=>e.json())).then((e=>{let t=e["0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"];updateValue("entry-price",t.length>8?t/1e30:1600),getAndUpdate(!0)})).catch((e=>{console.log(e)}))}function getFormData(){let e=document.getElementById("calc").elements;return{type:e.type.value,price:Number(e["entry-price"].value),margin:Number(e.margin.value),leverage:Number(e.leverage.value),stopLoss:Number(e["stop-loss"].value),stopLossPrice:calculateStopLoss(e.type.value,e["entry-price"].value,e["stop-loss"].value),takeProfitPrice:Number(e["take-profit"].value)}}function updateFormData(e){let t=getFormData(),a={};a.type=t.type,a.price=t.price,a.margin=t.margin,a.marginCurrency="long"==t.type?"ETH":"USDC",a.leverage=t.leverage,a.position=calculatePosition(t.type,t.price,t.margin,t.leverage),a.stopLoss=t.stopLoss,a.stopLossPrice=calculateStopLoss(t.type,t.price,t.stopLoss),a.stopLossFee=calculateStopLossFee(t.stopLoss),a.takeProfitPrice=e?calculateTakeProfit(t.type,t.price):t.takeProfitPrice,a.takeProfitPercent=calculateTakeProfitPercent(t.price,a.takeProfitPrice),a.payout=calculatePayout(t.type,t.price,t.margin,t.stopLoss,a.stopLossPrice,a.leverage),a.profits=calculateProfits(a),updateText("entry-price-text",formatPrice(a.price)),updateValue("entry-price",a.price),updateText("margin-currency",a.marginCurrency),updateText("leverage-text",a.leverage+"x"),updateValue("position",a.position),updateText("stop-loss-fee-text",a.stopLossFee+"%"),updateText("stop-loss-text",formatPrice(a.stopLossPrice)),updateValue("take-profit",a.takeProfitPrice),updateText("take-profit-percent",a.takeProfitPercent),updateText("payout",parseFloat(a.payout)>0?"+$"+a.payout:"&#129300;"),updateText("profits",parseFloat(a.profits)>0?"+$"+a.profits:"&#129300;")}function updateMargin(){let e=getFormData();updateValue("margin","long"==e.type?1:Math.floor(e.price))}function getAndUpdate(e){getFormData(),updateFormData(e)}function calculateStopLoss(e,t,a){let r=1;return"long"==e&&(r=1-a/100),"short"==e&&(r=1+a/100),Math.round(t*r*100)/100}function calculateStopLossFee(e){return Number(10*e)}function formatPrice(e){return e.toLocaleString("en-US",{maximumFractionDigits:2})}function calculatePosition(e,t,a,r){let o=0;return"long"==e&&(o=Math.round(a*r*.998*1e4)/1e4),"short"==e&&(o=Math.round(a/t*r*.998*1e4)/1e4),o}function calculateTakeProfit(e,t){let a=0;return"long"==e&&(a=Math.round(1.1*t*100)/100),"short"==e&&(a=Math.round(.9*t*100)/100),a}function calculateTakeProfitPercent(e,t){let a=Number(((t-e)/e*100).toFixed(1)),r="";return r=a>0?"+"+a:+a,r+"%"}function calculatePayout(e,t,a,r,o,i){let c=0;return"long"==e&&(c=(a*t-a*o)*i),"short"==e&&(c=a*(r/100)*i),formatPrice(c)}function calculateProfits(e){let t=0,a=0,r=(100-10*e.stopLoss)/100;return"long"==e.type&&(t=Math.round(e.margin*e.leverage*.998*1e4)/1e4,a=(t*e.takeProfitPrice-t*e.price)*r),"short"==e.type&&(t=Math.round(e.margin/e.price*e.leverage*.998*1e4)/1e4,a=(t*e.price-t*e.takeProfitPrice)*r),formatPrice(a)}function updateText(e,t){document.getElementById(e).innerHTML=t}function updateValue(e,t){document.getElementById(e).value=t}