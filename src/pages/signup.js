import React, { useState, useCallback, useRef } from 'react';

function SignUp(props) {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    nickname: '',
    password: '',
    email: '',
    address: {
      city: '시티',
      gu: '',
      dong: ''
    },
    // 번호만 입력받기
    phoneNumber: '',
    //HowLongLiveAlone
    livingAloneYear: ''
  });

  // 구조분해 할당
  let { userId, nickname, password, email, address, phoneNumber, livingAloneYear } = userInfo;

  // 몇년차인지 표시하기 
  const date = new Date();

  // DOM 선택
  const radioBtn = useRef();
  const selectInputs = useRef();

  const onChange=useCallback(
    e => {

      // select를 누르면 radio가 초기화
      if (e.target.type === 'select-one') {
        radioBtn.current.checked = false;
      };

      const { name, value } = e.target;
      console.log(name, value);
      // 주소만 구조가 다르므로 name이 주소 속성이면
      if (Object.keys(address).includes(name)) {
        setUserInfo({
          ...userInfo,
          address: {
            ...userInfo.address,
            [name]: value
          }
        });
      } else {
        setUserInfo({
          ...userInfo,
          [name]: value
        });
      }
    },
    [userInfo]
  );

  const onSubmit=(
    e => {
      e.preventDefault();
      console.log(userInfo);
      props.setIsSignedUp(true);
    }
  )

  return (
    <form onSubmit={onSubmit}>
      <p>아이디를 입력하세요</p>
      <input
        type="text"
        name="userId"
        value={userId}
        onChange={onChange}
      />
      <p>닉네임을 입력하세요</p>
      <input
        type="text"
        name="nickname"
        value={nickname}
        onChange={onChange}
      />
      <p>비밀번호를 입력하세요</p>
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
      />
      <p>이메일을 입력하세요</p>
      <input
        type="text"
        name="email"
        value={email}
        onChange={onChange}
      />
      <p>주소를 입력하세요</p>
      <label htmlFor="city">Choose a City:</label>
      <select id="city" name="city" value={address.city} onChange={onChange}>
        <option value="서울">서울</option>
        <option value="경기">경기</option>
        <option value="인천">인천</option>
        <option value="부산">부산</option>
      </select>
      <label htmlFor="gu">Choose a gu:</label>
      <select id="gu" name="gu" value={address.gu} onChange={onChange}>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
      </select>
      <label htmlFor="dong">Choose a dong:</label>
      <select id="dong" name="dong" value={address.dong} onChange={onChange}>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
      </select>

      <p>휴대전화 번호를 입력하세요</p>
      <input
        type="text"
        name="phoneNumber"
        value={phoneNumber}
        onChange={onChange}
      />
      <p>자취 몇년차이신가요?</p>
      <p>언제 자취를 시작하셨나요?</p>
      <label htmlFor="livingAloneYear">When did you start living alone</label>
      <input
        type='radio' 
        name='livingAloneYear' 
        value="null" 
        onChange={onChange}
        ref={radioBtn}
      /> 자취하지 않음 / 준비중
      <select id="livingAloneYear" name="livingAloneYear" value={livingAloneYear} onChange={onChange} ref={selectInputs}>
        <option defaultValue value="undefined"> -- 연도를 선택해주세요 -- </option>
        <option value="2021">2021년</option>
        <option value="2020">2020년</option>
        <option value="2019">2019년</option>
        <option value="2018">2018년</option>
        <option value="2017">2017년</option>
        <option value="2016">2016년</option>
        <option value="2015">2015년</option>
        <option value="2014">2014년</option>
        <option value="2013">2013년</option>
        <option value="2012">2012년 이전</option>
      </select>
      <p>자취{date.getFullYear()-livingAloneYear+1}년차!</p>

      <button type="submit">
        Signup
      </button>
    </form>
  )
  
}

export default SignUp;