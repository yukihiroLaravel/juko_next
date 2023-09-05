import { Button } from '@/components/elements/Button';
import { Header } from '@/components/layouts/Header';
import { FormLayout } from '@/features/course/components/FormLayout';
import { NextPage } from 'next';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const Checkbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const Label = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: 50px;
  height: 25px;
  background: grey;
  display: block;
  border-radius: 100px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 90px;
    transition: 0.3s;
  }
`;

const StyledSwitch = styled.div`
  ${Checkbox}:checked + ${Label} {
    background: #4caf50;
  }

  ${Checkbox}:checked + ${Label}::after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  ${Label}:active::after {
    width: 45px;
  }
`;

const Edit: NextPage = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleToggle = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles[0] instanceof File) {
        // setValue('image', acceptedFiles[0]);
        setUploadedFileName(acceptedFiles[0].name);
      }
    },
  });

  return (
    <>
      <Header />
      <FormLayout>
        <h2 className="text-center text-2xl py-8">講座編集</h2>
        <div className="w-4/5 mx-auto">
          <div className="my-10">
            <label htmlFor="title">
              <p className="font-bold">講座名</p>
              <input
                id="title"
                className="rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
                // {...register('title')}
              />
              {/* {errors.title && <p className="text-red-500">{errors.title.message}</p>} */}
            </label>
          </div>
          <div className="my-10">
            <label htmlFor="title">
              <p className="font-bold">公開/非公開</p>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <StyledSwitch>
                  <Checkbox id="checkbox" type="checkbox" checked={isChecked} onChange={handleToggle} />
                  <Label htmlFor="checkbox" />
                </StyledSwitch>
              </div>
            </label>
          </div>
          <div className="my-10">
            <label htmlFor="image">
              <p className="font-bold">講座画像</p>
              {uploadedFileName ? (
                <>
                  <span className="text-gray-600 mt-2 mr-3">アップロードされたファイル: {uploadedFileName}</span>
                  <Button
                    type="button"
                    className="p-1"
                    color="danger"
                    clickHandler={() => {
                      // setValue('image', undefined);
                      setUploadedFileName(null);
                    }}
                  >
                    取り消し
                  </Button>
                </>
              ) : (
                <div
                  {...getRootProps({
                    className: 'border-2 border-dotted h-80 flex justify-center items-center',
                  })}
                >
                  <input
                    {...getInputProps()}
                    // {...register('image')}
                  />
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
              )}
              {/* {errors.image && <p className="text-red-500">{errors.image.message}</p>} */}
            </label>
          </div>
          <div className="my-5 text-center flex justify-between">
            <Button type="submit" color="danger" className="hover:opacity-75 py-2 px-5">
              削除
            </Button>
            <Button type="submit" className="hover:opacity-75 py-2 px-5">
              更新
            </Button>
          </div>
        </div>
      </FormLayout>
    </>
  );
};

export default Edit;
