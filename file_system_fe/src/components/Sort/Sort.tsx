import React, { useEffect } from "react";

interface Props {
  children: React.ReactNode;
  by: string | null;
}

const Sort = ({ children, by }: Props) => {
  useEffect(() => {
    console.log(by);
  }, [by]);

  const compare = (a: any, b: any) => {
    if (by === "name") {
      return a.props[by].localeCompare(b.props[by]);
    } else if (by === "byteSize") {
      return -(a.props[by] - b.props[by]);
    }
    return 0;
  };

  if (!by) {
    return <>{children}</>;
  }
  const sortedChildren = React.Children.toArray(children).sort(compare);
  return <>{sortedChildren}</>;
};

export default Sort;
