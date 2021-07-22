import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios'

function SignUp(props) {
  const [userInfo, setUserInfo] = useState({
    userId: '',
    nickname: '',
    password: '',
    email: '',
    addr: {
      city: '서울',
      gu: '',
      dong: ''
    },
    // addr: '',
    // 번호만 입력받기
    phone: '',
    //HowLongLiveAlone
    homeAlone: ''
  });

  // 구조분해 할당
  let { userId, nickname, password, email, addr, phone, homeAlone } = userInfo;

  // 몇년차인지 표시하기 
  const date = new Date();

  // 주소 전체응

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
      if (Object.keys(addr).includes(name)) {
        setUserInfo({
          ...userInfo,
          addr: {
            ...userInfo.addr,
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
  
  // 회원가입 함수
  const signup = (signupInfo) => {
    const request = axios.post('http://localhost:8080/user/regist', signupInfo )
      .then((response) =>{
        console.log(response);
        console.log(request);
      })
    return null
  };

  // 제출버튼 클릭 시 실행되는 함수
  const onSubmit=(
    e => {
      e.preventDefault();
      // 백으로 보내질 주소
      userInfo.addr = String(userInfo.addr.city + userInfo.addr.gu + userInfo.addr.dong);

      console.log(userInfo)
      // 그외 정보들이 입력되었는지 검사

      // 회원가입 함수의 파라미터 설정
      const signupInfo = {}
      // console.log(signupInfo);

      // 회원가입 함수 실행
      signup(signupInfo);

      // props.setIsSignedUp(true);
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
      <select id="city" name="city" value={addr.city} onChange={onChange}>
        <option value="서울시">서울시</option>
        <option value="용인시">용인시</option>
        <option value="인천시">인천시</option>
        <option value="부산시">부산시</option>
      </select>
      <label htmlFor="gu">Choose a gu:</label>
      <select id="gu" name="gu" value={addr.gu} onChange={onChange}>
        <option value="동작구">동작구</option>
        <option value="마포구">마포구</option>
        <option value="서대문구">서대문구</option>
        <option value="동구">동구</option>
      </select>
      <label htmlFor="dong">Choose a dong:</label>
      <select id="dong" name="dong" value={addr.dong} onChange={onChange}>
        <option value="염리동">염리동</option>
        <option value="동교동">동교동</option>
        <option value="서교동">서교동</option>
        <option value="둔산동">둔산동</option>
      </select>

      <p>휴대전화 번호를 입력하세요</p>
      <input
        type="text"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <p>자취 몇년차이신가요?</p>
      <p>언제 자취를 시작하셨나요?</p>
      <label htmlFor="homeAlone">When did you start living alone</label>
      <input
        type='radio' 
        name='homeAlone' 
        value="null" 
        onChange={onChange}
        ref={radioBtn}
      /> 자취하지 않음 / 준비중
      <select id="homeAlone" name="homeAlone" value={homeAlone} onChange={onChange} ref={selectInputs}>
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
      <p>자취{date.getFullYear()-homeAlone+1}년차!</p>

      <button type="submit">
        Signup
      </button>
    </form>
  )
  
}

export default SignUp;