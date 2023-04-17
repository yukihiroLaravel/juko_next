import Header from '@/components/layouts/Header';
import { NextPage } from 'next';
import { useDropzone } from 'react-dropzone';

const Register: NextPage = () => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    },
  });
  return (
    <>
      <Header />
      <div className="md:border md:w-3/6 min-h-[80vh] mt-10 mb-10 bg-white mx-auto">
        <form>
          <h2 className="text-center my-10 text-3xl">講座登録</h2>
          <div className="w-4/5 mx-auto">
            <div className="my-5">
              <label htmlFor="title">
                <p>講座名</p>
                <input className="rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]" name="title" />
              </label>
            </div>
            <div className="my-5">
              <label htmlFor="image">
                <p>講座画像</p>
                <div
                  {...getRootProps({
                    className: 'border-2 border-dotted h-80 flex justify-center items-center',
                  })}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col justify-center items-center ">
                    <svg
                      aria-hidden="true"
                      className="block w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p>画像アップロード</p>
                  </div>
                </div>
              </label>
            </div>
            <div className="my-5">
              <button className="block rounded bg-[#00A5D4] w-4/5 mx-auto text-center text-white font-semibold text-2xl py-2 hover:opacity-75">
                登録
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
