import { useNavigate } from 'react-router-dom';
import { getPageQuery } from './untils';

export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' && localStorage
      ? sessionStorage.getItem('token')
      : str; // authorityString could be admin, "admin", ["admin"]
  let authority;
  console.log('authorityString', authorityString);
  
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  }

  return authority;
}
export function removeAuthority() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks

  localStorage.removeItem('token');

  const { redirect } = getPageQuery();

}