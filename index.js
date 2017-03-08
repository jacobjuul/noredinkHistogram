const YAML = require('yamljs');
const _ = require('lodash/fp');

const data = YAML.load('./data.yaml');
//
// const
// const females = _.reduce((sum, curr) => {
//   return Object.assign({}, sum, )
// }, {})(data);

// getFemales :: Object -> Object
const getFemales = _.filter((item) => item.bio.gender === 'F');

const filterTerms = _.filter((term) => {
  return term.type === 'rep';
});

const getFemaleReps = _.compose(_.map(_.compose(filterTerms, _.prop('terms'))), getFemales);
const femaleRepTerms = getFemaleReps(data);

const getYear = year => year.slice(0,4);

const getYears = (start, end) => {
  const begin = getYear(start);
  const ending = getYear(end);
  const diff = +ending - +begin;
  let ret = [+begin];

  _.times(count => {
    ret.push(+begin + count + 1)
  }, diff);

  return ret;
};

const years = _.flattenDeep(femaleRepTerms.map(terms => {
  return terms.map(term => {
    return getYears(term.start, term.end);
  })
}));

const yearCounts = years.reduce((sum, year) => {
    return Object.assign(
      {},
      sum,
      {
        [year]: sum[year] ? sum[year] + 1 : 1
      }
    );
}, {})


const printHist = data => {
  Object.keys(data).forEach(key => {
    const bar = _.times(c => '#', data[key]);
    const barString = bar.join('');
    console.log(barString)

  })
  console.log('\n')
}

printHist(yearCounts)


// const years = femaleReps.reduce((sum, curr) => {
//
//   curr.forEach((i) => {
//
//   }
// }, {})


// console.log(getRepTerms(data))

// console.log(getRepTerms(data))
// getTerms :: Object -> Object
const getStart =  _.prop('terms.start');
const getEnd = _.prop('terms.end');
