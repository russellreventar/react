import React, {Placeholder} from 'react';
import {createResource} from 'react-cache';
import Spinner from './Spinner';
import {cache} from '../cache';
import {fetchUserDetails, fetchUserRepos} from '../api';
import UserPicture from './UserPicture';
import {contentCss, reposCss, detailCss, nameCss, repoCss} from './../styles';

const DETAILS_TIMEOUT = 0;
const REPOS_TIMEOUT = 2000;

const UserDetailsResource = createResource(fetchUserDetails(DETAILS_TIMEOUT));
const UserReposResource = createResource(fetchUserRepos(REPOS_TIMEOUT));

const UserContent = ({id}) => {
  return (
    <div style={contentCss}>
      {/* <Placeholder delayMs={1000} fallback={<Spinner size="medium" />}> */}
      <Details id={id} />
      {/* </Placeholder> */}
      <Placeholder delayMs={1000} fallback={<Spinner size="medium" />}>
        <Repos id={id} />
      </Placeholder>
    </div>
  )
}

const Repos = ({id}) => {
  const repos = UserReposResource.read(cache, id);
  return (
    <ul style={reposCss}>
      {repos.map(repo => <Repository key={repo.name} {...repo} />)}
    </ul>
  );
}

const Details = ({id}) => {
  const user = UserDetailsResource.read(cache, id);
  return (
    <div style={detailCss}>
      <UserPicture source={user.image} />
      <div style={nameCss}> {user.name} </div>
      <div style={{fontSize: '1.25rem'}}>{user.id}</div>
      {user.tagline !== null && <div>{user.tagline}</div>}
    </div>
  );
}

const Repository = ({description, name, url}) => {
  return (
    <li style={repoCss}>
      <strong> <a href={url}>{name}</a> </strong>
      <div>{description}</div>
    </li>
  );
}

export default UserContent;
