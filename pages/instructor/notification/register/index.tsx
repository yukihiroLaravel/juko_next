import { SideBar } from '@/components/atoms/SideBar/SideBar';
import { Thumbnail } from '@/components/atoms/Thumbnail/Thumbnail';
import { ToggleButton } from '@/components/atoms/Button/ToggleButton';
import { InstructorLayout } from '@/components/organisms/header/InstructorLayout';
import { Error } from '@/components/utils/Error';
import { Loading } from '@/components/utils/Loading';
import { NotificationsHeadingBox } from '@/features/notification/components/NotificationsHeadingBox';
import { InstructorAuthWrapper } from '@/features/login/components/Auth/InstructorAuthWrapper';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NotificationRegisterForm } from '@/features/notification/components/NotificationRegisterForm';
import { useFetchInstructorCourse } from '@/features/course/hooks/useFetchInstructorCourse';

const Index: NextPage = () => {
  const router = useRouter();

  return (
    <InstructorAuthWrapper>
      <InstructorLayout>
        <NotificationRegisterForm />
      </InstructorLayout>
    </InstructorAuthWrapper>
  );
};

export default Index;
