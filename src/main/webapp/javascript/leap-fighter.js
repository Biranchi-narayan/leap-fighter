$(document).ready(function() {

    var fighter = {
        rotate: function (angle) {
            $("g#fighter").attr("transform", "rotate(" + angle + " 300 150)");
        },

        position: function (x, y) {
            $("#stage").css("left", x + "px");
            $("#stage").css("top", y - 100 + "px");
        },

        scale: function (factor) {
            var width = 450 + factor;
            var height = 450 + factor;

            $("svg").attr("width", width);
            $("svg").attr("height", height);
        },

        laser: function(fire) {
            if (fire) {
                $("#laser_left").attr("stroke-width", "3");
                $("#laser_right").attr("stroke-width", "3");
            } else {
                $("#laser_left").attr("stroke-width", "0");
                $("#laser_right").attr("stroke-width", "0");
            }

            $("span#laser").text("laser: " + fire);
        }
    };

    // to make working with angles easy
    window.TO_RAD = Math.PI / 180;
    window.TO_DEG = 1 / TO_RAD;

    var controllerOptions = { enableGestures: false };
    Leap.loop(controllerOptions, function(frame){
        if (frame.hands.length > 0) {
            var hand = frame.hands[0];
            var angle = Math.round(hand.roll() * TO_DEG) * -1;

            fighter.rotate(angle);
            fighter.position(400 + hand.palmPosition[0] * 2, 800 + (hand.palmPosition[1] * -2));
            fighter.scale(hand.palmPosition[2]);

            var thumb = hand.pointables[0];
            fighter.laser(!thumb.extended);

            $("span#position").text("x:" + hand.palmPosition[0] * 2 + " y:" + hand.palmPosition[1] * -2);
            $("span#rotation").text("r: " + angle + '°');
        }
    });

});