import Header from '@/components/layouts/Header';
import { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <>
      <Header isLogin={false} />
      <div className="border w-1/3 mx-auto min-h-[80vh] mt-10 mb-10 bg-white">
        <h2 className="text-center mt-[50px] text-[40px]">ログイン画面</h2>
        <div className="w-4/5 mx-auto">
          <div className="mt-[40px]">
            <label htmlFor="email">
              <p>メールアドレス</p>
              <input className="border-b-2 w-full" name="email" />
            </label>
          </div>
          <div className="mt-[50px]">
            <label htmlFor="password">
              <p>パスワード</p>
              <input className="border-b-2 w-full" name="password" type="password" />
            </label>
          </div>
        </div>
        <div className="mt-[50px] bg-[#00A5D4] w-4/5 mx-auto text-center">
          <button className="text-white font-semibold text-[25px] py-2">ログイン</button>
        </div>
      </div>
    </>
  );
};

export default Login;
