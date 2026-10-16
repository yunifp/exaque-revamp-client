import React from "react";
import { Link } from "react-router-dom";

const MegaMenuItem = ({ to, title, description, className = "", ...props }) => {
  const content = (
    <>
      <p className="text-base font-medium text-white">{title}</p>
      {description && (
        <p className="text-sm text-gray-300 group-hover:text-gray-300">
          {description}
        </p>
      )}
    </>
  );

  const baseClasses = `group block p-2 -m-2 rounded-lg border-l-4 border-transparent hover:border-l-accent-hover transition-colors cursor-pointer ${className}`;

  if (!to || to === "#") {
    return (
      <div {...props} className={baseClasses}>
        {content}
      </div>
    );
  }

  return (
    <Link to={to} {...props} className={baseClasses}>
      {content}
    </Link>
  );
};

export default MegaMenuItem;