const { users } = require('../../models/users');
const bcrypt = require('bcrypt');

/*
1. 입력받은 email이 db에 존재하는지 확인
  1. 만약에 있다면,
    1. res 409 err
  2. 만약에 없다면,
    1. res 200 ok
    2. req로 날라온 정보들 db에 넣어주기
      1. 단, password는 암호화해서 db에 넣기
*/

module.exports = {
  post: async (req, res) => {

    const { email, password, name, contact, privacy_agreement, language } = req.body;
    const hash_password = await bcrypt.hash(password, 10);


    
    // db에서 req.body.email이 존재하는지 확인
    await users.findOne({
      where: {
        email: email
      }
    })
    .then(user => {
      console.log("user:", user)
      process.on('unhandledRejection', (error, p) => {
        console.log('=== UNHANDLED REJECTION ===');
        console.dir(error.stack);
      });
      if (user !== null) {
        res.status(409).send("User already existed.");
      }
      else {
        async function createUser() {
          await users.create({
            email: email,
            password: hash_password,
            name: name,
            contact: contact,
            privacy_agreement: privacy_agreement,
            language: language
          })
          .then(data => res.status(201).send("completely signed up"));
        }
        createUser();
      }
    })
    .catch(err => console.log(err));
  }
};

