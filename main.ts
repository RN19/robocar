function right () {
    pins.servoSetPulse(AnalogPin.P8, 1700)
    pins.servoSetPulse(AnalogPin.P13, 1700)
}
radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # # # # #
            . . # . .
            . . # . .
            `)
        forward()
    } else if (receivedNumber == 2) {
        basic.showLeds(`
            . . # . .
            . # # . .
            # # # # #
            . # # . .
            . . # . .
            `)
        right()
    } else if (receivedNumber == 3) {
        basic.showLeds(`
            . . # . .
            . . # # .
            # # # # #
            . . # # .
            . . # . .
            `)
        left()
    } else if (receivedNumber == 4) {
        basic.showLeds(`
            . . # . .
            . . # . .
            # # # # #
            . # # # .
            . . # . .
            `)
        reverse()
    } else if (receivedNumber == 5) {
        basic.showIcon(IconNames.Asleep)
        if (radio2 == 0) {
            radio2 = 1
        } else if (radio2 == 1) {
            radio2 = 0
        }
    }
})
function left () {
    pins.servoSetPulse(AnalogPin.P13, 1300)
    pins.servoSetPulse(AnalogPin.P8, 1300)
}
function stop () {
    pins.servoSetPulse(AnalogPin.P8, 0)
    pins.servoSetPulse(AnalogPin.P13, 0)
}
input.onButtonPressed(Button.A, function () {
    radio.sendNumber(3)
})
function reverse () {
    pins.servoSetPulse(AnalogPin.P13, 1300)
    pins.servoSetPulse(AnalogPin.P8, 1700)
}
input.onGesture(Gesture.ScreenDown, function () {
    radio.sendNumber(4)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(1)
})
input.onButtonPressed(Button.B, function () {
    radio.sendNumber(2)
})
input.onGesture(Gesture.Shake, function () {
    radio.sendNumber(5)
})
function forward () {
    pins.servoSetPulse(AnalogPin.P8, 1700)
    pins.servoSetPulse(AnalogPin.P13, 1300)
}
let distance = 0
let radio2 = 0
basic.showIcon(IconNames.Skull)
let turn = 0
radio2 = 1
radio.setGroup(255)
basic.forever(function () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P0, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P0, 0)
    distance = pins.pulseIn(DigitalPin.P1, PulseValue.High) / 58
})
basic.forever(function () {
    if (radio2 == 0) {
        if (distance < 5) {
            turn = randint(1, 2)
            basic.pause(100)
            if (turn == 1) {
                left()
                basic.pause(1000)
                turn = 0
            } else if (turn == 2) {
                right()
                basic.pause(1000)
                turn = 0
            }
        }
        forward()
    }
})
