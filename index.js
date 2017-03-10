const YAML = require('yamljs');
const _ = require('lodash/fp');
const data = YAML.load('./data.yaml');

// getFemales :: Object -> Object
const getFemales = _.filter(item => item.bio.gender === 'F');
const filterTerms = _.filter(term => term.type === 'rep');
const getFemaleReps = _.compose(_.map(_.compose(filterTerms, _.prop('terms'))), getFemales);
// getTermsArray :: [Object] -> [Object]
const getTermsArray = _.compose(_.flatten, getFemaleReps);
// getYear :: [String] ->
const getYear = _.compose(_.join(''), _.slice(0,4));
// getYearRange :: Object -> [Number]
const getYearRange = _.compose(_.map(getYear), _.at(['start', 'end']));
// getYearsCount :: [Object] -> Object
const getYearsCount = _.compose(
  _.countBy(i => i),
  _.flattenDeep, // pull numbers out of nested arrays
  _.map(getYearRange), // Get all years
  getTermsArray
);

// getBarAsString :: Number -> String
const printBarAsString = _.compose(console.log, _.join(''), _.times(c => '#'));
const printBars = _.map(printBarAsString);
const app = _.compose(printBars, getYearsCount);
app(data);
