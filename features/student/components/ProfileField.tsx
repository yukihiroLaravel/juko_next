import { Button } from '@/components/elements/Button';
import { Thumbnail } from '@/components/elements/Thumbnail';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  profileImage: string | null;
  uploadImage: (file: File) => void;
}

export function ProfileField<T extends FieldValues>({
  name,
  control,
  profileImage,
  uploadImage,
}: Props<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  // 画像ファイル名
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // 画像のキャンセル処理
  const cancelHandler = () => {
    setUploadedFileName(null);
    field.onChange(null);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles[0] instanceof File) {
        uploadImage(acceptedFiles[0]);
        setUploadedFileName(acceptedFiles[0].name);
      }
    },
  });

  return (
    <>
      <p>プロフィール画像</p>
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
          <span className="text-gray-600 mt-2 mr-3">
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
          <input {...getInputProps()} {...field} />
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
      {error && <span className="text-red-600">{error.message}</span>}
    </>
  );
}
