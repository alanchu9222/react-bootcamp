import React from "react";

class ImageList extends React.Component {
  render() {
    const results = this.props.images;
    const imageUrls = results.map(result => (
      <img key={result.id} src={result.urls.regular} />
    ));
    return imageUrls;
  }
}

export default ImageList;
