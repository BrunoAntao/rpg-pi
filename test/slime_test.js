const expect  = require('chai').expect;
const chai = require('chai');
const assert = require('assert');
const Slime = require('./js/slime.js');

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
})
