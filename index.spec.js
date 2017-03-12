import data, { printBars, countOccurencesOfFemaleYears, getYearRangeFromTerm, getRange } from './';
import { expect } from 'chai';

describe('printBars', () => {
  it('should print number of # prefixed by the count', () => {
    const subject = printBars(5);
    const expected = '5#####';
    expect(subject).to.equal(expected);
  });
});

describe('countOccurencesOfFemaleYears', () => {
  it('should return an object of years and occurrences of that year in the given array', () => {
    const setup = [{
      bio: {
        gender: 'F'
      },
      terms: [{
        start: '2015-2-00',
        end: '2018-2-12',
        type: 'rep'
      }, {
        type: 'rep',
        start: '2018-2-00',
        end: '2020-2-12'
      }]
    }];

    const subject = countOccurencesOfFemaleYears(setup);
    const expected = { 2015: 1, 2016: 1, 2017: 1, 2018: 2, 2019: 1, 2020: 1 };

    expect(subject).to.deep.equal(expected);
  })
});

describe('getYearRangeFromTerm', () => {
  it('return a range of years between two dates', () => {
    const subject = getYearRangeFromTerm({ start: '2015', end: '2019' });
    const expected = [ 2015, 2016, 2017, 2018, 2019 ];
    expect(subject).to.deep.equal(expected)
  });
});

describe('getRange', () => {
  it('should return the start and end year range, including the end year', () => {
    const setup = [2010, 2017];
    const expected = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
    const subject = getRange(setup);

    expect(subject).to.deep.equal(expected);
  });
})
