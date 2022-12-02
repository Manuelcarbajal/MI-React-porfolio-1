import React from "react";

const BlogFeaturedImage = props => {
  if (!props.img) {
    return null;
  }

  return (
    <div className="featured-image-wrapper">
      <img alt='' src={props.img} />
    </div>
  );
};

export default BlogFeaturedImage;
