const { User } = require('../../models');
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

    const { email, password, name, contact, is_email_verified, is_policy_agreed, last_visited_at, language } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    
    // db에서 req.body.email이 존재하는지 확인
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    if (user !== null) {
      res.status(409).send("User already existed.");
    }
    else {
      await User.create({
        email: email,
        password: hash_password,
        name: name,
        contact: contact,
        is_email_verified: is_email_verified,
        is_policy_agreed: is_policy_agreed,
        last_visited_at: last_visited_at,
        language: language
      })
      .then(data => res.status(201).send("completely signed up"));
    }
    
  }
};
