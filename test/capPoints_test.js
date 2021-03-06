const expect  = require('chai').expect;
const chai = require('chai');
const assert = require('assert');
const CapPoint = require('./js/capturePoints.js');

describe('Capture Points', () => {

  it('Properties', () => {

    let capPoint =  new CapPoint(100, 100, 'desert');

    expect(capPoint).to.haveOwnProperty('range').and.to.equal(150);

    expect(capPoint).to.haveOwnProperty('prog').and.to.equal(0);

    expect(capPoint).to.haveOwnProperty('captured').and.to.equal(false);

    expect(capPoint).to.haveOwnProperty('biome').and.to.equal('desert');

    expect(capPoint).to.haveOwnProperty('spawnCount').and.to.equal(0);

  })

  it('#spawn()', () => {

    let capPoint =  new CapPoint(100, 100, 'ice');

    for (let i = 0; i < 4; i++) {

      capPoint.spawn();

    }

    expect(capPoint).to.haveOwnProperty('spawnCount').and.to.equal(4);

  })
})
