import React, {Placeholder} from 'react';
import {createResource} from 'react-cache';
import Spinner from './Spinner';
import {cache} from '../cache';
import {imgCss} from '../styles';

const ImageResource = createResource(
  src =>
    new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.src = src;
    })
);

const Img = ({src, alt, ...rest}) => {
  return <img src={ImageResource.read(cache, src)} alt={alt} {...rest} />;
}

const UserPicture = ({source}) => {
  return (
    <Placeholder delayMs={1500} fallback={<Spinner size="small"/>}>
      <Img
        src={source}
        alt="profile picture"
        style={imgCss}
      />
    </Placeholder>
  );
}

export default UserPicture;
