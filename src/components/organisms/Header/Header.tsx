import { HeaderUI } from './Header.ui';
import { UserDropDown } from '@/features/user/components/UserDropDown';

export function Header() {
  return (
    <HeaderUI>
      <UserDropDown />
    </HeaderUI>
  );
}
