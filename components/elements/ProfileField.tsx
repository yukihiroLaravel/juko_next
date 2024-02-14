import { Button } from '@/components/elements/Button';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { useDropzone } from 'react-dropzone';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  profileImage: string | null;
  uploadImage: (file: File | null) => void;
  uploadedFileName: string | null;
  register: UseFormRegisterReturn;
  error: string | undefined;
};

export function ProfileField({
  profileImage,
  uploadImage,
  uploadedFileName,
  register,
  error,
}: Props) {
  // 画像のキャンセル処理
  const cancelHandler = () => {
    uploadImage(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles[0] instanceof File) {
        uploadImage(acceptedFiles[0]);
      }
    },
  });

  return (
    <>
      <p className="mb-1 font-bold">プロフィール画像</p>
      {profileImage && (
        <div className="my-1">
          <Thumbnail
            src={process.env.NEXT_PUBLIC_IMAGE_URL + profileImage}
            alt="profile image"
            height={360}
            width={640}
          />
        </div>
      )}
      {uploadedFileName ? (
        <div>
          <span className="mr-3 mt-2 text-gray-600">
            アップロードされたファイル: {uploadedFileName}
          </span>
          <Button
            type="button"
            className="p-2"
            color="danger"
            clickHandler={cancelHandler}
          >
            取り消し
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps({
            className:
              'border-2 border-dotted h-80 flex justify-center items-center',
          })}
        >
          <input {...getInputProps()} {...register} />
          <div className="flex flex-col items-center justify-center ">
            <svg
              aria-hidden="true"
              className="block size-8 text-gray-400"
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
      {error && <span className="text-red-600">{error}</span>}
    </>
  );
}
