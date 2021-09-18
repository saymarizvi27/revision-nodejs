const parse = require('csv-parse');
const fs = require('fs');

const results = [];

function isHabitablePlanets(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}



fs.createReadStream('cumulative_2021.09.18_04.13.03.csv')
    //connects read to reading source to write source 
    //readable stream to writable stream
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        if(isHabitablePlanets(data)){
            results.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        console.log(results.map((planet)=>{
            return planet['kepler_name'];
        }));
        console.log('done');
    })

parse();