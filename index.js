import YAML from 'yamljs';
import _ from 'lodash/fp';
const data = YAML.load('./data.yaml');

const trace = _.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

// addLegngth :: String -> String
const addLengthToString = s => s.length + s;

// getFemales :: Object -> Object
const getFemales = _.filter(item => item.bio.gender === 'F');

// onlyGetReps :: [Object] -> [Object]
const onlyGetReps = _.filter(term => term.type === 'rep');

// takeAllTerms :: [Objects] -> [Object]
const allFemaleTermsWhoAreReps = _.compose(
  _.flatten , _.map(_.compose(onlyGetReps, _.prop('terms'))), getFemales
);

// extractYearFromDate :: String -> String
const extractYearFromDate = _.compose(
  _.join(''), _.slice(0,4)
);


const getRange = ([head, tail]) => _.concat(_.range(head, tail), +tail);
// getYearRangeFromTerm :: Object -> [Number]
const getYearRangeFromTerm = _.compose(
  getRange, _.map(extractYearFromDate), _.at(['start', 'end'])
);

// countOccurencesOfYears :: [Object] -> Object
const countOccurencesOfFemaleYears = _.compose(
  _.countBy(i => i), //
  _.flattenDeep, // pull numbers out of nested arrays
  _.map(getYearRangeFromTerm), // Get all years
  allFemaleTermsWhoAreReps //
);

// printBars :: Number -> String
const printBars = _.compose(
  addLengthToString, _.join(''), _.times(c => '#')
);

// app :: Object -> void
const app = _.compose(_.join('\n'), _.map(printBars), countOccurencesOfFemaleYears);

console.log(app(data));


export {
  countOccurencesOfFemaleYears,
  extractYearFromDate,
  getYearRangeFromTerm,
  addLengthToString,
  printBars,
  data
}
