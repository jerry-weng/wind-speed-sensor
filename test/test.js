'use strict';

var mock = require('ruff-mock');
var assert = require('assert');

var when = mock.when;

var Device = require('../');

require('t');

describe('Test for wind-speed-sensor driver', function () {
    var device;
    var adc;

    before(function () {
        adc = mock({}, true);
        device = new Device({
            adc: adc
        });
    });

    it('should get expected velocity', function (done) {
        var adcVoltage = 3;
        var expectedVelocity = adcVoltage / 5 * 30;
        when(adc).getVoltage(Function).then(function (callback) {
            callback(undefined, adcVoltage);
        });
        device.getVelocity(function (error, velocity) {
            if (error) {
                done(error);
                return;
            }
            assert(velocity, expectedVelocity);
            done();
        });
    });
});
