import { get } from '../../utils/http';

export function fetchUsers() {
  return get('/user/getUsers.php');
}
