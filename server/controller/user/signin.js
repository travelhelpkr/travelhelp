const { User } = require('../../models');
const bcrypt = require('bcrypt');

/*
1. 입력받은 email과 password를 db에서 확인
  1. email이 없는 경우
    1. res 회원가입 안되었다는 err
  2. email이 있고
    1. password만 없는 경우
      1. res 비밀번호 틀렸다는 err
    2. password도 맞으면
      1. res 로그인 성공
        1. home 화면으로 redirect (client에서 처리)
*/

module.exports = {
  post: async (req, res) => {

    const { email, password, last_visited_at } = req.body;
    
    // db에서 req.body.email이 존재하는지 확인
    const userEmail = await User.findOne({
      where: {
        email: email
      }
    });

    if (!userEmail) {
      res.status(401).send("You need to sign up first.");
    }
    else {
      // db에 존재하던 hashed password 가져오기
      const hashed_password = await User.findOne({
        attributes: [ "password" ]
      }, {
        where: {
          email: email
        }
      })

      console.log("hashed_password:", hashed_password.dataValues.password)

      // req.body.password와 db의 hashed password 비교 후, callback function 실행
      const comparePassword = async () => {
        await bcrypt.compare(password, hashed_password.dataValues.password, (err, result) => {
          if (err || !result) { 
            console.log(err);
            res.status(401).send("Wrong password.");
          }
          else {
            const updateVisitTime = async () => {
              await User.update({
                last_visited_at: last_visited_at
              }, {
                where: {
                  email: email
                }
              })
              .then(data => res.status(200).send("successfully signed in"));
            }
            updateVisitTime();
          }
        });
      }
      comparePassword();
    }
    
  }
};
