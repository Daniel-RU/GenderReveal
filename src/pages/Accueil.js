import React from 'react';
import $ from 'jquery';
import "../css/confettis.css";


var colors = ["pink", "lightblue", "pink", "lightblue",
"pink", "lightblue", "pink", "lightblue",
"pink", "lightblue", "pink", "lightblue"];
var genre = ["Fille", "Garçon", "Fille", "Garçon",
    "Fille", "Garçon", "Fille", "Garçon",
    "Fille", "Garçon", "Fille", "Garçon"];

var startAngle = 0;
var arc = Math.PI / 6;
var spinAngleStart = 0;
var spinTime = 0;
var spinTimeTotal = 0;
var interval = null;

var ctx;

class Accueil extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.spin = this.spin.bind(this);
        this.drawWheel = this.drawWheel.bind(this);
      }


componentDidMount() {
    this.drawWheel();
}

drawWheel() {
    var canvas = document.getElementById("roue");
    if (canvas.getContext) {
        var outsideRadius = 200;
        var textRadius = 160;
        var insideRadius = 1;

        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,500,500);

        ctx.strokeStyle = "grey";
        ctx.lineWidth = 2;

        ctx.font = 'bold 15px Arial';

        for(var i = 0; i < 12; i++) {
            var angle = startAngle + i * arc;
            ctx.fillStyle = colors[i];

            ctx.beginPath();
            ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
            ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();

            ctx.save();
            ctx.fillStyle = "black";
            ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                    250 + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            var text = genre[i];
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        }

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(250 - 4, 250 - (outsideRadius + 9));
        ctx.lineTo(250 + 16, 250 - (outsideRadius + 9));
        ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
        ctx.lineTo(250 - 16, 250 - (outsideRadius + 9));
        ctx.fill();
    }
}


        
spin() {
    document.querySelector("button").style.visibility = "hidden";
    spinAngleStart = 10;
    spinTime = 0;
    spinTimeTotal = 100;
    interval = setInterval(() => {this.rotate(spinTime++);}, 5);
    
    }

    rotate(spinTime) {

        if(spinTime >= 1320) {
            clearInterval(interval);
            var degrees = startAngle * 180 / Math.PI + 90;
            var arcd = arc * 180 / Math.PI;
            var index = Math.floor((360 - degrees % 360) / arcd);
            ctx.save();
            ctx.font = 'bold 30px Helvetica, Arial';
            var text = genre[index];
            ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
            ctx.restore();
            $("#presentation").html("C'est un...");
            document.body.style.backgroundColor = 'lightblue';
            for (var j = 0; j < 20; j++) {
                $('body').prepend('<div class="confetti"></div>');
            }
            $('body').append("<div style='text-align: center; margin-top: 300px;'>Son nom restera un secret jusqu'en septembre.</div>");
            return;
        }

        if(spinTime < 700) {
            startAngle += (2.5 * Math.PI / 180);
    
        } else if(spinTime < 1000){
            startAngle += (1.6 * Math.PI / 180);
        } else if(spinTime < 1200) {
            startAngle += (1.1 * Math.PI / 180);
        } else {
            startAngle += (Math.PI / 180);
        }

        var canvas = document.getElementById("roue");
        if (canvas.getContext) {
            var outsideRadius = 200;
            var textRadius = 160;
            var insideRadius = 1;

            ctx = canvas.getContext("2d");
            ctx.clearRect(0,0,500,500);

            ctx.strokeStyle = "grey";
            ctx.lineWidth = 2;

            ctx.font = 'bold 15px Arial';

            for(var i = 0; i < 12; i++) {
                var angle = startAngle + i * arc;
                ctx.fillStyle = colors[i];

                ctx.beginPath();
                ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
                ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
                ctx.stroke();
                ctx.fill();

                ctx.save();
                ctx.shadowColor   = "rgb(220,220,220)";
                ctx.fillStyle = "black";
                ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
                        250 + Math.sin(angle + arc / 2) * textRadius);
                ctx.rotate(angle + arc / 2 + Math.PI / 2);
                var text = genre[i];
                ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                ctx.restore();
            }

            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.moveTo(250 - 4, 250 - (outsideRadius + 9));
            ctx.lineTo(250 + 16, 250 - (outsideRadius + 9));
            ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
            ctx.lineTo(250 - 16, 250 - (outsideRadius + 9));
            ctx.fill();
            
            return spinTime;
        }
    }

    render() {
        return (
            <>
            <h1 id="presentation">C'est un(e)...</h1>
            <div>
                <canvas id="roue" width="500" height="500" ref={ this.myRef } />
            </div>
            <button type="button" onClick={this.spin} className="btn btn-success btn-lg" style={{boxShadow: '2px 3px lightgrey', borderRadius: '35px'}}>Cliquez ici</button>

            </>
        );
    }

}
export default Accueil;