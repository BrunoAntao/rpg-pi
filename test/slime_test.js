const expect  = require('chai').expect;
const chai = require('chai');
const assert = require('assert');
const Slime = require('./js/slime.js');
const Mage = require('./js/mage.js');

describe('Slime', () => {

  it('Properties', () => {

    let slime = new Slime();

    expect(slime).to.haveOwnProperty('target').and.to.equal(false);

    expect(slime).to.haveOwnProperty('isTarget').and.to.equal(false);

    expect(slime).to.haveOwnProperty('isIdle').and.to.equal(false);

    expect(slime).to.haveOwnProperty('health').and.to.equal(1);

    expect(slime).to.haveOwnProperty('growth').and.to.equal(1);

    expect(slime).to.haveOwnProperty('growthMax').and.to.equal(6);

  })

  it('#damage()', () => {

    let slime = new Slime();

    let mage = new Mage(100, 100);

    expect(mage).to.have.haveOwnProperty('score').and.to.equal(0);

    slime.damage(1, mage);

    expect(mage).to.have.haveOwnProperty('score').and.to.equal(500);

  })
})
