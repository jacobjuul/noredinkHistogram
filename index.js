const YAML = require('yamljs');
const _ = require('lodash/fp');
const data = YAML.load('./data.yaml');

// getFemales :: Object -> Object
const getFemales = _.filter(item => item.bio.gender === 'F');
const filterTerms = _.filter(term => term.type === 'rep');
const getFemaleReps = _.compose(_.map(_.compose(filterTerms, _.prop('terms'))), getFemales);
const getYear = _.compose(_.join(''), _.slice(0,4));
const getTermsArray = _.compose(_.flatten, getFemaleReps);

// getYearRange :: String -> String -> [Number]
const getYearRange = (start, end) => {
  const begin = getYear(start);
  const ending = getYear(end);
  const diff = ending - begin;
  let ret = [+begin];

  _.times(count => {
    ret.push(+begin + (count + 1))
  }, diff);

  return ret;
};

// getAllYears :: [Object] -> [Number]
const getAllYears = _.map(term => getYearRange(term.start, term.end));

// getYearsCount :: [Object] -> Object
const getYearsCount = _.compose(_.countBy(i => i), _.flattenDeep, getAllYears, getTermsArray)

const printHist = data => {
  Object.keys(data).forEach(key => {
    const bar = _.times(c => '#', data[key]);
    const barString = bar.join('');
    console.log(barString)

  })
  console.log('\n')
}

printHist(getYearsCount(data))
