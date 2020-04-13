const fs = require('fs');
const superagent = require('superagent');
/*
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed:${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then(res => {
      // console.log(res.body.message);
      fs.writeFile('dog-img.txt', res.body.message, err => {
        if (err) return console.log(err.message);
        console.log('File saved in dog-img.txt');
      });
    })
    .catch(err => {
      console.log(err.message);
    });
});
*/
const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('Could not find the file');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write the file');
      resolve('Success');
    });
  });
};
/*
readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed:${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(res => {
    console.log(res.body.message);
    return writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
  })
  .then(() => console.log('Successfully written'))
  .catch(err => {
    console.log(err);
  });
*/
const getDocPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed:${data}`);
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map(el => el.body.message);
    await writeFilePro(`${__dirname}/dog-img.txt`, imgs.join('\n'));
    console.log('Successfully written');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: READY';
};
/*
console.log('1:will get dog pics');
getDocPic()
  .then(x => {
    console.log(x);
    console.log('3:Done getting dog pics');
  })
  .catch(err => {
    console.log('ERROR');
  });
*/

(async () => {
  try {
    const x = await getDocPic();
    console.log(x);
    console.log('3:Done getting dog pics');
  } catch (err) {
    console.log(err);
  }
})();
console.log('1:will get dog pics');

/*
(async () => {
  try {
    const x = await (async () => {
      try {
        const data = await readFilePro(`${__dirname}/dog.txt`);
        console.log(`Breed:${data}`);
        const res = await superagent.get(
          `https://dog.ceo/api/breed/${data}/images/random`
        );
        console.log(res.body.message);
        await writeFilePro(`${__dirname}/dog-img.txt`, res.body.message);
        console.log('Successfully written');
      } catch (err) {
        console.log(err);
        throw err;
      }
      return '2: READY';
    })();
    console.log(x);
    console.log('3:Done getting dog pics');
  } catch (err) {
    console.log(err);
  }
})();
console.log('1:will get dog pics');
*/
