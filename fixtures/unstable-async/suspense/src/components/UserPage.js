import React, {Placeholder} from 'react';
import {createResource} from 'react-cache';
import Spinner from './Spinner';
import {cache} from '../cache';
import UserContent from './UserContent';

const UserPage = ({id}) => {
  return (
    <UserContent id={id}/>
  );
}

const UserPageResource = createResource(() => import('./UserContent'));

const UserContentLoader = (props) => {
  const UserPage = UserPageResource.read(cache).default;
  return <UserPage {...props} />;
}

const UserPageWithLoader = ({id}) => {
  return (
    <Placeholder delayMs={2000} fallback={<Spinner size="large" />}>
      <UserContentLoader id={id} />
    </Placeholder>
  );
}

export default UserPageWithLoader;
